---
layout: default
title: Design Engineering (DE) Phase
permalink: /workflows/fabrication-engineer/design-engineering.html
parent: Fabrication Engineer (FE)
grand_parent: Workflows
nav_order: 2
corpus_tags: [fe-submittal]
---

# Design Engineering (DE) Phase

The DE phase converts approximate geometries into precise geometries and develops build strategies and assembly details before fabrication engineering begins.

> **Related**: [Getting Started](/workflows/fabrication-engineer/getting-started.html) | [Layer Organization](/standards/layer-organization/) | [Project Delivery Overview](/onboarding/project-delivery.html) | [Casework Construction Standards](/reference/construction-standards/casework/)

## Purpose

Design Engineering bridges the gap between pre-construction estimates and fabrication-ready models. During this phase, engineers:
- Convert client-provided approximate geometry into precise, dimensionally accurate geometry
- Develop build strategies and assembly details
- Create preliminary SKs for client review and structural consultation
- Use nominal dimensions (before contract award / field verification)

## Layer Usage

All DE work lives on the **02_CWKA-DE** layer:
- **CON** — Construction/guide geometry (reference curves, surfaces). Not for printing.
- **PUR** — Purchased raw materials organized by Epicor class, using **placeholder tags** (e.g., MDF1, SG2) when part numbers are not yet determined.

Placeholder layers are acceptable during DE — they will be replaced with proper Epicor part numbers via the toolkit during FE modeling.

## Workflow

1. **Receive incoming documents** — Retrieve architect drawings, spec sheets, and coordination documents from `01_INCOMING_Documents/`.
2. **Analyze scope** — Review the working set, identify the scope of your job, and understand the design intent.
3. **Build construction geometry** — Create guide curves, reference surfaces, and construction lines on DE::CON.
4. **Develop precise geometry** — Model materials at nominal dimensions on DE::PUR with placeholder material names.
5. **Create SKs** — Produce sketches for quick feedback from relevant parties (structural, client meetings, pre-submittal).
6. **Develop build strategy** — Determine how assemblies will be fabricated, shipped, and installed. Document decisions.
7. **Transition to FE** — Once the design is confirmed, move to the [FE Modeling](/workflows/fabrication-engineer/toolkit/) phase, working on the 03_CWKA-FE layers with proper Epicor part numbers.

## Key Principles

- **Use nominal dimensions during DE** — Field verification comes later. Get the design intent correct first.
- **Placeholder layers are temporary** — They must be replaced with proper Epicor material layers before release.
- **SKs are not submittal documents** — They are informal feedback tools. Do not include them in the submission set.
- **Document build strategies early** — Decisions made during DE affect everything downstream. Surface questions and alternatives before committing to fabrication-level modeling.

## "Hold to" Dimensions
{: #hold-to-dimensions}

A **"Hold to"** dimension is a working dimension used when field verification has not yet been completed. It represents the best-available value — typically taken from architectural drawings or a preliminary site measurement — that engineering will proceed with until field dimensions are confirmed.

When a dimension is designated "hold to":
- Label it explicitly on drawings (e.g., `3'-4" HOLD TO VIF`) so that reviewers and downstream engineers understand it is subject to revision.
- Flag the corresponding items in your model for update once field verification is complete.
- Coordinate with the PM on when field dimensions will be available, so that design decisions dependent on the hold dimension are not locked in prematurely.

"Hold to" dimensions are common in early-phase work on complex site conditions or renovation scopes where the as-built structure may differ from the architect's drawings. They are distinct from [VIF dimensions](/reference/glossary.html#material-terms), which appear on finalized submittal drawings indicating that a dimension must be verified before fabrication — "Hold to" is an internal engineering notation used during the modeling and drafting process.

## Next Steps
- [Engineering Toolkit Setup](/workflows/fabrication-engineer/toolkit/)
- [Epicor Interaction](/workflows/fabrication-engineer/epicor-interaction.html)
