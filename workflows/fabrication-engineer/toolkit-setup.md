---
layout: default
title: Engineering Toolkit
permalink: /workflows/fabrication-engineer/toolkit-setup.html
nav_order: 3
parent: Fabrication Engineer
grand_parent: Workflows
---

# Engineering Toolkit

> **Related**: [Part Naming](/workflows/fabrication-engineer/part-naming.html) | [Shipping Components](/workflows/fabrication-engineer/shipping-components.html)

## Launching Toolkit

- Open Rhino > Synapse panel > Grasshopper > Load latest FE toolkit. [^transcript-toolkit-setup]
- **Location**: Navigate to `DFWCWKA internal > Engineering resource > shared GH for Grasshopper > FE Engineering Toolkit`
- **Note**: If the toolkit doesn't appear, ensure Grasshopper is installed and the latest toolkit version is available in the shared Engineering Team folder.
- **First Time Opening**: [^transcript-toolkit-setup] The toolkit will take a minute to load on first open - there's a loading bar in the Grasshopper canvas as Python components pull required libraries.
- **Save Personal Copy**: After opening, save the toolkit with your initials (e.g., `FE_Toolkit_JD.gh`) to your preferred location. This becomes your personal copy.

## First Run Setup

- **Plugin Requirements**: [^transcript-toolkit-setup] Starting with Rhino 8, use the built-in Package Manager (run command `PackageManager`) to install required plugins. The toolkit requires specific plugins - if you try to launch without them, it will fail and show a reset button listing required plugins.
- **Required Plugin**: Synapse - allows custom UI within Rhino. The Synapse panel must be in the foreground when launching Grasshopper.
- **Login**: [^transcript-toolkit-setup] Type your Epicor username, hit enter (caches username). Enter password, hit enter (caches password). Both are cached to disk for future use.
- **Pull Payload**: [^transcript-toolkit-setup] On first run only - go to Setup tab, expand "Toolkit Payload", click "Pull Payload" to download CW/DFW-specific information from server. Wait for CW logo to appear in reset button.
- **Reset**: [^transcript-toolkit-setup] Click reset button (always shows an error - ignore it). Reset will verify plugin versions and show list of required plugins if any are missing. When complete, username and password will be hidden (cached).
- **Troubleshooting**: If login fails, verify Epicor access and check with IT if credentials need updating.

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

- Publish changes to populate T00 layout with Epicor schedule.
- Manually fill in architect and project address.

## Schedules Tab

- Populate G00 schedules page.

## Tags Tables & BOM

- Pull material tags from Epicor (General Material, Finish, Veneer, Solid Wood).
- BOM filters out hardware/manufactured materials by default.

## Data Table

- Review materials, quantities, approval status.
- Publish changes to update layout.

## Parts List Tab

- **L00 - Master Parts List**: [^transcript-adv-toolkit] Standardized format for parts schedules within drawing sets. This is a targeted parts list (e.g., for metal shop) - not the comprehensive master parts list Excel that PE creates. Use when you need a parts schedule in the drawing set in addition to Excel.
- **L001 - Pick List**: [^transcript-adv-toolkit] Backend model space page for BOM information while working on scope. Not typically printed for external audience - primarily for FE engineer's use during design. Facilitates takeoffs and BOM tracking.
- **Functionality**: [^transcript-adv-toolkit] Parts list tab reads out all attributes calculated during naming step and displays them on the page. For manufactured parts (MT/WC), use Manufactured Part mode during naming to get additional analysis (cuts on left/right ends, shape, diagrammatic view of length relative to other parts).
- **Export Options**: [^transcript-adv-toolkit] Can export master parts list directly to Excel (exports to same folder as Rhino file). PE can also use this feature to output master parts list Excel instead of printing on page.

## Next Steps

- Continue to [Part Naming](/workflows/fabrication-engineer/part-naming.html) to learn naming conventions
- Or jump to [Takeoffs](/workflows/fabrication-engineer/takeoffs.html) for BOM generation

## See Also

- [Rhino Drafting Standards](/standards/rhino-drafting/) - Layout conventions
- [Layer Organization](/standards/layer-organization/) - Layer structure

## Footnotes

[^transcript-toolkit-setup]: Source: Training Video Transcript - "Toolkit Setup"
[^transcript-drafting-toolkit]: Source: Training Video Transcript - "Drafting Toolkit"
[^transcript-adv-toolkit]: Source: Training Video Transcript - "Adv. Toolkit Functions"
[^transcript-adv-toolkit-ii]: Source: Training Video Transcript - "Adv. Toolkit Functions II"
