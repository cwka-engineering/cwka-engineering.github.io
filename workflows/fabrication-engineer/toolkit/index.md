---
layout: default
title: Engineering Toolkit (Setup)
permalink: /workflows/fabrication-engineer/toolkit/
nav_order: 4
parent: Fabrication Engineer (FE)
grand_parent: Workflows
has_children: true
corpus_tags: [fe-release, fe-submittal]
---

# Engineering Toolkit

> **Related**: [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html) | [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html)

## Drafting vs Modeling

- **Drafting**: [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html) — Epicor-driven **schedules and BOM** on layouts, part lookup, template/layout restore, and **publish** workflows that keep drawings aligned with Epicor and the PM-maintained material schedule.
- **Modeling**: [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html) — Part naming, **L00/L001** style outputs, analysis, and **hardware** integration (including the shared library populated via McMaster-Carr requests).[^transcript-rhino8-kickoff-ii]

## FE Release Diagnostic (In-Rhino)

The toolkit includes an **Assistant** button (next to Reset) that runs the [FE Release Diagnostic Tool](/tools/diagnostic.html) on the currently open file and launches the wiki assistant pre-loaded with the findings. Use it when preparing a PE release handoff file — see [FE Release Diagnostic Tool](/tools/diagnostic.html) for full documentation.

## Launching Toolkit
{: #how-to-launch-toolkit}

- **Open Rhino**: Synapse panel > Grasshopper > Load latest FE toolkit. [^transcript-toolkit-setup]
- **Location**: `DFWCWKA internal > Engineering resource > shared GH for Grasshopper > FE Engineering Toolkit`
- **Note**: If the toolkit doesn't appear, ensure Grasshopper is installed and the latest toolkit version is available in the shared Engineering Team folder.
- **First Time Opening**: [^transcript-toolkit-setup] The toolkit will take a minute to load on first open - there's a loading bar in the Grasshopper canvas as Python components pull required libraries.
- **Save Personal Copy**: After opening, save the toolkit with your initials (e.g., `FE_Toolkit_JD.gh`) to your preferred location. This becomes your personal copy.

## First Run Setup

### Plugin Requirements
- **PackageManager**: [^transcript-toolkit-setup] Starting with Rhino 8, use the built-in Package Manager (run command `PackageManager`) to install required plugins. The toolkit requires specific plugins - if you try to launch without them, it will fail and show a reset button listing required plugins.
- **Required Plugin**: Synapse - allows custom UI within Rhino. The Synapse panel must be in the foreground when launching Grasshopper. After installing Synapse from Package Manager, **load Synapse RCP** once: **Rhino Options** → **Plug-ins** → find **Synapse RCP** (remote control panel) → right-click → **Load Plug-in** (or equivalent) so the Synapse panel appears.

### Login (Epicor Data)
{: #how-to-login-epicor}

- **Login**: [^transcript-toolkit-setup] Type your Epicor username, hit enter (caches username). Enter password, hit enter (caches password). Both are cached to disk for future use.
- **Troubleshooting**: If login fails, verify Epicor access and check with IT if credentials need updating.

### Pull Payload
{: #how-to-pull-payload}

- **Action**: [^transcript-toolkit-setup] On first run only - go to Setup tab, expand "Toolkit Payload", click "Pull Payload" to download CW/DFW-specific information from server. Wait for CW logo to appear in reset button.

### Reset / Verify
{: #how-to-reset-toolkit}

- **Reset**: [^transcript-toolkit-setup] Click reset button (always shows an error - ignore it). Reset will verify plugin versions and show list of required plugins if any are missing. When complete, username and password will be hidden (cached).
- **When to reset**: After any significant model space changes (importing geometry, modeling new parts), click reset to ensure the toolkit grabs the freshest data.

### How do I restore model space from the template?
{: #how-to-restore-model-space}

Drafting Toolkit → **Template tab** → **Restore Model Space**. Pulls in and merges latest data from the template — adds missing layers, geometry, annotation styles. You can toggle specific items on/off.

### How do I restore layout pages from the template?
{: #how-to-restore-layout-space}

Drafting Toolkit → **Template tab** → **Restore Layout Space**. Select specific pages or restore all. Hover over page names for descriptions (e.g., "Master Parts List", "G00 General Schedule").

## Footnotes
[^transcript-toolkit-setup]: Source: [Training Video — "Toolkit Setup"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQB9FOHdcDGDR5e8KtWkPqyuAcs5HEWxjPZsR6x5keVKAhA?e=QtDWuB)
[^transcript-rhino8-kickoff-ii]: Source: [Training Video — "Rhino 8 Kickoff Pt II"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQDPcGdpPFE7R4qYb8JE-0pEAWP7lZ3x3-mehH6F1qiQJVg?e=VaMdtA)
