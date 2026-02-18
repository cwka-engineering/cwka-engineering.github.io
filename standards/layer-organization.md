---
layout: default
title: Layer Organization
permalink: /standards/layer-organization.html
---
# Layer Organization

> **Related Documents**: [Rhino Drafting and Layouts](/standards/rhino-drafting-layouts.html) | [Folder Structure](/standards/folder-structure.html)

Rhino models use parent layers based on project phases: PRECON, DE, FE, PE. Each phase increases in Level of Detail (LOD). [^transcript-rhino-modeling]

**Layer Organization Philosophy**: [^transcript-rhino-modeling]

- **First Level**: Based on design process phase (PRECON, DE, FE, PE) - indicates when geometry was introduced (provenance of piece of geometry - was it introduced during precon, design engineering, FE, or PE?)
- **Second Level (FE)**: Based on geometry type:
  - **PUR (Purchased)**: Represents purchased materials in Epicor
  - **MFG (Manufactured)**: Represents manufactured materials in Epicor
  - **CON (Construction)**: Construction geometry without real-world analog (helps create other geometry)
- **Third Level**: Material classes (fabric, upholstery, glass, hardware, etc.) that map directly to Epicor
- **Placeholder Layers**: [^transcript-rhino-modeling] When starting modeling, you can create placeholder layers (e.g., "GM.SG.XXXXX shop ply 3/4") as notes to yourself. Come back later and correct using toolkit to pull correct layer. This is a fast way to get started - get ideas down quickly, correct later. Obviously not releasable until corrected.

## Overview

Proper layer organization ensures consistency across projects and facilitates collaboration between Design Engineering (DE), Fabrication Engineering (FE), and Production Engineering (PE) phases.

## 00\_CWKA-DWG (Drawing)

- Layout-specific layers & clipping layers. [^transcript-layouts]
- Used in any phase.
- Includes: line weights, dimensions, notes.
- **Primary Layers**: [^transcript-layouts]
  - Line weights (1, 3, 20, point, point 2, 4)
  - Dim and note layers
  - Symbol tag (for blocks inserted in layout space)
  - Title block, revisions (changed only on special occasions)

## 01\_CWKA-PRECON

- Intake models for estimation & modeling.
- Includes:
  - IN-2D: Plans, elevations, tabular data. [^transcript-printing] Can include master plans imported from separate files.
  - IN-3D: Client models, point clouds. [^transcript-printing] Can include laser scans, but not recommended to have laser scan in working file - not good practice for file performance.

## 02\_CWKA-DE (Design Engineering)

- Converts approximate to precise geometry.
- Develops assembly details, SKs.
- Uses nominal dimensions.
- Layers:
  - CON: Guide geometry (not for printing).
  - PUR: Purchased raw materials (Epicor classes).

## 03\_CWKA-FE (Fabrication Engineering)

- Converts to fabrication-ready geometry.
- Layers:
  - CON: Guide geometry.
  - MFG: Manufactured parts (feeder jobs). [^transcript-rhino-modeling] Includes MT (Metal), WC (Wood Component), and PRE (Freelan laminations - custom sheet goods).
  - PUR: Purchased materials (Epicor-based). [^transcript-rhino-modeling] Includes classes for fabric, upholstery, glass, hardware - these map directly to Epicor.
- **Clip Planes Sublayer**: [^transcript-layouts] Under 03\_CWKA-FE, there is a sublayer called "clip planes" - this is where you create all clipping planes for layouts.

## 04\_CWKA-PE (Production Engineering)

- Toolpaths, reference geometry, fabrication info.
- Layers:
  - REFS: Reference geometry (e.g., scribe, engraving).
  - MACHINING: Programming geometry.
  - Naming examples: THRU CUT OUT 1.5, 8MM DRILL PT 0.25.

## Display Modes & Annotation Styles

### Importing Display Modes

- Navigate: File > Properties > View > Display Modes > Import
- Use .ini files from designated folder.

### Display Style Use Cases

- **Monochrome**: Plans, elevations, isometrics.
- **Artic with Outlines**: Sections, isometrics.
- **Pen/Technical**:
  - Pen: No hidden lines.
  - Technical: Hidden lines in light gray (use Bluebeam for contrast).

### Annotation Styles

