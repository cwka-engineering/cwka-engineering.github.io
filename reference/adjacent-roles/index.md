---
layout: default
title: Adjacent Roles & Interfaces
permalink: /reference/adjacent-roles/
parent: Reference
nav_order: 8
has_children: true
---

# Adjacent Roles & Interfaces

Engineering's work depends on people outside the department — the Master Scheduler, Project Managers, Production Managers and Job Captains, and others. This page collects what those roles do and, specifically, where their work interfaces with Engineering's. It is **not** full documentation of their jobs — that belongs to their own departments — just the touchpoints engineers need to understand.

## Master Scheduler
{: #master-scheduler}

*Operations department.* Owns creating and scheduling Epicor jobs — primary, sample, and manufactured-part (WC/MT) jobs — plus the department's Epicor materials database and new-part-request intake. A dedicated Engineering Assistant (EA) hire is not expected going forward; most of that historical scope is now the Master Scheduler's.

**Where this touches Engineering:**
- BOM everything to the primary job(s) before requesting a WC/MT job — the Master Scheduler sums demand across every BOM'd job when creating it. See [Solid Wood Components — Requesting the WC Job](/workflows/fabrication-engineer/solid-wood-components.html#how-to-request-wc-job).
- New Epicor parts are requested through the Master Scheduler via the Part Requests Teams workflow. See [Part Requests — Scheduler Guide](/tools/releases-and-requests/part-requests/scheduler-guide.html).
- Contact the Master Scheduler for job-assignment or part-number issues. See [FE Troubleshooting](/workflows/fabrication-engineer/troubleshooting.html), [Epicor Troubleshooting](/tools/epicor/troubleshooting.html).

For the Master Scheduler's own Epicor procedures (job creation and scheduling mechanics — useful if you need to understand what happens after you submit a request, not something engineers perform themselves), see [Master Scheduler Procedures](/reference/adjacent-roles/master-scheduler.html).

## Project Manager (PM)
{: #project-manager}

*Project Management department.* "Manages project coordination and client communication" ([Glossary](/reference/glossary.html)). The PM is Engineering's primary interface to the client/architect and to Purchasing/Operations on schedule and cost.

**Where this touches Engineering:**
- **Material Transmittal (TRA)**: The PM owns and maintains the TRA log. Engineers notify the PM of new BOM'd materials; they don't add TRA entries directly. See [Material Transmittal](/workflows/fabrication-engineer/material-transmittal.html).
- **Submittals, RFIs, and redlines**: The PM reviews submittals before the PA, submits the clean package to the client, and is the channel for formal RFIs and client communication — engineers don't contact the architect directly. See [Submittal Review](/workflows/fabrication-engineer/submittal-review.html).
- **Milestone schedule**: The PM owns the project's Milestone Schedule; the Lead Engineer keeps the PM's view of engineering status current. See [Getting Started](/workflows/fabrication-engineer/getting-started.html), [Lead Engineer Responsibilities](/onboarding/lead-engineer.html).
- **Overage, extras, and purchasing**: Overage decisions are a PM/Purchasing call at the project INV job level, not FE's. See [Overage, Extras & Process Waste](/workflows/fabrication-engineer/overage-and-extras.html).
- **INV jobs**: The PM ultimately owns the INV job — decides who populates it (self or Lead Engineer) and when to purchase, in partnership with the Lead Engineer. See [Inventory Jobs](/tools/epicor/inventory-jobs.html).
- **Truck / ship dates**: The PM creates truck entries in Epicor to establish ship dates. See [Scheduling Chain](/onboarding/scheduling-chain.html).
- **Change orders**: The PM evaluates scope-expansion signals and initiates a PCO; Engineering proceeds with changed scope only after explicit PM direction.

## Production Manager / Job Captain
{: #production-manager-job-captain}

*Production department.* Documentation on these titles is currently thin in this wiki — both appear only as liaison touchpoints, not as fully scoped roles.

**Where this touches Engineering:**
- The Managing Production Engineer maintains active engagement with Job Captains and Production Managers at both sites so floor issues feed back into PE workflow improvements. See [Engineering Leadership](/onboarding/engineering-roles.html#engineering-leadership).
- The Lead Engineer maintains shop-floor engagement with Job Captains and production management staff during fabrication, resolving engineering issues surfaced during assembly and surfacing recurring fabrication issues back to the engineering team. See [Lead Engineer Responsibilities](/onboarding/lead-engineer.html).
- For complex manufactured parts, the Production Manager is one of the parties consulted when setting up job operations. See [Master Scheduler Procedures](/reference/adjacent-roles/master-scheduler.html#manufacturing-job-creation-wood-components---wc-and-metal-components---mt).
