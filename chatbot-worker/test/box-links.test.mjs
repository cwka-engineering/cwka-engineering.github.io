import test from "node:test";
import assert from "node:assert/strict";
import { planFileLinks } from "../src/lib/box-link-plan.ts";

test("resolved paths become link updates; misses and errors are left for the next sweep", async () => {
  const seen = [];
  const resolve = async (path) => {
    seen.push(path);
    if (path === "Awarded/P/hit.3dm") return "https://app.box.com/file/1";
    if (path === "Awarded/P/boom.3dm") throw new Error("Box down");
    return null;
  };
  const updates = await planFileLinks([
    { id: "rec1", filePath: "Awarded/P/hit.3dm" },
    { id: "rec2", filePath: "Awarded/P/miss.3dm" },
    { id: "rec3", filePath: "Awarded/P/boom.3dm" },
  ], resolve);
  assert.deepEqual(updates, [{ id: "rec1", url: "https://app.box.com/file/1" }]);
  assert.equal(seen.length, 3);
});

test("rows pointing at the same file cost one lookup", async () => {
  let n = 0;
  const resolve = async () => { n++; return "https://app.box.com/file/9"; };
  const updates = await planFileLinks([
    { id: "a", filePath: "Awarded/P/x.3dm" }, { id: "b", filePath: "Awarded/P/x.3dm" },
  ], resolve);
  assert.equal(n, 1);
  assert.deepEqual(updates.map((u) => u.id), ["a", "b"]);
});

test("nothing to do means no calls", async () => {
  assert.deepEqual(await planFileLinks([], async () => { throw new Error("unused"); }), []);
});
