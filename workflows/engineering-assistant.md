---
layout: default
title: Engineering Assistant (EA) Workflow
permalink: /workflows/engineering-assistant.html
parent: Workflows
---

# Engineering Assistant (EA) Workflow

> **Related Documents**: [Engineering Roles](/overview/engineering-roles.html) | [Epicor Usage](/tools/epicor-usage.html) | [Project Delivery Overview](/overview/project-delivery.html)

The Engineering Assistant (EA) plays a central role in setting up and managing various job types within Epicor. This document covers the procedures for creating and managing different job types.

## Table of Contents

1. [Primary Job Creation](#primary-job-creation)
2. [Sample Job Creation](#sample-job-creation)
3. [Manufacturing Job Creation](#manufacturing-job-creation-wood-components---wc-and-metal-components---mt)
4. [Job Scheduling](#job-scheduling)

## Primary Job Creation

### Initiate Job Creation

1. **Add Sales Order Line**:
   - Add a new line on the sales order
   - Use the next available job number in the part field
   - Use the Project Manager (PM) provided description
   - Set the quantity on the sales order line to **one (1)**

2. **Configure Line Details**:
   - Input the Project ID in the line details
   - Add the Truck ID on the releases tab

### Configure Job Entry

1. **Open Job Entry**:
   - Open the job in Job Entry
   - Add the job number to the part field

2. **Create Demand Link**:
   - Create a Make to Order demand link
   - Search for the corresponding sales order line

### Define Operations

Add operations under the assemblies tab in the following order:

1. **Production Engineering** - First operation
2. **Subsequent Operations** - Document shop labor hours (recorded under "Production Standard")
3. **Inspection** - Final operation with:
   - No hours attached
   - Marked as "Final Operation"
   - Marked as "Auto Receive"

### Finalize and Schedule

1. **Mark Engineering Complete**:
   - Ensure the "Engineering Complete" checkbox is marked **prior to scheduling**

2. **Save and Schedule**:
   - Save and schedule the job
   - This will populate required-by and start dates based on the Truck ID's ship date

## Sample Job Creation

### Gather Information

Obtain key information from the PM, including:
- Project number
- Transmittal number
- Architectural material tag (ARCH Tag)
- CWKA material tag
- Description of the sample material (e.g., paint code, species, stain, finish, sheen)
- Quantity of samples
- Size of samples
- Truck ID (for the ship date)

### Name and Quantity

1. **Create Job Description**:
   - Use the specified formula: `Project_Name, Transmittal_Number, ARCH_Tag, CWKA_Tag, Description (paint_code, species, stain, finish, sheen, etc), Quantity, and Size`
   - Example: `1085_Lucas Retail, TRA-001, ARCH-01, MDF01, Paint (SW7004, Maple, Dark Walnut, Satin, 30%), 3 samples, 4"x6"`

2. **Set Job Number**:
   - Use the next available job number in the format `XXX.SMP.XXXXX` for the line

3. **Set Quantity**:
   - Set the quantity to **one (1)** on the sales order line
   - The actual quantity of samples is noted in the description

### Demand Link and Operations

1. **Add Project Information**:
   - Add the Project ID
   - Add the Truck ID

2. **Create Demand Link**:
   - Create a Make to Order demand link

3. **Add Operations**:
   - Add **Mill Samples** operation
   - Add **Finish Samples** operation with:
     - Checked as "Final Operation"
     - Checked as "Auto Receive"
   - **Note**: Production Engineering (PE) and Inspection operations are **not required** for sample jobs

### Scheduling and Notification

1. **Mark as Engineered**:
   - Mark the job as Engineered

2. **Set Required By Date**:
   - Input a default required by date of **one week from the request date**, unless a Truck ID is present to populate it

3. **Notify PM**:
   - Notify the PM if the job needs to be assigned to a truck (if no Truck ID was initially provided)

4. **Nonstandard Substrate**:
   - If a sample requires nonstandard substrate, the PM is responsible for:
     - BOMing the material to the Sample Job
     - Marking it "Ready To Purchase (RTP)"

## Manufacturing Job Creation (Wood Components - WC and Metal Components - MT)

### Pre-Requisites

- Create manufacturing jobs **after** the corresponding Manufacturing (MFG) parts have been created
- Ensure MFG parts are BOM'd to their respective primary jobs

### Job Naming and Linking

1. **Format Job Number**:
   - Wood components: `Project_Number.W.000`
   - Metal components: `Project_Number.M.000`

2. **Set Part Number**:
   - The part for the manufacturing job is listed in the MFG part format:
     - `Project_Number.WC.00000` (for wood components)
     - `Project_Number.MT.00000` (for metal components)

3. **Identify Primary Jobs**:
   - Use the "Time Phase" feature (right-click on the part number) to identify all primary jobs where the MFG part is BOM'd

4. **Create Demand Links**:
   - Create a Make to Job demand link for each line of the primary job Bills of Material (BOMs) that include the MFG part
   - **Important**: Ensure the MFG part on the primary job's BOM is marked "Make Direct" for the demand link to be created

### Operations and Scheduling

1. **Add Operations**:
   - Start with Production Engineering as the first operation
   - For complex parts, seek input from:
     - Project Advisor
     - Production Manager
     - Metal Team Lead
   - For simple WC molding profiles, a general rule of thumb can be applied

2. **Add Project Information**:
   - Add the Project ID under the Project tab

3. **Set Required By Date**:
   - Set the Required By date equal to the ship date of the parent (primary) job

4. **Save and Notify**:
   - Save and schedule the job
   - Notify the engineer that the job is created

### Quantity Management

- **If quantity changes**: If the quantity of the part on the primary job changes after a WC job has been requested, it is the Engineer's responsibility to inform the Production Planner of the change
- **Job structure**: WC jobs are typically one-to-one (one part to one job), but a single WC job can produce parts for multiple primary jobs

## Job Scheduling

Job scheduling is handled via the Scheduling Dashboards in Epicor. See [Epicor Usage - Engineering Scheduling](/tools/epicor-usage.html#engineering-scheduling) for detailed procedures.

### Key Responsibilities

- Update job scheduling due to ship date changes using scheduling workbenches in Epicor
- Monitor data health and troubleshoot scheduling issues
- Coordinate with PMs and Engineers on scheduling conflicts

## Related Procedures

- For Epicor navigation and screens, see [Epicor Usage in Engineering](/tools/epicor-usage.html)
- For job release procedures, see [FE to PE Release](/workflows/fe-to-pe-release.html)
- For role overview, see [Engineering Roles](/overview/engineering-roles.html)

