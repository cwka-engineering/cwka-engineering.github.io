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

## How do I view all materials for a project?
{: #how-to-view-project-materials}

Open the **Project Materials Dashboard**. Enter the project number. Group by job number to review BOMs across multiple jobs, or group by material class/code to see total quantities needed for purchasing. Use summary functions for quantity tracking.

## How do I check material demand for a job?
{: #how-to-check-demand}

In the Project Materials Dashboard, filter to the specific job. Review BOM quantities, check **Fixed QTY** status, and compare against the material transmittal approval status. For Rhino-level BOM data, use the [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html) job BOM lookup.

## How do I check current inventory levels?
{: #how-to-check-inventory}

Use Epicor's **Part Transaction History** or **Quantity Adjustment** views to check on-hand inventory for a specific part number. For a project-wide view, the Project Materials Dashboard shows demand vs. availability context. Coordinate with the PM for purchasing decisions.

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

**Rhino integration**: The material schedule and approval context that PMs maintain in Epicor and related processes feed the **[Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html)** in Rhino for **job BOM** and **general requirements / schedule** publish workflows. Use the Drafting Toolkit to keep drawing layouts aligned with Epicor; see also **Material Transmittal** / project materials practice on this dashboard.

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
- [Engineering Assistant Workflow](/workflows/engineering-assistant.html) - Job scheduling details

## Footnotes
[^transcript-epicor-scheduling]: Source: [Training Video — "Epicor Eng. Scheduling"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQBFqFHaP_2RS7smowJrv3utAc1B524O73vQKAb27EQQDQc?e=yT7OQa)
[^transcript-getting-started]: Source: [Training Video — "Getting Started"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQCEUKEug6xQT5MbOuegC5FTATe0eReTEDki0eO7FDWTDYg?e=G0GMA1)
[^transcript-epicor-project-materials]: Source: [Training Video — "Epicor Project Materials"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQD8u0w8HEjGTrDZIIG5-AJYAUwLBQo9xZU5LnYaEFRGNzc?e=MlosTg)
