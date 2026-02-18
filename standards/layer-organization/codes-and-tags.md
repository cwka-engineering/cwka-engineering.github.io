---
layout: default
title: Codes & Tags
permalink: /standards/layer-organization/codes-and-tags.html
nav_order: 5
parent: Layer Organization
grand_parent: Standards
---

# Codes & Tags

> **Related**: [Material Modeling](/standards/layer-organization/material-modeling.html) | [Standard Layers](/standards/layer-organization/standard-layers.html)

## Lay-up Material Code

Created by FE, used in Rhino layer name.

### Format
`PRE_GoodFace_Core_BackFace_ThicknessMM`

Example: `PRE_438_331_7_19`
- First = Good face
- Second = Core
- Third = Back face
- Fourth = Thickness (rounded mm)

### Lay-up Summary
- Created by PE for Panel Lay-up team.
- Includes: Code, description, materials, quantities.
- Stored in Production Files, printed by EA.

### Lay-up Formula
- Each face = 1/32" (0.03125")
- Nominal core + faces = total thickness.
- Example: ¼" lay-up = 0.3125"

## Material Tag Standards

### Format
- `MaterialCode` + `DoubleDigitNumber` (e.g., `MDF01`)
- No spaces, hyphens, underscores.

### Project Transmittal Log
- All tags must be listed.
- Managed by PM.
- Used by engineering toolkit for drawing schedules.

### Tag Types
- **General**: MDF, EB, PB, PLY, OSB, ML, PLAM, PL, GL, SS, FU, ST, MT, HW
- **Wood/Veneer**: VN (Veneer), WD (Solid Wood)
- **Finish**: PT (Paint), FN (Other finishes)

## Next Steps
- Review [Standard Layers](/standards/layer-organization/standard-layers.html)
