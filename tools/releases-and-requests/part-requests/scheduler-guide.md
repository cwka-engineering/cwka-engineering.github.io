---
layout: default
title: Scheduler Guide
permalink: /tools/releases-and-requests/part-requests/scheduler-guide.html
parent: Part Requests
grand_parent: Releases & Requests
nav_order: 2
---

# Part Requests — Scheduler Guide

> **Related**: [Engineer Guide](/tools/releases-and-requests/part-requests/engineer-guide.html) | [Part Management](/tools/epicor/part-management.html) | [Master Scheduler Procedures](/reference/adjacent-roles/master-scheduler.html)

When an engineer declines the existing parts, you get the request in the Parts Requests channel and two Planner tasks. `@parts-bot CREATE` saves the next part in Epicor. If the part is already in Epicor, reply `@parts-bot USE` and that part number.

`CREATE` and `USE` have to come from the Teams account named **Patrick Dobson**, in a reply under that request.

## When you are notified

The engineer has replied `@parts-bot DECLINE` under their post in **Parts Requests**.

1. The thread shows a worksheet: part number, description, class, search word, type `P`, product code `RAW`, units, and the dimensions that class uses. A 🔩 after a value means it came from the McMaster-Carr record.
2. A Planner task, **Create Part — {class} — {requester email}**, is due in three days.
3. A Planner task, **Sync sites via push-pull — {class}**, is due the next day.
4. The part number on the worksheet is the next free number in that naming series. `CREATE` reads the catalog again, so the saved number is the one named in the reply.

| Class on the form | Numbers |
|---|---|
| Hardware | GM.HW |
| Sheet Goods | GM.SG |
| Solid Lumber | GM.SL |
| Inventory Metal | GM.IM |
| Solid Surface | GM.SS |
| Fabric/Upholstery | GM.FU |
| Glass/Plastics | GM.GL |
| Lighting/Electrical | GM.LE |
| Stone | GM.ST |

`@parts-bot NEXT MT` reads the next number from any message. `NEXT IM` is the same series as `NEXT MT`. Metal is numbered `GM.IM`, fabric `GM.FU`, and lighting `GM.LE`. Class on the part stays the class code (`MT`, not `IM`).

A decline that never mentioned the bot can still reach you. The number on that worksheet can lag the catalog, especially for metal, fabric, and lighting. Send `NEXT` and the class, then `@parts-bot CREATE` on the request, so the saved number is the live one.

## Create the part

Reply under the request. `CREATE` alone saves the part from the worksheet. Each correction is its own line after `CREATE`, using the worksheet label, a colon, and the value.

```
@parts-bot CREATE
PartLength: 24
Thickness: 0.25
Brand:
```

- A blank value clears that prefilled field. `Brand:` saves the part with no brand.
- A line without a colon, a field that is not on the worksheet, or a dimension that is not a decimal (`0.75`, not `3/4`) is refused and nothing is created. Send `CREATE` again.
- The part number, the class, type `P`, product group `RAW`, and plant MfgSys stay as the worksheet has them. Drop a line that tries to change one of those and send `CREATE` again.

The bot takes the next free number, marks the request **Creating**, and saves the part in company 157539 on plant MfgSys. Plant CWNH is retired and is not written. The reply lists the fields it is saving and asks you to send `STATUS` in a minute.

`@parts-bot STATUS` then shows **Complete** and the part number. The create-part Planner task is closed. The push-pull reminder stays open until the part is active on the NY site.

If the reply says the command is still working, wait and send `STATUS`. Sending `CREATE` again while it is running starts no second part. If Epicor does not save the part, the request returns to **Awaiting scheduler**. You can `CREATE` again, or save the part yourself and reply `USE` and the number. A number that is already in the catalog is left unwritten. Send `NEXT` and try `CREATE` again.

## Record a part that is already in Epicor

`@parts-bot USE GM.HW.00545`

The number has to already exist in company 157539. The request closes, the part number is stored, and the create-part task is closed. The push-pull reminder stays open until the part is active on the NY site.

`USE` by itself asks for the number. A part number sent without `USE` asks for the command and leaves the request open.

