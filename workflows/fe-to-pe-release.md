---
layout: default
title: FE to PE Release Procedure
permalink: /workflows/fe-to-pe-release.html
parent: Workflows
nav_order: 3
corpus_tags: [fe-release]
---

# FE to PE Release

> **Related**: [Project Delivery — Phase 3](/onboarding/project-delivery.html#phase-3-fe-release-to-production-engineering-pe-handoff) | [Rhino Drafting](/standards/rhino-drafting/) | [Layer Organization](/standards/layer-organization/) | [Epicor Job Management](/tools/epicor/job-management.html) | [Glossary](/reference/glossary.html)

## How do I set up the PE release folder?
{: #how-to-setup-release-folder}

Navigate to `03_PE_Releases` in the project's Engineering folder. Copy the template folder `_PROJ.JOB_ScopeDescription` and rename it (e.g., `1102.011_Maitre D Stand`). Subfolders include `Production_Files` (Rhino PE model, SC list) and `Production_Drawings` (PDF drawing set).

## How do I set up a manufactured parts (MFG) folder?
{: #how-to-setup-mfg-folder}

If releasing a manufacturing job, create `00_MT_WC_IP_MfgParts` inside the release folder if not already present. Place MFG part files here using the naming convention: `PROJ.MT.XXXXX_PE.3dm` or `PROJ.WC.XXXXX_PE.3dm`.

## How do I clean and prepare the PE Rhino file?
{: #how-to-clean-pe-file}

Run **Purge** (remove unused blocks, layers, styles), **SelDup** (remove duplicates), **SelBadObjects** and **SelOpenPolysrf** (fix geometry issues), **SelExtrusion** + **ConvertExtrusion** (convert extrusions to polysurfaces). Remove all layouts unless required. Verify part name uniqueness with **SelName**. Name the file `[EpicorCode]_PE_YYYYMMDD.3dm`.

## How do I upload shipping components to Epicor?
{: #how-to-upload-scs}

Navigate to **UD40** (or **UD37** for CMG). Copy ProjectID, JobNum, SC PartNum, Description, and Order Qty columns from the SC Excel file (excluding headers). Right-click in the workbench → **Paste New**. Click **Update** and refresh. Open the **Project** filter to confirm records processed.

## How do I complete the Epicor release process?
{: #how-to-epicor-release}

In **Job Entry**, for each BOM line verify: **Engineering Complete** checked, **Fixed Quantity** checked (unless catalog), **Make Direct** for MFG parts, all materials have a Part Master. Append any engineering comments to the part description. Check **BOM Complete**, then click **Release**.

## How do I submit the FE to PE Release form?
{: #how-to-submit-release-form}

Access the form via the Engineering Team SharePoint. Fill in: your name, project number/name, all job numbers, key part numbers, site of fabrication, Windows Explorer file paths (not Box links), and notes (included MFG jobs, handoff meeting requests, late-start coordination). Tag the assigned PM in the resulting channel post.

## How do I handle a late release (after scheduled start date)?
{: #how-to-handle-late-release}

Coordinate with adjacent departments before submitting. State the coordination in the release form **Notes** field. The late release impacts the [Scheduling Chain](/onboarding/scheduling-chain.html) — downstream operations may need rescheduling.

## How do I request a handoff meeting with PE?
{: #how-to-request-handoff-meeting}

A handoff meeting is mandatory when: custom tooling/dies are needed, oversized parts require special nesting, complex "By Others" integration exists, or details deviate from company norms. Request the meeting in the FE to PE Release form **Notes** field. PE may also request a meeting after file review.

This page has two parts: a **pre-release checklist** (what must be true before you mark the job **Released** in Epicor and submit the **FE to PE Release** form) and a **step-by-step procedure** (how to organize files, update Epicor, and notify the team). Complete the checklist first, then follow the procedure.

---

## Pre-release checklist
{: #pre-release-checklist}

> **Run the [FE Release Diagnostic Tool](/tools/diagnostic.html) before certifying this checklist.** The tool automatically validates approximately 70% of the items below and must be run on every PE release handoff file. Address all failures before proceeding. The diagnostic can also be launched directly from the Engineering Toolkit against your currently open file.

By marking **Released** in Epicor and completing the **FE to PE Release** form in the dedicated channel, you certify that your deliverables meet the requirements below (aligned with department standards).

### Approval prerequisites
{: #approval-prerequisites}

- **Build strategy**: Project Advisor has reviewed and approved; **PA Approved** is checked in Epicor where applicable.
- **Client review**: The client has reviewed the submittal (drawings, models, mockups, samples) and approved; **Submittal Status** is set to **Approved** in Epicor, and **Submitted Date** reflects the last submittal or resubmittal.

### 1. Rhino model geometry and hygiene
{: #checklist-rhino-geometry}

For command-level detail, see [Rhino Drafting](/standards/rhino-drafting/) and [Part Naming](/workflows/fabrication-engineer/part-naming.html).

- **Cleanup**: Run **Purge** to remove unused blocks, layers, and styles; run **SelDup** to remove duplicate geometry. No layouts (and no layout-only layers/blocks) in the release file unless required by standards. No empty layers. No nested "assembly" blocks that violate release conventions.
- **Object integrity**: No bad objects (**SelBadObjects**), no open polysurfaces (**SelOpenPolysrf**), no extrusions where polysurfaces are required (**SelExtrusion**); use **ConvertExtrusion** where needed.
- **Part name uniqueness**: Unlike geometries must not share the same part name. Use **SelName** and step through names so each name refers only to identical parts (or a single part). If two unlike parts shared a name, split names using the next unused **P###** in the series for the shipping component.
- **Naming conventions**: File name, polysurface, and block names match team standards and Epicor/database compatibility. Hardware blocks use bracketed hardware tags; manufactured linked blocks follow MFG part format. **UserText**: Standard document and object keys (thickness, volume, project ID, etc.) are populated via the [Engineering Toolkit](/workflows/fabrication-engineer/toolkit/).
- **Material thickness**: Modeled thickness matches physical materials within company tolerances; confirm stock-on-hand thicknesses with Production Management when needed. Commonly used materials should have thicknesses recorded in Epicor part attributes for reference. Non-finish-grade plywood ("shop ply") is typically undersized relative to nominal — model undersized per historical trends (e.g. 0.75" nominal shop ply modeled at 0.72"). Dimensionally stable materials (MDF, MDO) and custom sheet goods (pre-lam layups, etc.) are typically within tolerance and modeled at nominal. Any uncommon or specialty sheet good must be checked with a micrometer. See [Material Modeling](/standards/layer-organization/material-modeling.html) for the 3/4" plywood exception, [Actual Material Thicknesses](/reference/reference-tables/actual-material-thicknesses.html) for other known nominal-vs-actual discrepancies, and team practice for anything not yet on that list.
- **Bent metal**: Correct inside bend radius and thickness; 2D flat patterns/unfolds include appropriate bend deductions.

### 2. Layering and organization
{: #checklist-layers}

See [Layer Organization](/standards/layer-organization/) and [Codes & Tags](/standards/layer-organization/codes-and-tags.html).

- Layer names begin with the material tag pattern required for BOM alignment (e.g. **03_CWKA-FE::PUR::…** / **MFG** parent structure as documented). Handoff layers live under the correct FE PUR/MFG parents; **CON** reference data on **03_CWKA-FE::CON** as applicable.
- Purge construction-only geometry from the release file. "By Others" geometry may remain when it drives machining coordination.

### 3. ERP, BOM, and material validation
{: #checklist-bom-erp}

See [Epicor Job Management](/tools/epicor/job-management.html), [Takeoffs](/workflows/fabrication-engineer/takeoffs.html), and [Part Management](/tools/epicor/part-management.html).

- **BOM sync**: Every material tag used in the Rhino model appears on the Epicor BOM; cross-check tags in the model against the BOM.
- **Parts master**: Every BOM line ties to a row in Epicor **Parts** (no improvised "part-on-the-fly" lines). Request global materials via the [Part Requests workflow](/tools/releases-and-requests/part-requests/engineer-guide.html); project-specific and manufactured parts via Part Entry as per process. Allow for **24-hour** sync where applicable.
- **Related operation**: Each material is assigned to the correct **Rel Opr.** (Related Operation). Post-release BOM changes must be flagged with **Added Mtl** per Epicor practice.
- **Takeoffs**: BOM gross quantities and board footage follow company standards; solid lumber (SL) minimum dimensions belong in the material description where required.
- **Fixed quantity**: **Fixed QTY** is verified for each material **except** where CMG rules differ—so parent job quantity does not incorrectly multiply materials.
- BOM quantities reflect minimum material required for the build strategy — no bulk overage added. Overage is a PM/Purchasing decision applied at the project INV job level. See [Overage, Extras & Process Waste](/workflows/fabrication-engineer/overage-and-extras.html).

### 4. Production readiness and tooling
{: #checklist-production-tooling}

See [Shipping Components](/workflows/fabrication-engineer/shipping-components.html).

- **Shipping components**: Model is split into shipping units. A shipping component is a completed rigid assembly that leaves the shop with one tag. Multiples of **like** geometry may share one SC; **unlike** loose parts cannot share a single SC number.
- **Assembled, not exploded**: The release model must be modeled **assembled and grouped by shipping component** — not exploded for visualization. An exploded model doesn't match a physical SC and breaks the SC-to-geometry correspondence PE relies on.
- **ERP upload**: Upload the shipping components list to **UD40** (Shipping Components — Kinetic workbench), or **UD37** for **CMG** jobs. Names and quantities must match the model.
- **Tooling**: Verify shop bed sizes (e.g. NY CNC 5×12, metal laser 5×10), site drill conventions, and for laser: hole diameter not smaller than material thickness. Support PM/Purchasing to order new dies or custom tooling before job start when needed.
- **Nesting**: Parts fit within sheet rules—not the full nominal sheet is nestable. Use **1/2"** perimeter clear for wood CNC; **greater of 1/4" or material thickness** for metal laser unless otherwise specified.
- **Manufactured part jobs**: Coordinate with the Project Advisor (PA); submit the Job Request Form, create folders, and remember MFG jobs can release ahead of parent jobs.

### 5. Final handoff and documentation
{: #checklist-final-handoff}

- **PE Rhino file names** (prefix before `_PE`):  
  - **Standard job**: `PROJ.NUM` — e.g. `1105.007_PE.3dm`, `1105.007_PE_20250124.3dm`  
  - **Manufactured part**: `PROJ.MT` or `PROJ.WC` + five-digit part — e.g. `1103.MT.00004_PE.3dm`  
  - **Catalog item**: two-character account + two-character category + three digits — e.g. `CM.BE.001_PE.3dm`  
  - **Catalog manufactured part**: account + MT or WC + five digits — e.g. `CM.MT.00005_PE.3dm`  
  - **Isodate** after `_PE` when using date form: `PROJ.JOB_PE_20250124.3dm`
- **File organization**: Move the purged PE Rhino file to `03_PE_Releases/PROJ.JOB/Production_Files`. Copy the full PDF fabrication set (including finish/material schedules) to `Production_Drawings`. Also copy any ancillary documents PE needs to successfully process the job — see below.
- **Ancillary documents**: Any document outside the standard submittal set that PE requires to process the job must be copied into `Production_Drawings` alongside the drawing set. Examples include veneer takeoff drawings, hardware cut sheets for non-standard components, or specialty fabrication references. These documents may also exist in their canonical location elsewhere in the project folder (e.g. `04 Purchasing/02_Approved Part Drawings`) — copy them; do not rely on PE to locate them independently.
- **Geometry state**: Model reflects geometry as it comes **off the machine** (e.g. sharp corners where round-overs are bench-applied).
- **PDFs**: Prefer **vector** PDFs where possible; each shipping component called out clearly on drawings.
- **Epicor (job level)**: **Engineering Complete** checked per material after quantity/part verification; **BOM Complete** and **Field Dimensions Received** complete; **Fabrication Engineer** (may appear as **Production Team** on Job Entry) set to your name.

### Communication and handoff meeting
{: #communication-handoff-meeting}

- Submit the **FE to PE Release** form and **tag the assigned PM** in the resulting channel post.
- If release is **after** the scheduled start date, coordinate with adjacent departments and state that coordination in the release post **Notes**.
- **Mandatory handoff meeting** when any apply: custom tooling/dies; oversized parts needing special nesting; complex non-standard "By Others" integration; details that deviate from established company norms. Request the meeting in the form **Notes**; PE may also request a meeting after file review.

---

## Step-by-step procedure
{: #step-by-step-procedure}

### 1. Understand the job structure
{: #sop-job-structure}

For detailed definitions, see the [Glossary](/reference/glossary.html).

- **Group Submittal**: A package of multiple jobs submitted together to the client.
- **Primary Job**: Subset of the project or group submittal.
- **WC Jobs**: Wood Component manufacturing jobs.
- **MT Jobs**: Metal Component or Kit of Parts manufacturing jobs.

### 2. File organization and folder setup
{: #sop-file-organization}

#### Navigate to the PE release folder

Use Windows Explorer paths (not Box links):

```
C:\BoxSync\Box\Awarded\PROJECT\03 Engineering\02_WORKING_Drawings_Models\03_PE_Releases
```

#### Create a new release folder

- Copy the template folder: `_PROJ.JOB_ScopeDescription`
- Example: `1102.011_Maitre D Stand`
- Create missing subfolders.

If not present, and releasing a manufacturing job manually, create:

- `00_MT_WC_IP_MfgParts`

Include files in their respective folders:

- **Production_Files**
  - Rhino PE model file
  - Shipping components (SC) list — when releasing a primary job, not strictly required for manufacturing jobs.
- **Production_Drawings**
  - Drawing set PDF
  - Any ancillary documents PE needs to process the job (veneer takeoff drawings, hardware cut sheets, specialty fabrication references, etc.) — copied here even if they also exist elsewhere in the project folder

#### File naming conventions

- Rhino model: `[EpicorCode]_PE_YYYYMMDD` (see also **PE Rhino file names** in the checklist above for catalog/MFG patterns).
- PDF drawings: `[EpicorCode]_ScopeDescription`
- SC list: `[EpicorCode]_SHIPPING_COMPONENTS`

### 3. Model and drawing preparation
{: #sop-model-drawing}

Refer to [Rhino Drafting](/standards/rhino-drafting/) for drafting standards and the [pre-release checklist](#pre-release-checklist) for release-specific requirements.

### 4. Epicor release process
{: #sop-epicor-release}

For more information on Epicor, see [Epicor Usage in Engineering](/tools/epicor/) and [Job Management](/tools/epicor/job-management.html).

1. Navigate to **UD40**: Shipping Components — Kinetic workbench (use **UD37** for CMG — see [Glossary](/reference/glossary.html)).
2. In the shipping components Excel sheet for the job, copy the ProjectID, JobNum, SC PartNum, Description, and Order Qty columns, excluding the headings.
3. On the workbench page, right-click and **Paste New**.
4. Repeat for all jobs being released (you can paste multiple jobs before refreshing).
5. Click **Update** in the top-right dropdown and refresh the page.
6. Open the **Project** filter to confirm records processed successfully.
7. Go to Epicor **Job Entry**.
8. For each BOM line:
   - **Engineering Complete**: Quantities verified.
   - **Fixed Quantity**: Checked unless releasing catalog items — confirm with PM or Engineering Director.
   - **Make Direct**: For manufactured parts only.
   - All materials have a Part Master.
9. **NOTE**: Job-specific engineering comments on BOM materials (e.g. pull from inventory, PM to verify, use alternate if unavailable) must be appended to the **part description** on the BOM.
10. **BOM Complete**: All parts and materials accounted for.
11. **Release** on the Job Entry page.

### 5. Form submission (FE to PE release form)
{: #sop-fe-pe-form}

Access the form via the FE to PE Release Form (typically through the Engineering Team SharePoint or internal forms system).

**Note**: Complete [Phase 3](/onboarding/project-delivery.html#phase-3-fe-release-to-production-engineering-pe-handoff) prerequisites and the [pre-release checklist](#pre-release-checklist) before submitting.

#### Required information

- **Name**: Your name
- **Project**: Project number and name
- **Job numbers**: All jobs being released (e.g. 1085.016, 1085.017)
- **Part numbers**: Key part numbers if applicable
- **Site of fabrication**: Manufacturing site location
- **File paths**: Windows Explorer paths (not Box links), e.g. `C:\BoxSync\Box\Awarded\1085_ProjectName\03 Engineering\02_WORKING_Drawings_Models\03_PE_Releases\1085.016_Description`
- **Notes**: Special instructions, included jobs (e.g. "Includes PROJ.WC.00007 and PROJ.MT.00003"), handoff meeting requests, or late-start coordination

If releasing a **Group Submittal** or **Primary Job** with manufacturing jobs:

- Combine client submittal drawings with job submittal drawings for full context.
- Clearly highlight job scope in the production drawing set.
