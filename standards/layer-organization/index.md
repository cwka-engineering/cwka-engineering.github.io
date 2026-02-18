---
layout: default
title: Layer Organization
permalink: /standards/layer-organization/
nav_order: 2
parent: Standards
has_children: true
---

# Layer Organization

Standard layer structure and organization for Rhino models.

> **Related Documents**: [Rhino Drafting](/standards/rhino-drafting/) | [Folder Structure](/standards/folder-structure.html)

## Overview

Proper layer organization ensures consistency across projects and facilitates collaboration between Design Engineering (DE), Fabrication Engineering (FE), and Production Engineering (PE) phases.

## Layer Philosophy

Rhino models use parent layers based on project phases: PRECON, DE, FE, PE. Each phase increases in Level of Detail (LOD). [^transcript-rhino-modeling]

1. **First Level**: Based on design process phase (PRECON, DE, FE, PE) - indicates provenance of geometry.
2. **Second Level (FE)**: Based on geometry type:
   - **PUR (Purchased)**: Purchased materials in Epicor
   - **MFG (Manufactured)**: Manufactured materials in Epicor
   - **CON (Construction)**: Helper geometry
3. **Third Level**: Material classes (fabric, upholstery, glass, hardware, etc.)

## Topics

1. **[Standard Layers](/standards/layer-organization/standard-layers.html)** - Comprehensive list of layers by phase (00-DWG to 04-PE)
2. **[Modeling Techniques](/standards/layer-organization/modeling-techniques.html)** - Scribes, Named Positions, Referencing
3. **[Manufactured Parts](/standards/layer-organization/manufactured-parts.html)** - Naming and referencing MFG parts
4. **[Material Modeling](/standards/layer-organization/material-modeling.html)** - Thickness conventions and size guidelines
5. **[Codes & Tags](/standards/layer-organization/codes-and-tags.html)** - Lay-up codes and material tag standards

## Quick Links

- **Layer List**: [Standard Layers](/standards/layer-organization/standard-layers.html)
- **Part Naming**: [Manufactured Parts](/standards/layer-organization/manufactured-parts.html)
- **Material Codes**: [Codes & Tags](/standards/layer-organization/codes-and-tags.html)

## Footnotes
[^transcript-rhino-modeling]: Source: Training Video Transcript - "Rhino Modeling"
