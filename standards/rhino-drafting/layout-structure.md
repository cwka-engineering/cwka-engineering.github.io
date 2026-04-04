---
layout: default
title: Layout Structure
permalink: /standards/rhino-drafting/layout-structure.html
nav_order: 1
parent: Rhino Drafting
grand_parent: Standards
---

# Layout Structure & Page Content

> **Related**: [Printing](/standards/rhino-drafting/printing.html) | [Rhino Drafting Overview](/standards/rhino-drafting/)

## Sheet size and template
{: #sheet-size-and-template}

- **Standard**: Engineering uses a **single Tabloid** layout template for **all** projects. Use the current FE template from the team location (see [Getting Started](/workflows/fabrication-engineer/getting-started.html#template-usage)).
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

### XXXX.T00: Title Sheet
- Project cover page with project index (table of contents for the drawing set)
- May include a project photo (becoming standard practice)
- Metadata fields populated via [Drafting Toolkit → Project tab](/workflows/fabrication-engineer/toolkit/drafting.html#how-to-populate-t00)

### XXXX.G00: General Requirements
- Material schedule (finish tags, general materials, veneer/wood, hardware)
- BOM summary or transmittal-driven data
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
- BOM (Bill of Materials) — can be published via [Drafting Toolkit BOM workflow](/workflows/fabrication-engineer/toolkit/drafting.html#how-to-publish-bom-to-l001)
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
- Layups (see [Lay-Up Formulas](/standards/reference-tables/lay-up-formulas.html))
- Veneer Sequence
- Glue-up Jig
- Bucks (jigs/fixtures)
- **Numbering**: First drawing = 400, then 401, etc. Drawing number = WC/MT/IP code.
- See also [Cover Sheet & Common Pages](/standards/rhino-drafting/cover-sheet-common-pages.html) for additional page type details.

### XXXX.XXX.SKXX: Sketches
- For quick feedback or pre-submittal sets
- Not part of formal submission set
- Useful for early PA/PM coordination

## Schedules

- Required for WC and MT jobs
- Use toolkit or custom Grasshopper scripts if toolkit fails
- Should include part name, type, and topology

## Next Steps
- Learn about [Creating Details](/standards/rhino-drafting/details.html)
- Review [Printing Considerations](/standards/rhino-drafting/printing.html)

## Footnotes
[^transcript-layouts]: Source: Training Video Transcript - "Layouts, Details, and Annotations"
