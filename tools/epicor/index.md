---
layout: default
title: Epicor Usage
permalink: /tools/epicor/
nav_order: 1
parent: Tools
has_children: true
corpus_tags: [fe-release, fe-submittal]
---

# Epicor Usage in Engineering

Central system for managing project data, workflows, and production readiness.

> **Related Documents**: [Time Entry](/tools/time-entry.html) | [FE Workflow](/workflows/fabrication-engineer/) | [Approvals Process](/tools/approvals-process.html)

## How do I import and set up my Epicor layout?
{: #how-to-import-layout}

In Epicor, navigate to your home screen. Right-click the card area → **Import Layout** to load a shared layout file from the Engineering Team folder. Arrange cards by dragging/dropping. Site-specific cards (labeled CW or DF) only work in their corresponding site — see [Multi-Site Operations](/tools/epicor/multi-site-operations.html).

## How do I personalize dashboard columns?
{: #how-to-personalize-columns}

Right-click any column header → **Personalize**. Add, remove, or reorder columns. Save personalization so it persists across sessions. Common additions: PE Start Date, Submittal Status, Hours Booked, Fixed QTY status.

## Overview

Epicor integrates with tools like Rhino and Toggl to streamline operations from design to release.

**Key Functions**:
- **Centralized Data**: Stores part numbers, materials, job statuses.
- **Workflow Integration**: Supports BOM creation, naming, and job release.
- **Rhino**: Fabrication engineers use the **[Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html)** in Rhino for read-only Epicor lookups (parts, job BOMs, material schedules) and for publishing that data onto drawing layouts—see that page for how dashboards and transmittal data connect.

## Multi-Site Configuration

Epicor operates with multiple sites (CWK and Digifab Shop). [^transcript-epicor-home]

- **Site Selection**: Click your user icon in the bottom left → Company → Select site (CWK or Digifab Shop)
- **Important**: After switching sites, **refresh the page** to ensure cards display correctly
- **Site-Specific Cards**: Cards labeled with (CW) or (DF) only work in their corresponding site
- **Global Cards**: Cards without site labels work from either site but display site-specific data

## Topic Index

1. **[Dashboards](/tools/epicor/dashboards.html)** - Submittal, Project Materials, and Scheduling dashboards
2. **[Drafting Toolkit (Rhino)](/workflows/fabrication-engineer/toolkit/drafting.html)** - Epicor part/BOM/schedule readout and layout publish from Rhino
3. **[Production Report](/tools/epicor/production-report.html)** - Using the Production Report for status updates
4. **[Part Management](/tools/epicor/part-management.html)** - Creating and managing parts (GM, WC, Custom)
5. **[Job Management](/tools/epicor/job-management.html)** - Job entry, release checklists, and responsibilities
6. **[Multi-Site Operations](/tools/epicor/multi-site-operations.html)** - CWK/DFW site switching, site-specific behavior, time entry
7. **[Inventory Jobs (INV)](/tools/epicor/inventory-jobs.html)** - Project inventory job process, takeoff purchasing, and audit report
8. **[Troubleshooting](/tools/epicor/troubleshooting.html)** - Common issues and solutions

## Quick Links

- **My Assignments**: [Submittal Dashboard](/tools/epicor/dashboards.html#submittal-dashboard)
- **Rhino / layouts**: [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html)
- **Status Updates**: [Production Report](/tools/epicor/production-report.html)
- **New Parts**: [Part Management](/tools/epicor/part-management.html)
- **Takeoff Audit**: [Inventory Jobs](/tools/epicor/inventory-jobs.html)

## Footnotes
[^transcript-epicor-home]: Source: [Training Video — "Epicor Home Screen"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQBr1E3ao6ygR7h98ROBRYaJAe1gqE1Vd7xOBNkCdky3CuA?e=XxJE0S)
