import { checkRateLimit, jsonResponse } from "../lib/helpers";
import { getPeopleIndex, upsertRun } from "../lib/airtable";
import { buildFields, resolveUser, validateRun } from "../lib/runs";
import type { Privilege } from "../lib/runs";
import type { Env } from "../lib/types";

// POST /api/diagnostic-runs: records one diagnostic run in Airtable (table "Rhino Diagnostic Tool").
//
// Two credentials, privilege decided by the token:
//   DIAGNOSTIC_AUTH_TOKEN  (Grasshopper, exe, CLI; it ships inside the GH script and every exe build, so treat it as
//                           an identifier) -> local runs only; cannot claim a cloud run or set release_record_id
//   RUNS_SERVER_TOKEN      (the rhino-qc container and the FE>PE flow only)  -> everything
// Best-effort for callers: a failure here must never fail or block a run, so clients fire and forget.

const MAX_BODY_BYTES = 300_000;
const LOCAL_RUNS_PER_MINUTE = 60;
const enc = new TextEncoder();

// Hash both sides so the lengths match, then compare in constant time.
async function safeEqual(a: string, b: string): Promise<boolean> {
  const [ha, hb] = await Promise.all([crypto.subtle.digest("SHA-256", enc.encode(a)), crypto.subtle.digest("SHA-256", enc.encode(b))]);
  return crypto.subtle.timingSafeEqual(ha, hb);
}

async function privilegeOf(request: Request, env: Env): Promise<Privilege | null> {
  const auth = request.headers.get("Authorization") ?? "";
  // An unset secret must never match: `Bearer ${undefined}` would be a valid bearer value.
  if (env.RUNS_SERVER_TOKEN && (await safeEqual(auth, `Bearer ${env.RUNS_SERVER_TOKEN}`))) return "server";
  if (env.DIAGNOSTIC_AUTH_TOKEN && (await safeEqual(auth, `Bearer ${env.DIAGNOSTIC_AUTH_TOKEN}`))) return "local";
  return null;
}

export async function handleDiagnosticRuns(request: Request, env: Env): Promise<Response | null> {
  if (new URL(request.url).pathname !== "/api/diagnostic-runs") return null;
  if (request.method !== "POST") return null;

  if (!env.AIRTABLE_PAT || !env.RUNS_BASE_ID || !env.RUNS_TABLE_ID || !env.PEOPLE_TABLE_ID) {
    return jsonResponse(503, JSON.stringify({ error: "Run tracking is not configured" }));
  }

  const privilege = await privilegeOf(request, env);
  if (!privilege) return jsonResponse(401, JSON.stringify({ error: "Unauthorized" }));

  if (privilege === "local") {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (!(await checkRateLimit(`runs:${ip}`, env.RATE_LIMIT, LOCAL_RUNS_PER_MINUTE))) {
      return jsonResponse(429, JSON.stringify({ error: "Too many requests" }));
    }
  }

  const declared = Number(request.headers.get("Content-Length") || 0);
  if (declared > MAX_BODY_BYTES) return jsonResponse(413, JSON.stringify({ error: "Payload too large" }));
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return jsonResponse(413, JSON.stringify({ error: "Payload too large" }));

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return jsonResponse(400, JSON.stringify({ error: "Invalid JSON" }));
  }

  const v = validateRun(body, privilege);
  if (!v.ok) return jsonResponse(v.status, JSON.stringify({ error: "Invalid run", details: v.errors }));

  const people = await getPeopleIndex(env);
  const who = people ? resolveUser(people, v.run.user) : { recordIds: [], resolved: false, reason: "no match" as const };

  try {
    const { id, created } = await upsertRun(env, buildFields(v.run, v.raw, who.recordIds));
    return jsonResponse(200, JSON.stringify({ ok: true, record_id: id, created, user: { resolved: who.resolved, reason: who.reason } }));
  } catch (err) {
    console.error("Diagnostic run write failed:", err instanceof Error ? err.message : String(err));
    return jsonResponse(502, JSON.stringify({ error: "Could not record the run" }));
  }
}
