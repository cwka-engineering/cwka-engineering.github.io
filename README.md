# CWK/DFW Engineering Wiki

This repository contains the Engineering Department wiki, configured for GitHub Pages.

## Viewing the Wiki

The wiki is published via GitHub Pages. Visit the site at: **https://cwka-engineering.github.io**

## Repository Structure

```
├── overview/          # Role descriptions, project delivery, glossary, onboarding
├── workflows/         # Step-by-step workflows (FE, PE, EA)
│   ├── fabrication-engineer/
│   ├── production-engineer/
│   └── ...
├── standards/         # Drafting standards, layer organization, folder structure
│   ├── rhino-drafting/
│   ├── layer-organization/
│   └── ...
├── tools/             # Epicor, time entry, and approvals documentation
│   ├── epicor/
│   └── ...
├── ingest/            # Staging area for new documents (excluded from site)
├── assets/            # Custom CSS and styling
├── _includes/         # Custom includes (head-custom.html for CSS)
├── _config.yml        # Jekyll configuration for GitHub Pages
├── index.md           # Main landing page (excluded from nav)
└── .github/workflows/ # GitHub Actions workflow for building and deploying
```

## Contributing

To update documentation:

1. **For new content**: Place documents in the `ingest/` folder for review
2. **For existing content**: Edit the appropriate markdown file in its category folder
3. **Commit and push** changes to the `main` branch
4. **GitHub Actions** will automatically build and deploy the site to GitHub Pages

### Content Organization

- **Overview** (`overview/`) - Role descriptions, project delivery overview, glossary, onboarding resources
- **Workflows** (`workflows/`) - Role-specific workflow procedures (FE, PE, EA) organized hierarchically
- **Standards** (`standards/`) - Drafting standards, layer organization, and folder structure conventions
- **Tools** (`tools/`) - Software-specific guides for Epicor, time entry, and approvals

### Ingest Process

The `ingest/` folder is a staging area for new documents. See `ingest/README.md` for detailed processing guidelines. Training video transcripts require special attention - see `ingest/transcripts/README.md` for specific procedures.

## Wiki Features

### Navigation

- **Overview** - General engineering knowledge, roles, and onboarding
- **Workflows** - Step-by-step procedures by role (FE, PE, EA)
- **Standards** - Reference material for drafting, layers, and file management
- **Tools** - Guides for software and systems (Epicor, Toggl, Teams)

The sidebar navigation is **auto-generated** based on the folder structure and `parent` / `nav_order` front matter in each file.

### Search

Built-in site-wide search functionality is available in the top navigation bar, powered by Just the Docs' native search feature.

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
   - Automatic table of contents on all pages (Just the Docs built-in)
   - Persistent sidebar navigation with organized structure
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

6. **Theme Migration** ✅
   - Migrated from Minima to Just the Docs theme
   - Built-in search, TOC, and navigation features
   - Professional documentation-focused design
   - GitHub Actions workflow for automated deployment

### Restructuring 2026 (Major Update) ✅

Transformed the wiki from a flat list of monolithic documents into a hierarchical knowledge base:

1.  **Hierarchy Implemented**:
    -   Structured content under **Overview**, **Workflows**, **Standards**, and **Tools**.
    -   Configured auto-generated sidebar navigation.

2.  **Content Split & Focused**:
    -   **Fabrication Engineer Workflow**: Split into 9 focused pages.
    -   **Production Engineer Workflow**: Split into 5 focused pages.
    -   **Rhino Drafting**: Split into 8 focused pages.
    -   **Layer Organization**: Split into 6 focused pages.
    -   **Epicor Usage**: Split into 6 focused pages.

3.  **Navigation Improvements**:
    -   Added "Related Documents" and "Next Steps" cross-linking.
    -   Cleaned up sidebar to show only active, relevant content.

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

- **Theme**: Just the Docs
- **Build System**: GitHub Actions (`.github/workflows/pages.yml`)
- **Deployment**: Automated via GitHub Pages
- **Exclusions**: `ingest/` folder and documentation files excluded from Jekyll processing

### Features

- **Built-in Search**: Just the Docs native search functionality
- **Automatic TOC**: Table of contents generated from page headings
- **Sidebar Navigation**: Persistent navigation sidebar with organized structure
- **Responsive Design**: Mobile-friendly layout

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
