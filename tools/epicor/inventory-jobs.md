---
layout: default
title: Inventory Jobs (INV)
permalink: /tools/epicor/inventory-jobs.html
nav_order: 7
parent: Epicor Usage
grand_parent: Tools
---

# Inventory Jobs (INV)

How the project inventory job controls purchasing for sheet goods, solid surface, solid lumber, and inventory metal.

> **Related Documents**: [Purchasing Signal Chain](/onboarding/purchasing-signal-chain.html) | [Material Transmittal Log](/workflows/fabrication-engineer/material-transmittal.html) | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html) | [Job Management](/tools/epicor/job-management.html) | [Takeoffs](/workflows/fabrication-engineer/takeoffs.html)

## Purpose

Every project has one inventory job, named `ProjectNumber.INV` (e.g., `1086.INV`). The inventory job is the single point of control for purchasing **Sheet Goods (SG)**, **Solid Surface (SS)**, **Solid Lumber (SL)**, and **Inventory Metal (IM)**. In special cases, other material classes (e.g., fabric, hardware for high-job-count projects) may also be purchased through the INV job.

These materials — with few exceptions — are **all purchased direct to the inventory job**, not to manufacturing jobs.

### Problems Solved

The inventory job process was introduced to address four long-standing issues:

1. **Inconsistent specifications** — Specifications (fire rating, FSC, veneer cut, etc.) were inconsistent across engineers on the same project. Because only the Lead Engineer or PM adds materials to the INV job, specifications can be verified at the point of entry.

2. **Redundant part numbers** — Engineers were creating duplicate part numbers for materials that already existed. The INV job serves as a canonical parts list for the project — check it first before requesting a new part.

3. **Lack of visibility to takeoff purchases** — Requisitions were previously used to buy takeoff material early, but it was difficult to see what had been ordered and its status. Now all takeoff materials are BOM'd and purchased on the INV job, visible through the [Takeoff Audit Report](#how-to-read-takeoff-audit).

4. **Financial delay** — Takeoff materials purchased to general inventory didn't appear as project costs until issued to jobs, meaning finance couldn't bill for them. With the INV job, material cost is recognized immediately upon receipt.

## Who Does What

| Role | Responsibility |
|------|---------------|
| **PM** | Ultimately owns the INV job. Determines who populates it (self or Lead Engineer). Monitors supply balance. Decides when to purchase. |
| **Lead Engineer** | Populates the INV job with specified materials (in partnership with PM). Adds new parts when FE engineers request them. |
| **FE Engineer** | Checks the INV job before BOM'ing materials. Requests additions if a needed part isn't there. Enters takeoff quantities on manufacturing jobs (but does **not** check purchase flags). |
| **Production Planner** | Monitors the Takeoff Audit Report during PE/release. Adjusts INV job quantities per optimization results. Alerts project team on supply imbalances. |

The PM–Lead Engineer relationship is a partnership. It varies by project — the PM may handle everything directly, or delegate INV job management to the Lead Engineer. The key is that the decision is explicit, not assumed.

---

## Workflow by Project Phase

