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
3. Consult with the Master Scheduler if unsure — see [Part Requests — Scheduler Guide](/tools/releases-and-requests/part-requests/scheduler-guide.html).

**Required Fields**: Part Number, Description, UOM, Group, Class, Search.

**Editing Rules**:
- Part numbers are **permanent** once created.
- Descriptions editable only if not BOM'd.

## Site Synchronization

[^transcript-epicor-parts]

- **GM (General Materials)**: Created on company 157539, plant MfgSys, through the [Part Requests](/tools/releases-and-requests/part-requests/scheduler-guide.html) workflow. The request thread names the number when the part is created. The NY site receives the part when the scheduler runs the site push-pull. The thread says again when it is active in both companies.
- **Project-Specific Materials**: Only exist in the site where created (not synced).
- **Best Practice**: Always use the Colorado version of "Part Entry and Update" for catalog management.

## Permissions

[^transcript-epicor-jobs]

- **GM Materials**: Request via the [Part Requests workflow](/tools/releases-and-requests/part-requests/engineer-guide.html). Submit the form, then reply `@parts-bot ACCEPT` and a part number, or `@parts-bot DECLINE`. The scheduler saves a new part with `@parts-bot CREATE`, or records one already in Epicor with `USE`. The thread mentions the requester when the part is active in both companies. That mention is the cue that the NY site has it.
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
