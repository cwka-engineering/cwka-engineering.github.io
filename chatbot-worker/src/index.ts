/**
 * CWK/DFW Engineering Wiki Chatbot — Cloudflare Worker
 *
 * Proxies chat requests to the Claude API with the full wiki corpus
 * injected as a system prompt.  Streams the response back via SSE.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Env {
  WIKI_CORPUS: KVNamespace;
  RATE_LIMIT: KVNamespace;
  ANTHROPIC_API_KEY: string;
  ALLOWED_ORIGIN: string;
  CLAUDE_MODEL: string;
  MAX_REQUESTS_PER_MINUTE: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CORPUS_KV_KEY = "wiki-corpus-prompt";

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

// ---------------------------------------------------------------------------
// CORS helpers
// ---------------------------------------------------------------------------

function corsHeaders(origin: string, allowedOrigin: string): HeadersInit {
  // In development, also allow localhost
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

  // Prune old entries
  timestamps = timestamps.filter((t) => t > windowStart);

  if (timestamps.length >= maxPerMinute) {
    return false; // rate limited
  }

  timestamps.push(now);
  await kv.put(key, JSON.stringify(timestamps), { expirationTtl: 120 });
  return true;
}

// ---------------------------------------------------------------------------
// Claude API streaming
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

  // Transform Anthropic's SSE stream into a simpler text-delta SSE stream
  // that the client can consume without knowing the Anthropic wire format.
  const reader = response.body.getReader();
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
// Main handler
// ---------------------------------------------------------------------------

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env.ALLOWED_ORIGIN);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // Only POST /api/chat
    const url = new URL(request.url);
    if (url.pathname !== "/api/chat" || request.method !== "POST") {
      return corsResponse(404, JSON.stringify({ error: "Not found" }), origin, env.ALLOWED_ORIGIN);
    }

    // Rate limit
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

    // Parse request
    let body: ChatRequest;
    try {
      body = await request.json();
    } catch {
      return corsResponse(400, JSON.stringify({ error: "Invalid JSON" }), origin, env.ALLOWED_ORIGIN);
    }

    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return corsResponse(400, JSON.stringify({ error: "messages array required" }), origin, env.ALLOWED_ORIGIN);
    }

    // Limit conversation length to prevent abuse
    if (body.messages.length > 20) {
      body.messages = body.messages.slice(-20);
    }

    // Load wiki corpus from KV
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

    // Stream response
    try {
      const stream = await streamClaude(
        body.messages,
        systemPrompt,
        env.ANTHROPIC_API_KEY,
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
  },
};
