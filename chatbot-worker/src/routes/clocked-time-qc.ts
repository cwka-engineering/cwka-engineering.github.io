import { analyzeClockData } from "../lib/qc";
import { callClaude } from "../lib/claude";
import { checkToken, jsonResponse } from "../lib/helpers";
import type { Env } from "../lib/types";

export interface DigestFinding {
  name: string;
  issue_count: number;
  issue_types: string[];           // e.g. ["Miss", "Notes!"] (full issue objects — see extraction note below)
  category: "FabEng" | "ProdEng" | "Consultant" | "Unknown";  // set by PA (Compose_Category)
  summary_stats?: {                // pass-through of the per-engineer QC call's summary_stats
    total_hours: number;
    direct_hours: number;
    indirect_hours: number;
    indirect_percent: number;
    missing_hours: number;
    overtime_hours: number;
    break_time_hours: number;
    expected_break_time_hours: number;
    work_days: number;
    pto_hours_applied: number;      // PTO hours subtracted from missing_hours this period
    holiday_hours_applied: number;  // Holiday hours subtracted from missing_hours this period
    pto_wasted_hours: number;       // total PTO_WASTED hours this period (0 if none / PTO unavailable)
  };
}

// Topline hours summary prepended to every message this Worker generates
// (individual DM + all three digest messages). OT_hours is a SUBSET of
// direct_hours, not additive — direct_hours + indirect_hours + pto_hours
// equals total_hours; never add ot_hours into that sum.
export interface LaborSummary {
  pay_period_start: string;
  pay_period_end: string;
  total_hours: number;
  direct_hours: number;
  indirect_hours: number;
  pto_hours: number;   // PTO + Holiday combined
  ot_hours: number;    // subset of direct_hours, NOT additive to total_hours
}

export interface ClockQCRequest {
  employee_id: string;
  employee_name: string;
  dept_role: string;
  pay_period_start: string;        // YYYY-MM-DD
  pay_period_end: string;          // YYYY-MM-DD
  context: "payroll" | "engineer" | "digest";
  labor_rows: Record<string, unknown>[];
  week_starts_sunday?: boolean;
  // Paylocity PTO/Holiday integration. Real hours per date, not just dates —
  // partial-day PTO is real, so a flat 8h/date assumption would be wrong.
  pto_holiday_hours?: { date: string; hours: number; leave_type: "PTO" | "Holiday" }[];
  pto_data_available?: boolean;    // false if this run's Paylocity fetch failed/degraded —
                                    // triggers the fallback "may include PTO" caveat instead
                                    // of trusting missing_hours as already-net-of-PTO
  // digest context only — labor_rows ignored when context === "digest"
  findings?: DigestFinding[];
  total_engineers?: number;
  flagged_count?: number;
  // per-category totals — needed so each manager's own digest can report an
  // accurate "X of Y" for their team specifically, not just the org-wide number
  total_fabeng?: number;
  flagged_fabeng?: number;
  total_prodeng?: number;
  flagged_prodeng?: number;
  total_consultant?: number;
  flagged_consultant?: number;
  // Scope-level hour aggregates PA computes and passes, mirroring
  // total_fabeng/flagged_fabeng — this Worker never sees more than one
  // engineer's data per payroll call, so it cannot derive these itself.
  // Sent as literal null until PA sees a real (non-null) labor_summary come
  // back from this Worker's own payroll-path response for at least one
  // engineer in a run — never a zero-valued object. Already live on the PA
  // side (2026-08-03), ahead of this Worker's support for it.
  labor_summary_org?: LaborSummary | null;      // whole department — Director's message
  labor_summary_fabeng?: LaborSummary | null;   // FabEng manager's message
  labor_summary_prodeng?: LaborSummary | null;  // ProdEng manager's message
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
    pto_hours_applied: number;      // PTO hours subtracted from missing_hours this period
    holiday_hours_applied: number;  // Holiday hours subtracted from missing_hours this period
    pto_wasted_hours: number;       // total PTO_WASTED hours this period
  };
  message_text: string | null;
  labor_summary: LaborSummary | null;  // payroll context only; null for engineer/no-labor-rows
}

