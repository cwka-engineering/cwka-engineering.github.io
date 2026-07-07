---
layout: default
title: Folder Structure & File Management
permalink: /reference/folder-structure.html
parent: Reference
nav_order: 2
---

# Folder Structure & File Management Outline

> **Related**: [FE Workflow](/workflows/fabrication-engineer/) | [PE Workflow](/workflows/production-engineer/) | [FE to PE Release](/workflows/fe-to-pe-release.html)

## Project Organization Overview

The CWK Engineering folder structure organizes all project-related files. Consistent folder structure ensures efficient file location and collaboration across the engineering team.

## Full Box Hierarchy

```
Box/
  Awarded/
    [4-digit ProjectCode]_[ProjectDescription]/
      01 Precon/
      02 Project Management/
        05_Material_Finish_Log/
      03 Engineering/
        01_INCOMING_Documents/
          00_Contract_Drawings_from_Precon/
          01_Addendum_Drawings_Post_Contract/
          02_Working_Set/
          03_Spec_Sheets/
          04_Coordination_Documents/
            _AdjacentSub_Drawings_Models/
            _Processed_Laser_Scans/
        02_WORKING_Drawings_Models/
          00_Lead_Project_Eng/
            _Shared_Display_Modes/
            _Shared_GH/
          01_FE_Models/
            [PROJ.JOB_ScopeDescription]/
            00_GS_Master_Models/
          02_CoverSheet_CommonPages/
          03_PE_Releases/
            [PROJ.JOB_ScopeDescription]/
              Production_Files/
              Production_Drawings/
            00_MT_WC_IP_MfgParts/
              [PROJ.M.000 or PROJ.W.000]/
        03_OUTGOING_Submittals/
          [PROJ.JOB_ScopeDescription]/
            00_Internal_Review/
            01_Outgoing/
            02_Returned/
      04 Purchasing/
      05 Shipping/
```

Always use **Windows Explorer paths** (not Box links) when referencing file locations in release forms and team communications.

## PROJECT ROOT FOLDER

- Location: `Box/Awarded/`
- Contains all active projects

## SPECIFIC PROJECT FOLDER

**Naming Convention**:
```
[4-digit ProjectCode]_[ProjectDescription]
```
Example: `1085_Lucas Retail Expansion and Security Pavilion`

## DEPARTMENTS Folder

Contains folders for all company departments:
- 01 Sales (Precon)
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
  - `_AdjacentSub_Drawings_Models/`: Floor plans, 3D models from adjacent trades.
  - `_Processed_Laser_Scans/`: Cleaned 3D laser scan files.

### 02_WORKING_Drawings_Models

Houses working drawings and models:

#### 00_Lead_Project_Eng
- `_Shared_Display_Modes/`: Project-specific display modes for consistent submittal appearance.
- `_Shared_GH/`: Shared Grasshopper scripts.

#### 01_FE_Models
- Individual job folders copied from `_PROJ.JOB_ScopeDescription` template and renamed to your job.
- **FE working file naming**: `[PROJ.JOB]_FE_[Description].3dm` — e.g., `1094.002_FE_CashWrap.3dm`
- **PE release file naming**: `[PROJ.JOB]_PE_YYYYMMDD.3dm` — e.g., `1105.007_PE_20250124.3dm`
- `00_GS_Master_Models/`: Grouped submittal master models — see [Grouped Submittal (GS)](/reference/glossary.html) in the glossary and [time-entry rules for GS jobs](/tools/time-entry.html#direct-gs-jobs).

#### 02_CoverSheet_CommonPages
Contains two categories of project-level assets:

**Shared Rhino Base Floorplan**: The working Rhino model file that all engineers on the project team link into their individual scope files. Set up and maintained by the Lead Engineer. Required for worksession-based clash detection and cross-scope coordination. If the project has a BIM deliverable, this file must be positioned relative to the architect's shared datum.

**Common Drawing Documents** — attached to any full project submittal or record set:
- **Cover Sheet**: Full project job index
- **General Requirements**: Finish/material tags generated via the Engineering Toolkit from the TRA log
- **Master Floorplan / Keyplan**: Per level, showing all awarded scope
- **Partition Plans**: Field dimensions, ceiling heights, blocking, electrical, load calcs if needed
- **Pre-Submittal Sets**: Scope/design intent clarification
- **Typical Details**: Interaction between adjacent scopes

This drawing set is also included with drawing packages given to the install team.

### 03_PE_Releases

Dedicated to completed work ready for production. Release contents and naming must also satisfy the [FE to PE Release](/workflows/fe-to-pe-release.html) checklist.

- Subfolders copied from `_PROJ.JOB_ScopeDescription` template and renamed per job.
- Inside each release folder:
  - **Production_Files/**: PE Rhino file, SC list, Master Parts List, Lay-Up Summary, optional SHOP model
  - **Production_Drawings/**: Completed shop drawings by FE and SKs by PE. Also contains any ancillary documents PE needs to process the job — veneer takeoff drawings, hardware cut sheets, specialty fabrication references, etc. These are copied here from wherever they live in the project folder; PE should not need to search outside this directory to execute the release.

#### 00_MT_WC_IP_MfgParts
Manufacturing part folders for WC, MT, and IP jobs.

**MFG parts naming convention:**
- The enclosing **folder** is named using the Epicor **job number** with three trailing digits — e.g., `1130.M.005`
- The Rhino **file** within is named using the Epicor **part number** with five trailing digits — e.g., `1130.MT.00022_PE.3dm`

### 03_OUTGOING_Submittals

Three-folder submittal review workflow. See [Submittal Review Cycle](/workflows/fabrication-engineer/submittal-review.html).

Each job has its own subfolder (`PROJ.JOB_ScopeDescription/`) containing:

#### 00_Internal_Review
- Completed shop drawings placed here for QA before submission.

#### 01_Outgoing
- Reviewed and updated drawings sent to the client for approval. The PM exports a clean (comment-free) PDF copy here after PA approval.

#### 02_Returned
- Drawings returned by the architect with markups, to be reviewed and picked up by FE.
