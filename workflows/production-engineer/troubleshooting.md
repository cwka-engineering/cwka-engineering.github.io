---
layout: default
title: Troubleshooting
permalink: /workflows/production-engineer/troubleshooting.html
nav_order: 4
parent: Production Engineer (PE)
grand_parent: Workflows
---

# Troubleshooting

> **Related**: [Setup](/workflows/production-engineer/setup.html) | [Processing](/workflows/production-engineer/processing.html)

## Common Issues

### Parts not laying flat correctly
-   **Cause**: Incorrect layer, open polysurface, or grouped geometry.
-   **Fix**:
    -   Verify parts are on correct material layers.
    -   Check that parts are closed polysurfaces (`SelOpenPolysrf`).
    -   Ungroup and try running Lay Flat on individual parts.

### Nesting optimization fails
-   **Cause**: Material size conflict or geometry issue.
-   **Fix**:
    -   Verify material sizes are correct in Open Nest.
    -   Check that parts fit within material dimensions.
    -   Ensure grain direction is properly oriented.
    -   Review part quantities.

### Master Parts List quantities don't match
-   **Cause**: Missing parts or pairing error.
-   **Fix**:
    -   Verify all parts are included (except MT parts).
    -   Check that nested sheets are properly paired.
    -   Ensure beam saw parts are accounted for.
    -   Re-run **Sheet Pairing** script.

### Machining geometry not generating
-   **Cause**: Naming convention or layer mismatch.
-   **Fix**:
    -   Verify parts are named correctly (`_SelName`).
    -   Check that material thickness matches layer naming.
    -   Ensure parts are on correct material layers.

### Can't find PE release files
-   **Fix**:
    -   Verify job was released in Epicor.
    -   Check correct project folder location on Z: drive.
    -   Confirm file naming matches Epicor job number.
