---
layout: default
title: Epicor Usage in Engineering
permalink: /tools/epicor-usage.html
---

# Epicor Usage in Engineering

> **Related Documents**: [Time Entry](/tools/time-entry.html) | [FE Workflow](/workflows/fabrication-engineer.html) | [FE to PE Release](/workflows/fe-to-pe-release.html) | [EA Workflow](/workflows/engineering-assistant.html)

## I. Overview

Epicor is the central system used by the Engineering Department to manage project data, workflows, and production readiness. It integrates with tools like Rhino and Toggl to streamline operations from design to release.

**Note**: For time entry procedures, see [Time Entry](/tools/time-entry.html). For job release procedures, see [FE to PE Release](/workflows/fe-to-pe-release.html).

### Multi-Site Configuration

Epicor now operates with multiple sites (CWK and Digifab Shop). [^transcript-epicor-home]

- **Site Selection**: Click your user icon in the bottom left → Company → Select site (CWK or Digifab Shop)
- **Important**: After switching sites, **refresh the page** to ensure cards display correctly
- **Site-Specific Cards**: Cards labeled with (CW) or (DF) only work in their corresponding site
- **Global Cards**: Cards without site labels work from either site but display site-specific data

## II. Core Functions of Epicor

### A. Centralized Data Management
- Stores part numbers, materials, job statuses, and time tracking.
- Ensures consistency across engineering and production workflows.

### B. Workflow Integration
- Supports BOM creation, part naming, job release.
- Ensures build strategies are reviewed and signed off.

### 7. Project Materials Dashboard
**Purpose**: View all materials for all jobs on a project in one place. [^transcript-epicor-project-materials]

**Use Cases**:
1. **Engineer Review**: Working on multiple jobs for the same project - group by job number to review BOMs for multiple jobs simultaneously. Can also filter by your name.
2. **PM Purchasing**: Group by material class and material code to see total quantity of any material code BOM'd across all jobs for a project. Use summaries (quantity prepared summary) to quickly determine total quantities needed.

**Features**:
- Very wide table with many columns (best viewed on extra-wide monitor)
- Auto-resize columns feature available
- Group and filter capabilities
- Summary functions for quantity tracking

**Related**: Material Transmittal Log - backend for Rhino toolkit to print material tags and specifications onto layouts. Shows approval status for material/finish tags, hardware samples, etc. [^transcript-epicor-project-materials]

## III. Key Dashboards & Screens

### 1. Submittal Dashboard
**Purpose**: Homepage for Fabrication Engineers (FEs). [^transcript-epicor-scheduling] This is your assignment homepage when you receive a new scope of work. [^transcript-getting-started]

**Features**:
- Displays submittal and post-submittal work that is not yet released to PE. [^transcript-getting-started]
- Filters jobs by engineer name.
- Tracks hours booked to any particular job. [^transcript-getting-started]
- Handles group submittals (one doc → multiple jobs). [^transcript-getting-started]
- Pulls in PE start dates from the production report.
- Pulls in submittal status from the transmittal log managed by PMs.
- **Dashboard Integration**: [^transcript-getting-started] Pulls in information from other dashboards in the system - combines data from multiple sources in one place.

**Best Practice**: [^transcript-epicor-scheduling] Start each day by checking the Submittal Dashboard:
- Filter to your name
- Sort by PE start date
- Verify the list matches your expectations
- Check for any missing assignments
- Verify hours estimates are correct

**Note**: Must be launched from the CW site, but includes assignments from both sites. [^transcript-getting-started]

### 2. Production Report
**Purpose**: Update submittal statuses and track manufacturing jobs. [^transcript-epicor-jobs]

**Types of Production Reports**:
- **Global Production Report**: Read-only, shows all open jobs from both sites. Ideal for scheduling meetings and cross-site visibility.
- **Site-Specific Production Reports**: Updatable, show jobs for one site (CW or DF). Use for daily work and updates.

