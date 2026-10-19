// Pure logic for POST /api/diagnostic-runs: validation, Airtable field mapping and identity resolution.
// No relative imports and no I/O, so `node --test test/` can import this file directly.
//
// Airtable side: base "Releases & Requests", table "Rhino Diagnostic Tool". See
// power-automate-flows/plans/diagnostic-run-tracking.md for the schema and the decisions behind it.

export const SCHEMA_VERSION = 1;

// Field IDs in the "Rhino Diagnostic Tool" table. IDs, not names, so renaming a column can't break writes.
export const F = {
  runId: "fldy17WUYJrJ1p5G2",
  source: "fldO7pruvchdS33SE",
  runAt: "fldlo6pxdTdFKEysT",
  user: "fldsSLHxmpTBmbjr1",
  userRaw: "fldf9ks68IrZBr3eM",
  fileName: "fld1wIGHrphgJNhL2",
  jobNumber: "fld59G9bZvxppIeN8",
  result: "fldQ0JtmHp5DF35w3",
  errors: "fldpLPvBuPJGQFj4a",
  warnings: "fldvKjb6oMLXA0h6D",
  infos: "fldO4FMzEl3dKN5iG",
  erpChecks: "fldiyyMQIMBZjvTL2",
  llm: "fldf2TteKXOZ7lO7f",
  actionPlan: "fldxwxEyXGqBj0ida",
  rawPayload: "flddwnfQd6bcUGmHN",
  schemaVersion: "fldWp3buZZuCbc6yS",
  release: "fldS5iVaI3lqd25DR",
  fileUrl: "fldxyOZqFDn88OcHt",
  findingsUrl: "fldPhS5ijjuuIbBuO",
  filePath: "fldDb4Hd7hknD5oEC",
  logPath: "fldfivBLWYwszCv35",
} as const;

// Field IDs in the synced "People" table (a cross-base sync of the Engineering Schedule "Roles" table).
export const P = {
  employeeId: "fldsk8FHRXxGdWU7g",
  kind: "fldAXIVVGwGO8j7NV",
  status: "fldGYno80SzQHdh3h",
  email: "fld3eDM0HIMl6dEJV",
  epicorUserId: "fldequaAG4gupr4Hb",
  offboardDate: "fldFZoDcw92P3f6A3",
} as const;

// Client value -> single-select choice name in Airtable.
const SOURCES: Record<string, string> = {
  grasshopper: "Grasshopper assistant",
  exe: "Standalone exe",
  cli: "CLI",
  cloud: "Cloud (FE>PE)",
};
const RESULTS: Record<string, string> = { passed: "Passed", failed: "Failed", could_not_run: "Could not run" };
const ERP: Record<string, string> = { ran: "Ran", partial: "Partly unavailable", not_run: "Not run" };
const LLM: Record<string, string> = { generated: "Generated", failed: "Failed", not_requested: "Not requested" };

// Callers using the shared DIAGNOSTIC_AUTH_TOKEN (it ships inside the Grasshopper script and every exe build,
// so it is an identifier, not a secret) may only record local runs.
export const LOCAL_SOURCES = ["grasshopper", "exe", "cli"];

export type Privilege = "local" | "server";

export interface RunInput {
  schema_version?: number;
  run_id: string;
  source: string;
  run_at: string;
  user?: { epicor_handle?: string; email?: string };
  file_name: string;
  job_number?: string;
  file_url?: string;
  findings_url?: string;
  file_path?: string;
  log_path?: string;
  result: string;
  errors?: number;
  warnings?: number;
  infos?: number;
  erp_checks?: string;
  llm?: string;
  action_plan?: string;
  release_record_id?: string;
}

export type Validation =
  | { ok: true; run: RunInput; raw: string }
  | { ok: false; status: number; errors: string[] };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const REC_RE = /^rec[A-Za-z0-9]{14}$/;
const MAX_ACTION_PLAN = 90000; // Airtable long text holds 100,000
const MAX_RAW = 95000;

const isStr = (v: unknown, max: number): v is string => typeof v === "string" && v.length > 0 && v.length <= max;
const isCount = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 1000000;

