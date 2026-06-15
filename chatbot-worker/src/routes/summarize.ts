import { streamClaudeDiagnostic } from "../lib/claude";
import { checkToken, jsonResponse, sseResponse } from "../lib/helpers";
import type { Env, ChatMessage } from "../lib/types";

interface SummarizeRequest {
  payload_text: string;
}

const SUMMARIZE_PREFIX = `You are assisting with Rhino 3dm QC validation for FE-to-PE (Fabrication Engineering to Production Engineering) release. Given validation results from a diagnostic tool, produce a concise, prioritized action plan.

Use the exact validation category names shown in the data (e.g. "Brep Naming", "Layout Views", "BOM Materials", "Clash Detection") — do not substitute technical or variable names.

When recommending a fix, cite the relevant wiki page from <wiki-corpus> as a markdown link if applicable.
Always use absolute URLs with base https://cwka-engineering.github.io — never relative paths.
Example: [Part Naming — Generate Names](https://cwka-engineering.github.io/workflows/fabrication-engineer/part-naming.html#how-to-generate-names)

## Job milestone calibration
The validation data may begin with a "Job Milestone:" line derived from ERP fields.
Use it to calibrate urgency and focus — do not just repeat it; let it shape which issues
you emphasize and how urgently you frame the steps:

- **FE Started** — job is in early FE; surface all errors and warnings, including metadata gaps.
  Upstream fixes (document UserText, layer structure) unblock the most downstream checks, so lead with those.
- **FE Submitted** — drawings are under review; PA/Client Approval flags and any remaining blocking
  errors are most time-sensitive. Flag anything that could delay approval.
- **FE Approved** — approval received; focus on items needed to enable FE Release
  (BOM complete, field dims, release-blocking validation errors).
- **FE Released** — job is released; flag anything blocking PE pickup or PE Release.
- **PE Released** — pipeline complete; treat remaining issues as post-release cleanup only.

If no "Job Milestone:" line is present, calibrate based on what the validation data implies.

## Ordering rules (internal guidance — do NOT expose tier numbers in the output)
Order steps from most-blocking to least. Upstream failures that cause other checks to fail
must come first — fixing them resolves multiple downstream errors at once.

Use this dependency order to sort steps (do not label steps with tier numbers):
1. Document metadata (job/project UserText) — without it ERP cannot resolve job context.
2. Layer structure — incorrect layers break BOM extraction.
3. Object metadata (Brep UserText) — missing it blocks Congruent Parts, Polysurface Dimensions, Clash Detection.
4. Geometry and naming — usually independent once metadata is present.
5. ERP business rule checks — only meaningful when metadata allows ERP to evaluate.

When fixing an upstream issue will also clear downstream failures, say so plainly in the step:
  e.g. "Fix Brep UserText — this also restores the Congruent Parts and Clash Detection checks."

## Layout cleanup workflow (critical ordering — must appear as written when relevant)
When layout-residue issues are present (Layout Views, Group Names, Block Definition Naming),
always give the two-step sequence in this exact order:
1. Delete all layout pages (right-click each layout tab at the bottom of the Rhino viewport
   → Delete, or use the Layout command to remove them).
2. Then run Purge in Rhino.
IMPORTANT: Running Purge alone has no effect if layout pages still exist — they hold live
references to the blocks and groups, preventing Purge from removing anything. This two-step
sequence must always be presented as a single combined step, not as two separate action items.

## Required output structure (markdown)
1. **## Action Steps** (required — primary section)
   - Numbered list, most-blocking first.
   - Each step: **[Category Name]** — one-sentence action.
   - If a fix unblocks other failing checks, add a brief note inline: *(also clears Congruent Parts / Polysurface Dimensions)*
   - Within the same priority level, order by severity (errors before warnings).
   - Merge related issues into one step; split when different work is required.
   - If no issues, state that clearly.
2. **## Patterns** (optional — only if it adds insight not already covered in the steps)
   - 2–4 bullet points on recurring themes or root-vs-symptom relationships.
   - Use bullets, not a prose paragraph.
3. **## Per-file notes** (only if multiple files were validated)
   - Short bullets for file-specific differences.

Be concise. The action steps should be scannable at a glance.

<wiki-corpus>
`;

const SYSTEM_PROMPT_SUFFIX = `
</wiki-corpus>`;

export async function handleSummarize(request: Request, env: Env): Promise<Response | null> {
  if (new URL(request.url).pathname !== "/api/summarize") return null;
  if (request.method !== "POST") return null;

  if (!checkToken(request, env.DIAGNOSTIC_AUTH_TOKEN)) {
    return jsonResponse(401, JSON.stringify({ error: "Unauthorized" }));
  }

  let body: SummarizeRequest;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, JSON.stringify({ error: "Invalid JSON" }));
  }

  if (!body.payload_text || typeof body.payload_text !== "string" || !body.payload_text.trim()) {
    return jsonResponse(400, JSON.stringify({ error: "payload_text required" }));
  }

  const corpus = await env.WIKI_CORPUS.get("wiki-corpus-fe-release");
  if (!corpus) {
    return jsonResponse(503, JSON.stringify({ error: "Wiki corpus not loaded." }));
  }

  const cachedCorpus = SUMMARIZE_PREFIX + corpus + SYSTEM_PROMPT_SUFFIX;
  const dynamicContext =
    "<validation-data>\n" + body.payload_text.trim() + "\n</validation-data>";

  const messages: ChatMessage[] = [
    { role: "user", content: "Produce the prioritized action plan." },
  ];

  try {
    const stream = await streamClaudeDiagnostic(
      messages,
      cachedCorpus,
      dynamicContext,
      env.DIAGNOSTIC_ANTHROPIC_API_KEY,
      env.CLAUDE_MODEL,
      0  // deterministic output for structured action plan
    );
    return sseResponse(stream);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Summarize API error:", message);
    return jsonResponse(502, JSON.stringify({ error: "Failed to get AI response." }));
  }
}
