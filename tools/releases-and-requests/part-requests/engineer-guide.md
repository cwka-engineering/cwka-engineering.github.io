---
layout: default
title: Engineer Guide
permalink: /tools/releases-and-requests/part-requests/engineer-guide.html
parent: Part Requests
grand_parent: Releases & Requests
nav_order: 1
---

# Part Requests — Engineer Guide

> **Related**: [Scheduler Guide](/tools/releases-and-requests/part-requests/scheduler-guide.html) | [Part Management](/tools/epicor/part-management.html) | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html)

When a GM part you need is not one you already know, the New Part Request form looks for an existing part and posts the result in Teams. You accept one of the matches, or you ask the scheduler to create a new part.

The reply that counts is `@parts-bot` under that post.

## Step 1: Submit the form

Open the **New Part Request** form in the Airtable base **Releases & Requests**.

[New Part Request](https://airtable.com/app2X7JU998GzDUWj/pag1lahNDC9UDzw8Q/form)

1. **Requester.** Select your name. You have to be on the People list, with an email. Your Teams display name has to match that People name, on the full name.
2. **Category.** Hardware, sheet goods, solid lumber, inventory metal, solid surface, fabric, glass, lighting, or stone.
3. **Subcategory.** The Epicor search word. Choose **Other** and type one of 8 characters or less. Glass, lighting, and stone have no subcategory.
4. **Description.** Measurements and units. Include a McMaster-Carr SKU, or the product link, when you have one.
5. **Unknown** has no class. That submission stops, and nothing is posted. Pick the category that fits.
6. One submission is one part.

| Category | Part numbers |
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

## Step 2: Read the channel post

Within a few minutes the **Parts Requests** channel gets a thread and you are @mentioned.

| Result | What you do |
|---|---|
| Strong match, or possible match | The post lists part numbers. Accept one of those numbers, or decline |
| No existing part matched | Decline, so the scheduler creates one. If you have since found an existing part, accept that number |

Glass, lighting, and stone are not searched, so those posts say no existing part matched.

If nothing arrives, ask Fernando Saucedo or Caleb Marhoover. A missing People email, or the category Unknown, never posts.

### A McMaster-Carr SKU

Hardware requests are looked up from the SKU alone (`91251A540`, or a `mcmaster.com` link). Any other category is looked up when the description also says McMaster. The suggested description is rewritten from that product. The brand and the SKU stay out of the description. A length you typed is replaced when McMaster states a different one, and the notes say what changed. A pack is named in the notes. The inventory unit stays each. A metric product stays in millimeters. The search word stays the subcategory you picked. If McMaster does not answer, the post uses the description and sizes from what you typed.

## Step 3: Reply under that post

Mention the bot. `HELP` and `NEXT` work in any message. The other commands are replies in that thread.

| Reply | Effect |
|---|---|
| `@parts-bot ACCEPT GM.HW.00544` | Closes the request on that number. The number has to be one of the parts the post listed. When the post listed none, the number you type is the one you found |
| `@parts-bot ACCEPT` or `ACCEPT 2` | Asks for the part number and leaves the request open |
| `@parts-bot DECLINE` | Asks the scheduler to create a part. The thread shows the worksheet. Two Planner tasks open |
| `@parts-bot STATUS` | Status, matches, the part you accepted, and the new part number once one exists |
| `@parts-bot NEXT MT` | The next free number in that series. Metal is `MT` (`GM.IM`), fabric is `FA` (`GM.FU`), lighting is `LT` (`GM.LE`). The other classes use their own two letters. Nothing is written |
| `@parts-bot HELP` | The command list |

Only the person selected as Requester can accept or decline. Ask Fernando Saucedo or Caleb Marhoover to be added or renamed if the bot says the requester has to answer.

A reply that does not mention `@parts-bot` is conversation, except a plain `DECLINE`, which an older path still picks up. Use the mention so the suggested number is the live one.

## Step 4: After you decline

The request stays with the scheduler until a part number is stored.

- **Awaiting scheduler** — they have it.
- **Creating** — the part is being saved.
- **Complete** — a number is on the row.

Use the **Chosen** number when you accepted an existing part. Use the **Part number** when a new part was created. That is the number for the BOM or the order.

When that new part is active in both companies, the thread mentions you with the number. Until that reply, the NY site is still waiting on the push-pull.

## Your interactions at a glance

| When | What you do | Where |
|---|---|---|
| You need a GM part | Submit the form | New Part Request |
| The post lists matches | `@parts-bot ACCEPT` and one of those part numbers | The request's thread |
| None of the matches work | `@parts-bot DECLINE` | The request's thread |
| You want the next number in a class | `@parts-bot NEXT` and the class | Any message |
| You want to know if it closed | `@parts-bot STATUS` | The request's thread |
| The new part is active in both companies | Read the mention | The request's thread |

## Tips

- **Name the part number.** `ACCEPT` without it leaves the request open.
- **The number has to be on the list** when the post listed matches. A different number is refused. Decline if none of them is the part.
- **Put a McMaster-Carr SKU in the description when you have one.** The product link works too.
- **Submit once.** A second form is a second request.

## Questions or issues

Contact Fernando Saucedo or Caleb Marhoover if the post never arrives, the bot will not take your reply, or `STATUS` does not match the thread.
