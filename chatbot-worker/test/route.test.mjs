// Integration test for POST /api/diagnostic-runs with Airtable stubbed out. The route is bundled with esbuild
// (already installed with wrangler) because its imports are extensionless TypeScript that Node cannot resolve.
import test, { before, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { timingSafeEqual } from "node:crypto";
import { F, P } from "../src/lib/runs.ts";

// crypto.subtle.timingSafeEqual is a Cloudflare Workers extension; stand in for it under Node.
if (!globalThis.crypto.subtle.timingSafeEqual) {
  Object.defineProperty(globalThis.crypto.subtle, "timingSafeEqual", {
    value: (a, b) => timingSafeEqual(Buffer.from(a), Buffer.from(b)),
  });
}

const PAT = "patTESTTOKEN.notarealsecret";
const DIAG = "diag-token-shared";
const SERVER = "server-token-only";
const BASE = "appTESTBASE000000", RUNS = "tblRUNSTABLE00000", PEOPLE = "tblPEOPLETABLE000";

let bundle;
let n = 0;
before(async () => {
  const out = join(mkdtempSync(join(tmpdir(), "runs-route-")), "route.mjs");
  await build({ entryPoints: ["src/routes/diagnostic-runs.ts"], bundle: true, format: "esm", platform: "neutral", outfile: out, logLevel: "silent" });
  bundle = pathToFileURL(out).href;
});
const fresh = async () => (await import(`${bundle}?n=${++n}`)).handleDiagnosticRuns; // new module = empty people cache

const kv = (stamps = []) => ({ get: async () => (stamps.length ? JSON.stringify(stamps) : null), put: async () => {} });
const env = (over = {}) => ({
  AIRTABLE_PAT: PAT, RUNS_SERVER_TOKEN: SERVER, DIAGNOSTIC_AUTH_TOKEN: DIAG,
  RUNS_BASE_ID: BASE, RUNS_TABLE_ID: RUNS, PEOPLE_TABLE_ID: PEOPLE, RATE_LIMIT: kv(), ...over,
});
const body = (over = {}) => ({
  schema_version: 1, run_id: "7fe75ae5-05fa-4c7d-9ef2-2a9a26fa2c90", source: "grasshopper",
  run_at: new Date(Date.now() - 60000).toISOString(), user: { epicor_handle: "aexample" },
  file_name: "1105.007_PE_20251106.3dm", result: "failed", errors: 2, warnings: 2, infos: 7, ...over,
});
const post = (b, token = DIAG, raw) =>
  new Request("https://w.example/api/diagnostic-runs", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: raw ?? JSON.stringify(b),
  });

const peopleRows = [
  { id: "recADA0000000000A", fields: { [P.status]: "active", [P.kind]: "employee", [P.epicorUserId]: "AExample", [P.email]: "aexample@cwkeller.com" } },
];

let calls, realFetch, airtable;
beforeEach(() => {
  calls = [];
  airtable = { people: () => new Response(JSON.stringify({ records: peopleRows }), { status: 200 }),
               upsert: () => new Response(JSON.stringify({ records: [{ id: "recRUN00000000001" }], createdRecords: ["recRUN00000000001"] }), { status: 200 }) };
  realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });
    return String(url).includes(PEOPLE) ? airtable.people() : airtable.upsert();
  };
});
afterEach(() => { globalThis.fetch = realFetch; });

const run = async (req, e = env()) => (await fresh())(req, e);
const upsertCall = () => calls.find((c) => c.init.method === "PATCH");

test("ignores other paths and methods", async () => {
  const h = await fresh();
  assert.equal(await h(new Request("https://w.example/api/other", { method: "POST" }), env()), null);
  assert.equal(await h(new Request("https://w.example/api/diagnostic-runs", { method: "GET" }), env()), null);
});

test("503 when Airtable is not configured", async () => {
  assert.equal((await run(post(body()), env({ AIRTABLE_PAT: "" }))).status, 503);
});

test("401 with no, wrong, or unset-secret tokens (fails closed)", async () => {
  assert.equal((await run(post(body(), "nope"))).status, 401);
  assert.equal((await run(post(body(), "undefined"), env({ DIAGNOSTIC_AUTH_TOKEN: undefined, RUNS_SERVER_TOKEN: undefined }))).status, 401);
  assert.equal(calls.length, 0, "no Airtable call may happen before auth");
});

