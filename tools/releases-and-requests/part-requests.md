---
layout: default
title: Part Requests
permalink: /tools/releases-and-requests/part-requests.html
parent: Releases & Requests
grand_parent: Tools
nav_order: 1
has_children: true
mermaid: true
corpus_tags: [fe-release]
---

# Part Requests

The Part Requests workflow handles global material part lookups and new part creation through the **Part Requests** channel in Teams. Submit a form, review the AI-assisted result in the channel, and reply with one word — the system routes the rest.

> **Related**: [Engineer / PM Guide](/tools/releases-and-requests/part-requests/engineer-guide.html) | [Scheduler Guide](/tools/releases-and-requests/part-requests/scheduler-guide.html) | [Part Management](/tools/epicor/part-management.html) | [Reverse Lookup](/workflows/fabrication-engineer/toolkit/modeling.html#how-to-reverse-lookup)

## Workflow Overview

```mermaid
flowchart TD
  A([Engineer submits Part Request form]) --> B[AI-assisted catalog lookup]
  B --> C{Result}
  C -->|Strong match| D[🟢 Strong match posted in channel]
  C -->|Possible match| E[🟡 Possible match — review needed]
  C -->|No match| F[🔵 No match — new part needed]
  D --> G{Engineer replies in thread}
  E --> G
  F --> G
  G -->|ACCEPT| H([Request closed])
  G -->|DECLINE| I[Scheduler @mentioned + Planner task created]
  I --> J[Scheduler creates part in Epicor]
  J --> K[Scheduler replies with new part number]
  K --> L([Confirmation posted to engineer])
```

## Who Does What

| Role | Responsibilities |
|---|---|
| **Engineer / PM** | Submits the form; reviews the channel result; replies ACCEPT or DECLINE |
| **Scheduler** | Receives DECLINE notifications; creates new parts in Epicor; replies with confirmed part number |

See the [Engineer / PM Guide](/tools/releases-and-requests/part-requests/engineer-guide.html) or [Scheduler Guide](/tools/releases-and-requests/part-requests/scheduler-guide.html) for step-by-step instructions.
