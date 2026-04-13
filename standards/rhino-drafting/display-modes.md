---
layout: default
title: Display Modes
permalink: /standards/rhino-drafting/display-modes.html
nav_order: 6
parent: Rhino Drafting
grand_parent: Standards
---

# Display Modes for Drafting

> **Related**: [Printing](/standards/rhino-drafting/printing.html) | [Hatches](/standards/rhino-drafting/hatches.html)

## How do I use Pen mode for clean vector output?
{: #how-to-use-pen-mode}

Set the detail view display to **Pen** mode (must be downloaded and installed — see [Onboarding Quick Start](/onboarding/quick-start.html#how-to-import-display-modes)). Pen produces vector output with no hidden lines. Set **Output Color** to **Print Color** in the print window.[^transcript-raster-vs-vector]

## How do I use Technical mode to show hidden lines?
{: #how-to-use-technical-mode}

Set the detail view display to **Technical** mode (must be downloaded and installed). Technical produces vector output with hidden lines rendered as light gray. Set **Output Color** to **Print Display**. If you need all-black output, create a **Layer State** first, then set all scope geometry to black and print. Alternatively, use Bluebeam's color processing tool post-print.

## Monochrome

- Shows silhouette and curvature well
- Heavy for printing
- Best printed raster
- **Output Color in the Print Window**: Print Color

## Pen

(Download & Install)
- Vector output
- No hidden lines
- **Output Color in the Print Window**: Print Color

## Technical

(Download & Install)
- Vector output
- Hidden lines appear as light gray
- **Output Color in the Print Window**: Print Display

## Hidden Linework in Technical Mode

- Hidden lines appear light gray.
- If print colors are set to black:
  - Print layout as a separate PDF.
  - Create a Layer State with all CWKA/Digi scope geometry set to black and Print as previously mentioned.
  - **NOTE**: create a Layer State with all your settings **BEFORE** you change all display colors to black.
- Otherwise, use Bluebeam's color processing tool to convert vector colors to black.

## Next Steps
- Review [Printing Considerations](/standards/rhino-drafting/printing.html)

## Footnotes
[^transcript-layouts]: Source: [Training Video — "Layouts, Details, and Annotations"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQDCib7picOsRbne5WY5zqqKAYZVduR5IUrhgLRcL2a8y5o?e=GD3AVG)
[^transcript-raster-vs-vector]: Source: [Training Video — "Raster vs Vector"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQD3p9Ht9IfOQ78KGOpvW3ldAWQ8-ZdwWZvjX8IKhWmiHCQ?e=JsiSsr)
