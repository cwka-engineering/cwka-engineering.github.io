---
layout: default
title: Manufactured Metal Parts & M Jobs
permalink: /tools/epicor/manufactured-parts-jobs.html
nav_order: 5
parent: Epicor Usage
grand_parent: Tools
corpus_tags: [fe-release]
---

# Manufactured Metal Parts & M Jobs

Standards for creating MT parts, requesting M jobs, and handling 100% metal parent jobs.

> **Related**: [Job Management](/tools/epicor/job-management.html) | [Part Management](/tools/epicor/part-management.html) | [BOM Procedures](/workflows/fabrication-engineer/bom-procedures.html) | [Purchasing Signal Chain](/onboarding/purchasing-signal-chain.html)

## Overview

Any metal fabrication work must live on a dedicated **M job** (format: `Project.M.000`), not on the parent production job. M jobs carry a **Make-to-Job** demand link, giving the Production Report full visibility into manufactured metal work independent of the parent job.

The corresponding Epicor part — the **MT part** — is created by the FE during the design phase, BOM'd to the parent job, and is the output of the M job.

## PA/FE Collaboration

During the **design phase**, the FE and Project Advisor (PA) should work together to:

- Identify all metal parts required within the job scope
- Decide whether each constitutes a **Metal Kit** or a **Repeatable Part** (see below)
- Confirm MT part naming and structure before requesting an M job

This decision should happen before the M job request is submitted — not after.

## MT Part Types

### Metal Kit

A Metal Kit packages all of the metal pieces and subassemblies within a single parent job into one MT part.

- [Production Quantity](/tools/epicor/production-quantity.html) is always **1**
- Belongs to exactly **one** parent job — may not be subdivided or distributed across multiple parents
- Used when the metal content of a job is mixed, irregular, or not individually repeatable

### Repeatable Part

A Repeatable Part represents a single metal piece or subassembly produced in exact duplicates.

- [Production Quantity](/tools/epicor/production-quantity.html) **may be greater than 1**
- Finished MT parts may be distributed to multiple parent jobs
- Use when all instances are geometrically identical with no variation (e.g., a standard bracket or outrigger)

**Deciding between the two:** If every instance is truly identical and a quantity greater than 1 makes sense, use a Repeatable Part. If there is any variation, grouping, or mixed content, use a Metal Kit.

## Standard Workflow

1. Operations or PM requests a new parent job for the project via Teams channel form
2. Master Scheduler builds parent job `1234.567` with operations
3. FE creates MT part `1234.MT.00001` in the Epicor Part Master
4. FE BOMs `1234.MT.00001` to parent job `1234.567`
5. FE requests a new M job for `1234.MT.00001` via Teams channel form
6. Master Scheduler creates M job `1234.M.001` with operations
7. FE BOMs raw metal materials to M job `1234.M.001` and marks **Engineering Complete** to verify quantities
8. PM reviews materials and marks **Ready to Purchase**
9. Purchaser receives purchasing suggestion and orders

## Exception: 100% Metal Parent Jobs

Occasionally a parent job turns out to contain **only** metal operations once the build strategy is approved. In this case:

- Do **not** create a separate MT part and M job. Doing so leaves the parent job as a shell with no labor.
- Metal operations remain on the parent job.
- The parent job retains its **Make-to-Order** demand link (unlike a standard M job, which is Make-to-Job).
- The FE manually overrides the job's output part number to MT format (e.g., `1234.MT.00001`) so the part appears correctly on the Production Report.

## Anti-Patterns

| Pattern | Problem |
|---|---|
| Placing raw metal materials or operations directly on the parent job | Bypasses M job visibility; metal work becomes invisible on the Production Report |
| Creating an individual MT part for every discrete metal piece | Excessive admin overhead; each entry requires individual processing by the Master Scheduler |
| Creating a Metal Kit with Production Quantity > 1 to distribute across multiple parents | Breaks demand logic; creates incorrect signals across jobs |
| Creating an MT part + M job for a 100% metal parent job | Parent becomes a no-labor shell; use the output part number override instead |
