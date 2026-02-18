---
layout: default
title: Printing
permalink: /standards/rhino-drafting/printing.html
nav_order: 7
parent: Rhino Drafting
grand_parent: Standards
---

# Printing Considerations

> **Related**: [Display Modes](/standards/rhino-drafting/display-modes.html) | [Layout Structure](/standards/rhino-drafting/layout-structure.html)

## Basic Principles

- **Locked Objects**: [^transcript-printing] Locked objects will **not print** - whether locked in Rhino space or layout space. If geometry isn't showing up in prints, check if it's locked.
- **Print Preview**: [^transcript-printing] Always use print preview to review pages before printing.

## Printers

- **Microsoft Print to PDF**: [^transcript-printing] **Recommended**. Good balance between quality and file size.
- **Rhino PDF**: [^transcript-printing] Tends to be very heavy but has good quality if you can load it.
- **Bluebeam**: Quality can be buggy, smaller file size.

## Output Types

- **Vector vs Raster**: [^transcript-printing] If using monochrome and struggling with vector output, try raster output instead.
- **Shading**: [^transcript-printing] Shading is a raster feature by definition - can only be printed in raster mode. Shadows and shading require raster output.

## Master Plan Integration

- **Location**: [^transcript-printing] Master plan should be kept in separate file in models folder (e.g., `Model Assets > Master Models`).
- **Insertion Method**: [^transcript-printing] Can use Block Insert (preference) or Work Session. Block Insert allows better manipulation using Block Manager.
- **Layer Placement**: [^transcript-printing] Master plan belongs under `PRECON` parent layer, under `IN-2D` and `IN-3D` sublayers.
  - **Note**: Not recommended to have laser scan in working file - not good practice for file performance.
- **Insert Options**: [^transcript-printing] Layer style should be set to "Active" (ensures you don't create new layers). Insertion point should be same for everybody (whoever set up master plan should have located it). No scale or rotation changes needed.

## Project Cover Page

- **Photo Insertion**: [^transcript-printing] Project cover page (front page) has option to insert a photo. This was not common practice at CW previously, but may become standard moving forward.

## See Also
- [Folder Structure](/standards/folder-structure.html) - File management

## Footnotes
[^transcript-printing]: Source: Training Video Transcript - "Printing"
