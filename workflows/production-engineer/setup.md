---
layout: default
title: Setup & Organization
permalink: /workflows/production-engineer/setup.html
nav_order: 1
parent: Production Engineer (PE)
grand_parent: Workflows
---

# Setup & Organization

> **Related**: [Folder Structure](/reference/folder-structure.html) | [Layer Organization](/standards/layer-organization/)

## How do I set up the PE folder structure for a new job?
{: #how-to-setup-pe-folder}

Copy the template folder from `Box\CWKA Team Folders\EngineeringTeam\Production Engineering\PE to Floor SOP\TEMPLATES` into the respective project folder on the Z: drive. Rename using PROJ.JOB convention (e.g., `1086.018`). The template contains `Production_Files` and `Production_Drawings` subfolders pre-populated with placeholders.

## How do I set up the SHOP model from an FE release?
{: #how-to-setup-shop-model}

Open the PE Rhino file from `Production_Files`. Verify the FE layer structure is intact (`03_CWKA-FE`). Create the `04_CWKA-PE` layer with `MACHINING` sublayer for all programming geometry (perimeters, cutouts, pockets, drill points, surfaces). Use the PE naming conventions for machining layers (e.g., `THRU CUT OUT 1.5`, `8MM DRILL PT 0.25`).

## Templates

Located in:
```
Box\CWKA Team Folders\EngineeringTeam\Production Engineering\PE to Floor SOP\TEMPLATES
```

## File Structure

Files produced by PE are stored on the Z: drive.

1.  Copy the template folder into the respective project folder and rename it using the PROJ.JOB naming convention (e.g., 1086.018).
2.  Follow the [Folder Structure](/reference/folder-structure.html#03_pe_releases) standards for organization.
3.  Inside each job folder, there are two subfolders:
    -   `Production_Files`
    -   `Production_Drawings`

### Production_Files Includes
-   Mastercam Files – for CNC program files
-   Rhino_Files – exported Rhino files for Mastercam programming
-   Machining_Posts – posted programs per machine
-   PE Rhino file
-   Shipping Component list – provided by Fabrication Engineer (FE)
-   Master Parts List
-   Lay-Up Summary template

### Production_Drawings Includes
-   Shop drawings – prepared by FE
-   CNC SK's
-   WATERJET SK's

## Rhino Layer Management

### Layer Structure

All geometry created by PE lives under the layer:
-   **04_CWKA-PE**

For complete layer organization standards, see [Layer Organization](/standards/layer-organization/#04_cwka-pe-production-engineering).

A sublayer named **MACHINING** is created under `04_CWKA-PE` for all programming geometry:
-   Perimeter geometry
-   Cutouts
-   Pockets/Rabs/Dados
-   Center lines
-   Drill points
-   Surfaces

### Naming Conventions

-   **Perimeter cuts**: `THRU CUT OUT 1.5` → 1.5 = material thickness
-   **Cutouts**: `THRU CUT IN 1.5`
-   **Pockets/Rabs/Dados**: `1/2" POCKET 0.375` → 1/2" = bit diameter, 0.375 = depth from spoilboard
-   **Drill points**: `8MM DRILL PT 0.25` → 8MM = bit diameter, 0.25 = depth from spoilboard
