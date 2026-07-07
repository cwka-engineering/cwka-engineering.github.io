---
layout: default
title: Carcase Assembly & 32mm System
permalink: /reference/construction-standards/casework/carcase-and-line-bore.html
parent: Casework
grand_parent: Construction Standards
nav_order: 1
corpus_tags: [general, fe-submittal]
---

# Carcase Assembly & 32mm System

These rules apply to **all** cabinet types unless a type-specific override is noted on that cabinet family's own page ([Base](/reference/construction-standards/casework/base-cabinets.html), [Upper](/reference/construction-standards/casework/upper-cabinets.html), [Tall](/reference/construction-standards/casework/tall-cabinets.html)).

> See also: [Casework Type Codes & Names](/reference/construction-standards/casework/type-codes.html) for what each cabinet code (BC1D, UC2D, etc.) refers to.

---

## Structural Members

| Member | Width | Joinery | Machining |
|---|---|---|---|
| Stretchers | 5" | Doweled in place | CNC bore for dowels |
| Nailers | 4" | Glued and pocket screwed | NO CNC machining |

Stretchers are the primary structural horizontal members that receive dowel joints and transfer loads. Nailers are secondary members used for mounting/alignment — they are field-attached with glue and pocket screws and do not pass through the CNC.

**Exception — Sink cabinets (BS2D):** The back stretcher is 4" wide, not 5". See [Base Cabinets — Type-Specific Notes](/reference/construction-standards/casework/base-cabinets.html#type-specific-notes).

> **Note:** All nailers, across base, tall, and upper cabinets alike, are the same material: **0.75" shop plywood**. There is no separate nailer spec per cabinet family.

---

## Back Panel

The back panel is a critical structural element captured in dados on the carcase.

| Parameter | Value | Notes |
|---|---|---|
| Inset from rear | 3/4" from back of cabinet sides | Back face of back, not front face |
| Captured in | Sides and bottom (3 sides) | Standard condition |
| Captured in (upper, top visible) | All 4 sides | When top panel is exposed — see [Upper Cabinets](/reference/construction-standards/casework/upper-cabinets.html#back-panel--visible-top-condition) |
| Dado depth | 7mm | Into each capturing member |
| Dado width | Back thickness + 1/32" | Provides assembly clearance |
| Standard back thickness | 1/4" | For 1/4" backs, dado is 7mm × 7mm |

**ADA Sink Cabinet (BS2D_ADA) exception:** Back is a 3/4" plant-on back (not dadoed), unless a finished side condition applies. If either side is finished, the 3/4" back is captured between sides and pocket screwed. See [Base Cabinets](/reference/construction-standards/casework/base-cabinets.html#type-specific-notes).

---

## Adjustable Shelves

| Parameter | Value |
|---|---|
| Front setback | 1/8" from front of cabinet |
| Width | 1/16" less than interior opening width (1/32" gap each side) |
| Thickness | 3/4" (standard panel stock) |

## Fixed Shelves

| Parameter | Value |
|---|---|
| Front alignment | Flush with front of cabinet |
| Width | Full interior opening width |
| Joinery | Doweled (same as stretchers) |
| Required when | Tall cabinets over 72" high — at approximately mid-height (see [Tall Cabinets](/reference/construction-standards/casework/tall-cabinets.html#fixed-shelf-requirement)) |

## Predrills

Predrill holes (Ø5mm) are placed in **all** of the following unless the face is a finished condition:
- Tops
- Bottoms
- Fixed shelves
- Dividers

If the face is a finished/visible condition, omit predrills on that face. See [Construction Boring](/reference/construction-standards/casework/construction-boring.html) for hole patterns and spacing.

---

## The 32mm System — Shelf-Pin Line Boring
{: #32mm-system}

The 32mm system is the backbone of adjustable shelf positioning and is used on every cabinet with adjustable shelves.

### Hole Specification

| Parameter | Value |
|---|---|
| Hole diameter | Ø 5mm |
| Hole depth | 1/2" |
| Hole spacing | 32mm on center |
| Column inset from front edge (of adjustable shelf) | 2" |
| Column inset from back edge (of adjustable shelf) | 2" |

> **Note:** The 2" column inset is measured from the **adjustable shelf's** front/back edges, not the cabinet carcase's edges.

### Vertical Limits

| Parameter | Rule |
|---|---|
| First hole (bottom) | 6" above top face of bottom panel (or fixed shelf) |
| Last hole (top) | Closest to 6" below bottom face of top panel (or top stretcher, drawer stretcher, or fixed shelf) |

**Important:** The "last hole" rule uses "closest to 6"" — the 32mm grid determines the exact position, and the last hole is the one in the grid nearest to (but not exceeding) the 6" clearance zone.

### Tall Cabinet Special Case

In tall cabinets with a fixed shelf at mid-height, the line bore is split into two independent zones:
- **Lower zone**: 6" above bottom to 6" below fixed shelf
- **Upper zone**: 6" above fixed shelf to 6" below top

Each zone has its own independent column of holes on both the front and back edges. See [Tall Cabinets — Internal Layout](/reference/construction-standards/casework/tall-cabinets.html#internal-layout).
