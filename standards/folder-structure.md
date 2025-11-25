---
layout: default
title: Folder Structure & File Management
permalink: /standards/folder-structure.html
---

# Folder Structure & File Management Outline

> **Related Documents**: [FE Workflow](/workflows/fabrication-engineer.html) | [PE Workflow](/workflows/production-engineer.html) | [FE to PE Release](/workflows/fe-to-pe-release.html)

## Project Organization Overview

The CWK Engineering folder structure organizes all project-related files. Consistent folder structure ensures efficient file location and collaboration across the engineering team.

## PROJECT ROOT FOLDER

- Location: Contains all active projects.
- Example: Awarded

## SPECIFIC PROJECT FOLDER

**Naming Convention**:
```
Project Number_Project Description_Year Awarded
```
Example: `1085_Lucas Retail Expansion and Security Pavilion_HD_2024`

## DEPARTMENTS Folder

Contains folders for all company departments:
- 01 Sales
- 02 Project Management
- 03 Engineering
- 04 Purchasing
- 05 Shipping

## 03 ENGINEERING Folder Structure

### 01_INCOMING_Documents

Contains all job-related documents received to date:

#### 00_Contract_Drawings_from_Precon
- Architectural drawing set from the client used for contract/bidding.
- Copies become the working set.

#### 01_Addendum_Drawings_Post_Contract
- Updated architect drawings reflecting changes to existing jobs.

#### 02_Working_Set
- Organized contract drawings used by engineers for modeling and drafting.

#### 03_Spec_Sheets
- Detailed drawings (cut sheets) of devices/components for accurate modeling and submittals.

#### 04_Coordination_Documents
- Documentation for installation coordination:
  - _AdjacentSub_Drawings_Models: Floor plans, 3D models.
  - _Processed_Laser_Scans: Cleaned 3D laser scan files.

### 02_WORKING_Drawings_Models

Houses working drawings and models:

#### 00_Lead_Project_Eng
- _Shared_Display_Modes: For consistent submittal appearance.
- _Shared_GH: Shared Grasshopper scripts.

#### 01_FE_Models
- Individual job folders for each project.
- Copied from _PROJ.JOB_ScopeDescription template.
- FE working file naming:
  - `Project Number.Job Number_FE`
  - Example: `1085.016_FE`
- PE release file naming:
  - `Project Number.Job Number_PE YearMonthDay`
  - Example: `1085.016_PE 20241122`

Also includes:
- 00_GS_Master_Models: Grouped submittals.
- 02_CoverSheet_CommonPages: Project-level documents:
  - Cover Sheet (job index)
  - General Requirements
  - Master Floorplan (Keyplan)
  - Partition Plan
  - Pre-Submittal Set
  - Typical Details

### 03_PE_Releases

Dedicated to completed work ready for production:

- Subfolders copied from _PROJ.JOB_ScopeDescription template and renamed per job.
- Inside:
  - **Production_Drawings**: Completed shop drawings by FE and SKs by PE.
  - **Production_Files**:
    - Shipping component list
    - Master Parts List template
    - PE Rhino file
    - Optional _SHOP Rhino model

Also includes:
- HOLZMA Cut List
- MAZAK Programs:
  - _SYMBOLS
  - {MAZAK Project}
- 03_WEEKE Programs folder

### 03_OUTGOING_Submittals

For complete drawings ready to submit:

#### 00InternalReview
- Completed shop drawings needing review before submission.

#### 01_Outgoing
- Satisfactorily reviewed and updated shop drawings sent to the client for approval.

#### 02_Returned
- Submitted drawings returned by the architect, to be reviewed by FE.

