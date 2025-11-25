---
layout: default
title: Rhino Drafting and Layouts
permalink: /standards/rhino-drafting-layouts.html
---

# Rhino Drafting and Layouts

> **Related Documents**: [Layer Organization](/standards/layer-organization.html) | [Folder Structure](/standards/folder-structure.html)

This document covers drafting standards and layout conventions for Rhino drawings.

## Table of Contents

1. [Layout Structure & Page Content](#layout-structure--page-content)
2. [Creating Details](#creating-details)
3. [Section Views](#section-views)
4. [Clipping Planes & Sections](#clipping-planes--sections)
5. [Hatches & Section Styles](#hatches--section-styles)
6. [Dimensions & Annotations](#dimensions--annotations)
7. [Display Modes for Drafting](#display-modes-for-drafting)
8. [Printing Considerations](#printing-considerations)

## Layout Structure & Page Content

Layouts follow a "Hundred level page number" system:
- Format: Project.Job.Hundred level page number
- This system categorizes drawing types.

## Standard Page Types

- **XXXX.T00**: Title Sheet – includes project index
- **XXXX.G00**: General Requirements and Schedules – includes material tags and bill of materials
- **XXXX.XXX.1XX**: Reference Plans – includes:
  - Overall floor plans
  - Enlarged plans
  - Key plans for site context
  - VIF (Verify in Field) plans
- **XXXX.XXX.2XX**: Shop Drawings – for client submission, typically includes:
  - Isometric views
  - BOM (Bill of Materials)
  - Plans
  - Elevations
  - Sections
  - Details
- **XXXX.XXX.3XX**: Install & Shipping Drawings – for install team, includes:
  - Shipping Components list
  - Installation supplements
- **XXXX.XXX.4XX**: Fabrication Supplements – for shop team, includes:
  - Layups
  - Veneer Sequence
  - Glue-up Jig
  - Create 400-level drawings for each WC/MT/IP part.
  - First drawing = 400, then 401, etc.
  - Drawing number = WC/MT/IP code (e.g., 1102.MT.00007.400)
- **NOTE**: Rhino tabs can have the same name but must be manually labeled using layout user text.
- **XXXX.XXX.SKXX**: Sketches – for quick feedback, not part of submission set

### Schedules
- Required for WC and MT jobs
- Use toolkit or custom Grasshopper scripts if toolkit fails.
- Should include part name, type, and topology.

## Creating Details

- Use the Detail command and select "add" to create new detailed views on a layout.
- Name the detail view (e.g., "front view").
- Use Hide in Detail to selectively hide objects within a specific detail view.
- You can also hide objects by turning their respective Detail Layer in the layers panel.
- **Note**: This is the secondary light bulb per layer that can be toggle on a per detail basis.
- Always lock your detailed view once finalized to prevent:
  - Accidental shifting
  - Disconnected dimensions and leaders

## Labeling Details

- Use the "Legends and Symbols" block, specifically the "Detail Title" block.
- Connect block attributes to:
  - Detail view's name
  - Detail view's scale
- Use text fields: object name, object scale
- Ensure the detail title is on the "Detail Title" layer

## Section Views

- Use the "detail tag" block from Legends and Symbols to create section reference tags.
- Link attributes:
  - Detail page
  - Detail number
- This ensures the tag follows the section detail correctly.

## Clipping Planes & Sections

- Create clipping planes on the clip planes sublayer under:
  - 03_CWKA-FE
- Use the Clipping Plane command
- (Rhino 8 offers various options; "vertical" is typical)

### Clipping Plane Properties

**Custom Depth**:
- Controls how much is visible behind the clipping plane; useful for reducing visual noise.

**Objects Clipped**:
- Filters which objects/layers are cut; allows for "peeled back" sections.
- You can toggle clipping planes on/off for specific model or layout views.

## Hatches & Section Styles

- Hatch patterns are set in the Section Style column within the Layer Manager

### Standard Hatch Settings
- Pattern Color: Dark Grey (prints dark gray for lighter appearance)
- Background: White
- Boundary Color: Black
- Scale: 5

### Custom Hatch Rotation
- For objects with grain direction different from the material's default (e.g., perpendicular wood grain):
- Adjust rotation of hatch in:
  - Properties > Section Style > Custom

### Section Line Styling
- Print width: 0.05 mm
- Width scale: 5 (makes section line pop while keeping other linework crisp)

### Special Cases
- Hardware or thin gauge steel:
  - Use hairline print width
  - Use solid white hatch (improves legibility and avoids visual clutter)

## Dimensions & Annotations

- Use the Leader command for:
  - Material tags
  - Other annotations

### Material Tags
- Tags are blocks with attributes (e.g., Pi 01)
- Include grain direction annotations as needed

### Dimension Placement
- Maintain a gap between dimension line and geometry (prevents merging and improves readability)
- Place dimensions off the drawing geometry to avoid clutter

### Leader Line Cleanup
- For leaders intersecting linework:
  - Use mask background in properties to hide geometry behind text
  - Optionally add a frame around the text

## Display Modes for Drafting

### Monochrome:
- Shows silhouette and curvature well
- Heavy for printing
- Best printed raster
- Output Color in the Print Window: Print Color

### Pen (Download & Install):
- Vector output
- No hidden lines
- Output Color in the Print Window: Print Color

### Technical (Download & Install):
- Vector output
- Hidden lines appear as light gray
- Output Color in the Print Window: Print Display

## Printing Considerations

- Locked objects will not print (Ensure all desired geometry is unlocked)

### Recommended printer:
- Microsoft Print to PDF (balances quality and file size)

### Other options:
- Rhino PDF: Tends to be heavy
- Bluebeam: Quality can be buggy

### Shading:
- Is a raster feature → can only be printed in raster mode

## Hidden Linework in Technical Mode

- Hidden lines appear light gray
- If print colors are set to black:
  - Print layout as a separate PDF
  - Create a Layer State with all CWKA/Digi scope geometry set to black and Print as previously mentioned.
- **NOTE**: create a Layer State with all your settings BEFORE you change all display colors to black.
- Otherwise, use Bluebeam's color processing tool to convert vector colors to black

