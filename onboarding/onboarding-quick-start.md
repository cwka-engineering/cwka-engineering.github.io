---
layout: default
title: Onboarding Quick Start Links
permalink: /onboarding/quick-start.html
parent: Onboarding
nav_order: 2
---

# Onboarding Quick Start Links

> **Related Documents**: [Engineering Roles & Core Competencies](/onboarding/engineering-roles.html) | [Engineer Progression Framework](/onboarding/engineer-progression-framework.html) | [Project Delivery Overview](/onboarding/project-delivery.html) | [Glossary](/reference/glossary.html)

Essential links and resources for new Engineering Department team members. Wondering how Engineer I → II works? Read the [Engineer Progression Framework](/onboarding/engineer-progression-framework.html).

### Training Videos

- **CWK/DFW Training Videos**: [Training Videos (SharePoint)](https://digifabshop.sharepoint.com/sites/Engineering/Engineering%20Wiki/Training%20Videos.aspx)
  - Transcripts are searchable

## Rhino Setup

### Templates and Resources

- **Rhino v8 (Tabloid layouts) template**: [Box.com Link](https://digifabshop.box.com/s/n93tqh5z3pi6v5rrtzhk0rihkmcml9nb)
- **'Gotham' font family**: [Box.com Link](https://digifabshop.box.com/s/u1plgcsisgwquoxyjscg7muwnfbk28hx)
- **Rhino Grasshopper 'CWK/DFW Engineering Toolkit'**: [Box.com Link](https://digifabshop.box.com/s/ytpeoi2h2ta1bumlhggqm8t8osb5fbre)
- **Required plugins**: [Box.com Link](https://digifabshop.box.com/s/9plgd3b0d50eiyz0611u3p7pkwzytlqi)
- **Display modes (.ini files)**: Available in the Engineering Resources folder on Box
- **BOM Template**: Available on Box (Engineering Resources)
- **WC Drawing Template**: Available on Box (Engineering Resources)
- **PA Release Stamps**: Available on Box (synced to Bluebeam stamps folder)

### How do I install Rhino 8 and transfer settings from Rhino 7?
{: #how-to-install-rhino}

Use **`OptionsExport`** in Rhino 7 and **`OptionsImport`** in Rhino 8 to migrate your settings. You can also copy selected files from `%AppData%\McNeel\Rhinoceros\<version>\settings`. Note that some settings do not transfer across major versions — re-import display modes and verify plugin compatibility after migration.

### How do I install required Rhino plugins via Package Manager?
{: #how-to-install-plugins}

Run `PackageManager` in Rhino 8. Install all required plugins from the department's requirements list (see Box link above). The toolkit will fail to launch if required plugins are missing. Keep automatic plugin updates enabled unless IT directs otherwise.[^transcript-rhino8-kickoff-i]

### How do I set up Synapse for the Engineering Toolkit?
{: #how-to-setup-synapse}

After installing **Synapse** via Package Manager, load **Synapse RCP** once: **Rhino Options** → **Plug-ins** → find **Synapse RCP** → right-click → **Load Plug-in**. The Synapse panel must be in the foreground before launching Grasshopper and opening the toolkit. See [Engineering Toolkit (Setup)](/workflows/fabrication-engineer/toolkit/) for full details.

### How do I import the department's custom display modes?
{: #how-to-import-display-modes}

**File → Properties → View → Display Modes → Import** → select `.ini` files from the Engineering Resources folder on Box. Standard display modes:

| Mode | Use Case |
|------|----------|
| **Monochrome** | Plans, elevations, parallel details. Clean silhouette. May require raster output. |
| **Arctic with Outlines** | Sections, isometrics, section details. |
| **Pen** | Vector output, no hidden lines. Clean line drawings. |
| **Technical** | Vector output with hidden lines (light gray). Use Bluebeam color processing for black visible lines. |

Project-specific display modes live in `00_Lead_Project_Eng/_Shared_Display_Modes`.

### How do I install the Gotham font family?
{: #how-to-install-fonts}

Download from Box (see link above). Install system-wide (right-click → Install for all users).

### How do I set up Bluebeam release stamps?
{: #how-to-setup-bluebeam-stamps}

1. Sync the stamps folder from Box (Engineering Team folder).
2. In Bluebeam: **Tools → Stamp → Change Stamp Folder** → select the synced folder.
3. Use Bluebeam **grid snaps** for alignment when placing stamps.
4. Stamps are formatted for the "Production Notes" area (upper-right corner of the drawing template).

### How do I configure Rhino backup and autosave settings for Box?
{: #how-to-configure-backups}

- Turn **off** Rhino's `.bak` sidecar backups if your workflow uses Box (avoids clutter).
- Keep **autosave** on. Optionally relocate the autosave path.
- Leave **file locking** enabled — it helps detect when another user has a file open.

> **Related**: [FE Workflow - Engineering Toolkit Usage](/workflows/fabrication-engineer/#engineering-toolkit-usage) | [Rhino Drafting and Layouts](/standards/rhino-drafting/)

---

## Suggested Reading Order
{: #suggested-reading-order}

A structured path through the wiki for new engineers. Adapt timing to your pace and role.

### Week 1: Orientation & Context

1. [Engineering Manifesto](/onboarding/manifesto.html) — Department values and beliefs
2. [Engineering Roles](/onboarding/engineering-roles.html) — Understand your role and responsibilities
3. [How We Work ◈](/onboarding/how-we-work.html) — Interactive map of all ten departments, responsibilities, and collaboration patterns
4. [Project Delivery Overview](/onboarding/project-delivery.html) — How a project flows through Engineering
5. [Scheduling Chain](/onboarding/scheduling-chain.html) — How dates drive operations *(sub-page of Project Delivery)*
6. [Purchasing Signal Chain](/onboarding/purchasing-signal-chain.html) — What triggers material purchasing *(sub-page of Project Delivery)*
7. [Glossary](/reference/glossary.html) — Terms, codes, and acronyms (bookmark for reference)

### Week 2: Tools & Environment

7. This page (Onboarding Quick Start) — Complete all Rhino and Epicor setup
8. [Folder Structure](/reference/folder-structure.html) — Where files live on Box
9. [Epicor Usage](/tools/epicor/) — Epicor overview and dashboards
10. [Multi-Site Operations](/tools/epicor/multi-site-operations.html) — CWK/DFW site switching
11. [Time Entry](/tools/time-entry.html) — Toggl + Epicor time tracking

### Week 3: Modeling & Standards

12. [Layer Organization](/standards/layer-organization/) — Layer structure and naming
13. [Material Modeling](/standards/layer-organization/material-modeling.html) — Solid bodies, thickness, edgebanding
14. [Modeling Techniques](/standards/layer-organization/modeling-techniques.html) — Scribes, Named Positions, referencing
15. [Reference Tables](/reference/reference-tables/) — File naming, cleanup commands, sheet sizes, drill sizes

### Week 4: FE Workflow

16. [FE Getting Started](/workflows/fabrication-engineer/getting-started.html) — Assignments and project setup
17. [Design Engineering Phase](/workflows/fabrication-engineer/design-engineering.html) — DE phase workflow
18. [Engineering Toolkit](/workflows/fabrication-engineer/toolkit/) — Setup, drafting, and modeling tabs
19. [Part Naming](/workflows/fabrication-engineer/part-naming.html) — Naming conventions and toolkit usage
20. [Shipping Components](/workflows/fabrication-engineer/shipping-components.html) — SC creation and export
21. [Takeoffs](/workflows/fabrication-engineer/takeoffs.html) — Auto-BOM and nesting

### Week 5+: Drafting, Release & Advanced

22. [Rhino Drafting Standards](/standards/rhino-drafting/) — Layout structure, sections, hatches, printing
23. [Submittal Review](/workflows/fabrication-engineer/submittal-review.html) — Three-folder review cycle
24. [Material Transmittal](/workflows/fabrication-engineer/material-transmittal.html) — TRA log
25. [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html) — BOM validation and Epicor upload
26. [Approvals Process](/tools/approvals-process.html) — PA approval workflow
27. [FE to PE Release](/workflows/fe-to-pe-release.html) — Checklist and release procedure
28. [Solid Wood Components](/workflows/fabrication-engineer/solid-wood-components.html) — WC workflow
29. [Engineer Progression Framework](/onboarding/engineer-progression-framework.html) — How advancement works

---

## Important Links - Epicor

### Epicor Access and Resources

- **Epicor Kinetic URL**: [https://cwkassociate-live.epicorsaas.com/server/apps/erp/home](https://cwkassociate-live.epicorsaas.com/server/apps/erp/home)
- **Epicor Kinetic Engineering homescreen layout**: [Box.com Link](https://digifabshop.box.com/s/6apk54g4s80q2psbge1y5w5hr1ajtva2)
- **Excel template for pasted time entry into Epicor**: [Box.com Link](https://digifabshop.box.com/s/2iwowy9tzeg0io8frmogpqp0chyv96l1)

> **Related**: [Epicor Usage in Engineering](/tools/epicor/) | [Time Entry](/tools/time-entry.html)

## Engineering Department Calendar

- **Web view**: [Outlook Calendar](https://outlook.office365.com/owa/calendar/347aac1a230f4c0d82fc650a01e9b2f4@digifabshop.com/dd8fbebc6a7f48969a0baa8639ec11b49451338758022573081/calendar.html)
- **ICS for Outlook**: [Calendar ICS File](https://outlook.office365.com/owa/calendar/347aac1a230f4c0d82fc650a01e9b2f4@digifabshop.com/dd8fbebc6a7f48969a0baa8639ec11b49451338758022573081/calendar.ics)

## Primary Troubleshooting Contacts

When you need help with specific systems or tools:

- **Epicor**: @Fernando Saucedo
- **Rhino Template**: @Gian Anovert
- **Microsoft Account**: @JPMerc Support
- **GH Toolkit**: @Caleb Marhoover

## Microsoft Teams Channels

### Engineering Channels

- **[Engineering General](https://teams.microsoft.com/l/channel/19%3A5e5d7627034f431ab0e0fadd79d1cada%40thread.tacv2/Engineering%20General?groupId=f16aaf66-25cc-45e5-bbc2-a509084d3fef&tenantId=b628c2c4-2783-44e3-be45-7175c147108d&ngc=true)** — Discussion, tips, troubleshooting, open questions, and surveys
- **[Engineering Announcements](https://teams.microsoft.com/l/channel/19%3Ap1RQINfRQ5FPrbogDmDixvgCHwMT93lxCM91pm53cro1%40thread.tacv2/Engineering%20Announcements?groupId=f16aaf66-25cc-45e5-bbc2-a509084d3fef&tenantId=b628c2c4-2783-44e3-be45-7175c147108d&ngc=true)** — Department-wide notices from leadership. Reactions and replies are welcome; do not post independently unless asked.

### Releases & Requests

The **Releases & Requests** Teams team houses the structured channels for submitting, routing, and confirming handoffs across the production pipeline. See [Releases & Requests](/tools/releases-and-requests/) for full documentation.

- **[Part Requests](https://teams.microsoft.com/l/channel/19%3Acb7a4d5df99e473d87f8555bd25a03f8%40thread.tacv2/Part%20Requests?groupId=f7b33eed-e1f9-489d-82c9-072a70bfb5c1&tenantId=b628c2c4-2783-44e3-be45-7175c147108d)** — Submit when you need a global material part looked up or created. See [Engineer Guide](/tools/releases-and-requests/part-requests/engineer-guide.html).
- **[Job Requests](https://teams.microsoft.com/l/channel/19%3A3beb722a6dd343ec8deec4c5e9dc1e12%40thread.tacv2/Job%20Requests?groupId=f7b33eed-e1f9-489d-82c9-072a70bfb5c1&tenantId=b628c2c4-2783-44e3-be45-7175c147108d)** — Request new ERP jobs (manufactured parts, PM jobs, truck jobs). See [Job Requests](/tools/releases-and-requests/job-requests.html).
- **[FE to PE Releases](https://teams.microsoft.com/l/channel/19%3Af18e835cfa85453488440493f348b2cc%40thread.tacv2/FE%20to%20PE%20Releases?groupId=f7b33eed-e1f9-489d-82c9-072a70bfb5c1&tenantId=b628c2c4-2783-44e3-be45-7175c147108d)** — Notify PE when a scope is ready for pickup. See [FE to PE Release — Channel Flow](/tools/releases-and-requests/fe-to-pe-release-flow.html).
- **[PE to Shop Releases](https://teams.microsoft.com/l/channel/19%3A529a28ca1bfa4a65a06ddc54a9a7d3e6%40thread.tacv2/PE%20to%20Shop%20Releases?groupId=ab06ae12-f467-48d9-b9f8-e04ddc4d917a&tenantId=b628c2c4-2783-44e3-be45-7175c147108d&ngc=true)** — Currently in the Production team; will migrate to Releases & Requests.

### Epicor (Kinetic Implementation)

- **[Engineering](https://teams.microsoft.com/l/channel/19%3A7f519182095a41529623c7ae044979ac%40thread.tacv2/Engineering?groupId=4ce1955e-bf7b-4333-b81f-316330816b47&tenantId=b628c2c4-2783-44e3-be45-7175c147108d&ngc=true)** — Engineering channel within the Epicor (Kinetic Implementation) team; Epicor implementation coordination

## Microsoft Teams Apps

- **Approvals App**: [Teams App Link](https://teams.microsoft.com/l/app/7c316234-ded0-4f95-8a83-8453d0876592)

> **Related**: [Approvals Process](/tools/approvals-process.html)

## Box.com Setup

### Box Drive Desktop Integration

Use Box Drive desktop integration to navigate through the directories:

- **Box Drive**: [https://www.box.com/drive](https://www.box.com/drive)

### Relocate Box Local File Path

In order for the whole team to share direct File Explorer links, we have adopted a custom `C:\BoxSync\` path outside of the user home folder.

**Configuration**: This Box support article explains the process. Requires setting a Windows registry key: [Configuring the Default Box Drive Folder Location (Windows Only)](https://support.box.com/hc/en-us/articles/360043697454-Configuring-the-Default-Box-Drive-Folder-Location-Windows-Only)

> **Related**: [Folder Structure & File Management](/reference/folder-structure.html)

## Footnotes
[^transcript-rhino8-kickoff-i]: Source: [Training Video — "Rhino 8 Kickoff Pt I"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQClvTAp_DlXSImI44GZjhPoAUjkAO2ROrfgSxu2Sy_oyQc?e=vWqkSZ)