export function validateRun(body: unknown, privilege: Privilege, now: number = Date.now()): Validation {
  const errors: string[] = [];
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, status: 400, errors: ["body must be a JSON object"] };
  }
  const b = body as Record<string, unknown>;

  if (b.schema_version !== undefined && b.schema_version !== SCHEMA_VERSION) {
    errors.push(`schema_version ${String(b.schema_version)} is not supported (this route speaks ${SCHEMA_VERSION})`);
  }
  if (typeof b.run_id !== "string" || !UUID_RE.test(b.run_id)) errors.push("run_id must be a UUID");
  if (typeof b.source !== "string" || !(b.source in SOURCES)) errors.push(`source must be one of ${Object.keys(SOURCES).join(", ")}`);
  if (typeof b.run_at !== "string" || Number.isNaN(Date.parse(b.run_at))) {
    errors.push("run_at must be an ISO 8601 date-time");
  } else {
    const t = Date.parse(b.run_at);
    if (t < Date.parse("2020-01-01") || t > now + 24 * 3600 * 1000) errors.push("run_at is outside the accepted range");
  }
  if (!isStr(b.file_name, 255)) errors.push("file_name is required (max 255 chars)");
  if (b.job_number !== undefined && !isStr(b.job_number, 50)) errors.push("job_number must be a string (max 50 chars)");
  for (const k of ["file_path", "log_path"]) {
    if (b[k] !== undefined && !isStr(b[k], 600)) errors.push(`${k} must be a string (max 600 chars)`);
  }
  for (const k of ["file_url", "findings_url"]) {
    const v = b[k];
    if (v !== undefined && !(isStr(v, 2000) && /^https:\/\//i.test(v))) errors.push(`${k} must be an https URL (max 2000 chars)`);
  }
  if (typeof b.result !== "string" || !(b.result in RESULTS)) errors.push(`result must be one of ${Object.keys(RESULTS).join(", ")}`);
  for (const k of ["errors", "warnings", "infos"]) {
    if (b[k] !== undefined && !isCount(b[k])) errors.push(`${k} must be a non-negative integer`);
  }
  if (b.erp_checks !== undefined && !(typeof b.erp_checks === "string" && b.erp_checks in ERP)) {
    errors.push(`erp_checks must be one of ${Object.keys(ERP).join(", ")}`);
  }
  if (b.llm !== undefined && !(typeof b.llm === "string" && b.llm in LLM)) {
    errors.push(`llm must be one of ${Object.keys(LLM).join(", ")}`);
  }
  if (b.action_plan !== undefined && (typeof b.action_plan !== "string" || b.action_plan.length > MAX_ACTION_PLAN)) {
    errors.push(`action_plan must be a string (max ${MAX_ACTION_PLAN} chars)`);
  }
  if (b.user !== undefined) {
    const u = b.user as Record<string, unknown> | null;
    if (!u || typeof u !== "object" || Array.isArray(u)) {
      errors.push("user must be an object");
    } else {
      if (u.epicor_handle !== undefined && !isStr(u.epicor_handle, 100)) errors.push("user.epicor_handle must be a string (max 100)");
      if (u.email !== undefined && !isStr(u.email, 200)) errors.push("user.email must be a string (max 200)");
    }
  }
  if (b.release_record_id !== undefined && !(typeof b.release_record_id === "string" && REC_RE.test(b.release_record_id))) {
    errors.push("release_record_id must be an Airtable record id");
  }
  if (errors.length) return { ok: false, status: 400, errors };

  // Privilege: the shared token can't claim a cloud run or link a release.
  if (privilege === "local") {
    if (!LOCAL_SOURCES.includes(b.source as string)) {
      return { ok: false, status: 403, errors: ["this credential may only record local runs (grasshopper, exe, cli)"] };
    }
    if (b.release_record_id !== undefined) {
      return { ok: false, status: 403, errors: ["this credential may not set release_record_id"] };
    }
  }

  // Keep the payload as received, so a column can be added or re-derived later without re-running anything.
  let raw = JSON.stringify(b);
  if (raw.length > MAX_RAW) {
    const { action_plan: _dropped, ...rest } = b;
    raw = JSON.stringify({ ...rest, _note: "action_plan omitted from raw payload for size; see the Action plan field" });
  }
  return { ok: true, run: b as unknown as RunInput, raw };
}

// A Box Drive path, trimmed to start at a Box top-level folder the whole team sees (Awarded, or DFW CWKA Internal for
// tool logs). The Box Drive root differs between machines (one tree has an extra "Projects" level above these), so
// the stored path starts at the anchor and works after C:\BoxSync\Box\ for everyone. A path with no anchor is kept
// only when it is clearly inside the Box Drive root; anything else (a desktop file, a UNC path) is dropped so no
// local folder names are stored.
const BOX_ANCHORS = ["awarded", "dfw cwka internal"];
export function normalizeBoxPath(p: string | undefined): string | undefined {
  if (!p) return undefined;
  const parts = p.split(/[\\/]+/).filter((s) => s.length > 0);
  const anchor = parts.findIndex((s) => BOX_ANCHORS.includes(s.toLowerCase()));
  if (anchor >= 0) return parts.slice(anchor).join("\\");
  const root = parts.findIndex((s) => s.toLowerCase() === "boxsync");
  if (root >= 0 && parts[root + 1]?.toLowerCase() === "box" && parts.length > root + 2) {
    const rest = parts.slice(root + 2);
    return (rest[0].toLowerCase() === "projects" ? rest.slice(1) : rest).join("\\") || undefined;
  }
  return undefined;
}

// Fields keyed by ID. Only provided values are included, so a later update (for example the LLM plan arriving
// after the counts) never blanks what an earlier call wrote.
export function buildFields(run: RunInput, raw: string, personRecordIds: string[]): Record<string, unknown> {
  const f: Record<string, unknown> = {
    [F.runId]: run.run_id,
    [F.source]: SOURCES[run.source],
    [F.runAt]: new Date(run.run_at).toISOString(),
    [F.fileName]: run.file_name,
    [F.result]: RESULTS[run.result],
    [F.rawPayload]: raw,
    [F.schemaVersion]: SCHEMA_VERSION,
  };
  const raws = [run.user?.epicor_handle, run.user?.email].filter(Boolean);
  if (raws.length) f[F.userRaw] = raws.join(" | ");
  if (personRecordIds.length) f[F.user] = personRecordIds;
  if (run.job_number !== undefined) f[F.jobNumber] = run.job_number;
  if (run.file_url !== undefined) f[F.fileUrl] = run.file_url;
  if (run.findings_url !== undefined) f[F.findingsUrl] = run.findings_url;
  const filePath = normalizeBoxPath(run.file_path);
  if (filePath) f[F.filePath] = filePath;
  const logPath = normalizeBoxPath(run.log_path);
  if (logPath) f[F.logPath] = logPath;
  if (run.errors !== undefined) f[F.errors] = run.errors;
  if (run.warnings !== undefined) f[F.warnings] = run.warnings;
  if (run.infos !== undefined) f[F.infos] = run.infos;
  if (run.erp_checks !== undefined) f[F.erpChecks] = ERP[run.erp_checks];
  if (run.llm !== undefined) f[F.llm] = LLM[run.llm];
  if (run.action_plan !== undefined) f[F.actionPlan] = run.action_plan;
  if (run.release_record_id !== undefined) f[F.release] = [run.release_record_id];
  return f;
}

// ---- identity resolution -------------------------------------------------------------------------------------

// Lowercase, drop the domain, drop dots: "C.Marhoover@digifabshop.com" and "CMarhoover" both -> "cmarhoover".
// Compared against both the Epicor handle and the email's local part, so an alias domain or a dotted address
// still resolves.
export function identityKey(s: string | undefined): string {
  if (!s) return "";
  const local = s.includes("@") ? s.slice(0, s.indexOf("@")) : s;
  return local.trim().toLowerCase().replace(/\./g, "");
}

export interface PeopleRow {
  id: string; // People record id
  fields: Record<string, unknown>; // keyed by field ID (see P)
}
export type PeopleIndex = Map<string, Set<string>>; // identity key -> People record ids

// Only active employees are resolution targets (kind "employee", status "active"). Status is set by hand in the source
// Roles table and can lag, so a row whose offboard date has passed is skipped too: the person stays resolvable through
// their last day, and a stale "active" never credits a run to someone who has left. today is YYYY-MM-DD (UTC).
export function buildPeopleIndex(rows: PeopleRow[], today: string = new Date().toISOString().slice(0, 10)): PeopleIndex {
  const idx: PeopleIndex = new Map();
  const add = (key: string, id: string) => {
    if (!key) return;
    if (!idx.has(key)) idx.set(key, new Set());
    idx.get(key)!.add(id);
  };
  for (const r of rows) {
    const status = String(r.fields[P.status] ?? "");
    const kind = String(r.fields[P.kind] ?? "");
    if (status !== "active" || kind !== "employee") continue;
    const offboard = String(r.fields[P.offboardDate] ?? "").slice(0, 10);
    if (offboard && offboard < today) continue;
    add(identityKey(r.fields[P.epicorUserId] as string | undefined), r.id);
    add(identityKey(r.fields[P.email] as string | undefined), r.id);
  }
  return idx;
}

export interface Resolution {
  recordIds: string[];
  resolved: boolean;
  reason?: "no identity" | "no match" | "ambiguous";
}

export function resolveUser(idx: PeopleIndex, user: { epicor_handle?: string; email?: string } | undefined): Resolution {
  const keys = [identityKey(user?.epicor_handle), identityKey(user?.email)].filter(Boolean);
  if (!keys.length) return { recordIds: [], resolved: false, reason: "no identity" };
  const hits = new Set<string>();
  for (const k of keys) for (const id of idx.get(k) ?? []) hits.add(id);
  if (hits.size === 0) return { recordIds: [], resolved: false, reason: "no match" };
  if (hits.size > 1) return { recordIds: [], resolved: false, reason: "ambiguous" };
  return { recordIds: [...hits], resolved: true };
}
