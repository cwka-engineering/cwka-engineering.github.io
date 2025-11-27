---
layout: default
title: Fabrication Engineer (FE) Workflow
permalink: /workflows/fabrication-engineer.html
---
# Fabrication Engineer (FE) Workflow Outline

> **Related Documents**: [Project Delivery Overview](/overview/project-delivery.html) | [FE to PE Release SOP](/workflows/fe-to-pe-release.html) | [Epicor Usage](/tools/epicor-usage.html) | [Approvals Process](/tools/approvals-process.html)

## Table of Contents

1.  [Getting Started](#i-getting-started)
    
2.  [Epicor Interaction](#ii-epicor-interaction)
    
3.  [Engineering Toolkit Usage](#iii-engineering-toolkit-usage)
    
4.  [Part Naming](#iv-part-naming)
    
5.  [Shipping Components (SCs)](#v-shipping-components-scs)
    
6.  [Takeoffs](#vi-takeoffs)
    
7.  [PE Release Preparation](#vii-pe-release-preparation)
    

## I. Getting Started

### Finding Assignments

*   Access the Epicor Submittal Dashboard via The CW site. See [Epicor Usage](/tools/epicor-usage.html#1-submittal-dashboard) for details.
    
*   Filter by your name to view submittal/post-submittal tasks not yet released to PE.
    
*   Understand job types (see [Glossary](/overview/glossary.html#job-types)):
    
    *   **Engineering Jobs**: \[^transcript-getting-started\] Start with "E", match 1:1 with production jobs (e.g., E1094.009 corresponds with production job 1094.009). Exception: group submittals (1 submittal document feeds multiple production jobs) and engineering bucket jobs.
        
    *   **Bucket Jobs**: \[^transcript-getting-started\] Project-wide tasks like design, coordination, meetings, BIM. Format: PROJ.ENG. When clocking into bucket job, select from operations: Design, Engineering, Fabrication Engineering, Lead Coordination, Project Meetings, BIM Coordination.
        

\[^transcript-getting-started\]: Source: Training Video Transcript - "Getting Started"

### Verifying Scope

*   **Working Set Location**: \[^transcript-file-structure\] Working set is in `01_INCOMING_Documents > 02_Working_Set`. This contains organized contract drawings used by engineers.
    
*   **Verify Job Number**: \[^transcript-file-structure\] Open the working set in Bluebeam. Use the annotations tool (box with three lines) to search by job number. Confirm what's included in the scope for that job number by checking the drawings.
    
*   **Confirm Assignment**: After confirming scope in drawings, verify in Epicor that the submittal is assigned to you.
    

### Template Usage

*   **Template Location**: \[^transcript-file-structure\] Download the latest FE template from `DFWCWKA internal > templates`. This file is locked and should only be updated by designated personnel.
    
*   **Save Your Copy**: \[^transcript-file-structure\]
    
    *   Open the template
        
    *   Save as a copy in the project folder following [Folder Structure](/standards/folder-structure.html#01_fe_models) standards:
        
        *   `awarded > [project code] > 03 Engineering > 02 Working Drawings and Models > FE Models`
            
    *   Create a new folder using `_PROJ.JOB_ScopeDescription` format (copy from template folder)
        
    *   Save Rhino file as `Project.Job_FE_ShortDescription`
        

\[^transcript-file-structure\]: Source: Training Video Transcript - "File Structure"

## II. Epicor Interaction

### Updating Submittal Status

*   Use Epicor (West site) > Production Report. See [Epicor Usage - Production Report](/tools/epicor-usage.html#2-production-report) for details.
    
*   Filter by your name and update submittal status after internal review.
    
*   Status options: Submitted, Revise and Resubmit, Approved, Production Complete.
    

### Engineering & BOM Completion

*   Check both Engineering Complete and BOM Complete boxes before release.
    

### Release in Epicor

*   Mark job as "released" once all prep tasks are done.
    

## III. Engineering Toolkit Usage

### Launching Toolkit

*   Open Rhino > Synapse panel > Grasshopper > Load latest FE toolkit. \[^transcript-toolkit-setup\]
    
*   **Location**: Navigate to `DFWCWKA internal > Engineering resource > shared GH for Grasshopper > FE Engineering Toolkit`
    
*   **Note**: If the toolkit doesn't appear, ensure Grasshopper is installed and the latest toolkit version is available in the shared Engineering Team folder.
    
*   **First Time Opening**: \[^transcript-toolkit-setup\] The toolkit will take a minute to load on first open - there's a loading bar in the Grasshopper canvas as Python components pull required libraries.
    
*   **Save Personal Copy**: After opening, save the toolkit with your initials (e.g., `FE_Toolkit_JD.gh`) to your preferred location. This becomes your personal copy.
    

\[^transcript-toolkit-setup\]: Source: Training Video Transcript - "Toolkit Setup"

### First Run Setup

*   **Plugin Requirements**: \[^transcript-toolkit-setup\] Starting with Rhino 8, use the built-in Package Manager (run command `PackageManager`) to install required plugins. The toolkit requires specific plugins - if you try to launch without them, it will fail and show a reset button listing required plugins.
    
*   **Required Plugin**: Synapse - allows custom UI within Rhino. The Synapse panel must be in the foreground when launching Grasshopper.
    
*   **Login**: \[^transcript-toolkit-setup\] Type your Epicor username, hit enter (caches username). Enter password, hit enter (caches password). Both are cached to disk for future use.
    
*   **Pull Payload**: \[^transcript-toolkit-setup\] On first run only - go to Setup tab, expand "Toolkit Payload", click "Pull Payload" to download CW/DFW-specific information from server. Wait for CW logo to appear in reset button.
    
*   **Reset**: \[^transcript-toolkit-setup\] Click reset button (always shows an error - ignore it). Reset will verify plugin versions and show list of required plugins if any are missing. When complete, username and password will be hidden (cached).
    
*   **Troubleshooting**: If login fails, verify Epicor access and check with IT if credentials need updating.
    

### Restoring Model/Layout Space

*   **Template Tab**: \[^transcript-drafting-toolkit\] Use Template tab in Drafting Toolkit to restore model and layout spaces.
    
*   **Restore Model Space**: Pulls in and merges all latest data from the template - adds missing layers, geometry, etc. You can turn on/off specific items to restore.
    
*   **Restore Layout Space**: Pulls in latest versions of layout pages from template. Hover over pages to see descriptions (e.g., "Master Parts List", "Fabrication Drawing", "G00 General Schedule"). Can choose specific pages to restore.
    
*   **After Modeling Changes**: \[^transcript-drafting-toolkit\] Good practice - after making changes to model space (importing geometry, modeling new parts), click the reset button to ensure toolkit grabs the freshest data from model space.
    

\[^transcript-drafting-toolkit\]: Source: Training Video Transcript - "Drafting Toolkit"

### Epicor Metadata & Submittal Scope

*   **Auto-Assignment**: \[^transcript-drafting-toolkit\] By default, toolkit automatically assigns submittal scope to match the file name (e.g., file `1091.008_FE` → scope `1091.008`). Assumes you've intentionally named the file following conventions.
    
*   **Submittal Scope vs Actual Job Number**: \[^transcript-adv-toolkit-ii\] **Important distinction** - Submittal scope is what appears on all pages as page titles (e.g., "Judd.MT.7"). This may differ from the actual Epicor job number (e.g., "9194.M.004"). For catalog items or special cases, you may want submittal scope to be the catalog name while actual job pulls different metadata. If you enter actual job number, it will pre-populate metadata but may not print correct name on pages.
    
*   **Metadata Fields**: \[^transcript-drafting-toolkit\] These fields control variables that populate throughout drawings:
    
    *   Submittal scope (auto-assigned from filename, or manually set)
        
    *   Project/job description (pulled from Epicor if job number entered, or manually filled)
        
    *   Client (pulled from Epicor if job number entered, or manually filled)
        
    *   Quantity (pulled from Epicor if job number entered, or manually filled)
        
    *   Issue date (pulled from Epicor if job number entered, or manually filled)
        
*   **Manual Override**: Override values manually if needed. For catalog items, you may need to manually fill all fields.
    
*   **Group Submittals**: Specify multiple job numbers for group submittals.
    
*   **Default View**: \[^transcript-drafting-toolkit\] Setup tab shows Epicor metadata expanded by default, submittal scope hidden (can expand/collapse as needed).
    

\[^transcript-adv-toolkit-ii\]: Source: Training Video Transcript - "Adv. Toolkit Functions II"

### Project Tab

*   Publish changes to populate T00 layout with Epicor schedule.
    
*   Manually fill in architect and project address.
    

### Schedules Tab

*   Populate G00 schedules page.
    

### Tags Tables & BOM

*   Pull material tags from Epicor (General Material, Finish, Veneer, Solid Wood).
    
*   BOM filters out hardware/manufactured materials by default.
    

### Data Table

*   Review materials, quantities, approval status.
    
*   Publish changes to update layout.
    

### Parts List Tab

*   **L00 - Master Parts List**: \[^transcript-adv-toolkit\] Standardized format for parts schedules within drawing sets. This is a targeted parts list (e.g., for metal shop) - not the comprehensive master parts list Excel that PE creates. Use when you need a parts schedule in the drawing set in addition to Excel.
    
*   **L001 - Pick List**: \[^transcript-adv-toolkit\] Backend model space page for BOM information while working on scope. Not typically printed for external audience - primarily for FE engineer's use during design. Facilitates takeoffs and BOM tracking.
    
*   **Functionality**: \[^transcript-adv-toolkit\] Parts list tab reads out all attributes calculated during naming step and displays them on the page. For manufactured parts (MT/WC), use Manufactured Part mode during naming to get additional analysis (cuts on left/right ends, shape, diagrammatic view of length relative to other parts).
    
*   **Export Options**: \[^transcript-adv-toolkit\] Can export master parts list directly to Excel (exports to same folder as Rhino file). PE can also use this feature to output master parts list Excel instead of printing on page.
    

\[^transcript-adv-toolkit\]: Source: Training Video Transcript - "Adv. Toolkit Functions"

## IV. Part Naming

### Grouping & Naming

*   **Grouping First**: \[^transcript-adv-toolkit-ii\] Parts must be grouped into logical groups based on how they need to be sent to shop or field before naming.
    
*   **Group Names**: \[^transcript-adv-toolkit-ii\] Use Set Group Name for SC numbers (e.g., SC005). For MT parts, you can use MT prefix (e.g., "MT7") - the integer is important, but prefix can vary. Using SC or MT is most sensible since that's what it will be at the end.
    
*   **Blocks Don't Show**: \[^transcript-adv-toolkit-ii\] If parts are imported as blocks, they won't show up in "Select Name" list because it queries geometry actually in the document, not block definitions. You must explode blocks or work with geometry directly.
    
*   **MT Parts in Parent Jobs**: \[^transcript-adv-toolkit-ii\] When incorporating MT parts into a parent job, **do not rename them**. MT parts keep their original names (e.g., "9194.SC005.P678910") for clarity when carried into parent jobs.
    
*   Manufactured parts use MT prefixes.
    
*   **NOTE**: WC parts should be named just like all other parts (PROJ.JOB.SCXXX.PXXX) so they can correspond to the appropriate Shipping Component (SC). Material layer should be the WC (XXXX.WC.XXXXX). The PE team will want to \_SelName to make sure all parts belong to the corresponding SC.
    

\[^transcript-adv-toolkit-ii\]: Source: Training Video Transcript - "Adv. Toolkit Functions II"

### Modeling Toolkit

*   **Material Search**: \[^transcript-modeling-toolkit\] First tab in Modeling Toolkit provides material search functionality:
    
    *   **Forward Lookup**: When you know a part number and want to find its details
        
    *   **Reverse Lookup**: When you know details (class, description, dimensions) and want to find the part number
        
    *   Enter separated terms (e.g., "plywood", "three quarter", "96 inches") to narrow results
        
    *   Descriptions are normalized to inches format
        
    *   Check box to pass value to forward lookup as hint
        
*   **Part Naming**: \[^transcript-modeling-toolkit\]
    
    *   Generate names for active groups
        
    *   Preview attributes: thickness, dimensions, area, volume
        
    *   Use Shade Unique to visually verify part types
        
*   **Material Caching**: \[^transcript-modeling-toolkit\] When you select a material, toolkit caches data from Epicor including description and dimension-specific fields that provide precise measurements.
    

\[^transcript-modeling-toolkit\]: Source: Training Video Transcript - "Modeling Toolkit"

### Publishing & Editing

*   Bake attributes into metadata.
    
*   **Replace Name Segments**: \[^transcript-adv-toolkit\] Use "Replace Name Segments" tab to change specific segments of part names without affecting others. For example, if job number changes from 8 to 12, you can update just that segment while keeping shipping component numbers and P numbers intact. Useful when reusing similar designs across multiple projects.
    
*   **Manufactured Part Mode**: \[^transcript-adv-toolkit-ii\] For MT (Metal) parts, toggle to "Manufactured Part mode" in Part Naming tab. This triggers additional geometry analysis (cuts on ends, shape analysis, length comparisons). After using this mode, remember to turn it off when done - it doesn't automatically turn off.
    

\[^transcript-adv-toolkit\]: Source: Training Video Transcript - "Adv. Toolkit Functions" \[^transcript-adv-toolkit-ii\]: Source: Training Video Transcript - "Adv. Toolkit Functions II"

## V. Shipping Components (SCs)

### SC List

*   Use Excel template from:
    
    *   `CWKA Team Folders > Engineering Team > PRODUCTION ENGINEERING > PE to Floor SOP > Shipping Components_Template`
        
*   For detailed SC creation process, see [FE to PE Release - File Organization](/workflows/fe-to-pe-release.html#2-file-organization--folder-setup).
    

### Modeling Toolkit

*   **Enter SC Descriptions**: \[^transcript-adv-toolkit\] After naming parts, toolkit identifies shipping components. You must provide descriptions for each SC (e.g., "spacer", "base carcass", "seat cushion", "back cushion"). Publish changes to document, then export shipping component list directly for PE release.
    
*   **Future Enhancement**: \[^transcript-adv-toolkit\] Work in progress to add button that directly publishes to UD40IN Epicor, eliminating need for PE to manually enter SC data.
    
*   Export list for PE release.
    

\[^transcript-adv-toolkit\]: Source: Training Video Transcript - "Adv. Toolkit Functions"

## VI. Takeoffs

### Auto-BOM

*   **Purpose**: \[^transcript-adv-toolkit\] Provides first-pass BOM approximation based on model geometry. **Not guaranteed to be correct** - it's a starting point for refinement.
    
*   **How It Works**: \[^transcript-adv-toolkit\] Contacts Epicor to find dimension-specific fields, then does first-order rough takeoff based on lengths and widths recorded in each part during naming.
    
*   **Output Location**: \[^transcript-adv-toolkit\] Published changes go to L001 page (pick list) user text. Can export to Excel file (formatted for paste-insert directly into Epicor BOM).
    

### Conditions for Takeoffs

**All of the following must be met to use Auto-BOM**: \[^transcript-adv-toolkit\]

*   All model parts must have been named using the Generate Names Toolkit tab (not manually named)
    
*   All material cache classes must be cached on the Reverse Lookup Toolkit tab (all six classes)
    
*   All materials in use must have fully qualified Epicor dimension fields (not just descriptions - must have dimension-specific fields like "48 inches", "3/4 inch thick")
    
*   All hardware block names must begin with Epicor or material code (if you use script to embed definitions, they will)
    
*   All layer paths must conform to FE template standards (if you use toolkit to create material codes, they will)
    

### Scrap Percentage

*   **Purpose**: \[^transcript-adv-toolkit\] Apply scrap rates to account for material waste since Auto-BOM is only a first approximation.
    
*   **Usage**: \[^transcript-adv-toolkit\] Can set different scrap percentages for different material types:
    
    *   Linear footage materials (e.g., 15% scrap)
        
    *   Area-based materials (e.g., 20% scrap)
        
*   **Result**: Updates BOM numbers in the preview table. Review before publishing.
    

### Export

*   Export BOM to Excel for Epicor (formatted for paste-insert).
    

### 1D Nesting

*   **Purpose**: \[^transcript-adv-toolkit\] Refine takeoff for materials bombed per length (e.g., fabric, WC parts). Shows optimization of parts within stick lengths.
    
*   **Workflow**: \[^transcript-adv-toolkit\]
    
    1.  Select material that is bombed per length
        
    2.  Select job
        
    3.  Choose stick length (default 8 feet, can try 10, 12, etc.)
        
    4.  Show optimization - displays parts placed within sticks with waste per stick shown in red
        
    5.  View overall waste percentage
        
*   **Considerations**: \[^transcript-adv-toolkit\] Stick length selection must be done in coordination with purchasing and shop - FE is not ultimately the person who selects stick length. This tool provides information to give to purchaser (e.g., Bill Carr for wood, EN for metal).
    
*   **Export Options**: \[^transcript-adv-toolkit\]
    
    *   Cut list of specific lengths (quantity of each cut length with part numbers)
        
    *   Text representation of optimization (stick-by-stick cutting sequence for best yield)
        
*   **Note**: \[^transcript-adv-toolkit\] Optimized cut lists may not match how shop actually functions (shop often cuts all same length at once for labor efficiency). Use when material value justifies the trade-off.
    

### 2D Nesting

*   **Purpose**: \[^transcript-adv-toolkit\] Refine takeoff for sheet goods. Shows optimization of parts within sheets.
    
*   **Workflow**: \[^transcript-adv-toolkit\]
    
    1.  Select material (width and length pre-populated from Epicor)
        
    2.  Select job
        
    3.  Show optimization - displays graphic representation of waste per sheet and overall waste
        
*   **Refinement**: \[^transcript-adv-toolkit\] Auto-BOM may estimate 4.75 sheets based on area, but 2D nesting shows actual waste and may reveal you need 7 sheets minimum. This refines the BOM quantities.
    
*   **Integration**: \[^transcript-adv-toolkit\] After refinement, Auto-BOM will indicate which rows have been refined. Publish changes to update BOM with refined quantities.
    

\[^transcript-adv-toolkit\]: Source: Training Video Transcript - "Adv. Toolkit Functions"

## VII. PE Release Preparation

### Material Checks

*   Confirm all materials, hardware, and vendor work are ordered and received.
    

### Picking Up Redlines

*   Apply architect redlines to shop drawings.
    
*   Final set becomes "For Record" sent back to architect.
    

### Finalizing Shop Drawings

*   Ensure completeness: materials, hardware, sizes, build strategy, SCs.
    
*   Follow [Rhino Drafting and Layouts](/standards/rhino-drafting-layouts.html) standards.
    
*   Submit for approval using the [Approvals Process](/tools/approvals-process.html).
    

### Creating PE File

*   Clean version: no clutter, blocks, unused layers.
    

### Released in Epicor

*   Confirm job release before notifying team.
    

### Notify PE Team

*   Post release in CO Production Eng chat.
    
*   Include links to all relevant files.
    

## VIII. Troubleshooting

### Common Issues

**Toolkit won't connect to Epicor**

*   Verify Epicor credentials are correct
    
*   Check network connection
    
*   Ensure Epicor site is accessible
    
*   Contact IT if issues persist
    

**BOM quantities don't match model**

*   Verify all parts are named correctly
    
*   Check material cache classes are offline
    
*   Ensure scrap percentages are appropriate
    
*   Re-run Auto-BOM if needed
    

**Can't find job in Submittal Dashboard**

*   Verify job is assigned to you in Epicor
    
*   Check job status (should be Submittal or Post-Submittal)
    
*   Contact PM or EA if job assignment is incorrect
    

**Shipping Components list won't export**

*   Ensure all SC descriptions are entered in Modeling Toolkit
    
*   Verify SC numbers are assigned correctly
    
*   Check that groups are properly named