---
layout: default
title: Production Engineer (PE) Workflow
permalink: /workflows/production-engineer.html
parent: Workflows
---

# Production Engineer (PE) Workflow Outline

> **Related Documents**: [Project Delivery Overview](/overview/project-delivery.html) | [FE to PE Release SOP](/workflows/fe-to-pe-release.html) | [Layer Organization](/standards/layer-organization.html)

## Table of Contents

1. [Overview](#1-overview)
2. [Templates & File Structure](#2-templates--file-structure)
3. [Rhino Layer Management](#3-rhino-layer-management)
4. [Processing the Model](#4-processing-the-model)
5. [Rhino Workflow](#5-rhino-workflow)
6. [Master Parts List](#6-master-parts-list)
7. [Lay-Up Summary](#7-lay-up-summary)

## 1. Overview

The Production Engineer (PE) workflow is focused on preparing jobs for production. This workflow begins after receiving a job release from the Fabrication Engineer (FE).

## 2. Templates & File Structure

### Templates
Located in:
```
Box\CWKA Team Folders\EngineeringTeam\Production Engineering\PE to Floor SOP\TEMPLATES
```

### File Structure
Files produced by PE are stored on the Z: drive.
- Copy the template folder into the respective project folder and rename it using the PROJ.JOB naming convention (e.g., 1086.018).
- Follow the [Folder Structure](/standards/folder-structure.html#03_pe_releases) standards for organization.
- Inside each job folder, there are two subfolders:
  - Production_Files
  - Production_Drawings

### Production_Files Includes:
- Mastercam Files – for CNC program files
- Rhino_Files – exported Rhino files for Mastercam programming
- Machining_Posts – posted programs per machine
- PE Rhino file
- Shipping Component list – provided by Fabrication Engineer (FE)
- Master Parts List
- Lay-Up Summary template

### Production_Drawings Includes:
- Shop drawings – prepared by FE
- CNC SK's
- WATERJET SK's

## 3. Rhino Layer Management

### Layer Structure
All geometry created by PE lives under the layer:
- 04_CWKA-PE

For complete layer organization standards, see [Layer Organization](/standards/layer-organization.html#04_cwka-pe-production-engineering).

A sublayer named MACHINING is created under 04_CWKA-PE for all programming geometry:
- Perimeter geometry
- Cutouts
- Pockets/Rabs/Dados
- Center lines
- Drill points
- Surfaces

### Naming Conventions
- **Perimeter cuts**: `THRU CUT OUT 1.5` → 1.5 = material thickness
- **Cutouts**: `THRU CUT IN 1.5`
- **Pockets/Rabs/Dados**: `1/2" POCKET 0.375` → 1/2" = bit diameter, 0.375 = depth from spoilboard
- **Drill points**: `8MM DRILL PT 0.25` → 8MM = bit diameter, 0.25 = depth from spoilboard

## 4. Processing the Model

### Grasshopper Scripts Used
- **Lay Flat** – lays parts flat on the C-plane
- **Open Nest** – optimizes parts into nested sheets
- **Sheet Pairing** – populates part list with:
  - Part name
  - Material
  - Nested sheet name
  - Dimensions
- **Geometry Creation** – creates:
  - Perimeter geometry
  - Cutout geometry
  - Drill point geometry
- **Part List** – populates part list for non-nested parts
- **Sheet Name Text** – creates material and program text for nested sheets
- **Part Name Text** – creates part name text
- **SK Creation** – creates sketches for nested and single part programs

### Accuracy Checks

Before proceeding with programming, verify the following:

1. **Material Verification**
   - Ensure material layers match Epicor BOM
   - Verify all materials are correctly assigned to parts

2. **Part Naming**
   - Ensure all parts are named according to standards
   - Use `_SelName` command to verify part names match shipping components

3. **Geometry Quality**
   - Use Rhino commands to check:
     - `SelDup` – for duplicate parts
     - `SelBadObjects` – for bad geometry
     - `SelOpenPolysrf` – for open polysurfaces
   - Fix any geometry issues before proceeding

4. **Quantity Verification**
   - Confirm Epicor production quantity matches modeled quantity
   - Check for missing or extra parts

5. **Scribe Requirements**
   - Ensure scribe is added if needed (see [Layer Organization - Scribes](/standards/layer-organization.html#scribes))
   - Verify scribe geometry is properly grouped

6. **Modeling Requirements**
   - Ensure parts are modeled respecting:
     - Material sizes (see [Layer Organization - Material Size](/standards/layer-organization.html#material-size))
     - Machining requirements (e.g., dowels, hardware, cutouts, dados/rabs)
     - Grain direction for wood materials

## 5. Rhino Workflow

1. Select all parts for a material → run Lay Flat script
2. Separate beam saw parts and nested parts
3. Orient parts respecting grain direction (length = X direction)
4. Populate part list for beam saw parts
5. Optimize remaining parts into nested sheets using Open Nest
6. Populate nested parts to the part list using Sheet Pairing
7. Create machining geometry using Geometry Creation:
   - Perimeter
   - Cutout
   - Drill point
8. Repeat for all materials:
   - SG
   - SS (always nested)
   - SL
9. Create all text labels:
   - Sheet Name Text – for nested sheets
   - Part Name Text – for individual parts
10. Create SK's using SK Creation and import SK template

## 6. Master Parts List

### Tabs in Template
- Parts List
- Hardwoods List
- Board Feet

### Parts List Details
- Includes all parts except MT parts
- Sorted alphanumerically by Part Name
- Headers:
  - Part Name
  - Qty
  - Material
  - Machining
  - Sheet Name
  - Thickness
  - Width
  - Length
  - EB L1, EB L2, EB W1, EB W2
  - Comments
- Material column: populated with Epicor part
- Machining column: describes production method:
  - NEST
  - BEAM SAW
  - HARDWOODS
- Sheet Name: CNC program name (use _BS for 2-sided machining)
- Width and Length: respect grain direction (length = with grain)
- EB Columns: include all edge treatments:
  - RAB, ROUNDOVER, CHAMFER, BEVELS
  - Epicor part for edgebanding
- Comments: short and concise
- All text below headers in ALL CAPS

### Hardwoods List
- Includes all solid wood parts
- Custom sorted by:
  - Material
  - Thickness
  - Width
  - Length

### Board Feet
- Used to verify BOM quantity after populating hardwoods list

## 7. Lay-Up Summary

Created when pre-laminating material is required.

Includes:
- Material code (Rhino layer name)
- Description
- Materials being glued up
- Quantities

Naming Convention:
```
PRE_EpicorPartNumbersWithoutZeros_MetricThicknessInMM
```
(e.g., PRE_438_331_7_19)

## 8. Troubleshooting

### Common Issues

**Parts not laying flat correctly**
- Verify parts are on correct material layers
- Check that parts are closed polysurfaces
- Ensure parts are not grouped incorrectly
- Try running Lay Flat on individual parts

**Nesting optimization fails**
- Verify material sizes are correct
- Check that parts fit within material dimensions
- Ensure grain direction is properly oriented
- Review part quantities match Epicor

**Master Parts List quantities don't match**
- Verify all parts are included (except MT parts)
- Check that nested sheets are properly paired
- Ensure beam saw parts are accounted for
- Re-run Sheet Pairing if needed

**Machining geometry not generating**
- Verify parts are named correctly
- Check that material thickness matches layer naming
- Ensure parts are on correct material layers
- Review Geometry Creation script settings

**Can't find PE release files**
- Verify job was released in Epicor
- Check correct project folder location
- Confirm file naming matches Epicor job number
- Contact FE if files are missing

