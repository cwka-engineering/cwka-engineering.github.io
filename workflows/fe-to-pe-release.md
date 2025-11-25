---
layout: default
title: FE to PE Release Step by Step SOP
permalink: /workflows/fe-to-pe-release.html
---

# FE to PE Release Step by Step SOP

## 1. Understand the Job Structure

For detailed definitions, see the [Glossary](/overview/glossary.html).

- **Group Submittal**: A package of multiple jobs submitted together to the client.
- **Primary Job**: Subset of the project or group submittal.
- **WC Jobs**: Wood Component manufacturing jobs.
- **MT Jobs**: Metal Component or Kit of Parts manufacturing jobs.

## 2. File Organization & Folder Setup

### Navigate to PE Release Folder
Use Windows Explorer paths (not Box links):
```
C:\BoxSync\Box\Awarded\PROJECT\03 Engineering\02_WORKING_Drawings_Models\03_PE_Releases
```

### Create a New Release Folder
- Copy the template folder: _PROJ.JOB_ScopeDescription
- Example: 1102.011_Maitre D Stand
- Create Missing Subfolders

If not present, and releasing a manufacturing job manually create:
- 00_MT_WC_IP_MfgParts

Include files in their respective folders:
- **Production_Files**
  - Rhino PE Model File
  - Shipping components (SC) list - when releasing a primary job, not strictly required for manufacturing jobs.
- **Production_Drawings**
  - Drawing Set PDF

### File Naming Conventions
- Rhino model: `[EpicorCode]_PE_YYYYMMDD`
- PDF drawings: `[EpicorCode]_ScopeDescription`
- SC List: `[EpicorCode]_SHIPPING_COMPONENTS`

## 3. Model & Drawing Preparation: Drafting Standards

Refer to [Rhino Drafting and Layouts](/standards/rhino-drafting-layouts.html) for detailed drafting standards.

## 4. Epicor Release Process

For more information on Epicor, see [Epicor Usage in Engineering](/tools/epicor-usage.html).

1. Navigate to the UD40: Shipping Components - Kinetic workbench
2. In the shipping components Excel sheet for the job, copy the ProjectID, JobNum, SC PartNum, Description, and Order Qty columns, excluding the headings
3. On the workbench page, right click and Paste New.
4. Repeat this process for all jobs being released (you don't need to refresh the page or save in between, they can all be uploaded at once.)
5. Once all shipping components are added, click update in the top right dropdown, and refresh the page
6. Navigate to the Project using the filter to ensure that all records have been processed successfully.
7. Go to Epicor > Job Entry
8. For each line item on the BOM check the following:
   - Engineering Complete: Quantities verified
   - Fixed Quantity: Checked unless releasing catalog items, confirm with PM or Engineering Director.
   - Make Direct: For manufactured parts only.
   - All materials have a Part Master
9. **NOTE**: All job specific engineering comments associated to BOM materials (eg., "pull from inventory, PM to verify, use alternate if unavailable, etc.") must be appended to the part description in the BOM.
10. Hit BOM Complete: All parts and materials accounted for
11. Hit Release in the Job Entry Page.

## 5. Form Submission (FE to PE Release Form)

Access the form via FE to PE Release Form (typically available through the Engineering Team SharePoint or internal forms system).

**Note**: Ensure all prerequisites from [Phase 3: FE Release to Production Engineering](/overview/project-delivery.html#phase-3-fe-release-to-production-engineering-pe-handoff) are complete before submitting.

### Required Information
Fill in all required fields:
- **Name**: Your name
- **Project**: Project number and name
- **Job numbers**: Include all jobs being released (e.g., 1085.016, 1085.017)
- **Part numbers**: Key part numbers if applicable
- **Site of fabrication**: Manufacturing site location
- **File paths**: Use Windows Explorer file paths (not Box links)
  - Example: `C:\BoxSync\Box\Awarded\1085_ProjectName\03 Engineering\02_WORKING_Drawings_Models\03_PE_Releases\1085.016_Description`
- **Notes**: Include any special instructions or context
  - Example: "Includes PROJ.WC.00007 and PROJ.MT.00003"
  - Note any special handling requirements

Fill in:
- Name
- Project
- Job numbers (include all jobs being released)
- Part numbers
- Site of fabrication
- Use Windows Explorer file paths, not Box links
- Notes on included jobs (e.g., "Includes PROJ.WC.00007 and PROJ.MT.00003")

If releasing a Group Submittal or Primary Job with Manufacturing Jobs:
- Combine the client submittal drawings with the job submittal drawings to provide full context.
- Clearly highlight the job scope in the production drawing set.

