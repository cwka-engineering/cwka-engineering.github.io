---
layout: default
title: Common Mistakes
permalink: /reference/common-mistakes.html
parent: Reference
nav_order: 5
corpus_tags: [general, fe-release, fe-submittal]
---

# Common Mistakes

Recurring, anecdotal failure modes and gotchas — things that have actually gone wrong, not general how-to procedures. This is a single home for the "why didn't X work" / "watch out for Y" content that used to live scattered across topic pages. For tool or software access failures (Toolkit won't connect, checkbox won't check, export fails), see the role-specific troubleshooting pages instead: [FE Troubleshooting](/workflows/fabrication-engineer/troubleshooting.html), [PE Troubleshooting](/workflows/production-engineer/troubleshooting.html), [Epicor Troubleshooting](/tools/epicor/troubleshooting.html).

## Casework Construction

### Drawer slides mirrored or rotated 180°
{: #drawer-slides-mirrored-or-rotated-180}

Drawer slides have been found physically mirrored or rotated 180° from correct — on top of missing machining entirely. Check both **presence and orientation**, not just presence. See [Construction Boring](/reference/construction-standards/casework/construction-boring.html#who-places-dowels).

### Flat filler with no scribe allowance
{: #flat-filler-with-no-scribe-allowance}

Fillers require a scribe allowance. A flat filler with **no** scribe allowance at all is a likely-error condition, not just a style variant. See [Fillers](/reference/construction-standards/casework/fillers.html).

## Material Modeling

### Full-face veneer over plastic laminate
{: #full-face-veneer-over-plastic-laminate}

A part modeled with veneer laid over plastic laminate across the **whole face** is almost always a misread — full-face veneer-over-plastic doesn't make physical sense as a buildup. The correct intent is almost always to post-laminate only the **edge** (double edge), not the full face. Stop and confirm the actual intended detail before modeling it as drawn. See [Material Modeling — Pre-Lam vs. Post-Lam](/standards/layer-organization/material-modeling.html#how-to-determine-edgebanding).

## Part Naming

### Parts silently not getting named
{: #parts-silently-not-getting-named}

Two common causes when Generate Names silently skips parts:

- **Parent-child layer nesting**: nesting a layer inside another layer (rather than keeping material layers flat/parallel) can break the auto-namer's ability to read attributes from the layer. Keep material layers unnested.
- **A material word embedded in a PRE code**: a PRE lay-up code (`PRE_[face]_[core]_[backer]_[thickness mm]`, see [Modeling Toolkit](/workflows/fabrication-engineer/toolkit/modeling.html#how-to-model-pre-layup)) is a compound code the namer parses positionally — a material word placed there instead of the correct segment reads as malformed rather than as material data, and the part won't get named.

See [Part Naming](/workflows/fabrication-engineer/part-naming.html).

## Epicor

### Drawing quantity mistaken for Production Quantity
{: #drawing-quantity-mistaken-for-production-quantity}

Epicor does not track the number of individual pieces within a kit — only the Production Quantity of the job itself. These are not the same thing.

**Example:** A Metal Kit job with Prod Qty = 1 may contain four identical pieces of metal angle. The quantity "4" describes objects within the kit, not how many kits are being produced. Writing "Production Quantity: 4" on the drawing page that dimensions that angle is **incorrect** — it will be misread as an Epicor job field and create confusion on the shop floor. Use language like **"Qty: 4"** or **"4× REQ'D"** instead. See [Production Quantity & Fixed Qty](/tools/epicor/production-quantity.html).

### Multi-site slip-ups
{: #multi-site-slip-ups}

- Forgetting to refresh after a site switch → stale data on homepage cards
- Updating a Production Report from the wrong site → changes won't save
- Submitting time for both sites in one batch → entries fail for the wrong site
- Looking for a newly created GM part at NY before the 24-hour sync → part not found

See [Multi-Site Operations](/tools/epicor/multi-site-operations.html).
