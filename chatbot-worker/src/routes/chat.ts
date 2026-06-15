import { streamClaude } from "../lib/claude";
import { checkRateLimit, corsHeaders, corsResponse } from "../lib/helpers";
import type { Env, ChatMessage } from "../lib/types";

interface ChatRequest {
  messages: ChatMessage[];
}

const CORPUS_KV_KEYS = {
  general:     "wiki-corpus-general",
  feRelease:   "wiki-corpus-fe-release",
  feSubmittal: "wiki-corpus-fe-submittal",
} as const;

const SYSTEM_PROMPT_PREFIX = `You are the CWK/DFW Engineering Wiki assistant.

RULES — follow these strictly:
1. Answer questions using ONLY the wiki content provided in <wiki-corpus>.
2. For every factual claim, cite the source page as a markdown link.
   Use the page URL from the [PAGE] header. When the content includes an explicit
   "Deep link: <url>#<anchor>" line, use that exact URL — do not drop the anchor.
   Otherwise, if a section anchor is relevant, append #anchor-id (anchors are listed in [ANCHORS]).
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

export async function handleChat(request: Request, env: Env): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname !== "/api/chat") return null;
  if (request.method !== "POST") return null;

  const origin = request.headers.get("Origin") || "";
  const cors = corsHeaders(origin, env.ALLOWED_ORIGIN);

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

  const corpus = await env.WIKI_CORPUS.get(CORPUS_KV_KEYS.general);
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
