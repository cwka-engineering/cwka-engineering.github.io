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
  temperature?: number,
  maxRetries = 2
): Promise<ReadableStream> {
  const requestBody = JSON.stringify({
    model,
    max_tokens: 2048,
    stream: true,
    ...(temperature !== undefined && { temperature }),
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
  retries = 2
): Promise<string> {
  const reqBody = JSON.stringify({
    model,
    max_tokens: maxTokens,
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

    const data = await response.json() as { content: Array<{ type: string; text: string }> };
    const block = data.content.find((b) => b.type === "text");
    if (!block) throw new Error("No text block in Claude response");
    return block.text;
  }

  throw new Error("Claude API overloaded after retries");
}
