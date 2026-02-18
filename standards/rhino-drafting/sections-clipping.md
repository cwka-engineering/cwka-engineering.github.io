---
layout: default
title: Sections & Clipping
permalink: /standards/rhino-drafting/sections-clipping.html
nav_order: 3
parent: Rhino Drafting
grand_parent: Standards
---

# Sections & Clipping Planes

> **Related**: [Details](/standards/rhino-drafting/details.html) | [Hatches](/standards/rhino-drafting/hatches.html)

## Section Views

- Use the **detail tag** block from Legends and Symbols to create section reference tags.
- Link attributes:
  - Detail page
  - Detail number
- This ensures the tag follows the section detail correctly.

## Clipping Planes

- Create clipping planes on the clip planes sublayer under `03_CWKA-FE`.
- Use the **Clipping Plane** command.
- (Rhino 8 offers various options; "vertical" is typical).

### Clipping Plane Properties

**Custom Depth**: [^transcript-layouts]
- Controls the distance/extent of the clipping plane (default 0 inches = single plane).
- Set thickness (e.g., 12 inches) to create a depth range for the section.
- **Use Case**: [^transcript-layouts] Very helpful when you have visual noise - want to take a section but have adjacent scope (wall paneling, etc.) that you don't want to show. Use custom depth to clear out that area while keeping the section focused.

**Objects Clipped**:
- Filters which objects/layers are cut; allows for "peeled back" sections.
- You can toggle clipping planes on/off for specific model or layout views.
- **Layout Integration**: [^transcript-layouts] In clipping plane properties, lower portion shows option to toggle on/off in various model space or layout space views. When you create a detail view in a layout, the clipping plane will appear in the list for that page - toggle it on to show the section in that detail view.

**Naming**: [^transcript-layouts]
- You can name clipping planes, but for simple projects with only one section, naming may not be necessary.

**Flipping Direction**: [^transcript-layouts]
- Can flip the direction of the clipping plane if needed.

## Next Steps
- Learn about [Hatches & Styles](/standards/rhino-drafting/hatches.html)
- Review [Printing](/standards/rhino-drafting/printing.html)

## Footnotes
[^transcript-layouts]: Source: Training Video Transcript - "Layouts, Details, and Annotations"
