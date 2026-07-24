# Weekly Time Approval — Walkthrough

*Training reference — CW / DigiFab cross-company workflow*
*Source: training session with Kevin Atchley, July 13, 2026*

This is a step-by-step walkthrough of the weekly time review process, in the order you'd actually do it. Quirks and gotchas are called out inline, at the step where they matter — not as a separate list to memorize up front.

---

## 1. Open the global view first

Launch **CW Cross Company Time Review** — from the CW side. This is your starting point every week, because it's the only dashboard that shows a person's *complete* week regardless of which company they punched into.

Set the date range **Sunday-to-Sunday** for the prior week (e.g., the 5th through the 12th).

> **⚠️ Quirk — two different week definitions.** CW's week runs Sunday–Saturday; DigiFab's runs Monday–Sunday. Don't rely on the raw date range alone to catch the right entries — instead, set the **Pay Period** filter to equal the **Monday** of the week you're reviewing. That field already accounts for the mismatch.

Once the pay period is set, arrange your columns to show labor type and clock-in date, group by clock-in date, and turn on a sum summary for labor hours. Now you can see each person's daily and weekly totals at a glance.

---

## 2. Set up both approval dashboards side by side

Open **Time & Expense Approval** twice — CW on one side, DigiFab on the other — using a split-screen browser view. Before anything loads, enter your approver ID on each side.

> **⚠️ Quirk — approver IDs are paired.** You have a CW numeric ID and a matching DigiFab ID prefixed with `C` (e.g., `526` on CW / `C526` on DigiFab). Both need to be entered correctly before results appear.

> **⚠️ Quirk — approver reassignment isn't retroactive.** If someone who's supposed to be assigned to you shows zero results, check whether their time was submitted *before* the approver cutover. Reassignment only applies going forward — anyone who submitted prior to the change stays with the previous approver for that submission, even though the system shows them as reassigned to you now. This isn't a sync bug; during a handoff between approvers, expect a transition period where entries are split between old and new approver depending on submission date.

> **⚠️ Quirk — the "Company" column is not the employee's company.** It reflects which company the *job or clock punch* belongs to, not which company the *person* works for. Mixing these up means reviewing the wrong entries entirely.

---

## 3. Review one person at a time, day by day

Back in the global view, filter down to a single person. Walk their week day by day, checking:

- Correct job and operation code
- Rework flagged correctly (rework checkbox + the actual job it applies to, not a generic "bucket" job — though that's sometimes unavoidable if the real job is already closed)
- A labor note present wherever one's required (see step 5)

> **⚠️ Quirk — status codes.** Entries show as `S` (submitted), `A` (approved), or `E` (entered but never submitted). The Time & Expense Approval dashboard only surfaces `S` — once approved it drops off that view. The global Cross Company view is the only place that shows all statuses, including `E`, so it's your only reliable way to catch time someone entered but forgot to submit.
>
> Occasionally you'll also see `PA` (**Partially Approved**) — cause not fully understood yet. Once an entry lands in this state, it drops off the Time & Expense Approval dashboard entirely (though it's still visible on the global Cross Company view). The fix is to recall the entry and have it resubmitted — only then can it be approved normally.

**Example:** a person's Friday shows only a partial day. Before flagging it, check the Time Off calendar — a matching PTO or sick-time request for the missing hours usually means the week is actually complete, not short.

---

## 4. Reconcile the week against 40 hours

Add worked hours to any PTO/holiday time. It should land at roughly 40.

> **⚠️ Quirk — PTO does not count toward overtime.** If worked hours + PTO add up to *more* than 40, that's not overtime — it means the PTO needs to be manually refunded by HR. If it isn't refunded, the employee simply loses the excess hours.

> **⚠️ Quirk — holiday time doesn't count toward overtime either, but it can't be refunded.** Same non-counting rule as PTO, but unlike PTO there's no refund mechanism for holiday time — if worked hours + holiday time exceed 40, the excess is simply lost, with no path to recover it.

> **⚠️ Quirk — DigiFab sick time is separate from PTO.** Per HR: sick time is meant for unexpected absences, is use-it-or-lose-it (no rollover, no payout), and can't be freely substituted for a PTO shortfall on a planned absence.

> **⚠️ Quirk — no voluntary unpaid time while PTO is available.** Per HR policy, an employee can't elect to go unpaid for planned time off if they still have a PTO balance to draw from.

---

## 5. Fix any miscoded entries before approving

If something's wrong, go to **Time Entry** to correct it. After any change here, refresh the approval dashboard — it won't pick up edits automatically.

> **⚠️ Quirk — Weekly view vs. Daily view.** The Weekly grid (task rows × day columns) is fast for bulk entry, but it doesn't generate real clock-in/out punches and doesn't allow labor notes. Anyone using it needs to go back into Daily view afterward to add notes for the entries they just made.

> **⚠️ Quirk — Albany operations are in ALL CAPS.** From initial go-live, Albany's operation names were entered in all caps while CW's are regular case. If you try to group or filter by operation description across both sites, this will silently miss matches.

> **⚠️ Quirk — DigiFab's Friday schedule is shorter.** 8.5 hrs Monday–Thursday, 6 hrs Friday — and only *one* 15-minute break on Fridays instead of two. Relevant when checking holiday-time hours or break coding.

**Common coding issues to catch here:**
- Breaks logged as General Indirect instead of Break
- Broad/ambiguous categories (e.g., Design Engineering) used for what's actually rework — the entry should specify *whose* rework it is, not just that rework happened
- Missing labor notes on indirect codes that require them (General Indirect, Project Management — break time does *not* need one)
- Indirect time lumped into one large end-of-day entry instead of logged incrementally — inflates that person's indirect total and makes it harder to audit, even when the underlying hours are accurate

---

## 6. Approve, log follow-ups, move on

Shift-select the week's entries and approve. If anything needs a fix you can't resolve on the spot (an HR refund, a miscoded entry, a coaching conversation), jot it down rather than trying to resolve everything in the moment — then move to the next person and repeat from step 3.

---

## Quick reference

| Item | Rule |
|---|---|
| Review date range | Sunday through Sunday (prior week) |
| Pay Period filter | Equals the Monday of the week being reviewed |
| Status codes | S = Submitted, A = Approved, E = Entered (not submitted), PA = Partially Approved (recall and resubmit to fix) |
| DigiFab schedule | 8.5 hrs Mon–Thu / 6 hrs Fri, one Friday break instead of two |
| Notes required on | General Indirect, Project Management, and other indirect codes |
| Notes not required on | Break time |
| PTO + OT interaction | PTO does not count toward the 40-hr overtime threshold; excess can be refunded by HR |
| Holiday + OT interaction | Also does not count toward overtime, but excess holiday time cannot be refunded |
