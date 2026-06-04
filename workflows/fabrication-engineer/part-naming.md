---
layout: default
title: Part Naming
permalink: /workflows/fabrication-engineer/part-naming.html
nav_order: 6
parent: Fabrication Engineer (FE)
grand_parent: Workflows
corpus_tags: [fe-release, fe-submittal]
---

# Part Naming

> **Related**: [Engineering Toolkit](/workflows/fabrication-engineer/toolkit/) | [Shipping Components](/workflows/fabrication-engineer/shipping-components.html)

## How do I group parts before naming?
{: #how-to-group-parts}

Parts must be grouped into logical groups based on how they ship before naming. Use **Set Group Name** with 3-digit numbers: **SC###** for standard project files (e.g., SC012), **SA###** for manufactured part files (e.g., SA004). Blocks won't appear in the "Select Name" list — explode or work with geometry directly.

## How do I generate part names using the toolkit?
{: #how-to-generate-names}

Modeling Toolkit → **Part Naming** tab → **Generate Names** for active groups. Preview attributes (thickness, dimensions, area, volume) and use **Shade Unique** to visually verify part types before publishing.

## How do I name manufactured (MT) parts?
{: #how-to-name-mfg-parts}

Toggle to **Manufactured Part mode** in the Part Naming tab. This triggers additional geometry analysis (cuts on ends, shape analysis, length comparisons). Remember to turn it off when done. When incorporating MT parts into a parent job, **do not rename them** — MT parts keep their original names.

## How do I replace name segments (e.g., job number changed)?
{: #how-to-replace-name-segments}

Modeling Toolkit → **Replace Name Segments** tab. Change specific segments (e.g., job number from 8 to 12) without affecting SC numbers or P numbers. Useful when reusing designs across projects.

## How do I audit part name uniqueness before release?
{: #how-to-audit-names}

Use **SelName** and step through each name to verify unlike geometries don't share the same part name. If two unlike parts share a name, split using the next unused **P###** in the series. All parts must be named via the toolkit (not manually) for downstream BOM workflows to work.

## Grouping & Naming

- **Grouping First**: [^transcript-adv-toolkit-ii] Parts must be grouped into logical groups based on how they need to be sent to shop or field before naming.
- **Group Names**: [^transcript-adv-toolkit-ii] Use Set Group Name with 3-digit numbers. Use **SC###** in standard project files (e.g., SC012); use **SA###** in manufactured part files (e.g., SA004) when the file contains more than one subassembly. If the MT file contains only a single subassembly, the SA group is not required — parts are named without the SA segment (e.g., `9194.MT.00004.P001`).
- **Blocks Don't Show**: [^transcript-adv-toolkit-ii] If parts are imported as blocks, they won't show up in "Select Name" list because it queries geometry actually in the document, not block definitions. You must explode blocks or work with geometry directly.
- **MT Parts in Parent Jobs**: [^transcript-adv-toolkit-ii] When incorporating MT parts into a parent job, **do not rename them**. MT parts keep their original names (e.g., `9194.MT.00004.P001`, or `9194.MT.00004.SA001.P001` if the part belongs to a subassembly) for clarity when carried into parent jobs.
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
- [Glossary](/reference/glossary.html) - Part naming conventions

## Footnotes

[^transcript-modeling-toolkit]: Source: [Training Video — "Modeling Toolkit"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQAfRPseXSLqTpdpXZWrN-KtAXlXRMID0jUqj5csZ27k9ds?e=eAgoTd)
[^transcript-adv-toolkit]: Source: [Training Video — "Adv. Toolkit Functions"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQCALi3cuUMuSLsJ6G-5Rn4TAYr-NLZorJ-lfNYPkyrSaOA?e=AJEJ4d)
[^transcript-adv-toolkit-ii]: Source: [Training Video — "Adv. Toolkit Functions II"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQB1ApOz1Dz_SoENHn-RPCSqAcMM0ikM3h9gyF5DxIqLwWc?e=Ec0Lq3)
