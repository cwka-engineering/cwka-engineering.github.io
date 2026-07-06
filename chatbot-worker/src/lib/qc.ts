import type { QCIssue, ClockQCResponse } from "../routes/clocked-time-qc";

// ---------------------------------------------------------------------------
// Field mapping — CrossTimeReviewAPI Epicor field names → normalized
// ---------------------------------------------------------------------------

interface NormalizedRow {
  clock_in_date: string;        // LaborDtl_ClockInDate   "YYYY-MM-DD" (API returns ISO datetime)
  labor_type: string;           // LaborDtl_LaborType     "P" | "I"
  labor_hours: number;          // LaborDtl_LaborHrs
  labor_operation: string;      // LaborDtl_OpCode (direct) | Indirect_IndirectCode (indirect)
  labor_note: string;           // LaborDtl_LaborNote
  clock_in_time: number | null; // LaborDtl_ClockinTime  (decimal hours, e.g. 8.75 = 8:45am)
  clock_out_time: number | null;// LaborDtl_ClockOutTime (decimal hours)
  pay_period: string | null;    // Calculated_PayPeriod  first 10 chars = YYYY-MM-DD
  company: string;              // Calculated_Company    "CWK Associates" | "Digifabshop"
}

function normalizeRow(r: Record<string, unknown>): NormalizedRow {
  const directOp = String(r["LaborDtl_OpCode"] ?? "").trim();
  const indirectOp = String(r["Indirect_IndirectCode"] ?? "").trim();
  return {
    clock_in_date: String(r["LaborDtl_ClockInDate"] ?? "").slice(0, 10),
    labor_type: String(r["LaborDtl_LaborType"] ?? "").trim().toUpperCase(),
    labor_hours: parseFloat(String(r["LaborDtl_LaborHrs"] ?? "0")) || 0,
    labor_operation: directOp || indirectOp,
    labor_note: String(r["LaborDtl_LaborNote"] ?? "").trim(),
    clock_in_time: r["LaborDtl_ClockinTime"] != null
      ? parseFloat(String(r["LaborDtl_ClockinTime"])) || null
      : null,
    clock_out_time: r["LaborDtl_ClockOutTime"] != null
      ? parseFloat(String(r["LaborDtl_ClockOutTime"])) || null
      : null,
    pay_period: r["Calculated_PayPeriod"]
      ? String(r["Calculated_PayPeriod"]).slice(0, 10)
      : null,
    company: String(r["Calculated_Company"] ?? "").trim(),
  };
}

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------

function mondayOf(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

function sundayOf(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() - d.getDay());
  return d.toISOString().slice(0, 10);
}

function weekStart(dateStr: string, weekStartsSunday: boolean): string {
  return weekStartsSunday ? sundayOf(dateStr) : mondayOf(dateStr);
}

function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

// Logical day boundary for midnight-crossing detection (4am).
// Entries that start at or after this hour may span midnight; entries before it are
// genuine early-morning starts and should not be wrapped.
const LOGICAL_DAY_START_HOUR = 4.0;

// CWK Associates (Mountain Time) is always 2h behind Digifabshop (Eastern Time).
// Mountain and Eastern observe DST together, so the offset is constant year-round.
// Applied only to MES days (detected via IDLE TIME rows) to normalize all clock
// windows to Eastern before overlap comparison.
const CWK_TO_EASTERN_OFFSET = 2.0;

// Returns a timezone-normalized, midnight-crossing-safe {cin, cout} window for a row,
// or null if the row has no usable clock times.
// isMesDay: true when the day contains IDLE TIME rows (MES entry method detected).
function overlapWindow(
  r: NormalizedRow,
  isMesDay: boolean
): { cin: number; cout: number } | null {
  if (r.clock_in_time === null || r.clock_out_time === null) return null;
  let cin = r.clock_in_time;
  let cout = r.clock_out_time;
  // MES-only: normalize CWK (Mountain) → Eastern so cross-company windows are comparable.
  if (isMesDay && r.company === "CWK Associates") {
    cin += CWK_TO_EASTERN_OFFSET;
    cout += CWK_TO_EASTERN_OFFSET;
  }
  // Midnight crossing: entry started in the workday and clock_out wrapped past midnight.
  if (cin >= LOGICAL_DAY_START_HOUR && cout <= cin) {
    cout += 24;
  }
  if (cout <= cin) return null;
  return { cin, cout };
}

