---
layout: default
title: Overage, Extras & Process Waste
permalink: /workflows/fabrication-engineer/overage-and-extras.html
nav_order: 14
parent: Fabrication Engineer (FE)
grand_parent: Workflows
---

# Overage, Extras & Process Waste

Guidance on BOM quantity philosophy: what to include, what to omit, and who owns what.

> **Related**: [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html) | [Manufactured Metal Parts & M Jobs](/tools/epicor/manufactured-parts-jobs.html) | [Inventory Jobs](/tools/epicor/inventory-jobs.html)

## The Core Distinction

Three concepts are often conflated but must be kept separate:

| Concept | Definition | Who handles it | Where it lives |
|---|---|---|---|
| **Process waste** | Raw material consumed as a direct result of the build strategy — not the finished part volume, but the minimum material actually needed to execute the build | FE | Job BOM (parent or MFG) |
| **Overage** | Additional raw material ordered beyond minimum need — to offset quality risk, provide attic stock, or account for anticipated loss or damage | PM / Purchasing | INV job, at project level |
| **Extras** | Additional finished manufactured parts beyond what the design demands | FE (via parent job BOM) | Parent job BOM |

---

## Process Waste: BOM the Minimum Required

The rule for BOM quantities on any job — parent or MFG — is:

> **BOM the minimum amount of material actually necessary to make the part using the build strategy being employed.**

This is not the net volume of the finished part. It is the minimum raw material required given the physical constraints of the build — blank dimensions, nesting limits, fixturing geometry, or stock sizes.

### Examples

**Plywood nesting** *(parent job)*
An FE designs a carcass whose plywood parts total 96 sq ft. Due to part geometry, they cannot physically nest onto fewer than 5 sheets (160 sq ft). The BOM should show **5 sheets** — not 96 sq ft converted to sheets. The extra 64 sq ft is not overage; it is an unavoidable consequence of nesting.

**MDF thermoforming mold** *(MFG job)*
The finished part volume is equivalent to 3 sheets of 4×8×1" MDF (8 cu ft). However, the geometry requires a correctly oversized wedding-cake stack for fixturing, consuming the equivalent of 4.5 sheets (12 cu ft) of cut material. The BOM should show **4.5 sheets of 1" MDF**.

**Solid lumber profiles** *(MFG job)*
An FE designs 20 profiles at 4" × ¾" × 40". The finished profile volume is 16.66 BF. However, the minimum available stock is 4/4" × 6" min width × 8' length. To actually cut 20 pieces at 40", you must purchase **10 boards minimum** — 40 BF total. The MFG job BOM should show **40 BF**. The corresponding parent job should BOM the MT or WC part at the exact quantity present in the design (in this case, 20 pieces at their finished linear footage — not 40 BF).

The 23 BF difference between finished volume and blank requirement is process waste. It is not overage.

---

## Overage: Not the Engineer's Call

Do not add overage to BOM quantities on manufacturing jobs. This includes:

- Scrap percentages intended to offset material quality or consistency issues
- Attic stock in case of downstream errors or damage
- Any buffer beyond the minimum required for the build strategy

**Why:** Overage decisions are made by PM and Purchasing at the project level, after all engineering BOMs are summed. The logic: on large projects, multiple engineers BOM to overlapping jobs. If each engineer independently adds their own scrap buffer, the overages compound and become unmanageable. When engineers BOM net quantities, PM can see the true project-level demand, then apply a single informed overage factor based on material cost, lead time, and supply risk — not one job at a time.

Overage for INV-class materials (SG, SS, SL, IM) is applied by the PM on the project's [Inventory Job](/tools/epicor/inventory-jobs.html).

> **Note:** Scrap percentages used in the Auto-BOM toolkit are a first-pass approximation of process waste — material lost to cuts, kerfs, and nesting — and are appropriate to apply. This is distinct from overage. See [Takeoffs](/workflows/fabrication-engineer/takeoffs.html).

### Overage for Manufactured Parts
{: #overage-manufactured-parts}

The rule above — PM handles overage at the project level — applies to **purchased raw materials**. Manufactured parts (WC, MT, and other MFG job outputs) follow a different rule:

**No one can retroactively adjust the quantity of a manufactured part after its job is complete.** Once a WC or M job closes, the PM cannot increase the output quantity the way they can add a row to an INV job. If additional quantity turns out to be needed, a new `.1` job must be requested — see [Increasing Quantity on a Completed Manufactured Part Job](/workflows/fabrication-engineer/bom-procedures.html#how-to-increase-mfg-part-quantity).

The practical consequence: **coordinate with production and PE on overage quantity before the original job is released.** If field installation typically requires a spare, or if material consistency risk suggests running extra, that number needs to be in the original BOM. The engineer is the only person positioned to make this call at the right time, in consultation with the relevant parties.

---

## Extras: Capture as Demand, Not a Drawing Override

If additional finished manufactured parts are needed beyond what the design requires — for example, spare parts requested for field installation — these must be captured as real demand in Epicor, not as a manually overridden production quantity on the drawing or the job.

**Correct approach:** Add the additional quantity to the BOM of the appropriate parent job(s). The manufacturing job's production quantity will then reflect total system demand accurately.

**Do not:** Override the auto-populated production quantity on the drawing or in Job Entry to exceed system demand. Discrepancies between drawing quantity and system demand cause confusion at production and PE review.

See [Manufactured Metal Parts & M Jobs](/tools/epicor/manufactured-parts-jobs.html) for the MT/M job workflow context.
