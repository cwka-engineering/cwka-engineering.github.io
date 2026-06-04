---
layout: default
title: FE to PE Release — Channel Flow
permalink: /tools/releases-and-requests/fe-to-pe-release-flow.html
parent: Releases & Requests
grand_parent: Tools
nav_order: 3
corpus_tags: [fe-release]
---

# FE to PE Release — Channel Flow

> This page documents the Teams channel submission step of the FE-to-PE handoff. The full release process — diagnostic tool, release checklist, production drawings folder — is covered in [FE to PE Release](/workflows/fe-to-pe-release.html).

When a scope is ready for Production Engineering pickup, submit the FE to PE Release form. The flow automatically notifies the relevant PE contacts in the **FE to PE Releases** channel based on the project.

---

## How to Submit a Release

### Step 1 — Open the Form

Navigate to the FE to PE Release Microsoft Form. The link should be pinned in your project Teams channel or provided by your project lead.

### Step 2 — Fill Out the Form

All fields should be completed before submitting.

| Field | Description |
|---|---|
| **Your Name** | Your full name as it should appear in the Teams notification under "Submitted By" |
| **Project** | The project identifier exactly as it appears in ERP — e.g. `1098 - JS PERROTT - MICROSOFT GIX` or `CHIPOTLE`. The flow uses this field to route your notification, so spelling and formatting matter. See the Project Routing Reference below. |
| **Job Number** | The ERP job number associated with the part being released |
| **Part Name** | The part name or identifier being released to PE — typically the Rhino model or drawing name |
| **File Path** | Full file path to the release package (Box, network share, or other location). Multiple paths can be entered on separate lines. |
| **Site** | **NY** (New York) or **CO** (Colorado) — controls which location tag is @mentioned for projects with site-specific routing |
| **Notes** | Additional context for the PE team — revision notes, open items, special instructions. Leave blank if none. |

### Step 3 — Submit

Click **Submit**. The flow runs automatically within a few seconds. No further action is needed.

---

## What Happens After You Submit

The flow evaluates your **Project** field against every active project routing rule and posts a formatted message to the **FE to PE Releases** channel, @mentioning the relevant contacts:

```
PROJECT:      [your project entry]
JOB:          [your job number]
PART:         [your part name]
Submitted By: [your name]

@[location or project tag]  @[named contacts for this project]

FILE PATH:
[your file path, one line per entry]

NOTES:
[your notes, one line per entry]
```

All timestamps are converted to **Eastern Time**.

---

## Project Routing Reference

The flow matches your Project field using a **contains** check — entering `1098 - JS PERROTT - MICROSOFT GIX` will correctly trigger the `1098` rule. Numeric project codes are not case-sensitive; named projects like `CHIPOTLE` and `TATTE` must be in all-caps.

| Project | Trigger keyword | @Mentioned contacts |
|---|---|---|
| CHIPOTLE / HABANERO | `CHIPOTLE` or `HABANERO` | @NY-tag, Sadarah B., Amanda T., Mike C., Justin M. |
| 8543 – Cross Mgmt / Birdcage | `8543` | @NY-tag, Duncan S., Justin M. |
| TATTE | `TATTE` | @NY-tag, Scott C., Jennifer R., Justin M. |
| JUDD | `JUDD` | @NY-tag, Jennifer R., Justin M. |
| 1128 – Sebastian / Scenic Boathouse | `1128` | @NY-tag, Lucia T. |
| 1107 – Tacklebox / Yono Sushi | `1107` | @NY-tag, Justin M. |
| 1094 – Hermes / DC | `1094` | Location tag (NY or CO) |
| 1098 – JS Perrott / Microsoft GIX | `1098` | @CO-tag |
| 1102 – 432 Park Ave | `1102` | Location tag (NY or CO) |
| 1101 – JLC / Reeds | `1101` | @CO-tag |
| 1103 – JLC / Orrs | `1103` | @CO-tag |
| 1085 – Lucas Museum of Narrative Art | `1085` | Location tag (NY or CO) |
| 1108 – Jim Moran Formwork | `1108` | Location tag (NY or CO) |
| 1005 – Milken | `1005` | Location tag (NY or CO) |

> This table reflects the routing rules at the time of last update and may not include newly added projects. If your project is not listed, the flow will receive your submission but will not post a notification. Contact the flow owner (j.skulski@digifabshop.com) to have your project added.

---

## Troubleshooting

**Nothing appeared in Teams after submitting.** Wait 30–60 seconds. Check that the project name in your submission matches the trigger keyword in the routing table above. If the project is unlisted, the flow runs successfully but posts nothing.

**The wrong people were notified.** The recipient list is hardcoded per project rule. If your project's contacts have changed, the flow definition needs to be updated. Contact the flow owner.

**I entered multiple file paths but they are not rendering correctly.** Each path must be on its own line (press Enter between paths, not a comma or semicolon).

**I need to submit a release for a project at both NY and CO sites.** Submit one form entry per site, selecting the appropriate Site value each time.

**I made an error after submitting.** There is no edit or recall function. Post a correction reply directly in the Teams thread created by the flow.

---

## Questions or Issues

Contact the flow owner at j.skulski@digifabshop.com for routing changes or flow issues.
