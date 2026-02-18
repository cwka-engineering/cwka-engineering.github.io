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
- Includes project index

### XXXX.G00: General Requirements
- Schedules (material tags, bill of materials)

### XXXX.XXX.1XX: Reference Plans
Includes: [^transcript-layouts]
- Overall floor plans
- Enlarged plans
- Key plans for site context
- VIF (Verify in Field) plans
- **Note**: For freestanding items without site context, 100-level pages may not be needed. Can import site plans via work session for larger projects.

### XXXX.XXX.2XX: Shop Drawings
For client submission. Typically includes: [^transcript-layouts]
- Isometric views (often first page for freestanding items, or elevation for large interior wall paneling)
- BOM (Bill of Materials)
- Plans
- Elevations
- Sections
- Details
- **Note**: Pre-populated detail views are included in templates.

### XXXX.XXX.3XX: Install & Shipping Drawings
For install team. Includes: [^transcript-layouts]
- Shipping Components list (usually first 300-level page)
- Installation supplements
- Z-clip locations
- Install sequence drawings

**Name Positions**: [^transcript-layouts]
- Used for detailed freestanding fixtures to generate exploded isometrics without bloating file.
- Time-stamp location of parts in Rhino space.
- Toggle between assembled and exploded positions.
- **Note**: Must print all assembled first, then all exploded (can't mix on same page).

### XXXX.XXX.4XX: Fabrication Supplements
For shop team (internal use). Includes: [^transcript-layouts]
- Layups
- Veneer Sequence
- Glue-up Jig
- Bucks (jigs/fixtures)
- **Numbering**: First drawing = 400, then 401, etc. Drawing number = WC/MT/IP code.

### XXXX.XXX.SKXX: Sketches
- For quick feedback
- Not part of submission set

## Schedules

- Required for WC and MT jobs
- Use toolkit or custom Grasshopper scripts if toolkit fails
- Should include part name, type, and topology

## Next Steps
- Learn about [Creating Details](/standards/rhino-drafting/details.html)
- Review [Printing Considerations](/standards/rhino-drafting/printing.html)

## Footnotes
[^transcript-layouts]: Source: Training Video Transcript - "Layouts, Details, and Annotations"
