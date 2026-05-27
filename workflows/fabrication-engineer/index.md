---
layout: default
title: Fabrication Engineer (FE)
permalink: /workflows/fabrication-engineer/
nav_order: 1
parent: Workflows
has_children: true
corpus_tags: [fe-release, fe-submittal]
mermaid: true
---

# Fabrication Engineer (FE) Workflow

Complete workflow for Fabrication Engineers from project assignment through PE release.

> **Related Documents**: [Project Delivery Overview](/onboarding/project-delivery.html) | [FE to PE Release](/workflows/fe-to-pe-release.html) (checklist and procedure)

```mermaid
flowchart TD
  S1["1 · Getting Started<br/>Assignments, scope, project files"]
  S2["2 · DE Phase<br/>Approximate → precise geometry"]
  S3["3 · Epicor Interaction<br/>Submittal status, job data"]
  S4["4 · Engineering Toolkit<br/>Setup and usage"]
  S5["5 · Part Naming<br/>Naming conventions"]
  S6["6 · Shipping Components<br/>SC lists"]
  S7["7 · Takeoffs / Auto-BOM<br/>Nesting and material optimization"]
  S8["8 · Submittal Review<br/>Three-folder cycle"]
  S9["9 · Material Transmittal<br/>TRA log"]
  S10["10 · BOM Procedures<br/>Creation, validation, upload"]
  S11["11 · Solid Wood Components<br/>WC workflow"]
  S12["12 · PE Release Prep<br/>Final steps before handoff"]
  S13["FE → PE Release<br/>Checklist and handoff"]

  S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7 --> S8
  S8 -->|"Revise &amp; Resubmit"| S7
  S8 --> S9 --> S10 --> S11 --> S12 --> S13
```

## Workflow Overview

The FE workflow consists of these key phases:

1. **[Getting Started](/workflows/fabrication-engineer/getting-started.html)** - Finding assignments, verifying scope, and setting up project files
2. **[Design Engineering (DE) Phase](/workflows/fabrication-engineer/design-engineering.html)** - Converting approximate geometry to precise fabrication-ready models
3. **[Epicor Interaction](/workflows/fabrication-engineer/epicor-interaction.html)** - Updating submittal status and managing job data
4. **[Engineering Toolkit](/workflows/fabrication-engineer/toolkit/)** - Setting up and using the FE toolkit
5. **[Part Naming](/workflows/fabrication-engineer/part-naming.html)** - Naming conventions and procedures
6. **[Shipping Components](/workflows/fabrication-engineer/shipping-components.html)** - Creating and managing SC lists
7. **[Takeoffs](/workflows/fabrication-engineer/takeoffs.html)** - Auto-BOM, 1D/2D nesting, and material optimization
8. **[Submittal Review](/workflows/fabrication-engineer/submittal-review.html)** - Three-folder submittal review cycle
9. **[Material Transmittal](/workflows/fabrication-engineer/material-transmittal.html)** - TRA log structure and engineer responsibilities
10. **[BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html)** - BOM creation, validation, and Epicor upload
11. **[Solid Wood Components](/workflows/fabrication-engineer/solid-wood-components.html)** - WC workflow from identification to release
12. **[PE Release Preparation](/workflows/fabrication-engineer/pe-release-prep.html)** - Final steps before releasing to PE (then complete [FE to PE Release](/workflows/fe-to-pe-release.html))
13. **[Troubleshooting](/workflows/fabrication-engineer/troubleshooting.html)** - Common issues and solutions

## Quick Links

- **New to FE?** Start with [Getting Started](/workflows/fabrication-engineer/getting-started.html)
- **Ready to release?** [PE Release Preparation](/workflows/fabrication-engineer/pe-release-prep.html) → [FE to PE Release checklist](/workflows/fe-to-pe-release.html#pre-release-checklist)
- **Having issues?** Check [Troubleshooting](/workflows/fabrication-engineer/troubleshooting.html)

## Related Resources

- [Epicor Usage](/tools/epicor/) - Detailed Epicor procedures
- [Rhino Drafting Standards](/standards/rhino-drafting/) - Drawing conventions
- [Layer Organization](/standards/layer-organization/) - Layer structure standards
- [Approvals Process](/tools/approvals-process.html) - Submitting for PA approval
