---
layout: default
title: Engineering Toolkit (Setup)
permalink: /workflows/fabrication-engineer/toolkit/
nav_order: 3
parent: Fabrication Engineer (FE)
grand_parent: Workflows
has_children: true
---

# Engineering Toolkit

> **Related**: [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html) | [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html)

## Launching Toolkit

- **Open Rhino**: Synapse panel > Grasshopper > Load latest FE toolkit. [^transcript-toolkit-setup]
- **Location**: `DFWCWKA internal > Engineering resource > shared GH for Grasshopper > FE Engineering Toolkit`
- **Note**: If the toolkit doesn't appear, ensure Grasshopper is installed and the latest toolkit version is available in the shared Engineering Team folder.
- **First Time Opening**: [^transcript-toolkit-setup] The toolkit will take a minute to load on first open - there's a loading bar in the Grasshopper canvas as Python components pull required libraries.
- **Save Personal Copy**: After opening, save the toolkit with your initials (e.g., `FE_Toolkit_JD.gh`) to your preferred location. This becomes your personal copy.

## First Run Setup

### Plugin Requirements
- **PackageManager**: [^transcript-toolkit-setup] Starting with Rhino 8, use the built-in Package Manager (run command `PackageManager`) to install required plugins. The toolkit requires specific plugins - if you try to launch without them, it will fail and show a reset button listing required plugins.
- **Required Plugin**: Synapse - allows custom UI within Rhino. The Synapse panel must be in the foreground when launching Grasshopper.

### Login (Epicor Data)
- **Login**: [^transcript-toolkit-setup] Type your Epicor username, hit enter (caches username). Enter password, hit enter (caches password). Both are cached to disk for future use.
- **Troubleshooting**: If login fails, verify Epicor access and check with IT if credentials need updating.

### Pull Payload
- **Action**: [^transcript-toolkit-setup] On first run only - go to Setup tab, expand "Toolkit Payload", click "Pull Payload" to download CW/DFW-specific information from server. Wait for CW logo to appear in reset button.

### Reset / Verify
- **Reset**: [^transcript-toolkit-setup] Click reset button (always shows an error - ignore it). Reset will verify plugin versions and show list of required plugins if any are missing. When complete, username and password will be hidden (cached).

## Footnotes
[^transcript-toolkit-setup]: Source: Training Video Transcript - "Toolkit Setup"