const CLOCKED_TIME_QC_SYSTEM_PROMPT = `You write short, direct Teams DMs to individual contributors at a custom architectural fabrication company about their prior pay-period clocked time. Tone is matter-of-fact and collegial — not scolding, not effusive. Use plain Markdown (bold, bullets). No preamble, no sign-off.

CRITICAL — day-of-week labels: every date in the issue data already has its correct weekday name attached (e.g. "Thursday 2026-07-02"). Always use that exact weekday name verbatim when referencing the date. NEVER calculate, guess, or state a day of week yourself from a bare date — you will get it wrong. If a date appears without a weekday name attached, state the date alone (no day name) rather than inventing one.

For weeks WITH issues:
Start with a one-sentence summary. Bullet each issue with a specific resolution instruction. End with a note that corrections are due by end of day today (Monday).

For all-clear weeks:
Write 2–3 lines max: confirm the week looks clean, show the top-line hours (total, direct, indirect), and note that this check runs every Monday. No bullet points.

Resolution instructions by issue type:
- Miss: Check the PTO verification note near the top of the data you were given. If it says PTO/holiday data was successfully retrieved, this missing-hours figure already excludes approved PTO and holidays — treat it as real delinquency and tell the person to log the missing time to a job or indirect code in Epicor. If it says PTO/holiday data could not be retrieved, add the caveat that this may include approved PTO or a holiday not yet reflected — disregard if that applies, otherwise log the missing time.
- OT: Verify hours are correct; if accurate, confirm with your manager.
- D10+: Check for accidental duplicate entries on that day.
- Break!: Add missing Break-Time (008) entries in CrossTimeReview for the flagged days.
- Notes!: Open the flagged indirect rows in CrossTimeReview and add a brief note in the Labor Note field.
- Miscode: The flagged entry may be coded incorrectly — check the detail message for the specific reason (a code marked "do not use," a Break-Time entry that may include lunch, General Indirect "time entry" logging over the 45-min/week guideline, or a note suggesting a more specific code fits better). Most of these are suggestions based on note text or duration, not confirmed errors — use your judgment and reclassify in CrossTimeReview if needed. The "do not use" code flags (Holidays/PTO) are a firmer signal and should be corrected.
- Overlap!: Open both overlapping rows in CrossTimeReview and adjust clock times so they don't overlap.
- Idle: Idle Time entries over 1h need manager review. Confirm with your manager or correct the entry.
- Lunch?: Days without a midday gap may be missing a Break-Time row — verify your clock-in/out are accurate.
- PTO_WASTED: You used PTO on a week where you'd already reached 40 hours worked — those PTO hours don't carry over. Confirm with your manager whether this was intentional.
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

  if (body.context === "digest") {
    if (!body.findings || !Array.isArray(body.findings)) {
      return jsonResponse(400, JSON.stringify({ error: "findings array required for digest context" }));
    }
    return handleDigest(body, env);
  }

  if (!body.employee_id || !body.labor_rows || !Array.isArray(body.labor_rows)) {
    return jsonResponse(400, JSON.stringify({ error: "employee_id and labor_rows required" }));
  }

  const { issues, summary_stats, labor_summary } = analyzeClockData(body.labor_rows, {
    dept_role: body.dept_role,
    pay_period_start: body.pay_period_start,
    pay_period_end: body.pay_period_end,
    context: body.context ?? "payroll",
    week_starts_sunday: body.week_starts_sunday ?? true,
    pto_holiday_hours: body.pto_holiday_hours,
  });

  let message_text: string | null = null;

  if (body.context !== "engineer") {
    const issueLines = issues
      .map(i => `[${i.issue_type}]${i.week_start ? ` Week ${i.week_start}: ` : " "}${i.details}`)
      .join("\n");

    // Only surface the PTO verification note when it's actually relevant to
    // something in this message (a Miss or PTO_WASTED finding) — otherwise a
    // run with unverified PTO would attach an irrelevant "may include PTO"
    // caveat to messages containing only e.g. Overlap!/Notes! issues.
    const relevantToPto = issues.some(i => i.issue_type === "Miss" || i.issue_type === "PTO_WASTED");
    const ptoNote = relevantToPto
      ? (body.pto_data_available
          ? "PTO/holiday data was successfully retrieved from Paylocity for this run — missing-hours figures below already exclude approved PTO and holidays.\n\n"
          : "PTO/holiday data could not be retrieved from Paylocity this run — missing-hours figures below may include approved PTO or holidays not yet reflected.\n\n")
      : "";

    const userPrompt = issues.length > 0
      ? `Employee: ${body.employee_name}\nRole: ${body.dept_role}\n` +
        `Pay period: ${body.pay_period_start} – ${body.pay_period_end}\n\n` +
        `${ptoNote}` +
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

    // Prepend the topline hours line after Claude returns — string
    // concatenation, never part of the prompt. The numbers have to be exact;
    // an LLM paraphrasing an hours line is exactly the kind of thing that
    // silently drifts (a digit transposed, a unit dropped) with no error to
    // catch it.
    if (message_text && labor_summary) {
      message_text = formatLaborSummaryLine(labor_summary) + message_text;
    }
  }

  return jsonResponse(200, JSON.stringify({
    has_issues: issues.length > 0,
    issue_count: issues.length,
    issues,
    summary_stats,
    message_text,
    labor_summary,
  } satisfies ClockQCResponse));
}

// Formats the topline hours-summary line shared by the individual DM and all
// three digest messages:
//   2026-07-18 thru 2026-07-25
//   1000 hrs Total, 700 hrs Direct, 250 hrs Indirect, 50 hrs PTO, 25 hrs OT
function formatLaborSummaryLine(s: LaborSummary): string {
  return `${s.pay_period_start} thru ${s.pay_period_end}\n` +
    `${s.total_hours} hrs Total, ${s.direct_hours} hrs Direct, ` +
    `${s.indirect_hours} hrs Indirect, ${s.pto_hours} hrs PTO, ${s.ot_hours} hrs OT\n\n`;
}

// ---------------------------------------------------------------------------
// Digest handler — weekly manager summary across all engineers
// ---------------------------------------------------------------------------

// Shared instruction block used by all three digest audiences (Director,
// FabEng manager, ProdEng manager). Keeping this as one function avoids the
// three prompts drifting out of sync on formatting rules over time.
function digestSharedInstructions(): string {
  return `Tone is factual and concise — this is a brief heads-up, not a detailed