### Phase 1 — Project Specification & Takeoff
{: #phase-takeoff}

Once the project is set up and launched:

1. **Populate the INV job** with all known specified materials. Focus on materials that need early takeoff and purchase — not everything can be known up front.
2. **Enter takeoff quantities on manufacturing jobs** — break out takeoffs by manufacturing job when the job structure is ready.
3. On the **manufacturing job**: set quantities as needed, but **do NOT check** Engineering Complete, Ready to Purchase, or Purchase Direct. [^transcript-inventory-job-launch]
4. On the **inventory job**: add the sum of all manufacturing job demand for a part **plus extra** (waste factor). Check **Engineering Complete**, **Ready to Purchase**, and **Purchase Direct**. [^sop-inventory-jobs]
5. The part is purchased and received to the INV job. Original demand from takeoffs will appear on the [Takeoff Audit Report](#how-to-read-takeoff-audit).

> **BPM enforcement:** A Business Process Method (BPM) in Epicor actively **blocks** checking Purchase Direct on manufacturing jobs for INV-class materials. If you try, you'll receive an error. [^transcript-inventory-job-launch]

### Phase 2 — Fabrication Engineering
{: #phase-fe}

During fabrication engineering, BOMs are created and modified as needed.

#### How do I add a part to the inventory job?
{: #how-to-add-part-to-inv}

**If the part is NOT on the INV job:**
1. Check the INV job first — does the part already exist?
2. If not, request that the Lead Engineer (or PM) add it to the INV job.
3. Once added, BOM the part on your manufacturing job. Set quantity as needed, but **do not** check Ready to Purchase or Purchase Direct.
4. The Lead Engineer notifies the PM (if the PM wasn't the one adding it). The PM can now see the demand and decide when to purchase.

**If the part IS already on the INV job:**
- BOM it on your manufacturing job as you normally would. No request needed.

#### How do I handle a quantity change on the inventory job?
{: #how-to-handle-inv-qty-change}

**On the manufacturing job:**
- Simply change the quantity up or down. The INV job team will see the demand change on the Takeoff Audit Report.

**On the inventory job** (when more needs to be purchased):
- If the part is **already on a purchase order**: add a **new material line** for the same part with the additional quantity. Do **not** increase the quantity of the existing line — increasing an already-purchased line does not generate a new purchasing suggestion, so Purchasing won't see the need. [^sop-inventory-jobs]
- If the part has **not yet been purchased** (no PO, no active purchasing suggestion): you can increase the quantity on the existing line.

### Phase 3 — Production Engineering
{: #phase-pe}

Part quantities may change after final optimizations in production engineering. If so, the production planner follows the same rules above for adding parts and changing quantities. The planner monitors the Takeoff Audit Report after each job release and alerts the project team if supply balance goes negative or trends in a bad direction.

### Phase 4 — Shop Release & Receiving
{: #phase-shop}

**Receiving:** Parts purchased direct to the INV job are issued upon receipt. Material cost is incurred by the project immediately — no delay waiting for issuing.

**Releasing a manufacturing job:** When a manufacturing job is released and needs materials from the INV job:
1. Parts are returned from the INV job WIP to general inventory.
2. Parts are issued from general inventory to the manufacturing job.
3. The BOM quantity on the INV job is **reduced** by the amount issued.

This last step is critical: if you don't reduce the INV job BOM, the system creates a false purchasing suggestion (it sees unsatisfied demand). At any point during the project, the INV job BOM represents the **current demand that hasn't been consumed**.

---

## Exceptions

### Min/Max Parts

Parts managed by Epicor's min/max inventory replenishment system have their own purchasing suggestions. **Do not use the INV job** for min/max parts — handle them as you always have.

### Specialty Parts

Custom parts written in the `ProjectNumber.SG.00005` syntax (e.g., veneer sequences) are unique, typically quantity-one items. **BOM and purchase these on the manufacturing job** as always — there is no need to manage inventory demand for them.

### Large Projects Not BOM'd in FE

Some projects have hundreds of small manufacturing jobs that cannot be broken out in time for the takeoff process (e.g., Jocelyn-type projects). In these cases:
- Takeoff is done **offline in Excel**.
- Quantities are added directly to the INV job and purchased.
- Manufacturing jobs are not BOM'd until PE, when final nesting is complete.

---

## INV Job vs TRA Job

The INV job and the [TRA (Material Transmittal Log)](/workflows/fabrication-engineer/material-transmittal.html) job serve different purposes: [^transcript-inventory-job-launch]

| | INV Job | TRA Job |
|---|---|---|
| **Level** | Actual Epicor **part numbers** | High-level **material/finish specifications** (tags) |
| **Example** | GM.SG.01234 (3/4" fire-rated plywood, 4×8) | PLY01 (Rift White Oak plywood) |
| **Granularity** | Specific dimensions, thickness, sheet size | Specification only — no part numbers |
| **Managed by** | Lead Engineer / PM | PM |

The part numbers on the INV job must **satisfy the specifications** on the TRA. When populating the INV job, verify that your part selections match what's been specified and approved on the TRA.

---

## How do I read the Takeoff Audit Report?
{: #how-to-read-takeoff-audit}

Open **CW Takeoff Audit Report** in Epicor → enter the project number. The report shows one row per part on the INV job: [^transcript-inventory-job-launch]

| Column | What It Shows |
|--------|--------------|
| **Takeoff BOM Qty** | Current quantity BOM'd on the INV job (decreases as parts are issued to mfg jobs) |
| **Open PO** | Quantity on open purchase orders for this project |
| **Takeoff Issued Qty** | Quantity received and currently issued to the INV job (on the "shelf") |
| **Not Ordered** | Takeoff BOM Qty − Open PO − Takeoff Issued Qty |
| **Live Demand** | Sum of all **unreleased** manufacturing job BOMs for this part under this project |
| **Total Received** | Total quantity received to the INV job to date |
| **Mfg Job Issued to WIP** | Quantity already issued to released manufacturing jobs (on the floor) |
| **Supply Balance** | (Open PO + Takeoff Issued Qty) − Live Demand |

**Reading the Supply Balance:**
- **Positive** — you have enough supply to cover outstanding manufacturing demand
- **Zero** — exactly covered, no margin
- **Negative** — you are short. More material needs to be purchased, or demand needs to be reviewed

**Tip:** If you entered takeoff quantities properly on manufacturing jobs, the Live Demand column gives you an accurate picture of consumption. Even if you did takeoffs offline in Excel, you can compare the report numbers against your spreadsheet — but the report won't show you a supply shortfall unless the demand is in the system.

---

## Engineering Complete on Manufacturing Jobs

The BPM blocks Ready to Purchase and Purchase Direct on manufacturing jobs for INV-class materials. However, **Engineering Complete** is still useful on manufacturing job BOM lines — it signals to the person managing the INV job that you've finished your takeoff work for that job. Consider checking it when your takeoff quantities are finalized, even though it won't trigger a purchase. [^transcript-inventory-job-launch]

---

## See Also

- [Purchasing Signal Chain](/onboarding/purchasing-signal-chain.html) — The four gates for non-INV purchasing
- [Takeoffs](/workflows/fabrication-engineer/takeoffs.html) — Auto-BOM, 1D/2D nesting
- [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html) — Creating and validating BOMs
- [Part Management](/tools/epicor/part-management.html) — Creating and finding part numbers

## Footnotes

[^transcript-inventory-job-launch]: Source: Training Video — "Inventory Job Process Launch" (recording from 2024-04-18)
[^sop-inventory-jobs]: Source: Project Inventory Jobs SOP (PM training document)
