---
layout: default
title: Hatches
permalink: /standards/rhino-drafting/hatches.html
nav_order: 4
parent: Rhino Drafting
grand_parent: Standards
---

# Hatches & Section Styles

> **Related**: [Sections & Clipping](/standards/rhino-drafting/sections-clipping.html) | [Printing](/standards/rhino-drafting/printing.html)

## Hatch Patterns

- Hatch patterns are set in the **Section Style** column within the Layer Manager.
- **Toolkit Pre-Assignment**: [^transcript-layouts] When you import a new material from toolkit and select a material tag, toolkit does its best to pre-assign the section style. However, you may need to set them manually.

## Configuring Section Styles

- **Access**: [^transcript-layouts] In Layers window, double-click the Section Style column for the layer you want to configure.
- **Options**: [^transcript-layouts] Pop-up shows all different options for that specific section.
- **Custom Section Styles**: [^transcript-layouts] Toolkit comes with custom section styles, but configuration may be needed. Often you won't have the actual hatch needed for that specific layer/material type.

## Standard Hatch Settings

- **Pattern**: [^transcript-layouts] Select appropriate pattern (e.g., "plywood" for plywood materials).
- **Pattern Color**: [^transcript-layouts] Typically gray (prints dark gray for lighter appearance).
- **Background**: White
- **Boundary Color**: Black
- **Scale**: [^transcript-layouts] Adjust scale as needed (e.g., if pattern is too small, increase scale).
- **Width Scale**: [^transcript-layouts] Typical is 5, color black for boundaries.

## Custom Hatch Rotation

- For objects with grain direction different from the material's default (e.g., perpendicular wood grain):
- Adjust rotation of hatch in: `Properties > Section Style > Custom`

## Section Line Styling

- **Print width**: 0.05 mm
- **Width scale**: 5 (makes section line pop while keeping other linework crisp)

## Special Cases

- **Hardware or thin gauge steel**:
  - Use hairline print width
  - Use solid white hatch (improves legibility and avoids visual clutter)

## Next Steps
- Learn about [Display Modes](/standards/rhino-drafting/display-modes.html)
- Review [Printing](/standards/rhino-drafting/printing.html)

## Footnotes
[^transcript-layouts]: Source: Training Video Transcript - "Layouts, Details, and Annotations"
