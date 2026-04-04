---
layout: default
title: Lay-Up Formulas
permalink: /standards/reference-tables/lay-up-formulas.html
parent: Reference Tables
grand_parent: Standards
nav_order: 4
---

# Lay-Up Formulas

Reference for pre-laminated (PRE) material codes, thickness calculations, and the lay-up code system.

> **Related Documents**: [Codes & Tags](/standards/layer-organization/codes-and-tags.html) | [Material Modeling](/standards/layer-organization/material-modeling.html)

## PRE Code Format

```
PRE_[face]_[core]_[backer]_[thickness in mm]
```

- Use Epicor `GM.SG.XXXXX` codes with **leading zeros dropped**
- Multi-core layups repeat the core number

**Example:** `PRE_438_331_7_19` = face GM.SG.00438 + core GM.SG.00331 + backer GM.SG.00007 + 19mm total

**Multi-core example:** `PRE_438_331_331_7_37` = face + two layers of core + backer at 1.5" total

## Thickness Formula

Each face (veneer or plastic laminate, regardless of spec) is assumed to be **1/32" (0.03125")** thick.

**Total = face + core + backer**

## Standard Lay-Up Thicknesses

| Category | Components | Formula | Modeled Thickness |
|----------|-----------|---------|-------------------|
| 1/4" lay-up | VN/PLAM + 1/4" MDF/PB + VN/PLAM | .03125 + .25 + .03125 | **0.3125"** |
| 1/2" lay-up | VN/PLAM + 1/2" MDF/PB + VN/PLAM | .03125 + .5 + .03125 | **0.5625"** |
| 3/4" (11/16 core) | VN/PLAM + 11/16" MDF/PB + VN/PLAM | .03125 + .6875 + .03125 | **0.75"** |
| 3/4" (3/4 core) | VN/PLAM + 3/4" MDF/PB + VN/PLAM | .03125 + .75 + .03125 | **0.8125"** |
| 1" lay-up | VN/PLAM + 1" MDF/PB + VN/PLAM | .03125 + 1.0 + .03125 | **1.0625"** |

## Non-Nominal Thickness Exception

Only **3/4" plywood** deviates from nominal — model at **0.73"** (always thinner than nominal). All other sheet goods are modeled at their nominal thickness.

## PE Usage

The PE creates a **Lay-Up Summary** document from the PRE codes, listing:
- Material code (Rhino layer name using PRE format)
- Description of materials being glued
- Quantities

This document is stored in the Production Files folder and printed for the Panel Lay-up team.
