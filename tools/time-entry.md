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

Time entry is simplified using Toggl as a secondary timekeeping app, with data exported to Epicor.

### Goal
To simplify time entry and timekeeping for Engineering staff and avoid Epicor's native interface.

### Methodology
Toggl data is reformatted using a spreadsheet and then copied/pasted into Epicor Time Entry.

### Set-up
- In Toggl, projects and tasks are substitutes for Epicor's Jobs and Operations.
- Project names are typically `[SITE] JOB_NUMBER.ENG` (e.g., `[NY] 1095.ENG`, `[CO] E1085`).
- Indirect work is named Indirect.
- Tasks in Toggl are operations, programmed via Epicor formatting from tables in the REFERENCE Ind. Codes and REFERENCE Op. Codes tabs.

### Time Upload Procedure
1. From the Toggl desktop app, use the Export/Import dialogue to produce a CSV spreadsheet of your week's time entry.
2. Open the spreadsheet, delete duplicate entries/mistaken recordings.
3. Copy data (excluding column headers) from Toggl IN tab into the spreadsheet's first tab.
4. Move data to the WORKING - Kinetic tab for Epicor-formatted entries.
5. Adjust site tab in Epicor-formatted sheet (Include Blanks for indirect entries from home site, exclude others).
6. Ensure all Epicor Time Entry columns match Toggl spreadsheet columns. Disable unneeded columns. Don't copy empty Site column.
7. In Epicor, right-click in Time Details field, click Paste New. Ensure Edit Mode is active. Ignore "Parameter OpCode is not found" error if "All records have been processed successfully" appears.

