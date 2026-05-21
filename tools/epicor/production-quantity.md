---
layout: default
title: Production Quantity & Fixed Qty
permalink: /tools/epicor/production-quantity.html
nav_order: 6
parent: Epicor Usage
grand_parent: Tools
corpus_tags: [fe-release]
---

# Production Quantity & Fixed Qty

> **Related**: [Job Management](/tools/epicor/job-management.html) | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html) | [Manufactured Metal Parts & M Jobs](/tools/epicor/manufactured-parts-jobs.html)

## What Is Production Quantity?

**Production Quantity (Prod Qty)** is a field on the Epicor job header that captures how many exact duplicate parts a job will produce. It functions as a multiplier across both the Bill of Materials (BOM) and the Bill of Operations (BOO) for the job.

Prod Qty is highly visible:
- It prints on the **Job Traveler** distributed to production staff
- It is pulled into FE drawings via the Engineering Toolkit and appears on the **200-series pages** of the submittal drawing set

## Fixed Qty Checkbox

**Fixed Qty** is a per-line checkbox on the BOM that overrides the Prod Qty multiplier for that specific line. When Fixed Qty is **TRUE**, the entered quantity is used exactly as-is, regardless of the job's Production Quantity setting.

**Standard direction: always check Fixed Qty TRUE, and enter the total quantity of material needed to produce the full run of parts.** This keeps BOM entry predictable and removes the risk of multiplier errors.

## Rules by Job Type

### Parent Production Jobs

Production Quantity is typically **1**, but may be greater than 1 when the job produces multiple identical assemblies — for example, a run of 8 identical benches. Even so:

- Fixed Qty must still be **TRUE** on all BOM lines
- BOM quantities should reflect the **total material required** to produce the full run, not the per-unit amount

### Metal Kit (M Job)

Production Quantity must always be **1**. A Metal Kit represents all metal content within a single parent job — it is never duplicated. Fixed Qty TRUE on all lines.

### Repeatable Manufactured Parts (M Jobs, WC Jobs)

For parts such as wood profiles, glue-up blanks, and repeatable metal parts, Production Quantity may be **greater than 1**. Even so:

- Fixed Qty must still be **TRUE** on all BOM lines
- BOM quantities should reflect the **total material required** to produce the full run, not the per-unit amount

### CMG / Rollout Jobs (Make-to-Stock) — Exception

CMG jobs are cloned from catalog template jobs and operate on a **Make-to-Stock** demand model. The BOM is built for a finished quantity of **1 piece**.

- Fixed Qty must be **unchecked** on these jobs so that the Prod Qty multiplier correctly scales material and labor takeoffs when the job is cloned at production quantities
- This is the only job type where Fixed Qty should not be TRUE

## Common Mistake: Rhino Object Count vs. Production Quantity

Epicor does not track the number of individual pieces within a kit — only the Production Quantity of the job itself. These are not the same thing.

**Example:** A Metal Kit job with Prod Qty = 1 may contain four identical pieces of metal angle. The quantity "4" describes objects within the kit, not how many kits are being produced. Writing "Production Quantity: 4" on the drawing page that dimensions that angle is **incorrect** — it will be misread as an Epicor job field and create confusion on the shop floor.

When annotating components within a Metal Kit drawing, use language like **"Qty: 4"** or **"4× REQ'D"** to make clear the reference is to piece count, not to the job's Production Quantity.
