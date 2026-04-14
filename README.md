# CWK/DFW Engineering Wiki

This repository contains the Engineering Department wiki, configured for GitHub Pages.

## Viewing the Wiki

The wiki is published via GitHub Pages. Visit the site at: **https://cwka-engineering.github.io**

## Repository Structure

```
├── onboarding/            # Manifesto, roles, quick start, project delivery, scheduling/purchasing chains
├── workflows/             # Step-by-step workflows (FE, PE, EA)
│   ├── fabrication-engineer/
│   ├── production-engineer/
│   └── ...
├── standards/             # Drafting standards, layer organization
│   ├── rhino-drafting/
│   └── layer-organization/
├── reference/             # Glossary, folder structure, reference tables, training videos
│   ├── reference-tables/
│   └── ...
├── tools/                 # Epicor, time entry, and approvals documentation
│   ├── epicor/
│   └── ...
├── _data/                 # YAML data files (training videos, wiki stats, sitemap graph)
├── ingest/                # Staging area for new documents (excluded from site)
├── assets/
│   ├── css/               # Custom CSS, chat widget, and sitemap graph styles
│   └── js/                # Chat widget and sitemap graph JavaScript
├── scripts/               # Build scripts (corpus, sitemap graph — excluded from site)
├── chatbot-worker/        # Cloudflare Worker — Claude API proxy for chat widget
├── _includes/             # Custom includes (head_custom.html, nav_footer_custom.html)
├── _config.yml            # Jekyll configuration for GitHub Pages
├── index.md               # Main landing page (excluded from nav)
└── .github/workflows/     # GitHub Actions (site deploy, chatbot corpus sync, sitemap graph)
```

## Contributing

To update documentation:

1. **For new content**: Place documents in the `ingest/` folder for review
2. **For existing content**: Edit the appropriate markdown file in its category folder
3. **Commit and push** changes to the `main` branch
4. **GitHub Actions** will automatically build and deploy the site, sync the chatbot corpus, and regenerate the sitemap graph

### Content Organization

- **Onboarding** (`onboarding/`) — Engineering manifesto, onboarding quick start, roles, project delivery, scheduling chain, purchasing signal chain, progression framework, quick reference
- **Workflows** (`workflows/`) — Role-specific procedures (FE, PE, EA), FE-to-PE release, quick reference
- **Standards** (`standards/`) — Rhino drafting (9 pages), layer organization (5 pages), quick reference
- **Tools** (`tools/`) — Epicor (dashboards, multi-site, job/part management, inventory jobs), time entry, approvals, quick reference
- **Reference** (`reference/`) — Glossary, folder structure, reference tables (6 pages), training videos

### Ingest Process

The `ingest/` folder is a staging area for new documents. See `ingest/README.md` for detailed processing guidelines. Training video transcripts require special attention — see `ingest/transcripts/README.md` for specific procedures.

### Training Videos

