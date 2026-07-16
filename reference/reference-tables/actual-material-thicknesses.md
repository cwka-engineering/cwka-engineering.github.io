---
layout: default
title: Actual Material Thicknesses
permalink: /reference/reference-tables/actual-material-thicknesses.html
parent: Reference Tables
grand_parent: Reference
nav_order: 7
corpus_tags: [fe-submittal]
---

# Actual Material Thicknesses

Some materials are consistently under- or over-sized relative to their nominal thickness. Model these at **actual** thickness, not nominal — the error compounds into geometry (flush-out, gaps) downstream. This list is a living reference; add a material here once its actual-vs-nominal discrepancy is confirmed rather than re-discovering it project by project.

> **Related**: [Material Modeling — Modeled Thickness](/standards/layer-organization/material-modeling.html#modeled-thickness) | [Actual Sheet Sizes](/reference/reference-tables/sheet-sizes.html)

## Known Discrepancies

| Material | Nominal | Actual | Notes |
|---|---|---|---|
| Plywood (shop ply, non-finish-grade) | 3/4" | 0.73" | Standard shop-ply undersizing; see [Material Modeling](/standards/layer-organization/material-modeling.html#modeled-thickness). |
| Bending ply | 3/8" | 5/16" | Supplier/nominal-naming quirk specific to this material — curve core and flex board, by contrast, run true to nominal. |

Any uncommon or specialty sheet good not listed here must be checked with a micrometer rather than assumed to run true to nominal.
