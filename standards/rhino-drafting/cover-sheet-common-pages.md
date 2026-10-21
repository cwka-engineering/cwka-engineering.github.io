---
layout: default
title: Cover Sheet & Common Pages
permalink: /standards/rhino-drafting/cover-sheet-common-pages.html
parent: Rhino Drafting
grand_parent: Standards
nav_order: 9
corpus_tags: [fe-submittal]
---

# Cover Sheet & Common Pages

The `02_CoverSheet_CommonPages` folder contains project-level documents that attach to any full project submittal or record set.

> **Related**: [Layout Structure](/standards/rhino-drafting/layout-structure.html) | [Folder Structure](/reference/folder-structure.html) | [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html)

## Shared Base Floorplan (Rhino)

In addition to the 2D drawing documents below, `02_CoverSheet_CommonPages` is the canonical location for the **shared Rhino base floorplan** — the project-wide working model file that all engineers link into their individual scope files.

- **Set up by the Lead Engineer** at the start of the project
- All engineers must reference this file (linked block or worksession) so that any scope model can be combined with others for clash detection and coordination without additional setup
- If the project contract includes a BIM deliverable, the base plan must be positioned in model space relative to the datum used by the architect and adjacent subcontractors

See [Lead Engineer Responsibilities](/onboarding/lead-engineer.html) for setup obligations.

## Standard Common Pages

### Cover (C00)
The logo page: the digifabshop | CWKA logo centred on an otherwise blank tabloid page. It has no text and no title block, so it carries no drawing number on the page.

### Title Sheet (T00)
The project's front page. It shows the project name (up to three title lines), address, issue date, project number, client and architect, a **project index** of every job under the project (this submittal's jobs are set in **bold and underlined**; a grouped submittal marks each of its jobs), a referenced-contract-documents section, and a view of the item on the right. The project index lists jobs, not drawings; the list of drawings in the set is on G00.

### General Requirements (G00)
Schedules generated via the Engineering Toolkit from the Material Transmittal Log and the job's BOM. Five tables:
- **Item drawings** — drawing number, title and issue date of each sheet in the set (the drawing set's table of contents)
- **General material tags** — CWK material tag and ARCH tag cross-reference, descriptions, FSC certification, fire rating, moisture resistance, emissions
- **Finish tags** — tag, reference tag, description, sheen
- **Veneer and solid wood tags** — tag, reference tag, species, cut, match, sequence
- **Bill of materials** — part number and description (hardware appears here as `GM.HW.#####` part numbers; there is no separate hardware tag table)

Approval status and transmittal numbers are internal PM tracking in the TRA and do not appear on G00.

Populated via the [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html#how-to-populate-g00) — do not manually edit linked fields.

### Master Floorplan / Keyplan
Per level, showing all awarded scope in context. Provides site orientation for reviewers.

### Partition Plans
Field dimensions, ceiling heights, blocking locations, electrical coordination, and load calculations if needed.

### Pre-Submittal Sets
Scope and design intent clarification documents shared before formal submittal to align expectations with the client and architect.

### Typical Details
Details showing interaction between adjacent scopes — how different job scopes connect and transition.

## Usage

This set is included with:
- Full project submittal packages
- Record sets
- Drawing packages given to the install team

## Drawing Page Type Reference

| Code | Page Type | Content |
|------|-----------|---------|
| C00 | Cover | Logo page; no text or title block |
| T00 | Title Sheet | Project name, address, client and architect, project index of all jobs (this submittal's jobs in bold and underlined), item view |
| G00 | General Requirements | Item drawings list, material/finish/veneer tag tables from TRA, bill of materials |
| 1XX | Reference Plans | Floor plans, enlarged plans, RCPs, VIF plans |
| 2XX | Shop Drawings | Iso → Plans → Elevations → Sections → Details |
| 3XX | Install & Shipping | SC list, installation supplements for site conditions |
| 4XX | Fabrication Supplements | Layups, veneer sequences, glue-up jigs (internal use) |
| SKXX | Sketches | Quick feedback; not in submission set |
| S000 | Nested Sheets | Nested sheet layouts; in the template with the larger title-block layout, as L000 has |
| L000 | Master Parts List | Standardized parts schedule (still present, underused) |
| L001 | Pick List | **Deprecated** — removed from the general Rhino tabloid template |
