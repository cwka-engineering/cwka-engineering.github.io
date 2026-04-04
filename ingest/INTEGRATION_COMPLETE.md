# Ingest integration log

Historical record of content processed from `ingest/` into the published wiki.

## 2026-03 — Wiki enrichment (`ingest/docs` batch)

**Source archive**: [`ingest/archive/2026-03-wiki-integration/`](archive/2026-03-wiki-integration/) (original DOCX/PDF files).

| Source | Integrated into |
| ------ | ----------------- |
| FE to PE Release Checklist (2026-02-02) | [workflows/fe-to-pe-release.md](../workflows/fe-to-pe-release.md); pointers in [pe-release-prep.md](../workflows/fabrication-engineer/pe-release-prep.md), [job-management.md](../tools/epicor/job-management.md), [glossary.md](../overview/glossary.md), [rhino-drafting/index.md](../standards/rhino-drafting/index.md), [layer-organization/index.md](../standards/layer-organization/index.md), [folder-structure.md](../standards/folder-structure.md), FE/PE workflow index pages |
| Engineer Progression Framework | [overview/engineer-progression-framework.md](../overview/engineer-progression-framework.md); linked from [engineering-roles.md](../overview/engineering-roles.md), [overview/index.md](../overview/index.md), [onboarding-quick-start.md](../overview/onboarding-quick-start.md), [index.md](../index.md), [glossary.md](../overview/glossary.md) |
| FE I/II and PE I/II job descriptions | Summarized as **Engineer I / Engineer II** subsections in [engineering-roles.md](../overview/engineering-roles.md) (full JDs remain with HR) |
| Engineering Information Flow (DRAFT) PDF | [overview/project-delivery.md](../overview/project-delivery.md) — section **Information and artifact flow (DRAFT)** (Mermaid); link from [engineering-assistant.md](../workflows/engineering-assistant.md) |

## 2026-04 — Transcript batch (`ingest/transcripts`)

**Source files** (plaintext alongside `.docx` in [`transcripts/`](transcripts/)):

| Source | Integrated into |
| ------ | ----------------- |
| Engineering Department All Hands (2024-06-14) | [workflows/fabrication-engineer/toolkit/drafting.md](../workflows/fabrication-engineer/toolkit/drafting.md) (Epicor readout, publish, roles, cache); cross-links from [tools/epicor/index.md](../tools/epicor/index.md), [tools/epicor/dashboards.md](../tools/epicor/dashboards.md); [overview/glossary.md](../overview/glossary.md) (Engineering Toolkit — Drafting/Modeling); [workflows/fabrication-engineer/toolkit/index.md](../workflows/fabrication-engineer/toolkit/index.md) (Synapse RCP, Drafting vs Modeling) |
| Rhino 8 Kickoff Pt I | [overview/onboarding-quick-start.md](../overview/onboarding-quick-start.md) (Rhino workstation); [standards/rhino-drafting/layout-structure.md](../standards/rhino-drafting/layout-structure.md) & [workflows/fabrication-engineer/getting-started.md](../workflows/fabrication-engineer/getting-started.md) (Tabloid-only template policy) |
| Rhino 8 Kickoff Pt II | [workflows/fabrication-engineer/toolkit/modeling.md](../workflows/fabrication-engineer/toolkit/modeling.md) (shared hardware library via McMaster); [toolkit/index.md](../workflows/fabrication-engineer/toolkit/index.md) (Drafting vs Modeling) |

**Note**: Rhino drafting standards pages ([display-modes](/standards/rhino-drafting/display-modes.html), [hatches](/standards/rhino-drafting/hatches.html), [sections-clipping](/standards/rhino-drafting/sections-clipping.html), etc.) were intentionally **not** edited where transcript wording conflicted with published standards.

## 2026-04 — Curriculum v3 + "How Do I" Master List integration

**Sources**: Onboarding Curriculum v3 (14 chapters, 10 appendices) and "How Do I…?" Master Workflow List (108 entries, 13 categories). Both decomposed into atomic wiki topics.

### New pages created (22)

| File | Title |
|------|-------|
| `standards/reference-tables/index.md` | Reference Tables (section parent) |
| `standards/reference-tables/file-naming-conventions.md` | File Naming Conventions |
| `standards/reference-tables/model-cleanup-commands.md` | Model Cleanup Commands |
| `standards/reference-tables/material-tag-vocabulary.md` | Material Tag Vocabulary |
| `standards/reference-tables/lay-up-formulas.md` | Lay-Up Formulas |
| `standards/reference-tables/sheet-sizes.md` | Actual Sheet Sizes & Nesting |
| `standards/reference-tables/cnc-drill-sizes.md` | CNC Drill Sizes by Site |
| `standards/rhino-drafting/annotation-styles-reference.md` | Annotation Styles Reference |
| `standards/rhino-drafting/cover-sheet-common-pages.md` | Cover Sheet & Common Pages |
| `overview/quick-reference.md` | Overview Quick Reference |
| `overview/scheduling-chain.md` | Scheduling Chain |
| `overview/purchasing-signal-chain.md` | Purchasing Signal Chain |
| `workflows/quick-reference.md` | Workflows Quick Reference |
| `workflows/fabrication-engineer/design-engineering.md` | Design Engineering (DE) Phase |
| `workflows/fabrication-engineer/solid-wood-components.md` | Solid Wood Components (WC) |
| `workflows/fabrication-engineer/submittal-review.md` | Submittal Review Cycle |
| `workflows/fabrication-engineer/material-transmittal.md` | Material Transmittal Log |
| `workflows/fabrication-engineer/bom-procedures.md` | BOM Procedures & Validation |
| `workflows/computational-fabrication.md` | Computational Fabrication |
| `tools/epicor/multi-site-operations.md` | Multi-Site Operations |
| `standards/quick-reference.md` | Standards Quick Reference |
| `tools/quick-reference.md` | Tools Quick Reference |

### Existing pages significantly expanded (~17)

Glossary, folder-structure, standard-layers, material-modeling, codes-and-tags, onboarding-quick-start, getting-started, toolkit/index, toolkit/drafting, toolkit/modeling, approvals-process, time-entry, part-naming, shipping-components, takeoffs, fe-to-pe-release, layout-structure.

### Existing pages with How Do I anchors added (~15)

sections-clipping, hatches, details, display-modes, printing, annotations, modeling-techniques, PE setup, PE processing, PE deliverables, epicor/index, epicor/dashboards.

### Section landing pages updated (7)

overview/index, workflows/fabrication-engineer/index, workflows.md, standards.md, standards/rhino-drafting/index, tools/epicor/index, index.md (homepage).

### Cross-cutting additions

- **Suggested Reading Order** (Week 1–5+ structured path) added to onboarding-quick-start.md
- **Quick Reference** section added to homepage (index.md)
- 108 "How Do I" entries absorbed as anchored subsections across ~30 pages
- 4 section-level Quick Reference index pages with deep-link tables
