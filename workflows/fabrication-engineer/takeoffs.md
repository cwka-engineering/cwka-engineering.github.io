---
layout: default
title: Takeoffs
permalink: /workflows/fabrication-engineer/takeoffs.html
nav_order: 8
parent: Fabrication Engineer (FE)
grand_parent: Workflows
corpus_tags: [fe-release, fe-submittal]
---

# Takeoffs

> **Related**: [Part Naming](/workflows/fabrication-engineer/part-naming.html) | [Engineering Toolkit](/workflows/fabrication-engineer/toolkit/)

## How do I run Auto-BOM to generate a first-pass takeoff?
{: #how-to-run-auto-bom}

Modeling Toolkit → **Auto-BOM** tab. All parts must be toolkit-named, all six material classes cached (via Reverse Lookup), and all materials must have fully qualified Epicor dimension fields. Click **Run** to generate the BOM approximation. Apply scrap percentages, review the preview table, then publish to L001 or export to Excel.

## How do I use 1D nesting to refine linear material takeoffs?
{: #how-to-1d-nesting}

Modeling Toolkit → **1D Nesting**. Select a material bombed per length (fabric, WC parts), select the job, choose stick length (8 ft default — coordinate with purchasing for actual length). View optimization with waste per stick shown in red. Export cut list or text optimization for the purchaser.

## How do I use 2D nesting to refine sheet good takeoffs?
{: #how-to-2d-nesting}

Modeling Toolkit → **2D Nesting**. Select the sheet material (width/length pre-populated from Epicor), select the job, run optimization. Compare actual nested sheet count against Auto-BOM's area estimate. Publish refined quantities back to the BOM.

## Auto-BOM

- **Purpose**: [^transcript-adv-toolkit] Provides first-pass BOM approximation based on model geometry. **Not guaranteed to be correct** - it's a starting point for refinement.
- **How It Works**: [^transcript-adv-toolkit] Contacts Epicor to find dimension-specific fields, then does first-order rough takeoff based on lengths and widths recorded in each part during naming.
- **Output Location**: [^transcript-adv-toolkit] Published changes go to L001 page (pick list) user text. Can export to Excel file (formatted for paste-insert directly into Epicor BOM).

## Conditions for Takeoffs

**All of the following must be met to use Auto-BOM**: [^transcript-adv-toolkit]

- All model parts must have been named using the Generate Names Toolkit tab (not manually named)
- All material cache classes must be cached on the Reverse Lookup Toolkit tab (all six classes)
- All materials in use must have fully qualified Epicor dimension fields (not just descriptions - must have dimension-specific fields like "48 inches", "3/4 inch thick")
- All hardware block names must begin with Epicor or material code (if you use script to embed definitions, they will)
- All layer paths must conform to FE template standards (if you use toolkit to create material codes, they will)

## Scrap Percentage

- **Purpose**: [^transcript-adv-toolkit] Apply scrap rates to account for material waste since Auto-BOM is only a first approximation.
- **Usage**: [^transcript-adv-toolkit] Can set different scrap percentages for different material types:
  - Linear footage materials (e.g., 15% scrap)
  - Area-based materials (e.g., 20% scrap)
- **Result**: Updates BOM numbers in the preview table. Review before publishing.

## Export

- Export BOM to Excel for Epicor (formatted for paste-insert).

## 1D Nesting

- **Purpose**: [^transcript-adv-toolkit] Refine takeoff for materials bombed per length (e.g., fabric, WC parts). Shows optimization of parts within stick lengths.
- **Workflow**: [^transcript-adv-toolkit]
  1. Select material that is bombed per length
  2. Select job
  3. Choose stick length (default 8 feet, can try 10, 12, etc.)
  4. Show optimization - displays parts placed within sticks with waste per stick shown in red
  5. View overall waste percentage
- **Considerations**: [^transcript-adv-toolkit] Stick length selection must be done in coordination with purchasing and shop — FE is not ultimately the person who selects stick length. This tool provides information to give to the purchaser (e.g., the wood buyer for wood, the metals coordinator for metal).
- **Export Options**: [^transcript-adv-toolkit]
  - Cut list of specific lengths (quantity of each cut length with part numbers)
  - Text representation of optimization (stick-by-stick cutting sequence for best yield)
- **Note**: [^transcript-adv-toolkit] Optimized cut lists may not match how shop actually functions (shop often cuts all same length at once for labor efficiency). Use when material value justifies the trade-off.

## 2D Nesting

- **Purpose**: [^transcript-adv-toolkit] Refine takeoff for sheet goods. Shows optimization of parts within sheets.
- **Workflow**: [^transcript-adv-toolkit]
  1. Select material (width and length pre-populated from Epicor)
  2. Select job
  3. Show optimization - displays graphic representation of waste per sheet and overall waste
- **Refinement**: [^transcript-adv-toolkit] Auto-BOM may estimate 4.75 sheets based on area, but 2D nesting shows actual waste and may reveal you need 7 sheets minimum. This refines the BOM quantities.
- **Integration**: [^transcript-adv-toolkit] After refinement, Auto-BOM will indicate which rows have been refined. Publish changes to update BOM with refined quantities.

## Takeoff Quantities and the Inventory Job

For **SG, SS, SL, and IM** materials, takeoff quantities are entered on manufacturing jobs for demand visibility, but **purchasing happens through the project's [Inventory Job](/tools/epicor/inventory-jobs.html)** (`ProjectNumber.INV`). Do **not** check Ready to Purchase or Purchase Direct on the manufacturing job for these classes — a BPM will block it.

After completing your takeoffs, the Lead Engineer or PM sums the manufacturing job demand, adds waste factor, and purchases from the INV job. See [Inventory Jobs](/tools/epicor/inventory-jobs.html) for the full workflow and the [Takeoff Audit Report](/tools/epicor/inventory-jobs.html#how-to-read-takeoff-audit) for monitoring supply vs. demand.

## Next Steps

- Continue to [FE to PE Release](/workflows/fe-to-pe-release.html) when ready to release
- Or return to [Part Naming](/workflows/fabrication-engineer/part-naming.html) if you need to adjust names

## See Also

- [Epicor Usage](/tools/epicor/) - BOM management in Epicor

## Footnotes

[^transcript-adv-toolkit]: Source: [Training Video — "Adv. Toolkit Functions"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQCALi3cuUMuSLsJ6G-5Rn4TAYr-NLZorJ-lfNYPkyrSaOA?e=AJEJ4d)
