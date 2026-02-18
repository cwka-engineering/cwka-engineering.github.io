---
layout: default
title: Setup & Organization
permalink: /workflows/production-engineer/setup.html
nav_order: 1
parent: Production Engineer (PE) Workflow
grand_parent: Workflows
---

# Setup & Organization

> **Related**: [Folder Structure](/standards/folder-structure.html) | [Layer Organization](/standards/layer-organization.html)

## Templates

Located in:
```
Box\CWKA Team Folders\EngineeringTeam\Production Engineering\PE to Floor SOP\TEMPLATES
```

## File Structure

Files produced by PE are stored on the Z: drive.

1.  Copy the template folder into the respective project folder and rename it using the PROJ.JOB naming convention (e.g., 1086.018).
2.  Follow the [Folder Structure](/standards/folder-structure.html#03_pe_releases) standards for organization.
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

For complete layer organization standards, see [Layer Organization](/standards/layer-organization.html#04_cwka-pe-production-engineering).

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
