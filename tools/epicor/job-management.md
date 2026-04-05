---
layout: default
title: Job Management
permalink: /tools/epicor/job-management.html
nav_order: 4
parent: Epicor Usage
grand_parent: Tools
---

# Job Management

> **Related**: [Production Report](/tools/epicor/production-report.html) | [Part Management](/tools/epicor/part-management.html) | [FE to PE Release](/workflows/fe-to-pe-release.html)

## Job Entry

**Purpose**: Manage and release jobs.

**Top-level release checklist** (Epicor):
1. Field Dimensions Received
2. Shop Drawings Approved
3. BOM Complete

Fabrication Engineers must also satisfy the full **[FE to PE Release checklist](/workflows/fe-to-pe-release.html#pre-release-checklist)** before marking **Released** and submitting the FE→PE form.

**Special Jobs**:
- Engineering Bucket Jobs
- Solid Wood Component (WC) Jobs

## Responsibilities

### BOM Management
- Create BOM for materials and hardware.
- Assign **Related Operation** (**Rel Opr.**) for each line so materials roll up correctly.
- Use Rhino Toolkit for Auto-BOM.
- **Review BOM quantities before finalizing.** Post-release BOM line additions must be flagged with **Added Mtl** per process.
- **Engineering Complete**: Check per material line once quantities and part numbers are verified (see [FE to PE Release](/workflows/fe-to-pe-release.html)).
- **Fixed QTY**: Verify for each material except where **CMG** rules differ; see FE→PE checklist.

### Material & Hardware Ordering
- Confirm items ordered/received before release.
- Use "Purchase Direct" flag for PMs.
- **Important**: Do not release jobs until materials are confirmed.

### Job Status Updates
- Ensure **Engineering Complete** is set appropriately on BOM lines.
- Update submittal statuses (**Submittal Status**, **Submitted Date**, **PA Approved** as applicable).
- Set **Fabrication Engineer** on the job (may display as **Production Team** on Job Entry) before release.
- Release jobs and notify PE.

## Shipping components upload

- **UD40**: Shipping Components — Kinetic workbench for most jobs.
- **UD37**: Use for **CMG** jobs instead of UD40 (see [Glossary](/overview/glossary.html)).

## Time Entry

For procedure details, see [Time Entry](/tools/time-entry.html). [^transcript-epicor-time]

**Multi-Site Time Entry**:
- Must be done **per site**.
- Minimum requirement: 2 bulk entries per week (1 Colorado, 1 New York).
- When uploading: upload one site, switch sites, then upload the other.

## Footnotes
[^transcript-epicor-time]: Source: [Training Video — "Epicor Time Tracking"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQABIwF4w6H6Ta3UsXmQ5yi0Aec0QJHoPjqkFGCCs-FMvqE?e=9d6YW6)
