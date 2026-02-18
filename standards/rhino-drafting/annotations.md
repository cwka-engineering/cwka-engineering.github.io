---
layout: default
title: Annotations
permalink: /standards/rhino-drafting/annotations.html
nav_order: 5
parent: Rhino Drafting
grand_parent: Standards
---

# Dimensions & Annotations

> **Related**: [Details](/standards/rhino-drafting/details.html) | [Printing](/standards/rhino-drafting/printing.html)

## Dimensions

- **Space dims** 0.25 units apart.
- **Placement**:
  - Maintain a gap between dimension line and geometry (prevents merging and improves readability).
  - Place dimensions off the drawing geometry to avoid clutter.

## Material Tags

- **Use the Leader command** for material tags and other annotations.
- **Workflow**: [^transcript-layouts] Use Leader command, then go under Notes layer. Press Shift to enable ortho for straight leaders.
- **Tag Types**: [^transcript-layouts] Material tag, material tag and finish tag, specialty hardware tag - all are blocks with attributes.
- **Inserting Tags**: [^transcript-layouts] Insert block (e.g., "material tag"), enter material code (e.g., "PI01"), place tag.
- **Additional Annotations**: [^transcript-layouts] As you work through details, use grain direction, grain match, grain direction annotations, and aligned symbols as needed. All important to include.

## Leader Line Cleanup

- For leaders intersecting linework:
  - Use **mask background** in properties to hide geometry behind text.
  - Optionally add a **frame** around the text.

## Next Steps
- Learn about [Printing Considerations](/standards/rhino-drafting/printing.html)

## Footnotes
[^transcript-layouts]: Source: Training Video Transcript - "Layouts, Details, and Annotations"
