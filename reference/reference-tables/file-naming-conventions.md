---
layout: default
title: File Naming Conventions
permalink: /reference/reference-tables/file-naming-conventions.html
parent: Reference Tables
grand_parent: Reference
nav_order: 1
---

# File Naming Conventions

> **Related Documents**: [Folder Structure](/reference/folder-structure.html) | [Part Naming](/workflows/fabrication-engineer/part-naming.html) | [Shipping Components](/workflows/fabrication-engineer/shipping-components.html)

## Rhino Files

| File Type | Convention | Example |
|-----------|-----------|---------|
| FE Rhino model | `[PROJ.JOB]_FE_[Description].3dm` | `1094.002_FE_CashWrap.3dm` |
| PE Rhino model | `[EpicorCode]_PE_YYYYMMDD.3dm` | `1105.007_PE_20250124.3dm` |
| PE MFG model | `[PROJ.MFGCode.XXXXX]_PE.3dm` | `1130.MT.00022_PE.3dm` |
| Catalog PE model | `[Acct.Cat.###]_PE.3dm` | `CM.BE.001_PE.3dm` |

## Output Files

| File Type | Convention | Example |
|-----------|-----------|---------|
| PDF drawings | `[EpicorCode]_ScopeDescription.pdf` | `1105.007_MaitreDStand.pdf` |
| SC list | `[EpicorCode]_SHIPPING_COMPONENTS.csv` | `1105.007_SHIPPING_COMPONENTS.csv` |

## Folder Names

| Folder Type | Convention | Example |
|-------------|-----------|---------|
| FE job folder | `[PROJ.JOB]_ScopeDescription` | `1094.002_CashWrap` |
| PE release folder | `[PROJ.JOB]_ScopeDescription` | `1105.007_MaitreDStand` |
| MFG release folder | `[PROJ.M/W.000]` (Epicor job number) | `1130.M.005/` |

**MFG naming distinction:** The enclosing folder uses the Epicor **job number** with three trailing digits (e.g., `1130.M.005`). The Rhino file within uses the Epicor **part number** with five trailing digits (e.g., `1130.MT.00022_PE.3dm`).

## Job and Part Numbers

| Type | Format | Example |
|------|--------|---------|
| WC job | `Project.W.000` | `1130.W.005` |
| MT job | `Project.M.000` | `1130.M.005` |
| WC part | `Project.WC.00000` | `1130.WC.00022` |
| MT part | `Project.MT.00000` | `1130.MT.00022` |
| TRA job | `Project.TRA` | `1086.TRA` |
| SMP job | `XXX.SMP.XXXXX` | `1086.SMP.00001` |
| Truck ID | `#### – Truck ##` | `1091 – Truck 01` |
| Change request | `ProjectNumber.CR.##.V##` | `1086.CR.05.V01` |

## Epicor Job Formats

| Job Type | Format | Example |
|----------|--------|---------|
| Engineering job | `EPROJ.JOB` | `E1095.015` |
| Manufacturing job | `PROJ.JOB` | `1095.015` |
| Bucket job | `PROJ.ENG` | `1095.ENG` |
