---
layout: default
title: Annotations
permalink: /standards/rhino-drafting/annotations.html
nav_order: 5
parent: Rhino Drafting
grand_parent: Standards
corpus_tags: [fe-submittal]
---

# Dimensions & Annotations

> **Related**: [Details](/standards/rhino-drafting/details.html) | [Printing](/standards/rhino-drafting/printing.html) | [Annotation Styles Reference](/standards/rhino-drafting/annotation-styles-reference.html)

## How do I place material tag leaders on a drawing?
{: #how-to-place-material-tag-leaders}

Use the **Leader** command on the **Notes** layer. Press **Shift** to enable ortho for straight leaders. Then **Insert Block** and choose the appropriate tag block: material tag, material tag + finish tag, or specialty hardware tag. Enter the material code (e.g., "PI01") and place. Add grain direction, grain match, and aligned symbols as needed.

## When is the grain match symbol required?
{: #grain-match-symbol}

The grain match symbol (a triangle block available in the Rhino template) must be called out on any elevation or detail where grain matching is specified. It should never be assumed — if it is not on the drawing, production and PE will not know a match is required.

Apply the symbol at the seam or joint between surfaces that must be matched. For sequence-matched panels across an elevation, place the symbol at the joint between adjacent panels. For grain-matched doors and drawer fronts, place it at the shared seam.

The specific orientation convention and rules for book match vs. sequence match notation are still being standardized. When in doubt, annotate with a note in addition to the symbol to make the intent unambiguous.

## How do I set the annotation style for a detail view?
{: #how-to-set-annotation-style}

Select the annotation and change its style in Properties. Four standard styles are available: **GEN** (default/general), **A-SITE** (site context/architectural reference), **VIF** (verify-in-field dimensions), **MTL** (material-specific annotations). See [Annotation Styles Reference](/standards/rhino-drafting/annotation-styles-reference.html) for when to use each.

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
[^transcript-layouts]: Source: [Training Video — "Layouts, Details, and Annotations"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQDCib7picOsRbne5WY5zqqKAYZVduR5IUrhgLRcL2a8y5o?e=GD3AVG)
