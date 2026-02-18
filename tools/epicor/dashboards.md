---
layout: default
title: Dashboards
permalink: /tools/epicor/dashboards.html
nav_order: 1
parent: Epicor Usage
grand_parent: Tools
---

# Key Dashboards

> **Related**: [Production Report](/tools/epicor/production-report.html) | [Job Management](/tools/epicor/job-management.html)

## Submittal Dashboard

**Purpose**: Homepage for Fabrication Engineers (FEs). [^transcript-epicor-scheduling] This is your assignment homepage when you receive a new scope of work. [^transcript-getting-started]

**Features**:
- Displays submittal and post-submittal work not yet released to PE.
- Filters jobs by engineer name.
- Tracks hours booked to jobs.
- Handles group submittals.
- Pulls in PE start dates and submittal status.

**Best Practice**: [^transcript-epicor-scheduling] Start each day by checking the Submittal Dashboard:
1. Filter to your name
2. Sort by PE start date
3. Verify list matches expectations
4. Check for missing assignments
5. Verify hours estimates

**Note**: Must be launched from the CW site, but includes assignments from both sites.

## Project Materials Dashboard

**Purpose**: View all materials for all jobs on a project in one place. [^transcript-epicor-project-materials]

**Use Cases**:
1. **Engineer Review**: Group by job number to review BOMs for multiple jobs simultaneously.
2. **PM Purchasing**: Group by material class and code to see total quantity needed across all jobs.

**Features**:
- Project-wide material view
- Group and filter capabilities
- Summary functions for quantity tracking

**Related**: Material Transmittal Log - backend for Rhino toolkit to print material tags.

## Scheduling Dashboards

**Purpose**: Manage job scheduling and ship dates. [^transcript-epicor-scheduling]

**Available Dashboards**:
- **Global Production Report**: Read-only, all open jobs from both sites. Used for scheduling meetings.
- **Submittal Dashboard**: Feeds Microsoft Project files for weekly schedule reviews.

**Usage**:
- Update job scheduling due to ship date changes.
- Manage job schedules across projects.
- Coordinate with PMs and Engineers on conflicts.

## See Also
- [Engineering Assistant Workflow](/workflows/engineering-assistant/) - Job scheduling details

## Footnotes
[^transcript-epicor-scheduling]: Source: Training Video Transcript - "Epicor Eng. Scheduling"
[^transcript-getting-started]: Source: Training Video Transcript - "Getting Started"
[^transcript-epicor-project-materials]: Source: Training Video Transcript - "Epicor Project Materials"
