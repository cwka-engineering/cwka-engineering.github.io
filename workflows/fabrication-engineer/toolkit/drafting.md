---
layout: default
title: Drafting Toolkit
permalink: /workflows/fabrication-engineer/toolkit/drafting.html
nav_order: 1
parent: Engineering Toolkit (Setup)
grand_parent: Fabrication Engineer (FE)
corpus_tags: [fe-submittal]
---

# Drafting Toolkit

> **Related**: [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html) | [Rhino Drafting Standards](/standards/rhino-drafting/) | [Epicor Dashboards — Project Materials](/tools/epicor/dashboards.html#project-materials-dashboard)

The Drafting Toolkit is the in-Rhino interface for **read-only Epicor lookups** and for **publishing** Epicor-driven data onto drawing layouts. The same workflow was demonstrated to the department in 2024 as the **“Epicor toolkit”** (Grasshopper definition + [Synapse](/reference/glossary.html) panel); it now lives under the **Drafting** tab of the shared Engineering Toolkit. See [Engineering Toolkit (Setup)](/workflows/fabrication-engineer/toolkit/) for installation, Synapse, and first-run login.

## Linked layout fields (do not edit by hand)

- Schedule and BOM placeholders on layouts (e.g. **G00** general requirements, BOM pages) are driven by **fields/variables** tied to data the toolkit writes into the Rhino file—not ordinary static text. [^transcript-drafting-toolkit-kickoff]
- **Do not** edit those values manually in the layout. Manual edits are **overwritten** the next time you run the toolkit and publish.
- To change what appears, fix the source of truth (**Epicor** and/or the **material schedule / transmittal** process) and **refresh** via the toolkit (see below), then publish again.

## Epicor connection (first use)

- The toolkit talks to Epicor over the network for **read-only** operations (faster than repeating the same lookups in the Epicor client for many tasks).
- **First load**: you may be prompted for **Epicor credentials**; complete the login flow once the connection is established. Cached credential behavior is described on [Engineering Toolkit (Setup)](/workflows/fabrication-engineer/toolkit/).

## Part lookup

- **Reverse lookup**: Search when you do not yet know the part number—filter by class (e.g. sheet goods), then narrow with search terms to match description and attributes. [^transcript-drafting-toolkit-kickoff]
- **Forward lookup**: Enter a known part number to pull **current** part attributes from Epicor.
- Each successful pull shows a **cache timestamp** (when that read completed). Use it to know how fresh the data is.
- Forward lookup can also **prepare layer structure** for the material so modeling stays aligned with downstream expectations.
- For **hardware modeling** and shared blocks, see [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html).

## Job BOM lookup

- Query by **job** to pull the **live BOM** for that job from Epicor.
- **Open jobs only**: Closed jobs are **ignored** to limit data volume—if a lookup returns nothing, confirm the job is open and bombed as expected. [^transcript-drafting-toolkit-kickoff]
- The BOM view can show **quantities**, **UOM**, **descriptions**, and a **cross-reference to the material transmittal / approval** view the PM maintains (see [Project Materials Dashboard](/tools/epicor/dashboards.html#project-materials-dashboard)). Use it to see whether a line is approved before you model it.
- **Header metadata** typically includes: time the BOM was **cached** in the tool, and the **most recent Epicor change-log activity** for that job—useful to spot stale BOMs.
- **Publishing to a layout**: Choose the target layout page (the **G00** page — BOM prints there, not on the 2XX shop drawings), set **class filter** (**full BOM** vs **hardware-only** where available), then **publish** so tags/descriptions on the sheet update from the cached BOM. [^transcript-drafting-toolkit-kickoff]

## General requirements / material schedule (transmittal)

- Query by **project** to pull the **material schedule** the PM maintains (FSC, fire rating, moisture, emissions, etc., as applicable). [^transcript-drafting-toolkit-kickoff]
- **Publish** to the appropriate layout (commonly **G00**) to refresh that page.
- **Roles**:
  - **Project Manager**: Owns **accuracy and completeness** of material schedule / transmittal data in Epicor (and related dashboards).
  - **Lead engineer**: Uses the toolkit to **pull** current data and **publish** to the drawing set so cover sheets and schedules reflect what is in Epicor. Engineers adding BOM lines that are not on the schedule should coordinate so the PM can update the schedule (alerts/workflows may apply—confirm with PM/Epicor practice).

## Cache, refresh, and Epicor changes

- Data shown in the toolkit is **as of the last lookup** for that job or project. If someone changes the BOM in Epicor, the Rhino UI **does not** auto-update until you **re-run** the same lookup and refresh the cache (then republish if needed). [^transcript-drafting-toolkit-kickoff]
- Use timestamps in the UI to confirm freshness before you rely on BOM or schedule content for release decisions.

---

## Restoring Model/Layout Space

- **Template Tab**: [^transcript-drafting-toolkit] Use Template tab in Drafting Toolkit to restore model and layout spaces.
- **Restore Model Space**: Pulls in and merges all latest data from the template - adds missing layers, geometry, etc. You can turn on/off specific items to restore.
- **Restore Layout Space**: Pulls in latest versions of layout pages from template. Hover over pages to see descriptions (e.g., "Master Parts List", "Fabrication Drawing", "G00 General Schedule"). Can choose specific pages to restore.
- **After Modeling Changes**: [^transcript-drafting-toolkit] Good practice - after making changes to model space (importing geometry, modeling new parts), click the reset button to ensure toolkit grabs the freshest data from model space.

## How do I set drawing variables (submittal scope, project metadata)?
{: #how-to-set-drawing-variables}

Drafting Toolkit → **Setup tab**. The submittal scope is auto-populated from the filename; override any field manually. Publish changes to write variables to Rhino Doc UserText. These variables populate throughout all drawing layouts.

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

## How do I populate the T00 (Title/Project) page?
{: #how-to-populate-t00}

Drafting Toolkit → **Project tab** → **Publish Changes**. Manually fill fields not tracked in Epicor (architect, project address). The toolkit auto-populates project metadata from Epicor for the rest.

## How do I populate the G00 (General Requirements/Schedules) page?
{: #how-to-populate-g00}

> **Before running this script, confirm with the PM that the TRA is current.** If you publish against a stale TRA, material approval statuses on your drawings will be wrong and you will need to re-run. See [Before Running the G00 Script](/workflows/fabrication-engineer/material-transmittal.html#tra-sync-before-g00).

Drafting Toolkit → **Schedules tab**. Enter the project number, select the G00 layout, and publish. Data is pulled from the Material Transmittal Log. If a material doesn't appear, the PM may not have added it to the TRA yet — communicate with your PM. See [Material Transmittal Log](/workflows/fabrication-engineer/material-transmittal.html).

## How do I publish BOM data to the pick list (L001)?
{: #how-to-publish-bom-to-l001}

> **Deprecated**: L001 has been removed from the general Rhino tabloid template. This applies only to legacy files that still carry the L001 page.

Drafting Toolkit → **Schedules tab** → BOM section. Enter the job number, cache the data, review the data table, then publish. Can filter to hardware-only or show the full BOM.

## How do I handle a group submittal in the toolkit?
{: #how-to-handle-group-submittal}

A Grouped Submittal (GS) combines interrelated scopes into one submittal package — either because they share construction details, or because a single large element has been sharded across multiple production jobs for manufacturing or shipping efficiency. GS jobs aren't pre-created by the master scheduler; request one from your PA and PM when a grouped submittal makes more sense than separate per-job submittals. See [Grouped Submittal (GS) jobs](/tools/time-entry.html#direct-gs-jobs) for the time-entry rules — a GS job only ever carries the Submittal operation.

In the toolkit, set submittal scope to `PROJ.GS.001` format, then specify the individual jobs covered (e.g., 1091.008, 1091.009, 1091.010). BOM pulls will cover all specified jobs.

> **Submittal scope vs. job number**: The `PROJ.GS.001`-style submittal scope drives page numbering and appears throughout the drawing set — but it's a drawing-side label, not the Epicor job number, and never carries the `E` prefix. The actual Epicor GS job is `E####.GS.###` (e.g. `E1105.GS.001`) — same numeric sequence, with the `E` prefix. The title block still displays the actual constituent job numbers regardless of which scope label is used for page numbering.

## Tags Tables & BOM

- Pull material tags from Epicor (General Material, Finish, Veneer, Solid Wood).
- BOM filters out hardware/manufactured materials by default.

## Data Table

- Review materials, quantities, approval status.
- Publish changes to update layout.

## Footnotes
[^transcript-drafting-toolkit]: Source: [Training Video — "Drafting Toolkit"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQC96ra9CnaEQYE9GuysMCP6AeLIbL5M4J8UXR8M5lT6sXY?e=pGaZWd)
[^transcript-adv-toolkit-ii]: Source: [Training Video — "Adv. Toolkit Functions II"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQB1ApOz1Dz_SoENHn-RPCSqAcMM0ikM3h9gyF5DxIqLwWc?e=Ec0Lq3)
[^transcript-drafting-toolkit-kickoff]: Source: [Training Video — "Drafting Toolkit Kickoff"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQBHoAX9EWA3R4rSxF50B-OzAdiATRHpHDs1Qz01DmLPLw8?e=n0ea7X) (recording from 2024-06-14). Some Epicor UI names and roadmap items reflect that period; confirm current behavior in the live toolkit.
