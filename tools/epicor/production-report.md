---
layout: default
title: Production Report
permalink: /tools/epicor/production-report.html
nav_order: 2
parent: Epicor Usage
grand_parent: Tools
---

# Production Report

> **Related**: [Dashboards](/tools/epicor/dashboards.html) | [Job Management](/tools/epicor/job-management.html)

## Purpose
Update submittal statuses and track manufacturing jobs. [^transcript-epicor-jobs]

## Types of Reports
- **Global Production Report**: Read-only, shows all open jobs from both sites. Ideal for scheduling meetings.
- **Site-Specific Production Reports**: Updatable, show jobs for one site (CW or DF). Use for daily work and updates.

## Key Fields
(Site-specific reports are updatable) [^transcript-epicor-jobs]

- **Project ID & Job Number**
- **Project Advisor (PA)**
- **Submittal Status**: Tracks the status of the **shop drawing package** submittal as a whole — not material/finish approval status, which is tracked separately in the [Material Transmittal Log (TRA)](/workflows/fabrication-engineer/material-transmittal.html). Status values: Internal Review → Submitted → Revise and Resubmit → Approved. The same field is visible on the [Submittal Dashboard](/tools/epicor/dashboards.html#submittal-dashboard).
- **FE Assignment**
- **Checkboxes**:
  - Field Dimensions Received
  - Shop Drawings Approved
  - BOM Complete
  - FE Released to PE
- **PE Start Date**: Calculated by Epicor.
- **Production Status**: Production quantity, completed quantity, Production Complete checkbox.

## Usage
- Engineers filter by name and job.
- **Drawing package status options**: Internal Review, Submitted, Revise and Resubmit, Approved.
- **Final status**: Production Complete.

**Best Practice for PE**: [^transcript-epicor-scheduling] Start each day by checking the Global Production Report or site-specific report.

**Note**: The Project Backlog has been retired. The Production Report is now the standard tool.

## Footnotes
[^transcript-epicor-jobs]: Source: [Training Video — "Epicor Jobs & Production Report"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQD_xqL4ks6oQ46EtS9TU66GAQ3DcQV93GaqUVAf3KvtHNc?e=EtZeL7)
[^transcript-epicor-scheduling]: Source: [Training Video — "Epicor Eng. Scheduling"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQBFqFHaP_2RS7smowJrv3utAc1B524O73vQKAb27EQQDQc?e=yT7OQa)
