export interface Env {
  WIKI_CORPUS: KVNamespace;
  RATE_LIMIT: KVNamespace;
  CHAT_ANTHROPIC_API_KEY: string;
  DIAGNOSTIC_ANTHROPIC_API_KEY: string;
  ALLOWED_ORIGIN: string;
  CLAUDE_MODEL: string;
  MAX_REQUESTS_PER_MINUTE: string;
  DIAGNOSTIC_AUTH_TOKEN: string;
  PA_AUTH_TOKEN: string;
  PARTS_MATCH_ANTHROPIC_API_KEY: string;
  PA_CLAUDE_MODEL: string;
  TIME_ENTRY_AUTH_TOKEN: string;
  TIME_ENTRY_ANTHROPIC_API_KEY: string;
  CLOCKED_TIME_QC_AUTH_TOKEN: string;
  CLOCKED_TIME_QC_ANTHROPIC_API_KEY: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
