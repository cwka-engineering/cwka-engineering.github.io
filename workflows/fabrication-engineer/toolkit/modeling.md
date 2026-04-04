---
layout: default
title: Modeling Toolkit
permalink: /workflows/fabrication-engineer/toolkit/modeling.html
nav_order: 2
parent: Engineering Toolkit (Setup)
grand_parent: Fabrication Engineer (FE)
---

# Modeling Toolkit

> **Related**: [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html) | [Takeoffs](/workflows/fabrication-engineer/takeoffs.html)

## How do I look up an Epicor part and create the correct material layer?
{: #how-to-lookup-part}

Modeling Toolkit → **Part Lookup**. Type the part number and hit enter. The layer is auto-created with correct naming and section style under the appropriate FE::PUR subclass. For reverse lookup (when you don't know the part number), filter by class then narrow with search terms.

## How do I set up the layer structure for a new FE model?
{: #how-to-setup-layers}

Use the toolkit to restore model space from the template (Drafting Toolkit → Template tab → Restore Model Space). This pulls in the full layer structure: `01_PRECON`, `02_DE`, `03_FE` (CON, PUR, MFG), `04_PE`, `00_DWG`. Then use Part Lookup to create material-specific layers as needed.

## How do I handle placeholder layers when part numbers aren't known yet?
{: #how-to-handle-placeholders}

Use descriptive placeholder names (e.g., SG1, MDF2) under DE or FE layers. Update to Epicor part numbers via the toolkit Part Lookup when confirmed. Placeholder layers are not releasable — all must be resolved before PE release.

## How do I insert reference geometry from another file?
{: #how-to-insert-reference-geometry}

**Insert → Linked → Layer Style: Active**. Choose Block Instance for fixed reference geometry, or Individual Objects for editable parts. Toggle off rotation/scale/insertion point prompts to maintain coordinate system alignment.

## How do I insert hardware blocks from the library?
{: #how-to-insert-hardware}

Modeling Toolkit → Hardware section. Search by Epicor part number. The embedded block is auto-placed on the correct layer with correct naming.

## How do I create a higher-order hardware assembly block?
{: #how-to-create-assembly-block}

Nest individual hardware blocks within a macro-level block (e.g., "AZ Clip Assembly Double"). Place whole assemblies rather than individual pieces for complex hardware groupings.

## How do I model a pre-laminated (PRE) lay-up?
{: #how-to-model-pre-layup}

1. Calculate thickness using the lay-up formula (face + core + backer). See [Lay-Up Formulas](/standards/reference-tables/lay-up-formulas.html).
2. Create a layer named with the PRE code: `PRE_[face]_[core]_[backer]_[thickness mm]`.
3. Model the part at the calculated thickness.

## How do I cache the Epicor parts database for offline use?
{: #how-to-cache-parts-database}

Modeling Toolkit → **Reverse Lookup**. Select each of the six material classes at least once to cache them locally for offline use.

## Shared hardware library (McMaster-Carr)

- When you request hardware models through the **McMaster-Carr API** from the Modeling toolkit workflow, those models are **added automatically** to a **shared engineering hardware library** in the background—you do not need to maintain a separate folder structure by hand. [^transcript-integration-2026]
- Continue to use **blocks** for hardware in models per release and naming standards ([FE to PE Release](/workflows/fe-to-pe-release.html), [Takeoffs](/workflows/fabrication-engineer/takeoffs.html)); the library helps keep everyone on consistent geometry over time.

## Parts List Tab

### L00 - Master Parts List
- **Purpose**: [^transcript-adv-toolkit] Standardized format for parts schedules within drawing sets. This is a targeted parts list (e.g., for metal shop) - not the comprehensive master parts list Excel that PE creates. Use when you need a parts schedule in the drawing set in addition to Excel.

### L001 - Pick List
- **Purpose**: [^transcript-adv-toolkit] Backend model space page for BOM information while working on scope. Not typically printed for external audience - primarily for FE engineer's use during design. Facilitates takeoffs and BOM tracking.

### Analysis Functionality
- **Display**: [^transcript-adv-toolkit] Parts list tab reads out all attributes calculated during naming step and displays them on the page.
- **Manufactured Part Mode**: [^transcript-adv-toolkit] For manufactured parts (MT/WC), use Manufactured Part mode during naming to get additional analysis:
  - Cuts on left/right ends
  - Shape analysis
  - Diagrammatic view of length relative to other parts

### Export Options
- **Excel Export**: [^transcript-adv-toolkit] Can export master parts list directly to Excel (exports to same folder as Rhino file). PE can also use this feature to output master parts list Excel instead of printing on page.

## Next Steps

- Proceed to [Takeoffs](/workflows/fabrication-engineer/takeoffs.html) for BOM generation workflow.

## Footnotes
[^transcript-adv-toolkit]: Source: Training Video Transcript - "Adv. Toolkit Functions"
[^transcript-integration-2026]: Department practice as of wiki integration (2026); confirm UI labels in the current Modeling tab.