// ---------------------------------------------------------------------------
// Aggregation helpers
// ---------------------------------------------------------------------------

function groupBy<T>(arr: T[], key: (item: T) => string): Map<string, T[]> {
  const m = new Map<string, T[]>();
  for (const item of arr) {
    const k = key(item);
    if (!m.has(k)) m.set(k, []);
    m.get(k)!.push(item);
  }
  return m;
}

function sumHours(rows: NormalizedRow[], pred: (r: NormalizedRow) => boolean): number {
  return rows.filter(pred).reduce((acc, r) => acc + r.labor_hours, 0);
}

function round2(n: number): number { return Math.round(n * 100) / 100; }

function emptySummary(): ClockQCResponse["summary_stats"] {
  return {
    total_hours: 0, direct_hours: 0, indirect_hours: 0, indirect_percent: 0,
    missing_hours: 0, overtime_hours: 0, break_time_hours: 0,
    expected_break_time_hours: 0, work_days: 0,
  };
}

// ---------------------------------------------------------------------------
// Thresholds and exemptions
// ---------------------------------------------------------------------------

const THRESHOLDS = {
  daily_high_payroll: 10.0,
  daily_high_engineer: 12.0,
  weekly_ot_threshold: 40.0,
  break_day_min: 6.0,
  overlap_min_hours: 1 / 60,
  idle_threshold_hours: 1.0,
  missing_note_min_hours_payroll: 1.0,
};

const EXEMPT_ROLES = ["Director of Engineering", "Engineering Consultant"];

// ---------------------------------------------------------------------------
// Main analysis function
// ---------------------------------------------------------------------------

export interface AnalysisResult {
  issues: QCIssue[];
  summary_stats: ClockQCResponse["summary_stats"];
}

