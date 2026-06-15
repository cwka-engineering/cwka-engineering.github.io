import { checkToken, jsonResponse } from "../lib/helpers";
import type { Env } from "../lib/types";

export interface ClockQCRequest {
  employee_id: string;
  employee_name: string;
  dept_role: string;
  pay_period_start: string;   // YYYY-MM-DD
  pay_period_end: string;     // YYYY-MM-DD
  context: "payroll" | "engineer";
  labor_rows: Record<string, unknown>[];
  week_starts_sunday?: boolean;
}

export interface QCIssue {
  issue_type: string;
  severity: "error" | "warn" | "info";
  week_start: string | null;
  week_end: string | null;
  details: string;
}

export interface ClockQCResponse {
  has_issues: boolean;
  issue_count: number;
  issues: QCIssue[];
  summary_stats: {
    total_hours: number;
    direct_hours: number;
    indirect_hours: number;
    indirect_percent: number;
    missing_hours: number;
    overtime_hours: number;
    break_time_hours: number;
    expected_break_time_hours: number;
    work_days: number;
  };
  message_text: string | null;
}

export async function handleClockedTimeQC(request: Request, env: Env): Promise<Response | null> {
  if (new URL(request.url).pathname !== "/api/clocked-time-qc") return null;
  if (request.method !== "POST") return null;

  if (!checkToken(request, env.CLOCKED_TIME_QC_AUTH_TOKEN)) {
    return jsonResponse(401, JSON.stringify({ error: "Unauthorized" }));
  }

  let body: ClockQCRequest;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, JSON.stringify({ error: "Invalid JSON" }));
  }

  if (!body.employee_id || !body.labor_rows || !Array.isArray(body.labor_rows)) {
    return jsonResponse(400, JSON.stringify({ error: "employee_id and labor_rows required" }));
  }

  // STUB — replace with analyzeClockData + Claude call in Part 2
  const stubResponse: ClockQCResponse = {
    has_issues: false,
    issue_count: 0,
    issues: [],
    summary_stats: {
      total_hours: 0, direct_hours: 0, indirect_hours: 0, indirect_percent: 0,
      missing_hours: 0, overtime_hours: 0, break_time_hours: 0,
      expected_break_time_hours: 0, work_days: 0,
    },
    message_text: null,
  };

  return jsonResponse(200, JSON.stringify(stubResponse));
}