Training video URLs and metadata are managed in `_data/training-videos.yml`. This single file drives both:
- The [Training Videos](https://cwka-engineering.github.io/reference/training-videos.html) reference page (rendered via Liquid)
- Footnote references throughout the wiki (manually maintained — see `files:` field in each entry)

To add a new video: add an entry to the YAML file, then add `[^transcript-KEY]` footnotes in the relevant wiki pages.

## Wiki Features

### Navigation

- **Onboarding** — Getting started, roles, project delivery, scheduling/purchasing chains
- **Workflows** — Step-by-step procedures by role (FE, PE, EA)
- **Standards** — Rhino drafting and layer organization conventions
- **Tools** — Guides for software and systems (Epicor, Toggl, Teams)
- **Reference** — Glossary, folder structure, reference tables, training videos

The sidebar navigation is **auto-generated** based on the folder structure and `parent` / `nav_order` front matter in each file. The sidebar footer displays a **Site Map** link, page count, and section count.

### Search

Built-in site-wide search functionality is available in the top navigation bar, powered by Just the Docs' native search feature.

### Interactive Site Map

A [force-directed graph](https://cwka-engineering.github.io/sitemap-graph.html) visualizes wiki page connectivity. Node size reflects link count; section colors distinguish content areas. Hover to highlight connections, click to navigate. The graph auto-regenerates via GitHub Action when `.md` files change.

### Chat Assistant

A floating chat widget on every page lets users ask natural-language questions about wiki content. Powered by Claude (Anthropic) via a Cloudflare Worker. See [Chat Assistant Architecture](#chat-assistant-architecture) below.

### Quick Reference ("How do I…?")

Four section-level quick reference pages provide task-oriented entry points with deep-links to anchored "How do I" sections across the wiki:

- [Onboarding Quick Reference](https://cwka-engineering.github.io/onboarding/quick-reference.html)
- [Workflows Quick Reference](https://cwka-engineering.github.io/workflows/quick-reference.html)
- [Standards Quick Reference](https://cwka-engineering.github.io/standards/quick-reference.html)
- [Tools Quick Reference](https://cwka-engineering.github.io/tools/quick-reference.html)

### Cross-Referencing

Each major document includes:
- "Related Documents" sections at the top
- Internal links to related workflows, standards, and tools
- Glossary term links where appropriate
- Training video footnotes linking to SharePoint recordings

## Development History

### Initial Build & Theme Migration

- Migrated from Minima to Just the Docs theme
- Built-in search, TOC, and navigation features
- GitHub Actions workflow for automated deployment

### Restructuring 2026 (Major Update)

Transformed the wiki from a flat list of monolithic documents into a hierarchical knowledge base:

1. **Hierarchy**: Structured content under Overview, Workflows, Standards, and Tools with auto-generated sidebar navigation
2. **Content Split**: FE workflow (9 pages), PE workflow (5 pages), Rhino Drafting (8 pages), Layer Organization (6 pages), Epicor (6 pages)
3. **Transcript Integration**: 17 training video transcripts processed with footnote citations
4. **Cross-Linking**: "Related Documents" and "Next Steps" sections on all pages

### Curriculum v3 + "How Do I" Integration (April 2026)

Integrated the Onboarding Curriculum v3 (14 chapters, 10 appendices) and "How Do I…?" Master Workflow List into the wiki:

- **22 new pages** created (reference tables, workflow pages, quick reference indexes)
- **~30 existing pages** significantly expanded
- **105+ anchored "How do I" sections** absorbed across ~30 pages
- **4 quick reference index pages** with deep-link tables
- **Suggested reading order** (Week 1–5+) added to onboarding page

### Wiki Chat Assistant (April 2026)

Added an on-screen Claude-powered chatbot:

- Vanilla JS widget (zero dependencies) on every page
- Cloudflare Worker proxies requests to Claude API
- Full wiki corpus (~67K tokens) in system prompt with Anthropic prompt caching
- Auto-syncs corpus to Cloudflare KV on every push to main

### Content Expansion & Reorganization (April 2026)

- **Inventory Jobs (INV)** page added with full process documentation, conflict resolution across 5 existing pages
- **Training video footnotes** completed across all 24 recordings with SharePoint URLs
- **Restructured from 4 sections to 5**: Overview removed; Onboarding and Reference sections created
- **Interactive site map** added (D3.js force-directed graph, auto-generated via GitHub Action)
- **Training Videos** reference page added (Liquid-driven from `_data/training-videos.yml`)
- **25 broken internal links** fixed; all `nav_order` gaps and conflicts resolved
- Post-reorganization: **76 pages**, 5 sections, 0 broken links

## Technical Details

### Jekyll Configuration

- **Theme**: Just the Docs (with dark/light mode toggle)
- **Build System**: GitHub Actions (`.github/workflows/pages.yml`)
- **Deployment**: Automated via GitHub Pages on push to `main`
- **Exclusions**: `ingest/`, `chatbot-worker/`, `scripts/`, and documentation files excluded from Jekyll processing

### Chat Assistant Architecture

```
Jekyll Site (GitHub Pages)          Cloudflare Worker              Claude API
┌──────────────────────┐    POST   ┌─────────────────────┐  API   ┌──────────┐
│ chat-widget.js  ─────┼──────────▶│ Loads corpus from KV│───────▶│ Haiku    │
│ chat-widget.css      │◀──SSE─────│ Rate limits (IP/KV) │◀───────│ 4.5      │
└──────────────────────┘           │ Streams response    │        └──────────┘
                                   └─────────────────────┘
                                            ▲
                                   GitHub Action (sync-corpus.yml)
                                   builds corpus JSON on push → uploads to KV
```

**Components**:
- `assets/js/chat-widget.js` — Floating chat panel, SSE stream parsing, inline markdown rendering
- `assets/css/chat-widget.css` — Widget styling (uses Just the Docs CSS variables for dark/light mode)
- `chatbot-worker/src/index.ts` — Cloudflare Worker (CORS, rate limiting, Claude API proxy)
- `scripts/build_corpus.py` — Extracts wiki pages into structured JSON with titles, URLs, and anchors
- `.github/workflows/sync-corpus.yml` — Auto-syncs corpus to Cloudflare KV when `.md` files change

### Sitemap Graph

- `scripts/build_sitemap.py` — Two-pass graph builder (nodes from front matter, edges from internal links)
- `_data/sitemap-graph.json` — Generated JSON (nodes with section/degree, edges with source/target)
- `assets/js/sitemap-graph.js` — D3.js v7 force-directed visualization
- `assets/css/sitemap-graph.css` — Graph styles (CSS custom properties for light/dark mode)
- `.github/workflows/build-sitemap-graph.yml` — Auto-regenerates on `.md` changes, commits with `[skip ci]`
- Quick Start and Quick Reference pages are excluded from the graph to reduce noise

**Secrets** (GitHub Actions → Settings → Secrets):
- `CLOUDFLARE_API_TOKEN`, `CF_ACCOUNT_ID`, `CF_KV_NAMESPACE_ID`

**Variable** (GitHub Actions → Settings → Variables):
- `CHATBOT_ENABLED` = `true` (controls whether corpus sync workflow runs)

### Other Features

- **Built-in Search**: Just the Docs native Lunr.js search
- **Automatic TOC**: Table of contents generated from page headings
- **Sidebar Navigation**: Persistent navigation sidebar with organized structure
- **Sidebar Footer**: Site Map link + page/section counts via `_data/wiki-stats.yml`
- **Responsive Design**: Mobile-friendly layout
- **Mermaid Diagrams**: Conditional loading via `mermaid: true` front matter

## Maintenance Notes

- All documents use consistent front matter for Jekyll
- Links use `.html` extension for GitHub Pages compatibility
- Cross-references should be updated when documents are modified
- Glossary should be expanded as new terms are introduced
- Transcript-sourced information includes footnotes for traceability
- **Training video URLs** are managed in `_data/training-videos.yml` — update footnotes in wiki pages when adding/changing URLs
- **Chatbot corpus** auto-syncs on push to `main` — no manual steps needed
- **Sitemap graph** auto-regenerates on push to `main` when `.md` files change
- **Claude model version** in `chatbot-worker/wrangler.toml` should be reviewed quarterly

## Future Enhancement Opportunities

1. **Change Log** — Track updates to workflows and standards
2. **Design Engineering (DE) Workflow** — Currently only mentioned in overview
3. **Chatbot analytics** — Track common questions to identify wiki content gaps
4. **Video migration** — Consider moving from SharePoint to unlisted YouTube for easier access
