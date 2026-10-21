---
layout: default
title: Layout Structure
permalink: /standards/rhino-drafting/layout-structure.html
nav_order: 1
parent: Rhino Drafting
grand_parent: Standards
corpus_tags: [fe-submittal]
---

# Layout Structure & Page Content

> **Related**: [Printing](/standards/rhino-drafting/printing.html) | [Rhino Drafting Overview](/standards/rhino-drafting/)

## Sheet size and template
{: #sheet-size-and-template}

- **Standard**: Engineering uses a **single Tabloid** layout template for **all** projects. Use the current FE template from the team location (see [Getting Started](/workflows/fabrication-engineer/getting-started.html#template-usage)).[^transcript-rhino8-kickoff-i]
- **Other sizes**: Non-standard sheet sizes are reserved for **unusual circumstances only**. The department does **not** maintain alternate templates for other sizes—if an exception is required, coordinate with template owners and project leadership.

## Page Numbering System

Layouts follow a "Hundred level page number" system:
- **Format**: `Project.Job.Hundred level page number`
- This system categorizes drawing types for consistency.

## Layout Management

[^transcript-layouts] In the layouts panel, you can:
- Move layouts via arrows or click and drag to reposition
- Right-click to duplicate, delete, or rename layouts
- Double-click to rename
- **Note**: When using the toolkit, layouts generate in standard numerical order (100s, 200s, 300s, 400s, etc.)

## Standard Page Types

### XXXX.C00: Cover
- The logo page (digifabshop | CWKA logo on a blank tabloid page); no text and no title block
- Comes first in the set, ahead of T00

### XXXX.T00: Title Sheet
- Project front page: project name and description lines, address, issue date, client, architect
- **Project index**: every job under the project, with this submittal's job(s) in bold and underlined (a grouped submittal marks each of its jobs). It indexes the project's jobs; the drawing set's own table of contents is the Item Drawings table on G00
- May include a project photo or isometric view of the item (becoming standard practice)
- The three description lines under the project name, the address and the architect are typed fields; the rest comes from Epicor. Populated via [Drafting Toolkit → Project tab](/workflows/fabrication-engineer/toolkit/drafting.html#how-to-populate-t00)

### XXXX.G00: General Requirements
- Five tables: **Item Drawings** (the set's table of contents), **General Material Tags**, **Finish Tags**, **Veneer and Solid Wood Tags**, and the **Bill of Materials** (hardware appears there by `GM.HW.#####` part number; there is no hardware tag table)
- Tag tables are transmittal-driven; the BOM comes from the job's BOM in Epicor
- Populated via [Drafting Toolkit → Schedules tab](/workflows/fabrication-engineer/toolkit/drafting.html#how-to-populate-g00) pulling from the Material Transmittal Log
- See also [Cover Sheet & Common Pages](/standards/rhino-drafting/cover-sheet-common-pages.html)

### XXXX.XXX.1XX: Reference Plans
Includes: [^transcript-layouts]
- Overall floor plans
- Enlarged plans
- Key plans for site context
- VIF (Verify in Field) plans — use the **VIF** annotation style (see [Annotation Styles Reference](/standards/rhino-drafting/annotation-styles-reference.html))
- **Note**: For freestanding items without site context, 100-level pages may not be needed. Can import site plans via work session for larger projects.

### XXXX.XXX.2XX: Shop Drawings
For client submission. Typically includes: [^transcript-layouts]
- Isometric views (often first page for freestanding items, or elevation for large interior wall paneling)
- Plans
- Elevations
- Sections (using [Clipping Planes](/standards/rhino-drafting/sections-clipping.html))
- Details (using [Detail Views](/standards/rhino-drafting/details.html))
- **Note**: Pre-populated detail views are included in templates.

### XXXX.XXX.3XX: Install & Shipping Drawings
For install team. Includes: [^transcript-layouts]
- Shipping Components list (usually first 300-level page) — generated from [SC export](/workflows/fabrication-engineer/shipping-components.html#how-to-export-sc-list)
- Installation supplements
- Z-clip locations
- Install sequence drawings

**Named Positions**: [^transcript-layouts]
- Used for detailed freestanding fixtures to generate exploded isometrics without bloating file.
- Time-stamp location of parts in Rhino space.
- Toggle between assembled and exploded positions.
- See [Modeling Techniques — Named Positions](/standards/layer-organization/modeling-techniques.html#how-to-setup-named-positions) for setup.
- **Note**: Must print all assembled first, then all exploded (can't mix on same page).

### XXXX.XXX.4XX: Fabrication Supplements
For shop team (internal use). Includes: [^transcript-layouts]
- Layups (see [Lay-Up Formulas](/reference/reference-tables/lay-up-formulas.html))
- Veneer Sequence
- Glue-up Jig
- Bucks (jigs/fixtures)
- **Numbering**: First drawing = 400, then 401, etc. Drawing number = WC/MT/IP code.
- See also [Cover Sheet & Common Pages](/standards/rhino-drafting/cover-sheet-common-pages.html) for additional page type details.

### XXXX.XXX.SKXX: Sketches
- For quick feedback or pre-submittal sets
- Not part of formal submission set
- Useful for early PA/PM coordination

### XXXX.S000 and XXXX.L000
- **S000** (Nested Sheets) and **L000** (Master Parts List) are in the template and use the larger title-block layout rather than the standard one. L000 is still present but underused.

## Schedules

- Required for WC and MT jobs
- Use toolkit or custom Grasshopper scripts if toolkit fails
- Should include part name, type, and topology

## Next Steps
- Learn about [Creating Details](/standards/rhino-drafting/details.html)
- Review [Printing Considerations](/standards/rhino-drafting/printing.html)

## Footnotes
[^transcript-layouts]: Source: [Training Video — "Layouts, Details, and Annotations"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQDCib7picOsRbne5WY5zqqKAYZVduR5IUrhgLRcL2a8y5o?e=GD3AVG)
[^transcript-rhino8-kickoff-i]: Source: [Training Video — "Rhino 8 Kickoff Pt I"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQClvTAp_DlXSImI44GZjhPoAUjkAO2ROrfgSxu2Sy_oyQc?e=vWqkSZ)
