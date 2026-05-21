---
layout: default
title: Glossary
permalink: /reference/glossary.html
parent: Reference
nav_order: 1
corpus_tags: [fe-release, fe-submittal]
---

# Engineering Glossary

## Roles & Phases

- **DE (Design Engineering)**: Phase that converts approximate geometries to precise geometries, develops build strategies and assembly details
- **FE (Fabrication Engineer)**: Engineer responsible for developing design engineering geometries into fabrication-ready geometries and creating shop drawings
- **PE (Production Engineer)**: Engineer responsible for toolpaths, reference geometries, and production programming
- **Engineer I / Engineer II**: Level distinctions for FE and PE roles; advancement follows the [Engineer Progression Framework](/onboarding/engineer-progression-framework.html) (merit-based, not tenure-only)
- **EA (Engineering Assistant)**: Support role managing Epicor materials database and job creation
- **PM (Project Manager)**: Manages project coordination and client communication
- **PA (Project Advisor)**: Senior designated role with final authority on build strategy. PAs drive detail development and material selection (where not client-dictated), often beginning engagement during preconstruction/bid phase. On active projects, PA is the second approver in the formal internal review chain (after PM). PA duties are non-billable and logged to indirect code **017 ENG Administration**. PA and Lead Engineer are always separate people on a project. See [Lead Engineer Responsibilities](/onboarding/lead-engineer.html) for the division of responsibility.
- **Lead Engineer**: Ad hoc project-level designation assigned to the engineer with the most relevant expertise for a given scope. Functions as the technical and administrative anchor for that project — not a permanent title. Time is logged to the **Lead Coordination** operation on the project bucket job. See [Lead Engineer Responsibilities](/onboarding/lead-engineer.html).

## Job Types

- **Engineering Jobs**: Jobs that start with "E" and match 1:1 with production jobs (e.g., E1095.015)
- **Submittal Jobs**: Engineering jobs for work before client approval (operation: Submittal)
- **Post-Submittal Jobs**: Engineering jobs for work after client approval (operation: Post-Submittal)
- **Manufacturing Jobs**: Production jobs with format Project.Job (e.g., 1095.015) - have PE operation
- **Bucket Jobs**: Project-wide tasks like design, coordination, meetings, BIM (e.g., PROJ.ENG)
- **WC Jobs**: Wood Component manufacturing jobs (format: Project.W.000)
- **MT Jobs**: Metal Component or Kit of Parts manufacturing jobs (format: Project.M.000)
- **SMP Jobs**: Sample jobs (format: XXX.SMP.XXXXX)
- **Inventory Job (INV)**: One per project (format: `ProjectNumber.INV`, e.g., `1086.INV`). Controls purchasing of SG, SS, SL, and IM materials. See [Inventory Jobs](/tools/epicor/inventory-jobs.html).
- **Group Submittal**: A package of multiple jobs submitted together to the client (1 submittal doc → multiple production jobs)
- **Primary Job**: Subset of the project or group submittal

## File & Naming Conventions

- **BOM (Bill of Materials)**: List of materials and hardware required for a job
- **SC (Shipping Component)**: Logical grouping of parts for shipping (e.g., SC005)
- **SK**: Sketch or cut sheet for CNC machines
- **MFG**: Manufactured parts from feeder jobs
- **WC**: Wood Component
- **MT**: Metal Component
- **IP**: Kit of Parts

## Epicor Terms

- **Submittal Dashboard**: Homepage for FEs showing submittal and post-submittal work. Must launch from CW site but includes assignments from both sites. Pulls in information from other dashboards (PE start dates, submittal status, hours).
- **Production Report**: Screen for updating submittal statuses and tracking manufacturing jobs
  - **Global Production Report**: Read-only, all open jobs from both sites
  - **Site-Specific Production Report**: Updatable, jobs for one site (CW or DF)
