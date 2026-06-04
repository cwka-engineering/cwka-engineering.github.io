---
layout: default
title: Engineer / PM Guide
permalink: /tools/releases-and-requests/part-requests/engineer-guide.html
parent: Part Requests
grand_parent: Releases & Requests
nav_order: 1
corpus_tags: [fe-release]
---

# Part Requests — Engineer / PM Guide

> **Related**: [Scheduler Guide](/tools/releases-and-requests/part-requests/scheduler-guide.html) | [Part Management](/tools/epicor/part-management.html) | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html)

When you need a material part that isn't in your BOM or that you can't find in Epicor, the Part Requests workflow handles the lookup for you. Submit a quick form, review the result in Teams, and reply with one word. The system does the rest.

Everything happens in Teams — no emails or side conversations needed.

---

## Step 1: Submit the Form

Fill out the **Part Request** form in Microsoft Forms. You'll need:

- **Material category** — Hardware, Sheet Goods, Solid Lumber, Inventory Metal, etc.
- **Subcategory** — a more specific product type within the category (species for lumber, hardware type for HW, sheet type for SG, etc.) — shown where applicable
- **Description** — describe the part in your own words. Include dimensions, material grade, finish, thread spec, or any other relevant attributes. The more specific you are, the better the result. If you have a McMaster-Carr SKU, include it here.

---

## Step 2: Review the Result in the Parts Requests Channel

Within a minute or two, a post will appear in the **Part Requests** channel in Teams. You'll be **@mentioned** and will receive a notification.

The post will show one of three outcomes:

| Header | Meaning |
|---|---|
| 🟢 **Strong match found** | A high-confidence existing catalog part was found |
| 🟡 **Possible match — review needed** | One or more candidates were found but confidence is not certain |
| 🔵 **No match — new part needed** | Nothing in the catalog matches your description |

For match results, candidate parts are listed with their ERP numbers, descriptions, and confidence ratings. For no-match results, a suggested ERP description is shown for reference.

---

## Step 3: Reply ACCEPT or DECLINE

Reply in the thread — not as a new post — with one of two responses:

**ACCEPT** — an existing candidate works for your project, or you're satisfied the assessment is correct. The request closes and no further action is needed on your end.

**DECLINE** — none of the candidates work, or no match was found and you need a new part created.

> Keep your reply simple. The system reads for the keywords ACCEPT or DECLINE. You can add a note after if it's helpful for context, but the keyword must be present.

---

## Step 4 (DECLINE only): Wait for the Scheduler

If you DECLINE, the scheduler is automatically notified in the same thread and a task is created for them in Planner. The scheduler typically has **3 business days** to create the new part in Epicor.

You don't need to do anything during this time. The thread will stay open until the part is confirmed.

---

## Step 5 (DECLINE only): Receive the Confirmed Part Number

Once the scheduler has created the part, you'll be **@mentioned again** in the thread with a confirmation showing the new part number and its confirmed description directly from the Epicor catalog. Use that number for your BOM, RFQ, or order.

---

## Your Interactions at a Glance

| When | What you do | Where |
|---|---|---|
| Need a part looked up | Fill out the Part Request form | Microsoft Forms |
| Result posted | Reply ACCEPT or DECLINE | Part Requests channel in Teams |
| New part confirmed | Note the part number from the thread | Part Requests channel in Teams |

Three touchpoints at most.

---

## Tips

**Be specific.** Dimensions, grade, finish, thread spec, surface treatment — the more detail you include, the more accurate the match. "1/2 bolt" will produce a weaker result than "1/2-13 hex bolt 3 inch black oxide."

**Include a McMaster SKU if you have one.** The system flags it for the scheduler, who can reference the product page when creating the part. Don't rely on the SKU alone — include a description too.

**Reply in the thread, not as a new post.** The system links your reply to your specific request by the thread. A reply to the wrong thread or a new post will not be processed.

**Don't resubmit if something looks slow.** If the post hasn't appeared after a few minutes, contact **[engineering admin]** rather than submitting a second time — duplicate submissions create duplicate requests.

**The scheduler may ask a clarifying question in the thread.** Reply as you normally would in Teams. These conversational replies won't accidentally trigger the workflow.

---

## Questions or Issues

Contact **[engineering admin / flow owner]** for anything that looks wrong with an assessment or if a request gets stuck.
