# GitHub Actions Setup for Just the Docs

## Issue

GitHub Pages is currently trying to use the automatic build system (which doesn't support custom gems like `just-the-docs`). You need to switch to GitHub Actions.

## Solution: Enable GitHub Actions for Pages

1. **Go to your repository on GitHub**
2. **Click "Settings"** (top menu)
3. **Click "Pages"** (left sidebar)
4. **Under "Source"**, you'll see it's currently set to "Deploy from a branch"
5. **Change it to "GitHub Actions"**
6. **Save**

## What This Does

- Disables the automatic GitHub Pages build (which can't find `just-the-docs`)
- Enables the custom GitHub Actions workflow (`.github/workflows/pages.yml`)
- The workflow will:
  - Install Jekyll 4.3 and `just-the-docs` gem
  - Build your site
  - Deploy to GitHub Pages

## After Switching

Once you switch to GitHub Actions:
1. The next push to `main` will trigger the workflow
2. You can see it running in the "Actions" tab
3. Once complete, your site will be live with Just the Docs theme

## Verify It's Working

After switching, check:
- Go to "Actions" tab → You should see "Build and deploy Jekyll site to Pages" workflow
- The workflow should complete successfully
- Your site should be live with the new theme

## Troubleshooting

If the workflow still fails after switching:
- Check the Actions tab for error messages
- Verify `Gemfile` has `gem "just-the-docs"`
- Verify `_config.yml` has `theme: just-the-docs`

