---
layout: default
title: Submittal Review Cycle
permalink: /workflows/fabrication-engineer/submittal-review.html
parent: Fabrication Engineer (FE)
grand_parent: Workflows
nav_order: 11
---

# Submittal Review Cycle

The three-folder workflow for submitting, reviewing, and revising shop drawings.

> **Related Documents**: [Approvals Process](/tools/approvals-process.html) | [PE Release Preparation](/workflows/fabrication-engineer/pe-release-prep.html) | [Folder Structure](/reference/folder-structure.html)

## Overview

Completed shop drawings follow a three-folder workflow under `03_OUTGOING_Submittals/[PROJ.JOB_ScopeDescription]/`:

```
03_OUTGOING_Submittals/
  PROJ.JOB_ScopeDescription/
    00_Internal_Review/    ← Engineer places drawings here for QA
    01_Outgoing/           ← Clean PDFs sent to client
    02_Returned/           ← Architect markups returned for FE review
```

## Step-by-Step

### 1. Internal Review

- Place completed shop drawings in `00_Internal_Review/`.
- Submit a [PA Approval request](/tools/approvals-process.html) via the Teams Approvals app, attaching a Box link to the internal review PDF.
- The PM reviews first, then the PA. Both add Bluebeam comments to the PDF.

### 2. Revise if Denied

If denied at either stage:
1. Pick up **all** Bluebeam comments from both PM and PA.
2. Revise the drawings.
3. Submit a **new** approval request (do not reuse the denied request).

### 3. Outgoing

After approval:
- The PM exports a **clean** (comment-free) PDF copy to `01_Outgoing/`.
- The PM submits the drawing package to the client/architect.

### 4. Returned

When the architect returns marked-up drawings:
- The PM places them in `02_Returned/`.
- The FE reviews all redlines and incorporates changes.
- If changes are required, the cycle repeats (revised drawings go back to `00_Internal_Review/`).

## Submittal Status Tracking

Track submittal progress in the Epicor [Production Report](/tools/epicor/production-report.html). Update the "Submittal" status field as the submittal progresses:
- Internal Review
- Submitted
- Approved / Resubmitted

## Key Principles

- **Never skip internal review.** All drawings go through PA approval before client submission.
- **Keep folders clean.** Only the current version of a drawing should be in each folder.
- **Pick up all comments.** Both PM and PA comments must be addressed — not just the PA's.
- **Track status in Epicor.** The Production Report is the system of record for submittal progress.
