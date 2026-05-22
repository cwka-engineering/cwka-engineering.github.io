---
layout: default
title: Manufactured Parts
permalink: /standards/layer-organization/manufactured-parts.html
nav_order: 3
parent: Layer Organization
grand_parent: Standards
corpus_tags: [fe-release, fe-submittal]
---

# Manufactured Parts (MFG)

Custom products from feeder jobs.

> **Related**: [Modeling Techniques](/standards/layer-organization/modeling-techniques.html) | [Material Modeling](/standards/layer-organization/material-modeling.html)

## Naming Convention

Part names always end with a `.P###` part number:

| Format | Example | Notes |
|--------|---------|-------|
| `PROJ.MT.#####.P###` | `1001.MT.00001.P001` | Project MT part |
| `PROJ.MT.#####.SA###.P###` | `1001.MT.00001.SA001.P001` | MT part within a subassembly |
| `PROJ.WC.#####.P###` | `1001.WC.00001.P001` | Project WC part |
| `AC.MT.#####.P###` | `CM.MT.00005.P001` | Catalog MT part |
| `AC.WC.#####.P###` | `TT.WC.00100.P001` | Catalog WC part |

The `SA###` subassembly segment is **optional, MT parts only** — not used on WC or catalog parts. When present, the SA number matches the top-level group name in the file.

## Group Names

Top-level group names differ by file type:

- **Standard project files** (`PROJ.JOB_PE`): groups use **SC###**
- **Manufactured part files** (`PROJ.MT.#####_PE`, `PROJ.WC.#####_PE`): groups use **SA###**

## Referencing MFG Parts

- **Linked Block**: For static subassemblies.
- **Embedded Block**: For adjustable parts.
- **Integrated Layer**: For custom sheet goods.

## In Parent Jobs

- **Retain original names** for clarity.

## Next Steps
- Learn about [Material Modeling](/standards/layer-organization/material-modeling.html)

