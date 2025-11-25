# Wiki Platform Options - Migration Guide

This document outlines better alternatives to the Minima Jekyll theme for a more robust engineering wiki.

## Current Situation

- **Current Setup**: Jekyll with Minima theme on GitHub Pages
- **Issues**: Limited sidebar support, complex workarounds for TOC, layout constraints
- **Requirements**: GitHub Pages compatibility, markdown-based, search functionality, good navigation

## Option 1: Better Jekyll Themes (Easiest Migration)

### Just the Docs
**Best for**: Documentation-focused sites with built-in sidebar navigation

**Pros**:
- ✅ Purpose-built for documentation
- ✅ Built-in sidebar navigation with automatic TOC
- ✅ Works with GitHub Pages (no plugins needed)
- ✅ Excellent search functionality
- ✅ Mobile-responsive
- ✅ Easy migration from current setup
- ✅ Minimal configuration needed

**Cons**:
- Still Jekyll-based (some limitations remain)
- Less customizable than full frameworks

**Migration Effort**: Low - mostly theme swap and minor config changes

**GitHub**: https://github.com/just-the-docs/just-the-docs

### Jekyll Documentation Theme
**Best for**: Technical documentation with versioning

**Pros**:
- ✅ Documentation-focused
- ✅ Sidebar navigation
- ✅ Version dropdown support
- ✅ GitHub Pages compatible

**Cons**:
- Less actively maintained than Just the Docs
- Fewer features

**Migration Effort**: Low

**GitHub**: https://github.com/tomjoht/documentation-theme-jekyll

### Minimal Mistakes
**Best for**: Flexible documentation with many customization options

**Pros**:
- ✅ Highly customizable
- ✅ Multiple layout options
- ✅ Good sidebar support
- ✅ Active development

**Cons**:
- More complex configuration
- Steeper learning curve

**Migration Effort**: Medium

**GitHub**: https://github.com/mmistakes/minimal-mistakes

## Option 2: MkDocs (Recommended for Documentation)

**Best for**: Technical documentation with excellent navigation

**Pros**:
- ✅ **Purpose-built for documentation** - designed specifically for docs
- ✅ **Excellent navigation** - automatic sidebar, search, breadcrumbs
- ✅ **Material theme** - beautiful, modern UI with dark mode
- ✅ **Fast search** - client-side search with highlighting
- ✅ **Easy to use** - simple YAML config, markdown files
- ✅ **GitHub Pages compatible** - can deploy via GitHub Actions
- ✅ **Python-based** - easy to extend with plugins
- ✅ **Great for large docs** - handles hundreds of pages well

