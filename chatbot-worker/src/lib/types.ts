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
  // /api/diagnostic-runs (run tracking in Airtable)
  AIRTABLE_PAT: string;      // secret: write on the Releases & Requests base
  DIAGNOSTIC_CLOUD_AUTH_TOKEN: string; // secret: server-only credential; same value as on cwka-rhino-qc
  RUNS_BASE_ID: string;      // var
  RUNS_TABLE_ID: string;     // var: Rhino Diagnostic Tool
  PEOPLE_TABLE_ID: string;   // var: People (synced from the Engineering Schedule Roles table)
  RHINO_QC: Fetcher;         // service binding to cwka-rhino-qc (/resolve turns a Box Drive path into a Box link)
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
