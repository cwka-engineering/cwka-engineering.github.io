---
layout: default
title: Getting Started
permalink: /workflows/fabrication-engineer/getting-started.html
nav_order: 1
parent: Fabrication Engineer (FE)
grand_parent: Workflows
---

# Getting Started

> **Related**: [Epicor Interaction](/workflows/fabrication-engineer/epicor-interaction.html) | [Engineering Toolkit](/workflows/fabrication-engineer/toolkit-setup.html)

## Finding Assignments

- Access the Epicor Submittal Dashboard via The CW site. See [Epicor Usage](/tools/epicor-usage.html#1-submittal-dashboard) for details.
- Filter by your name to view submittal/post-submittal tasks not yet released to PE.
- Understand job types (see [Glossary](/overview/glossary.html#job-types)):
  - **Engineering Jobs**: [^transcript-getting-started] Start with "E", match 1:1 with production jobs (e.g., E1094.009 corresponds with production job 1094.009). Exception: group submittals (1 submittal document feeds multiple production jobs) and engineering bucket jobs.
  - **Bucket Jobs**: [^transcript-getting-started] Project-wide tasks like design, coordination, meetings, BIM. Format: PROJ.ENG. When clocking into bucket job, select from operations: Design, Engineering, Fabrication Engineering, Lead Coordination, Project Meetings, BIM Coordination.

## Verifying Scope

- **Working Set Location**: [^transcript-file-structure] Working set is in `01_INCOMING_Documents > 02_Working_Set`. This contains organized contract drawings used by engineers.
- **Verify Job Number**: [^transcript-file-structure] Open the working set in Bluebeam. Use the annotations tool (box with three lines) to search by job number. Confirm what's included in the scope for that job number by checking the drawings.
- **Confirm Assignment**: After confirming scope in drawings, verify in Epicor that the submittal is assigned to you.

## Template Usage

- **Template Location**: [^transcript-file-structure] Download the latest FE template from `DFWCWKA internal > templates`. This file is locked and should only be updated by designated personnel.
- **Save Your Copy**: [^transcript-file-structure]
  - Open the template
  - Save as a copy in the project folder following [Folder Structure](/standards/folder-structure.html#01_fe_models) standards:
    - `awarded > [project code] > 03 Engineering > 02 Working Drawings and Models > FE Models`
  - Create a new folder using `_PROJ.JOB_ScopeDescription` format (copy from template folder)
  - Save Rhino file as `Project.Job_FE_ShortDescription`

## Next Steps

- Continue to [Epicor Interaction](/workflows/fabrication-engineer/epicor-interaction.html) to learn about updating job status
- Or jump to [Engineering Toolkit Setup](/workflows/fabrication-engineer/toolkit-setup.html) to begin modeling

## See Also

- [Submittal Dashboard](/tools/epicor-usage.html#1-submittal-dashboard) - Finding your assignments
- [Folder Structure](/standards/folder-structure.html) - File organization standards
- [Glossary](/overview/glossary.html) - Term definitions

## Footnotes

[^transcript-getting-started]: Source: Training Video Transcript - "Getting Started"
[^transcript-file-structure]: Source: Training Video Transcript - "File Structure"