## Sync the NY site

The part is saved for the CO site, company 157539, plant MfgSys. The NY site picks it up when you run the site push-pull. That is the second Planner task. The task closes once the part is active in both companies, and the requester is mentioned in the thread at the same time.

## What the worksheet already contains

The request supplies these when it has them. Your lines on `CREATE` replace them. A unit the match suggested replaces the class unit. A dimension is filled in only for a class that uses that dimension.

| Field | Starting value |
|---|---|
| Part number | One past the highest part in that naming series, read again at the moment of CREATE |
| Description | The suggested Epicor description. When the request named a McMaster-Carr SKU, this is rewritten from that record |
| Class | The form's class code. Metal is class `MT` and number `GM.IM.#####`. This line cannot be corrected |
| Search word | The suggested search word, cut at 8 characters |
| Units | The suggested unit, or the class unit below. Correct `IUM`, `PUM`, or `SalesUM` on their own lines |
| Unit class | The suggested unit class, or Count, Length, or Volume from the class. Label: `UOMClassID` |
| Type | `P` |
| Product group | `RAW` |
| Plant | MfgSys, in company 157539 |

| Class | Unit | Unit class |
|---|---|---|
| Hardware | EA | Count |
| Sheet goods | SH | Count |
| Solid lumber | BF | Volume |
| Inventory metal | LF | Length |
| Solid surface | EA | Count |
| Fabric | YD | Length |
| Glass, lighting, stone | EA | Count |

### A McMaster-Carr SKU

The worksheet is already filled from that product. Length comes from McMaster's length. The outside diameter comes from the screw size. A metric record keeps the number in millimeters and sets the unit to `MM`. A size McMaster does not state keeps what the requester wrote. A pack is listed and the unit stays EA. The search word stays the one from the form. A head diameter or a hex width has no line.

`PartLength: 24` under `CREATE` replaces the marked length. A 🔩 pasted on the end of a value is ignored.

### Lines you can correct

| Worksheet label | What it sets |
|---|---|
| `PartLength`, `PartWidth`, `PartHeight` | The size. The unit is `IN`, `LF`, or `MM` when the McMaster record is metric |
| `Thickness`, `ThicknessMax` | Thickness, and a max when the request gave a range |
| `DiameterOutside`, `DiameterInside` | Diameter |
| `Brand` | Commercial brand. `McMaster-Carr` when the request named that vendor |
| `SubBrand/SKU` | The SKU or product line |
| `Description`, `SearchWord` | The Epicor description and the 8-character search word |
| `IUM`, `PUM`, `SalesUM`, `UOMClassID` | The three units and the unit class |

| Class | Dimension lines on the worksheet |
|---|---|
| Hardware | Length, outside diameter. Inches, or millimeters when the McMaster record is metric |
| Sheet goods | Length, width, thickness. Inches |
| Inventory metal | Width, height, thickness. Inches |
| Solid surface | Length, width, thickness. Inches; thickness in millimeters |
| Fabric | Width. Feet |
| Solid lumber, glass, lighting, stone | None. A correction still writes one: `PartLength: 12` on a glass part sets the length |

## Your interactions at a glance

| When | What you do | Where |
|---|---|---|
| An engineer declines | Read the worksheet | The request's thread, and Planner |
| The next number should be created | `@parts-bot CREATE` | The request's thread |
| You want the live next number | `@parts-bot NEXT` and the class | Any message |
| The part is already in Epicor | `@parts-bot USE` and that part number | The request's thread |
| The save is still running | `@parts-bot STATUS` | The request's thread |
| The part is on MfgSys | Run the site push-pull | Epicor, and Planner |

## Tips

- **CREATE and USE are yours.** An engineer who sends them is told that only the scheduler can do that.
- **Corrections are lines under CREATE.**
- **The reminder is the cue to sync the NY site.** Closing the create-part task leaves the reminder open.
- **New parts are MfgSys.** CWNH stays unused.

## Questions or issues

Contact Fernando Saucedo or Caleb Marhoover if `CREATE` will not run, `STATUS` stays on Creating, or the number in the thread is already someone else's part.