export function analyzeClockData(
  rows: Record<string, unknown>[],
  opts: {
    dept_role: string;
    pay_period_start: string;
    pay_period_end: string;
    context: "payroll" | "engineer";
    week_starts_sunday: boolean;
    pto_holiday_dates?: string[];
  }
): AnalysisResult {
  const { dept_role, context, week_starts_sunday } = opts;
  const exempt = EXEMPT_ROLES.includes(dept_role);
  const issues: QCIssue[] = [];
  const isPayroll = context === "payroll";
  const daily_threshold = isPayroll
    ? THRESHOLDS.daily_high_payroll
    : THRESHOLDS.daily_high_engineer;
  const note_threshold = isPayroll ? THRESHOLDS.missing_note_min_hours_payroll : 0.0;

  // --- No labor rows ---
  if (rows.length === 0) {
    if (isPayroll && !exempt) {
      issues.push({
        issue_type: "NO_LABOR_ROWS",
        severity: "info",
        week_start: null, week_end: null,
        details: `no clocked labor rows for ${opts.pay_period_start}..${opts.pay_period_end}`,
      });
    }
    return { issues, summary_stats: emptySummary() };
  }

  const normalized = rows
    .map(normalizeRow)
    .filter(r => r.clock_in_date && r.labor_hours > 0)
    // CRITICAL: constrain to the target pay period. The $top=200 fetch in the PA
    // flow intentionally pulls history spanning many weeks (Calculated_PayPeriod
    // isn't OData-filterable), so without this filter every week present in the
    // fetched rows gets evaluated for flags — not just the target week. Notes!
    // and Overlap! are per-occurrence (not deduplicated per week), so this bug
    // silently inflates issue counts by accumulating flags across an engineer's
    // entire fetched history instead of the one pay period being reviewed.
    .filter(r => r.clock_in_date >= opts.pay_period_start && r.clock_in_date <= opts.pay_period_end);

  // Second NO_LABOR_ROWS check: the raw fetch may have returned 200 historical
  // rows with none falling inside the target pay period (e.g. an engineer whose
  // most recent activity predates this week). The earlier rows.length===0 check
  // only catches a fully empty fetch, not this case.
  if (normalized.length === 0) {
    if (isPayroll && !exempt) {
      issues.push({
        issue_type: "NO_LABOR_ROWS",
        severity: "info",
        week_start: null, week_end: null,
        details: `no clocked labor rows for ${opts.pay_period_start}..${opts.pay_period_end}`,
      });
    }
    return { issues, summary_stats: emptySummary() };
  }

  // --- Summary stats ---
  const total_hours = sumHours(normalized, () => true);
  const direct_hours = sumHours(normalized, r => r.labor_type === "P");
  const indirect_hours = sumHours(normalized, r => r.labor_type === "I");
  const indirect_percent = total_hours > 0 ? (indirect_hours / total_hours) * 100 : 0;
  const break_time_hours = sumHours(normalized,
    r => r.labor_type === "I" && r.labor_operation === "008"
  );
  const work_days = new Set(normalized.map(r => r.clock_in_date)).size;
  const expected_break_time_hours = work_days * 0.5;

  // --- Daily grouping ---
  const byDate = groupBy(normalized, r => r.clock_in_date);

  // D10+ flag
  for (const [date, dayRows] of byDate) {
    const tot = dayRows.reduce((a, r) => a + r.labor_hours, 0);
    if (tot > daily_threshold) {
      const ws = weekStart(date, week_starts_sunday);
      issues.push({
        issue_type: "D10+",
        severity: "warn",
        week_start: ws, week_end: addDays(ws, 6),
        details: `daily_total=${tot.toFixed(2)}h on ${date} (threshold ${daily_threshold}h)`,
      });
    }
  }

  // --- Weekly grouping ---
  const byWeek = groupBy(normalized, r => weekStart(r.clock_in_date, week_starts_sunday));

  // OT + Miss flags
  if (!exempt) {
    for (const [ws, weekRows] of byWeek) {
      const weekTotal = weekRows.reduce((a, r) => a + r.labor_hours, 0);

      const ot = Math.max(0, weekTotal - THRESHOLDS.weekly_ot_threshold);
      if (ot > 0) {
        issues.push({
          issue_type: "OT",
          severity: "warn",
          week_start: ws, week_end: addDays(ws, 6),
          details: `overtime_hours_week=${ot.toFixed(2)}; week_total_hours=${weekTotal.toFixed(2)}`,
        });
      }

      if (isPayroll) {
        const missing = Math.max(0, 40 - weekTotal);
        // TODO: subtract 8h per date in pto_holiday_dates that falls within this week
        // to avoid false-positive Miss flags on PTO/holiday weeks (wire from Paylocity API)
        if (missing > 0) {
          issues.push({
            issue_type: "Miss",
            severity: "warn",
            week_start: ws, week_end: addDays(ws, 6),
            details: `missing_hours_week=${missing.toFixed(2)}`,
          });
        }
      }
    }
  }

  // Break missing flag
  if (!exempt) {
    for (const [date, dayRows] of byDate) {
      const tot = dayRows.reduce((a, r) => a + r.labor_hours, 0);
      const brk = sumHours(dayRows,
        r => r.labor_type === "I" && r.labor_operation === "008"
      );
      if (tot >= THRESHOLDS.break_day_min && brk <= 0) {
        const ws = weekStart(date, week_starts_sunday);
        issues.push({
          issue_type: "Break!",
          severity: "warn",
          week_start: ws, week_end: addDays(ws, 6),
          details: `date=${date}; total=${tot.toFixed(2)}h; no Break-Time (008) logged`,
        });
      }
    }
  }

  // Missing notes flag
  for (const row of normalized) {
    if (row.labor_type === "I" && row.labor_hours >= note_threshold && !row.labor_note) {
      const ws = weekStart(row.clock_in_date, week_starts_sunday);
      issues.push({
        issue_type: "Notes!",
        severity: "error",
        week_start: ws, week_end: addDays(ws, 6),
        details: `indirect row on ${row.clock_in_date} (op=${row.labor_operation}, ${row.labor_hours}h) has no note`,
      });
    }
  }

  // Overlap flag — clock windows that overlap >= 1 min.
  // MES days (detected via IDLE TIME rows) have CWK entries normalized +2h to Eastern
  // before comparison so cross-company windows are in the same timezone reference.
  for (const [date, dayRows] of byDate) {
    const ws = weekStart(date, week_starts_sunday);
    const isMesDay = dayRows.some(
      r => r.labor_type === "I" && r.labor_note.toUpperCase() === "IDLE TIME"
    );
    const windows = dayRows
      .map(r => overlapWindow(r, isMesDay))
      .filter((w): w is { cin: number; cout: number } => w !== null)
      .sort((a, b) => a.cin - b.cin);

    for (let i = 0; i < windows.length - 1; i++) {
      const overlapHours =
        Math.min(windows[i].cout, windows[i + 1].cout) -
        Math.max(windows[i].cin, windows[i + 1].cin);
      if (overlapHours >= THRESHOLDS.overlap_min_hours) {
        issues.push({
          issue_type: "Overlap!",
          severity: "error",
          week_start: ws, week_end: addDays(ws, 6),
          details: `date=${date}; overlap=${Math.round(overlapHours * 60)}min`,
        });
      }
    }
  }

  // Idle time flag (payroll only)
  if (isPayroll) {
    for (const [ws, weekRows] of byWeek) {
      const idle = sumHours(weekRows,
        r => r.labor_type === "I" && r.labor_note.toUpperCase() === "IDLE TIME"
      );
      if (idle > THRESHOLDS.idle_threshold_hours) {
        issues.push({
          issue_type: "Idle",
          severity: "warn",
          week_start: ws, week_end: addDays(ws, 6),
          details: `idle_time_hours=${idle.toFixed(2)}; exceeds_1h=true`,
        });
      }
    }
  }

  // Working lunch flag (payroll only, not exempt)
  if (isPayroll && !exempt) {
    for (const [date, dayRows] of byDate) {
      const tot = dayRows.reduce((a, r) => a + r.labor_hours, 0);
      if (tot < 4) continue;
      const isMesDay = dayRows.some(
        r => r.labor_type === "I" && r.labor_note.toUpperCase() === "IDLE TIME"
      );
      const windows = dayRows
        .map(r => overlapWindow(r, isMesDay))
        .filter((w): w is { cin: number; cout: number } => w !== null)
        .sort((a, b) => a.cin - b.cin);
      if (windows.length < 2) continue;
      const hasLunchGap = windows.some((w, i) =>
        i < windows.length - 1 &&
        windows[i + 1].cin - w.cout >= 0.5 &&
        windows[i + 1].cin - w.cout <= 1.0
      );
      if (!hasLunchGap) {
        const ws = weekStart(date, week_starts_sunday);
        issues.push({
          issue_type: "Lunch?",
          severity: "info",
          week_start: ws, week_end: addDays(ws, 6),
          details: `date=${date}; no ~30-60 min midday gap detected`,
        });
      }
    }
  }

  // PTO wasted — disabled. CrossTimeReviewAPI never returns PTO rows (PTO lives
  // exclusively in Paylocity), so this flag can never fire against ERP labor data
  // alone. Re-enable once Paylocity API access lands and PA passes PTO records
  // via pto_holiday_dates on ClockQCRequest.

  // Deduplicate by issue_type + week_start; Notes! and Overlap! are per-occurrence
  const seen = new Set<string>();
  const deduped = issues.filter(i => {
    if (i.issue_type === "Notes!" || i.issue_type === "Overlap!") return true;
    const k = `${i.issue_type}|${i.week_start}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  const total_missing = !exempt && isPayroll
    ? [...byWeek.values()].reduce((a, wr) =>
        a + Math.max(0, 40 - wr.reduce((s, r) => s + r.labor_hours, 0)), 0)
    : 0;
  const total_ot = [...byWeek.values()].reduce((a, wr) =>
    a + Math.max(0, wr.reduce((s, r) => s + r.labor_hours, 0) - 40), 0);

  return {
    issues: deduped,
    summary_stats: {
      total_hours: round2(total_hours),
      direct_hours: round2(direct_hours),
      indirect_hours: round2(indirect_hours),
      indirect_percent: round2(indirect_percent),
      missing_hours: round2(total_missing),
      overtime_hours: round2(total_ot),
      break_time_hours: round2(break_time_hours),
      expected_break_time_hours: round2(expected_break_time_hours),
      work_days,
    },
  };
}
