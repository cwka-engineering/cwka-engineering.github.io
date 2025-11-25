---
layout: default
title: Site Map
permalink: /overview/site-map.html
---

# Wiki Site Map

A visual hierarchy of all wiki pages and their interconnections.

## Overview

- **[Home](/)** - Main landing page with navigation
- **[Onboarding Quick Start Links](/overview/onboarding-quick-start.html)** - Essential links and resources
- **[Engineering Roles & Core Competencies](/overview/engineering-roles.html)** - Role descriptions
- **[Project Delivery Overview](/overview/project-delivery.html)** - Complete project lifecycle
- **[Glossary](/overview/glossary.html)** - Terms and definitions
- **[Site Map](/overview/site-map.html)** - This page

## Workflows

### Fabrication Engineer (FE)
- **[FE Workflow](/workflows/fabrication-engineer.html)** - Complete FE procedures
  - Links to: Epicor Usage, Rhino Drafting, Layer Organization, Folder Structure, FE to PE Release
- **[FE to PE Release](/workflows/fe-to-pe-release.html)** - Step-by-step release process
  - Links to: FE Workflow, PE Workflow, Approvals Process, Epicor Usage

### Production Engineer (PE)
- **[PE Workflow](/workflows/production-engineer.html)** - Complete PE procedures
  - Links to: FE to PE Release, Epicor Usage, Rhino Drafting

### Engineering Assistant (EA)
- **[EA Workflow](/workflows/engineering-assistant.html)** - Job creation and management
  - Links to: Epicor Usage, Engineering Roles, Project Delivery Overview

## Standards

- **[Rhino Drafting and Layouts](/standards/rhino-drafting-layouts.html)** - Drawing standards
  - Links to: Layer Organization, FE Workflow
- **[Layer Organization](/standards/layer-organization.html)** - Rhino layer structure
  - Links to: Rhino Drafting, FE Workflow
- **[Folder Structure & File Management](/standards/folder-structure.html)** - File organization
  - Links to: FE Workflow

## Tools

- **[Epicor Usage in Engineering](/tools/epicor-usage.html)** - Epicor procedures
  - Links to: Time Entry, FE Workflow, PE Workflow, EA Workflow
- **[Time Entry](/tools/time-entry.html)** - Time logging procedures
  - Links to: Epicor Usage
- **[Approvals Process](/tools/approvals-process.html)** - PA approval workflow
  - Links to: FE to PE Release

## Other Pages

- **[Search](/search.html)** - Site-wide search functionality

## Navigation Patterns

### Entry Points
1. **New Users**: Home → Onboarding → Roles → Glossary → Project Delivery
2. **By Role**: Home → [Role] → Workflow → Related Standards/Tools
3. **By Task**: Home → [Task Category] → Specific Document

### Common Paths
- **FE Starting a Job**: FE Workflow → Folder Structure → Rhino Drafting → Layer Organization
- **PE Receiving a Job**: FE to PE Release → PE Workflow → Epicor Usage
- **Time Tracking**: Time Entry → Epicor Usage
- **Releasing a Job**: FE Workflow → FE to PE Release → Approvals Process

## Page Relationships

```
Home
├── Overview
│   ├── Onboarding Quick Start
│   ├── Engineering Roles
│   │   └── Links to: FE Workflow, PE Workflow
│   ├── Project Delivery
│   │   └── Links to: All Workflows
│   └── Glossary
│       └── Referenced by: All Pages
├── Workflows
│   ├── FE Workflow
│   │   ├── Links to: Standards (Rhino, Layers, Folders)
│   │   ├── Links to: Tools (Epicor, Time Entry)
│   │   └── Links to: FE to PE Release
│   ├── PE Workflow
│   │   ├── Links to: FE to PE Release
│   │   └── Links to: Epicor Usage
│   ├── EA Workflow
│   │   └── Links to: Epicor Usage
│   └── FE to PE Release
│       ├── Links to: FE Workflow, PE Workflow
│       └── Links to: Approvals Process
├── Standards
│   ├── Rhino Drafting
│   │   └── Links to: Layer Organization, FE Workflow
│   ├── Layer Organization
│   │   └── Links to: Rhino Drafting, FE Workflow
│   └── Folder Structure
│       └── Links to: FE Workflow
└── Tools
    ├── Epicor Usage
    │   ├── Links to: Time Entry
    │   └── Referenced by: All Workflows
    ├── Time Entry
    │   └── Links to: Epicor Usage
    └── Approvals Process
        └── Links to: FE to PE Release
```

