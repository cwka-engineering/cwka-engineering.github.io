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
- **Submittal Status**: (PM managed dropdown: Approved, Submitted, Resubmit, etc.)
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
- **Status options**: Submitted, Revise and Resubmit, Approved.
- **Final status**: Production Complete.

**Best Practice for PE**: [^transcript-epicor-scheduling] Start each day by checking the Global Production Report or site-specific report.

**Note**: The Project Backlog has been retired. The Production Report is now the standard tool.

## Footnotes
[^transcript-epicor-jobs]: Source: Training Video Transcript - "Epicor Jobs & Production Report"
[^transcript-epicor-scheduling]: Source: Training Video Transcript - "Epicor Eng. Scheduling"
