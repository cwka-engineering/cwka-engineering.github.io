// node --test test/   (Node 22.18+ strips the TypeScript types when importing runs.ts)
import test from "node:test";
import assert from "node:assert/strict";
import {
  validateRun, buildFields, normalizeBoxPath, identityKey, buildPeopleIndex, resolveUser, F, P, SCHEMA_VERSION,
} from "../src/lib/runs.ts";

const NOW = Date.parse("2026-10-14T12:00:00Z");
const good = () => ({
  schema_version: 1,
  run_id: "7fe75ae5-05fa-4c7d-9ef2-2a9a26fa2c90",
  source: "grasshopper",
  run_at: "2026-10-14T11:40:00Z",
  user: { epicor_handle: "aexample", email: "A.Example@digifabshop.com" },
  file_name: "1105.007_PE_20251106.3dm",
  job_number: "1105.007",
  result: "failed",
  errors: 2, warnings: 2, infos: 7,
  erp_checks: "ran",
  llm: "generated",
  action_plan: "## Action Steps\n1. Fix things",
});

// ---- validation ----
test("accepts a full local payload and keeps it as received", () => {
  const v = validateRun(good(), "local", NOW);
  assert.equal(v.ok, true);
  assert.deepEqual(JSON.parse(v.raw), good());
});

test("rejects malformed input with every problem listed", () => {
  const v = validateRun({ ...good(), run_id: "nope", source: "fax", errors: -1, run_at: "yesterday", result: "meh" }, "local", NOW);
  assert.equal(v.ok, false);
  assert.equal(v.status, 400);
  assert.equal(v.errors.length, 5);
});

test("rejects non-objects, arrays and unsupported schema versions", () => {
  for (const bad of [null, "x", 5, [], undefined]) assert.equal(validateRun(bad, "local", NOW).ok, false);
  assert.equal(validateRun({ ...good(), schema_version: 2 }, "local", NOW).ok, false);
});

test("rejects dates far in the future or before 2020", () => {
  assert.equal(validateRun({ ...good(), run_at: "2026-10-20T00:00:00Z" }, "local", NOW).ok, false);
  assert.equal(validateRun({ ...good(), run_at: "2019-12-31T00:00:00Z" }, "local", NOW).ok, false);
});

test("the shared token can only record local runs and cannot link a release", () => {
  const cloud = validateRun({ ...good(), source: "cloud" }, "local", NOW);
  assert.equal(cloud.ok, false);
  assert.equal(cloud.status, 403);
  const rel = validateRun({ ...good(), release_record_id: "recAAAAAAAAAAAAAA" }, "local", NOW);
  assert.equal(rel.ok, false);
  assert.equal(rel.status, 403);
});

test("the server token may record cloud runs and link a release", () => {
  const v = validateRun({ ...good(), source: "cloud", release_record_id: "recAAAAAAAAAAAAAA" }, "server", NOW);
  assert.equal(v.ok, true);
});

test("a malformed release id is rejected even for the server token", () => {
  assert.equal(validateRun({ ...good(), source: "cloud", release_record_id: "12345" }, "server", NOW).ok, false);
});

test("oversize raw payloads drop the action plan from the raw copy, not from the field", () => {
  const big = { ...good(), action_plan: "x".repeat(90000), details: "y".repeat(10000) };
  const v = validateRun(big, "local", NOW);
  assert.equal(v.ok, true);
  assert.ok(v.raw.length < 95000);
  assert.ok(!v.raw.includes("xxxxxxxxxx"));
  assert.ok(JSON.parse(v.raw)._note);
  assert.equal(buildFields(v.run, v.raw, [])[F.actionPlan].length, 90000);
});

test("action plans over the limit are rejected", () => {
  assert.equal(validateRun({ ...good(), action_plan: "x".repeat(90001) }, "local", NOW).ok, false);
});

