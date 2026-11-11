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

When a job is ready to leave fabrication engineering, submit the **FE to PE Release** form in the Airtable base **Releases & Requests**. One submission is one job. The job stays on the form until Prod Eng is complete, so a released job can still be submitted. The form checks the model, copies the handoff, and posts the result in this channel.

## What you submit

| Field | What to enter |
|---|---|
| **Job** | One job. To release several jobs, submit once for each |
| **Release type** | Complete, Partial, or Final partial. Leave the number blank unless you need a specific partial number |
| **Release job in Epicor?** | Yes asks the flow to set the job Released when every gate below is clear. No leaves Epicor as it is |
| **Box link** | A link that opens the PE `.3dm`, or blank. A name that contains `PE` is the model, including a description between `PE` and the date, wherever the link sits. The handoff copy is renamed with the date |
| **Submittal PDF** | A Box link to the drawing, or blank. Blank takes a For Record PDF in `01_Outgoing`, then the newest PDF in `02_Returned` |
| **Notes** | Copied onto the channel post. Handoff-meeting requests and late-start coordination go here |

There is no site field. The release post mentions the project's PM and one site tag. CWK Associates is `@CO`. Digifabshop is `@NY`. A CMG release is posted with `@CMG`. The PM and the site tag stay off that post.

A linked `.3dm` whose name contains `PE` is the file that is checked and filed. A working `_FE` file, a name without `PE`, a blank link, or a link that will not open sends the release to the newest PE-named `.3dm` in the job's `01_FE_Models` folder. A link that opens the PE file does not have to be moved into that folder first.

When the link is blank or is not a PE file, the form looks here. The project folder is the one under Awarded whose name starts with the project number.

`Awarded` / the project folder / `03 Engineering` / `02_WORKING_Drawings_Models` / `01_FE_Models` / a folder whose name starts with the job number

A dot release such as `1148.032.1` often has no folder of its own. Its PE file can sit in the parent job's folder, and the file name has to start with the full number.

## What comes back

You get two Teams messages. The same filing result is posted in **FE to PE Releases**, replied on the job's log thread (the thread the check opened), and posted in the project's **General** channel.

1. **The check.** The verdict, the file name, the counts, and one link to the findings workbook. The workbook is also saved next to the model. A failed check still files the handoff. Fix the errors before the next release. **Could not run** means nothing was checked and nothing was filed. Fix the link or the file and submit again.
2. **The filing.** What was copied into `Fabrication_Handoff`. Submitting the same release again, the same partial number or another complete release, replaces that handoff file. The earlier file stays in the folder, with superseded and the time in its name. The reply is one line and mentions only the site tag. A shipping-components workbook already in the folder is left alone. When `@release-bot` sets or clears Released, that change is its own line on the job log. A command that leaves Epicor alone adds no line.

The handoff folder is:

`Awarded` / the project folder / `03 Engineering` / `02_WORKING_Drawings_Models` / `03_PE_Releases` / the job folder / `Fabrication_Handoff`

The form copies the PE model, renamed with the date and a partial number when you asked for a partial. It copies the submittal PDF you linked, or, when that link is blank, a PDF in `01_Outgoing` whose name ends in `for record.pdf`, or the newest PDF in `02_Returned`. A link that will not open, or a file that is not a PDF, is set aside and that lookup runs. It writes the shipping-components workbook from UD40 for a standard job. A manufacturing job does not get that workbook. A CMG list stays in UD37, so a CMG job gets no workbook from the form.

A veneer takeoff, a cut sheet, or any other extra document is still copied into `Fabrication_Handoff` by you. The form does not go and find it.

The project's General channel gets the same filing result without the PM and site mentions. A CMG project skips that General post. The Releases channel still gets it.

## When Epicor is set Released

Released is set only when every one of these is true:

1. You answered Yes to **Release job in Epicor?**
2. The check ran and found no errors, and the check's Epicor rules ran.
3. The job is already approved.
4. The job is a standard job. A manufacturing job is left as it is.
5. The project name does not contain the word CMG.
6. The job's company is CWK Associates or Digifabshop. The write goes to that company. Any other company is left unchanged.

Any other case leaves the job as it is, and the post names the reason. The flow never clears Released. The files can still be in the handoff. `@release-bot`, below, can set or clear Released without these gates. That change is a line on the job's log thread.

## Later partials

The first release of a job is the form. That opens the thread. You do not open the form again for the next partial.

1. Add this partial's files to the same `Fabrication_Handoff`. Put `_PARTIAL-NN` in the file name, using the partial's number (`_PARTIAL-02` for partial 2). Leave the earlier files in place.
2. Reply under that job's release post: `@release-bot PARTIAL RELEASE 2`, plus a short note of what this partial contains. In that same reply, @ the project PM and `@NY` or `@CO`. The bot's answer does not ping them. A CMG partial mentions `@CMG`.
3. Use `PARTIAL RELEASE` for every partial, including the last one. The number is the one you type, from 1 to 99. The job comes from the post.

`FULL RELEASE` records a complete release. The form does not write the record the bot counts, so `FULL RELEASE` on a thread that only has a form filing is stored as a complete release.

`@release-bot STATUS` reads whether the job is Released, whether it is approved, and how many releases the bot has recorded. It can show none recorded just after the form filing. The Epicor line is the live flag. `@release-bot UNRELEASE` clears Released and leaves the date Epicor stamped. `@release-bot HELP` lists the commands.

Recording a partial runs only when your Teams display name matches a name on the People list. `STATUS` and `HELP` answer for anyone who can post in the thread. If the reply says the command is still working, wait and send `STATUS`. Sending `PARTIAL RELEASE` again records another row.

A reply that does not mention `@release-bot` is conversation. It leaves the folder and Epicor as they are. The bot does not check a model and does not copy files. Use the form again when a new PE model needs the check, or when you want the form to copy the files.

## For project managers

You do not submit this form. Read the reply in **FE to PE Releases**. You are @mentioned there, with the site tag, on the form's post. General carries the same result without those mentions. A CMG release mentions `@CMG` and does not get the General post. A later submission of the same release is one line, and it mentions only the site tag.

| Line | Meaning |
|---|---|
| Complete release, Partial release, or Final partial release | What FE asked to hand off |
| The folder link | `Fabrication_Handoff` for that job |
| A file marked already there | A previous release left that file in place |
| Partial release n was updated | The same release was filed again. The earlier file is kept, with superseded in its name. The mention is the site tag |
| QC check: passed | The model had no errors |
| QC check: failed | The model had errors. The files were still handed off |
| Released in Epicor | The job was set Released |
| Epicor: … | The job was not set Released. The rest of the line is the reason |

A later partial pings you only when FE types the mention in that reply. `@release-bot STATUS` under the job's post reads the live flag. General does not accept the bot.

## Questions or issues

Contact Fernando Saucedo or Caleb Marhoover if the check cannot run twice, the wrong model is filed, or the channel post does not match the folder.
