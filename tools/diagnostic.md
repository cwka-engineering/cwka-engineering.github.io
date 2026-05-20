---
layout: default
title: FE Release Diagnostic Tool
permalink: /tools/diagnostic.html
parent: Tools
nav_order: 6
---

# FE Release Diagnostic Tool

An automated validator that checks a PE release handoff `.3dm` file against the published [FE to PE Release Checklist](/workflows/fe-to-pe-release.html). Running it before every release is required.

> **Related**: [FE to PE Release](/workflows/fe-to-pe-release.html) | [Engineering Toolkit](/workflows/fabrication-engineer/toolkit/) | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html)

## What It Does

The tool opens a `.3dm` file, runs a set of validators across three categories, and reports which rules passed, which failed, and specifically which objects or layers are responsible. It covers approximately **70% of the items on the FE to PE Release Checklist** — the remaining items require human judgment and cannot be automated.

It does **not** require Rhino to be installed.

## Where to Find It

The executable lives at:

```
Box / DFW CWKA Internal / _ENG-RESOURCE / FE Release Checklist + Diagnostic /
```

Use the most recent dated build (e.g., `FE to PE Release - Diagnostic - 20260405.exe`).

## How to Use (Standalone GUI)

1. **Launch** — double-click the executable
2. **Load a file** — drag and drop a `.3dm` onto the drop zone, or click the drop zone to browse
3. **Review results** — validation runs automatically; results are grouped by category with a status for each rule
4. **Expand rules** — click any rule to see which specific objects or layers failed and why
5. **Optionally toggle rules** — use the checkboxes to disable rules that don't apply to the current job, then re-run
6. **Address issues** — fix problems in Rhino, reload the file, re-run until clean

## Validator Categories

| Category | Scope |
|---|---|
| **Document Structure** | File-level checks — layers, named views, template conformance |
| **Model Objects** | Geometry checks — part naming, object properties, layer assignment |
| **ERP Integration** | Epicor-facing checks — part numbers, BOM consistency, job linkage |

Each rule returns one of four statuses:

| Status | Meaning |
|---|---|
| ✅ Passed | No issues found |
| ℹ️ Passed with info | Passed but something worth reviewing |
| ⚠️ Warning | Potential issue — review before release |
| ❌ Failed | Rule not met — must be resolved before release |

## Summarize Results

After validation completes, click **Summarize Results**. The tool sends the findings to the wiki assistant backend and returns:

- A prioritized list of actions ordered by impact
- Links to the relevant Engineering Wiki page for each issue type

Use this when you have multiple failures and aren't sure where to start.

## Export to Excel

Click **Export** to save the full issue list as an Excel file. The workbook has three sheets — Document Structure, Model Objects, ERP Integration — matching the validator categories. Each row is one object or layer; columns correspond to individual validators. Status cells display emoji indicators (✅ ℹ️ ⚠️ ❌ or N/A) that are sortable and filterable for quick triage.

The **GUID** column (Model Objects sheet only) lets you locate a specific object in Rhino using the `_SelId` command.

## Running from the Engineering Toolkit (In-Rhino)

The Engineering Toolkit includes a button that runs the diagnostic on the **currently open Rhino file** and immediately launches the wiki assistant pre-loaded with the results.

**How to use:**
1. Open your PE release file in Rhino
2. In the Engineering Toolkit, click the **Assistant** button (next to Reset)
3. The tool runs headlessly in the background
4. The wiki assistant opens with full context of your file and findings
5. Ask it questions directly — e.g., *"which shipping components are flagged?"* or *"what should I fix first?"*

The assistant can answer using both wiki knowledge and the specific details of your file.

## First-Time ERP Login

The first time you run the tool (standalone or via toolkit), it will prompt for your Epicor username and password if you have not previously logged in through the Engineering Toolkit. Credentials are saved securely on your machine and not re-prompted on subsequent runs.

## Requirement

All FEs are required to run their PE release handoff model through the diagnostic tool and resolve any failures before submitting the [FE to PE Release](/workflows/fe-to-pe-release.html) form. The checklist item for this is under [Pre-Release Checklist — ERP & File Validation](/workflows/fe-to-pe-release.html#pre-release-checklist).
