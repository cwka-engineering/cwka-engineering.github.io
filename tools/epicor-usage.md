---
layout: default
title: Epicor Usage in Engineering
permalink: /tools/epicor-usage.html
---

# Epicor Usage in Engineering

> **Related Documents**: [Time Entry](/tools/time-entry.html) | [FE Workflow](/workflows/fabrication-engineer.html) | [FE to PE Release](/workflows/fe-to-pe-release.html)

## I. Overview

Epicor is the central system used by the Engineering Department to manage project data, workflows, and production readiness. It integrates with tools like Rhino and Toggl to streamline operations from design to release.

**Note**: For time entry procedures, see [Time Entry](/tools/time-entry.html). For job release procedures, see [FE to PE Release](/workflows/fe-to-pe-release.html).

## II. Core Functions of Epicor

### A. Centralized Data Management
- Stores part numbers, materials, job statuses, and time tracking.
- Ensures consistency across engineering and production workflows.

### B. Workflow Integration
- Supports BOM creation, part naming, job release.
- Ensures build strategies are reviewed and signed off.

## III. Key Dashboards & Screens

### 1. Submittal Dashboard
**Purpose**: Homepage for Fabrication Engineers (FEs).

**Features**:
- Displays submittal and post-submittal work.
- Filters jobs by engineer name.
- Tracks hours and job status.
- Handles group submittals (one doc → multiple jobs).

### 2. Production Report
**Purpose**: Update submittal statuses.

**Usage**:
- Engineers filter by name and job.
- Status options: Submitted, Revise and Resubmit, Approved.
- Final status: Production Complete.

### 3. Part
**Purpose**: Create and manage parts.

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

