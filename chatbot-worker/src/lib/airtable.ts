import type { Env } from "./types";
import { F, P, buildPeopleIndex } from "./runs";
import type { PeopleIndex, PeopleRow } from "./runs";

const API = "https://api.airtable.com/v0";

// The People table is a cross-base sync of the roster (about 30 active rows), so one cached read serves many runs.
const PEOPLE_TTL_MS = 10 * 60 * 1000;
let peopleCache: { at: number; index: PeopleIndex } | null = null;

async function airtable(env: Env, path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${API}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.AIRTABLE_PAT}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

async function fail(env: Env, what: string, res: Response): Promise<never> {
  // This message reaches the Worker log. Airtable's error bodies don't echo the token, but redact it anyway.
  let body = (await res.text()).slice(0, 300);
  if (env.AIRTABLE_PAT) body = body.split(env.AIRTABLE_PAT).join("[redacted]");
  throw new Error(`Airtable ${what} failed: HTTP ${res.status} ${body}`);
}

// Active employees only. Falls back to a stale cache if Airtable is unreachable; null when there is nothing to
// resolve against (the run is still recorded, just with an empty User link).
export async function getPeopleIndex(env: Env): Promise<PeopleIndex | null> {
  if (peopleCache && Date.now() - peopleCache.at < PEOPLE_TTL_MS) return peopleCache.index;
  try {
    const rows: PeopleRow[] = [];
    let offset: string | undefined;
    for (let page = 0; page < 10; page++) {
      const q = new URLSearchParams({
        filterByFormula: "AND({Status}='active',{Kind}='employee')",
        returnFieldsByFieldId: "true",
        pageSize: "100",
      });
      for (const id of [P.employeeId, P.kind, P.status, P.email, P.epicorUserId]) q.append("fields[]", id);
      if (offset) q.set("offset", offset);
      const res = await airtable(env, `${env.RUNS_BASE_ID}/${env.PEOPLE_TABLE_ID}?${q}`);
      if (!res.ok) return await fail(env, "People read", res);
      const data = (await res.json()) as { records: { id: string; fields: Record<string, unknown> }[]; offset?: string };
      for (const r of data.records) rows.push({ id: r.id, fields: r.fields });
      offset = data.offset;
      if (!offset) break;
    }
    peopleCache = { at: Date.now(), index: buildPeopleIndex(rows) };
    return peopleCache.index;
  } catch (err) {
    console.error("People lookup failed:", err instanceof Error ? err.message : String(err));
    return peopleCache ? peopleCache.index : null;
  }
}

// Create-or-update by Run ID in one call, so two writers racing on the same run can't create duplicates.
export async function upsertRun(env: Env, fields: Record<string, unknown>): Promise<{ id: string; created: boolean }> {
  const res = await airtable(env, `${env.RUNS_BASE_ID}/${env.RUNS_TABLE_ID}`, {
    method: "PATCH",
    body: JSON.stringify({
      performUpsert: { fieldsToMergeOn: [F.runId] },
      records: [{ fields }],
      returnFieldsByFieldId: true,
    }),
  });
  if (!res.ok) return await fail(env, "run upsert", res);
  const data = (await res.json()) as { records: { id: string }[]; createdRecords?: string[] };
  const id = data.records[0]?.id;
  if (!id) throw new Error("Airtable run upsert returned no record");
  return { id, created: (data.createdRecords ?? []).includes(id) };
}
