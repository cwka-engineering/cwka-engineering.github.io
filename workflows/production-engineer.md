---
layout: default
title: Production Engineer (PE) Workflow
permalink: /workflows/production-engineer.html
---

# Production Engineer (PE) Workflow Outline

## 1. Overview

The Production Engineer (PE) workflow is focused on preparing jobs for production.

## 2. Templates & File Structure

### Templates
Located in:
```
Box\CWKA Team Folders\EngineeringTeam\Production Engineering\PE to Floor SOP\TEMPLATES
```

### File Structure
Files produced by PE are stored on the Z: drive.
- Copy the template folder into the respective project folder and rename it using the PROJ.JOB naming convention (e.g., 1086.018).
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
- Ensure material layers match Epicor BOM
- Ensure all parts are named
- Use Rhino commands to check:
  - SelDup – for duplicate parts
  - SelBadObjects – for bad geometry
  - SelOpenPolysrf – for open polysurfaces
- Ensure scribe is added if needed
- Confirm Epicor production quantity matches modeled quantity
- Ensure parts are modeled respecting:
  - Material sizes
  - Machining requirements (e.g., dowels, hardware, cutouts, dados/rabs)

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

