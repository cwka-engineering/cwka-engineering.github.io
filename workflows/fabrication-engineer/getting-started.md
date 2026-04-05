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
{: #how-to-find-assignments}

- Access the Epicor Submittal Dashboard via The CW site. See [Epicor Usage](/tools/epicor/#1-submittal-dashboard) for details.
- Filter by your name to view submittal/post-submittal tasks not yet released to PE.
- Understand job types (see [Glossary](/overview/glossary.html#job-types)):
  - **Engineering Jobs**: [^transcript-getting-started] Start with "E", match 1:1 with production jobs (e.g., E1094.009 corresponds with production job 1094.009). Exception: group submittals (1 submittal document feeds multiple production jobs) and engineering bucket jobs.
  - **Bucket Jobs**: [^transcript-getting-started] Project-wide tasks like design, coordination, meetings, BIM. Format: PROJ.ENG. When clocking into bucket job, select from operations: Design, Engineering, Fabrication Engineering, Lead Coordination, Project Meetings, BIM Coordination.

## Verifying Scope
{: #how-to-verify-scope}

- **Working Set Location**: [^transcript-file-structure] Working set is in `01_INCOMING_Documents > 02_Working_Set`. This contains organized contract drawings used by engineers.
- **Verify Job Number**: [^transcript-file-structure] Open the working set in Bluebeam. Use the annotations panel (blue box with three lines) to search by job number. Jump to the relevant page and confirm what's included in the scope.
- **Confirm Assignment**: After confirming scope in drawings, verify in Epicor that the submittal is assigned to you.

## How do I set up a new project folder on Box?
{: #how-to-set-up-project-folder}

Navigate to `Box/Awarded/`. Copy the template project folder. Rename with 4-digit code + description. Populate department subfolders. See [Folder Structure](/standards/folder-structure.html) for the full hierarchy.

## How do I set up a new FE job folder?
{: #how-to-set-up-job-folder}

Navigate to `01_FE_Models/`. Copy the `_PROJ.JOB_ScopeDescription` template. Rename to your job (e.g., `1094.002_CashWrap`).

## How do I create a new Rhino file from the template?
{: #how-to-create-rhino-file}

1. Open the latest template from `DFWCWKA internal > templates`. This file is locked — do not modify it directly.[^transcript-rhino8-kickoff-i]
2. **Save As** to your job folder with correct naming: `PROJ.JOB_FE_Description.3dm`
3. See [Layout Structure — Sheet size](/standards/rhino-drafting/layout-structure.html#sheet-size-and-template) for template selection guidance.

## How do I import the working set plan into my Rhino model?
{: #how-to-import-working-set}

**Insert → Linked → Layer Style: Active → Block Instance**. Disable rotation/scale/insertion point prompts to maintain coordinate system alignment. The working set lives on the `01_CWKA-PRECON::IN-2D` layer.

## Next Steps

- Continue to [Epicor Interaction](/workflows/fabrication-engineer/epicor-interaction.html) to learn about updating job status
- Or jump to [Engineering Toolkit Setup](/workflows/fabrication-engineer/toolkit-setup.html) to begin modeling

## See Also

- [Submittal Dashboard](/tools/epicor/#1-submittal-dashboard) - Finding your assignments
- [Folder Structure](/standards/folder-structure.html) - File organization standards
- [Glossary](/overview/glossary.html) - Term definitions

## Footnotes

[^transcript-getting-started]: Source: [Training Video — "Getting Started"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQCEUKEug6xQT5MbOuegC5FTATe0eReTEDki0eO7FDWTDYg?e=G0GMA1)
[^transcript-file-structure]: Source: [Training Video — "File Structure"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQBUn2u-blEnTr4mUoVDQp-0AR23c8QP3lYzOSlGNd5sk1k?e=9FGhWb)
[^transcript-rhino8-kickoff-i]: Source: [Training Video — "Rhino 8 Kickoff Pt I"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQClvTAp_DlXSImI44GZjhPoAUjkAO2ROrfgSxu2Sy_oyQc?e=vWqkSZ)