report. Use plain Markdown (bold, bullets). No preamble, no sign-off.

CRITICAL — day-of-week labels: every date in the issue data already has its correct
weekday name attached (e.g. "Thursday 2026-07-02"). Always use that exact weekday
name verbatim when referencing the date. NEVER calculate, guess, or state a day of
week yourself from a bare date — you will get it wrong. If a date appears without
a weekday name attached, state the date alone (no day name) rather than inventing one.

When listing flagged engineers: each engineer's line lists codes in this exact
format: \`CodeName(field=value)\` for Miss/OT/PTO_WASTED, or \`CodeName:N\` for
everything else — every code shown already has its number attached, so read the
number directly from the code string itself rather than looking elsewhere in the
line. Translate:
- \`Miss(missing_hours=X)\` → "missing X hrs" (use the exact value shown)
- \`OT(overtime_hours=X)\` → "X hrs overtime"
- \`Notes!:N\` → "N indirect row(s) need notes"
- \`Overlap!:N\` → "N overlapping clock entry/entries"
- \`Break!:N\` → "missing breaks on N day(s)"
- \`Idle:N\` → "idle time flagged Nx"
- \`Lunch?:N\` → "no lunch gap on N day(s)"
- \`D10+:N\` → "N day(s) over 10 hrs"
- \`NO_LABOR_ROWS:N\` → "no time logged"
- \`Miscode:N\` → "N indirect entries may be coded wrong (worth a second look)"
- \`PTO_WASTED(pto_wasted_hours=X)\` → "X wasted PTO hrs (used on an already-full week)"
If a code shows \`missing_hours=unknown\` or \`overtime_hours=unknown\`, omit the
number for that one code only rather than guessing — but this should be rare.
Never write "missing hours" or "overtime" with no number when the code string
provided one. Keep each engineer's line concise — magnitudes first, roughly
10-14 words after the name.

A PTO verification note may appear in the data you're given, stating whether
PTO/holiday data was retrieved from Paylocity this run. It is only included when
relevant to a Miss or PTO_WASTED finding in this message. If present and it says
PTO data WAS verified, do NOT add any PTO caveat — missing-hours figures already
exclude approved PTO/holidays. If present and it says PTO data could NOT be
verified, add one brief caveat line before the bullet list (not per-engineer):
note that missing-hours figures may include approved PTO or holiday time not yet
reflected, since this run couldn't verify PTO usage — so the real delinquency
count may be lower than shown. If the note is absent entirely, don't mention PTO
at all. Only ever add the caveat when the note is present and says verification
failed, and only once per message, never per-engineer.

One closing line noting engineers have been notified directly and corrections
are due end of day today (Monday) — the same day this check runs.`;
}

