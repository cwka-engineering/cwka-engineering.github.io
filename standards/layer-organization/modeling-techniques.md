---
layout: default
title: Modeling Techniques
permalink: /standards/layer-organization/modeling-techniques.html
nav_order: 2
parent: Layer Organization
grand_parent: Standards
---

# Modeling Techniques

> **Related**: [Standard Layers](/standards/layer-organization/standard-layers.html) | [Manufactured Parts](/standards/layer-organization/manufactured-parts.html)

## Scribes

- Duplicate finished geometry.
- Keep same part name.
- Extend face to oversized dimension.
- Move to `CWKA-PE > REF` sublayer.
- Group with finished geometry.

## Named Positions

Used to animate/toggle geometry positions.

### Setup
- Use **Named Positions** command.
- Save positions (e.g., default, exploded).
- Toggle between saved states.

### Adjustments
- Altered geometry gets new GUID.
- Must append to each position manually.

### Recommendation
- Set named positions after fabrication-ready.

## Referencing Geometry

Used for coordination while keeping files lean.

### Insert Command
- Use **Insert** → Select file → Check Linked, Layer style: Active.

### Insert Options
- **Block Instance**: For static reference geometry.
- **Individual Objects**: For editable MFG parts.
- **As Group**: Optional.

### Notes
- Use **Block Manager** to update/delete.
- Individual objects disconnect from source.

## Next Steps
- Learn about [Manufactured Parts](/standards/layer-organization/manufactured-parts.html)
