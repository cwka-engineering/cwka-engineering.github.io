---
layout: default
title: Baseboard & Base Run Modeling
permalink: /reference/construction-standards/casework/baseboard.html
parent: Casework
grand_parent: Construction Standards
nav_order: 7
corpus_tags: [general, fe-submittal]
---

# Baseboard & Base Run Modeling

Baseboard runs against cabinetry as often as it runs against wall panels — this page covers the run itself, independent of what it's attached to. It is not a cabinet-specific detail, and doesn't live under [Base Cabinets](/reference/construction-standards/casework/base-cabinets.html) for that reason.

## Model In Place, One Continuous Part Per Shipping Component

Model the base run **in situ** — where it actually goes, sized to include a scribe allowance at each end and against the floor — as **one continuous part, one shipping component**, for the whole run. Don't split a single run into multiple SC numbers, and don't model individual stick lengths as separate parts unless a documented detail specifically calls for it (e.g. base recessed in a pocket, or a condition resting directly on the floor with no scribe).

**Do not** also create a free-floating representation of full stick lengths elsewhere in model space. PE works from the shipping component list and the drawings — not a detached stick model sitting off to the side. If the in-place run is the single source of truth, there's nothing for a floating stick model to add, and it's an easy way to end up with a part list that doesn't match what's actually modeled.

> **Not the Inventor process:** drawing base in individual "link" lengths is an Inventor-workflow habit that doesn't apply here — it just creates extra FE work for no benefit. The Rhino standard is the single continuous in-place part described above.

## Scribe Allowance

Baseboard needs roughly **1" of scribe** at each end and against the floor. This is a **scribe allowance**, not a material thickness — don't read a "1-inch material" standard into it. See [Scribes](/standards/layer-organization/modeling-techniques.html#how-to-create-scribes) for the general scribing technique.

## Shipping Component Description

In the SC list description field, show the actual linear footage of the run (stick size/count is optional but helpful), e.g. "62 linear feet, 8' sticks." Including the full three dimensions (thickness/height/length) in the description, rather than modeling a separate floating stick part, is the preferred approach.
