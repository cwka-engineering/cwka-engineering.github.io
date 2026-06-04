---
layout: default
title: Material Transmittal Log (TRA)
permalink: /workflows/fabrication-engineer/material-transmittal.html
parent: Fabrication Engineer (FE)
grand_parent: Workflows
nav_order: 13
corpus_tags: [fe-submittal]
---

# Material Transmittal Log (TRA)

How the Material Transmittal Log works and how engineers interact with it.

> **Related Documents**: [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html) | [Glossary — Epicor Terms](/reference/glossary.html#epicor-terms) | [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html) | [Inventory Jobs (INV)](/tools/epicor/inventory-jobs.html)

## What is the TRA?

The Material Transmittal Log is an Epicor dashboard (CW Material Transmittal Log — Kinetic) that tracks the submittal status of all materials, finishes, and hardware on a project. The PM maintains it.

Each project has a **TRA job** (format: `ProjectNumber.TRA`, e.g., `1086.TRA`) created at project outset by the planning team.

## TRA Structure

The TRA job has **four subassemblies**:

| # | Subassembly | Content |
|---|-------------|---------|
| 1 | Finish Tags | All finishes (paint, powder coat, lacquer, stain, etc.) |
| 2 | Veneer and Solid Wood Tags | Wood veneers and solid wood materials |
| 3 | General Material Tags | Sheet goods, glass, solid surface, metal, etc. |
| 4 | Hardware Tags | All hardware items |

Each material/finish/hardware item is entered as a material (quantity set to zero) to the appropriate subassembly. Fields include: Part (tag name), Description, ARCH Tag, Mtl Submittal Status, Mtl Submittal Comments, and Transmittal Number.

**First entry rule:** The first entry must always be a Finish Tag — even if there is no finish to submit, use `FN00 "Raw"` or `FN00 "Not Used"`.

## Material Submittal Status & Transmittal Numbers

> **Two separate tracking systems.** The TRA tracks the approval status of individual **materials and finishes** submitted to the architect. Drawing **package** submittal status (the shop drawing set as a whole) is tracked separately in the [Production Report](/tools/epicor/production-report.html) and visible on the [Submittal Dashboard](/tools/epicor/dashboards.html#submittal-dashboard). These are distinct fields with overlapping vocabulary — do not conflate them.

### Material Status Values
{: #status-vocabulary}

Each TRA entry carries a **MtlSubmittalStatus** field maintained by the PM. The recognized values are:

| Status | Meaning |
|--------|---------|
| **Submitted** | Package has been sent to the architect/GC for review |
| **Approved** | Architect has approved the material |
| **Rejected** | Architect rejected the submittal; resubmission required |
| **Internal** | Material has a TRA tag but was not submitted — not required by this project's spec, used at PM's discretion |
| **Not Submitted** | Avoid — use **Internal** instead (see below) |

> **Use "Internal," not "Not Submitted."** Both mean the material wasn't submitted, but "Not Submitted" looks like an open item when you audit the log later. "Internal" communicates a deliberate decision. Entries left as "Not Submitted" create confusion: were these forgotten, or intentional?

### Material Transmittal Number Format
{: #transmittal-number-format}

When a material is submitted, the PM records the transmittal number in the TRA in the format:

```
T [###].[##]
```

- **`T [###]`** — Sequential transmittal package number for the project, zero-padded to three digits (e.g., `T 005`, `T 017`). The PM increments this each time a new package is submitted to the architect.
- **`.[##]`** — Revision number for that material line within the package, zero-padded to two digits. Starts at `.01`.

**Example:** `T 011.02` = 11th transmittal package sent on this project; second revision of this material (the first submission was rejected and has been resubmitted under the same package number as `.02`).

A rejected material is resubmitted under the **same package number** with an incremented revision, so the audit trail stays together: `T 005.01` (original) → `T 005.02` (resubmit after rejection).

### What Flows to the Cover Sheet

MtlSubmittalStatus and transmittal numbers are **internal PM tracking only** — they do not appear on the G00 cover sheet page. What the G00 script pulls from the TRA is:

- Material/finish tag
- ARCH tag
- Description
- Sheen (where applicable)
- FSC, fire rating, moisture resistance (PM-managed fields)

The approval status visible on the cover sheet is only what the engineer sees after the PM has updated those fields and the G00 script is re-run.

---

## Engineer's Role

### When You BOM a Material

1. You add the material to the Epicor BOM via Job Entry.
2. **Notify the PM.** The PM — not the engineer — adds the material to the TRA with its tag, ARCH tag, description, and approval properties. Engineers do not create TRA entries directly. If a material you're BOM'ing doesn't have a TRA entry yet, it won't appear on your G00 page. Contact the PM so they can add it; do not proceed assuming the tag will appear on its own.
3. The PM updates MtlSubmittalStatus as the material goes through client review.
4. When you publish G00 via the toolkit, the material schedule is pulled from the TRA.
5. Once your BOM quantities are finalized, check **Engineering Complete** on the BOM line. This signals to the PM that your quantities are final and the line is ready for purchasing. **Do not check Engineering Complete if the quantity is still a placeholder** — checking it prematurely tells the PM the BOM is done when it isn't.
6. The PM marks "Ready to Purchase" once Engineering Complete is set and the material is approved. Purchasing then orders the material.

**Note:** For INV-class materials (SG, SS, SL, IM), purchasing is handled through the project's [Inventory Job](/tools/epicor/inventory-jobs.html), not via the manufacturing job.

### Before Running the G00 Script
{: #tra-sync-before-g00}

Before running the cover sheet script in the Drafting Toolkit, **confirm with the PM that the TRA is current.** The PM actively manages the TRA and may be a step behind during active submittal prep — approval statuses change and new entries may be pending.

If you run the G00 script against a stale TRA, the material schedule on your drawings will not reflect current approvals. You will need to re-run the script and republish after the PM catches up. A one-minute check beforehand saves the extra cycle.

See [How to populate G00](/workflows/fabrication-engineer/toolkit/drafting.html#how-to-populate-g00) for the full script procedure.

### Hardware Tags

Hardware is tracked in the TRA (Hardware subassembly) for PM use — to manage submittal status and coordinate approvals with the architect. However, **hardware TRA tags do not appear on shop drawings.** What appears on drawings is the GMHW BOM page — the list of `GMHW` part numbers as BOM'd to the job. The BOM page is the hardware schedule for the drawing reviewer; TRA hardware tags are internal PM tracking only.

Your responsibility as an engineer is to ensure your hardware BOMs are accurate and complete. You do not reference TRA hardware tags on the drawing itself.

## G00 Connection

When you publish the G00 General Requirements page via the [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html), the toolkit pulls material tag data from the project's TRA job. The G00 page displays:
- CWK material tag
- ARCH tag (architect's designation)
- Material description
- FSC certification, fire rating, moisture resistance (PM-managed fields)

## Batch Editing via Excel
{: #how-to-batch-edit-tra}

The PM can batch-edit the TRA via Excel export/import:

1. Export a section from the TRA dashboard.
2. Edit or add rows in Excel (ensure all required fields are filled).
3. Copy the table body (**no headers**).
4. Return to Epicor and **Paste Update**.
5. Click **Update** to save.
6. Save the export to Box at `02 PM/05_Material_Finish_Log/`.

## Material Classes Purchased via Inventory Job

Certain material classes do **not** purchase direct to the manufacturing job. Instead, they are purchased through the project's **[Inventory Job](/tools/epicor/inventory-jobs.html)** (`ProjectNumber.INV`):
- **SG** (Sheet Goods)
- **SS** (Solid Surface)
- **SL** (Solid Lumber)
- **IM** (Inventory Metal)

A BPM in Epicor blocks Purchase Direct on manufacturing jobs for these classes. The INV job consolidates demand and purchasing for the project team — see [Inventory Jobs](/tools/epicor/inventory-jobs.html) for the full workflow.

**Min/Max stocked items** use their own Epicor replenishment process and do not go through the INV job.
