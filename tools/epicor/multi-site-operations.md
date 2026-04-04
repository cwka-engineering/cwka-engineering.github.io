---
layout: default
title: Multi-Site Operations
permalink: /tools/epicor/multi-site-operations.html
parent: Epicor Usage
grand_parent: Tools
nav_order: 6
---

# Multi-Site Operations

CWK and Digifab Shop (DFW) operate as two distinct sites in the Epicor ERP system. This has practical consequences you will encounter daily.

> **Related Documents**: [Epicor Usage](/tools/epicor/index.html) | [Time Entry](/tools/time-entry.html) | [Part Management](/tools/epicor/part-management.html)

## Switching Sites
{: #how-to-switch-sites}

1. Click the **user icon** (bottom left of Epicor).
2. Select **Company**.
3. Choose the site (CWK or Digifab).
4. **Refresh the page** — the loading bar does not trigger a full refresh of the homepage cards.

Always refresh after switching. Failure to refresh can show stale data from the previous site.

## Site-Specific Behavior

### Dashboard Cards
- Cards labeled **CW** or **DF** are site-specific — they only open when logged into the corresponding site.
- Cards **without** a site designation work from either site.

### Submittal Dashboard
Must launch from the **CW site** but includes assignments from **both** sites.

### Production Report
- **Global Production Report**: Read-only, shows all open jobs from both sites.
- **Site-Specific Production Reports**: Updatable, but only for one site at a time.

### Time Entry
Time entry must be performed **per site**. You cannot enter hours for both Colorado and New York projects in a single batch. At minimum, you will need one bulk entry per site per week.

### Part Synchronization
- **General materials (GM)** are created in Colorado first, then synced nightly to New York.
- **Project-specific materials** are not synced — create them on the correct site.
- Best practice: always create and verify parts on the **Colorado** version first.

## Common Gotchas

- Forgetting to refresh after site switch → stale data on homepage cards
- Trying to update a Production Report from the wrong site → changes won't save
- Submitting time for both sites in one batch → entries will fail for the wrong site
- Looking for a newly created GM part at NY before 24-hour sync → part not found