test("local happy path: resolves the user, upserts on Run ID, keys fields by ID", async () => {
  const res = await run(post(body()));
  assert.equal(res.status, 200);
  const out = await res.json();
  assert.deepEqual(out, { ok: true, record_id: "recRUN00000000001", created: true, user: { resolved: true } });
  const c = upsertCall();
  assert.equal(c.url, `https://api.airtable.com/v0/${BASE}/${RUNS}`);
  assert.equal(c.init.headers.Authorization, `Bearer ${PAT}`);
  const sent = JSON.parse(c.init.body);
  assert.deepEqual(sent.performUpsert, { fieldsToMergeOn: [F.runId] });
  const f = sent.records[0].fields;
  assert.deepEqual(f[F.user], ["recADA0000000000A"]);
  assert.equal(f[F.source], "Grasshopper assistant");
  assert.equal(f[F.errors], 2);
});

test("the People lookup only asks for active employees and the needed fields", async () => {
  await run(post(body()));
  const c = calls.find((x) => x.url.includes(PEOPLE));
  const q = new URL(c.url).searchParams;
  assert.equal(q.get("filterByFormula"), "AND({Status}='active',{Kind}='employee')");
  assert.deepEqual(q.getAll("fields[]").sort(), [P.employeeId, P.kind, P.status, P.email, P.epicorUserId].sort());
});

test("an unresolved user still records the run, with the raw identifier kept", async () => {
  const res = await run(post(body({ user: { email: "stranger@example.com" } })));
  assert.equal(res.status, 200);
  assert.deepEqual((await res.json()).user, { resolved: false, reason: "no match" });
  const f = JSON.parse(upsertCall().init.body).records[0].fields;
  assert.ok(!(F.user in f));
  assert.equal(f[F.userRaw], "stranger@example.com");
});

test("if the People read fails, the run is still recorded without a User link", async () => {
  airtable.people = () => new Response("boom", { status: 500 });
  const res = await run(post(body()));
  assert.equal(res.status, 200);
  assert.ok(!(F.user in JSON.parse(upsertCall().init.body).records[0].fields));
});

test("an update reports created:false", async () => {
  airtable.upsert = () => new Response(JSON.stringify({ records: [{ id: "recRUN00000000001" }], updatedRecords: ["recRUN00000000001"] }), { status: 200 });
  assert.equal((await (await run(post(body()))).json()).created, false);
});

test("the shared token cannot claim a cloud run or set a release; nothing is written", async () => {
  assert.equal((await run(post(body({ source: "cloud" })))).status, 403);
  assert.equal((await run(post(body({ release_record_id: "recAAAAAAAAAAAAAA" })))).status, 403);
  assert.equal(calls.length, 0);
});

test("the server token may record a cloud run and link a release", async () => {
  const res = await run(post(body({ source: "cloud", release_record_id: "recAAAAAAAAAAAAAA" }), SERVER));
  assert.equal(res.status, 200);
  const f = JSON.parse(upsertCall().init.body).records[0].fields;
  assert.equal(f[F.source], "Cloud (FE>PE)");
  assert.deepEqual(f[F.release], ["recAAAAAAAAAAAAAA"]);
});

test("400 for bad JSON and for an invalid run, listing the problems", async () => {
  assert.equal((await run(post(null, DIAG, "{not json"))).status, 400);
  const res = await run(post(body({ run_id: "x", result: "meh" })));
  assert.equal(res.status, 400);
  assert.equal((await res.json()).details.length, 2);
});

test("413 for an oversize body", async () => {
  assert.equal((await run(post(null, DIAG, JSON.stringify({ pad: "x".repeat(310000) })))).status, 413);
});

test("429 for the shared token over the rate limit, but not for the server token", async () => {
  const now = Math.floor(Date.now() / 1000);
  const busy = env({ RATE_LIMIT: kv(Array.from({ length: 60 }, () => now)) });
  assert.equal((await run(post(body()), busy)).status, 429);
  assert.equal((await run(post(body({ source: "cloud" }), SERVER), busy)).status, 200);
});

test("an Airtable write failure returns 502 and leaks neither Airtable's body nor the token", async () => {
  airtable.upsert = () => new Response(`INVALID_VALUE_FOR_COLUMN ${PAT}`, { status: 422 });
  const res = await run(post(body()));
  assert.equal(res.status, 502);
  const text = await res.text();
  assert.ok(!text.includes(PAT) && !text.includes("INVALID_VALUE"));
});

test("the Airtable token never appears in any response body", async () => {
  for (const req of [post(body()), post(body(), "nope"), post(null, DIAG, "{bad")]) {
    assert.ok(!(await (await run(req)).text()).includes(PAT));
  }
});

test("the Worker log redacts the Airtable token too", async () => {
  airtable.upsert = () => new Response(`INVALID ${PAT}`, { status: 422 });
  const logged = [];
  const orig = console.error;
  console.error = (...a) => logged.push(a.join(" "));
  try { await run(post(body())); } finally { console.error = orig; }
  assert.ok(logged.length > 0);
  assert.ok(!logged.join("\n").includes(PAT));
});
