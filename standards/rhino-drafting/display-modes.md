---
layout: default
title: Display Modes
permalink: /standards/rhino-drafting/display-modes.html
nav_order: 6
parent: Rhino Drafting
grand_parent: Standards
---

# Display Modes for Drafting

> **Related**: [Printing](/standards/rhino-drafting/printing.html) | [Hatches](/standards/rhino-drafting/hatches.html)

## Monochrome

- Shows silhouette and curvature well
- Heavy for printing
- Best printed raster
- **Output Color in the Print Window**: Print Color

## Pen

(Download & Install)
- Vector output
- No hidden lines
- **Output Color in the Print Window**: Print Color

## Technical

(Download & Install)
- Vector output
- Hidden lines appear as light gray
- **Output Color in the Print Window**: Print Display

## Hidden Linework in Technical Mode

- Hidden lines appear light gray.
- If print colors are set to black:
  - Print layout as a separate PDF.
  - Create a Layer State with all CWKA/Digi scope geometry set to black and Print as previously mentioned.
  - **NOTE**: create a Layer State with all your settings **BEFORE** you change all display colors to black.
- Otherwise, use Bluebeam's color processing tool to convert vector colors to black.

## Next Steps
- Review [Printing Considerations](/standards/rhino-drafting/printing.html)

## Footnotes
[^transcript-layouts]: Source: Training Video Transcript - "Layouts, Details, and Annotations"