const DIRECTOR_DIGEST_SYSTEM_PROMPT = `You write short, direct Monday morning
Teams DMs to the Director of Engineering at a custom architectural fabrication
company, summarizing the weekly clocked-time QC findings across the ENTIRE
engineering team, organized into three sections.

${digestSharedInstructions()}

Structure for the Director's message specifically:
- One-sentence org-wide summary (X of Y total engineers flagged, or all clear)
- Three sections, each with its own bold header and its own "X of Y flagged"
  line, in this order: **Fabrication Engineering**, **Production Engineering**,
  **Engineering Consultants**. If a section has zero people in that category
  entirely, write "No [category] this week" instead of an empty header. If a
  section has people but none are flagged, write "All clear" under that header —
  don't omit the section.
- Within each section, bullet the flagged engineers in that category only,
  using the same code-translation rules above.
- The PTO caveat (if applicable) and closing deadline line apply once, at the
  very end of the whole message — not repeated per section.`;

// Shared builder for the two single-team manager digests (FabEng, ProdEng).
// These are structurally identical except for which team they're scoped to,
// so this is a function rather than two near-duplicate constants.
function buildTeamDigestPrompt(teamLabel: string): string {
  return `You write short, direct Monday morning Teams DMs to an engineering
manager at a custom architectural fabrication company, summarizing the weekly
clocked-time QC findings for their team specifically — ${teamLabel} — only.
Do not mention other teams; this message is scoped to ${teamLabel} alone.

${digestSharedInstructions()}

Structure:
- One-sentence team summary scoped to ${teamLabel} (X of Y ${teamLabel}
  engineers flagged, or all clear)
- If any flagged: bullet list of named engineers in ${teamLabel} only, using
  the code-translation rules above.`;
}

const FABENG_DIGEST_SYSTEM_PROMPT = buildTeamDigestPrompt("Fabrication Engineering");
const PRODENG_DIGEST_SYSTEM_PROMPT = buildTeamDigestPrompt("Production Engineering");

// Extracts issue_type codes (not deduped) from a findings entry's issue_types
// field. Handles both shapes defensively: a flat array of code strings, or (as
// PA sends via Compose_Finding) the full array of issue objects, each with an
// issue_type property. Without this, passing full objects straight into a
// template string produces "[object Object]" and Claude has nothing usable to
// build a gist from.
function extractRawIssueTypeCodes(issueTypesRaw: unknown): string[] {
  if (!Array.isArray(issueTypesRaw)) return [];
  return issueTypesRaw.map((item) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object" && "issue_type" in item) {
      return String((item as { issue_type: unknown }).issue_type);
    }
    return null;
  }).filter((c): c is string => !!c);
}

// Builds a code -> occurrence count map, e.g. { "Notes!": 2, "Overlap!": 1 }.
// Counting (not deduping) is what lets the digest say "2 indirect rows need
// notes" instead of just "notes needed".
function countIssueTypes(issueTypesRaw: unknown): Record<string, number> {
  const codes = extractRawIssueTypeCodes(issueTypesRaw);
  const counts: Record<string, number> = {};
  for (const c of codes) counts[c] = (counts[c] ?? 0) + 1;
  return counts;
}

// True if any of the given findings include a Miss or PTO_WASTED issue — the
// only two issue types the PTO-verification caveat is actually about. Used to
// gate whether the caveat note gets surfaced to Claude at all: without this
// check, a run with unverified PTO would attach "may include unverified PTO"
// to every digest regardless of whether anything in it concerns missing hours
// (e.g. a section flagged only for Overlap!/Notes!), and to a fully clean
// digest with nothing to caveat at all.
function hasMissOrPtoWasted(findings: DigestFinding[]): boolean {
  return findings.some(f => {
    const codes = extractRawIssueTypeCodes(f.issue_types);
    return codes.includes("Miss") || codes.includes("PTO_WASTED");
  });
}