**Cons**:
- Requires GitHub Actions for deployment (not native GitHub Pages)
- Python dependency (but minimal)
- Need to learn MkDocs structure (but it's simple)

**Migration Effort**: Medium - need to restructure files slightly, add GitHub Actions

**Website**: https://www.mkdocs.org/
**Material Theme**: https://squidfunk.github.io/mkdocs-material/

**Example Structure**:
```yaml
# mkdocs.yml
site_name: CWKA Engineering Wiki
theme:
  name: material
  features:
    - navigation.tabs
    - navigation.sections
    - search.suggest
    - search.highlight
```

## Option 3: Docusaurus (Most Features)

**Best for**: Large documentation sites with advanced features

**Pros**:
- ✅ **React-based** - modern, fast, interactive
- ✅ **Excellent features** - versioning, i18n, blog, search
- ✅ **Great navigation** - sidebar, breadcrumbs, pagination
- ✅ **Active development** - maintained by Meta/Facebook
- ✅ **GitHub Pages compatible** - via GitHub Actions
- ✅ **Plugin ecosystem** - extensive customization

**Cons**:
- More complex setup (Node.js, React)
- Overkill for simple wikis
- Steeper learning curve

**Migration Effort**: Medium-High - need to restructure, learn React/JSX basics

**Website**: https://docusaurus.io/

## Option 4: VuePress

**Best for**: Vue.js-based documentation

**Pros**:
- ✅ Vue.js-based (if team knows Vue)
- ✅ Good documentation features
- ✅ GitHub Pages compatible

**Cons**:
- Less popular than Docusaurus/MkDocs
- Vue.js dependency

**Migration Effort**: Medium

**Website**: https://vuepress.vuejs.org/

## Option 5: GitBook (Hosted Solution)

**Best for**: Teams wanting hosted solution with minimal setup

**Pros**:
- ✅ **No hosting setup** - fully managed
- ✅ **Excellent UI** - beautiful, modern interface
- ✅ **Great collaboration** - built-in editing, comments
- ✅ **Search** - powerful built-in search
- ✅ **Easy to use** - WYSIWYG + markdown

**Cons**:
- **Cost** - free for public, paid for private ($6/user/month)
- Less control over hosting/customization
- Migration away can be difficult

**Migration Effort**: Low (but ongoing cost)

**Website**: https://www.gitbook.com/

## Recommendation Matrix

| Option | Migration Effort | Features | GitHub Pages | Best For |
|--------|-----------------|----------|--------------|----------|
| **Just the Docs** | ⭐ Low | ⭐⭐⭐ Good | ✅ Native | Quick upgrade, stay on Jekyll |
| **MkDocs** | ⭐⭐ Medium | ⭐⭐⭐⭐ Excellent | ✅ Actions | Best documentation experience |
| **Docusaurus** | ⭐⭐⭐ Medium-High | ⭐⭐⭐⭐⭐ Excellent | ✅ Actions | Advanced features needed |
| **Minimal Mistakes** | ⭐⭐ Medium | ⭐⭐⭐ Good | ✅ Native | Maximum customization |
| **GitBook** | ⭐ Low | ⭐⭐⭐⭐ Excellent | ❌ Hosted | No hosting concerns |

## My Recommendation: **MkDocs with Material Theme**

### Why MkDocs?

1. **Purpose-Built**: Designed specifically for documentation (unlike Jekyll which is a general blog engine)
2. **Better Navigation**: Automatic sidebar, breadcrumbs, search - all built-in
3. **Easier Maintenance**: Simple YAML config, no complex workarounds
4. **Great UX**: Material theme is beautiful and modern
5. **Scalable**: Handles large documentation sets well
6. **Active Development**: Well-maintained, active community

### Migration Path

1. **Install MkDocs**: `pip install mkdocs mkdocs-material`
2. **Create `mkdocs.yml`**: Define site structure
3. **Restructure content**: Move markdown files to `docs/` folder
4. **Add GitHub Actions**: Automated deployment workflow
5. **Test locally**: `mkdocs serve`
6. **Deploy**: Push to GitHub, Actions handles the rest

### Example mkdocs.yml Structure

```yaml
site_name: CWKA Engineering Wiki
site_description: Engineering department documentation and workflows
site_url: https://cwka-engineering.github.io

theme:
  name: material
  palette:
    - scheme: default
      primary: blue
      accent: blue
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
    - scheme: slate
      primary: blue
      accent: blue
      toggle:
        icon: material/brightness-4
        name: Switch to light mode
  features:
    - navigation.tabs
    - navigation.sections
    - navigation.expand
    - navigation.top
    - search.suggest
    - search.highlight
    - content.code.annotate

nav:
  - Home: index.md
  - Getting Started:
    - Onboarding: overview/onboarding-quick-start.md
    - Roles: overview/engineering-roles.md
    - Glossary: overview/glossary.md
  - Workflows:
    - FE Workflow: workflows/fabrication-engineer.md
    - PE Workflow: workflows/production-engineer.md
    - EA Workflow: workflows/engineering-assistant.md
  - Standards:
    - Rhino Drafting: standards/rhino-drafting-layouts.md
    - Layer Organization: standards/layer-organization.md
  - Tools:
    - Epicor Usage: tools/epicor-usage.md
    - Time Entry: tools/time-entry.md

plugins:
  - search
  - minify:
      minify_html: true
```

## Quick Start: Just the Docs (If Staying on Jekyll)

If you want to stay on Jekyll but get better features, **Just the Docs** is the easiest path:

1. Update `_config.yml`:
```yaml
theme: just-the-docs
```

2. Add to `Gemfile`:
```ruby
gem "just-the-docs"
```

3. Restructure navigation in `_config.yml`:
```yaml
just_the_docs:
  nav_external_links: true
  search_enabled: true
```

4. That's it! Much simpler than current workarounds.

## Next Steps

1. **Try Just the Docs locally** - Quickest way to see improvement
2. **Evaluate MkDocs** - If you want the best documentation experience
3. **Consider Docusaurus** - If you need advanced features (versioning, i18n)

Would you like me to help set up any of these options?