**Key Fields** (site-specific reports are updatable): [^transcript-epicor-jobs]
- Project ID
- Project Advisor (PA) - recorded using initials
- Job number and part produced
- Transmittal number (PM managed)
- Submittal history date (last submitted/resubmitted date)
- Submittal status (PM managed dropdown: Approved, Submitted, Resubmit, etc.)
- FE assignment
- Field Dimensions Received (checkbox)
- Shop Drawings Approved (checkbox)
- BOM Complete (checkbox)
- FE Released to PE (checkbox)
- PE Start Date (calculated by Epicor based on operations, resources, hours, and priorities)
- PE assignment (for Digifab site)
- Programming Complete (PE checkbox - signals shop that traveler can be printed)
- Production quantity and completed quantity
- Production Complete
- Truck ID

**Usage**:
- Engineers filter by name and job.
- Status options: Submitted, Revise and Resubmit, Approved.
- Final status: Production Complete.
- **Best Practice for PE**: [^transcript-epicor-scheduling] Start each day by checking the Global Production Report or site-specific report to review assignments and PE start dates.

**Note**: The Project Backlog has been retired. The Production Report is now the standard tool. [^transcript-epicor-jobs]

### 3. Part
**Purpose**: Create and manage parts (material codes). [^transcript-epicor-parts]

**Part Creation**:
- Search for next available part number using the Part search function.
- Use naming conventions:
  - **GM**: General Material (standard catalog items)
  - **Custom**: Custom project-specific parts
  - **WC**: Wood Component parts
- Consult with Engineering Assistant (EA) if unsure about part numbering.

**Required Fields**:
- Part Number, Description, UOM (Unit of Measure), Group, Class, Search.

**Editing Rules**:
- Part numbers are permanent once created - cannot be changed.
- Descriptions editable only if not BOM'd (Bill of Materials).
- If a part is already BOM'd, contact EA or Engineering Director for changes.

**Part Synchronization Between Sites**: [^transcript-epicor-parts]
- **GM (General Materials)**: Synced between sites, but always created in Colorado database first, then pushed to Digifab database (one-way sync)
- **Project-Specific Materials**: Only exist in the site where they were created (not synced)
- **Sync Timing**: GM sync occurs nightly, so there may be up to 24-hour lag for new GM parts
- **Best Practice**: Always use the Colorado version of "Part Entry and Update" dashboard to ensure you have the most recent, complete catalog

**Part Creation Permissions**: [^transcript-epicor-jobs]
- **GM Materials**: Request through a channel/form, then created by designated person (Jack) and placed in both site databases
- **Job-Specific or Project-Specific Materials**: Engineers create these directly
- **WC and MT Parts**: Engineers can create these directly, specify attributes, and BOM them
- **Custom Parts**: After creation, request operations assignment (cannot assign operations directly to a part)

**Additional Part Dashboards**: [^transcript-epicor-parts]
- **Time Phase Inquiry**: Shows which jobs a material code is currently BOM'd to (demand tracking). Useful for projects like Chipotle where materials are used across multiple jobs.
- **Part Transaction History**: Shows inventory history (credits/debits) for any material code - purchase dates, issue dates, on-hand quantity changes over time.
- **Cycle Count**: Shows current on-hand quantities for materials with at least quantity of 1 in the current site. Useful for checking inventory before BOMing materials.

### 4. Job Entry
**Purpose**: Manage and release jobs.

**Release Checklist**:
- Field Dimensions Received
- Shop Drawings Approved
- BOM Complete

**Special Jobs**:
- Engineering Bucket Jobs
- Solid Wood Component (WC) Jobs

### 5. Time & Expense Entry
**Purpose**: Enter time details.

**Process**:
- Export CSV from Toggl.
- Reformat using spreadsheet template.
- Paste into Epicor Time Entry module.

**Multi-Site Time Entry**: [^transcript-epicor-time]
- Time entry must be done **per site** - there is no single place to enter all hours for both Colorado and New York projects
- Minimum requirement: 2 bulk entries per week (1 for all Colorado hours, 1 for all New York hours)
- This is an unavoidable consequence of operating as two businesses under the hood
- When bulk uploading via paste: upload one site, switch sites, then upload the other site

