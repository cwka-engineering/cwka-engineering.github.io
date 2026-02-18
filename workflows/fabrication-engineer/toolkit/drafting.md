---
layout: default
title: Drafting Toolkit
permalink: /workflows/fabrication-engineer/toolkit/drafting.html
nav_order: 1
parent: Engineering Toolkit (Setup)
grand_parent: Fabrication Engineer (FE)
---

# Drafting Toolkit

> **Related**: [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html) | [Rhino Drafting Standards](/standards/rhino-drafting/)

## Restoring Model/Layout Space

- **Template Tab**: [^transcript-drafting-toolkit] Use Template tab in Drafting Toolkit to restore model and layout spaces.
- **Restore Model Space**: Pulls in and merges all latest data from the template - adds missing layers, geometry, etc. You can turn on/off specific items to restore.
- **Restore Layout Space**: Pulls in latest versions of layout pages from template. Hover over pages to see descriptions (e.g., "Master Parts List", "Fabrication Drawing", "G00 General Schedule"). Can choose specific pages to restore.
- **After Modeling Changes**: [^transcript-drafting-toolkit] Good practice - after making changes to model space (importing geometry, modeling new parts), click the reset button to ensure toolkit grabs the freshest data from model space.

## Epicor Metadata & Submittal Scope

- **Auto-Assignment**: [^transcript-drafting-toolkit] By default, toolkit automatically assigns submittal scope to match the file name (e.g., file `1091.008_FE` → scope `1091.008`). Assumes you've intentionally named the file following conventions.
- **Submittal Scope vs Actual Job Number**: [^transcript-adv-toolkit-ii] **Important distinction** - Submittal scope is what appears on all pages as page titles (e.g., "Judd.MT.7"). This may differ from the actual Epicor job number (e.g., "9194.M.004"). For catalog items or special cases, you may want submittal scope to be the catalog name while actual job pulls different metadata. If you enter actual job number, it will pre-populate metadata but may not print correct name on pages.
- **Metadata Fields**: [^transcript-drafting-toolkit] These fields control variables that populate throughout drawings:
  - Submittal scope (auto-assigned from filename, or manually set)
  - Project/job description (pulled from Epicor if job number entered, or manually filled)
  - Client (pulled from Epicor if job number entered, or manually filled)
  - Quantity (pulled from Epicor if job number entered, or manually filled)
  - Issue date (pulled from Epicor if job number entered, or manually filled)
- **Manual Override**: Override values manually if needed. For catalog items, you may need to manually fill all fields.
- **Group Submittals**: Specify multiple job numbers for group submittals.
- **Default View**: [^transcript-drafting-toolkit] Setup tab shows Epicor metadata expanded by default, submittal scope hidden (can expand/collapse as needed).

## Project Tab

- Publish changes to populate **T00** layout with Epicor schedule.
- Manually fill in architect and project address.

## Schedules Tab

- Populate **G00** schedules page.

## Tags Tables & BOM

- Pull material tags from Epicor (General Material, Finish, Veneer, Solid Wood).
- BOM filters out hardware/manufactured materials by default.

## Data Table

- Review materials, quantities, approval status.
- Publish changes to update layout.

## Footnotes
[^transcript-drafting-toolkit]: Source: Training Video Transcript - "Drafting Toolkit"
[^transcript-adv-toolkit-ii]: Source: Training Video Transcript - "Adv. Toolkit Functions II"
