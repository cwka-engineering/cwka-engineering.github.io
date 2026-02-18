---
layout: default
title: Model Processing
permalink: /workflows/production-engineer/processing.html
nav_order: 2
parent: Production Engineer (PE) Workflow
grand_parent: Workflows
---

# Model Processing

> **Related**: [Setup & Organization](/workflows/production-engineer/setup.html) | [Deliverables](/workflows/production-engineer/deliverables.html)

## Grasshopper Scripts Used

1.  **Lay Flat** – lays parts flat on the C-plane
2.  **Open Nest** – optimizes parts into nested sheets
3.  **Sheet Pairing** – populates part list with:
    -   Part name
    -   Material
    -   Nested sheet name
    -   Dimensions
4.  **Geometry Creation** – creates:
    -   Perimeter geometry
    -   Cutout geometry
    -   Drill point geometry
5.  **Part List** – populates part list for non-nested parts
6.  **Sheet Name Text** – creates material and program text for nested sheets
7.  **Part Name Text** – creates part name text
8.  **SK Creation** – creates sketches for nested and single part programs

## Accuracy Checks (QA/QC)

**Before proceeding with programming, verify the following:**

1.  **Material Verification**
    -   Ensure material layers match Epicor BOM
    -   Verify all materials are correctly assigned to parts

2.  **Part Naming**
    -   Ensure all parts are named according to standards
    -   Use `_SelName` command to verify part names match shipping components

3.  **Geometry Quality**
    -   Run `SelDup` – check for duplicate parts
    -   Run `SelBadObjects` – check for bad geometry
    -   Run `SelOpenPolysrf` – check for open polysurfaces
    -   **Fix any issues before proceeding.**

4.  **Quantity Verification**
    -   Confirm Epicor production quantity matches modeled quantity
    -   Check for missing or extra parts

5.  **Scribe Requirements**
    -   Ensure scribe is added if needed (see [Layer Organization - Scribes](/standards/layer-organization.html#scribes))
    -   Verify scribe geometry is properly grouped

6.  **Modeling Requirements**
    -   Ensure parts respecting material sizes and grain direction
    -   Verify machining requirements (dowels, hardware, cutouts)

## Workflow Steps

1. Select all parts for a material → run **Lay Flat** script
2. Separate beam saw parts and nested parts
3. Orient parts respecting grain direction (length = X direction)
4. Populate part list for **beam saw parts**
5. Optimize remaining parts into nested sheets using **Open Nest**
6. Populate nested parts to the part list using **Sheet Pairing**
7. Create machining geometry using **Geometry Creation**:
   - Perimeter
   - Cutout
   - Drill point
8. Repeat for all materials:
   - SG (Sheet Goods)
   - SS (Solid Surface - always nested)
   - SL (Solid Laminate)
9. Create all text labels:
   - **Sheet Name Text** – for nested sheets
   - **Part Name Text** – for individual parts
10. Create SK's using **SK Creation** and import SK template
