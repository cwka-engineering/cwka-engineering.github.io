import { analyzeClockData } from "../lib/qc";
import { callClaude } from "../lib/claude";
import { checkToken, jsonResponse } from "../lib/helpers";
import type { Env } from "../lib/types";

export interface ClockQCRequest {
  employee_id: string;
  employee_name: string;
  dept_role: string;
  pay_period_start: string;        // YYYY-MM-DD
  pay_period_end: string;          // YYYY-MM-DD
  context: "payroll" | "engineer";
  labor_rows: Record<string, unknown>[];
  week_starts_sunday?: boolean;
  pto_holiday_dates?: string[];    // TODO: wire from Paylocity API once available
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

const CLOCKED_TIME_QC_SYSTEM_PROMPT = `You write short, direct Teams DMs to individual contributors at a custom architectural fabrication company about their prior pay-period clocked time. Tone is matter-of-fact and collegial — not scolding, not effusive. Use plain Markdown (bold, bullets). No preamble, no sign-off.

For weeks WITH issues:
Start with a one-sentence summary. Bullet each issue with a specific resolution instruction. End with a note that corrections are due by Wednesday EOD.

For all-clear weeks:
Write 2–3 lines max: confirm the week looks clean, show the top-line hours (total, direct, indirect), and note that this check runs every Monday. No bullet points.

Resolution instructions by issue type:
- Miss: You may be short hours this week. If you took approved PTO or a holiday, you can disregard this — those hours aren't reflected yet. Otherwise, log the missing time to a job or indirect code in Epicor.
- OT: Verify hours are correct; if accurate, confirm with your manager.
- D10+: Check for accidental duplicate entries on that day.
- Break!: Add missing Break-Time (008) entries in CrossTimeReview for the flagged days.
- Notes!: Open the flagged indirect rows in CrossTimeReview and add a brief note in the Labor Note field.
- Overlap!: Open both overlapping rows in CrossTimeReview and adjust clock times so they don't overlap.
- Idle: Idle Time entries over 1h need manager review. Confirm with your manager or correct the entry.
- Lunch?: Days without a midday gap may be missing a Break-Time row — verify your clock-in/out are accurate.
- PTO_WASTED: PTO was recorded on a week where you already reached 40h — those PTO hours won't carry over. Confirm intent with your manager.
- NO_LABOR_ROWS: No labor rows were found for this pay period. If you worked, submit your time immediately.`;

export async function handleClockedTimeQC(request: Request, env: Env): Promise<Response | null> {
  if (!request.url.includes("/api/clocked-time-qc")) return null;
  if (request.method !== "POST") return null;

  if (!checkToken(request, env.PA_AUTH_TOKEN)) {
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

  const { issues, summary_stats } = analyzeClockData(body.labor_rows, {
    dept_role: body.dept_role,
    pay_period_start: body.pay_period_start,
    pay_period_end: body.pay_period_end,
    context: body.context ?? "payroll",
    week_starts_sunday: body.week_starts_sunday ?? true,
    pto_holiday_dates: body.pto_holiday_dates,
  });

  let message_text: string | null = null;

  if (body.context !== "engineer") {
    const issueLines = issues
      .map(i => `[${i.issue_type}]${i.week_start ? ` Week ${i.week_start}: ` : " "}${i.details}`)
      .join("\n");

    const userPrompt = issues.length > 0
      ? `Employee: ${body.employee_name}\nRole: ${body.dept_role}\n` +
        `Pay period: ${body.pay_period_start} – ${body.pay_period_end}\n\n` +
        `Stats: ${summary_stats.total_hours}h total | ${summary_stats.direct_hours}h direct | ` +
        `${summary_stats.missing_hours}h missing\n` +
        `Break: ${summary_stats.break_time_hours}/${summary_stats.expected_break_time_hours}h expected\n\n` +
        `Issues:\n${issueLines}\n\nWrite the Teams DM.`
      : `Employee: ${body.employee_name}\nRole: ${body.dept_role}\n` +
        `Pay period: ${body.pay_period_start} – ${body.pay_period_end}\n\n` +
        `Stats: ${summary_stats.total_hours}h total | ${summary_stats.direct_hours}h direct | ` +
        `${summary_stats.indirect_hours}h indirect\n\n` +
        `No issues found. Write the all-clear Teams DM.`;

    try {
      message_text = await callClaude(
        userPrompt,
        CLOCKED_TIME_QC_SYSTEM_PROMPT,
        env.TIME_ENTRY_ANTHROPIC_API_KEY,
        env.PA_CLAUDE_MODEL,
        512,
      );
    } catch (err) {
      console.error("clocked-time-qc Claude error:", err);
      // Degrade gracefully — return issues without message_text
    }
  }

  return jsonResponse(200, JSON.stringify({
    has_issues: issues.length > 0,
    issue_count: issues.length,
    issues,
    summary_stats,
    message_text,
  } satisfies ClockQCResponse));
}