- **Job Entry**: Screen for managing and releasing jobs
- **UD40 (UD40IN)**: Shipping Components — Kinetic workbench. Future enhancement: toolkit may directly publish SC data here.
- **UD37**: Shipping Components dashboard used for **CMG** jobs (use **UD40** for standard jobs). See [FE to PE Release](/workflows/fe-to-pe-release.html) checklist.
- **Rel Opr. (Related Operation)**: Epicor field tying each BOM material to the correct operation; see [FE to PE Release](/workflows/fe-to-pe-release.html) checklist.
- **Added Mtl**: Checkbox used when materials are added to the BOM after initial release; flag changes per Epicor practice.
- **Production Quantity (Prod Qty)**: Job header field capturing how many exact duplicate parts a job produces. Acts as a multiplier on BOM and BOO quantities. Prints on the Job Traveler and appears on 200-series submittal pages via the Toolkit. See [Production Quantity & Fixed Qty](/tools/epicor/production-quantity.html).
- **Fixed Qty**: Per-line BOM checkbox that overrides the Production Quantity multiplier for that line. When TRUE, the entered quantity is used as-is. Should be TRUE on all lines for standard jobs; must be unchecked for CMG/Make-to-Stock jobs. See [Production Quantity & Fixed Qty](/tools/epicor/production-quantity.html).
- **SelName audit**: Release review stepping through **SelName** so each part name maps only to matching geometry (see [FE to PE Release](/workflows/fe-to-pe-release.html)).
- **Specialist spike**: Progression concept: demonstrated senior-level strength in at least two of four pillars (see [Engineer Progression Framework](/onboarding/engineer-progression-framework.html)).
- **TSC (Technical Steering Committee)**: Invited senior contributors may support department R&D and standards initiatives; referenced in role expectations.
- **Project Materials Dashboard**: View all materials for all jobs on a project in one place. Enter 4-digit project number, group by ClassID or material code for cross-job BOM review.
- **PM Materials Dashboard**: Epicor dashboard where PMs manage shop drawing submittal status, tag materials to the TRA, and signal purchasing readiness. Information flows from the Material Transmittal Log into this dashboard (one-way).
- **Material Transmittal Log**: Epicor dashboard (CW Material Transmittal Log — Kinetic) that tracks submittal status of all materials, finishes, and hardware on a project. Structured as a TRA job (format: `ProjectNumber.TRA`) with four subassemblies: Finish Tags, Veneer and Solid Wood Tags, General Material Tags, and Hardware Tags. The PM maintains this log. The Engineering Toolkit pulls from it to populate the G00 page. See [Material Transmittal Log](/workflows/fabrication-engineer/material-transmittal.html).
- **Submittal Scope**: What appears on all pages as page titles. May differ from actual Epicor job number (e.g., catalog items).
- **Engineering Bucket Jobs**: Project-wide tasks (format: PROJ.ENG). Operations include: Design, Engineering, Fabrication Engineering, Lead Coordination, Project Meetings, BIM Coordination.
- **Takeoff Audit Report**: Custom Epicor query (CW Takeoff Audit Report) that shows takeoff BOM quantities, open POs, received quantities, live manufacturing demand, and supply balance for all parts on a project's INV job. See [Reading the Takeoff Audit Report](/tools/epicor/inventory-jobs.html#how-to-read-takeoff-audit).
- **Time Phase Inquiry**: Shows which jobs a material code is currently BOM'd to (demand tracking). Access via Epicor search.
- **Part Transaction History**: Shows inventory history (credits/debits) for any material code
- **Cycle Count**: Shows current on-hand quantities for materials in current site
- **Truck Entry**: Epicor screen where PMs create and manage ship dates. Truck IDs follow format `#### – Truck ##` (e.g., `1091 – Truck 01`). "Need By" is the on-site date; "Ship By" is the departure date. These dates cascade into Sales Order releases, which set job Required By dates. See [Scheduling Chain](/onboarding/scheduling-chain.html).
- **Office MES**: Digital time clock in Epicor. Options: Start Production (manufacturing jobs), Start Indirect (bucket/indirect jobs), Start Rework.

## Drawing & Layout Terms

