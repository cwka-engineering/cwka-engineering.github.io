---
layout: default
title: Wiki Changelog
permalink: /reference/changelog.html
parent: Reference
nav_order: 5
---

# Wiki Changelog

A record of significant additions and updates to the Engineering Wiki.

---

## 2026-05-20

- **[Time Entry — Operation Selection Guide](/tools/time-entry.html#operation-selection-guide)** — New section defining correct classification for all engineering labor operations: Submittal/Post-Submittal trigger rules, Design Engineering vs. Fabrication Engineering scope distinction (including parametric scripting), indirect operation definitions, labor note requirements, and a common misclassification table.
- **[Toggl Setup & Upload](/tools/time-entry/toggl.html)** — Toggl content split into a dedicated child page under Time Entry (installation, structure & naming, entry creation, export, Epicor upload procedure).
- **[FE Release Diagnostic Tool](/tools/diagnostic.html)** — New page documenting the standalone PE release validator: GUI walkthrough, three validator categories (Document Structure, Model Objects, ERP Integration), status indicators, Summarize Results feature, Excel export with GUID column, and in-Rhino "Assistant" button integration. Running the diagnostic before every PE release is required.
- **[Corner Clearance Standard](/standards/layer-organization/modeling-techniques.html)** — 0.51" × 0.26" corner clearance added for CNC-routed slots, pockets, and notches (waffle structures, half laps, notches). No radii. Ensures compatibility across both shops for router bits ≤ 0.5" diameter.
- **[BOM Procedures — Increasing Quantity on a Completed MFG Job](/workflows/fabrication-engineer/bom-procedures.html)** — Documents the .1 job pattern when a manufactured part job is complete and closed. Applies to all MFG job types.
- **[Shipping Components — UD40 Company Code](/workflows/fabrication-engineer/shipping-components.html)** — Company number column is required for UD40 upload; missing or incorrect code creates bad rows that require an Epicor support ticket.
- **[Overage & Extras — Manufactured Part Overage](/workflows/fabrication-engineer/overage-and-extras.html)** — Clarifies that PM cannot retroactively adjust manufactured part quantity once a job closes. Engineer must coordinate overage with production and PE before the original job releases.
- **[Revision History — Rhino Revision Cloud Alias](/standards/rhino-drafting/revision-history.html)** — Alias macro for efficiently creating revision clouds in Rhino.

---

## 2026-05-19

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

## 2026-04-13

- **[Training Videos](/reference/training-videos.html)** *(new)* — Complete index of engineering training recordings with links to relevant wiki pages.
- **[Site Map](/sitemap-graph.html)** — Interactive D3.js force-directed graph showing wiki page connectivity added.
- **Wiki structure** — Reorganized from 4 sections to 5: Onboarding, Workflows, Standards, Tools, Reference.

---

## 2026-04-07

- **Home page** — Wiki Assistant info added.
- **[Inventory Jobs](/tools/epicor/inventory-jobs.html)** *(new)* — INV job workflow and purchasing flow documentation.

---

## 2026-04-04

- **Wiki Assistant** — Cloudflare Worker / Claude integration launched; accessible from the home page.

---

## 2026-04-01 – 2026-04-03

- **Major content integration** — Large batch of content from training transcripts added across FE workflow, PE workflow, Epicor, and standards pages.

---

## 2026-02-17 – 2026-02-18

- **Wiki restructure** — PE workflow split into dedicated pages; toolkit setup and drafting/modeling pages separated; page hierarchy introduced across all sections.

---

## 2025-11-24 – 2025-11-26

- **Initial wiki** — Site created on Just the Docs theme; initial content structure established for Onboarding, Workflows, Standards, and Tools.