// ---- field mapping ----
test("maps values to Airtable choice names, keyed by field ID", () => {
  const v = validateRun(good(), "local", NOW);
  const f = buildFields(v.run, v.raw, ["recPERSON000000A"]);
  assert.equal(f[F.source], "Grasshopper assistant");
  assert.equal(f[F.result], "Failed");
  assert.equal(f[F.erpChecks], "Ran");
  assert.equal(f[F.llm], "Generated");
  assert.equal(f[F.runAt], "2026-10-14T11:40:00.000Z");
  assert.deepEqual(f[F.user], ["recPERSON000000A"]);
  assert.equal(f[F.userRaw], "aexample | A.Example@digifabshop.com");
  assert.equal(f[F.schemaVersion], SCHEMA_VERSION);
  assert.equal(f[F.errors], 2);
});

test("only provided values are written, so a later update can't blank earlier ones", () => {
  const minimal = { run_id: good().run_id, source: "cli", run_at: good().run_at, file_name: "a.3dm", result: "passed" };
  const v = validateRun(minimal, "local", NOW);
  const f = buildFields(v.run, v.raw, []);
  for (const k of [F.errors, F.warnings, F.infos, F.actionPlan, F.llm, F.erpChecks, F.jobNumber, F.user, F.userRaw, F.release, F.fileUrl, F.findingsUrl, F.filePath, F.logPath]) {
    assert.ok(!(k in f), `${k} should be absent`);
  }
});

test("Box Drive paths are trimmed to start at Awarded or DFW CWKA Internal, and non-Box paths are dropped", () => {
  const cases = [
    ["C:\\BoxSync\\Box\\Awarded\\1105_Proj\\03 Engineering\\a.3dm", "Awarded\\1105_Proj\\03 Engineering\\a.3dm"],
    ["C:\\BoxSync\\Box\\Projects\\Awarded\\1105_Proj\\a.3dm", "Awarded\\1105_Proj\\a.3dm"],
    ["c:/boxsync/box/projects/dfw cwka internal/_ENG-RESOURCE/Shared GH/Toolkit Logs/Assistant/x.md",
      "dfw cwka internal\\_ENG-RESOURCE\\Shared GH\\Toolkit Logs\\Assistant\\x.md"],
    ["C:\\BoxSync\\Box\\Operations\\Misc\\a.3dm", "Operations\\Misc\\a.3dm"],
    ["C:\\BoxSync\\Box\\Projects\\Other\\a.3dm", "Other\\a.3dm"],
    ["C:\\Users\\someone\\Desktop\\a.3dm", undefined],
    ["\\\\server\\share\\a.3dm", undefined],
    ["C:\\BoxSync\\Box", undefined],
    ["", undefined],
  ];
  for (const [input, want] of cases) assert.equal(normalizeBoxPath(input), want, input);
  assert.equal(normalizeBoxPath(undefined), undefined);
});

test("file_path and log_path are written normalized, and omitted when not a Box path", () => {
  const v = validateRun({ ...good(), file_path: "C:\\BoxSync\\Box\\Projects\\Awarded\\P\\a.3dm", log_path: "C:\\Users\\x\\log.md" }, "local", NOW);
  const f = buildFields(v.run, v.raw, []);
  assert.equal(f[F.filePath], "Awarded\\P\\a.3dm");
  assert.ok(!(F.logPath in f));
  for (const bad of ["", 5, "x".repeat(601)]) {
    assert.equal(validateRun({ ...good(), file_path: bad }, "local", NOW).ok, false, String(bad).slice(0, 10));
  }
});

test("file_url and findings_url are written when given and must be https URLs", () => {
  const url = "https://digifabshop.box.com/s/abc123";
  const found = "https://app.box.com/file/1234567890";
  const v = validateRun({ ...good(), file_url: url, findings_url: found }, "local", NOW);
  const f = buildFields(v.run, v.raw, []);
  assert.equal(f[F.fileUrl], url);
  assert.equal(f[F.findingsUrl], found);
  for (const key of ["file_url", "findings_url"]) {
    for (const bad of ["http://box.com/s/x", "javascript:alert(1)", "", 5]) {
      const r = validateRun({ ...good(), [key]: bad }, "local", NOW);
      assert.equal(r.ok, false, `${key}: ${String(bad)}`);
    }
  }
});

