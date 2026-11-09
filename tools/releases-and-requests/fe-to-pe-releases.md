---
layout: default
title: FE to PE Releases
permalink: /tools/releases-and-requests/fe-to-pe-releases.html
parent: Releases & Requests
grand_parent: Tools
nav_order: 3
---

# FE to PE Releases

> This page is the form and the channel thread. The checklist, the model prep, and the Epicor boxes you still tick are in [FE to PE Release](/workflows/fe-to-pe-release.html).

When a job is ready to leave fabrication engineering, submit the **FE to PE Release** form in the Airtable base **Releases & Requests**. One submission is one job. The form checks the model, copies the handoff, and posts the result in this channel.

## What you submit

| Field | What to enter |
|---|---|
| **Job** | One job. To release several jobs, submit once for each |
| **Release type** | Complete, Partial, or Final partial. Leave the number blank unless you need a specific partial number |
| **Release job in Epicor?** | Yes asks the flow to set the job Released when every gate below is clear. No leaves Epicor as it is |
| **Box link** | A link that opens the PE model, or blank. Blank sends the form to the newest PE-named `.3dm` in the job's `01_FE_Models` folder |
| **Notes** | Copied onto the channel post. Handoff-meeting requests and late-start coordination go here |

There is no site field. The release post mentions the project's PM and one site tag. CWK Associates is `@CO`. Digifabshop is `@NY`. A project whose name contains the word CMG is posted and mentions nobody.

The link has to open a PE file: a name ending in `_PE.3dm`, or `_PE` followed by a date and then `.3dm`. A name ending in `_FE.3dm` is the working model. If you link an `_FE` file, or leave the link blank, the release looks in the job's `01_FE_Models` folder and takes the newest PE-named `.3dm`.

Save that model here before you submit. The project folder is the one under Awarded whose name starts with the project number.

`Awarded` / the project folder / `03 Engineering` / `02_WORKING_Drawings_Models` / `01_FE_Models` / a folder whose name starts with the job number

A dot release such as `1148.032.1` often has no folder of its own. Its PE file can sit in the parent job's folder, and the file name has to start with the full number.

## What comes back

You get two Teams messages, and the same filing result is posted in **FE to PE Releases** and in the project's **General** channel.

1. **The check.** The verdict, the file name, the counts, and one link to the findings workbook. The workbook is also saved next to the model. A failed check still files the handoff. Fix the errors before the next release. **Could not run** means nothing was checked and nothing was filed. Fix the link or the file and submit again.
2. **The filing.** What was copied into `Fabrication_Handoff`. A file already in that folder under the same name is left as it is.

The handoff folder is:

`Awarded` / the project folder / `03 Engineering` / `02_WORKING_Drawings_Models` / `03_PE_Releases` / the job folder / `Fabrication_Handoff`

The form copies the PE model, renamed with the date and a partial number when you asked for a partial. It copies the approved submittal when one is already on file: a PDF in `01_Outgoing` whose name ends in `for record.pdf`, or, if there is none, the newest PDF in `02_Returned`. It writes the shipping-components workbook from UD40 for a standard job. A manufacturing job does not get that workbook. A CMG list stays in UD37, so a CMG job gets no workbook from the form.

A veneer takeoff, a cut sheet, or any other extra document is still copied into `Fabrication_Handoff` by you. The form does not go and find it.

The project's General channel gets the same filing result without the PM and site mentions. A CMG project skips that General post. The Releases channel still gets it.

## When Epicor is set Released

Released is set only when every one of these is true:

1. You answered Yes to **Release job in Epicor?**
2. The check ran and found no errors, and the check's Epicor rules ran.
3. The job is already approved.
4. The job is a standard job. A manufacturing job is left as it is.
5. The project name does not contain the word CMG.

Any other case leaves the job as it is, and the post names the reason. The flow never clears Released. The files can still be in the handoff. `@release-bot`, below, can set or clear Released without these gates.

## Later partials

The first release of a job is the form. That opens the thread. You do not open the form again for the next partial.

1. Add this partial's files to the same `Fabrication_Handoff`. Put `_PARTIAL-NN` in the file name, using the partial's number (`_PARTIAL-02` for partial 2). Leave the earlier files in place.
2. Reply under that job's release post: `@release-bot PARTIAL RELEASE 2`, plus a short note of what this partial contains. In that same reply, @ the project PM and `@NY` or `@CO`. The bot's answer does not ping them. A CMG partial mentions nobody.
3. Use `PARTIAL RELEASE` for every partial, including the last one. The number is the one you type, from 1 to 99. The job comes from the post.

`FULL RELEASE` records a complete release. The form does not write the record the bot counts, so `FULL RELEASE` on a thread that only has a form filing is stored as a complete release.

`@release-bot STATUS` reads whether the job is Released, whether it is approved, and how many releases the bot has recorded. It can show none recorded just after the form filing. The Epicor line is the live flag. `@release-bot UNRELEASE` clears Released and leaves the date Epicor stamped. `@release-bot HELP` lists the commands.

Recording a partial runs only when your Teams display name matches a name on the People list. `STATUS` and `HELP` answer for anyone who can post in the thread. If the reply says the command is still working, wait and send `STATUS`. Sending `PARTIAL RELEASE` again records another row.

A reply that does not mention `@release-bot` is conversation. It leaves the folder and Epicor as they are. The bot does not check a model and does not copy files. Use the form again when a new PE model needs the check, or when you want the form to copy the files.

## For project managers

You do not submit this form. Read the reply in **FE to PE Releases**. You are @mentioned there, with the site tag, on the form's post. General carries the same result without those mentions. A CMG release mentions nobody and does not get the General post.

| Line | Meaning |
|---|---|
| Complete release, Partial release, or Final partial release | What FE asked to hand off |
| The folder link | `Fabrication_Handoff` for that job |
| A file marked already there | A previous release left that file in place |
| QC check: passed | The model had no errors |
| QC check: failed | The model had errors. The files were still handed off |
| Released in Epicor | The job was set Released |
| Epicor: … | The job was not set Released. The rest of the line is the reason |

A later partial pings you only when FE types the mention in that reply. `@release-bot STATUS` under the job's post reads the live flag. General does not accept the bot.

## Questions or issues

Contact Fernando Saucedo or Caleb Marhoover if the check cannot run twice, the wrong model is filed, or the channel post does not match the folder.
