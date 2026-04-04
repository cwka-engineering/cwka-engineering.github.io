---
layout: default
title: Deliverables
permalink: /workflows/production-engineer/deliverables.html
nav_order: 3
parent: Production Engineer (PE)
grand_parent: Workflows
---

# Deliverables

> **Related**: [Model Processing](/workflows/production-engineer/processing.html) | [Troubleshooting](/workflows/production-engineer/troubleshooting.html)

## How do I create the Master Parts List?
{: #how-to-create-master-parts-list}

Use the Excel template from `PE to Floor SOP\TEMPLATES`. Populate from the Grasshopper **Part List** and **Sheet Pairing** script outputs. Include all parts except MT. Sort alphanumerically by part name. Fill columns: Part Name, Qty, Material (Epicor part number), Machining (NEST/BEAM SAW/HARDWOODS), Sheet Name, Width/Length (grain-aware), EB columns, Comments.

## How do I create the Lay-Up Summary?
{: #how-to-create-layup-summary}

Create when pre-laminating material is required. Name using the format `PRE_EpicorPartNumbersWithoutZeros_MetricThicknessInMM` (e.g., `PRE_438_331_7_19`). Include: material code (Rhino layer name), description, materials being glued up, and quantities. Reference [Lay-Up Formulas](/standards/reference-tables/lay-up-formulas.html) for thickness calculations.

## How do I mark a job as Programming Complete?
{: #how-to-mark-programming-complete}

After all parts are processed, nested, programmed (Mastercam), and posted: verify the Master Parts List is complete, Lay-Up Summary is done (if applicable), all SK drawings are generated, and G-code files are in `Machining_Posts`. Update the job status in Epicor and notify the production team.

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