- **T00**: Title Sheet — project cover page with job index.
- **G00**: General Requirements and Schedules — material/finish tags populated from TRA via the Engineering Toolkit. See [Cover Sheet & Common Pages](/standards/rhino-drafting/cover-sheet-common-pages.html).
- **1XX**: Reference Plans — overall floor plans, enlarged plans, RCPs, VIF plans.
- **2XX**: Shop Drawings — ordered as: (1) Iso/BOM, (2) Plans, (3) Elevations, (4) Sections, (5) Details.
- **3XX**: Install & Shipping Drawings — shipping components list and installation supplements (assembly instructions specific to site conditions).
- **4XX**: Fabrication Supplements (internal use) — layup ("wedding cake") assembly information, veneer sequence drawings, glue-up jig drawings.
- **SKXX**: Sketches — for quick feedback from relevant parties (structural consultation, client meetings, pre-submittal). Not included in the submission set.
- **Detail View**: Specific view on a layout page. Must be locked once finalized to prevent accidental shifting.
- **Clipping Plane**: Creates section cuts through geometry. Lives on `03_CWKA-FE::CON::CLIP` layer. Can set custom depth to control visibility range.
- **Section Style**: Hatch pattern assigned to a layer. Configured in Layer Manager > Section Style column.
- **Named Positions**: Time-stamped locations of parts in Rhino space. Used to toggle between assembled and exploded views. Best set at the end of the modeling process when geometry is fabrication-ready, because altering a geometry's volume gives it a new GUID and breaks the association. Use the "Append" function to re-register geometry if this happens.
- **Master Parts List (L00)**: Standardized parts schedule format for drawing sets.
- **Pick List (L001)**: Backend model space page for BOM information during design (not typically printed externally).

## Epicor Material Class Codes

Every material and part number in Epicor is assigned a material class. These are distinct from drawing material tags (see [Material Tag Vocabulary](/reference/reference-tables/material-tag-vocabulary.html)).

| Code | Definition |
|------|-----------|
| WC | Cabinet or Wood Component (custom) |
| FU | Fabric/Upholstery |
| FM | Finish Material (ordered specific to project) |
| GL | Glass |
| HW | Hardware (excluding electrical) |
| LE | Lighting/Electrical |
| MT | Custom Metal parts/assemblies |
| IM | GM Metal (inventory metal raw material) |
| MC | Misc (avoid if possible) |
| SG | Sheet Goods (excluding metal and solid surface) |
| SH | Shop Supplies (general consumables) |
| SL | Solid Lumber |
| SS | Solid Surface |
| ST | Stone |
| TO | Tooling (project-specific) |

## Material Terms

- **Lay-up (PRE)**: Pre-laminated material assembly. Uses a specific code system: `PRE_[face]_[core]_[backer]_[thickness in mm]`. Numbers are Epicor GM.SG.XXXXX codes with leading zeros dropped. See [Lay-Up Formulas](/reference/reference-tables/lay-up-formulas.html).
- **Edgebanding (EB)**: Material applied to exposed edges. Do not model for straight, square edges (edgebander handles these). Model for: post-lam, solid wood EB, curved edges, notches, cutouts, and edges that can't go through the edgebander.
- **Scribe**: Oversized dimension for field fitting. Created by copying finished geometry, extending the face to oversized dimension, and moving to `04_CWKA-PE::REF`.
- **VIF (Verify in Field)**: Dimensions to be verified on-site. Uses the `CWKA_2024-VIF` annotation style.
- **Material Tag**: Project-specific identifier for a material or finish, used on drawings and in the Material Transmittal Log. Format: abbreviation + double-digit number with no spaces/hyphens/underscores (e.g., PLY01, MDF02, FN03). See [Material Tag Vocabulary](/reference/reference-tables/material-tag-vocabulary.html).
- **ARCH Tag**: Architect's tag designation for the same material. Cross-referenced on the G00 page alongside the CWK material tag.
- **Transmittal Number**: Tracking number for material submittals, format T###.## (e.g., T5.01)

## Tools & Systems

- **Engineering Toolkit**: Grasshopper-based toolkit for Rhino integration with Epicor
  - **Drafting Tab**: Read-only Epicor lookups (parts, job BOMs, material schedules) and publishing to drawing layouts—the same workflow demonstrated historically as the in-Rhino "Epicor toolkit" before it was folded into the shared toolkit. See [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html).
  - **Modeling Tab**: Modeling, part naming, and related workflows (including shared hardware library behavior from McMaster-Carr requests). See [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html).
  - **FE Toolkit**: Currently available, PE toolkit in development
  - **Synapse**: Plugin required for toolkit - enables custom UI within Rhino
  - **Package Manager**: Rhino 8 built-in plugin manager (like an App Store)
- **Toggl**: Time tracking application used for time entry
  - **Client** (in Toggl): Maps to Project Number in Epicor
  - **Project** (in Toggl): Maps to Job Number in Epicor
  - **Tag** (in Toggl): Maps to Operation in Epicor
- **Bluebeam**: PDF editing and markup software
- **Rhino**: 3D modeling software
- **Grasshopper**: Visual programming environment for Rhino
- **Office MES**: Digital time clock in Epicor for time entry
