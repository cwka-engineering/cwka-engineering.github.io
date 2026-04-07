---
layout: default
title: Material Transmittal Log (TRA)
permalink: /workflows/fabrication-engineer/material-transmittal.html
parent: Fabrication Engineer (FE)
grand_parent: Workflows
nav_order: 11
---

# Material Transmittal Log (TRA)

How the Material Transmittal Log works and how engineers interact with it.

> **Related Documents**: [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html) | [Glossary — Epicor Terms](/overview/glossary.html#epicor-terms) | [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html) | [Inventory Jobs (INV)](/tools/epicor/inventory-jobs.html)

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

## Engineer's Role

### When You BOM a Material

1. You add the material to the Epicor BOM via Job Entry.
2. The PM receives an alert to add it to the TRA with its tag, ARCH tag, description, and approval properties.
3. The PM updates MtlSubmittalStatus as the material goes through client review.
4. When you publish G00 via the toolkit, the material schedule is pulled from the TRA.
5. After approval + Engineering Complete, the PM signals "Ready to Purchase." Purchasing orders the material. **Note:** For INV-class materials (SG, SS, SL, IM), purchasing is handled through the project's [Inventory Job](/tools/epicor/inventory-jobs.html), not via the manufacturing job.

**If you BOM something that doesn't exist in the TRA yet, it won't appear on your G00 page.** Always inform the PM when BOM'ing a new material.

### Hardware Tags

Hardware tags on shop drawings are maintained **directly by engineers** (not pulled from the TRA) and should match the final BOM'd product.

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
