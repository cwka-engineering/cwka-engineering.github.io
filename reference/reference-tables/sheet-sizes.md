---
layout: default
title: Actual Sheet Sizes
permalink: /reference/reference-tables/sheet-sizes.html
parent: Reference Tables
grand_parent: Reference
nav_order: 5
corpus_tags: [fe-submittal]
---

# Actual Sheet Sizes & Nesting Clear Zones

Parts must fit within **actual** sheet dimensions, not nominal catalog sizes. Use this reference when checking part sizes against available stock.

> **Related**: [Material Modeling](/standards/layer-organization/material-modeling.html) | [Takeoffs](/workflows/fabrication-engineer/takeoffs.html)

## Sheet Size Maximums

| Material | Actual Sheet Size | Maximum Part Size |
|----------|------------------|-------------------|
| Veneer / Melamine | 48.75" x 96.75" | 48" x 96" |
| MDF / Particleboard | 49" x 97" | 48" x 96" |
| Plywood (standard) | 48.5" x 96.5" | 47.5" x 95.5" |
| Plywood (birch) | 48" x 96" | 47.5" x 95.5" |

Additional stock sizes (4x10, 4x12, 5x10, 5x12) are available for oversized parts. If a part exceeds your stock size, seam it.

## CNC Nesting Clear Zones

| Machine | Minimum Perimeter Clear Zone |
|---------|------------------------------|
| Wood CNC | 1/2" |
| Metal laser | Greater of 1/4" or material thickness |

These clear zones define the minimum distance between part edges and the sheet edge (or between adjacent parts) during nesting. Parts placed closer than the clear zone risk edge quality issues or machine interference.
