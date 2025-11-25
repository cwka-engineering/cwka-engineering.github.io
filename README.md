# CWK/DFW Engineering Wiki

This repository contains the Engineering Department wiki, configured for GitHub Pages.

## Viewing the Wiki

The wiki is published via GitHub Pages. Visit the site at: **https://cwka-engineering.github.io**

## Repository Structure

```
├── overview/          # Role descriptions, project delivery, glossary, onboarding
├── workflows/         # Step-by-step workflows for FE, PE, and EA
├── standards/         # Drafting standards, layer organization, folder structure
├── tools/             # Epicor, time entry, and approvals documentation
├── ingest/            # Staging area for new documents (excluded from site)
├── _config.yml        # Jekyll configuration for GitHub Pages
├── index.md           # Main landing page
└── search.html        # Site-wide search functionality
```

## Contributing

To update documentation:

1. **For new content**: Place documents in the `ingest/` folder for review
2. **For existing content**: Edit the appropriate markdown file in its category folder
3. **Commit and push** changes
4. **GitHub Pages** will automatically rebuild the site

### Content Organization

- **Overview** (`overview/`) - Role descriptions, project delivery overview, glossary, onboarding resources
- **Workflows** (`workflows/`) - Step-by-step procedures for Fabrication Engineers, Production Engineers, and Engineering Assistants
- **Standards** (`standards/`) - Drafting standards, layer organization, folder structure conventions
- **Tools** (`tools/`) - Epicor procedures, time entry, approvals process

### Ingest Process

The `ingest/` folder is a staging area for new documents. See `ingest/README.md` for detailed processing guidelines. Training video transcripts require special attention - see `ingest/transcripts/README.md` for specific procedures.

## Wiki Features

### Navigation

- **Getting Started** - Onboarding links, role descriptions, glossary, project overview
- **By Role** - Role-specific essential documents (FE, PE, EA)
- **By Task** - Task-oriented navigation (drawings, files, Epicor, releases, approvals)
- **Reference** - Complete reference documentation organized by category

### Search

Site-wide search functionality is available via the search page, powered by Lunr.js for client-side full-text search.

### Cross-Referencing

Each major document includes:
- "Related Documents" sections at the top
- Internal links to related workflows, standards, and tools
- Glossary term links where appropriate

## Development History

### Key Improvements

1. **Cross-Referencing** ✅
   - Added "Related Documents" sections to all major pages
   - Created internal links between related workflows and standards
   - Linked glossary terms throughout documentation

2. **Glossary Creation** ✅
   - Comprehensive glossary with definitions for:
     - Roles & Phases (FE, PE, DE, EA, PM, PA)
     - Job Types (WC, MT, Group Submittal, etc.)
     - File & Naming Conventions (BOM, SC, SK, MFG)
     - Epicor Terms
     - Drawing & Layout Terms
     - Material Terms
     - Tools & Systems

3. **Enhanced Navigation** ✅
   - Added table of contents to longer documents
   - Reorganized homepage with multiple entry points (Getting Started, By Role, By Task, Reference)
   - Improved document structure with clear sections

4. **Content Integration** ✅
   - Integrated 17 training video transcripts with proper footnotes
   - Created Engineering Assistant (EA) workflow documentation
   - Added Onboarding Quick Start Links page
   - Significantly expanded Epicor, Toolkit, and Rhino documentation

5. **Standardized Formatting** ✅
   - Consistent markdown formatting throughout
   - Standardized section headers
   - Uniform code block formatting
   - Consistent link formatting

6. **Site-Wide Search** ✅
   - Implemented client-side search using Lunr.js
   - Full-text search across all wiki content

### Integration Statistics

- **Documents Created**: 2 (EA Workflow, Onboarding Quick Start)
- **Documents Significantly Enhanced**: 7+ (Epicor Usage, Time Entry, FE Workflow, Glossary, Rhino Drafting, Layer Organization, Index)
- **Footnotes Added**: 25+ transcript citations for traceability
- **New Sections Added**: 20+
- **Content Expanded**: ~8000+ words of new documentation
- **Transcripts Processed**: 17 of 17 (100% complete) ✅

For detailed integration history, see `ingest/INTEGRATION_COMPLETE.md`.

## Technical Details

### Jekyll Configuration

- **Theme**: Minima
- **Collections**: Pages collection configured for organized content structure
- **Exclusions**: `ingest/` folder and other non-content files excluded from Jekyll processing

### Search Implementation

- **Technology**: Lunr.js (client-side JavaScript)
- **Index**: Generated from all wiki pages
- **Features**: Full-text search with title boosting

## Maintenance Notes

- All documents use consistent front matter for Jekyll
- Links use `.html` extension for GitHub Pages compatibility
- Cross-references should be updated when documents are modified
- Glossary should be expanded as new terms are introduced
- Transcript-sourced information includes footnotes for traceability

## Future Enhancement Opportunities

1. **Quick Reference Guides** - One-page cheat sheets for common tasks
2. **Video Tutorials** - Links to video walkthroughs (if available)
3. **FAQ Section** - Common questions and answers
4. **Change Log** - Track updates to workflows and standards
5. **Design Engineering (DE) Workflow** - Currently only mentioned in overview
