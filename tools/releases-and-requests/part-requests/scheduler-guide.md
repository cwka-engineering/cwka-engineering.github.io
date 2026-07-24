---
layout: default
title: Scheduler Guide
permalink: /tools/releases-and-requests/part-requests/scheduler-guide.html
parent: Part Requests
grand_parent: Releases & Requests
nav_order: 2
---

# Part Requests — Scheduler Guide

> **Related**: [Engineer / PM Guide](/tools/releases-and-requests/part-requests/engineer-guide.html) | [Part Management](/tools/epicor/part-management.html) | [Master Scheduler Workflow](/workflows/master-scheduler.html)

This guide is for the **Master Scheduler**. When an engineer or PM needs a new part that isn't in the Epicor catalog, you'll be automatically notified in Teams and assigned a Planner task. Your job is to create the part in Epicor and reply to the thread with the new part number.

---

## When You'll Be Notified

You'll be **@mentioned in the Part Requests channel** when a requester has replied DECLINE — meaning they need a new part created. You'll also receive a task in the **Releases & Requests Planner board** at the same time.

---

## What the Thread Notification Includes

The system will reply in the request thread with:

- **Class** — the ERP class code (HW, SG, SL, MT, etc.)
- **Suggested Description** — a Claude-generated ERP-formatted description based on the requester's input
- **Suggested Search Word** — the search word to assign in Epicor
- **Suggested part number** — the next available sequential number in that class (e.g. `GM.HW.03675`)
- **Due date** — 3 business days from the request date

> The suggested part number is a recommendation based on the current highest number in the class at the time of the request. Verify it hasn't been taken by the time you create the part — if the next available number has moved, use the actual next available.

---

## What the Planner Task Includes

Open the Planner task for the full ERP entry worksheet. The Notes section contains:

- All ERP fields pre-filled where possible (PartNum, Description, ClassID, SearchWord, TypeCode, ProdCode, IUM, UOMClassID, PUM, SalesUM)
- Dimensional fields pre-filled where the system could infer them from the description — blank (`___`) where they need your input
- UOM fields pre-filled based on class defaults — flagged with `___` where they vary by product type and require your judgment
- Vendor fields (Brand, SubBrand/SKU) — pre-filled if a McMaster-Carr SKU was detected, otherwise blank
- A direct link back to the Teams thread

---

## Your Steps

### 1. Review the request

Read the thread and the Planner task. Check that the suggested description and search word make sense for the part. If something is ambiguous — species not specified for lumber, grade unclear for metal, etc. — reply in the thread to ask the requester for clarification before creating the part.

> Clarifying questions in the thread are fine. The requester's replies won't accidentally trigger the workflow.

### 2. Create the part in Epicor

Use the Planner task as your entry worksheet. Fill in the blank fields, verify the pre-filled values, and create the part. Key things to confirm:

- **PartNum** — verify the suggested number is still available; if not, use the actual next available
- **IUM / UOMClassID / PUM / SalesUM** — pre-filled where the class has a strong default; marked `___` where it varies. Use your judgment based on the specific product type
- **Dimensions** — pre-filled where the system could determine them from the description; verify or complete as needed
- **Brand / SubBrand** — if a McMaster-Carr SKU was provided, confirm the SKU is correct at mcmaster.com before entering it. Do not use the system's suggested description as a source of truth for SKU-derived specs — verify dimensions directly from the McM product page

### 3. Reply to the thread with the new part number

Once the part is saved in Epicor, **reply to the original thread** with the new part number and nothing else:

```
GM.HW.03675
```

The system will verify the part against Epicor, then automatically post a confirmation to the requester with the confirmed ERP description and IUM. The Planner task will be marked complete.

> The part number format must be `GM.XX.NNNNN` — the system validates this pattern before processing. If you need to include a note alongside the part number, that's fine, but make sure the part number is present.

### 4. If the system flags the part as not found

If the system replies with a "⚠️ Part not found in ERP yet" message, it means Epicor hasn't committed the record yet or there's a mismatch in the part number. Check that the part was saved correctly in Epicor, then reply to the thread again with the part number.

---

## Your Interactions at a Glance

| When | What you do | Where |
|---|---|---|
| @mentioned in thread | Review the request details | Part Requests channel in Teams |
| Before creating part (if needed) | Ask clarifying question in thread | Part Requests channel in Teams |
| Part created in Epicor | Reply to thread with part number | Part Requests channel in Teams |
| Planner task | Reference entry worksheet; auto-completes on confirmation | Releases & Requests Planner board |

---

## Tips

**Always reply in the thread, not as a new post.** The system links your reply back to the specific request. A reply to the wrong thread won't be processed.

**Verify the McM SKU before entering specs.** If a McMaster-Carr SKU is provided, use the actual product page at mcmaster.com to confirm dimensions and specs — don't rely on the system's suggested description as a source of truth for SKU-derived specs.

**The suggested part number can change.** If another part was added to the same class between the time the request was made and when you create it, the next available number may have incremented. Always confirm availability in Epicor before committing.

**Don't reply to threads that aren't addressed to you.** The workflow only processes replies from the designated scheduler account. Replies from other accounts in the AWAITING_SCHEDULER state are silently ignored.

---

## Questions or Issues

Contact the **Director of Engineering & Computational Design** (owner of this automation) if a task or thread appears stuck, or if the workflow doesn't respond after you reply with a part number.
