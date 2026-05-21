---
layout: default
title: Modeling Techniques
permalink: /standards/layer-organization/modeling-techniques.html
nav_order: 2
parent: Layer Organization
grand_parent: Standards
corpus_tags: [fe-release, fe-submittal]
---

# Modeling Techniques

> **Related**: [Standard Layers](/standards/layer-organization/standard-layers.html) | [Manufactured Parts](/standards/layer-organization/manufactured-parts.html)

## How do I create scribes for CNC machining?
{: #how-to-create-scribes}

Duplicate the finished geometry. Keep the same part name. Extend the face to an oversized dimension (larger than the actual part). Move to `04_CWKA-PE::REF` sublayer. Group with the finished geometry so PE can identify the scribe relationship. The scribe tells the CNC where to machine alignment marks on oversized stock before trimming to final size.

## How do I set up Named Positions for exploded views?
{: #how-to-setup-named-positions}

Use the **Named Positions** command. Save positions (e.g., "default" for assembled, "exploded" for exploded view). Toggle between saved states for different layout views. **Important**: set Named Positions only after the model is fabrication-ready — altered geometry gets a new GUID and must be manually appended to each position. You cannot mix assembled and exploded views on the same layout page.

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

## Corner Clearance for CNC Machining
{: #corner-clearance}

When modeling pockets, notches, or slot geometry intended for CNC routing — waffle structures, half laps, parts fit into a notch — use the following clearance standard. **Do not model radii** at interior corners.

| Geometry | Width | Depth |
|---|---|---|
| Slot / pocket / notch | 0.51" | 0.26" |

Square-cornered clearance ensures the geometry machines correctly across both shops for router bits 0.5" diameter and smaller, regardless of tooling or programming approach. Modeled radii create shop-specific geometry that may collide with toolpath constraints at one site.

## Next Steps
- Learn about [Manufactured Parts](/standards/layer-organization/manufactured-parts.html)
