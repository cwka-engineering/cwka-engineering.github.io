---
layout: default
title: Computational Fabrication
permalink: /workflows/computational-fabrication.html
parent: Workflows
nav_order: 4
---

# Computational Fabrication & Advanced Practice

The department's approach to computational design and the principles of productive friction.

> **Related Documents**: [Engineering Roles](/overview/engineering-roles.html) | [Engineer Progression Framework](/overview/engineer-progression-framework.html)

## What Computational Fabrication Means at CWK

Computational fabrication is a method of working in which every design decision is governed by real-world constraints: material availability, CNC machine capabilities, shipping dimensions, labor sequencing, and the tolerances demanded by physical construction.

**Case study — Braman Cancer Center:** Approximately 98 unique mold configurations for roughly 460 precast concrete panels, with a Grasshopper system generating complete production-ready molds in approximately 45 seconds (down from four to five days manually).

## The Logic Library Approach

The department builds a **logic library** — a curated, tagged collection of Grasshopper workflows organized by the operations they perform, not the projects they belong to. Future projects draw on proven solutions without starting from scratch.

This means:
- Scripts are modular and reusable across projects
- Common operations (nesting, part naming, BOM generation) are standardized
- New engineers can leverage existing tools rather than building from scratch

## Productive Friction

The iterative feedback loop between the computational system, the shop floor, and the client. Each production issue becomes an input that makes the system smarter.

The enabling principle: **modular architecture** (Hops sub-definitions) so issues can be diagnosed, fixed, and redeployed without disrupting the pipeline.

## Five Principles for Developing Automation

1. **Never bet the project on unfinished software.** Have a manual fallback for every automated process.
2. **Limit scope deliberately.** Target the 85% that follows predictable rules. Handle the remaining 15% manually.
3. **Design in 2D and extrude.** Avoid solid Boolean differencing — it is fragile and computationally expensive.
4. **Query real data from the ERP system.** Actual material dimensions from Epicor via REST API, not nominal catalog dimensions. This is critical for accurate nesting.
5. **Build accessible tools.** Synapse/Eto dashboards for non-specialists. A tool only has value when the whole team can use it.

## Cross-Disciplinary Data Flow

The Braman project demonstrated compounding returns across disciplines:
- Architect's model → panel analysis → rebar optimization (11,500 unique bars reduced to fewer than 200)
- Revit delivery → mold generation → production engineering pipeline
- Shipping optimization → georeferenced slab edge molds

At no point was data recreated from scratch. Each system consumed the output of the previous one.

## Career Path Connection

Computational design mastery is one of the pathways under **Technical Proficiency & Automation** in the [Engineer Progression Framework](/overview/engineer-progression-framework.html). Building reusable tools, scripts, and analysis capabilities that benefit the department is a recognized path to Engineer II and the Technical Steering Committee.