// Builds one self-contained string per issue code, with its magnitude embedded
// directly (not left in a separate stats block). A prior version put
// missing_hours/overtime_hours in a separate "stats" segment while counts lived
// in a separate "issue counts" segment, requiring Claude to cross-reference the
// two to attach the right number to "Miss"/"OT". Across a full-team digest that
// cross-referencing was dropped inconsistently. Embedding the number inline per
// code removes the need for any lookup.
function buildCodeMagnitudeStrings(f: DigestFinding): string[] {
  const counts = countIssueTypes(f.issue_types);
  const stats = f.summary_stats;
  return Object.entries(counts).map(([code, n]) => {
    if (code === "Miss") {
      return `Miss(missing_hours=${stats?.missing_hours ?? "unknown"})`;
    }
    if (code === "OT") {
      return `OT(overtime_hours=${stats?.overtime_hours ?? "unknown"})`;
    }
    if (code === "PTO_WASTED") {
      return `PTO_WASTED(pto_wasted_hours=${stats?.pto_wasted_hours ?? "unknown"})`;
    }
    return `${code}:${n}`;
  });
}

// Formats one finding as a bullet-ready line: "- Name: N issues — codes..."
function formatFindingLine(f: DigestFinding): string {
  const codeStrings = buildCodeMagnitudeStrings(f);
  const codesLine = codeStrings.length > 0 ? codeStrings.join(", ") : "none";
  return `- ${f.name}: ${f.issue_count} issue${f.issue_count !== 1 ? "s" : ""} — ${codesLine}`;
}

// Builds the "PTO/holiday data was[not] retrieved..." note, or "" if omitted
// entirely. Shared by the per-engineer path (above) and every digest audience
// below so the exact wording can't drift between the two call sites.
function buildPtoNote(ptoDataAvailable: boolean | undefined): string {
  return ptoDataAvailable
    ? "PTO/holiday data was successfully retrieved from Paylocity for this run — missing-hours figures below already exclude approved PTO and holidays.\n\n"
    : "PTO/holiday data could not be retrieved from Paylocity this run — missing-hours figures below may include approved PTO or holidays not yet reflected.\n\n";
}

