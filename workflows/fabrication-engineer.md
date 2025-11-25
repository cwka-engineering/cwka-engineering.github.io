---
layout: default
title: Fabrication Engineer (FE) Workflow
permalink: /workflows/fabrication-engineer.html
---

# Fabrication Engineer (FE) Workflow Outline

> **Related Documents**: [Project Delivery Overview](/overview/project-delivery.html) | [FE to PE Release SOP](/workflows/fe-to-pe-release.html) | [Epicor Usage](/tools/epicor-usage.html) | [Approvals Process](/tools/approvals-process.html)

## Table of Contents

1. [Getting Started](#i-getting-started)
2. [Epicor Interaction](#ii-epicor-interaction)
3. [Engineering Toolkit Usage](#iii-engineering-toolkit-usage)
4. [Part Naming](#iv-part-naming)
5. [Shipping Components (SCs)](#v-shipping-components-scs)
6. [Takeoffs](#vi-takeoffs)
7. [PE Release Preparation](#vii-pe-release-preparation)

## I. Getting Started

### Finding Assignments
- Access the Epicor Submittal Dashboard via The CW site. See [Epicor Usage](/tools/epicor-usage.html#1-submittal-dashboard) for details.
- Filter by your name to view submittal/post-submittal tasks not yet released to PE.
- Understand job types (see [Glossary](/overview/glossary.html#job-types)):
  - **Engineering Jobs**: Start with "E", match 1:1 with production jobs.
  - **Bucket Jobs**: Project-wide tasks like design, coordination, meetings, BIM.

### Verifying Scope
- Open the working set in Bluebeam.
- Use the annotations tool (box with three lines) to search by job number.

### Template Usage
- Download the latest FE template from DFWCWKA internal > templates.
- Save your copy following the [Folder Structure](/standards/folder-structure.html#01_fe_models) standards:
  - `awarded > [project code] > 03 Engineering > 02 Working Drawings and Models > FE Models`
- Create a folder using _PROJ.JOB_ScopeDescription format.
- Save Rhino file as Project.Job_FE_ShortDescription.

## II. Epicor Interaction

### Updating Submittal Status
- Use Epicor (West site) > Production Report. See [Epicor Usage - Production Report](/tools/epicor-usage.html#2-production-report) for details.
- Filter by your name and update submittal status after internal review.
- Status options: Submitted, Revise and Resubmit, Approved, Production Complete.

### Engineering & BOM Completion
- Check both Engineering Complete and BOM Complete boxes before release.

### Release in Epicor
- Mark job as "released" once all prep tasks are done.

## III. Engineering Toolkit Usage

### Launching Toolkit
- Open Rhino > Synapse panel > Grasshopper > Load latest FE toolkit.
- **Note**: If the toolkit doesn't appear, ensure Grasshopper is installed and the latest toolkit version is available in the shared Engineering Team folder.

### First Run Setup
- Log into Epicor via the toolkit using your Epicor credentials.
- Pull payload from Setup tab > click reset (CW logo appears when successful).
- Toolkit checks plugin versions automatically.
- **Troubleshooting**: If login fails, verify Epicor access and check with IT if credentials need updating.

### Restoring Model/Layout Space
- Use Template tab to restore model and layout spaces.

### Epicor Metadata & Submittal Scope
- Auto-assign scope from file name.
- Pull metadata: project/job description, client, quantity, issue date.
- Override values manually if needed.
- For group submittals, specify multiple job numbers.

### Project Tab
- Publish changes to populate T00 layout with Epicor schedule.
- Manually fill in architect and project address.

### Schedules Tab
- Populate G00 schedules page.

### Tags Tables & BOM
- Pull material tags from Epicor (General Material, Finish, Veneer, Solid Wood).
- BOM filters out hardware/manufactured materials by default.

### Data Table
- Review materials, quantities, approval status.
- Publish changes to update layout.

## IV. Part Naming

### Grouping & Naming
- Group polysurfaces into logical shipping components.
- Use Set Group Name for SC numbers (e.g., SC005).
- Manufactured parts use MT prefixes.
- **NOTE**: WC parts should be named just like all other parts (PROJ.JOB.SCXXX.PXXX) so they can correspond to the appropriate Shipping Component (SC). Material layer should be the WC (XXXX.WC.XXXXX). The PE team will want to _SelName to make sure all parts belong to the corresponding SC.

### Modeling Toolkit
- Generate names for active groups.
- Preview attributes: thickness, dimensions, area, volume.
- Use Shade Unique to visually verify part types.

### Publishing & Editing
- Bake attributes into metadata.
- Replace segments (e.g., job number) without affecting others.

## V. Shipping Components (SCs)

### SC List
- Use Excel template from:
  - `CWKA Team Folders > Engineering Team > PRODUCTION ENGINEERING > PE to Floor SOP > Shipping Components_Template`
- For detailed SC creation process, see [FE to PE Release - File Organization](/workflows/fe-to-pe-release.html#2-file-organization--folder-setup).

### Modeling Toolkit
- Enter SC descriptions.
- Export list for PE release.

## VI. Takeoffs

### Auto-BOM
- Preview first-pass BOM from model.

### Conditions for Takeoffs
Ensure:
- Parts are named.
- Material cache classes are offline.
- Epicor fields are filled.
- Hardware blocks use Epicor codes.
- Layer paths match FE template.

### Scrap Percentage
- Apply scrap rates (e.g., 15% for linear, 20% for area).

### Export
- Export BOM to Excel for Epicor.

### 1D Nesting
- Optimize stick lengths.
- Export cut lists and optimization text.

### 2D Nesting
- Optimize sheet usage.
- View waste graphics and refined quantity estimates.

## VII. PE Release Preparation

### Material Checks
- Confirm all materials, hardware, and vendor work are ordered and received.

### Picking Up Redlines
- Apply architect redlines to shop drawings.
- Final set becomes "For Record" sent back to architect.

### Finalizing Shop Drawings
- Ensure completeness: materials, hardware, sizes, build strategy, SCs.
- Follow [Rhino Drafting and Layouts](/standards/rhino-drafting-layouts.html) standards.
- Submit for approval using the [Approvals Process](/tools/approvals-process.html).

### Creating PE File
- Clean version: no clutter, blocks, unused layers.

### Released in Epicor
- Confirm job release before notifying team.

### Notify PE Team
- Post release in CO Production Eng chat.
- Include links to all relevant files.

## VIII. Troubleshooting

### Common Issues

**Toolkit won't connect to Epicor**
- Verify Epicor credentials are correct
- Check network connection
- Ensure Epicor site is accessible
- Contact IT if issues persist

**BOM quantities don't match model**
- Verify all parts are named correctly
- Check material cache classes are offline
- Ensure scrap percentages are appropriate
- Re-run Auto-BOM if needed

**Can't find job in Submittal Dashboard**
- Verify job is assigned to you in Epicor
- Check job status (should be Submittal or Post-Submittal)
- Contact PM or EA if job assignment is incorrect

**Shipping Components list won't export**
- Ensure all SC descriptions are entered in Modeling Toolkit
- Verify SC numbers are assigned correctly
- Check that groups are properly named

