---
layout: default
title: Standard Layers
permalink: /standards/layer-organization/standard-layers.html
nav_order: 1
parent: Layer Organization
grand_parent: Standards
---

# Standard Layers

> **Related**: [Rhino Drafting](/standards/rhino-drafting/) | [Layer Organization Overview](/standards/layer-organization/)

## 00_CWKA-DWG (Drawing)

- Layout-specific layers & clipping layers. [^transcript-layouts]
- Used in any phase.
- Includes: line weights, dimensions, notes.
- **Primary Layers**: [^transcript-layouts]
  - Line weights (1, 3, 20, point, point 2, 4)
  - Dim and note layers (See [Annotations](/standards/rhino-drafting/annotations.html))
  - Symbol tag (for blocks inserted in layout space)
  - Title block, revisions (changed only on special occasions)

## 01_CWKA-PRECON

- Intake models for estimation & modeling.
- Includes:
  - **IN-2D**: Plans, elevations, tabular data. [^transcript-printing] Can include master plans imported from separate files.
  - **IN-3D**: Client models, point clouds. [^transcript-printing] Can include laser scans, but not recommended to have laser scan in working file - not good practice for file performance.

## 02_CWKA-DE (Design Engineering)

- Converts approximate to precise geometry.
- Develops assembly details, SKs.
- Uses nominal dimensions.
- **Layers**:
  - **CON**: Guide geometry (not for printing).
  - **PUR**: Purchased raw materials (Epicor classes).

## 03_CWKA-FE (Fabrication Engineering)

- Converts to fabrication-ready geometry.
- **Layers**:
  - **CON**: Guide geometry.
  - **MFG**: Manufactured parts (feeder jobs). [^transcript-rhino-modeling] Includes MT (Metal), WC (Wood Component), and PRE (Freelan laminations - custom sheet goods).
  - **PUR**: Purchased materials (Epicor-based). [^transcript-rhino-modeling] Includes classes for fabric, upholstery, glass, hardware - these map directly to Epicor.
- **Clip Planes Sublayer**: [^transcript-layouts] Under 03_CWKA-FE, there is a sublayer called "clip planes" - this is where you create all clipping planes for layouts.

## 04_CWKA-PE (Production Engineering)

- Toolpaths, reference geometry, fabrication info.
- **Layers**:
  - **REFS**: Reference geometry (e.g., scribe, engraving).
  - **MACHINING**: Programming geometry.
  - Naming examples: THRU CUT OUT 1.5, 8MM DRILL PT 0.25.

## Placeholder Layers

[^transcript-rhino-modeling] When starting modeling, you can create placeholder layers (e.g., "GM.SG.XXXXX shop ply 3/4") as notes to yourself. Come back later and correct using toolkit to pull correct layer. This is a fast way to get started - get ideas down quickly, correct later. Obviously not releasable until corrected.

## Next Steps
- Learn about [Modeling Techniques](/standards/layer-organization/modeling-techniques.html)

## Footnotes
[^transcript-layouts]: Source: Training Video Transcript - "Layouts, Details, and Annotations"
[^transcript-printing]: Source: Training Video Transcript - "Printing"
[^transcript-rhino-modeling]: Source: Training Video Transcript - "Rhino Modeling"
