---
layout: default
title: Lead Engineer Responsibilities
permalink: /onboarding/lead-engineer.html
parent: Engineering Roles & Core Competencies
grand_parent: Onboarding
nav_order: 1
---

# Lead Engineer Responsibilities

> **Related**: [Engineering Roles](/onboarding/engineering-roles.html) | [Project Delivery](/onboarding/project-delivery.html) | [Engineer Progression Framework](/onboarding/engineer-progression-framework.html) | [PA Approvals Process](/tools/approvals-process.html)

## The Ad Hoc Designation

"Lead Engineer" is not a permanent hierarchical title — it is a project-level designation assigned based on the specific technical demands of a given scope. The engineer with the most relevant expertise for a project (whether that involves complex metalwork, solid wood components, parametric automation, or site coordination) is designated lead for that project.

This approach keeps leadership anchored to expertise rather than org chart position. A single engineer may be the designated lead on one project while contributing as a non-lead on another running concurrently.

**Project size threshold**: Projects of substantial size (~$350k or larger) require an **FE II** as the designated lead. Smaller or simpler projects may have a single engineer assigned regardless of level, and that engineer works directly with the PA to develop and execute the scope.

**Time code**: Lead coordination work is billable and logged to the **Lead Coordination** operation on the project's `PROJ.ENG` bucket job. This is distinct from PA duties, which are logged to the non-billable **ENG Administration** indirect code.

---

## Relationship to the Project Advisor (PA)

The Lead Engineer and the Project Advisor are **always separate people** on a project. The only exception is an extreme staffing crunch, and even then it should be avoided. The separation exists to force a second set of eyes on major cost drivers — build strategy decisions in particular.

**Division of responsibility:**

| Area | Project Advisor (PA) | Lead Engineer |
|---|---|---|
| Build strategy | **Final authority** — reviews proposals, provides feedback, approves the approach | Primary partner in strategy development; implements approved strategy across the team |
| Detail development | Drives detail development and material selection (where not client-dictated) | First engineer to work through typical details alongside PA; ensures consistent deployment project-wide |
| Internal review | Second approver in the formal PA approval chain | Informal pre-review gate before submittals go to PM/PA |
| Team consistency | Not responsible | Primary agent ensuring all engineers on the project follow the approved approach |

Because PAs are typically among the most time-constrained senior staff, the lead acts as the PA's multiplier on the project floor — absorbing day-to-day technical questions from other engineers, flagging issues that require PA judgment, and keeping the team aligned with approved decisions.

### PA Working Session — Mandatory Kickoff

Upon starting a new project assignment, every engineer — lead or otherwise — must:

1. **Review the scope** — Familiarize yourself with the contract drawings, specifications, and any preconstruction build strategy work already done
2. **Formulate questions** — Develop a list of questions and observations about the elements represented before any modeling begins
3. **Schedule a PA working session** — Request and hold a kickoff session with the PA before proceeding with substantive work

Steps 1–3 should take no more than **3–4 hours** from the moment you are assigned. The PA session must happen before any substantive modeling begins — not after you've spent a day or two developing an approach.

> **Do not work ahead of PA input.** Neglecting to request the PA working session is a frequent cause of downstream problems — rework, misaligned details, and build strategy decisions that have to be unwound late in the process. The PA has often been engaged with the scope since the bid phase; that context must be transferred before work begins.

The lead engineer is responsible for ensuring this session happens not just for themselves, but for every engineer joining the project.

---

## Responsibilities

### Technical Strategy & Workflow

The lead establishes the technical roadmap for the project in collaboration with the PA — not a generic checklist, but a tailored approach for that specific scope.

