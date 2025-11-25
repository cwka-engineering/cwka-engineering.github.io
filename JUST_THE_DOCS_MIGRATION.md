# Just the Docs Migration Guide

## What Changed

### ✅ Updated Files

1. **`Gemfile`** - Changed to use Jekyll 4.3 and `just-the-docs` gem (removed `github-pages` gem)
2. **`_config.yml`** - Changed theme and added navigation structure
3. **`index.md`** - Simplified front matter (removed toc/breadcrumbs flags)
4. **`assets/css/custom.css`** - Simplified to minimal overrides
5. **`_includes/head-custom.html`** - Updated for compatibility
6. **`.github/workflows/pages.yml`** - NEW: GitHub Actions workflow for building and deploying

### 🗑️ Excluded Files (No Longer Needed)

The following custom files are now excluded since Just the Docs provides these features:
- `_layouts/default.html` - Just the Docs has its own layout
- `_includes/toc.html` - Built-in automatic TOC
- `_includes/breadcrumbs.html` - Built-in breadcrumbs
- `_includes/scroll-to-top.html` - Not needed

## New Features

### Automatic Table of Contents
- **Built-in TOC** appears automatically on every page
- Shows heading hierarchy (H2, H3, H4)
- Properly indented and styled
- No custom JavaScript needed!

### Sidebar Navigation
- **Persistent sidebar** with your navigation structure
- Expandable/collapsible sections
- Active page highlighting
- Mobile-responsive

### Built-in Search
- Just the Docs has its own native search functionality
- Accessible via the search box in the top navigation bar
- Full-text search across all wiki content

### Better Layout
- Content doesn't scroll under sidebar
- Proper spacing and margins
- Professional appearance

## Next Steps

### 1. Install Dependencies

Run locally to test:
```bash
bundle install
```

### 2. Test Locally

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000` to see the new theme.

### 3. Verify Navigation

Check that:
- ✅ Sidebar shows all your pages
- ✅ TOC appears on content pages
- ✅ Search works (both built-in and custom)
- ✅ Mobile view is responsive

### 4. Configure GitHub Pages

Since `just-the-docs` isn't included in the default GitHub Pages gems, we're using **GitHub Actions** to build the site:

1. **GitHub Actions workflow** (`.github/workflows/pages.yml`) has been created
   - Automatically builds on every push to `main`
   - Installs the `just-the-docs` gem
   - Deploys to GitHub Pages

2. **Enable GitHub Pages** (if not already):
   - Go to repository Settings → Pages
   - Under "Source", select **"GitHub Actions"** (not "Deploy from a branch")
   - Save

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Migrate to Just the Docs with GitHub Actions"
   git push
   ```

4. **Watch the build**:
   - Go to the "Actions" tab in your repository
   - You'll see the workflow running
   - Once complete, your site will be live!

## Navigation Structure

Your navigation is now defined in `_config.yml` under the `nav:` section:

```yaml
nav:
  - title: Home
    url: /
  - title: Getting Started
    children:
      - title: Onboarding Quick Start
        url: /overview/onboarding-quick-start.html
      # ... etc
```

To add new pages:
1. Create the markdown file
2. Add it to the `nav:` section in `_config.yml`
3. Commit and push

## Customization Options

Just the Docs supports many customization options in `_config.yml`:

```yaml
just_the_docs:
  color_scheme: light          # or dark
  color_mode_toggle: true       # Allow users to switch
  search_enabled: true          # Enable search
  heading_anchor_links: true    # Add # links to headings
  nav_external_links: true     # Show external link icons
```

See full documentation: https://just-the-docs.github.io/just-the-docs/

## Troubleshooting

### If sidebar doesn't appear:
- Check that `theme: just-the-docs` is in `_config.yml`
- Verify `gem "just-the-docs"` is in `Gemfile`
- Run `bundle install` locally

### If navigation is missing:
- Check the `nav:` section in `_config.yml`
- Ensure URLs match your actual page permalinks
- Check for YAML syntax errors

### If styles look wrong:
- Clear browser cache
- Check that custom CSS isn't overriding Just the Docs styles
- Verify `_includes/head-custom.html` is loading correctly

## Reverting (If Needed)

If you need to go back to Minima:

1. Change `theme: minima` in `_config.yml`
2. Remove `gem "just-the-docs"` from `Gemfile`
3. Restore `_layouts/default.html` if needed
4. Commit and push

## Benefits Over Minima

✅ **No workarounds needed** - Everything works out of the box
✅ **Better navigation** - Proper sidebar with hierarchy
✅ **Automatic TOC** - No custom JavaScript required
✅ **Better mobile support** - Responsive by default
✅ **Active development** - Well-maintained theme
✅ **Documentation-focused** - Built specifically for docs

Enjoy your new wiki! 🎉

