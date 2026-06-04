---
layout: default
title: Solid Wood Components (WC)
permalink: /workflows/fabrication-engineer/solid-wood-components.html
parent: Fabrication Engineer (FE)
grand_parent: Workflows
nav_order: 11
corpus_tags: [fe-submittal]
---

# Solid Wood Components (WC)

Complete workflow for creating, BOM'ing, and releasing solid wood component (WC) parts.

> **Related Documents**: [Part Naming](/workflows/fabrication-engineer/part-naming.html) | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html) | [Part Management](/tools/epicor/part-management.html) | [Job Management](/tools/epicor/job-management.html)

## What Qualifies as a WC?
{: #how-to-determine-wc}

A WC part is any solid wood piece that is **NOT** poplar blocking under 100 linear feet.

**If you have less than 100 LF of poplar blocking**, it can be released with the primary job and PE will produce a hardwood cut list.

**Standard blocking:** Two standard sizes for poplar blocking (**7/8" x 7/8"** and **1.5" x 1.5"**) are kept on the shelf as shop supply. They are pulled as needed by the shop and do **NOT** need to be BOM'd. Whenever possible, use a standard blocking size. Minimize different sizes — each new WC part requires its own drawing.

## Creating the Part in Epicor
{: #how-to-create-wc-part}

1. Look up the next available number in the WC category for your project. Part numbers are first-come, first-served.
2. **Create the part in Epicor before labeling anything in your model.** Part format: `Project.WC.00000` (five trailing digits).
3. Set the **UOM**:
   - **EA** — When the part has a defined length (e.g., 2" x 2" x 8' trim — BOM'ing 12 EA means you need 96 LF)
   - **LF** — When the part has a range of lengths (e.g., a 4" x 6" crown profile). You must add the range of lengths to the BOM comments.

**Epicor gotcha:** The UOM defaults to Counted Units (EA only). To select LF, click the dropdown and **switch to the Length Category**.

## Determining if a Knife is Required
{: #how-to-determine-knife}

| Profile Type | Knife Required? |
|-------------|----------------|
| Simple routes, S4S, or small radius edges | No |
| Intricate curves or complex edges | Yes |

If uncertain, check with production. Knives take approximately **one week** to fabricate and require a `GM.TO.XXXXX` part number plus an approved profile. Order the knife before the profile needs to be run.

## Creating a WC Drawing
{: #how-to-create-wc-drawing}

1. Open the **WC Template** (available on Box — see [Onboarding Quick Start](/onboarding/quick-start.html)).
2. Create a **one-page drawing** showing a section/profile of the part centered at full scale. If the part is too large for full scale, consult your lead.
3. Fill out the **WC PURCHASE INFORMATION** table in the bottom-right corner (editable through Properties → Layout User Text).

## BOM'ing a WC Part
{: #how-to-bom-wc-part}

1. BOM the WC part to the primary job in Job Entry.
2. Verify the quantity.
3. Determine realistic solid lumber order lengths (contact Purchasing).
4. Add length comments to the BOM material:
   - **Check** Purchase Direct → this un-grays the comments section
   - **Add** the length range to comments
   - **Uncheck** Purchase Direct
   - **Check** Make Direct

**Make Direct** allows an internal job to be created. **Purchase Direct should never remain checked** for WC parts.

## Requesting the WC Job
{: #how-to-request-wc-job}

1. Go to the **CWKA Forms Team** in Microsoft Teams.
2. Navigate to **Fill | Job Requests**.
3. Select **"Yes"** for "Is this a custom part that needs to be made into a job?"
4. Submit the request.

**Key rules:**
- WC jobs are **one-to-one** (one part to one job)
- One WC part **can** be BOM'd to multiple primary jobs — only one WC job is created for the total quantity across all primary jobs
- Have **all** your primary jobs that use the same WC part BOM'd **before** requesting the job

## Releasing a WC Job
{: #how-to-release-wc-job}

1. Place the WC drawing in a job-specific folder on Box.
2. Check the job **Released** in Epicor.
3. Post the link in the **CO Production Eng** chat.

WC parts are internal jobs and **do not require shipping components**.

## Handling Quantity Changes
{: #how-to-handle-wc-quantity-change}

If the quantity of a WC part changes on the primary job **after** you have requested a WC job, it is **your responsibility** as the engineer to inform the Production Planner directly. If you do not, the change will be missed.
