---
layout: default
title: Production Report
permalink: /tools/epicor/production-report.html
nav_order: 2
parent: Epicor Usage
grand_parent: Tools
corpus_tags: [fe-submittal]
---

# Production Report

> **Related**: [Dashboards](/tools/epicor/dashboards.html) | [Job Management](/tools/epicor/job-management.html)

## Purpose
Read drawing-package submittal status and track manufacturing jobs. The [Submittal Approval](/tools/approvals-process.html) flow writes the drawing-package status. [^transcript-epicor-jobs]

## Types of Reports
- **Global Production Report**: Read-only, shows all open jobs from both sites. Ideal for scheduling meetings.
- **Site-Specific Production Reports**: Updatable, show jobs for one site (CW or DF). Use for daily work and updates.

## Key Fields
(Site-specific reports are updatable) [^transcript-epicor-jobs]

- **Project ID & Job Number**
- **Project Advisor (PA)**
- **Submittal Status**: The status of the **shop drawing package** as a whole. Material and finish approval is tracked separately in the [Material Transmittal Log (TRA)](/workflows/fabrication-engineer/material-transmittal.html). The approval flow writes Internal Review when a request goes out, and Submitted or Resubmitted when a PM approves. The write is on the company that owns the job, CWK Associates or Digifabshop. A rejection writes nothing. A job already further along is left as it is. The same field is visible on the [Submittal Dashboard](/tools/epicor/dashboards.html#submittal-dashboard).
- **FE Assignment**
- **Checkboxes**:
  - Field Dimensions Received
  - Shop Drawings Approved
  - BOM Complete
  - FE Released to PE
- **PE Start Date**: Calculated by Epicor.
- **Production Status**: Production quantity, completed quantity, Production Complete checkbox.

## Usage
- Engineers filter by name and job to read the drawing-package status.
- **Drawing package status** is written by the approval flow: Internal Review, Submitted, or Resubmitted. Revise and Resubmit and Approved remain values the field can already hold. The flow does not set those two on an approval, and a rejection writes nothing.
- **Final status**: Production Complete.

**Best Practice for PE**: [^transcript-epicor-scheduling] Start each day by checking the Global Production Report or site-specific report.

**Note**: The Project Backlog has been retired. The Production Report is now the standard tool.

## Footnotes
[^transcript-epicor-jobs]: Source: [Training Video — "Epicor Jobs & Production Report"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQD_xqL4ks6oQ46EtS9TU66GAQ3DcQV93GaqUVAf3KvtHNc?e=EtZeL7)
[^transcript-epicor-scheduling]: Source: [Training Video — "Epicor Eng. Scheduling"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQBFqFHaP_2RS7smowJrv3utAc1B524O73vQKAb27EQQDQc?e=yT7OQa)
