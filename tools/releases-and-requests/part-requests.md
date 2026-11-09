---
layout: default
title: Part Requests
permalink: /tools/releases-and-requests/part-requests.html
parent: Releases & Requests
grand_parent: Tools
nav_order: 1
has_children: true
mermaid: true
---

# Part Requests

Global material lookups and new part creation run through the **New Part Request** form and the **Parts Requests** channel in Teams. Submit the form, then answer under that post with `@parts-bot`.

> **Related**: [Engineer Guide](/tools/releases-and-requests/part-requests/engineer-guide.html) | [Scheduler Guide](/tools/releases-and-requests/part-requests/scheduler-guide.html) | [Part Management](/tools/epicor/part-management.html) | [Reverse Lookup](/workflows/fabrication-engineer/toolkit/modeling.html#how-to-reverse-lookup)

## Workflow Overview

```mermaid
flowchart TD
  A["Engineer submits the New Part Request form"] --> B["Catalog lookup, except glass, lighting, and stone"]
  B --> C{"Match"}
  C -->|Strong or possible| D["Parts Requests thread lists the part numbers"]
  C -->|None| E["Thread says a new part is needed"]
  D --> F{"@parts-bot under that post"}
  E --> F
  F -->|ACCEPT and a part number| G["Complete. Chosen part stored"]
  F -->|DECLINE| H["Worksheet in the thread. Two Planner tasks"]
  H --> I{"Scheduler"}
  I -->|CREATE| J["Part saved on MfgSys. Entry task closed"]
  I -->|USE and a part number| J
  J --> K["Requester mentioned when the part is active in both companies"]
```

Glass, lighting, and stone are not searched. Those posts go out as no match. Category **Unknown** stops before a post.

## Who Does What

| Role | Responsibilities |
|---|---|
| **Engineer** | Submits the form. Replies `@parts-bot ACCEPT` and a part number, or `@parts-bot DECLINE` |
| **Scheduler** | On a decline, `@parts-bot CREATE` saves the next part, or `@parts-bot USE` records one already in Epicor. Runs the site push-pull |

See the [Engineer Guide](/tools/releases-and-requests/part-requests/engineer-guide.html) or the [Scheduler Guide](/tools/releases-and-requests/part-requests/scheduler-guide.html).
