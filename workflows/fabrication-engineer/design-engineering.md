---
layout: default
title: Design Engineering (DE) Phase
permalink: /workflows/fabrication-engineer/design-engineering.html
parent: Fabrication Engineer (FE)
grand_parent: Workflows
nav_order: 2
---

# Design Engineering (DE) Phase

The DE phase converts approximate geometries into precise geometries and develops build strategies and assembly details before fabrication engineering begins.

> **Related Documents**: [Getting Started](/workflows/fabrication-engineer/getting-started.html) | [Layer Organization](/standards/layer-organization/) | [Project Delivery Overview](/overview/project-delivery.html)

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
7. **Transition to FE** — Once the design is confirmed, move to the [FE Modeling](/workflows/fabrication-engineer/toolkit-setup.html) phase, working on the 03_CWKA-FE layers with proper Epicor part numbers.

## Key Principles

- **Use nominal dimensions during DE** — Field verification comes later. Get the design intent correct first.
- **Placeholder layers are temporary** — They must be replaced with proper Epicor material layers before release.
- **SKs are not submittal documents** — They are informal feedback tools. Do not include them in the submission set.
- **Document build strategies early** — Decisions made during DE affect everything downstream. Surface questions and alternatives before committing to fabrication-level modeling.

## Next Steps
- [Engineering Toolkit Setup](/workflows/fabrication-engineer/toolkit-setup.html)
- [Epicor Interaction](/workflows/fabrication-engineer/epicor-interaction.html)
