---
layout: default
title: Wiki Changelog
permalink: /reference/changelog.html
nav_exclude: true
corpus_exclude: true
---

# Wiki Changelog

A record of significant additions and updates to the Engineering Wiki, grouped by calendar week (Monday–Sunday).

---

## 2026-11-16 – 2026-11-22

- **[Submittal Approval](/tools/approvals-process.html) / [Submittal Review Cycle](/workflows/fabrication-engineer/submittal-review.html)** — Corrected the approval chain to match the live flow: other approvers named on the request sign first, one at a time, the project's PM always signs last, and the PM's approval files the package. "First answer decides" now applies only when no PM is on record. Also added the Internal Review Epicor step when the request goes out, what moves to `ARCHIVE` when a submittal is filed again (only that scope's earlier review files; a same-day re-run is a new version of the same file), and the requirement to print submittals as vector PDFs with a text layer. The same wording was aligned in [Adjacent Roles](/reference/adjacent-roles/), [Project Delivery](/onboarding/project-delivery.html), and [Releases & Requests](/tools/releases-and-requests.html).
- **[FE to PE Releases](/tools/releases-and-requests/fe-to-pe-releases.html)** — The check's verdict now reads passed, passed with warnings, or issues found (it no longer says "failed"); the [Production Engineer workflow](/workflows/production-engineer/) wording was matched.
- **FE working file name** — The FE model is `[PROJ.JOB]_FE.3dm`, with the scope description in the folder name only. Fixed the leftover `_FE_Description` examples in [Folder Structure](/reference/folder-structure.html), [Getting Started](/workflows/fabrication-engineer/getting-started.html), and [Project Delivery](/onboarding/project-delivery.html).
- **[Revision History](/standards/rhino-drafting/revision-history.html) / [Printing](/standards/rhino-drafting/printing.html)** — The first issued set is R0 (the revision counts the client's Revise and Resubmit returns), and a print for the Submittal Approval Request form must be vector, not raster.
- **[Time Entry — The Monday time check](/tools/time-entry.html#monday-time-check)** — New section on the weekly check: it runs Monday at 6:00 AM Eastern, each engineer and consultant gets a Teams message at 7:00 AM local time, and anything flagged is due by end of day Monday. A table lists each flag (Miss, OT, D10+, Break!, Lunch?, Notes!, EngNotes!, Miscode, Overlap!, Idle, PTO_WASTED, no labor rows), what triggers it, and what to do, plus which roles are exempt.
- **[Submittal Review Cycle](/workflows/fabrication-engineer/submittal-review.html)** — Added what the form does with your print (it replaces the C00, T00, and G00 in the print, reads initials and the revision log from the title block, and keeps sketch pages out of the index) and what the drawing check looks at, by heading, with which findings are errors.
- **[FE to PE Release](/workflows/fe-to-pe-release.html) / [FE to PE Releases](/tools/releases-and-requests/fe-to-pe-releases.html)** — Shipping components in the model but not in UD40 appear in the workbook with `UNSET` for the description and quantity. The form's check is the release gate, so BOM Complete, Field Dimensions Received, PA Approval, Client Approval, and Engineering Complete are errors there; a partial release is not faulted for the job already being Released.
- **[Submittal Review Cycle](/workflows/fabrication-engineer/submittal-review.html) / [Production Report](/tools/epicor/production-report.html) / [FE to PE Releases](/tools/releases-and-requests/fe-to-pe-releases.html)** — Added the N/A drawing-package status (Epicor's label for analysis code IN: client approval does not apply and the flow never changes it) and rewrote the status table to show the state before the request, what the request writes, and what an approval writes. The release gate accepts Approved or N/A; Internal Review still holds a release.
- **[Job Management](/tools/epicor/job-management.html) / [Epicor Troubleshooting](/tools/epicor/troubleshooting.html) / [Project Delivery](/onboarding/project-delivery.html)** — The release gate lists now include PA Approved and the drawing-package approval. "Job won't release" points to the form's post in FE to PE Releases and notes that `@release-bot` can set or clear Released without the gates.
- **[Part Requests — Scheduler Guide](/tools/releases-and-requests/part-requests/scheduler-guide.html) / [Engineer Guide](/tools/releases-and-requests/part-requests/engineer-guide.html)** — Documented `@parts-bot CLOSE` (only Caleb Marhoover, from any open state, closes both Planner tasks), that Caleb can also send `CREATE` and `USE`, and the retry when Epicor does not answer the catalog lookup.

---

## 2026-11-09 – 2026-11-15

- **Submittal approval, FE to PE release, and part requests** — Brought the published procedures in line with the live flows. The Submittal Approval Request form files the package and raises one card to the project's PMs. The FE to PE Release form checks the model, copies the handoff, and sets Released when its gates pass. Later partials use `@release-bot`. Part requests are answered with `@parts-bot`, and the scheduler saves the part with `CREATE` or records one with `USE`. Rewrote the seven procedure pages and corrected the satellite pages that still described the old handoffs. PA Approved and the Bluebeam stamp how-to are unchanged.
- **Two reviews** — The PM reviews each shop-drawing package on the submittal card, after the form files it and before the set goes to the client. The Project Advisor reviews build strategy in the working session before modeling, and with the lead as the approach is set. **PA Approved** records that sign-off before release. The glossary, the project-delivery diagram, the lead page, and the submittal, release, and Epicor pages now say so.
- **Release filing** — A second submission of the same FE to PE release replaces that handoff file and keeps the earlier file, with superseded and the time in its name. The form accepts a PE model link whose name contains `PE`, and a submittal PDF link. A CMG release is posted with `@CMG`. Drawing-package status and Released are written on the company that owns the job. `CREATE` replies on the parts thread with the new number.

---

## 2026-11-02 – 2026-11-08

- **[File Naming Conventions](/reference/reference-tables/file-naming-conventions.html) / [FE to PE Release](/workflows/fe-to-pe-release.html)** — Submittal PDFs follow the front-matter naming (`[EpicorCode]_R<n>_YYYYMMDD.pdf`, with `FOR RECORD` appended for For Record versions), the shipping components list is `.xlsx`, and outsourced (EXT) jobs release from the `01_FE_Models` assets the post-processing engineer builds after client approval.

---

## 2026-10-19 – 2026-10-25

- **[FE to PE Release](/workflows/fe-to-pe-release.html) / [Folder Structure](/reference/folder-structure.html)** — PE release folders now contain `Fabrication_Handoff` (everything FE passes to PE: the purged PE model, the shipping components list, and the approved submittal PDF); `Production_Files` and `Production_Drawings` are PE's own working files and drawings. The `00_MT_WC_IP_MfgParts` folder is gone: WC and MT jobs get their own release folder from the same template.
- **[File Naming Conventions](/reference/reference-tables/file-naming-conventions.html)** — A partial release's PE model is named `[EpicorCode]_PE_YYYYMMDD_PARTIAL-NN.3dm`, with NN counting from 01 after the date.
- **[Cover Sheet & Common Pages](/standards/rhino-drafting/cover-sheet-common-pages.html) / [Layout Structure](/standards/rhino-drafting/layout-structure.html) / [Glossary](/reference/glossary.html)** — Closed the gaps against the current template: added the **C00** logo cover and **S000** nested sheets to the page-type tables; T00 is described as the project index (jobs, with the submittal's own jobs in bold and underlined) and the drawing set's table of contents is G00's Item Drawings table; G00 is now listed as its five tables (item drawings, general material tags, finish tags, veneer and solid wood tags, bill of materials), with no separate hardware tag table.
- **[Drafting Toolkit — group submittals](/workflows/fabrication-engineer/toolkit/drafting.html#how-to-handle-group-submittal) / [Revision History](/standards/rhino-drafting/revision-history.html)** — A grouped submittal's JOB # field lists its jobs and T00 marks each of them; a revision applies to every job in the set; the submittal set is filed as one cumulative PDF while job releases stay per-job 3dm files. The T00 description lines under the project name are noted as typed fields.

---

## 2026-10-12 – 2026-10-18

- **[File Naming Conventions](/reference/reference-tables/file-naming-conventions.html) / [Folder Structure](/reference/folder-structure.html) / [FE to PE Release](/workflows/fe-to-pe-release.html)** — Stated the naming rule: folders carry the scope description and file names never do (submittal PDFs excepted). Never rename a job or release folder once it exists, and put every partial release in the job's existing PE release folder.
- **[File Naming Conventions](/reference/reference-tables/file-naming-conventions.html)** — Documented how a manufactured part number pairs with its job (`PROJ.MT.000NN` is made by `PROJ.M.0NN`, `PROJ.WC.000NN` by `PROJ.W.0NN`) and fixed the example pairing.
- **[Material Transmittal Log](/workflows/fabrication-engineer/material-transmittal.html)** — Clarified that material approval status (and transmittal numbers) do not appear on the G00 cover sheet; G00 shows only the PM-maintained tag, description, and spec fields. Aligned wording in the Drafting Toolkit and Cover Sheet pages, which previously implied approval status prints on drawings.

---

## 2026-08-17 – 2026-08-23

- **[Time Entry — Labor note requirements](/tools/time-entry.html#labor-note-requirements)** — New best-practice guidance: every ENG-bucket (`####.ENG`) operation — Design Engineering, Fabrication Engineering, Lead Coordination, Project Meeting, and BIM Coordination — now requires a labor note, matching the existing Indirect-entry rule. Bucket-job work carries the least job-specific context of any direct work and is the hardest to reconstruct for change-order back-calculation without one; Project Meeting was initially left preferred rather than required, then folded into the same rule as the other four once the "always beneficial" intent behind this guidance made an exemption for one operation seem arbitrary. Added matching per-operation note callouts under [ENG bucket operations](/tools/time-entry.html#direct-eng-bucket) and updated the approver's [Weekly Time Approval Walkthrough](/tools/time-entry/weekly-approval.html) checklist and quick-reference table to match. Mirrors a QC-bot rule change flagging missing notes on these same rows.

---

## 2026-07-20 – 2026-07-26

- **Engineering Leadership** — Documented the department's new management layer: [Director of Engineering & Computational Design, Managing Fabrication Engineer, and Managing Production Engineer](/onboarding/engineering-roles.html#engineering-leadership), summarized from both the candidate-facing and internal source job descriptions. Corrected several already-published facts that pre-dated this layer (FE load-balancing owner, who conducts progression 1:1s, process-question escalation, Fixed Quantity exception approval). Added the same roles to the [How We Work](/onboarding/how-we-work.html) interactive org map, split into a **Leadership** section (permanent positions) separate from **Transient Designations** (Project Advisor, Lead Engineer — ad hoc, project-level).
- **[Weekly Time Approval Walkthrough](/tools/time-entry/weekly-approval.html)** *(new page)* — Step-by-step approver's guide (dashboards, status codes, PTO/overtime interaction, common coding issues), cross-linked from [Time Entry](/tools/time-entry.html).
- **Engineering Assistant → Master Scheduler** — A dedicated EA hire is not expected going forward; most of that scope (Epicor materials database, primary/sample/mockup/MFG job creation, job scheduling) is now owned by the Master Scheduler role in Operations. Renamed the Engineering Assistant Workflow to Master Scheduler Workflow and reattributed references across 14 other pages (engineering-roles.md, glossary.md, the org map, troubleshooting pages, part-management.md, codes-and-tags.md, the Part Requests scheduler guide).
- **[Solid Wood Components (WC)](/workflows/fabrication-engineer/solid-wood-components.html)** — Gaps filled from the 2026-07-24 Engineering All Hands: corrected the WC Purchase Information table (it's a Rhino block edited via Attribute User Text, not a drawing-layout field), added the raw-material board-footage BOM step, documented how the Master Scheduler sizes a WC job, and added glued-up blanks as a recognized exception with repeatability as the deciding factor for WC vs. modeling directly with the parent job.
- **Removed** — Technical Steering Committee (TSC) references (not rolled out) from engineering-roles.md, engineer-progression-framework.md, and the glossary. Stripped hiring-qualification language (years of experience, software-proficiency bars, degree preferences) from engineering-roles.md — that page covers responsibilities and expectations, not hiring criteria.
- **Diagnostic Assistant prompt** — Added a rule offering confirm-gated group/layer-hierarchy audit scripts when a group-structure or layer-naming issue is under discussion and Rhino context is available. The audit only runs after the engineer clicks a confirm button; nothing executes automatically.
- **[Adjacent Roles & Interfaces](/reference/adjacent-roles/)** *(new section)* — The Master Scheduler is an Operations-department role, not Engineering; keeping its full procedure page under `workflows/` (described as engineering-role procedures) misrepresented it as one. Moved it to [Master Scheduler Procedures](/reference/adjacent-roles/master-scheduler.html) under a new Reference section that documents how non-Engineering roles — Master Scheduler, Project Manager (PM), Production Manager/Job Captain — interface with Engineering specifically, built from facts already stated elsewhere in the wiki rather than duplicating them. Removed Master Scheduler from "By Role"/"Available Workflows" listings where it had been presented as a peer to FE/PE.

---

## 2026-07-13 – 2026-07-19

- **[Construction Standards > Casework](/reference/construction-standards/casework/)** — Large content batch from the "1138 Recurring Issues" training review: [Hinge Hardware & Cup Boring](/reference/construction-standards/casework/hinge-hardware.html) *(new page)*, [Baseboard & Base Run Modeling](/reference/construction-standards/casework/baseboard.html) *(new page)*, an FE/PE dowel-vs-hardware responsibility split and drawer-slide orientation warning on [Construction Boring](/reference/construction-standards/casework/construction-boring.html), a scribe-allowance rule on [Fillers](/reference/construction-standards/casework/fillers.html), and custom/face-pull modeling on [Base Cabinets](/reference/construction-standards/casework/base-cabinets.html).
- **[Material Modeling](/standards/layer-organization/material-modeling.html)** — Grain-direction rule, backer-vs-two-sided material selection, and pre-lam vs. post-lam buildup logic added. New [Actual Material Thicknesses](/reference/reference-tables/actual-material-thicknesses.html) reference table for nominal-vs-actual discrepancies (shop ply, bending ply).
- **[Solid Wood Components (WC)](/workflows/fabrication-engineer/solid-wood-components.html)** — Added a conceptual "in-house mill" mental model and documented recognized exceptions (laser-engraving repurposing, buyout drawer boxes/doors).
- **[Part Naming](/workflows/fabrication-engineer/part-naming.html)** — Documented two silent naming-failure causes (layer nesting, malformed PRE codes) and a blank-name QC pass.
- **[FE to PE Release](/workflows/fe-to-pe-release.html)** — Checklist now explicitly prohibits releasing an exploded (non-assembled) model.
- **[Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html)** — New-hardware physical verification note: check center-to-center against the physical part before machining at scale.
- **[Common Mistakes](/reference/common-mistakes.html)** *(new page)* — Consolidated scattered anecdotal "gotcha"/"red flag"/"common mistake" content (casework, material modeling, part naming, Epicor) that previously lived inline on topic pages into a single reference hub, distinct from the existing tool-troubleshooting pages.
- **[Modeling Techniques — Scribes](/standards/layer-organization/modeling-techniques.html#how-to-create-scribes)** — Documented that scribes are called out on shop drawings (bold outline + infill hatch for the final trimmed dimension, dashed line for the full oversized extent) — the page previously covered only the Rhino-modeling side.
- **Diagnostic Assistant prompt** — Table-rendering instructions iterated to a hard requirement: markdown pipe-table syntax is disabled for the diagnostic assistant in favor of a JSON table marker the client renders deterministically (three prior formatting-rule attempts didn't hold up in live testing).
- **[Part Naming](/workflows/fabrication-engineer/part-naming.html)** — Documented that a negative thickness/length sample is a void-sample sentinel value, not a metadata error — and that it may indicate a legitimately hollow/cutout part rather than a geometry defect.
- **[Folder Structure](/reference/folder-structure.html), [FE Troubleshooting](/workflows/fabrication-engineer/troubleshooting.html), [Epicor Troubleshooting](/tools/epicor/troubleshooting.html)** — Tagged into the fe-release corpus so the diagnostic assistant can cite them for release-gate checks.
- **Corpus build** — Fixed the "general" corpus to be a true superset (every page, unfiltered) rather than an opt-in tag — it had been silently scoping out FE-technical content the public Wiki Assistant needs. Excluded pure-navigation index pages and quick-reference task-link tables from the corpus (still live in site nav) to cut redundant token cost.
- **[Rhino Drafting — Cover Sheet & Layout Structure](/standards/rhino-drafting/cover-sheet-common-pages.html)** — Fixed BOM location: prints on the G00 page, not the 2XX shop-drawing series.
- **[Glossary](/reference/glossary.html) / [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html)** — Fixed the Master Parts List code (L000, not L00) and clarified L001 (Pick List) is deprecated.
- **[Production Engineer Deliverables](/workflows/production-engineer/deliverables.html)** — Corrected the PRE lay-up code format: three material segments (face/core/backer) plus one total post-glue thickness, not two materials plus separate ply/final thicknesses.
- **Diagnostic Assistant prompt** — Added an attention-marker instruction (Phase 1 of viewport-focus feature) so the assistant can drive Rhino viewport isolation per finding.

---

## 2026-07-06 – 2026-07-12

- **Chat widget** — Added GFM pipe-table and markdown heading (H1–H6) rendering; the widget's homemade renderer previously printed both as literal raw text.
- **[Construction Standards > Casework](/reference/construction-standards/casework/)** *(new section)* — Fabrication-level casework construction standards: [carcase assembly & the 32mm system](/reference/construction-standards/casework/carcase-and-line-bore.html), [base](/reference/construction-standards/casework/base-cabinets.html)/[upper](/reference/construction-standards/casework/upper-cabinets.html)/[tall](/reference/construction-standards/casework/tall-cabinets.html) cabinets, [drawer construction](/reference/construction-standards/casework/drawer-construction.html), [fillers](/reference/construction-standards/casework/fillers.html), [CNC boring specs](/reference/construction-standards/casework/construction-boring.html), a full [type code reference](/reference/construction-standards/casework/type-codes.html), and a [critical dimensions quick reference](/reference/construction-standards/casework/quick-reference.html). Sourced from the CWKA Standard Casework Construction Manual v2.

---

## 2026-06-01 – 2026-06-07

- **[Releases & Requests](/tools/releases-and-requests/)** *(new section)* — Documentation for the structured Teams channels: the new AI-assisted [Part Requests](/tools/releases-and-requests/part-requests.html) workflow ([engineer](/tools/releases-and-requests/part-requests/engineer-guide.html) and [scheduler](/tools/releases-and-requests/part-requests/scheduler-guide.html) guides), [Job Requests](/tools/releases-and-requests/job-requests.html), and the [FE to PE Releases](/tools/releases-and-requests/fe-to-pe-releases.html) channel flow.
- **[Time Entry](/tools/time-entry.html)** — Two new operation codes documented: **020 Project Advisor** (indirect, for PA review duties) and **Scope Review Meeting (SCOPEMTG)** for scope-specific internal meetings on June 1, 2026+ projects. Added a [Corrections & Retroactive Entries](/tools/time-entry.html#corrections) section covering the prior-week correction window and the working-ahead-of-job-creation procedure.
- **[Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html#how-to-reverse-lookup)** — Reverse Lookup documentation updated for the new AI-powered class → category → natural language search.
- **Structural cleanup** — Resolved navigation ordering conflicts across the FE Workflow and Epicor sections; grouped AWI and ANSI references under a new [Industry References](/reference/industry-references.html) parent; consolidated the redundant PE Release Preparation page into [FE to PE Release](/workflows/fe-to-pe-release.html); standardized cross-reference formatting site-wide.

---

## 2026-05-25 – 2026-05-31

- **[Onboarding](/onboarding/)** — Navigation restructured: Scheduling Chain and Purchasing Signal Chain are now child pages under [Project Delivery Overview](/onboarding/project-delivery.html); [Lead Engineer Responsibilities](/onboarding/lead-engineer.html) moved as a child page under [Engineering Roles & Core Competencies](/onboarding/engineering-roles.html).
- **[How We Work](/onboarding/how-we-work.html)** — Interactive department map is now driven from a single YAML data file. The Wiki Assistant can answer questions about department responsibilities and collaboration and will surface direct deep links to individual department panels (e.g. `/onboarding/how-we-work.html#E` for Engineering).
- **Wiki Assistant — Parts-Match** — Several improvements to the parts-match endpoint used by the PA intake form:
  - `new_description` and `new_search_word` are now always returned regardless of match outcome, providing a ready ERP description even when no catalog match is found.
  - New `suggested_fields` object returns structured dimensional properties (thickness, width, length, species/grade, hardware dimensions, UOM, brand, etc.) for direct use in the Planner task ERP entry worksheet.
  - New optional `subcategory` and `class_id` request fields allow confirmed dropdown selections from the intake form to override Claude's inference.
  - McMaster-Carr SKU detection: when a McM SKU pattern (e.g. `91251A540`) is present in the description, `CommercialBrand` and `CommercialSubBrand` are automatically populated in `suggested_fields`.

---

## 2026-05-18 – 2026-05-24

- **[Time Entry — Operation Selection Guide](/tools/time-entry.html#operation-selection-guide)** — New section defining correct classification for all engineering labor operations: Submittal/Post-Submittal trigger rules, Design Engineering vs. Fabrication Engineering scope distinction (including parametric scripting), indirect operation definitions, labor note requirements, and a common misclassification table.
- **[Toggl Setup & Upload](/tools/time-entry/toggl.html)** — Toggl content split into a dedicated child page under Time Entry (installation, structure & naming, entry creation, export, Epicor upload procedure).
- **[FE Release Diagnostic Tool](/tools/diagnostic.html)** — New page documenting the standalone PE release validator: GUI walkthrough, three validator categories (Document Structure, Model Objects, ERP Integration), status indicators, Summarize Results feature, Excel export with GUID column, and in-Rhino "Assistant" button integration. Running the diagnostic before every PE release is required.
- **[Corner Clearance Standard](/standards/layer-organization/modeling-techniques.html)** — 0.51" × 0.26" corner clearance added for CNC-routed slots, pockets, and notches (waffle structures, half laps, notches). No radii. Ensures compatibility across both shops for router bits ≤ 0.5" diameter.
- **[BOM Procedures — Increasing Quantity on a Completed MFG Job](/workflows/fabrication-engineer/bom-procedures.html)** — Documents the .1 job pattern when a manufactured part job is complete and closed. Applies to all MFG job types.
- **[Shipping Components — UD40 Company Code](/workflows/fabrication-engineer/shipping-components.html)** — Company number column is required for UD40 upload; missing or incorrect code creates bad rows that require an Epicor support ticket.
- **[Overage & Extras — Manufactured Part Overage](/workflows/fabrication-engineer/overage-and-extras.html)** — Clarifies that PM cannot retroactively adjust manufactured part quantity once a job closes. Engineer must coordinate overage with production and PE before the original job releases.
- **[Revision History — Rhino Revision Cloud Alias](/standards/rhino-drafting/revision-history.html)** — Alias macro for efficiently creating revision clouds in Rhino.
- **[Material Transmittal](/workflows/fabrication-engineer/material-transmittal.html)** — Multiple updates:
  - PM exclusively owns TRA entries; engineers notify PM and cannot add tags directly.
  - Engineering Complete: engineer checks when BOM quantities are finalized, not before.
  - Pre-G00 sync requirement: confirm TRA is current before running the G00 cover sheet script.
  - Hardware Tags section rewritten: GMHW BOM page is the drawing reference, not TRA hardware tags.
  - TRA status vocabulary documented (Submitted / Approved / Rejected / Internal / Not Submitted) and transmittal number format (T [###].[##]) explained.
  - TRA material status disambiguated from drawing package submittal status tracked in the Production Report / Submittal Dashboard.
- **[Production Report](/tools/epicor/production-report.html)** — Submittal Status field clarified as tracking the drawing package as a whole, not per-material approvals; cross-reference to TRA added.
- **[Submittal Review](/workflows/fabrication-engineer/submittal-review.html)** — Status tracking section scoped to drawing packages; disambiguation note and cross-references to both tracking systems added.
- **[Manufactured Metal Parts & M Jobs](/tools/epicor/manufactured-parts-jobs.html)** *(new)* — MT part types, M job workflow, and anti-patterns.
- **[Production Quantity](/tools/epicor/production-quantity.html)** *(new)* — Prod Qty definition, Fixed Qty behavior, and CMG exception.
- **[Overage, Extras & Process Waste](/workflows/fabrication-engineer/overage-and-extras.html)** *(new)* — Process waste vs. overage vs. extras; who handles each and where it lives in Epicor.
- **[Revision History](/standards/rhino-drafting/revision-history.html)** *(new)* — Revision triggers, revision cloud bubbles, and UserText fields.
- **[Lead Engineer](/onboarding/lead-engineer.md)** *(new)* — Ad hoc designation, PA relationship, and mandatory working session requirement.
- **[Remote Desktop](/tools/remote-desktop.html)** *(new)* — Splashtop shared machine access for the CO site.
- **Glossary** — New entries: PA, Lead Engineer, Production Quantity, Fixed Qty.

---

## 2026-04-13 – 2026-04-19

- **[Training Videos](/reference/training-videos.html)** *(new)* — Complete index of engineering training recordings with links to relevant wiki pages.
- **[Site Map](/sitemap-graph.html)** — Interactive D3.js force-directed graph showing wiki page connectivity added.
- **Wiki structure** — Reorganized from 4 sections to 5: Onboarding, Workflows, Standards, Tools, Reference.

---

## 2026-04-06 – 2026-04-12

- **Home page** — Wiki Assistant info added.
- **[Inventory Jobs](/tools/epicor/inventory-jobs.html)** *(new)* — INV job workflow and purchasing flow documentation.

---

## 2026-03-30 – 2026-04-05

- **Wiki Assistant** — Cloudflare Worker / Claude integration launched; accessible from the home page.
- **Major content integration** — Large batch of content from training transcripts added across FE workflow, PE workflow, Epicor, and standards pages.

---

## 2026-02-16 – 2026-02-22

- **Wiki restructure** — PE workflow split into dedicated pages; toolkit setup and drafting/modeling pages separated; page hierarchy introduced across all sections.

---

## 2025-11-24 – 2025-11-30

- **Initial wiki** — Site created on Just the Docs theme; initial content structure established for Onboarding, Workflows, Standards, and Tools.
