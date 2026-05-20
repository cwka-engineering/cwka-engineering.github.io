---
layout: default
title: Shipping Components
permalink: /workflows/fabrication-engineer/shipping-components.html
nav_order: 6
parent: Fabrication Engineer (FE)
grand_parent: Workflows
---

# Shipping Components (SCs)

> **Related**: [Part Naming](/workflows/fabrication-engineer/part-naming.html) | [PE Release Preparation](/workflows/fabrication-engineer/pe-release-prep.html)

## How do I add SC descriptions after part naming?
{: #how-to-add-sc-descriptions}

Modeling Toolkit → after naming, the toolkit identifies shipping components. Provide a description for each SC (e.g., "spacer", "base carcass", "seat cushion"). Click **Publish Changes** to write to the document.

## How do I export the SC list for PE release?
{: #how-to-export-sc-list}

Modeling Toolkit → after publishing SC descriptions, use the **Export** function to generate the shipping components Excel file. The exported file is formatted for paste-insert into Epicor UD40. Place the exported file in the PE release folder under `Production_Files`.

## Company Number Column — Required for UD40 Upload
{: #company-number-column}

The SC upload template includes a **company number column** that must be populated with the correct company code for the shop where the job exists before uploading to UD40. Omitting or using the wrong code generates bad rows in the Epicor database that cannot be cleared internally — they require a support ticket filed directly with Epicor.

Always pull the current template from the project template folder rather than reusing a copy from an older project, as older copies may predate this column. If working from an existing project folder, verify the company code column is present before uploading.

## SC List

- Use Excel template from:
  - `CWKA Team Folders > Engineering Team > PRODUCTION ENGINEERING > PE to Floor SOP > Shipping Components_Template`
- For detailed SC creation process, see [FE to PE Release - File Organization](/workflows/fe-to-pe-release.html#2-file-organization--folder-setup).

## Modeling Toolkit

- **Enter SC Descriptions**: [^transcript-adv-toolkit] After naming parts, toolkit identifies shipping components. You must provide descriptions for each SC (e.g., "spacer", "base carcass", "seat cushion", "back cushion"). Publish changes to document, then export shipping component list directly for PE release.
- **Future Enhancement**: [^transcript-adv-toolkit] Work in progress to add button that directly publishes to UD40IN Epicor, eliminating need for PE to manually enter SC data.
- Export list for PE release.

## Next Steps

- Continue to [Takeoffs](/workflows/fabrication-engineer/takeoffs.html) for BOM generation
- Or jump to [PE Release Preparation](/workflows/fabrication-engineer/pe-release-prep.html) when ready to release

## See Also

- [FE to PE Release SOP](/workflows/fe-to-pe-release.html) - Complete release process

## Footnotes

[^transcript-adv-toolkit]: Source: [Training Video — "Adv. Toolkit Functions"](https://digifabshop.sharepoint.com/:v:/s/Engineering/IQCALi3cuUMuSLsJ6G-5Rn4TAYr-NLZorJ-lfNYPkyrSaOA?e=AJEJ4d)
