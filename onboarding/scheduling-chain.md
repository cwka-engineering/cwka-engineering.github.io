---
layout: default
title: Scheduling Chain
permalink: /onboarding/scheduling-chain.html
parent: Project Delivery Overview
grand_parent: Onboarding
nav_order: 1
---

# Scheduling Chain

How ship dates cascade into engineering deadlines.

> **Related Documents**: [Project Delivery Overview](/onboarding/project-delivery.html) | [Purchasing Signal Chain](/onboarding/purchasing-signal-chain.html) | [FE to PE Release](/workflows/fe-to-pe-release.html)

## The Chain

```
Truck Entry (PM creates ship dates)
  → Sales Order Release (ship date set per line)
    → Job Required By Date
      → Operation Start Dates (including PE start)
```

Each step is back-calculated by Epicor based on operations, resources, hours, and priority.

## What This Means for Engineers

**PE start dates are not arbitrary.** They are derived from truck ship dates through this chain. When you understand this, you understand why late releases have real consequences.

### Truck Entry
The PM creates truck entries in Epicor to establish ship dates. Truck IDs follow format `#### – Truck ##` (e.g., `1091 – Truck 01`). "Need By" is the on-site date; "Ship By" is the departure date.

### Sales Order Release
Ship dates from the Truck Entry flow into Sales Order releases — one release per line item.

### Job Required By Date
Each job inherits its Required By date from the Sales Order release.

### Operation Start Dates
Epicor back-calculates operation start dates from the Required By date, accounting for operation sequence, estimated hours, and resource availability. The **PE start date** is one of these calculated dates.

## Late Release Impact

When an FE releases a job **after** the scheduled PE start date:
- The PE schedule is compressed or pushed
- This may require truck date changes affecting the entire project
- Adjacent jobs on the same truck may be impacted
- Material ordering timelines may be disrupted

If releasing late, **coordinate with adjacent departments** and state in the release post Notes that coordination is underway. See [FE to PE Release — Late Release](/workflows/fe-to-pe-release.html#how-to-handle-late-release).
