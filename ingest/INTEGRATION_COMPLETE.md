# Ingest integration log

Historical record of content processed from `ingest/` into the published wiki.

## 2026-07 — Management layer job descriptions, LONG versions (`ingest/docs` batch)

**Source archive**: added to [`ingest/archive/2026-07-management-roles/`](archive/2026-07-management-roles/) alongside the SHORT versions below. The SHORT versions were what was actually shared with candidates alongside offer letters; the LONG versions are the source they were distilled from, reviewed here for additional nuance.

**New facts added to [onboarding/engineering-roles.md](../onboarding/engineering-roles.html)**:
- A standing **weekly three-way strategy call** between the Director, Managing FE, and Managing PE.
- Director oversight detail: engages directly with engineering work only as a teaching/capability-building activity, not as a deliverable; conducts annual reviews "in partnership with the managing engineers"; maintains a direct relationship with a small number of senior engineers who take on **012 ENG Dept Improvement** work as departmental technical contributors — an informal, individually-assigned relationship, **not** a formal title (this 012 tie-in didn't exist anywhere in the wiki before). Also cross-referenced from [tools/time-entry.md](../tools/time-entry.html)'s 012 code description.
- Managing FE: explicit confirmation the role does **not** pre-approve individual releases (~70% diagnostic-automated, remainder covered by the Lead Engineer's informal pre-review).
- Managing PE: PE intake QC is performed by individual PEs as routine practice, not a management sign-off — cross-referenced from [production-engineer/processing.md](../workflows/production-engineer/processing.html), which already documented this checklist. Enriched the fix-release-inform vs. unrelease-inform-halt description with the actual tradeoff (upstream friction vs. downstream cost) — still no documented criteria for choosing between them.

**Corrected after initial publish**: the Outsource Program Manager was first added with a note describing it as planned-but-not-rolled-out; per follow-up from the requester, omitted entirely instead — the role isn't officially rolled out, so it shouldn't be mentioned in the wiki yet at all, not even as "planned." Removed from engineering-roles.md and `_data/departments.yml`.

**Incidental fix**: [production-engineer/processing.md](../workflows/production-engineer/processing.html) had a broken scribes anchor (`/standards/layer-organization/#scribes`, a page section with no such anchor) — corrected to the real target.

**Deliberately excluded — flagged to requester, not added to the wiki**:
- The Wrike/Dash/Epicor scheduling-hub integration architecture (4 "legs," 2 live/1 in-progress/1 deferred) — this is time-bound project status, not stable role/process definition, consistent with how "Current Strategic Priorities" sections were excluded from the SHORT-version integration. Flagged as valuable institutional knowledge with no current home in the wiki (a systems-roadmap page, if one is ever wanted).
- **"Engineering Consultants" embedded in the FE workflow**, whom the Managing FE has "schedule coordination responsibility" for — this term appears nowhere else in the wiki and isn't explained by either JD. Not guessed at; flagged as an undefined term to clarify with the requester.
- Promotion-process final authority in engineer-progression-framework.md — left as-is beyond the earlier 1:1 fix; the LONG version's "annual reviews... in partnership with the managing engineers" describes the review cycle, not the separate self-initiated promotion-proposal process, so the ambiguity flagged in the SHORT-version pass still stands.

## 2026-07 — Management layer job descriptions (`ingest/docs` batch)

**Source archive**: [`ingest/archive/2026-07-management-roles/`](archive/2026-07-management-roles/).

| Source | Integrated into |
| ------ | ----------------- |
| Director of Engineering & Computational Design (2026-06-30) | Summarized in [onboarding/engineering-roles.md](../onboarding/engineering-roles.html) (new **Engineering Leadership** section); role added to the interactive org map ([`_data/departments.yml`](../_data/departments.yml)) |
| Managing Fabrication Engineer (2026-06-30) | Same as above |
| Managing Production Engineer (2026-06-30) | Same as above |

**Stale-fact fixes surfaced by these JDs**: the new management layer's responsibilities contradicted several already-published facts that pre-dated it. Corrected: [getting-started.md](../workflows/fabrication-engineer/getting-started.html) (FE load balancing owner), [engineer-progression-framework.md](../onboarding/engineer-progression-framework.html) (who conducts 1:1s), [fabrication-engineer/troubleshooting.md](../workflows/fabrication-engineer/troubleshooting.html) (process-question escalation), and [fe-to-pe-release.md](../workflows/fe-to-pe-release.html) (Fixed Quantity exception approval). Left untouched: `troubleshooting.md`'s "Toolkit Issues → Engineering Director" line, since Toolkit/software ownership explicitly stays with the Director per the new JD.

**Deliberately not migrated / flagged as gaps**: no JD was provided for the **Outsource Program Manager**, a role the Director JD describes as planned to report alongside the Managing FE/PE but not yet formally rolled out — noted in engineering-roles.md as a planned-not-active role rather than a current position. The Managing PE JD references a specific **fix-release-inform vs. unrelease-inform-halt** policy for FE release errors, owned by that role — its actual criteria aren't documented anywhere in the wiki; noted as a gap rather than guessed at. The promotion-process steps in engineer-progression-framework.md (formal proposal to / decision by "the Director") were left as-is beyond the 1:1 fix — the JDs don't clearly state that final promotion-decision authority moved to the Managing FE/PE.

## 2026-07 — Weekly time approval walkthrough (`ingest/docs` batch)

**Source archive**: [`ingest/archive/2026-07-time-approval/`](archive/2026-07-time-approval/).

| Source | Integrated into |
| ------ | ----------------- |
| Weekly Time Approval — Walkthrough (training session w/ Kevin Atchley, 2026-07-13) | New page [tools/time-entry/weekly-approval.md](../tools/time-entry/weekly-approval.html); cross-linked from [tools/time-entry.md](../tools/time-entry.html) |

Source was already in wiki-ready markdown; migrated near-verbatim (added explicit anchor ids to each numbered step, dropped the emoji quirk-markers to match site convention). No stale facts elsewhere in the wiki referenced this process, since no approver-side documentation existed previously.

## 2026-07 — Casework construction standards (`ingest/docs` batch)

**Source archive**: [`ingest/archive/2026-07-casework-standards/`](archive/2026-07-casework-standards/).

New nav section: **Reference > [Construction Standards](../reference/construction-standards/) > [Casework](../reference/construction-standards/casework/)**.

| Source | Integrated into |
| ------ | ----------------- |
| `CASEWORK_CONSTRUCTION_MANUAL_v2.md` (§1–2, universal carcase/32mm rules) | [carcase-and-line-bore.md](../reference/construction-standards/casework/carcase-and-line-bore.html) |
| `CASEWORK_CONSTRUCTION_MANUAL_v2.md` (§3, base cabinets; §10, ladder base) | [base-cabinets.md](../reference/construction-standards/casework/base-cabinets.html) |
| `CASEWORK_CONSTRUCTION_MANUAL_v2.md` (§4, drawers; §9, pencil drawers) | [drawer-construction.md](../reference/construction-standards/casework/drawer-construction.html) |
| `CASEWORK_CONSTRUCTION_MANUAL_v2.md` (§5, upper cabinets) | [upper-cabinets.md](../reference/construction-standards/casework/upper-cabinets.html) |
| `CASEWORK_CONSTRUCTION_MANUAL_v2.md` (§6, tall cabinets) | [tall-cabinets.md](../reference/construction-standards/casework/tall-cabinets.html) |
| `CASEWORK_CONSTRUCTION_MANUAL_v2.md` (§7, fillers) | [fillers.md](../reference/construction-standards/casework/fillers.html) |
| `CASEWORK_CONSTRUCTION_MANUAL_v2.md` (§8.1–8.3, boring specs) | [construction-boring.md](../reference/construction-standards/casework/construction-boring.html) |
| `CASEWORK_CONSTRUCTION_MANUAL_v2.md` (§11–12, critical dims + material thickness) | [quick-reference.md](../reference/construction-standards/casework/quick-reference.html) |
| `Standard Casework Names and descriptions.txt` | [type-codes.md](../reference/construction-standards/casework/type-codes.html) |

Cross-linked from [awi-standards.md](../reference/awi-standards.html), [reference/index.md](../reference/index.html), [part-naming.md](../workflows/fabrication-engineer/part-naming.html), and [design-engineering.md](../workflows/fabrication-engineer/design-engineering.html).

**Deliberately not migrated**: §8.4 ("Pattern Layout" narrative) — the source manual itself flags this subsection as unreliable ("THIS SECTION NEEDS TO BE REWRITTEN OR DELETED") and instructs against trusting it; omitted rather than publishing known-bad content.

The source manual's provenance detail (which facts were drawing-confirmed vs. field-verified vs. still open, specific drawing numbers, v1→v2 revision history) was deliberately left out of the published pages — noise for engineers and the wiki assistant alike. Only the load-bearing facts were kept, stated plainly. The three items that were open in the source manual (BCTRASH1D/BCTRASHPO → BCT1D/BCT_PO rename, UC2D_WD → UC2D_ND divider-convention reversal, upper filler depth offset removal) were confirmed intentional by the requester during integration; each is documented as a plain **Note** on its page pointing out that the drawing/naming source hasn't been updated to match yet.

**Corpus scope**: tagged `corpus_tags: [general, fe-submittal]` — answerable by both the public Wiki Assistant (`/api/chat`) and the internal FE diagnostic/summarize tools. This is a deliberate departure from sibling standards pages (AWI, ANSI, Rhino Drafting, Layer Organization are all `fe-submittal`-only, excluded from the general corpus) per explicit request that this section be "rich for the wiki assistant."

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