async function handleDigest(body: ClockQCRequest, env: Env): Promise<Response> {
  const {
    pay_period_start, pay_period_end, findings = [],
    total_engineers = 0, flagged_count = 0,
    total_fabeng = 0, flagged_fabeng = 0,
    total_prodeng = 0, flagged_prodeng = 0,
    total_consultant = 0, flagged_consultant = 0,
    pto_data_available,
    labor_summary_org, labor_summary_fabeng, labor_summary_prodeng,
  } = body;

  const fabengFindings = findings.filter(f => f.category === "FabEng");
  const prodengFindings = findings.filter(f => f.category === "ProdEng");
  const consultantFindings = findings.filter(f => f.category === "Consultant");

  // Diagnostic safety net for the PA-side dependency: this three-way split
  // only works once PA's Compose_Category action is live and tagging every
  // finding. If findings exist but none matched a known category, the three
  // sections below will all silently render "(none flagged)" while the
  // org-wide top-line count still looks correct — easy to miss without this
  // warning. Check `wrangler tail` if this ever fires.
  if (findings.length > 0 && fabengFindings.length + prodengFindings.length + consultantFindings.length === 0) {
    console.warn(
      "clocked-time-qc digest: findings present but none carry a recognized category " +
      "(FabEng/ProdEng/Consultant) — PA's Compose_Category step may not be updated yet."
    );
  }

  // Only surface the PTO note when it's relevant (a Miss or PTO_WASTED finding
  // exists) — see hasMissOrPtoWasted for why an unconditional caveat is wrong.
  const orgPtoNote = hasMissOrPtoWasted(findings) ? buildPtoNote(pto_data_available) : "";
  const fabengPtoNote = hasMissOrPtoWasted(fabengFindings) ? buildPtoNote(pto_data_available) : "";
  const prodengPtoNote = hasMissOrPtoWasted(prodengFindings) ? buildPtoNote(pto_data_available) : "";

  // --- Director message: full org, three sections ---
  const directorSectionsPrompt =
    `Fabrication Engineering: ${flagged_fabeng} of ${total_fabeng} flagged\n` +
    (fabengFindings.length > 0 ? fabengFindings.map(formatFindingLine).join("\n") : "(none flagged)") +
    `\n\nProduction Engineering: ${flagged_prodeng} of ${total_prodeng} flagged\n` +
    (prodengFindings.length > 0 ? prodengFindings.map(formatFindingLine).join("\n") : "(none flagged)") +
    `\n\nEngineering Consultants: ${flagged_consultant} of ${total_consultant} flagged\n` +
    (consultantFindings.length > 0 ? consultantFindings.map(formatFindingLine).join("\n") : "(none flagged)");

  const directorUserPrompt =
    `Pay period: ${pay_period_start} – ${pay_period_end}\n` +
    `${orgPtoNote}` +
    `Org-wide: ${flagged_count} of ${total_engineers} engineers flagged\n\n` +
    `${directorSectionsPrompt}\n\nWrite the Director's three-section digest DM.`;

  // --- FabEng manager message: FabEng only ---
  const fabengUserPrompt = flagged_fabeng > 0
    ? `Pay period: ${pay_period_start} – ${pay_period_end}\n` +
      `${fabengPtoNote}` +
      `Fabrication Engineering: ${flagged_fabeng} of ${total_fabeng} flagged\n\n` +
      `${fabengFindings.map(formatFindingLine).join("\n")}\n\nWrite the manager digest DM.`
    : `Pay period: ${pay_period_start} – ${pay_period_end}\n` +
      `Fabrication Engineering: all ${total_fabeng} engineers clear — no issues found.\n\n` +
      `Write the all-clear manager digest DM.`;

  // --- ProdEng manager message: ProdEng only ---
  const prodengUserPrompt = flagged_prodeng > 0
    ? `Pay period: ${pay_period_start} – ${pay_period_end}\n` +
      `${prodengPtoNote}` +
      `Production Engineering: ${flagged_prodeng} of ${total_prodeng} flagged\n\n` +
      `${prodengFindings.map(formatFindingLine).join("\n")}\n\nWrite the manager digest DM.`
    : `Pay period: ${pay_period_start} – ${pay_period_end}\n` +
      `Production Engineering: all ${total_prodeng} engineers clear — no issues found.\n\n` +
      `Write the all-clear manager digest DM.`;

  let message_text_director: string | null = null;
  let message_text_fabeng: string | null = null;
  let message_text_prodeng: string | null = null;

  try {
    [message_text_director, message_text_fabeng, message_text_prodeng] = await Promise.all([
      callClaude(directorUserPrompt, DIRECTOR_DIGEST_SYSTEM_PROMPT, env.TIME_ENTRY_ANTHROPIC_API_KEY, env.PA_CLAUDE_MODEL, 1024),
      callClaude(fabengUserPrompt, FABENG_DIGEST_SYSTEM_PROMPT, env.TIME_ENTRY_ANTHROPIC_API_KEY, env.PA_CLAUDE_MODEL, 768),
      callClaude(prodengUserPrompt, PRODENG_DIGEST_SYSTEM_PROMPT, env.TIME_ENTRY_ANTHROPIC_API_KEY, env.PA_CLAUDE_MODEL, 768),
    ]);
  } catch (err) {
    console.error("clocked-time-qc digest Claude error:", err);
    // Promise.all rejects if ANY call fails, which would leave all three null
    // even if two succeeded. If partial failures matter more than simplicity
    // here, switch to Promise.allSettled and handle each result individually —
    // not done here since a fully-null response degrades cleanly on the PA
    // side (skip any Teams send whose message is null).
  }

  // Prepend the topline hours line to each message, after the Claude calls
  // resolve — string concatenation, never part of the prompt. PA sends these
  // as literal null until it has seen a real (non-null) labor_summary come
  // back from this Worker's own payroll-path response for at least one
  // engineer in a run, so a null message stays null here — it never gets a
  // summary line glued onto nothing, and a null labor_summary_* just means no
  // line yet, not an error.
  if (message_text_director && labor_summary_org) {
    message_text_director = formatLaborSummaryLine(labor_summary_org) + message_text_director;
  }
  if (message_text_fabeng && labor_summary_fabeng) {
    message_text_fabeng = formatLaborSummaryLine(labor_summary_fabeng) + message_text_fabeng;
  }
  if (message_text_prodeng && labor_summary_prodeng) {
    message_text_prodeng = formatLaborSummaryLine(labor_summary_prodeng) + message_text_prodeng;
  }

  return jsonResponse(200, JSON.stringify({
    has_issues: flagged_count > 0,
    message_text_director,
    message_text_fabeng,
    message_text_prodeng,
  }));
}
