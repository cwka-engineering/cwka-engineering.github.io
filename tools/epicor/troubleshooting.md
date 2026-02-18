---
layout: default
title: Troubleshooting
permalink: /tools/epicor/troubleshooting.html
nav_order: 5
parent: Epicor Usage
grand_parent: Tools
---

# Troubleshooting

> **Related**: [Part Management](/tools/epicor/part-management.html) | [Job Management](/tools/epicor/job-management.html)

## Common Issues

### Can't access Submittal Dashboard
- Verify you have FE role permissions.
- Check you're accessing the correct site (West).
- Contact IT if issues persist.

### Part number search returns no results
- Verify naming convention (GM, Custom, WC).
- Check with EA for next number.
- Ensure correct part class search.

### BOM Complete checkbox won't check
- Verify all BOM line items have required fields.
- Check quantities are entered.
- Ensure all materials have Part Masters.
- Review for error messages.

### Job won't release
- Verify all three checks:
  - Field Dimensions Received
  - Shop Drawings Approved
  - BOM Complete
- Check Engineering Complete is checked.
- Ensure no error messages.
