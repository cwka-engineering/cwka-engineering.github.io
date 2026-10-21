---
layout: default
title: File Naming Conventions
permalink: /reference/reference-tables/file-naming-conventions.html
parent: Reference Tables
grand_parent: Reference
nav_order: 1
corpus_tags: [fe-release]
---

# File Naming Conventions

> **Folders carry the scope description. File names never do.** A job folder is `[PROJ.JOB]_ScopeDescription` (for example `1105.007_Maitre D Stand`). Every file inside it is named from the job number alone, plus the type or date suffix shown below, and **never the scope description**, with one exception: PDF submittal drawings keep `[EpicorCode]_ScopeDescription.pdf`, because they are passed around outside their home folders and nobody viewing a PDF can see the folder it came from. We are already running into file path character limits, and a scope description repeated in both the folder name and the file name is what pushes paths over.

> **Related**: [Folder Structure](/reference/folder-structure.html) | [Part Naming](/workflows/fabrication-engineer/part-naming.html) | [Shipping Components](/workflows/fabrication-engineer/shipping-components.html)

## Rhino Files

| File Type | Convention | Example |
|-----------|-----------|---------|
| FE Rhino model | `[PROJ.JOB]_FE.3dm` | `1094.002_FE.3dm` |
| PE Rhino model | `[EpicorCode]_PE_YYYYMMDD.3dm` | `1105.007_PE_20250124.3dm` |
| PE Rhino model, partial release | `[EpicorCode]_PE_YYYYMMDD_PARTIAL-NN.3dm` (NN starts at 01) | `1105.009_PE_20260105_PARTIAL-02.3dm` |
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
| MFG release folder | `[PROJ.M/W.000]` (Epicor job number) | `1130.M.022/` |

**Never rename a job or release folder once it exists.** Tools and people find it by its name, and a rename breaks every link and path that points at it. In particular, do not add suffixes such as `_Partial Releases`: a partial release goes into the job's existing release folder.

**MFG naming distinction:** The enclosing folder uses the Epicor **job number** with three trailing digits (e.g., `1130.M.022`). The Rhino file within uses the Epicor **part number** with five trailing digits (e.g., `1130.MT.00022_PE.3dm`).

**Part number to job number.** A manufactured part and the job that makes it share the project and the sequence number: `PROJ.MT.000NN` is made by job `PROJ.M.0NN`, and `PROJ.WC.000NN` by `PROJ.W.0NN` (`MT` becomes `M`, `WC` becomes `W`, and the sequence is padded to five digits on the part and three on the job). So `1130.MT.00022` is made by `1130.M.022`. Tools that need to go from one to the other apply this rule and, where they can, confirm it against Epicor, which wins if the two ever disagree.

## Job and Part Numbers

| Type | Format | Example |
|------|--------|---------|
| WC job | `Project.W.000` | `1130.W.022` |
| MT job | `Project.M.000` | `1130.M.022` |
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
| Grouped Submittal (GS) job | `EPROJ.GS.###` | `E1105.GS.001` |

**GS naming note:** Filenames never carry the `E` prefix — the submittal-scope label used in Rhino file names and drawing page titles shows the same number as `PROJ.GS.###`. See [Grouped Submittal (GS) jobs](/tools/time-entry.html#direct-gs-jobs).
