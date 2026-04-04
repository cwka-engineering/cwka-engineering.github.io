---
layout: default
title: Model Cleanup Commands
permalink: /standards/reference-tables/model-cleanup-commands.html
parent: Reference Tables
grand_parent: Standards
nav_order: 2
---

# Model Cleanup Commands

Run these commands before every PE release to ensure model hygiene. See the [FE to PE Release](/workflows/fe-to-pe-release.html) for the complete pre-release checklist.

> **Related Documents**: [FE to PE Release](/workflows/fe-to-pe-release.html) | [Material Modeling](/standards/layer-organization/material-modeling.html)

## Required Cleanup Commands

| Command | Purpose | Expected Result |
|---------|---------|----------------|
| `Purge` | Remove unused blocks, layers, styles, hatches, and dimension styles | Eliminates bloat from the file |
| `SelDup` | Select duplicate geometry | Delete all selected duplicates |
| `SelBadObjects` | Find geometry with errors (non-manifold, self-intersecting) | Should return nothing — fix any found |
| `SelOpenPolysrf` | Find unclosed polysurfaces | Should return nothing — close any found |
| `SelExtrusion` | Find lightweight extrusions | Convert all with `ConvertExtrusion` |

## Audit Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `SelName` | Step through named objects to audit name-to-geometry mapping | After part naming — verify each name maps to only identical geometry |
| `SelGroup` | Select objects by group | Verify SC groupings before export |
| `PackageManager` | Open the plugin manager | Initial setup and plugin updates |

## Cleanup Sequence

1. **Purge** — removes unused definitions
2. **SelDup** → delete — removes duplicate geometry
3. **SelBadObjects** → repair or rebuild — fixes broken geometry
4. **SelOpenPolysrf** → close or cap — ensures manifold solids
5. **SelExtrusion** → `ConvertExtrusion` — converts to polysurfaces for downstream compatibility
6. Remove empty layers, unused layouts, and layout-only blocks not needed in the release file
7. **SelName** audit — verify part name uniqueness and correctness

## Additional Checks

- Verify no geometry remains on construction-only layers that should have been purged
- Confirm all parts are closed, manifold polysurfaces (not surfaces, meshes, or extrusions)
- Check that UserText keys are populated via the toolkit (part names, SC assignments)
