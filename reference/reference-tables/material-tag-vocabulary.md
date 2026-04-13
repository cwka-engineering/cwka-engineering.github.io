---
layout: default
title: Material Tag Vocabulary
permalink: /reference/reference-tables/material-tag-vocabulary.html
parent: Reference Tables
grand_parent: Reference
nav_order: 3
---

# Material Tag Vocabulary

Complete reference for material tags used on drawings, in the Material Transmittal Log, and as Rhino layer identifiers.

> **Related Documents**: [Codes & Tags](/standards/layer-organization/codes-and-tags.html) | [Material Modeling](/standards/layer-organization/material-modeling.html) | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html)

## Tag Format Rules

Tags use the material abbreviation followed by **double-digit numbering starting at "01"** — no spaces, hyphens, or underscores between the abbreviation and the number. This ensures proper sorting in Excel and consistent rendering on the G00 page.

Descriptions follow as free text after the tag. Example: `PLY01 SHOP PLY`

The PM designates project material tags. Engineers use them on drawings and in BOM references.

---

## Finishes

| Tag | Material | Example Description |
|-----|----------|-------------------|
| FN## | All finishes (paint, powder coat, lacquer, clear coat, primer, stain) | `FN01 BLACK PAINT` |
| FN00 | Raw / Not Used | `FN00 RAW` |

## General Materials

| Tag | Material | Example Description |
|-----|----------|-------------------|
| CONC## | Concrete | `CONC01 CONCRETE FINISH` |
| GL## | Glass, mirror, acrylic glass | `GL01 CLEAR LOW IRON GLASS, LAMINATED` |
| HDF## | High density foam | `HDF01 CORAFOAM` |
| HDU## | High density urethane foam | `HDU01 HDUF 10LB` |
| LAM## | Laminate (plastic laminate, Kinon, etc.) | `LAM01 WILSONART SATIN STAINLESS 4830` |
| LVL## | Laminated veneer lumber | `LVL01 LVL` |
| MDF## | Any fiberboard (MDF, HDF, LDF, Medex, MR50, fire-rated) | `MDF01 MEDIUM DENSITY FIBERBOARD, MR10` |
| MDO## | MDO plywood | `MDO01 MDO Struc 1 Plywood` |
| MEL## | Melamine | `MEL01 WHITE MELAMINE` |
| MT## | All metals (aluminum, steel, stainless) | `MT01 MILD STEEL` |
| PB## | Particleboard, strandboard, Kerfcore | `PB01 KERFCORE, TIMBERFLEX` |
| PL## | Acrylic / plexiglass only | `PL01 PLEXIGLASS MILK WHITE 2447` |
| PLTR## | Plaster | `PLTR01 PLASTER FINISH` |
| PLY## | Unfaced plywood (shop ply, bending ply) | `PLY01 SHOP PLY` |
| SG## | Cement board (Durock, etc.) | `SG01 DUROCK` |
| SS## | Solid surface (Corian, Durat, Krion) | `SS01 CORIAN GLACIER WHITE` |
| ST## | Stone, terrazzo | `ST01 TERRAZZO` |

## Veneer, Solid Wood, and Edgebanding

| Tag | Material | Example Description |
|-----|----------|-------------------|
| EB## | Edgebanding (any type) | `EB01 EDGEBAND TO MATCH WB01B K6307ZK` |
| VN## | Wood veneer | `VN01 VENEER K6307ZK-KD48B, RECON, PREFINISHED` |
| WD## | Solid wood | `WD01 WHITE OAK PLAIN SAWN` |

## Fabric and Upholstery

| Tag | Material | Example Description |
|-----|----------|-------------------|
| FA## | Fabric, upholstery foam | `FA01 CARNEGIE, XOREL, METEOR 6427-717` |

## Hardware, Lighting, and Electrical

| Tag | Material | Example Description |
|-----|----------|-------------------|
| HW## | Generic door hardware | `HW01` |
| LT## | Lighting, track | `LT01` |
| BRACKET # | Bracket (single digit) | `BRACKET 1 GM.HW.00516 - ADAToekick...` |
| CATCH # | Catch | `CATCH 1 GM.HW.03015 Catch,Magnetic...` |
| CASTER # | Caster | `CASTER 1` |
| DRAWER SLIDES # | Drawer slides | `DRAWER SLIDES 1 GM.HW.03006 - Blum...` |
| GROMMET # | Grommet | `GROMMET 1 Mockett, MM5SET-26D...` |
| HINGES # | Hinges | `HINGES 1 Blum, 71T3590...` |
| LOCK # | Cabinet lock | `LOCK 1 Best Access, 5L7-R-D-2-626-T` |
| POWER # | Power supply | `POWER 1` |
| PULL # | Pull | `PULL 1` |
| RECEPTACLE # | Receptacle | `RECEPTACLE 1` |
| TABLE LEG | Table leg (no number) | `TABLE LEG HAFELE, 635.68.271, E-Leg...` |

**Note:** Hardware tags on shop drawings are maintained directly by engineers (not pulled from the TRA) and should match the final BOM'd product.

---

## Epicor Material Class Codes

These are the ERP grouping codes used in the Epicor Parts database — distinct from the drawing material tags above.

| Code | Definition |
|------|-----------|
| WC | Cabinet or Wood Component (custom) |
| FU | Fabric/Upholstery |
| FM | Finish Material (ordered specific to project) |
| GL | Glass |
| HW | Hardware (excluding electrical) |
| LE | Lighting/Electrical |
| MT | Custom Metal parts/assemblies |
| IM | GM Metal (inventory metal raw material) |
| MC | Misc (avoid if possible) |
| SG | Sheet Goods (excluding metal and solid surface) |
| SH | Shop Supplies (general consumables) |
| SL | Solid Lumber |
| SS | Solid Surface |
| ST | Stone |
| TO | Tooling (project-specific) |

## ARCH Tags

The architect's tag designation for the same material. Cross-referenced on the G00 General Requirements page alongside the CWK material tag. The PM maintains the ARCH-to-CWK mapping in the Material Transmittal Log.
