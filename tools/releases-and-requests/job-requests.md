---
layout: default
title: Job Requests
permalink: /tools/releases-and-requests/job-requests.html
parent: Releases & Requests
grand_parent: Tools
nav_order: 2
---

# Job Requests

The Job Requests flow handles new ERP job creation requests from the shop floor or project management. Submit a Microsoft Form and the flow simultaneously creates a Planner task for the operations team and posts a notification to the **Job Requests** channel in Teams.

> **Related**: [Job Management](/tools/epicor/job-management.html) | [Manufactured Metal Parts & M Jobs](/tools/epicor/manufactured-parts-jobs.html)

---

## How to Submit a Job Request

### Step 1 — Open the Form

Navigate to the Job Requests Microsoft Form. The link should be pinned in your project Teams channel or provided by your supervisor.

### Step 2 — Fill Out the Form

The fields you see depend on the **Job Type** selected.

#### Fields present on all submissions

**Site** — Select NY (New York) or CO (Colorado). This controls which team is notified and which Planner bucket your task is created in.

**Job Type** — Two primary categories:
- **Engineering – Manufactured Part** — a part requiring fabrication engineering input (mill, metal, finish, or other operations)
- **PM job types** — project-management-initiated jobs such as warranty work, truck jobs, or sub-contract jobs

**Need-By Date** — The date the job is needed. The Planner task due date is set to one day after this date.

#### Engineering – Manufactured Part fields

| Field | Description |
|---|---|
| Part Number | Part number or identifier for the manufactured part |
| Job Description | Short description of the work to be performed |
| Mill Operations | Milling operations required (e.g., CNC routing, profiling) |
| Metal Operations | Metal fabrication operations required (e.g., welding, bending) |
| Finish Operations | Finishing operations required (e.g., painting, laminating) |
| Other Operations | Any additional operations not covered above |
| Part Drawing | URL or file path to the part drawing or reference geometry |

#### PM job fields

| Field | Description |
|---|---|
| Project ID | ERP project number this job should be associated with |
| Job Description | Scope of work for the new job |
| Truck ID | Truck or delivery identifier, if applicable |
| Original Job & SC | For sub-contract or warranty jobs — original job number and sub-contract reference |
| Warranty Job | Whether this is a warranty job (Yes / No) |
| Fab Engineer | Fabrication engineer assigned to or responsible for this job, if known |
| Drawing / Sketch URL or Path | URL or file path to relevant drawings or sketches |

### Step 3 — Submit

Click **Submit**. No further action is required. The flow runs within seconds.

---

## What Happens After You Submit

**Planner task:** A task is created in the Releases & Requests Planner plan, assigned to the operations team for your site. The due date is set to one day after your Need-By Date. The task notes are populated with all fields from your submission, including the drawing path.

**Teams notification:** A message is posted to the Job Requests channel, tagging the @NY or @CO team. The layout differs by job type — Engineering submissions show operations fields; PM submissions show project and job details.

---

## Troubleshooting

**Nothing appeared in Teams or Planner after submitting.** Wait up to 60 seconds. If still nothing, verify you are signed in with your `@digifabshop.com` account. Contact **[engineering admin / flow owner]** if the problem persists.

**Task was assigned to the wrong team / went to the wrong bucket.** Task routing is determined solely by the **Site** field. Confirm you selected the correct site. If the assignments themselves need updating, contact the flow owner.

**I need to correct a submitted request.** There is no edit or recall function. Post a correction reply directly in the Teams thread created by the flow, or contact a flow administrator to manually update the Planner task.

**The task due date looks wrong.** The due date is always set to one calendar day after the Need-By Date you entered.

---

## Questions or Issues

Contact **[engineering admin / flow owner]** for anything that looks wrong or if a request gets stuck.
