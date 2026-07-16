---
layout: default
title: Base Cabinets
permalink: /reference/construction-standards/casework/base-cabinets.html
parent: Casework
grand_parent: Construction Standards
nav_order: 2
corpus_tags: [general, fe-submittal]
---

# Base Cabinets

Standard base cabinets follow the universal [Carcase Assembly & 32mm System](/reference/construction-standards/casework/carcase-and-line-bore.html) rules with the type-specific dimensions, layout, and hardware placement below.

> See also: [Casework Type Codes & Names](/reference/construction-standards/casework/type-codes.html) for the full list of base cabinet codes (BC1D_R, BC2D, BDS3, etc.)

## Standard Dimensions

| Parameter | Value |
|---|---|
| Standard height | 30.5" |
| Standard depth | 24" (side panel depth) |
| Side thickness | 3/4" |
| Bottom thickness | 3/4" |
| Nailer thickness | 0.75" (shop plywood — same material used on tall and upper cabinets) |

## Internal Layout (Cross Section, Top to Bottom)

Base cabinets carry **two stretchers, both located near the top of the carcase** (one front, one back) — there is no stretcher resting on the bottom panel.

1. **Front stretcher** — 5" wide × 3/4" thick, doweled between sides at the top front of the carcase
2. **Back stretcher** — 5" wide × 3/4" thick, doweled between sides at the top, inside the back (pairs with the front stretcher to form the top frame)
3. **Nailer** — 4" wide × 0.75" thick, glued and pocket screwed, immediately below the stretchers
4. **Adjustable shelf zone** — line bore columns at 2" from front and back edges of the adjustable shelf
5. **Bottom panel** — 3/4" thick, between sides
6. **Back nailer** — 4" wide × 0.75" thick, at rear, pocket screwed
7. **Back panel** — 1/4" thick, in 7mm dado, 3/4" inset from rear

## Stretcher Count by Type

| Cabinet Type | Stretchers | Notes |
|---|---|---|
| BC1D, BC2D, BCO | 2 | Front + back, both at top |
| BC1D1D (door + drawer) | 3 | Front + back at top, plus mid (under drawer) |
| BC2D1D (2 door + drawer) | 3 | Front + back at top, plus mid (under drawer) |
| BC2D2D (2 door + 2 drawer) | 3 | Front + back at top, plus mid (under drawers) |
| BDS3 (3 drawer) | 4 | Front + back at top, plus between each drawer pair |
| BDS4 (4 drawer) | 5 | Front + back at top, plus between each drawer pair |

The stretcher under a drawer is positioned so that it is **centered on the reveal** between the door and drawer front — its centerline aligns with the 1/8" gap between the door and drawer fronts.

## Doors

| Parameter | Value |
|---|---|
| Inset from exterior sides | 1/16" each side |
| Reveal at top (below cabinet top) | 1/4" |
| Reveal between door and drawer | 1/8" |
| Thickness | 3/4" |
| Max width (1 door cabinet) | 24" |
| Max width (2 door cabinet) | 48" |

## Hinge Placement

| Parameter | Value |
|---|---|
| Top hinge from top of door | 3" |
| Bottom hinge from bottom of door | 3" |
| Third hinge | Add if door > 36" high |

**Exception — Sink cabinet (BS2D):** Top hinge is 6" from top of door (not 3"). Bottom hinge remains 3" from bottom.

> This covers vertical hinge position only. For cup boring, mounting-plate selection, and overlay, see [Hinge Hardware & Cup Boring](/reference/construction-standards/casework/hinge-hardware.html).

## Pull Placement

| Parameter | Value |
|---|---|
| Inset from side of door (to center) | 1-1/2" |
| Down from top of door (to center) | 1-1/2" |
| Side | Hinge-opposite side, unless otherwise noted |

## Dividers

| Condition | Rule |
|---|---|
| Cabinets ≤ 35-1/2" wide | No divider required |
| Cabinets > 35-1/2" wide | Full-height divider required, OR thick shelves |
| BC2D2D ≤ 35-1/2" wide | Divider between top stretchers and drawer stretcher only |
| BC2D2D > 35-1/2" wide | Full-height divider |

---

## Type-Specific Notes
{: #type-specific-notes}

**BCO (Open Cabinet)**: Full top panel (unlike standard base cabinets, which are open at top). No stretchers — uses nailers only (4" wide). No doors or drawer fronts. Otherwise identical carcase construction.

**BS2D (Sink Cabinet)**: Open interior for plumbing. Back stretcher is 4" wide (not 5"). Interior has no shelf obstructions between the sides below the stretchers. **The front stretcher is vertical**, same construction principle as BS2D_ADA below.

**BS2D_ADA (ADA Sink Cabinet)**:
- Front stretcher is **vertical** (not horizontal), positioned with bottom at 27" AFF minimum
- Back is 3/4" plant-on back (not dadoed) unless finished side condition; if either side is finished, the 3/4" back is captured between sides and pocket screwed to sides
- Toe kicks attached to door faces with ADA bracket hardware (GM.HW.00516 white, GM.HW.00517 black)
- Overall height: 32-1/2" (adjustable for countertop thickness)
- Knee clearance: 27" minimum height, 23-1/4" depth

**BCT1D / BCT_PO (Trash Cabinets)**: Standard carcase with drawer opening for trash pullout. Same stretcher and nailer rules as drawer cabinets.

> **Note:** The drawing set's title blocks still label these cabinets `BCTRASH1D` / `BCTRASHPO`. Use `BCT1D` / `BCT_PO` in Epicor and shop documentation — the drawings haven't been updated to the current naming yet.

---

## Ladder Base (LB)

The ladder base is a structural platform that raises base cabinets off the floor.

| Parameter | Value |
|---|---|
| Overall height | 4" standard |
| Depth | Matches cabinet depth minus toekick setback |
| Material | All 0.75" shop plywood |
| Construction | Open frame ("ladder" rungs) with cross-members for support |
| Toekick setback | 3" from front face |

> **Note:** Part quantity varies with ladder base length — there is no fixed part count.
