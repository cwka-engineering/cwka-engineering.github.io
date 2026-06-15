import type { Env } from "./types";

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function corsHeaders(origin: string, allowedOrigin: string): HeadersInit {
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

export function corsResponse(
  status: number,
  body: string,
  origin: string,
  allowedOrigin: string
): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin, allowedOrigin),
    },
  });
}

export function jsonResponse(status: number, body: string): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function checkRateLimit(
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

export function checkToken(request: Request, expected: string): boolean {
  const auth = request.headers.get("Authorization") || "";
  return auth === `Bearer ${expected}`;
}

export function sseResponse(stream: ReadableStream): Response {
  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// Env is imported only to satisfy the linter in files that import from this
// module alongside Env — the helpers themselves don't use it, but the export
// keeps the import from being flagged as unused in consumers.
export type { Env };
