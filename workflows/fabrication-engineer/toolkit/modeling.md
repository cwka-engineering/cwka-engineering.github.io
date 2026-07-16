---
layout: default
title: Modeling Toolkit
permalink: /workflows/fabrication-engineer/toolkit/modeling.html
nav_order: 2
parent: Engineering Toolkit (Setup)
grand_parent: Fabrication Engineer (FE)
corpus_tags: [fe-release, fe-submittal]
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

Modeling Toolkit → Hardware section. Search by Epicor part number. The embedded block is auto-placed on the correct layer with correct naming.[^transcript-blocks]

**First use of a new hardware item**: verify the block's center-to-center and other critical dimensions against the physical part before machining at scale. Don't trust the cut sheet or block geometry blind — a bad dimension caught on one part is cheap; the same error propagated across a full production run is not.

## How do I create a higher-order hardware assembly block?
{: #how-to-create-assembly-block}

Nest individual hardware blocks within a macro-level block (e.g., "AZ Clip Assembly Double"). Place whole assemblies rather than individual pieces for complex hardware groupings.[^transcript-blocks]

## How do I model a pre-laminated (PRE) lay-up?
{: #how-to-model-pre-layup}

1. Calculate thickness using the lay-up formula (face + core + backer). See [Lay-Up Formulas](/reference/reference-tables/lay-up-formulas.html).
2. Create a layer named with the PRE code: `PRE_[face]_[core]_[backer]_[thickness mm]`.
3. Model the part at the calculated thickness.

## How do I search for a part by description or specification?
{: #how-to-reverse-lookup}

Modeling Toolkit → **Reverse Lookup** tab. The search works in three steps:

1. **Select a Class** — choose the material class (Sheet Goods, Solid Lumber, Hardware, etc.)
2. **Select a Category** — choose a head category within that class (e.g. MDF within Sheet Goods)
3. **Enter a natural language search** — describe what you're looking for in plain terms. The search understands unit conversions and semantic context: searching "4 feet by 10 feet" will correctly interpret the units and return matching sheet sizes. Hit Enter to search.

The search returns a ranked list of matches with descriptions and part numbers. This uses the same AI backend as the [Part Requests workflow](/tools/releases-and-requests/part-requests.html) — it understands material vocabulary and can reason about specifications rather than just matching keywords.

**Internet connection required.** The initial results list is retrieved from Box (or Epicor directly as a fallback), and the AI search requires a live connection.

## How do I cache the Epicor parts database for offline use?
{: #how-to-cache-parts-database}

Modeling Toolkit → **Reverse Lookup**. Select each material class at least once to cache them locally. The cached list allows the class/category picker to populate without a connection, though the AI-assisted search itself still requires internet.

## Shared hardware library (McMaster-Carr)

- When you request hardware models through the **McMaster-Carr API** from the Modeling toolkit workflow, those models are **added automatically** to a **shared engineering hardware library** in the background—you do not need to maintain a separate folder structure by hand. [^transcript-rhino8-kickoff-ii]
- Continue to use **blocks** for hardware in models per release and naming standards ([FE to PE Release](/workflows/fe-to-pe-release.html), [Takeoffs](/workflows/fabrication-engineer/takeoffs.html)); the library helps keep everyone on consistent geometry over time.

## Parts List Tab

### L000 - Master Parts List
- **Purpose**: [^transcript-adv-toolkit] Standardized format for parts schedules within drawing sets. This is a targeted parts list (e.g., for metal shop) - not the comprehensive master parts list Excel that PE creates. Use when you need a parts schedule in the drawing set in addition to Excel. Still present in the template, though underused.

### L001 - Pick List (Deprecated)
- **Deprecated**: Removed from the general Rhino tabloid template.
- **Purpose** (historical): [^transcript-adv-toolkit] Backend model space page for BOM information while working on scope. Not typically printed for external audience - primarily for FE engineer's use during design. Facilitated takeoffs and BOM tracking.

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
[^transcript-adv-toolkit]: Source: [Training Video — "Adv. Toolkit Functions"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQCALi3cuUMuSLsJ6G-5Rn4TAYr-NLZorJ-lfNYPkyrSaOA?e=AJEJ4d)
[^transcript-integration-2026]: Department practice as of wiki integration (2026); confirm UI labels in the current Modeling tab.
[^transcript-rhino8-kickoff-ii]: Source: [Training Video — "Rhino 8 Kickoff Pt II"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQDPcGdpPFE7R4qYb8JE-0pEAWP7lZ3x3-mehH6F1qiQJVg?e=VaMdtA)
[^transcript-blocks]: Source: [Training Video — "Blocks"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQB6m1C6NVjESosK0IY1J9KqASuqa3wKbrNgKD7bu8S-_HM?e=SYCulO)
