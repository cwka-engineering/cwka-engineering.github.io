---
layout: default
title: Time Entry
permalink: /tools/time-entry.html
---

# Time Entry

> **Related Documents**: [Epicor Usage](/tools/epicor-usage.html)

This document covers time entry procedures using both Epicor and Toggl for Engineering staff.

## Time Codes

### Indirect Entries
Used for time not billable to a specific project.

- **IND General Indirect**
- **001** Sales Engineering, (for assigned engineering work for projects not under contract)
- **003** Training (applies to both trainer and trainee, time spent improving workflow/skills)
- **004** Company Meetings, (for large group meetings that are not project specific)
- **005** Holidays DO NOT USE
- **006** PTO DO NOT USE
- **008** Break Time (15 min breaks only, DO NOT INCLUDE LUNCH)
- **009** ENG Assistant, (for support role duties - printing travelers, entering part names, etc)
- **012** ENG Dept Improvement (for assigned development of departmental assets)
- **015** Machine Maintenance (fixing computer problems >15 min)
- **017** ENG Administration (for roles overseeing operations/administrative duties like Project Advisor)

## Production Entries (Bucket Jobs)

For direct labor that applies project-wide, not job-specific.

**Example Job Name**: `1234.ENG`

- Design Engineering
- Fabrication Engineering
- Lead Coordination
- Project Meetings
- BIM Coordination

**Note**: If your name isn't under resource, change Resource Group in Time and Expense Entry.

## Production Entries (Job Specified)

For direct labor on specific jobs.

### FE Example Job Name: `E1234.123`
- Submittal (drawing/modeling prior to client approval)
- Post-Submittal (modeling/drawing after client approval, prior to PE Release)

### PE Example Job Name: `1234.123`
- Prod Engineering (reviewing, programming, reworking jobs)

### Rework
- For rework on jobs, clock into the job as regular.
- In Time and Expense Entry, check Rework box and select Machine Error, providing a quick description.

## Time Entry - Toggl

Time entry is simplified using Toggl as a secondary timekeeping app, with data exported to Epicor. [^transcript-toggl]

### Goal
To simplify time entry and timekeeping for Engineering staff and avoid Epicor's native interface. Toggl is particularly useful for desk workers who need to track time across many different jobs and operations throughout the day.

### Why Toggl?
- More flexible and intuitive than Office MES for desk workers
- Better suited for people who need to punch into many different jobs (40-50 per week)
- Runs in system tray with keyboard shortcuts
- Passive activity tracking available

### Installation & Initial Setup

1. **Install Local Client**: [^transcript-toggl] Install the Toggl desktop app (not just browser version). The local client is lightweight and required for full functionality.

2. **Recommended Settings**: [^transcript-toggl]
   - **Run on login**: Enable this setting
   - **Stop when computer shuts down**: Enable this setting
   - **Record activity**: Set to "On" (local only)
   - **Upload activity**: Keep off (not needed)
   - **Snapping**: Set to 5 minutes minimum

3. **Activity Tracking (Optional but Recommended)**: [^transcript-toggl]
   - Enable "Record activity" and "Dynamic grouping" in preferences
   - Toggl will passively track your activity throughout the day
   - Shows programs in foreground, window titles, and groups similar activities
   - Use the left sidebar "Today" view in Calendar to review tracked activity
   - Can use tracked chunks as reference or directly convert to time entries
   - **Note**: Auto-tracker feature (automatic entry creation) is not recommended - manual review is better

### Toggl Structure & Naming

**Hierarchy in Toggl**: [^transcript-toggl]
- **Client** = Project Number (e.g., 1095, 9022)
- **Project** = Job Number (e.g., E1095.015, 9022.023)
- **Tag** = Operation (e.g., [DIR] Submittal, [IND] Company Meetings)

**Important**: [^transcript-toggl]
- Tag formatting is critical: `[DIR]` or `[IND]` followed by space, then operation name
- Operation name must match **exactly** the description in Epicor
- This formatting allows the spreadsheet to map back to Epicor operation codes

**Project Naming Examples**: [^transcript-toggl]
- Manufacturing jobs: `9022.023` (no prefix)
- Submittal jobs: `E9022.023` (E prefix)
- Bucket jobs: `9022.ENG` (project-wide work)

**Indirect Work**: [^transcript-toggl]
- Create a project named "Indirect" under the appropriate client
- Use indirect tags like `[IND] Company Meetings`, `[IND] Training`, etc.

### Creating Time Entries in Toggl

**Method 1: Manual Entry** [^transcript-toggl]
1. Click "What are you working on?" in Toggl
2. Enter a description (this becomes your labor note)
3. Select Client (project number)
4. Select Project (job number)
5. Add Tag (operation)
6. Start timer or enter time manually

**Method 2: Using Tracked Activity** [^transcript-toggl]
1. Review left sidebar activity tracking at end of day
2. Use tracked chunks as reference to quickly create entries
3. Or directly convert tracked chunks to time entries

### Methodology
Toggl data is reformatted using a spreadsheet and then copied/pasted into Epicor Time Entry. The spreadsheet maps Toggl's structure (Client/Project/Tag) to Epicor's structure (Job/Operation).

[^transcript-toggl]: Source: Training Video Transcript - "Toggl Time Entry"

### Time Upload Procedure

1. **Export from Toggl**: [^transcript-toggl]
   - From the Toggl desktop app, use the Export/Import dialogue
   - Select date range (typically one week)
   - Export as CSV spreadsheet

2. **Prepare Spreadsheet**:
   - Open the Excel template/spreadsheet
   - Delete duplicate entries/mistaken recordings from Toggl export
   - Copy data (excluding column headers) from Toggl IN tab into the spreadsheet's first tab

3. **Format for Epicor**:
   - Move data to the WORKING - Kinetic tab for Epicor-formatted entries
   - The spreadsheet automatically maps Toggl structure to Epicor format:
     - Client → Project
     - Project → Job
     - Tag → Operation (using [DIR]/[IND] prefix and operation name matching)

4. **Site-Specific Processing**: [^transcript-epicor-time]
   - Adjust site tab in Epicor-formatted sheet
   - Include Blanks for indirect entries from home site
   - Exclude entries from other sites
   - **Important**: You must upload one site at a time, then switch sites and upload the other

5. **Final Checks**:
   - Ensure all Epicor Time Entry columns match Toggl spreadsheet columns
   - Disable unneeded columns
   - Don't copy empty Site column

6. **Upload to Epicor**:
   - In Epicor, navigate to Time & Expense Entry
   - Right-click in Time Details field
   - Click Paste New
   - Ensure Edit Mode is active
   - Ignore "Parameter OpCode is not found" error if "All records have been processed successfully" appears

7. **Switch Sites and Repeat** (if needed):
   - Switch Epicor site (CW to DF or vice versa)
   - Repeat upload process for that site's entries

[^transcript-epicor-time]: Source: Training Video Transcript - "Epicor Time Tracking"

