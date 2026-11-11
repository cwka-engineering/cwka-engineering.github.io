---
layout: default
title: Job Management
permalink: /tools/epicor/job-management.html
nav_order: 4
parent: Epicor Usage
grand_parent: Tools
corpus_tags: [fe-release, fe-submittal]
---

# Job Management

> **Related**: [Production Report](/tools/epicor/production-report.html) | [Part Management](/tools/epicor/part-management.html) | [FE to PE Release](/workflows/fe-to-pe-release.html)

## Job Entry

**Purpose**: Manage and release jobs.

**Top-level release checklist** (Epicor):
1. Field Dimensions Received
2. Shop Drawings Approved
3. BOM Complete

Fabrication Engineers must also satisfy the full **[FE to PE Release checklist](/workflows/fe-to-pe-release.html#pre-release-checklist)** before submitting the FE to PE form. Released is set by that form when its gates pass, or later by `@release-bot`.

**Special Jobs**:
- Engineering Bucket Jobs
- Solid Wood Component (WC) Jobs
- [Manufactured Metal Parts & M Jobs](/tools/epicor/manufactured-parts-jobs.html)

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
- Use "Purchase Direct" flag for PMs — **except** for INV-class materials (SG, SS, SL, IM), where a BPM blocks Purchase Direct on manufacturing jobs. These materials are purchased via the project's [Inventory Job](/tools/epicor/inventory-jobs.html).
- **Important**: Do not release jobs until materials are confirmed.

### Job Status Updates
- Ensure **Engineering Complete** is set appropriately on BOM lines.
- Read drawing-package status on the Production Report for the company that owns the job. The [Submittal Approval](/tools/approvals-process.html) flow writes **Submittal Status** and **Submitted Date** on that company, CWK Associates or Digifabshop, when a package goes to the PMs and when a PM approves. A job on any other company is left unchanged.
- **PA Approved** is the build-strategy sign-off. Check it by hand when the Project Advisor has approved the approach, before release. The review is the working session before modeling and the work with the lead. The submittal flow leaves this checkbox alone.
- Set **Fabrication Engineer** on the job (may display as **Production Team** on Job Entry) before release.
- Submit the [FE to PE Release](/workflows/fe-to-pe-release.html) form. The form sets Released on the company that owns the job when its gates pass, and posts the result for PE.

## Shipping components upload

- **UD40**: Shipping Components — Kinetic workbench for most jobs.
- **UD37**: Use for **CMG** jobs instead of UD40 (see [Glossary](/reference/glossary.html)).

## Time Entry

For procedure details, see [Time Entry](/tools/time-entry.html). [^transcript-epicor-time]

**Multi-Site Time Entry**:
- Must be done **per site**.
- Minimum requirement: 2 bulk entries per week (1 Colorado, 1 New York).
- When uploading: upload one site, switch sites, then upload the other.

## Footnotes
[^transcript-epicor-time]: Source: [Training Video — "Epicor Time Tracking"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQABIwF4w6H6Ta3UsXmQ5yi0Aec0QJHoPjqkFGCCs-FMvqE?e=9d6YW6)
