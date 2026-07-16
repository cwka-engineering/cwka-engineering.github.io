---
layout: default
title: Material Modeling
permalink: /standards/layer-organization/material-modeling.html
nav_order: 4
parent: Layer Organization
grand_parent: Standards
corpus_tags: [fe-release, fe-submittal]
---

# Material Thickness & Modeling

> **Related**: [Manufactured Parts](/standards/layer-organization/manufactured-parts.html) | [Codes & Tags](/standards/layer-organization/codes-and-tags.html) | [Actual Sheet Sizes](/reference/reference-tables/sheet-sizes.html) | [Lay-Up Formulas](/reference/reference-tables/lay-up-formulas.html)

## Solid Body Requirements

All parts must be **closed, manifold polysurfaces**. Before release, verify:
- `SelBadObjects` — should return nothing (fix any found)
- `SelOpenPolysrf` — should return nothing (close any found)
- `SelExtrusion` — convert all with `ConvertExtrusion`

See [Model Cleanup Commands](/reference/reference-tables/model-cleanup-commands.html) for the full pre-release sequence.

## Modeled Thickness

- **Most materials**: Model at nominal thickness (3/4" = 0.75", 1/2" = 0.5", 1" = 1.0")
- **Metric-spec materials**: Model at metric nominal (18mm plywood = 18mm)
- **Exception — 3/4" plywood**: Model at **0.73"** (always thinner than nominal). This is the only standard deviation.
- **Solid wood**: Model at design thickness. BOM rough lumber at appropriate oversize (you cannot get a 1.0" part from 4/4 rough lumber; use at least 5/4).

## Edgebanding Rules
{: #how-to-determine-edgebanding}

**Do NOT model edgebanding** for straight, square edges — the edgebander's pre-mill setting removes the EB thickness before application.

**DO model edgebanding** when:
- Post-lamination condition (PLAM/VEN applied after structure is built)
- All solid wood edgebanding
- Inside or outside curved edges
- Notches on edge of part
- Cutouts internal to a part
- Any edge that cannot be run through the edgebander

### Pre-Lam vs. Post-Lam — Which Buildup Applies

Pre-lam (see [Lay-Up Formulas](/reference/reference-tables/lay-up-formulas.html)) glues the face material to the substrate before the part is cut and edgebanded as a unit. Post-lam applies the face material after the structure is built, which is why post-lam conditions get edgebanding modeled (above) and pre-lam ones generally don't.

**Red flag**: a part modeled with veneer laid over plastic laminate across the **whole face** is almost always a misread. The correct intent in that situation is almost always to post-laminate only the **edge** (double edge), not the full face — full-face veneer-over-plastic doesn't make physical sense as a buildup. If you see this combination, stop and confirm the actual intended detail before modeling it as drawn.

## Painted MDF
{: #how-to-handle-painted-mdf}

Painted MDF with exposed edges needing paint requires paintable edgebanding (`GM.SG.00311`) to be BOM'd to the job. Model the EB only if the edge can't go through the edgebander.

## Material Size

Parts must fit within **actual** sheet dimensions, not nominal catalog sizes. See [Actual Sheet Sizes](/reference/reference-tables/sheet-sizes.html) for the complete reference.

| Material | Maximum Part Size |
|----------|-------------------|
| Veneer / Melamine | 48" x 96" |
| MDF / Particleboard | 48" x 96" |
| Plywood (standard) | 47.5" x 95.5" |
| Plywood (birch) | 47.5" x 95.5" |

Additional stock sizes (4x10, 4x12, 5x10, 5x12) are available. Seam a part if it exceeds your stock size.

**Grain direction**: Sheet orientation (e.g. 8'x4' vs. 4'x8') is determined by which way the grain needs to run — long grain vs. short grain — not just by which orientation happens to fit. Check grain direction against the actual part, not just against sheet dimensions. An existing takeoff or PO already ordered against the wrong orientation does not excuse a wrong model orientation — correct the model.

## Backer vs. Two-Sided Material Selection

Faces that aren't seen should get **backer material**, not full two-sided finish laminate — using two-sided/finish material where backer would do wastes material cost across a whole project's worth of parts. Reserve finish/two-sided material for faces that are actually seen (e.g. a finished, non-wall, no-filler cabinet end): a single finish face plus backer on the unseen side is both the correct spec and the cheaper one.

## Bent Metal

Model with correct inside bend radius and thickness. 2D flat patterns/unfolds must include appropriate bend deductions.

## Groups and Shipping Components

Group polysurfaces into shipping components early. Name groups with SC designators (e.g., SC005). Multiples of like geometry can share one SC number; unlike loose parts cannot.

## Blocks and Hardware

- Individual hardware pieces are blocks
- Higher-order assembly blocks nest individual hardware blocks
- Hardware blocks use bracketed hardware tags; manufactured linked blocks follow MFG part format
- The hardware block library is organized by Epicor ClassID categories

## Referencing External Geometry

Use **Insert → Linked → Layer Style: Active**. Choose:
- **Block Instance** for fixed reference geometry
- **Individual Objects** for editable parts

Toggle off rotation, scale, and insertion point prompts to maintain coordinate system alignment.

## Next Steps
- Learn about [Codes & Tags](/standards/layer-organization/codes-and-tags.html)
