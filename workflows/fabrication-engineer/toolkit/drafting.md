---
layout: default
title: Drafting Toolkit
permalink: /workflows/fabrication-engineer/toolkit/drafting.html
nav_order: 1
parent: Engineering Toolkit (Setup)
grand_parent: Fabrication Engineer (FE)
---

# Drafting Toolkit

> **Related**: [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html) | [Rhino Drafting Standards](/standards/rhino-drafting/) | [Epicor Dashboards — Project Materials](/tools/epicor/dashboards.html#project-materials-dashboard)

The Drafting Toolkit is the in-Rhino interface for **read-only Epicor lookups** and for **publishing** Epicor-driven data onto drawing layouts. The same workflow was demonstrated to the department in 2024 as the **“Epicor toolkit”** (Grasshopper definition + [Synapse](/overview/glossary.html) panel); it now lives under the **Drafting** tab of the shared Engineering Toolkit. See [Engineering Toolkit (Setup)](/workflows/fabrication-engineer/toolkit/) for installation, Synapse, and first-run login.

## Linked layout fields (do not edit by hand)

- Schedule and BOM placeholders on layouts (e.g. **G00** general requirements, BOM pages) are driven by **fields/variables** tied to data the toolkit writes into the Rhino file—not ordinary static text. [^transcript-all-hands-epicor]
- **Do not** edit those values manually in the layout. Manual edits are **overwritten** the next time you run the toolkit and publish.
- To change what appears, fix the source of truth (**Epicor** and/or the **material schedule / transmittal** process) and **refresh** via the toolkit (see below), then publish again.

## Epicor connection (first use)

- The toolkit talks to Epicor over the network for **read-only** operations (faster than repeating the same lookups in the Epicor client for many tasks).
- **First load**: you may be prompted for **Epicor credentials**; complete the login flow once the connection is established. Cached credential behavior is described on [Engineering Toolkit (Setup)](/workflows/fabrication-engineer/toolkit/).

## Part lookup

- **Reverse lookup**: Search when you do not yet know the part number—filter by class (e.g. sheet goods), then narrow with search terms to match description and attributes. [^transcript-all-hands-epicor]
- **Forward lookup**: Enter a known part number to pull **current** part attributes from Epicor.
- Each successful pull shows a **cache timestamp** (when that read completed). Use it to know how fresh the data is.
- Forward lookup can also **prepare layer structure** for the material so modeling stays aligned with downstream expectations.
- For **hardware modeling** and shared blocks, see [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html).

## Job BOM lookup

- Query by **job** to pull the **live BOM** for that job from Epicor.
- **Open jobs only**: Closed jobs are **ignored** to limit data volume—if a lookup returns nothing, confirm the job is open and bombed as expected. [^transcript-all-hands-epicor]
- The BOM view can show **quantities**, **UOM**, **descriptions**, and a **cross-reference to the material transmittal / approval** view the PM maintains (see [Project Materials Dashboard](/tools/epicor/dashboards.html#project-materials-dashboard)). Use it to see whether a line is approved before you model it.
- **Header metadata** typically includes: time the BOM was **cached** in the tool, and the **most recent Epicor change-log activity** for that job—useful to spot stale BOMs.
- **Publishing to a layout**: Choose the target layout page (e.g. a **200**-level BOM page), set **class filter** (**full BOM** vs **hardware-only** where available), then **publish** so tags/descriptions on the sheet update from the cached BOM. [^transcript-all-hands-epicor]

## General requirements / material schedule (transmittal)

- Query by **project** to pull the **material schedule** the PM maintains (FSC, fire rating, moisture, emissions, etc., as applicable). [^transcript-all-hands-epicor]
- **Publish** to the appropriate layout (commonly **G00**) to refresh that page.
- **Roles**:
  - **Project Manager**: Owns **accuracy and completeness** of material schedule / transmittal data in Epicor (and related dashboards).
  - **Lead engineer**: Uses the toolkit to **pull** current data and **publish** to the drawing set so cover sheets and schedules reflect what is in Epicor. Engineers adding BOM lines that are not on the schedule should coordinate so the PM can update the schedule (alerts/workflows may apply—confirm with PM/Epicor practice).

## Cache, refresh, and Epicor changes

- Data shown in the toolkit is **as of the last lookup** for that job or project. If someone changes the BOM in Epicor, the Rhino UI **does not** auto-update until you **re-run** the same lookup and refresh the cache (then republish if needed). [^transcript-all-hands-epicor]
- Use timestamps in the UI to confirm freshness before you rely on BOM or schedule content for release decisions.

---

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
[^transcript-all-hands-epicor]: Source: Engineering Department All Hands meeting recording transcript, 2024-06-14 (`ingest/transcripts/`). Some Epicor UI names and roadmap items reflect that period; confirm current behavior in the live toolkit.
