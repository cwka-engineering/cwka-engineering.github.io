---
layout: default
title: Glossary
permalink: /overview/glossary.html
---

# Engineering Glossary

## Roles & Phases

- **DE (Design Engineering)**: Phase that converts approximate geometries to precise geometries, develops build strategies and assembly details
- **FE (Fabrication Engineer)**: Engineer responsible for developing design engineering geometries into fabrication-ready geometries and creating shop drawings
- **PE (Production Engineer)**: Engineer responsible for toolpaths, reference geometries, and production programming
- **EA (Engineering Assistant)**: Support role managing Epicor materials database and job creation
- **PM (Project Manager)**: Manages project coordination and client communication
- **PA (Project Advisor)**: Reviews and approves build strategies before FE release

## Job Types

- **Engineering Jobs**: Jobs that start with "E" and match 1:1 with production jobs (e.g., E1095.015)
- **Submittal Jobs**: Engineering jobs for work before client approval (operation: Submittal)
- **Post-Submittal Jobs**: Engineering jobs for work after client approval (operation: Post-Submittal)
- **Manufacturing Jobs**: Production jobs with format Project.Job (e.g., 1095.015) - have PE operation
- **Bucket Jobs**: Project-wide tasks like design, coordination, meetings, BIM (e.g., PROJ.ENG)
- **WC Jobs**: Wood Component manufacturing jobs (format: Project.W.000)
- **MT Jobs**: Metal Component or Kit of Parts manufacturing jobs (format: Project.M.000)
- **SMP Jobs**: Sample jobs (format: XXX.SMP.XXXXX)
- **Group Submittal**: A package of multiple jobs submitted together to the client (1 submittal doc → multiple production jobs)
- **Primary Job**: Subset of the project or group submittal

## File & Naming Conventions

- **BOM (Bill of Materials)**: List of materials and hardware required for a job
- **SC (Shipping Component)**: Logical grouping of parts for shipping (e.g., SC005)
- **SK**: Sketch or cut sheet for CNC machines
- **MFG**: Manufactured parts from feeder jobs
- **WC**: Wood Component
- **MT**: Metal Component
- **IP**: Kit of Parts

## Epicor Terms

- **Submittal Dashboard**: Homepage for FEs showing submittal and post-submittal work. Must launch from CW site but includes assignments from both sites. Pulls in information from other dashboards (PE start dates, submittal status, hours).
- **Production Report**: Screen for updating submittal statuses and tracking manufacturing jobs
  - **Global Production Report**: Read-only, all open jobs from both sites
  - **Site-Specific Production Report**: Updatable, jobs for one site (CW or DF)
- **Job Entry**: Screen for managing and releasing jobs
- **UD40 (UD40IN)**: Shipping Components - Kinetic workbench. Future enhancement: toolkit may directly publish SC data here.
- **Project Materials Dashboard**: View all materials for all jobs on a project in one place
- **Material Transmittal Log**: Backend for Rhino toolkit to print material tags and specifications
- **Submittal Scope**: What appears on all pages as page titles. May differ from actual Epicor job number (e.g., catalog items).
- **Engineering Bucket Jobs**: Project-wide tasks (format: PROJ.ENG). Operations include: Design, Engineering, Fabrication Engineering, Lead Coordination, Project Meetings, BIM Coordination.
- **Time Phase Inquiry**: Shows which jobs a material code is currently BOM'd to (demand tracking)
- **Part Transaction History**: Shows inventory history (credits/debits) for any material code
- **Cycle Count**: Shows current on-hand quantities for materials in current site

## Drawing & Layout Terms

- **T00**: Title Sheet
- **G00**: General Requirements and Schedules
- **1XX**: Reference Plans
- **2XX**: Shop Drawings
- **3XX**: Install & Shipping Drawings
- **4XX**: Fabrication Supplements
- **SKXX**: Sketches (not for submission)
- **Detail View**: Specific view on a layout page. Must be locked once finalized to prevent accidental shifting.
- **Clipping Plane**: Creates section cuts through geometry. Can set custom depth to control visibility range.
- **Section Style**: Hatch pattern assigned to a layer. Configured in Layer Manager > Section Style column.
- **Name Positions**: Time-stamped locations of parts in Rhino space. Used to toggle between assembled and exploded views.
- **Master Parts List (L00)**: Standardized parts schedule format for drawing sets (targeted list, not comprehensive PE Excel).
- **Pick List (L001)**: Backend model space page for BOM information during design (not typically printed externally).

## Material Terms

- **Lay-up**: Pre-laminated material assembly
- **Edgebanding (EB)**: Material applied to exposed edges
- **Scribe**: Oversized dimension for field fitting
- **VIF (Verify in Field)**: Dimensions to be verified on-site

## Tools & Systems

- **Engineering Toolkit**: Grasshopper-based toolkit for Rhino integration with Epicor
  - **FE Toolkit**: Currently available, PE toolkit in development
  - **Synapse**: Plugin required for toolkit - enables custom UI within Rhino
  - **Package Manager**: Rhino 8 built-in plugin manager (like an App Store)
- **Toggl**: Time tracking application used for time entry
  - **Client** (in Toggl): Maps to Project Number in Epicor
  - **Project** (in Toggl): Maps to Job Number in Epicor
  - **Tag** (in Toggl): Maps to Operation in Epicor
- **Bluebeam**: PDF editing and markup software
- **Rhino**: 3D modeling software
- **Grasshopper**: Visual programming environment for Rhino
- **Office MES**: Digital time clock in Epicor for time entry