**Time Entry Methods**: [^transcript-epicor-time]
- **Office MES**: Digital time clock - good for people who work out and about, less ideal for desk workers
- **Manual Entry**: Enter one line at a time in Time Details
- **Excel Template**: Track time in Excel, paste into Time Details at end of week
- **Toggl**: Recommended for desk workers - see [Time Entry - Toggl](/tools/time-entry.html#time-entry---toggl) for details

### 6. Scheduling Dashboards
**Purpose**: Manage job scheduling and ship dates.

**Available Dashboards**: [^transcript-epicor-scheduling]
- **Global Production Report**: Read-only, all open jobs from both sites. Used for scheduling meetings and cross-site visibility.
- **Submittal Dashboard**: For E-prefixed submittal jobs. Groups by engineer to show all open submittal and post-submittal operations. Feeds Microsoft Project files for weekly schedule reviews.

**Usage**:
- Update job scheduling due to ship date changes using scheduling workbenches.
- View and manage job schedules across projects.
- Coordinate with PMs and Engineers on scheduling conflicts.
- **FE Daily Routine**: [^transcript-epicor-scheduling] Check Submittal Dashboard each morning - filter to your name, sort by PE start date, verify assignments make sense.
- **PE Daily Routine**: [^transcript-epicor-scheduling] Check Global Production Report or site-specific report each morning to review assignments.

**Note**: Both Global Production Report and Submittal Dashboard have access to information across the entire organization but only launch from the CW site. [^transcript-epicor-scheduling]

**Note**: For detailed scheduling procedures, see [Engineering Assistant (EA) Workflow](/workflows/engineering-assistant.html#job-scheduling).

## IV. Engineering Responsibilities

### A. BOM Management
- Engineers create BOM (Bill of Materials) for materials and hardware.
- Assign operations for material consumption tracking.
- Use Rhino Toolkit for Auto-BOM generation and nesting optimization.
- **Best Practice**: Review BOM quantities before finalizing to ensure accuracy.

### B. Material & Hardware Ordering
- Confirm all items are ordered and received before job release.
- Use "Purchase Direct" flag in Epicor to notify Project Managers (PMs) of items requiring purchase.
- Track order status in Epicor to ensure materials arrive on schedule.
- **Important**: Do not release jobs to PE until all materials are confirmed received.

### C. Job Status Updates
- Ensure "Engineering Complete" is checked.
- Update submittal statuses.
- Release jobs and notify Production Engineering.

### D. Data Accuracy
- Maintain clean BOM data for drawings.
- Ensure accuracy for downstream processes.

## V. Troubleshooting

### Common Issues

**Can't access Submittal Dashboard**
- Verify you have FE role permissions in Epicor
- Check that you're accessing the correct Epicor site (West)
- Contact IT or Engineering Director if access issues persist

**Part number search returns no results**
- Verify you're using correct naming convention (GM, Custom, WC)
- Check with EA for next available part number
- Ensure you're searching in the correct part class

**BOM Complete checkbox won't check**
- Verify all BOM line items have required fields filled
- Check that quantities are entered
- Ensure all materials have Part Masters
- Review for any error messages in Epicor

**Job won't release**
- Verify all three checkboxes are checked:
  - Field Dimensions Received
  - Shop Drawings Approved
  - BOM Complete
- Check that Engineering Complete is also checked
- Ensure no error messages appear in Job Entry screen

## Footnotes

[^transcript-epicor-home]: Source: Training Video Transcript - "Epicor Home Screen"
[^transcript-epicor-project-materials]: Source: Training Video Transcript - "Epicor Project Materials"
[^transcript-epicor-scheduling]: Source: Training Video Transcript - "Epicor Eng. Scheduling"
[^transcript-getting-started]: Source: Training Video Transcript - "Getting Started"
[^transcript-epicor-jobs]: Source: Training Video Transcript - "Epicor Jobs & Production Report"
[^transcript-epicor-parts]: Source: Training Video Transcript - "Epicor Parts"
[^transcript-epicor-time]: Source: Training Video Transcript - "Epicor Time Tracking"

