---
layout: default
title: Quick Reference
permalink: /workflows/quick-reference.html
parent: Workflows
nav_order: 5
---

# Quick Reference: Workflows

Task-oriented index for workflow procedures. Each link goes directly to the relevant how-to section.

## Project & Job Setup

| # | Task | Page |
|---|------|------|
| B10 | Find my job assignment in Epicor | [Getting Started](/workflows/fabrication-engineer/getting-started.html#how-to-find-assignments) |
| B11 | Verify my scope in the working set | [Getting Started](/workflows/fabrication-engineer/getting-started.html#how-to-verify-scope) |
| B12 | Set up a new project folder on Box | [Getting Started](/workflows/fabrication-engineer/getting-started.html#how-to-set-up-project-folder) |
| B13 | Set up a new FE job folder | [Getting Started](/workflows/fabrication-engineer/getting-started.html#how-to-set-up-job-folder) |
| B14 | Create a new Rhino file from the template | [Getting Started](/workflows/fabrication-engineer/getting-started.html#how-to-create-rhino-file) |
| B15 | Switch between CWK and Digifab sites in Epicor | [Multi-Site Operations](/tools/epicor/multi-site-operations.html#how-to-switch-sites) |
| B16 | Import the working set plan into my Rhino model | [Getting Started](/workflows/fabrication-engineer/getting-started.html#how-to-import-working-set) |

## Engineering Toolkit Operations

| # | Task | Page |
|---|------|------|
| C17 | Launch the Engineering Toolkit for the first time | [Toolkit Setup](/workflows/fabrication-engineer/toolkit-setup.html#how-to-launch-toolkit) |
| C18 | Log into Epicor through the toolkit | [Toolkit Setup](/workflows/fabrication-engineer/toolkit-setup.html#how-to-login-epicor) |
| C19 | Pull the toolkit payload | [Toolkit Setup](/workflows/fabrication-engineer/toolkit-setup.html#how-to-pull-payload) |
| C20 | Restore model space from the template | [Toolkit Setup](/workflows/fabrication-engineer/toolkit-setup.html#how-to-restore-model-space) |
| C21 | Restore layout pages from the template | [Toolkit Setup](/workflows/fabrication-engineer/toolkit-setup.html#how-to-restore-layout-space) |
| C22 | Set drawing variables (submittal scope, project metadata) | [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html#how-to-set-drawing-variables) |
| C23 | Populate the T00 (Title/Project) page | [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html#how-to-populate-t00) |
| C24 | Populate the G00 (General Requirements/Schedules) page | [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html#how-to-populate-g00) |
| C25 | Publish BOM data to the pick list (L001) | [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html#how-to-publish-bom-to-l001) |
| C26 | Look up an Epicor part and create the correct material layer | [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html#how-to-lookup-part) |
| C27 | Cache the Epicor parts database for offline use | [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html#how-to-cache-parts-database) |
| C28 | Reset the toolkit after making model changes | [Toolkit Setup](/workflows/fabrication-engineer/toolkit-setup.html#how-to-reset-toolkit) |
| C29 | Handle a group submittal in the toolkit | [Drafting Toolkit](/workflows/fabrication-engineer/toolkit/drafting.html#how-to-handle-group-submittal) |

## Modeling Workflows

| # | Task | Page |
|---|------|------|
| D30 | Set up the layer structure for a new FE model | [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html#how-to-setup-layers) |
| D31 | Create a material layer from Epicor | [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html#how-to-lookup-part) |
| D32 | Handle placeholder layers when part numbers aren't known yet | [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html#how-to-handle-placeholders) |
| D33 | Insert reference geometry from another file | [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html#how-to-insert-reference-geometry) |
| D34 | Insert hardware blocks from the library | [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html#how-to-insert-hardware) |
| D35 | Create a higher-order hardware assembly block | [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html#how-to-create-assembly-block) |
| D36 | Model a pre-laminated (PRE) lay-up | [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html#how-to-model-pre-layup) |
| D37 | Determine when to model edgebanding vs. when to omit it | [Material Modeling](/standards/layer-organization/material-modeling.html#how-to-determine-edgebanding) |
| D38 | Handle painted MDF with exposed edges | [Material Modeling](/standards/layer-organization/material-modeling.html#how-to-handle-painted-mdf) |
| D39 | Check that parts fit within actual sheet sizes | [Actual Sheet Sizes](/standards/reference-tables/sheet-sizes.html) |
| D40 | Create and manage scribes | [Modeling Techniques](/standards/layer-organization/modeling-techniques.html#how-to-create-scribes) |
| D41 | Set up Named Positions for exploded views | [Modeling Techniques](/standards/layer-organization/modeling-techniques.html#how-to-setup-named-positions) |
| D42 | Clean up my model before release | [Model Cleanup Commands](/standards/reference-tables/model-cleanup-commands.html) |

## Part Naming & Shipping Components

| # | Task | Page |
|---|------|------|
| E43 | Group parts into shipping components | [Part Naming](/workflows/fabrication-engineer/part-naming.html#how-to-group-parts) |
| E44 | Generate part names using the toolkit | [Part Naming](/workflows/fabrication-engineer/part-naming.html#how-to-generate-part-names) |
| E45 | Name manufactured parts (MT/WC) in the model | [Part Naming](/workflows/fabrication-engineer/part-naming.html#how-to-name-mfg-parts) |
| E46 | Replace name segments (e.g., change the job number) | [Part Naming](/workflows/fabrication-engineer/part-naming.html#how-to-replace-name-segments) |
| E47 | Add descriptions to shipping components | [Shipping Components](/workflows/fabrication-engineer/shipping-components.html#how-to-add-sc-descriptions) |
| E48 | Export the shipping components list | [Shipping Components](/workflows/fabrication-engineer/shipping-components.html#how-to-export-sc-list) |
| E49 | Audit part name uniqueness (SelName check) | [Part Naming](/workflows/fabrication-engineer/part-naming.html#how-to-audit-part-names) |

## BOM, Takeoffs, and Material Management

| # | Task | Page |
|---|------|------|
| G62 | Run the Auto-BOM feature | [Takeoffs](/workflows/fabrication-engineer/takeoffs.html#how-to-run-auto-bom) |
| G63 | Export BOM data for Epicor paste-insert | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html#how-to-export-bom-for-epicor) |
| G64 | Run 1D nesting (stick optimization) | [Takeoffs](/workflows/fabrication-engineer/takeoffs.html#how-to-run-1d-nesting) |
| G65 | Run 2D nesting (sheet optimization) | [Takeoffs](/workflows/fabrication-engineer/takeoffs.html#how-to-run-2d-nesting) |
| G66 | Create a part in Epicor (project-specific material) | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html#how-to-create-epicor-part) |
| G67 | Request a general (global) material part | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html#how-to-request-global-part) |
| G68 | BOM a material to a job in Epicor | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html#how-to-bom-material) |
| G69 | Verify my BOM against the Rhino model | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html#how-to-verify-bom) |
| G70 | Handle post-release BOM changes | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html#how-to-handle-post-release-changes) |

## Solid Wood Components (WC)

| # | Task | Page |
|---|------|------|
| H71 | Determine if a wood part qualifies as a WC | [Solid Wood Components](/workflows/fabrication-engineer/solid-wood-components.html#how-to-determine-wc) |
| H72 | Create a WC part in Epicor | [Solid Wood Components](/workflows/fabrication-engineer/solid-wood-components.html#how-to-create-wc-part) |
| H73 | Determine if a WC profile needs a knife | [Solid Wood Components](/workflows/fabrication-engineer/solid-wood-components.html#how-to-determine-knife) |
| H74 | Create a WC drawing | [Solid Wood Components](/workflows/fabrication-engineer/solid-wood-components.html#how-to-create-wc-drawing) |
| H75 | BOM a WC part with proper comments | [Solid Wood Components](/workflows/fabrication-engineer/solid-wood-components.html#how-to-bom-wc-part) |
| H76 | Request a WC manufacturing job | [Solid Wood Components](/workflows/fabrication-engineer/solid-wood-components.html#how-to-request-wc-job) |
| H77 | Release a WC job | [Solid Wood Components](/workflows/fabrication-engineer/solid-wood-components.html#how-to-release-wc-job) |
| H78 | Handle a WC quantity change after requesting the job | [Solid Wood Components](/workflows/fabrication-engineer/solid-wood-components.html#how-to-handle-wc-quantity-change) |

## PA Approvals & Submittal

| # | Task | Page |
|---|------|------|
| I79 | Submit a drawing set for PA approval | [Approvals Process](/tools/approvals-process.html#how-to-submit-for-approval) |
| I80 | Respond to a denied approval | [Approvals Process](/tools/approvals-process.html#how-to-respond-to-denial) |
| I81 | Stamp an approved drawing set | [Approvals Process](/tools/approvals-process.html#how-to-stamp-approved-set) |
| I82 | Track submittal status in Epicor | [Approvals Process](/tools/approvals-process.html#how-to-track-submittal-status) |

## FE-to-PE Release

| # | Task | Page |
|---|------|------|
| J83 | Set up the PE release folder | [FE to PE Release](/workflows/fe-to-pe-release.html#how-to-setup-release-folder) |
| J84 | Set up a MFG parts release folder | [FE to PE Release](/workflows/fe-to-pe-release.html#how-to-setup-mfg-folder) |
| J85 | Create a clean PE file | [FE to PE Release](/workflows/fe-to-pe-release.html#how-to-create-pe-file) |
| J86 | Upload shipping components to Epicor (UD40) | [FE to PE Release](/workflows/fe-to-pe-release.html#how-to-upload-scs) |
| J87 | Complete the Epicor release process | [FE to PE Release](/workflows/fe-to-pe-release.html#how-to-complete-epicor-release) |
| J88 | Submit the FE-to-PE Release form | [FE to PE Release](/workflows/fe-to-pe-release.html#how-to-submit-release-form) |
| J89 | Handle a late release (after PE start date) | [FE to PE Release](/workflows/fe-to-pe-release.html#how-to-handle-late-release) |
| J90 | Determine if a handoff meeting is required | [FE to PE Release](/workflows/fe-to-pe-release.html#how-to-determine-handoff-meeting) |

## Production Engineering

| # | Task | Page |
|---|------|------|
| L96 | Set up a PE job folder | [PE Setup](/workflows/production-engineer/setup.html#how-to-setup-pe-folder) |
| L97 | Create a SHOP model | [PE Setup](/workflows/production-engineer/setup.html#how-to-create-shop-model) |
| L98 | Process parts using Grasshopper scripts | [PE Processing](/workflows/production-engineer/processing.html#how-to-process-parts) |
| L99 | Create a Master Parts List | [PE Deliverables](/workflows/production-engineer/deliverables.html#how-to-create-master-parts-list) |
| L100 | Create a Lay-Up Summary | [PE Deliverables](/workflows/production-engineer/deliverables.html#how-to-create-layup-summary) |
| L101 | Run accuracy checks before marking Programming Complete | [PE Processing](/workflows/production-engineer/processing.html#how-to-run-accuracy-checks) |
| L102 | Mark a job Programming Complete in Epicor | [PE Deliverables](/workflows/production-engineer/deliverables.html#how-to-mark-programming-complete) |
