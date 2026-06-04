---
layout: default
title: Part Management
permalink: /tools/epicor/part-management.html
nav_order: 3
parent: Epicor Usage
grand_parent: Tools
corpus_tags: [fe-release, fe-submittal]
---

# Part Management

> **Related**: [Job Management](/tools/epicor/job-management.html) | [Dashboards](/tools/epicor/dashboards.html) | [Part Requests — Engineer Guide](/tools/releases-and-requests/part-requests/engineer-guide.html)

## Part Creation

Who creates a part depends on its type — see [Permissions](#permissions) below. **GM (General Material) parts are not created directly by engineers**; they are requested through the [Part Requests workflow](/tools/releases-and-requests/part-requests/engineer-guide.html) and created by the scheduler. Engineers create project-specific, WC, and MT parts directly in the **Part** dashboard. [^transcript-epicor-parts]

When creating a part directly:

1. Search for the next available part number.
2. Use naming conventions:
   - **Custom**: Custom project-specific parts
   - **WC**: Wood Component parts
   - **MT**: Manufactured (metal) parts
3. Consult with the EA if unsure.

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

- **GM Materials**: Request via the [Part Requests workflow](/tools/releases-and-requests/part-requests/engineer-guide.html) — submit the form, review the catalog result in Teams, and reply ACCEPT or DECLINE. The scheduler creates the part if no match is found. Allow 24 hours for sync after creation.
- **Job/Project-Specific**: Engineers create directly.
- **WC and MT Parts**: Engineers create and BOM directly.
- **Custom Parts**: Request operations assignment after creation.

## Additional Dashboards

- **Time Phase Inquiry**: Shows demand tracking (which jobs use a material).
- **Part Transaction History**: Shows inventory history.
- **Cycle Count**: Shows current on-hand quantities.

## Footnotes
[^transcript-epicor-parts]: Source: [Training Video — "Epicor Parts"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQD5WCJWo0ntQa_XO6kYOc65AcQW6B-pm4E0dLMaTHwY2G0?e=8O7TN0)
[^transcript-epicor-jobs]: Source: [Training Video — "Epicor Jobs & Production Report"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQD_xqL4ks6oQ46EtS9TU66GAQ3DcQV93GaqUVAf3KvtHNc?e=EtZeL7)
