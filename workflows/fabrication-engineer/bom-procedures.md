---
layout: default
title: BOM Procedures & Validation
permalink: /workflows/fabrication-engineer/bom-procedures.html
parent: Fabrication Engineer (FE)
grand_parent: Workflows
nav_order: 13
---

# BOM Procedures & Validation

Procedures for creating, validating, and managing Bills of Materials in Epicor.

> **Related Documents**: [Takeoffs](/workflows/fabrication-engineer/takeoffs.html) | [Material Transmittal Log](/workflows/fabrication-engineer/material-transmittal.html) | [Job Management](/tools/epicor/job-management.html) | [Material Tag Vocabulary](/reference/reference-tables/material-tag-vocabulary.html)

## BOM Template

A BOM Template is available on Box (Engineering Resources) with the standard column structure:

| Column | Description |
|--------|-------------|
| DWG Tag | Material tag from drawings (e.g., PLY01) |
| Arch Tag | Architect's designation for same material |
| Epicor Part Number | GM.XX.XXXXX format |
| Part Description | Material description |
| UOM | Unit of measure |
| Scrap% | Scrap allowance (see below) |

Separate sheets are provided for materials and finishes.

## Creating a Part in Epicor
{: #how-to-create-epicor-part}

For project-specific materials and manufactured parts:

1. Open the **Part Entry** dashboard in Epicor.
2. Set the part number, description, UOM, and class following naming conventions (see [File Naming Conventions](/reference/reference-tables/file-naming-conventions.html)).
3. For WC/MT parts, use the project-specific format (`PROJ.WC.00000` or `PROJ.MT.00000`).

Every BOM line must tie to a row in Epicor Parts — no part-on-the-fly entries. Allow **24 hours** for server sync.

## Requesting a Global Material Part
{: #how-to-request-global-part}

Post the request in the dedicated **Part Requests** Teams channel. The EA or designated staff creates it. Allow 24-hour sync.

## BOM'ing a Material to a Job
{: #how-to-bom-material}

1. Open **Job Entry** in Epicor → select your job → **BOM tab**.
2. Add the material from Parts master.
3. Set the **quantity** from your takeoff.
4. Assign the correct **Rel Opr.** (Related Operation).
5. Verify **Fixed QTY** is checked (except CMG jobs). See [Production Quantity & Fixed Qty](/tools/epicor/production-quantity.html).
6. Append job-specific comments to the part description as needed.
7. **Inform the PM** when BOM'ing new materials so they can update the TRA.

> **INV-class materials (SG, SS, SL, IM):** Do **not** check Ready to Purchase or Purchase Direct on the manufacturing job for these classes. They are purchased through the project's [Inventory Job](/tools/epicor/inventory-jobs.html). A BPM will block Purchase Direct if you try.

## BOM Quantities, Process Waste & Overage

BOM the **minimum amount of material actually required** to execute the build strategy — not the net finished-part volume, and not an inflated quantity that includes a buffer for quality risk or attic stock. See [Overage, Extras & Process Waste](/workflows/fabrication-engineer/overage-and-extras.html) for full guidance and examples.

Do not add bulk overage to BOM quantities. Overage is a PM/Purchasing decision applied at the project level on the INV job.

### Scrap Percentages

Scrap percentages applied during Auto-BOM are an approximation of **process waste** — material lost to cuts, kerfs, and nesting — and are appropriate to include. These are distinct from overage.

- **Linear materials** (edgebanding, trim): ~15%
- **Area materials** (sheet goods): ~20%

Adjust based on project specifics and nesting results.

## Verifying Your BOM
{: #how-to-verify-bom}

Cross-check your BOM against the Rhino model before release:

- **Every material tag in the Rhino model** must appear on the Epicor BOM
- **Every BOM line** must tie to a valid Epicor Parts master entry
- Each material must be assigned to the correct **Rel Opr.**
- Takeoff quantities follow company standards
- No bulk overage beyond takeoff amounts

## Exporting BOM for Epicor
{: #how-to-export-bom-for-epicor}

Use the Modeling Toolkit → Takeoffs → **Export**. This generates an Excel file formatted for direct paste into Epicor BOM.

## Post-Release BOM Changes
{: #how-to-handle-post-release-changes}

When materials are added to the BOM after initial release:
- Flag changes with the **"Added Mtl"** checkbox per Epicor practice
- This distinguishes original BOM lines from additions for tracking purposes
