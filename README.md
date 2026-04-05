# CWK/DFW Engineering Wiki

This repository contains the Engineering Department wiki, configured for GitHub Pages.

## Viewing the Wiki

The wiki is published via GitHub Pages. Visit the site at: **https://cwka-engineering.github.io**

## Repository Structure

```
├── overview/              # Roles, project delivery, glossary, onboarding, scheduling/purchasing chains
├── workflows/             # Step-by-step workflows (FE, PE, EA, computational fabrication)
│   ├── fabrication-engineer/
│   ├── production-engineer/
│   └── ...
├── standards/             # Drafting standards, layer organization, folder structure, reference tables
│   ├── rhino-drafting/
│   ├── layer-organization/
│   ├── reference-tables/
│   └── ...
├── tools/                 # Epicor, time entry, and approvals documentation
│   ├── epicor/
│   └── ...
├── ingest/                # Staging area for new documents (excluded from site)
├── assets/
│   ├── css/               # Custom CSS and chat widget styling
│   └── js/                # Chat widget JavaScript
├── scripts/               # Corpus build script for chatbot (excluded from site)
├── chatbot-worker/        # Cloudflare Worker — Claude API proxy for chat widget
├── _includes/             # Custom includes (head_custom.html)
├── _config.yml            # Jekyll configuration for GitHub Pages
├── index.md               # Main landing page (excluded from nav)
└── .github/workflows/     # GitHub Actions (site deploy + chatbot corpus sync)
```

## Contributing

To update documentation:

1. **For new content**: Place documents in the `ingest/` folder for review
2. **For existing content**: Edit the appropriate markdown file in its category folder
3. **Commit and push** changes to the `main` branch
4. **GitHub Actions** will automatically build and deploy the site, and sync the chatbot corpus

### Content Organization

- **Overview** (`overview/`) — Role descriptions, project delivery, glossary, onboarding, scheduling chain, purchasing signal chain
- **Workflows** (`workflows/`) — Role-specific procedures (FE, PE, EA), FE-to-PE release, computational fabrication
- **Standards** (`standards/`) — Drafting standards, layer organization, folder structure, reference tables (file naming, material tags, sheet sizes, drill sizes, etc.)
- **Tools** (`tools/`) — Epicor (dashboards, multi-site, job/part management), time entry, approvals

### Ingest Process

The `ingest/` folder is a staging area for new documents. See `ingest/README.md` for detailed processing guidelines. Training video transcripts require special attention — see `ingest/transcripts/README.md` for specific procedures.

## Wiki Features

### Navigation

- **Overview** — General engineering knowledge, roles, and onboarding
- **Workflows** — Step-by-step procedures by role (FE, PE, EA)
- **Standards** — Reference material for drafting, layers, file management, and reference tables
- **Tools** — Guides for software and systems (Epicor, Toggl, Teams)

The sidebar navigation is **auto-generated** based on the folder structure and `parent` / `nav_order` front matter in each file.

### Search

Built-in site-wide search functionality is available in the top navigation bar, powered by Just the Docs' native search feature.

### Chat Assistant

A floating chat widget on every page lets users ask natural-language questions about wiki content. Powered by Claude (Anthropic) via a Cloudflare Worker. See [Chat Assistant Architecture](#chat-assistant-architecture) below.

### Quick Reference ("How do I…?")

Four section-level quick reference pages provide task-oriented entry points with deep-links to 105 anchored "How do I" sections across the wiki:

- [Overview Quick Reference](https://cwka-engineering.github.io/overview/quick-reference.html)
- [Workflows Quick Reference](https://cwka-engineering.github.io/workflows/quick-reference.html)
- [Standards Quick Reference](https://cwka-engineering.github.io/standards/quick-reference.html)
- [Tools Quick Reference](https://cwka-engineering.github.io/tools/quick-reference.html)

### Cross-Referencing

Each major document includes:
- "Related Documents" sections at the top
- Internal links to related workflows, standards, and tools
- Glossary term links where appropriate

## Development History

### Initial Build & Theme Migration ✅

- Migrated from Minima to Just the Docs theme
- Built-in search, TOC, and navigation features
- GitHub Actions workflow for automated deployment

### Restructuring 2026 (Major Update) ✅

Transformed the wiki from a flat list of monolithic documents into a hierarchical knowledge base:

1. **Hierarchy**: Structured content under Overview, Workflows, Standards, and Tools with auto-generated sidebar navigation
2. **Content Split**: FE workflow (9 pages), PE workflow (5 pages), Rhino Drafting (8 pages), Layer Organization (6 pages), Epicor (6 pages)
3. **Transcript Integration**: 17 training video transcripts processed with footnote citations
4. **Cross-Linking**: "Related Documents" and "Next Steps" sections on all pages

### Curriculum v3 + "How Do I" Integration (April 2026) ✅

Integrated the Onboarding Curriculum v3 (14 chapters, 10 appendices) and "How Do I…?" Master Workflow List (108 entries, 13 categories) into the wiki:

- **22 new pages** created (reference tables, workflow pages, quick reference indexes)
- **~30 existing pages** significantly expanded
- **105 anchored "How do I" sections** absorbed across ~30 pages
- **4 quick reference index pages** with deep-link tables
- **Suggested reading order** (Week 1–5+) added to onboarding page
- **7 reference table pages** under `standards/reference-tables/`

Post-integration page count: **76 pages**

For detailed integration history, see `ingest/INTEGRATION_COMPLETE.md`.

### Wiki Chat Assistant (April 2026) ✅

Added an on-screen Claude-powered chatbot that answers natural-language questions grounded in wiki content:

- Vanilla JS widget (zero dependencies) on every page
- Cloudflare Worker proxies requests to Claude API
- Full wiki corpus (~67K tokens) in system prompt with Anthropic prompt caching
- Auto-syncs corpus to Cloudflare KV on every push to main
- Cost: ~$2–6/month on Claude Haiku 4.5

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

**Secrets** (GitHub Actions → Settings → Secrets):
- `CLOUDFLARE_API_TOKEN`, `CF_ACCOUNT_ID`, `CF_KV_NAMESPACE_ID`

**Variable** (GitHub Actions → Settings → Variables):
- `CHATBOT_ENABLED` = `true` (controls whether sync workflow runs)

### Other Features

- **Built-in Search**: Just the Docs native Lunr.js search
- **Automatic TOC**: Table of contents generated from page headings
- **Sidebar Navigation**: Persistent navigation sidebar with organized structure
- **Responsive Design**: Mobile-friendly layout
- **Mermaid Diagrams**: Conditional loading via `mermaid: true` front matter

## Maintenance Notes

- All documents use consistent front matter for Jekyll
- Links use `.html` extension for GitHub Pages compatibility
- Cross-references should be updated when documents are modified
- Glossary should be expanded as new terms are introduced
- Transcript-sourced information includes footnotes for traceability
- **Chatbot corpus** auto-syncs on push to `main` — no manual steps needed
- **Claude model version** in `chatbot-worker/wrangler.toml` should be reviewed quarterly
- **Anthropic API spend**: ~$2–6/month on Haiku 4.5; monitor via [Anthropic dashboard](https://console.anthropic.com/)

## Future Enhancement Opportunities

1. **Video Tutorials** — Links to video walkthroughs (if available)
2. **Change Log** — Track updates to workflows and standards
3. **Design Engineering (DE) Workflow** — Currently only mentioned in overview
4. **Chatbot analytics** — Track common questions to identify wiki content gaps
