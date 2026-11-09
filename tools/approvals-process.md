---
layout: default
title: Submittal Approval
permalink: /tools/approvals-process.html
parent: Tools
nav_order: 2
corpus_tags: [fe-submittal]
---

# Submittal Approval

> **Related**: [Submittal Review Cycle](/workflows/fabrication-engineer/submittal-review.html) | [Project Delivery Overview](/onboarding/project-delivery.html) | [Material Transmittal Log](/workflows/fabrication-engineer/material-transmittal.html)

When an engineer asks you to approve a submittal, you get an approval card in Teams. The first PM to answer decides. Approve to file the package for the client. Reject to send it back with your comments.

The card is this shop-drawing package. It arrives after the form files the package, once for this issue, and you answer before you send the set. Build strategy is reviewed with the Project Advisor in the working session before modeling, and with the lead as the approach is set. That sign-off is the **PA Approved** checkbox, checked before release to PE.

You do not build the package. The form has already put a cover, a title sheet, and the schedules in front of the engineer's PDF. The engineer submits that form. This page is how you answer the card. The engineer's steps are the [Submittal Review Cycle](/workflows/fabrication-engineer/submittal-review.html).

The finish, veneer, and general material tags on those sheets are the project's [Material Transmittal Log](/workflows/fabrication-engineer/material-transmittal.html) as it stands when the engineer submits. Keep that log accurate and current. A missing, old, or wrong entry is what the package shows.

## Installing the Approvals App
{: #how-to-install-approvals-app}

The card arrives in the Approvals app in Microsoft Teams. Navigate to the Teams app store, search for "Approvals," and click "Add" if it is not already installed. You answer the card there. You do not build the request in the app.

## The card
{: #how-to-submit-for-approval}

1. Keep the Transmittal Log current before the engineer submits.
2. The card names the scope and revision, who requested it, and the review file. It includes the drawing-check results.
3. The same request is posted, in short form, in the project's **General** channel. A project whose name contains the word CMG skips that post. The card still comes to you.
4. If several PMs are on the project, each can receive the card. The first answer is the one that counts. Agree with the other PMs before you answer when the decision is shared.

## Open the file, then answer
{: #how-to-respond-to-denial}

Open the review file from the link on the card before you answer. That file is the package in the job's `00_Internal_Review` folder. The project folder is the one under Awarded whose name starts with the project number.

`Awarded` / the project folder / `03 Engineering` / `03_OUTGOING_Submittals` / the job or group folder / `00_Internal_Review`

- **Approve.** Findings never block an approval. Approve with findings showing when they are acceptable.
- **Reject** when the drawings need a change. Put the comments on the card. Those comments are what the engineer receives.

### After you answer

- **Approve.** The engineer is told, and the same PDF is copied to `01_Outgoing`. Older files there move to `Archive`. General gets the result. You still send the set to the client. If the review file has markups, the clean export is still yours. Architect markups still go in `02_Returned`.
- **Reject.** The engineer is told, with your comments. Nothing is copied to `01_Outgoing`. General does not get an approval post. Epicor is left as it is. The engineer revises the drawings and submits again.
- A newer request for the same submittal replaces yours. The earlier card no longer counts. Answer the new one.

Reminders go to the approvers on working days. After three working days the requester is told the card is still open. A weekly reminder follows while it stays open.

## Epicor
{: #how-to-track-submittal-status}

Approving sets the job to **Submitted**, or to **Resubmitted** when it was revise and resubmit, and stamps the date. A job that is already further along is left as it is. Rejecting leaves Epicor as it is. A project whose name contains the word CMG is left unchanged either way.

You do not type this status yourself. The field is on the [Production Report](/tools/epicor/production-report.html) and the [Submittal Dashboard](/tools/epicor/dashboards.html#submittal-dashboard).

## Transmittal draft

Approving today files the PDF, tells the engineer, and writes Epicor as above. A filled letter-of-transmittal workbook is built and switched off, so an approval does not create one. The letter of transmittal is still yours to complete and send.

## The job thread

A parent job gets a thread in the project's General channel. The first reply names the Submittal engineer and asks the team to use that thread for job-specific issues. Use it for questions about that job. The approval itself is the card.

## Drawing Stamps
{: #how-to-stamp-approved-set}

Stamps are available for marking a drawing package. They are formatted to fit the "Production Notes" area in the upper-right corner of the drawing template. The approval card does not place a stamp. Use one when the package you are sending needs it.

### Importing Stamps

- Release stamps are in the Engineering Team Box folder. Use Box Drive to sync that folder.
- In Bluebeam, go to "Tools," hover over "Stamp," select "Change Stamp Folder," and choose the synced Box folder.
- Contact the Engineering team lead for the folder path if it is not already configured.

### Placing a Stamp

- Click the stamp, then place it near the "Production Notes" area.
- Turn on Bluebeam grid snaps for alignment.

## Notes

- The first answer wins.
- Comments on a rejection are the instruction the engineer revises from.
- A CMG project still needs your answer. The General post and the Epicor update are skipped.
- Avoid moving or renaming the review file in Windows Explorer. The card links to it.
- Contact Fernando Saucedo or Caleb Marhoover if the card does not arrive, the review link does not open, or an old card is still waiting after a newer request went out.
