---
layout: default
title: BIM Coordination
permalink: /workflows/fabrication-engineer/bim-coordination.html
parent: Fabrication Engineer (FE)
grand_parent: Workflows
nav_order: 15
corpus_tags: [fe-submittal]
---

# BIM Coordination

Building Information Modeling (BIM) coordination is an active part of many projects — particularly commercial and institutional scopes where the architect or general contractor requires subcontractors to participate in a shared model environment. This page describes when BIM applies, what Engineering is responsible for, and how the process works.

> **Related**: [Getting Started](/workflows/fabrication-engineer/getting-started.html) | [Design Engineering](/workflows/fabrication-engineer/design-engineering.html) | [Lead Engineer Responsibilities](/onboarding/lead-engineer.html)

## When Does BIM Apply?

BIM requirements are specified in the project contract and specifications. Common indicators:

- The specification includes a **BIM Execution Plan (BEP)** section
- The contract requires submission of shop drawings in a specific **LOD (Level of Development)** — e.g., LOD 350 or 400
- The GC or architect invites subcontractors to **clash detection** meetings
- The project requires coordination with adjacent subcontractors (MEP, structural, glazing) in a shared model environment

Review the specifications and contract drawings at project kickoff, or ask the PM, to confirm whether BIM deliverables are required.

## Engineering Responsibilities

BIM coordination responsibilities fall primarily on the **Lead Engineer**, though the FE team may produce the underlying geometry.

### Model Preparation

- **Datum alignment**: Position your model in Rhino model space relative to the architect's coordinate system — typically tied to a project benchmark or survey point. The Lead Engineer establishes this reference at project kickoff and communicates it to all engineers on the project. See [Lead Engineer — Technical Strategy](/onboarding/lead-engineer.html#technical-strategy--workflow).
- **LOD compliance**: Model scope elements at the LOD specified in the contract. LOD 350 typically requires accurate size, shape, location, orientation, and interface with adjacent elements. Confirm the required LOD with the PM or PA.
- **Layer organization**: BIM export geometry should be on clearly organized layers. Coordinate with the Lead Engineer on the export layer naming convention required by the GC or BIM manager.

### Model Upload and Submission

- Models are typically submitted as **IFC files** or in a format compatible with the project's BIM platform (e.g., Navisworks NWC, Revit RVT). Confirm the required format with the GC's BIM manager.
- Export from Rhino using the appropriate plugin or export command for the required format.
- Upload to the GC's coordination platform (e.g., BIM 360, Procore, Newforma) or to the project's shared folder per the BIM Execution Plan.
- Notify the PM when a model submission has been made so they can track it in the project log.

### Clash Detection

- Attend GC-coordinated clash detection meetings when required. The Lead Engineer typically represents Engineering at these meetings.
- Review clash reports for conflicts between millwork scope and adjacent trades (mechanical, electrical, structural, glazing).
- Assess which clashes require model revisions vs. field coordination, and communicate the plan to the PM.
- Update the model and resubmit if clashes require geometric changes.

### BIM Meetings

- The Lead Engineer participates in BIM coordination meetings as Engineering's representative.
- Prepare by reviewing the current clash report and any outstanding coordination issues before each meeting.
- Document commitments and action items from BIM meetings and communicate them to the FE team.

## Relationship to the Submittal Process

BIM model submission and shop drawing submittals are parallel tracks — they are not the same deliverable. BIM models submitted for coordination may precede shop drawings. Ensure the PA and PM are aware when BIM model submissions represent a different level of commitment than a formally approved submittal.

## Workflow Summary

1. Confirm BIM requirements at project kickoff (PM / contract review)
2. Lead Engineer establishes datum alignment and communicates to project team
3. FE produces geometry at required LOD during normal modeling workflow
4. Lead Engineer (or designated FE) exports and submits model to GC platform
5. Attend clash detection meetings; assess and resolve clashes
6. Resubmit model as needed through coordination cycles
7. Notify PM of each submission and any coordination commitments that affect scope or schedule
