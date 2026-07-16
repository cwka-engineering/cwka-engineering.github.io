---
layout: default
title: Construction Boring
permalink: /reference/construction-standards/casework/construction-boring.html
parent: Casework
grand_parent: Construction Standards
nav_order: 8
corpus_tags: [general, fe-submittal]
---

# Construction Boring

CNC boring patterns for all dowel joints and predrill positions. All machining is based on the [32mm system](/reference/construction-standards/casework/carcase-and-line-bore.html#32mm-system).

## Who Places Dowels?

**Dowel placement is PE's responsibility, not FE's** — PE applies dowels to the current standard at release time. FE should not place dowels in the release model.

Files arriving **partially or incorrectly dowelled are worse than files with no dowels at all** — PE then has to determine what's actually there before applying the standard, rather than applying it fresh. If a file has partial or incorrect dowelling, verify what's present or strip it and reapply, rather than shipping it through as-is.

**Exception**: shelf pins (32mm line-bore holes) are always present regardless — see [Carcase Assembly & 32mm System](/reference/construction-standards/casework/carcase-and-line-bore.html#32mm-system).

Separately, **FE is responsible for hardware machining** — hinge cups (see [Hinge Hardware & Cup Boring](/reference/construction-standards/casework/hinge-hardware.html)), drawer slides, and other applied hardware. Drawer slides in particular should be checked for both presence and correct orientation — slides have been found physically mirrored or rotated 180° from correct, on top of missing machining entirely.

## Dowel Holes

| Parameter | Value |
|---|---|
| Diameter | Ø 8mm |
| Depth | 1/2" |
| First dowel from front/edge of part | 1" |

> **Note:** Dowel hole depth (1/2") is shallower than the dowel pin's own overall length — a dowel is only inserted partway into each mating part, so the drilled hole depth is necessarily less than the total pin length. Don't confuse a dowel pin's part-length spec with the hole-depth spec above; they're not the same number.

## Dowel Spacing by Member Type

| Member | Spacing | Notes |
|---|---|---|
| Stretchers (5" wide) | 64mm (2 × 32mm) | Tighter spacing for structural joints |
| All other parts | 96mm (3 × 32mm) | Standard spacing |

## Predrill Holes

| Parameter | Value |
|---|---|
| Diameter | Ø 5mm |
| Position | Centered between adjacent dowel holes |
| Placement | All unexposed cabinet sides |
| Omit when | Face is a finished/visible condition |

See [Carcase Assembly — Predrills](/reference/construction-standards/casework/carcase-and-line-bore.html#predrills) for which faces require predrilling by default.

> **Note:** A joint-by-joint visual walkthrough of the CNC pattern layout isn't included here — request one from engineering if you need it.
