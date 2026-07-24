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

> **Related**: [Part Naming](/workflows/fabrication-engineer/part-naming.html) | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html) | [Part Management](/tools/epicor/part-management.html) | [Job Management](/tools/epicor/job-management.html)

## What Is a WC, Conceptually?
{: #what-is-a-wc}

Think of a WC like ordering a finished-size solid-lumber profile from a mill — except the mill is in-house. The output is a quantity of a finished profile (e.g., white oak rift-cut S4S 2.5"×6.5", or a specific crown moulding profile) that you then use as **raw material** to make parts in your design. In Rhino it becomes a material layer (`CWKA_FE::MFG::WC::…`) that you cut a variety of parts from, which production manufactures out of the S4S stock or moulding.

The simple, dominant case: order linear feet of a specified solid-wood profile from the in-house mill, then use it as raw material for the parts you're actually designing.

## What Qualifies as a WC?
{: #how-to-determine-wc}

Quick fallback test: a WC part is any solid wood piece that is **NOT** poplar blocking under 100 linear feet.

**If you have less than 100 LF of poplar blocking**, it can be released with the primary job and PE will produce a hardwood cut list.

**Standard blocking:** Two standard sizes for poplar blocking (**7/8" x 7/8"** and **1.5" x 1.5"**) are kept on the shelf as shop supply. They are pulled as needed by the shop and do **NOT** need to be BOM'd. Whenever possible, use a standard blocking size. Minimize different sizes — each new WC part requires its own drawing.

**When NOT to use a WC:** A part that requires unique machining and has no repeatability — a one-off custom shape, not a run of identical pieces — is generally not a WC, even if it's solid wood. Model it directly with the parent job instead, oversized as needed so it can be cut to fit at the bench. WC nomenclature exists to capture repeatable production runs and scheduling benefit; a unique one-off gets neither, so tagging it as a WC is just overhead. See [Recognized Exceptions](#recognized-exceptions) for the blanks case, where repeatability is the deciding factor.

## Recognized Exceptions
{: #recognized-exceptions}

WC nomenclature is sometimes deliberately repurposed to solve other material- or part-tracking problems — for example, tying WC naming into the laser-engraving process on a project that needed to track engraved parts. This is a legitimate, recognized use, not a tribal workaround, but it's an exception to the mental model above, not the norm.

**Standing exception — buyouts:** Buyout drawer boxes and buyout cabinet doors are handled as WCs, regardless of whether they fit the "in-house mill" mental model. This is a longstanding rule, not obvious from the threshold test alone.

**Standing exception — glued-up blanks:** A quantity of solid wood glued up into a stack and then carved/machined into a shape (e.g., several identical guardrail caps cut from a shared glue-up) is a legitimate WC use, distinct from the cross-section/linear-footage case — the glue-up is produced by the mill as an intermediary step, ahead of the parent job, then final-machined afterward.

**The deciding factor is repeatability, not the presence of machining.** If the blank is repeated across multiple identical parts, a WC makes sense — it lets the mill produce the glue-up on its own schedule, ahead of the parent job. If it's a one-off, unique glue-up or shape with no repeatability, it should **not** be a WC: model it directly with the parent job instead (oversized as needed so it can be cut to fit at the bench). Producing a one-off custom shape as a WC provides no scheduling benefit and is generally not worth the overhead.

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
3. Insert the **WC Purchase Information** table — a Rhino block (in the block manager under the WC material block category), not a drawing-layout text field. After placing it, edit its fields via **Properties → Attribute User Text** on the block:
   - **Total Linear Footage Required** — the sum of everything in the length rows below, and it must also match the actual Epicor demand total across every primary job this WC part is BOM'd to. **This field is not calculated** — keep it in sync manually.
   - **Solid lumber part number** — the raw stock part used to produce the finished profile.
   - **Range of lengths** — the specific lengths needed (e.g., 8', 16'), one row per length.
   - **Purchasing note** — additional comments for the purchasing team.

   The table currently supports a limited number of length rows. If your part needs more, contact your Lead or the toolkit team to have it expanded — don't just leave lengths off.

   Despite the "Purchase Information" name, this table applies whether the material is being purchased externally **or** produced by the in-house mill — treat the in-house mill the same as an external vendor you're placing an order with.

   The table ships **hidden** on the standard template. If you don't need it, leave its layer hidden or delete the block rather than leaving a stale, unfilled table on the drawing.

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

**How the job gets created:** The Master Scheduler works through Epicor, finds every primary job the part is BOM'd to, sums the linear footage demand across all of them, and creates a single WC job sized to that total. This is why every primary job needs to be BOM'd before you submit the request — a job requested before all the demand is BOM'd will undersize the total.

## Supplying Raw Material to the WC Job
{: #how-to-supply-wc-raw-material}

Once the WC job itself exists, the engineer still needs to supply the raw material it will be built from — this is separate from BOM'ing the finished WC part to the primary job(s) above. Go into the WC job and BOM the **volumetric board footage** of solid lumber needed to produce the finished profile. This is a unit conversion: the WC part itself is tracked in linear footage of finished profile, but the raw stock going into the WC job is rough solid lumber, tracked in board footage. Don't skip this step or assume it's covered by the primary-job BOM — it isn't.

## Releasing a WC Job
{: #how-to-release-wc-job}

1. Place the WC drawing in a job-specific folder on Box.
2. Check the job **Released** in Epicor.
3. Post the link in the **CO Production Eng** chat.

WC parts are internal jobs and **do not require shipping components**.

## Handling Quantity Changes
{: #how-to-handle-wc-quantity-change}

If the quantity of a WC part changes on the primary job **after** you have requested a WC job, it is **your responsibility** as the engineer to inform the Production Planner directly. If you do not, the change will be missed.
