---
layout: default
title: Deliverables
permalink: /workflows/production-engineer/deliverables.html
nav_order: 3
parent: Production Engineer (PE) Workflow
grand_parent: Workflows
---

# Deliverables

> **Related**: [Model Processing](/workflows/production-engineer/processing.html) | [Troubleshooting](/workflows/production-engineer/troubleshooting.html)

## Master Parts List

The Master Parts List is the primary document for production tracking.

### Tabs in Template
1.  **Parts List**
2.  **Hardwoods List**
3.  **Board Feet**

### Parts List Details
-   **Scope**: Includes all parts except MT (Metal/Misc) parts
-   **Sorting**: Alphanumerically by Part Name
-   **Columns**:
    -   **Part Name**: From Rhino
    -   **Qty**: Total quantity
    -   **Material**: Epicor part number
    -   **Machining**: NEST, BEAM SAW, or HARDWOODS
    -   **Sheet Name**: CNC program name (use `_BS` for 2-sided machining)
    -   **Width/Length**: Respect grain direction (length = with grain)
    -   **EB Columns**: Edgebanding codes or treatment (RAB, CHAMFER)
    -   **Comments**: Concise notes

### Hardwoods List
-   **Scope**: All solid wood parts
-   **Sorting**: Material > Thickness > Width > Length

### Board Feet
-   Used to verify BOM quantity after populating hardwoods list.

## Lay-Up Summary

Created when **pre-laminating** material is required before cutting.

**Naming Convention**:
```
PRE_EpicorPartNumbersWithoutZeros_MetricThicknessInMM
```
Example: `PRE_438_331_7_19`

**Content**:
-   Material code (Rhino layer name)
-   Description
-   Materials being glued up
-   Quantities

## Output Files

Located in `Production_Files` folder on Z: drive:
-   Mastercam Files
-   Machining_Posts (G-code)
-   PE Rhino file
-   Shipping Component list
-   Master Parts List
-   Lay-Up Summary (if applicable)
