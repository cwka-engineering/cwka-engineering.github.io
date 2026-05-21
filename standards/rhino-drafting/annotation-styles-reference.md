---
layout: default
title: Annotation Styles Reference
permalink: /standards/rhino-drafting/annotation-styles-reference.html
parent: Rhino Drafting
grand_parent: Standards
nav_order: 8
corpus_tags: [fe-submittal]
---

# Annotation Styles Reference

The department template includes four annotation styles. Use `SetCurrentAnnotationStyle` to switch between them based on drawing type.

> **Related Documents**: [Annotations](/standards/rhino-drafting/annotations.html) | [Layout Structure](/standards/rhino-drafting/layout-structure.html)

## Styles

| Style | Use Case | Tolerance |
|-------|----------|-----------|
| `CWKA_2024-GEN` | Standard shop drawing dimensions | 1/32" |
| `CWKA_2024-A-SITE` | 1XX reference plans (foot-inches format) | — |
| `CWKA_2024-VIF` | Field-verify dimensions (variant of A-SITE with VIF suffix) | — |
| `CWKA_2024-MTL` | Metal-specific drawings | See metal standards |

## When to Use Each Style

**GEN** — Default for all 2XX shop drawings (isometrics, plans, elevations, sections, details). Uses fractional inches with 1/32" tolerance. This is your most-used style.

**A-SITE** — Use only for 1XX reference plans where dimensions are in feet and inches. These are typically enlarged floor plans, RCPs, and VIF plans derived from architect drawings.

**VIF** — Variant of A-SITE that appends "VIF" to dimension text, indicating the dimension must be verified in field. Use for any dimension based on nominal or assumed conditions that require field confirmation.

**MTL** — Use for metal-specific shop drawings where tolerances and conventions differ from standard millwork. Consult the metal standards documentation for specific tolerance requirements.

## Setting the Style

Run `SetCurrentAnnotationStyle` in Rhino and select the appropriate style. All new dimensions and annotations will use the selected style until changed. Existing annotations retain their original style unless manually reassigned.
