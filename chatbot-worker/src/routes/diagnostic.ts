import { streamClaudeDiagnostic } from "../lib/claude";
import { checkToken, jsonResponse, sseResponse } from "../lib/helpers";
import type { Env, ChatMessage } from "../lib/types";

interface DiagnosticRequest {
  triage: Record<string, Array<{ severity: string; message: string; ids?: string[] }>>;
  epicor_context: Record<string, unknown>;
  rhino_context?: Record<string, unknown>;
  messages: ChatMessage[];
}

const DIAGNOSTIC_PREFIX = `You are the CWK/DFW FE-to-PE Diagnostic Assistant.

You have four grounded sources:
1. The engineering wiki (<wiki-corpus>) — procedures, standards, definitions, workflows.
2. The current validation results (<diagnostic-results>) — specific rule failures on this 3dm file.
3. The Epicor job milestone state (<epicor-context>) — calibrate urgency to where this job sits.
4. Live Rhino model state (<rhino-context>) — layer hierarchy, per-layer object counts, bounding
   box, units/tolerance, and geometry analysis for flagged objects. Present only when rhinomcp was
   active at assistant startup; absent if rhinomcp was not running. Data reflects model state at
   the time the assistant was opened — changes made after opening are not reflected.

RULES:
1. When explaining HOW to fix an issue, cite the relevant wiki page as a markdown link.
   Always use absolute URLs with base https://cwka-engineering.github.io — never relative paths.
   Example: [Brep UserText — Required Keys](https://cwka-engineering.github.io/standards/brep-user-text.html#how-to-set-required-keys)
2. When referencing failures, use exact rule names from <diagnostic-results>.
3. Use <epicor-context> to calibrate priority based on the "milestone" field:
   - FE Started → surface all errors/warnings; lead with upstream metadata fixes.
   - FE Submitted → emphasize anything blocking PA/Client Approval.
   - FE Approved → focus on items needed for FE Release (BOM complete, field dims, blocking errors).
   - FE Released → flag anything blocking PE pickup or PE Release.
   - PE Released → treat remaining issues as post-release cleanup only.
4. Order advice from most-blocking to least: Document metadata → Layer structure →
   Object metadata (Brep UserText) → Geometry/naming → ERP business rule checks.
   When an upstream failure is causing downstream failures, name the affected checks and
   tell the engineer to fix the root cause first — do not surface tier numbers or tier labels.
5. Call out cascade effects explicitly — name which downstream failures are likely symptoms
   of an upstream root cause and say so.
6. If the wiki does not cover a topic, say so — do not fabricate procedures.
7. Be concise and actionable. Use numbered steps or bullet lists for multi-step fixes.
8. When the engineer asks about current model state (object counts per layer, dimensions of
   flagged parts, layer hierarchy), answer from <rhino-context> when it is present. Remind the
   engineer that this data was captured at startup and may not reflect mid-session edits.
9. Layout cleanup workflow — when any of these are present: Layout Views warnings, layout-residue
   group names, or layout-residue block definition naming issues, the correct fix sequence is:
   (a) Delete all layout pages in Rhino (right-click each layout tab at the bottom of the
       viewport → Delete, or use the Layout command).
   (b) Then run Purge in Rhino to remove orphaned block definitions and groups.
   Running Purge alone without first deleting the layout pages has no effect — the pages hold
   live references to those blocks and groups, preventing Purge from removing them.

<wiki-corpus>
`;

const SYSTEM_PROMPT_SUFFIX = `
</wiki-corpus>`;

function formatDiagnosticContext(
  triage: DiagnosticRequest["triage"],
  epicor: DiagnosticRequest["epicor_context"],
  rhinoContext?: DiagnosticRequest["rhino_context"]
): string {
  const lines: string[] = [];

  lines.push("<diagnostic-results>");
  if (Object.keys(triage).length === 0) {
    lines.push("No validation failures recorded.");
  } else {
    lines.push("Per-rule failures (rule name: severity breakdown, all messages):");
    for (const [rule, issues] of Object.entries(triage)) {
      const errors = issues.filter((i) => i.severity === "error").length;
      const warnings = issues.filter((i) => i.severity === "warning").length;
      const infos = issues.filter((i) => i.severity === "info").length;
      const parts: string[] = [];
      if (errors) parts.push(`${errors} errors`);
      if (warnings) parts.push(`${warnings} warnings`);
      if (infos) parts.push(`${infos} infos`);
      const total = issues.length;
      lines.push(`  - ${rule}: ${total} total (${parts.join(", ")})`);
      for (const s of issues) {
        const ids = s.ids && s.ids.length > 0 ? ` [${s.ids.join(", ")}]` : "";
        lines.push(`      • (${s.severity}) ${s.message}${ids}`);
      }
    }
  }
  lines.push("</diagnostic-results>");
  lines.push("");

  lines.push("<epicor-context>");
  if (Object.keys(epicor).length === 0) {
    lines.push("Epicor job context unavailable.");
  } else {
    for (const [k, v] of Object.entries(epicor)) {
      lines.push(`${k}: ${v}`);
    }
  }
  lines.push("</epicor-context>");

  if (rhinoContext && Object.keys(rhinoContext).length > 0) {
    lines.push("");
    lines.push("<rhino-context>");
    lines.push(JSON.stringify(rhinoContext, null, 2));
    lines.push("</rhino-context>");
  }

  return lines.join("\n");
}

export async function handleDiagnostic(request: Request, env: Env): Promise<Response | null> {
  if (new URL(request.url).pathname !== "/api/diagnostic") return null;
  if (request.method !== "POST") return null;

  if (!checkToken(request, env.DIAGNOSTIC_AUTH_TOKEN)) {
    return jsonResponse(401, JSON.stringify({ error: "Unauthorized" }));
  }

  let body: DiagnosticRequest;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, JSON.stringify({ error: "Invalid JSON" }));
  }

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return jsonResponse(400, JSON.stringify({ error: "messages array required" }));
  }

  if (body.messages.length > 20) {
    body.messages = body.messages.slice(-20);
  }

  const corpus = await env.WIKI_CORPUS.get("wiki-corpus-fe-release");
  if (!corpus) {
    return jsonResponse(503, JSON.stringify({ error: "Wiki corpus not loaded." }));
  }

  const diagnosticContext = formatDiagnosticContext(
    body.triage || {},
    body.epicor_context || {},
    body.rhino_context
  );
  const cachedCorpus =
    DIAGNOSTIC_PREFIX + corpus + SYSTEM_PROMPT_SUFFIX + "\n\n" + diagnosticContext;

  try {
    const stream = await streamClaudeDiagnostic(
      body.messages,
      cachedCorpus,
      "",  // no dynamic block — triage is cached
      env.DIAGNOSTIC_ANTHROPIC_API_KEY,
      env.CLAUDE_MODEL
    );
    return sseResponse(stream);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Diagnostic API error:", message);
    return jsonResponse(502, JSON.stringify({ error: "Failed to get AI response." }));
  }
}
