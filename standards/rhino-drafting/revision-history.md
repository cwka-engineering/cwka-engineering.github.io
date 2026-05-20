---
layout: default
title: Revision History
permalink: /standards/rhino-drafting/revision-history.html
nav_order: 10
parent: Rhino Drafting Standards
grand_parent: Standards
---

# Revision History

Standards for recording and marking drawing revisions in submittal sets.

> **Related**: [Submittal Review Cycle](/workflows/fabrication-engineer/submittal-review.html) | [Cover Sheet & Common Pages](/standards/rhino-drafting/cover-sheet-common-pages.html) | [Annotations](/standards/rhino-drafting/annotations.html)

## Drawing Template Revision Devices

The standard drawing template provides three revision tracking elements that must all be used together:

- **Revision symbol**: A triangle with the revision number inside, placed adjacent to the affected area on the drawing
- **Revision notes**: A section of the titleblock where the FE briefly describes what changed in each revision
- **Revision log**: A table in the titleblock recording the revision number, date of reissue, and FE initials — populated by editing Document UserText fields (`REV_0_DATE`, `REV_0_INITIALS`, where `0` is the revision number)

## What Triggers a Revision

A revision occurs each time a submittal drawing completes one full client review cycle:

1. FE issues the drawing set to the client (Revision 1 is the first issued set)
2. Client returns the set as **Revise and Resubmit** or **Revise for Record**
3. FE revises and reissues — this becomes the next revision number

Each issue-and-return cycle produces exactly one revision increment, regardless of how many individual changes are made within that cycle.

## What Does NOT Trigger a Revision

Internal feedback — from any source, at any stage — does not constitute a revision. This includes:

- PM comments during internal review
- PA review comments before client submission
- Engineering Director or lead engineer feedback
- Any internal back-and-forth prior to the drawing leaving the building

Revisions are a record of the client review history, not the internal development history.

## How to Apply a Revision

When a revision is required on any page of the drawing set:

1. **Make the changes** to the design and all affected details
2. **Cloud bubble**: Enclose the altered area within a revision cloud
3. **Revision symbol**: Place the triangle symbol with the current revision number alongside the cloud bubble
4. **Revision notes**: Briefly describe the change in the Revision Notes section of the titleblock
5. **Revision log**: In the titleblock, enter your initials and the date of reissue by updating the Document UserText:
   - `REV_0_DATE` → date of reissue (where `0` = revision number)
   - `REV_0_INITIALS` → your initials

Apply revision markings to every page that was changed. Pages with no changes carry forward without new clouds or symbols.
