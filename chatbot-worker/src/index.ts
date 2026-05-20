/**
 * CWK/DFW Engineering Wiki Chatbot — Cloudflare Worker
 *
 * Routes:
 *   POST /api/chat         — Wiki Q&A chatbot (public, CORS-gated)
 *   POST /api/diagnostic   — GH Diagnostic Assistant (token-gated, SSE streaming)
 *   POST /api/summarize    — rhino-qc GUI summary (token-gated, SSE streaming)
 *   POST /api/parts-match  — Epicor parts matching for Power Automate (token-gated, JSON)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Env {
  WIKI_CORPUS: KVNamespace;
  RATE_LIMIT: KVNamespace;
  CHAT_ANTHROPIC_API_KEY: string;
  DIAGNOSTIC_ANTHROPIC_API_KEY: string;
  ALLOWED_ORIGIN: string;
  CLAUDE_MODEL: string;
  MAX_REQUESTS_PER_MINUTE: string;
  DIAGNOSTIC_AUTH_TOKEN: string;
  PA_AUTH_TOKEN: string;
  PA_ANTHROPIC_API_KEY: string;
  PA_CLAUDE_MODEL: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

interface DiagnosticRequest {
  triage: Record<string, Array<{ severity: string; message: string; ids?: string[] }>>;
  epicor_context: Record<string, unknown>;
  messages: ChatMessage[];
}

interface SummarizeRequest {
  payload_text: string;
}

interface PartsMatchRequest {
  user_input: string;
  parts_list: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CORPUS_KV_KEY = "wiki-corpus-prompt";

// --- Wiki chatbot (existing) ---

const SYSTEM_PROMPT_PREFIX = `You are the CWK/DFW Engineering Wiki assistant.

RULES — follow these strictly:
1. Answer questions using ONLY the wiki content provided in <wiki-corpus>.
2. For every factual claim, cite the source page as a markdown link.
   Use the page URL from the [PAGE] header. If a specific anchor is relevant,
   append #anchor-id to the URL (anchors are listed in [ANCHORS]).
   Example: [Part Naming](/workflows/fabrication-engineer/part-naming.html#how-to-generate-names)
3. If the wiki does not cover a topic, say so honestly — do NOT guess or
   fabricate information.
4. Keep answers concise: 1–4 short paragraphs. Use bullet lists when helpful.
5. When multiple pages are relevant, cite all of them.
6. Do not reproduce large blocks of wiki content verbatim — summarize and link.
7. If asked about a person by name, do not speculate — the wiki's
   "Primary Troubleshooting Contacts" section on the Onboarding page is
   the only name directory.

<wiki-corpus>
`;

const SYSTEM_PROMPT_SUFFIX = `
</wiki-corpus>`;

// --- Diagnostic Assistant (GH multi-turn) ---

const DIAGNOSTIC_PREFIX = `You are the CWK/DFW FE-to-PE Diagnostic Assistant.

You have three grounded sources:
1. The engineering wiki (<wiki-corpus>) — procedures, standards, definitions, workflows.
2. The current validation results (<diagnostic-results>) — specific rule failures on this 3dm file.
3. The Epicor job milestone state (<epicor-context>) — calibrate urgency to where this job sits.

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

<wiki-corpus>
`;

// --- GUI Summary (one-shot action plan) ---

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

// --- Parts matching for Power Automate ---

const PARTS_MATCH_SYSTEM_PROMPT = `You are a parts master assistant for a precision architectural fabrication company using Epicor ERP. You match user-described materials against an existing parts catalog, or generate a correctly-formatted new part description when no match exists.

## Catalog Structure

Parts are organized into nine categories, each with a distinct part number prefix and description conventions:

**Hardware (GM.HW.xxxxx)**
Format: [Form Factor],[Subtype/Feature(s)],[Size Spec],[Brand],[Model Number]
SearchWords: ANCHOR, BOLT, BRACKET, CABLE, CASTER, CATCH, DOORHW, GASKET, GROMMET, HINGE, LATCH, LOCK, NUT, PULL, RIVET, SCREW, SLIDE, SPACER, WASHER
Examples:
  Drawer Slide,Blumotion Tandem Plus,18" L,Blum,563H4570B
  Screw,Machine,Pan,Phillips,#8-32,1"L,Zinc
  Pull,Edge,Doug Mockett,DP3A 10B,English Antique,3" L

**Inventory Metal (GM.MT.xxxxx)**
Format: [Form Factor],[Material Type],[Alloy/Grade],[Finish],[Thickness T],[Width W],[Height H]
SearchWords: ANGLE, CHANNEL, DECMET, DISC, EXTRUSN, FLATBAR, PIPE, PLATE, RECTTUBE, RNDBAR, RNDTUBE, SHEET, SQBAR, SQTUBE, STUD, TEE, ZBAR
Examples:
  Square Tube,Hot Rolled Steel,A500,Raw,3/8" T,6" W,6" H
  Angle,Aluminum,6061,Raw,1/2" T,1" W,1" H

**Sheet Goods (GM.SG.xxxxx)**
Format: [Form Factor],[Grade/Type],[Brand],[Manufacturer],[Species/Color],[Cut/Pattern],[Certifications],[Thickness],[Width"xLength"]
SearchWords: ACRYLIC, BACKER, BENDPLY, BENDSUB, CEMBOARD, DRYWALL, EDGEBAND, FELT, FOAM, FRP, HDF, HONYCOMB, INSUL, LAMINATE, MASONITE, MDF, OSB, PB, PEGBOARD, PLAM, PLY, SCREWCOV, TAMBOUR, VENEER, VENPANEL
Examples:
  Veneer,Standard Grade,10mil Backer,White Oak,Rift Sawn,48"x96"
  MDF,Roseburg,Armorite,Raw,FSC,MR50,3/4",48"x96"

**Solid Surface (GM.SS.xxxxx)**
Format: [Form Factor],[Brand],[Manufacturer],[Color Code],[Color Name],[Finish],[Thickness],[Width" x Length"]
SearchWords: ADHESIVE, MIXTIP, SHEET
Examples:
  Sheet,Corian,Dupont,Deep Caviar,Matte,1/2",30" x 144"

**Solid Lumber (GM.SL.xxxxx)**
Format: [Species],[Thickness],[Grade],[Cut],[Surfacing],[Certifications]
- Thickness in quarter notation (4/4, 6/4, 8/4) or dimensional (1-1/2" x 3-1/2" x 156")
- Grade: Premium, Select & Better, FAS, Select, Unselected
- Cut: Flat Sawn, Rift Sawn, Quartered, Plain Sawn
- Surfacing (optional): S3S, S4S, RGH
- Certifications (optional): FSC
SearchWords: ASH, BIRCH, CEDAR, CHERRY, CYPRESS, DOUGFIR, HICKORY, IPE, MAHOGANY, MAPLE, OAK, PINE, POPLAR, PTLUMBE, SAPELE, WALNUT
Examples:
  Ash (White),4/4,Premium,Flat Sawn
  Maple (Hard),5/4,Select,Flat Sawn,RGH,FSC
  FSC Western Red Cedar,1-1/2" x 3-1/2" x 156",S4S,STK(Select Tight Knot)

**Fabric/Upholstery (GM.FA.xxxxx)**
Format varies by form factor:
  Fabric: [Fabric],[Brand],[Collection],[Color Code],[Color Name],[Width]
  Foam: [Foam],[Type],[Brand],[Product Code],[Thickness],[Dimensions]
  Vinyl: [Vinyl],[Brand],[Collection],[Color Code],[Width]
  Leather: [Leather],[Type],[Brand],[Collection],[Color],[Weight],[Texture]
  Drapery: [Drapery],[Type],[Brand],[Product Code],[Color],[Width]
  Upholstery Supply: [Upholstery Supply],[Product Name],[Brand],[Product Code],[Size]
SearchWords: DRAPERY, FABRIC, FOAM, GASKET, LEATHER, TEXTILE, TRIM, UPHOLSTE, VINYL
Examples:
  Fabric,Maharam,Merit,019 Gator,54"W
  Foam,Classic Hi Density,Western Upholstery,60220,2" thick,24"x81"
  Vinyl,UltraFabrics,Ultraleather Pro,0554-4534 Sherwood,54"W
  Leather,Hide,Cortina Leathers,Brandenburg,Slate 61-11,Heavy Weight,Full Natural Pebble Grain
  Drapery,Blackout,VESCOM,8070.02,Light Grey,110" width

**Glass/Plastics (GM.GL.xxxxx)**
No existing catalog data. Always generate a new description.
Format: [Form Factor],[Material Type],[Color/Finish],[Thickness],[Width" x Length"]

**Lighting/Electrical (GM.LT.xxxxx)**
No existing catalog data. Always generate a new description.
Format: [Form Factor],[Type],[Brand],[Model Number],[Spec]

**Stone (GM.ST.xxxxx)**
No existing catalog data. Always generate a new description.
Format: [Form Factor],[Material],[Origin/Brand],[Finish],[Thickness],[Width" x Length"]

## Matching Rules
- Return at most 5 candidates. If no credible match, set match_type to "none".
- For Glass/Plastics, Lighting/Electrical, and Stone: always set match_type to "none" since no catalog exists.

### Strong match
Form factor + material + finish + all dimensions align exactly.

### Possible match — strict rules
A "possible" match means the catalog part could physically be cut or trimmed to meet the request. Material can be made SMALLER (shorter, narrower) but NEVER BIGGER.

**Solid Surface, Sheet Goods, Inventory Metal:**
- A catalog part may be a possible match if it is longer or wider than requested AND all other critical specs (material, alloy/grade, finish, form factor) are identical.
- Substituting a THINNER material is never practical — thickness must match exactly.

**Solid Lumber:**
- A catalog part may be a possible match if it is longer, wider, or thicker than requested AND species, grade, cut, and surfacing match.

**Hardware:**
- Hardware is essentially non-modifiable. All dimensional specs are fixed.
- A possible match is only considered when the user omitted non-dimensional attributes (grade, finish, brand) and the catalog part matches every dimension exactly.
- Recognize both imperial and metric fastener sizing as fixed dimensions (e.g., "#8" or "#8-32" denotes a specific diameter and thread; "M4" or "M4x0.7" denotes a specific metric diameter and pitch). These are never interchangeable.

**Fabric/Upholstery:**
- Width, weight, and composition are fixed. A possible match requires the same brand/collection with a different colorway or the user omitted color.

**All categories:**
- Diameters (dia, ID, OD) are non-modifiable — never suggest a different diameter as a possible match.
- If the user specified a dimension, do not match against a catalog part with a smaller value in that dimension (the part cannot be made bigger).

## New Description Rules (only when match_type is "none")
- Comma-delimited, form factor first
- Fractional inch notation (1/2", 3/4")
- Dimension suffixes: T, W, H, L, dia, ID
- Sheet Goods: [W"xL"]; Solid Surface: [W" x L"]
- Solid Lumber: thickness in quarter notation unless dimensional lumber
- SearchWord must be ≤8 characters

## Output Format
Respond with valid JSON only. No prose, no markdown fences.
{
  "inferred_category": "Hardware" | "Inventory Metal" | "Sheet Goods" | "Solid Surface" | "Solid Lumber" | "Fabric/Upholstery" | "Glass/Plastics" | "Lighting/Electrical" | "Stone" | "Unknown",
  "match_type": "strong" | "possible" | "none",
  "candidates": [
    {
      "part_num": "<PartNum>",
      "description": "<PartDescription>",
      "confidence": "high" | "medium" | "low",
      "reason": "<one sentence>"
    }
  ],
  "new_description": "<comma-delimited description string or null>",
  "new_search_word": "<SearchWord ≤8 chars or null>",
  "notes": "<optional clarifying note, or null>"
}
Rules:
- "candidates" is [] when match_type is "none"
- "new_description" and "new_search_word" are null when match_type is "strong" or "possible"
- When match_type is "none", both new_description and new_search_word must be populated
- Always include part_num in candidates`;

// ---------------------------------------------------------------------------
// CORS helpers
// ---------------------------------------------------------------------------

function corsHeaders(origin: string, allowedOrigin: string): HeadersInit {
  const isAllowed =
    origin === allowedOrigin ||
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:");

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function corsResponse(status: number, body: string, origin: string, allowedOrigin: string): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin, allowedOrigin),
    },
  });
}

function jsonResponse(status: number, body: string): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ---------------------------------------------------------------------------
// Rate limiting
// ---------------------------------------------------------------------------

async function checkRateLimit(
  ip: string,
  kv: KVNamespace,
  maxPerMinute: number
): Promise<boolean> {
  const key = `rl:${ip}`;
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - 60;

  const raw = await kv.get(key);
  let timestamps: number[] = raw ? JSON.parse(raw) : [];

  timestamps = timestamps.filter((t) => t > windowStart);

  if (timestamps.length >= maxPerMinute) {
    return false;
  }

  timestamps.push(now);
  await kv.put(key, JSON.stringify(timestamps), { expirationTtl: 120 });
  return true;
}

// ---------------------------------------------------------------------------
// Claude API streaming — wiki chatbot (single system block, cached)
// ---------------------------------------------------------------------------

async function streamClaude(
  messages: ChatMessage[],
  systemPrompt: string,
  apiKey: string,
  model: string
): Promise<ReadableStream> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      stream: true,
      system: [
        {
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!response.ok || !response.body) {
    const errorText = await response.text();
    throw new Error(`Claude API error ${response.status}: ${errorText}`);
  }

  return buildSseStream(response.body);
}

// ---------------------------------------------------------------------------
// Claude API streaming — diagnostic/summarize (two system blocks)
//
// Block 1: cachedCorpus — wiki prefix + corpus text; marked cache_control: ephemeral
//          so the 67K-token corpus is reused across requests within the 5-min cache window.
// Block 2: dynamicContext — triage/epicor or validation payload; unique per request, not cached.
// ---------------------------------------------------------------------------

async function streamClaudeDiagnostic(
  messages: ChatMessage[],
  cachedCorpus: string,
  dynamicContext: string,
  apiKey: string,
  model: string
): Promise<ReadableStream> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      stream: true,
      system: dynamicContext
        ? [
            {
              type: "text",
              text: cachedCorpus,
              cache_control: { type: "ephemeral" },
            },
            {
              type: "text",
              text: dynamicContext,
              // no cache_control — unique per request
            },
          ]
        : [
            {
              type: "text",
              text: cachedCorpus,
              cache_control: { type: "ephemeral" },
            },
          ],
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!response.ok || !response.body) {
    const errorText = await response.text();
    throw new Error(`Claude API error ${response.status}: ${errorText}`);
  }

  return buildSseStream(response.body);
}

// ---------------------------------------------------------------------------
// SSE stream builder — shared transformation logic
// ---------------------------------------------------------------------------

function buildSseStream(body: ReadableStream<Uint8Array>): ReadableStream {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  return new ReadableStream({
    async pull(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
          controller.close();
          return;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (!data || data === "[DONE]") continue;

          try {
            const event = JSON.parse(data);
            if (
              event.type === "content_block_delta" &&
              event.delta?.type === "text_delta"
            ) {
              const payload = JSON.stringify({ text: event.delta.text });
              controller.enqueue(
                new TextEncoder().encode(`data: ${payload}\n\n`)
              );
            } else if (event.type === "message_stop") {
              controller.enqueue(
                new TextEncoder().encode("data: [DONE]\n\n")
              );
              controller.close();
              return;
            }
          } catch {
            // Skip unparseable lines
          }
        }
      }
    },
    cancel() {
      reader.cancel();
    },
  });
}

// ---------------------------------------------------------------------------
// Diagnostic context formatter
// ---------------------------------------------------------------------------

function formatDiagnosticContext(
  triage: DiagnosticRequest["triage"],
  epicor: DiagnosticRequest["epicor_context"]
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
      // Include every issue so the LLM can reference specific failures
      for (const s of issues) {
        const ids = s.ids && s.ids.length > 0
          ? ` [${s.ids.join(", ")}]`
          : "";
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

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Token auth helper
// ---------------------------------------------------------------------------

function checkToken(request: Request, expected: string): boolean {
  const auth = request.headers.get("Authorization") || "";
  return auth === `Bearer ${expected}`;
}

// ---------------------------------------------------------------------------
// SSE response helper
// ---------------------------------------------------------------------------

function sseResponse(stream: ReadableStream): Response {
  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// ---------------------------------------------------------------------------
// Claude API — non-streaming, returns full response text
// ---------------------------------------------------------------------------

async function callClaude(
  userMessage: string,
  systemPrompt: string,
  apiKey: string,
  model: string,
  maxTokens = 1024
): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API error ${response.status}: ${errorText}`);
  }

  const data = await response.json() as { content: Array<{ type: string; text: string }> };
  const block = data.content.find((b) => b.type === "text");
  if (!block) throw new Error("No text block in Claude response");
  return block.text;
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env.ALLOWED_ORIGIN);
    const url = new URL(request.url);

    // -----------------------------------------------------------------------
    // CORS preflight (applies to /api/chat only — diagnostic routes are not
    // called from browsers and don't need CORS headers)
    // -----------------------------------------------------------------------
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // -----------------------------------------------------------------------
    // POST /api/chat — wiki chatbot (public, CORS-gated, rate-limited)
    // -----------------------------------------------------------------------
    if (url.pathname === "/api/chat" && request.method === "POST") {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const maxRpm = parseInt(env.MAX_REQUESTS_PER_MINUTE, 10) || 20;
      const allowed = await checkRateLimit(ip, env.RATE_LIMIT, maxRpm);
      if (!allowed) {
        return corsResponse(
          429,
          JSON.stringify({ error: "Rate limited. Please wait a moment." }),
          origin,
          env.ALLOWED_ORIGIN
        );
      }

      let body: ChatRequest;
      try {
        body = await request.json();
      } catch {
        return corsResponse(400, JSON.stringify({ error: "Invalid JSON" }), origin, env.ALLOWED_ORIGIN);
      }

      if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
        return corsResponse(400, JSON.stringify({ error: "messages array required" }), origin, env.ALLOWED_ORIGIN);
      }

      if (body.messages.length > 20) {
        body.messages = body.messages.slice(-20);
      }

      const corpus = await env.WIKI_CORPUS.get(CORPUS_KV_KEY);
      if (!corpus) {
        return corsResponse(
          503,
          JSON.stringify({ error: "Wiki corpus not loaded. Please try again later." }),
          origin,
          env.ALLOWED_ORIGIN
        );
      }

      const systemPrompt = SYSTEM_PROMPT_PREFIX + corpus + SYSTEM_PROMPT_SUFFIX;

      try {
        const stream = await streamClaude(
          body.messages,
          systemPrompt,
          env.CHAT_ANTHROPIC_API_KEY,
          env.CLAUDE_MODEL
        );
        return new Response(stream, {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            ...cors,
          },
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Claude API error:", message);
        return corsResponse(
          502,
          JSON.stringify({ error: "Failed to get response from AI. Please try again." }),
          origin,
          env.ALLOWED_ORIGIN
        );
      }
    }

    // -----------------------------------------------------------------------
    // POST /api/diagnostic — GH Diagnostic Assistant (token-gated, streaming)
    // -----------------------------------------------------------------------
    if (url.pathname === "/api/diagnostic" && request.method === "POST") {
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

      const corpus = await env.WIKI_CORPUS.get(CORPUS_KV_KEY);
      if (!corpus) {
        return jsonResponse(503, JSON.stringify({ error: "Wiki corpus not loaded." }));
      }

      // Triage + epicor context is static for the entire conversation, so
      // include it in the cached block alongside the wiki corpus.  This way
      // the full issue list is only billed on the first message (or after
      // the 5-min cache window expires).
      const diagnosticContext = formatDiagnosticContext(
        body.triage || {},
        body.epicor_context || {}
      );
      const cachedCorpus =
        DIAGNOSTIC_PREFIX + corpus + SYSTEM_PROMPT_SUFFIX + "\n\n" + diagnosticContext;

      try {
        const stream = await streamClaudeDiagnostic(
          body.messages,
          cachedCorpus,
          "",  // no dynamic block needed — triage is now cached
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

    // -----------------------------------------------------------------------
    // POST /api/summarize — rhino-qc GUI summary (token-gated, streaming)
    // -----------------------------------------------------------------------
    if (url.pathname === "/api/summarize" && request.method === "POST") {
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

      const corpus = await env.WIKI_CORPUS.get(CORPUS_KV_KEY);
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
          env.CLAUDE_MODEL
        );
        return sseResponse(stream);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Summarize API error:", message);
        return jsonResponse(502, JSON.stringify({ error: "Failed to get AI response." }));
      }
    }

    // -----------------------------------------------------------------------
    // POST /api/parts-match — Epicor parts lookup for Power Automate (token-gated, JSON)
    // -----------------------------------------------------------------------
    if (url.pathname === "/api/parts-match" && request.method === "POST") {
      if (!checkToken(request, env.PA_AUTH_TOKEN)) {
        return jsonResponse(401, JSON.stringify({ error: "Unauthorized" }));
      }

      let body: PartsMatchRequest;
      try {
        body = await request.json();
      } catch {
        return jsonResponse(400, JSON.stringify({ error: "Invalid JSON" }));
      }

      if (!body.user_input || typeof body.user_input !== "string" || !body.user_input.trim()) {
        return jsonResponse(400, JSON.stringify({ error: "user_input required" }));
      }
      if (!body.parts_list || typeof body.parts_list !== "string" || !body.parts_list.trim()) {
        return jsonResponse(400, JSON.stringify({ error: "parts_list required" }));
      }

      const userMessage =
        `User input: ${body.user_input.trim()}\n\nExisting ERP parts (PartNum | Description):\n${body.parts_list.trim()}`;

      let rawText: string;
      try {
        rawText = await callClaude(
          userMessage,
          PARTS_MATCH_SYSTEM_PROMPT,
          env.PA_ANTHROPIC_API_KEY,
          env.PA_CLAUDE_MODEL,
          1024
        );
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Parts match Claude error:", message);
        return jsonResponse(502, JSON.stringify({ error: "Failed to get AI response." }));
      }

      // Strip markdown code fences if Claude wrapped the output despite instructions
      const cleanedText = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();

      // Validate that Claude returned parseable JSON before forwarding
      let parsed: unknown;
      try {
        parsed = JSON.parse(cleanedText);
      } catch {
        console.error("Claude returned non-JSON:", rawText);
        return jsonResponse(502, JSON.stringify({ error: "AI response was not valid JSON.", raw: rawText }));
      }

      return jsonResponse(200, JSON.stringify(parsed));
    }

    // -----------------------------------------------------------------------
    // 404 fallback
    // -----------------------------------------------------------------------
    return corsResponse(404, JSON.stringify({ error: "Not found" }), origin, env.ALLOWED_ORIGIN);
  },
};