test("a zero count is written, not skipped", () => {
  const v = validateRun({ ...good(), errors: 0 }, "local", NOW);
  assert.equal(buildFields(v.run, v.raw, [])[F.errors], 0);
});

// ---- identity resolution ----
test("identityKey lowercases, drops the domain and dots", () => {
  assert.equal(identityKey("C.Marhoover@digifabshop.com"), "cmarhoover");
  assert.equal(identityKey("CMarhoover"), "cmarhoover");
  assert.equal(identityKey("CMarhoover@cwkeller.com"), "cmarhoover");
  assert.equal(identityKey("  j.mcgrath "), "jmcgrath");
  assert.equal(identityKey(undefined), "");
  assert.equal(identityKey(""), "");
});

const row = (id, over = {}) => ({
  id,
  fields: { [P.status]: "active", [P.kind]: "employee", [P.epicorUserId]: "", [P.email]: "", ...over },
});

const people = () => buildPeopleIndex([
  row("recADA0000000000A", { [P.epicorUserId]: "AExample", [P.email]: "aexample@cwkeller.com" }),
  row("recBOB0000000000B", { [P.epicorUserId]: "b.builder", [P.email]: "bob@digifabshop.com" }), // email != handle
  row("recOLD0000000000C", { [P.status]: "inactive", [P.epicorUserId]: "gone", [P.email]: "gone@cwkeller.com" }),
  row("recEXT0000000000D", { [P.kind]: "external", [P.epicorUserId]: "vendor1" }),
  row("recNOID000000000E"), // active employee the sync could not fill: contributes nothing
]);

test("resolves by handle, case-insensitively", () => {
  assert.deepEqual(resolveUser(people(), { epicor_handle: "aexample" }).recordIds, ["recADA0000000000A"]);
  assert.deepEqual(resolveUser(people(), { epicor_handle: "AEXAMPLE" }).recordIds, ["recADA0000000000A"]);
});

test("resolves a Microsoft alias domain and a dotted address through the same key", () => {
  assert.deepEqual(resolveUser(people(), { email: "A.Example@digifabshop.com" }).recordIds, ["recADA0000000000A"]);
});

test("a handle and an email that disagree with the roster email still resolve via the handle", () => {
  // roster email is bob@..., the requester uses b.builder@... (the handle's local part)
  assert.deepEqual(resolveUser(people(), { email: "b.builder@digifabshop.com" }).recordIds, ["recBOB0000000000B"]);
  assert.deepEqual(resolveUser(people(), { email: "bob@cwkeller.com" }).recordIds, ["recBOB0000000000B"]);
});

test("inactive and external rows are never resolution targets", () => {
  assert.equal(resolveUser(people(), { epicor_handle: "gone" }).reason, "no match");
  assert.equal(resolveUser(people(), { epicor_handle: "vendor1" }).reason, "no match");
});

test("no identity and no match are reported, not guessed", () => {
  assert.equal(resolveUser(people(), undefined).reason, "no identity");
  assert.equal(resolveUser(people(), {}).reason, "no identity");
  assert.equal(resolveUser(people(), { email: "stranger@example.com" }).reason, "no match");
});

test("a handle and an email pointing at different people is ambiguous", () => {
  const r = resolveUser(people(), { epicor_handle: "aexample", email: "bob@digifabshop.com" });
  assert.equal(r.resolved, false);
  assert.equal(r.reason, "ambiguous");
});

test("two people colliding on a normalized key is ambiguous", () => {
  const idx = buildPeopleIndex([
    row("recONE0000000000A", { [P.epicorUserId]: "j.smith" }),
    row("recTWO0000000000B", { [P.epicorUserId]: "jsmith" }),
  ]);
  assert.equal(resolveUser(idx, { epicor_handle: "jsmith" }).reason, "ambiguous");
});
