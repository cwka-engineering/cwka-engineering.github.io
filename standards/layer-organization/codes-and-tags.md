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

For the complete tag vocabulary with examples for every material category, see [Material Tag Vocabulary](/standards/reference-tables/material-tag-vocabulary.html).

Summary of common tag abbreviations:

| Category | Tags |
|----------|------|
| **General materials** | CONC, GL, HDF, HDU, LAM, LVL, MDF, MDO, MEL, MT, PB, PL, PLTR, PLY, SG, SS, ST |
| **Wood/Veneer/EB** | EB (Edgebanding), VN (Veneer), WD (Solid Wood) |
| **Finishes** | FN (all finishes — paint, powder coat, lacquer, stain) |
| **Fabric** | FA (Fabric, upholstery foam) |
| **Hardware** | HW, LT, BRACKET, CATCH, CASTER, DRAWER SLIDES, GROMMET, HINGES, LOCK, POWER, PULL, RECEPTACLE, TABLE LEG |

### ARCH Tags

The architect's tag designation for the same material. Cross-referenced on the G00 General Requirements page alongside the CWK material tag. The PM maintains the ARCH-to-CWK mapping in the Material Transmittal Log.

## Next Steps
- Review [Standard Layers](/standards/layer-organization/standard-layers.html)
- See [Material Tag Vocabulary](/standards/reference-tables/material-tag-vocabulary.html) for the full reference
