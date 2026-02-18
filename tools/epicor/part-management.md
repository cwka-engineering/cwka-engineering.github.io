---
layout: default
title: Part Management
permalink: /tools/epicor/part-management.html
nav_order: 3
parent: Epicor Usage
grand_parent: Tools
---

# Part Management

> **Related**: [Job Management](/tools/epicor/job-management.html) | [Dashboards](/tools/epicor/dashboards.html)

## Part Creation

Use the **Part** dashboard. [^transcript-epicor-parts]

1. Search for next available part number.
2. Use naming conventions:
   - **GM**: General Material (standard catalog items)
   - **Custom**: Custom project-specific parts
   - **WC**: Wood Component parts
3. Consult with EA if unsure.

**Required Fields**: Part Number, Description, UOM, Group, Class, Search.

**Editing Rules**:
- Part numbers are **permanent** once created.
- Descriptions editable only if not BOM'd.

## Site Synchronization

[^transcript-epicor-parts]

- **GM (General Materials)**: Created in Colorado database first, then synced to Digifab (nightly, up to 24-hour lag).
- **Project-Specific Materials**: Only exist in the site where created (not synced).
- **Best Practice**: Always use the Colorado version of "Part Entry and Update" for catalog management.

## Permissions

[^transcript-epicor-jobs]

- **GM Materials**: Request through designated person (Jack).
- **Job/Project-Specific**: Engineers create directly.
- **WC and MT Parts**: Engineers create and BOM directly.
- **Custom Parts**: Request operations assignment after creation.

## Additional Dashboards

- **Time Phase Inquiry**: Shows demand tracking (which jobs use a material).
- **Part Transaction History**: Shows inventory history.
- **Cycle Count**: Shows current on-hand quantities.

## Footnotes
[^transcript-epicor-parts]: Source: Training Video Transcript - "Epicor Parts"
[^transcript-epicor-jobs]: Source: Training Video Transcript - "Epicor Jobs & Production Report"