- CWKA\_2024-GEN: Default shop drawing style (1/32" tolerance).
- CWKA\_2024-A-SITE: Foot-inch dimensions.
- CWKA\_2024-VIF: Variation with VIF suffix.
- CWKA\_2024-MTL: Metal-specific.

### Setting Annotation Style

- Use SetCurrentAnnotationStyle → DFS CWKA 2025.

### Dimensioning

- Space dims 0.25 units apart.
- Keep dimension lines off geometry.

### Leaders

- Use Leader command.
- Add mask to hide intersecting geometry.
- Optional: capsule or rectangular frame.

## Layout Structure

Follows Project.Job.Hundred level page number format.

- XXXX.T00 – Title Sheet
- XXXX.G00 – General Requirements (finish/material tags)
- XXXX.XXX.1XX – Reference Plans (floor plans, RCPs, VIF)
- XXXX.XXX.2XX – Shop Drawings (Iso/BOM, plans, elevations, sections, details)
- XXXX.XXX.3XX – Install & Shipping Drawings
- XXXX.XXX.4XX – Fabrication Supplement Drawings
- XXXX.XXX.SKXX – Sketches (quick feedback, not for submission)

## Scribes

- Duplicate finished geometry.
- Keep same part name.
- Extend face to oversized dimension.
- Move to CWKA-PE > REF sublayer.
- Group with finished geometry.

## Named Positions

Used to animate/toggle geometry positions.

### Setup

- Use Named Positions command.
- Save positions (e.g., default, exploded).
- Toggle between saved states.

### Adjustments

- Altered geometry gets new GUID.
- Must append to each position manually.

### Recommendation

- Set named positions after fabrication-ready.

## Referencing Geometry

Used for coordination while keeping files lean.

### Insert Command

- Use Insert → Select file → Check Linked, Layer style: Active.

### Insert Options

- Block Instance: For static reference geometry.
- Individual Objects: For editable MFG parts.
- As Group: Optional.

### Notes

- Use Block Manager to update/delete.
- Individual objects disconnect from source.

## Sections & Hatches

Uses Rhino 8's Clipping Plane tools.

### Clipping Plane Command

- Use Clipping Plane.

### Properties

- Name, Label, Custom Depth, Depth
- Section Style: Usually not set.
- Objects Clipped: Filter layers/objects.

### Hatches

- Set in Layer Manager > Section Style.
- Pattern Color: Black, Background: White
- Boundary Color: Black, Scale: 3–5

### Selective Hatch

- Object Properties → Section Style → Custom → Adjust rotation.

### Print Width

- Section lines: 0.05 mm
- Thin steel/hardware: Hairline

### Pattern Scale

- Adjust per material.
- Display in dark gray for lighter page appearance.

## Manufactured Parts (MFG)

Custom products from feeder jobs.

### Naming Convention

- Project-wide: MFG code + 5-digit part number (e.g., 1001.WC.00001)
- Job-specific: Project + MFG + Job + 5-digit (e.g., 1001.MT.020.00001)

### Referencing MFG Parts

- Linked Block: For static subassemblies.
- Embedded Block: For adjustable parts.
- Integrated Layer: For custom sheet goods.

### In Parent Jobs

- Retain original names for clarity.

## Material Thickness & Lay-up

### Modeled Thickness

- Most materials: Nominal thickness
  - ¾" MDF = 0.75"
  - 18mm plywood = 18mm
- Exceptions:
  - ¾" plywood = 0.73"
  - Solid wood = design thickness

### Modeling Guidelines

- Parts = 1 Solid Body
- Do NOT model edgebanding unless:
  - Post-laminate
  - Solid wood
  - Curved edges
  - Notches/cutouts

### Material Size

- Fit parts to BOM'd material.
- Do NOT use full sheet size.
- Veneer/Melamine: 48"x96"
- MDF/PB: 48"x96"
- Plywood: 47.5"x95.5"

### Painted MDF

- Needs paintable edgebanding (e.g., GM.SG.00311)

## Lay-up Material Code

Created by FE, used in Rhino layer name.

### Format

```javascript
PRE_GoodFace_Core_BackFace_ThicknessMM

```

Example: PRE\_438\_331\_7\_19

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

- MaterialCode + DoubleDigitNumber (e.g., MDF01)
- No spaces, hyphens, underscores.

### Project Transmittal Log

- All tags must be listed.
- Managed by PM.
- Used by engineering toolkit for drawing schedules.

### Tag Types

- General: MDF, EB, PB, PLY, OSB, ML, PLAM, PL, GL, SS, FU, ST, MT, HW
- Wood/Veneer: VN (Veneer), WD (Solid Wood)
- Finish: PT (Paint), FN (Other finishes)

## Footnotes

[^transcript-rhino-modeling]: Source: Training Video Transcript - "Rhino Modeling"
[^transcript-layouts]: Source: Training Video Transcript - "Layouts, Details, and Annotations"
[^transcript-printing]: Source: Training Video Transcript - "Printing"
