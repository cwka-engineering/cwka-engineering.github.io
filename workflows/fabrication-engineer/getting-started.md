---
layout: default
title: Getting Started
permalink: /workflows/fabrication-engineer/getting-started.html
nav_order: 1
parent: Fabrication Engineer (FE)
grand_parent: Workflows
---

# Getting Started

> **Related**: [Epicor Interaction](/workflows/fabrication-engineer/epicor-interaction.html) | [Engineering Toolkit](/workflows/fabrication-engineer/toolkit/)

## Finding Assignments
{: #how-to-find-assignments}

- Access the Epicor Submittal Dashboard via The CW site. See [Epicor Usage](/tools/epicor/#1-submittal-dashboard) for details.
- Filter by your name to view submittal/post-submittal tasks not yet released to PE.
- Understand job types (see [Glossary](/reference/glossary.html#job-types)):
  - **Engineering Jobs**: [^transcript-getting-started] Start with "E", match 1:1 with production jobs (e.g., E1094.009 corresponds with production job 1094.009). Exception: group submittals (1 submittal document feeds multiple production jobs) and engineering bucket jobs.
  - **Bucket Jobs**: [^transcript-getting-started] Project-wide tasks like design, coordination, meetings, BIM. Format: PROJ.ENG. When clocking into bucket job, select from operations: Design, Engineering, Fabrication Engineering, Lead Coordination, Project Meetings, BIM Coordination.

## Verifying Scope
{: #how-to-verify-scope}

- **Working Set Location**: [^transcript-file-structure] Working set is in `01_INCOMING_Documents > 02_Working_Set`. This contains organized contract drawings used by engineers.
- **Verify Job Number**: [^transcript-file-structure] Open the working set in Bluebeam. Use the annotations panel (blue box with three lines) to search by job number. Jump to the relevant page and confirm what's included in the scope.
- **Confirm Assignment**: After confirming scope in drawings, verify in Epicor that the submittal is assigned to you.

## PA Working Session — Required Before Work Begins
{: #how-to-schedule-pa-session}

Before doing any substantive modeling or drafting, every engineer must:

1. **Review the scope** — Study the contract drawings, specifications, and any preconstruction build strategy notes
2. **Formulate questions** — Write down questions and observations about the elements in scope
3. **Schedule a PA working session** — Request a kickoff session with the assigned Project Advisor

> **Do not begin modeling ahead of PA input.** The PA has often been engaged with the scope since the bid phase. That context must be transferred before work begins. Skipping or deferring this session is a common source of rework and misaligned details downstream.

See [Lead Engineer Responsibilities](/onboarding/lead-engineer.html#pa-working-session--mandatory-kickoff) for how this fits into the broader project structure.

## How do I set up a new project folder on Box?
{: #how-to-set-up-project-folder}

Navigate to `Box/Awarded/`. Copy the template project folder. Rename with 4-digit code + description. Populate department subfolders. See [Folder Structure](/reference/folder-structure.html) for the full hierarchy.

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

## How do I link the shared project base floorplan?
{: #how-to-link-base-floorplan}

On any multi-engineer project, the Lead Engineer will have placed a shared Rhino base floorplan in `03 Engineering/02_WORKING_Drawings_Models/02_CoverSheet_CommonPages/`. Every engineer on the project must link this file into their working model — do not create an independent floor plan from scratch.

Link it the same way as the working set: **Insert → Linked → Layer Style: Active → Block Instance**, maintaining coordinate alignment. This ensures all scope models can be combined in a Rhino worksession for clash detection at any time without additional setup.

If you cannot locate the shared base file, contact the Lead Engineer before proceeding.

## Next Steps

- Continue to [Epicor Interaction](/workflows/fabrication-engineer/epicor-interaction.html) to learn about updating job status
- Or jump to [Engineering Toolkit Setup](/workflows/fabrication-engineer/toolkit/) to begin modeling

## See Also

- [Submittal Dashboard](/tools/epicor/#1-submittal-dashboard) - Finding your assignments
- [Folder Structure](/reference/folder-structure.html) - File organization standards
- [Glossary](/reference/glossary.html) - Term definitions

## Footnotes

[^transcript-getting-started]: Source: [Training Video — "Getting Started"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQCEUKEug6xQT5MbOuegC5FTATe0eReTEDki0eO7FDWTDYg?e=G0GMA1)
[^transcript-file-structure]: Source: [Training Video — "File Structure"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQBUn2u-blEnTr4mUoVDQp-0AR23c8QP3lYzOSlGNd5sk1k?e=9FGhWb)
[^transcript-rhino8-kickoff-i]: Source: [Training Video — "Rhino 8 Kickoff Pt I"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQClvTAp_DlXSImI44GZjhPoAUjkAO2ROrfgSxu2Sy_oyQc?e=vWqkSZ)
