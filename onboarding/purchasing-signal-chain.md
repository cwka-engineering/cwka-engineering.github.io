---
layout: default
title: Purchasing Signal Chain
permalink: /onboarding/purchasing-signal-chain.html
parent: Project Delivery Overview
grand_parent: Onboarding
nav_order: 2
---

# Purchasing Signal Chain

The four gates that must be cleared before materials are ordered.

> **Related**: [Scheduling Chain](/onboarding/scheduling-chain.html) | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html) | [Material Transmittal Log](/workflows/fabrication-engineer/material-transmittal.html) | [Inventory Jobs (INV)](/tools/epicor/inventory-jobs.html)

## The Four Gates

Your BOM work and Engineering Complete checkbox are not just release formalities — they are one of four gates in a purchasing signal chain:

| Gate | Responsibility | What It Means |
|------|---------------|---------------|
| 1. Job shop drawing submittal is **Approved** | PM manages | Client has approved the drawings |
| 2. Part and quantities are **confirmed with Fabrication Engineering** | FE (you) | BOM is correct and complete |
| 3. Material submittal is **Approved** in the Material Transmittal Log | PM manages | Client has approved the specific material/finish |
| 4. Fabrication Engineering is **Complete** | FE (you check the box) | All engineering work is done |

**Only when all four conditions are true** does the PM mark "Ready to Purchase" and "Purchase Direct" on the PM Materials Dashboard, which signals Purchasing to order materials.

> **INV-class materials (SG, SS, SL, IM):** For these material classes, "Ready to Purchase" and "Purchase Direct" are set on the project's **[Inventory Job](/tools/epicor/inventory-jobs.html)** (`ProjectNumber.INV`), not on the manufacturing job. A BPM blocks Purchase Direct on manufacturing jobs for these classes. The four gates still apply — the purchase just routes through the INV job.

## Why This Matters

If you are late checking Engineering Complete or if a BOM line is missing:
- Materials don't get ordered
- Production stalls waiting for materials
- Ship dates may be missed
- The truck schedule for the entire project may be affected

## Inventory Job Materials

Certain material classes do **not** purchase direct to manufacturing jobs. Instead, they are purchased through the project's **[Inventory Job](/tools/epicor/inventory-jobs.html)** (`ProjectNumber.INV`):

- **SG** (Sheet Goods)
- **SS** (Solid Surface)
- **SL** (Solid Lumber)
- **IM** (Inventory Metal)

FE engineers enter takeoff quantities on manufacturing jobs for demand visibility, but do **not** check Ready to Purchase or Purchase Direct. The Lead Engineer or PM manages purchasing from the INV job, where they can see consolidated demand across all jobs via the [Takeoff Audit Report](/tools/epicor/inventory-jobs.html#how-to-read-takeoff-audit).

**Min/Max stocked items** have their own replenishment process in Epicor and do not use the INV job. **Specialty parts** (e.g., `1234.SG.00005` veneer sequences) are purchased directly on the manufacturing job as usual.