- **Shared base floorplan**: Establish and maintain the shared Rhino base floorplan for the project team. All engineers must build up from this shared file so that any individual scope model can be pulled into a Rhino worksession alongside others for clash detection and cross-scope coordination at a moment's notice. The shared base file lives at `03 Engineering/02_WORKING_Drawings_Models/02_CoverSheet_CommonPages/`. The lead is responsible for setting up this file, communicating its location to the team, and enforcing its use. If the project contract includes a BIM deliverable, the lead must also ensure the base plan is positioned in model space relative to the datum used by the architect and adjacent subcontractors.
- **Typical details**: Work alongside the PA early in the project to develop a set of typical details that can be deployed project-wide by other engineers who join later
- **Workflow design**: Determine the modeling and drafting pipeline for the project team — e.g., when to use Grasshopper for reconstructive modeling vs. standard Rhino drafting
- **LOD management**: Refine the level of detail in 3D models to ensure suitability for downstream handoffs to other engineers and fabrication teams
- **Data synthesis**: Analyze and reconcile information from architectural drawings, specifications, and site scans into actionable documents for the project team

### Quality Assurance

The lead provides an informal pre-review of project deliverables before they enter the formal PA approval process. This is especially important on teams with junior or recently onboarded engineers.

- **Pre-review**: Review submittal sets and production handoffs for quality and consistency before they go to PM/PA — catch issues internally before they become formal denial cycles
- **Team feedback**: Review work produced by other engineers on the project and provide constructive technical feedback
- **Standards enforcement**: Ensure the project team adheres to modeling, layering, naming, and documentation standards throughout the project lifecycle
- **Detail consistency**: Verify that PA-approved typical details are being correctly and consistently deployed across all scopes and engineers on the project

### Project Coordination & Communication

The lead is the primary engineering liaison between the engineering team and all other departments for the duration of the project.

- **Inter-departmental liaison**: Primary engineering contact for PMs and Project Coordinators; ensures engineering goals align with the production schedule
- **Shop floor engagement**: Maintain active engagement with Job Captains and production management staff while the project is in fabrication, regardless of whether the lead is co-located with the manufacturing facility. Projects may span multiple sites; remote engagement is expected when physical walkthroughs are not possible. Resolve engineering issues surfaced during assembly promptly. Surface recurring fabrication issues or opportunities for improvement back to the engineering team so that downstream projects benefit.
- **Client meetings**: Leads are expected to be present alongside the PM at client meetings
- **Scope escalation**: Monitor scope and identify when technical changes or challenges affect the budget or schedule; escalate to leadership as needed
- **Stakeholder communication**: Translate complex technical information into accessible formats — sketches (SKs), 3D models, spreadsheets — for clients, architects, and installers
- **Material tag coordination**: Collaborate with the PM at project kickoff to review the working set drawings, establish material tags, and confirm TRA log entries before drawings are submitted
- **CD addendum intake**: When the architect issues contract document (CD) addenda after contract award, the PM receives and reviews them first. The lead engineer should also review addenda in a timely manner to identify scope impacts, dimensional conflicts, or drawing coordination issues. Addendum review may not always happen promptly — the lead is responsible for flagging to the PM when addendum review has not occurred and engineering decisions may be affected.

### Project Planning & Budget

- **Task management**: Develop and maintain project-specific engineering task lists and milestones based on the awarded scope
- **Budget oversight**: Proactively track engineering hours and progress against the project labor budget; flag overruns or risks before they become critical
- **Team reporting**: Provide regular updates to department leadership on project team performance and identify options for improvement
- **Schedule communication to PM**: Communicate projected engineering completion dates — submittal readiness, BOM-complete, PE release — to the PM so the milestone schedule can be updated and production can be planned accordingly. Engineering schedule projections are aspirational rather than fixed in most cases, but the PM needs a current best estimate to coordinate the full project timeline. The lead is responsible for keeping the PM's view of engineering status accurate and current.

### Mentorship

The lead provides technical guidance to other engineers on the project team.

- **Just-in-time training**: Provide targeted instruction on project-specific tools or modeling techniques so the team can execute the required build strategy
- **Explicit communication**: Clearly articulate the *why* and *how* of chosen engineering approaches so that everyone — from PM to installers — understands the project logic

### Field & Site Operations

- **Install coordination**: Leads are expected to coordinate closely with the National Install Manager as field installs progress. In-person site visits are uncommon and not a regular expectation.
- **Point cloud usage**: Raw scan data processing requires specialized software and designated trained staff — this is not a lead responsibility. Leads are expected to be proficient at working with processed point clouds provided to them, using them to evaluate site conditions and make informed detailing decisions. Leads should also support other engineers on the project in doing the same.
