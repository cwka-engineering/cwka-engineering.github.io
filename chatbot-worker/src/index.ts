/**
 * CWK/DFW Engineering Wiki Chatbot — Cloudflare Worker
 *
 * Routes:
 *   POST /api/chat             — Wiki Q&A chatbot (public, CORS-gated)
 *   POST /api/diagnostic       — GH Diagnostic Assistant (token-gated, SSE streaming)
 *   POST /api/summarize        — rhino-qc GUI summary (token-gated, SSE streaming)
 *   POST /api/parts-match      — Epicor parts matching for Power Automate (token-gated, JSON)
 *   POST /api/time-entry       — CWK Time Companion (token-gated, SSE streaming)
 *   POST /api/clocked-time-qc  — PA weekly time QC flow (token-gated, JSON)
 */

import { handleChat }          from "./routes/chat";
import { handleDiagnostic }    from "./routes/diagnostic";
import { handleSummarize }     from "./routes/summarize";
import { handlePartsMatch }    from "./routes/parts-match";
import { handleTimeEntry }     from "./routes/time-entry";
import { handleClockedTimeQC } from "./routes/clocked-time-qc";
import { corsHeaders, corsResponse } from "./lib/helpers";
import type { Env } from "./lib/types";

const ROUTE_HANDLERS = [
  handleChat,
  handleDiagnostic,
  handleSummarize,
  handlePartsMatch,
  handleTimeEntry,
  handleClockedTimeQC,
];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin, env.ALLOWED_ORIGIN),
      });
    }

    for (const handler of ROUTE_HANDLERS) {
      const res = await handler(request, env);
      if (res !== null) return res;
    }

    return corsResponse(404, JSON.stringify({ error: "Not found" }), origin, env.ALLOWED_ORIGIN);
  },
};
