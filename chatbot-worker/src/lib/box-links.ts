// Fill in "Box file URL" on local run records. Grasshopper, the exe and the CLI send the checked file's Box Drive path
// (trimmed by normalizeBoxPath to start at Awarded); a Box ID can't be read locally, so a cron sweep on this worker
// asks cwka-rhino-qc (which holds the Box credentials) to walk the folders and return the file, then writes the link.
// A sweep rather than a call at post time: a file saved moments ago may not have finished uploading from Box Drive,
// and a miss simply retries on the next sweep until the record is a few days old.
import type { Env } from "./types";
import { F } from "./runs";
import { listRunsMissingFileLink, patchRuns } from "./airtable";
import { planFileLinks } from "./box-link-plan";
import type { Resolver } from "./box-link-plan";


// Asks cwka-rhino-qc over the service binding. Null for "not there (yet)", throws for anything unexpected.
export function rhinoQcResolver(env: Env): Resolver {
  return async (path) => {
    const res = await env.RHINO_QC.fetch("https://cwka-rhino-qc/resolve", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.DIAGNOSTIC_CLOUD_AUTH_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`resolve HTTP ${res.status}`);
    return ((await res.json()) as { url?: string }).url ?? null;
  };
}

export async function sweepBoxLinks(env: Env): Promise<{ checked: number; linked: number }> {
  if (!env.RHINO_QC || !env.AIRTABLE_PAT || !env.DIAGNOSTIC_CLOUD_AUTH_TOKEN || !env.RUNS_BASE_ID) {
    return { checked: 0, linked: 0 };
  }
  const candidates = await listRunsMissingFileLink(env);
  const updates = await planFileLinks(candidates, rhinoQcResolver(env));
  if (updates.length) {
    await patchRuns(env, updates.map((u) => ({ id: u.id, fields: { [F.fileUrl]: u.url } })));
  }
  return { checked: candidates.length, linked: updates.length };
}
