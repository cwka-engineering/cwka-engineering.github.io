import { sleep } from "./helpers";
import type { ChatMessage } from "./types";

export async function streamClaude(
  messages: ChatMessage[],
  systemPrompt: string,
  apiKey: string,
  model: string,
  maxRetries = 2
): Promise<ReadableStream> {
  const requestBody = JSON.stringify({
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
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  let lastError: Error = new Error("Unknown error");

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (attempt > 0) {
      await sleep(1000 * Math.pow(2, attempt - 1)); // 1s, 2s
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: requestBody,
    });

    if (response.status === 529) {
      const errorText = await response.text();
      lastError = new Error(`Claude API error 529: ${errorText}`);
      continue;
    }

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      throw new Error(`Claude API error ${response.status}: ${errorText}`);
    }

    return buildSseStream(response.body);
  }

  throw lastError;
}

// Two-system-block variant: block 1 (cachedCorpus) gets cache_control:ephemeral;
// block 2 (dynamicContext) is unique per request and not cached.
export async function streamClaudeDiagnostic(
  messages: ChatMessage[],
  cachedCorpus: string,
  dynamicContext: string,
  apiKey: string,
  model: string,
  maxRetries = 2
): Promise<ReadableStream> {
  // No `temperature` parameter: Haiku 5.5 rejects it with a 400 ("`temperature` is deprecated
  // for this model"). /api/summarize and /api/time-entry used to pass 0 and returned 502.
  const requestBody = JSON.stringify({
    model,
    // Haiku 5.5 thinks by default and thinking tokens count toward max_tokens; buildSseStream
    // forwards only text_delta, so a budget spent on thinking reads as an empty response
    // (the rhino-qc --llm summary hit exactly this). Same fix as callClaude: low effort, bigger cap.
    max_tokens: 4096,
    output_config: { effort: "low" },
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
          },
        ]
      : [
          {
            type: "text",
            text: cachedCorpus,
            cache_control: { type: "ephemeral" },
          },
        ],
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  let lastError: Error = new Error("Unknown error");

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (attempt > 0) {
      await sleep(1000 * Math.pow(2, attempt - 1)); // 1s, 2s
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: requestBody,
    });

    if (response.status === 529) {
      const errorText = await response.text();
      lastError = new Error(`Claude API error 529: ${errorText}`);
      continue;
    }

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      throw new Error(`Claude API error ${response.status}: ${errorText}`);
    }

    return buildSseStream(response.body);
  }

  throw lastError;
}

export function buildSseStream(body: ReadableStream<Uint8Array>): ReadableStream {
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
            } else if (
              event.type === "message_delta" &&
              event.delta?.stop_reason === "max_tokens"
            ) {
              console.warn("stream hit max_tokens; the answer may be truncated or empty");
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

export async function callClaude(
  userMessage: string,
  systemPrompt: string,
  apiKey: string,
  model: string,
  maxTokens = 1024,
  retries = 2,
  // Haiku 5.5 thinks by default and thinking tokens count toward max_tokens, so
  // a short cap can be consumed before any text is emitted ("No text block" or
  // truncated JSON). These routes want short structured answers: keep effort low.
  effort: "low" | "medium" | "high" = "low"
): Promise<string> {
  const reqBody = JSON.stringify({
    model,
    max_tokens: maxTokens,
    output_config: { effort },
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });
  const reqHeaders = {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      await sleep(1000 * Math.pow(2, attempt - 1)); // 1s, 2s
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: reqHeaders,
      body: reqBody,
    });

    if (response.status === 529 && attempt < retries) {
      continue;
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Claude API error ${response.status}: ${errorText}`);
    }

    const data = await response.json() as { stop_reason?: string; content: Array<{ type: string; text: string }> };
    if (data.stop_reason === "max_tokens") {
      console.warn(`callClaude hit max_tokens (${maxTokens}) on ${model}; output may be truncated`);
    }
    const block = data.content.find((b) => b.type === "text");
    if (!block) throw new Error("No text block in Claude response");
    return block.text;
  }

  throw new Error("Claude API overloaded after retries");
}
