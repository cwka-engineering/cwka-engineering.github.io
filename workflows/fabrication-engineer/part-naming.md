---
layout: default
title: Part Naming
permalink: /workflows/fabrication-engineer/part-naming.html
nav_order: 4
parent: Fabrication Engineer (FE)
grand_parent: Workflows
---

# Part Naming

> **Related**: [Engineering Toolkit](/workflows/fabrication-engineer/toolkit-setup.html) | [Shipping Components](/workflows/fabrication-engineer/shipping-components.html)

## Grouping & Naming

- **Grouping First**: [^transcript-adv-toolkit-ii] Parts must be grouped into logical groups based on how they need to be sent to shop or field before naming.
- **Group Names**: [^transcript-adv-toolkit-ii] Use Set Group Name for SC numbers (e.g., SC005). For MT parts, you can use MT prefix (e.g., "MT7") - the integer is important, but prefix can vary. Using SC or MT is most sensible since that's what it will be at the end.
- **Blocks Don't Show**: [^transcript-adv-toolkit-ii] If parts are imported as blocks, they won't show up in "Select Name" list because it queries geometry actually in the document, not block definitions. You must explode blocks or work with geometry directly.
- **MT Parts in Parent Jobs**: [^transcript-adv-toolkit-ii] When incorporating MT parts into a parent job, **do not rename them**. MT parts keep their original names (e.g., "9194.SC005.P678910") for clarity when carried into parent jobs.
- Manufactured parts use MT prefixes.
- **NOTE**: WC parts should be named just like all other parts (PROJ.JOB.SCXXX.PXXX) so they can correspond to the appropriate Shipping Component (SC). Material layer should be the WC (XXXX.WC.XXXXX). The PE team will want to \_SelName to make sure all parts belong to the corresponding SC.

## Modeling Toolkit

- **Material Search**: [^transcript-modeling-toolkit] First tab in Modeling Toolkit provides material search functionality:
  - **Forward Lookup**: When you know a part number and want to find its details
  - **Reverse Lookup**: When you know details (class, description, dimensions) and want to find the part number
  - Enter separated terms (e.g., "plywood", "three quarter", "96 inches") to narrow results
  - Descriptions are normalized to inches format
  - Check box to pass value to forward lookup as hint
- **Part Naming**: [^transcript-modeling-toolkit]
  - Generate names for active groups
  - Preview attributes: thickness, dimensions, area, volume
  - Use Shade Unique to visually verify part types
- **Material Caching**: [^transcript-modeling-toolkit] When you select a material, toolkit caches data from Epicor including description and dimension-specific fields that provide precise measurements.

## Publishing & Editing

- Bake attributes into metadata.
- **Replace Name Segments**: [^transcript-adv-toolkit] Use "Replace Name Segments" tab to change specific segments of part names without affecting others. For example, if job number changes from 8 to 12, you can update just that segment while keeping shipping component numbers and P numbers intact. Useful when reusing similar designs across multiple projects.
- **Manufactured Part Mode**: [^transcript-adv-toolkit-ii] For MT (Metal) parts, toggle to "Manufactured Part mode" in Part Naming tab. This triggers additional geometry analysis (cuts on ends, shape analysis, length comparisons). After using this mode, remember to turn it off when done - it doesn't automatically turn off.

## Next Steps

- Continue to [Shipping Components](/workflows/fabrication-engineer/shipping-components.html) to create SC lists
- Or jump to [Takeoffs](/workflows/fabrication-engineer/takeoffs.html) for BOM generation

## See Also

- [Layer Organization](/standards/layer-organization/) - Material layer standards
- [Glossary](/overview/glossary.html) - Part naming conventions

## Footnotes

[^transcript-modeling-toolkit]: Source: Training Video Transcript - "Modeling Toolkit"
[^transcript-adv-toolkit]: Source: Training Video Transcript - "Adv. Toolkit Functions"
[^transcript-adv-toolkit-ii]: Source: Training Video Transcript - "Adv. Toolkit Functions II"
