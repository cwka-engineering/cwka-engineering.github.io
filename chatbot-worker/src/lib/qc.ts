import type { QCIssue, ClockQCResponse } from "../routes/clocked-time-qc";

// ---------------------------------------------------------------------------
// Field mapping — CrossTimeReviewAPI Epicor field names → normalized
// ---------------------------------------------------------------------------

interface NormalizedRow {
  clock_in_date: string;         // LaborDtl_ClockInDate   "YYYY-MM-DD"
  labor_type: string;            // LaborHed_LaborType     "P" | "I"
  labor_hours: number;           // LaborDtl_LaborQty
  labor_operation: string;       // LaborHed_OpCode
  labor_note: string;            // LaborDtl_LaborNote
  clock_in_time: string | null;  // Calculated_Std_Clock_In  (NY-local, pre-normalized by ERP)
  clock_out_time: string | null; // Calculated_Std_Clock_Out
  pay_period: string | null;     // Calculated_PayPeriod   first 10 chars = YYYY-MM-DD
}

function normalizeRow(r: Record<string, unknown>): NormalizedRow {
  return {
    clock_in_date: String(r["LaborDtl_ClockInDate"] ?? "").slice(0, 10),
    labor_type: String(r["LaborHed_LaborType"] ?? "").trim().toUpperCase(),
    labor_hours: parseFloat(String(r["LaborDtl_LaborQty"] ?? "0")) || 0,
    labor_operation: String(r["LaborHed_OpCode"] ?? "").trim(),
    labor_note: String(r["LaborDtl_LaborNote"] ?? "").trim(),
    clock_in_time: (r["Calculated_Std_Clock_In"] as string | null) ?? null,
    clock_out_time: (r["Calculated_Std_Clock_Out"] as string | null) ?? null,
    pay_period: r["Calculated_PayPeriod"]
      ? String(r["Calculated_PayPeriod"]).slice(0, 10)
      : null,
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

// Clock time string → decimal hours since midnight.
// ERP Calculated_Std_Clock_In/Out are already in NY local time — strip any TZ suffix.
function clockToDecimalHours(s: string | null): number | null {
  if (!s) return null;
  const cleaned = s.replace(/[Zz]$/, "").replace(/[+-]\d{2}:\d{2}$/, "");
  const match = cleaned.match(/T(\d{2}):(\d{2})/);
  if (!match) return null;
  return parseInt(match[1]) + parseInt(match[2]) / 60;
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
  overlap_min_hours: 0.25,
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
    .filter(r => r.clock_in_date && r.labor_hours > 0);

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

  // Overlap flag — clock windows that overlap >= 15 min
  for (const [date, dayRows] of byDate) {
    const ws = weekStart(date, week_starts_sunday);
    const windows = dayRows
      .map(r => ({
        cin: clockToDecimalHours(r.clock_in_time),
        cout: clockToDecimalHours(r.clock_out_time),
      }))
      .filter((w): w is { cin: number; cout: number } =>
        w.cin !== null && w.cout !== null
      )
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
      const windows = dayRows
        .map(r => ({
          cin: clockToDecimalHours(r.clock_in_time),
          cout: clockToDecimalHours(r.clock_out_time),
        }))
        .filter((w): w is { cin: number; cout: number } =>
          w.cin !== null && w.cout !== null
        )
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

  // PTO wasted (payroll only)
  if (isPayroll) {
    for (const [ws, weekRows] of byWeek) {
      const pto = sumHours(weekRows,
        r => r.labor_type === "I" && r.labor_operation === "PTO"
      );
      const nonPto = weekRows.reduce((a, r) => a + r.labor_hours, 0) - pto;
      const wasted = Math.max(0, nonPto + pto - 40) - Math.max(0, nonPto - 40);
      if (wasted > 0) {
        issues.push({
          issue_type: "PTO_WASTED",
          severity: "warn",
          week_start: ws, week_end: addDays(ws, 6),
          details: `pto_wasted_hours=${wasted.toFixed(2)}`,
        });
      }
    }
  }

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
