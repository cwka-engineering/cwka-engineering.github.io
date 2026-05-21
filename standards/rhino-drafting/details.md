---
layout: default
title: Details
permalink: /standards/rhino-drafting/details.html
nav_order: 2
parent: Rhino Drafting
grand_parent: Standards
corpus_tags: [fe-submittal]
---

# Creating Details

> **Related**: [Layout Structure](/standards/rhino-drafting/layout-structure.html) | [Sections & Clipping](/standards/rhino-drafting/sections-clipping.html)

## How do I create a detail view on a layout?
{: #how-to-create-detail-view}

Use the **Detail** command → select "add" → draw the detail boundary on the layout. Name the detail view (e.g., "front view") — this name ties into the detail title block. Use **Set View** dropdown for isometric, plan, elevation, etc. Use **Hide in Detail** or toggle the secondary layer light bulb to control visibility per detail. **Lock the detail** once finalized to prevent accidental shifting and dimension disconnection.

## How do I connect a detail title to a detail view?
{: #how-to-connect-detail-title}

Insert the **Detail Title** block from Legends and Symbols. Connect block attributes using text fields: **object name** (links to detail view name) and **object scale** (links to detail view scale). Place the detail title on the "Detail Title" layer.

## Creating Detail Views

1. Use the **Detail** command and select "add" to create new detailed views on a layout. [^transcript-layouts]
2. **Name the detail view** (e.g., "front view"). The name field ties in with the detail title block.
3. Use **Hide in Detail** to selectively hide objects within a specific detail view.
4. You can also hide objects by turning their respective **Detail Layer** in the layers panel.
   - **Note**: This is the secondary light bulb per layer that can be toggle on a per detail basis.
5. **Lock your detailed view** once finalized to prevent:
   - Accidental shifting
   - Disconnected dimensions and leaders

## Setting Views

[^transcript-layouts] Use the dropdown filter "Set View" to choose isometric, plan, elevation, or other view types that best capture your scope.

## Labeling Details

- Use the "Legends and Symbols" block, specifically the **Detail Title** block.
- Connect block attributes to:
  - Detail view's name
  - Detail view's scale
- Use text fields: object name, object scale
- Ensure the detail title is on the "Detail Title" layer

## Next Steps
- Learn about [Sections & Clipping](/standards/rhino-drafting/sections-clipping.html)
- Add [Dimensions & Annotations](/standards/rhino-drafting/annotations.html)

## Footnotes
[^transcript-layouts]: Source: [Training Video — "Layouts, Details, and Annotations"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQDCib7picOsRbne5WY5zqqKAYZVduR5IUrhgLRcL2a8y5o?e=GD3AVG)
