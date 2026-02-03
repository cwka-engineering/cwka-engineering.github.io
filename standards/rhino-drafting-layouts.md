---
layout: default
title: Rhino Drafting and Layouts
permalink: /standards/rhino-drafting-layouts.html
---
# Rhino Drafting and Layouts

> **Related Documents**: [Layer Organization](/standards/layer-organization.html) | [Folder Structure](/standards/folder-structure.html)

This document covers drafting standards and layout conventions for Rhino drawings.

## Table of Contents

1.  [Layout Structure & Page Content](#layout-structure--page-content)
    
2.  [Creating Details](#creating-details)
    
3.  [Section Views](#section-views)
    
4.  [Clipping Planes & Sections](#clipping-planes--sections)
    
5.  [Hatches & Section Styles](#hatches--section-styles)
    
6.  [Dimensions & Annotations](#dimensions--annotations)
    
7.  [Display Modes for Drafting](#display-modes-for-drafting)
    
8.  [Printing Considerations](#printing-considerations)
    

## Layout Structure & Page Content

Layouts follow a "Hundred level page number" system:

*   Format: Project.Job.Hundred level page number
    
*   This system categorizes drawing types.
    

<<<<<<< Updated upstream
**Layout Management**: \[^transcript-layouts\] In the layouts panel, you can:

*   Move layouts via arrows or click and drag to reposition
    
*   Right-click to duplicate, delete, or rename layouts
    
*   Double-click to rename
    
*   **Note**: When using the toolkit, layouts generate in standard numerical order (100s, 200s, 300s, 400s, etc.)
    

\[^transcript-layouts\]: Source: Training Video Transcript - "Layouts, Details, and Annotations"

## Standard Page Types

*   **XXXX.T00**: Title Sheet – includes project index
    
*   **XXXX.G00**: General Requirements and Schedules – includes material tags and bill of materials
    
*   **XXXX.XXX.1XX**: Reference Plans – includes: \[^transcript-layouts\]
    
    *   Overall floor plans
        
    *   Enlarged plans
        
    *   Key plans for site context
        
    *   VIF (Verify in Field) plans
        
    *   **Note**: For freestanding items without site context, 100-level pages may not be needed. Can import site plans via work session for larger projects.
        
*   **XXXX.XXX.2XX**: Shop Drawings – for client submission, typically includes: \[^transcript-layouts\]
    
    *   Isometric views (often first page for freestanding items)
        
    *   BOM (Bill of Materials)
        
    *   Plans
        
    *   Elevations
        
    *   Sections
        
    *   Details
        
    *   **Note**: First 200-level page often shows an isometric view for freestanding items, or elevation for large interior wall paneling jobs. Pre-populated detail views are included in templates.
        
*   **XXXX.XXX.3XX**: Install & Shipping Drawings – for install team, includes: \[^transcript-layouts\]
    
    *   Shipping Components list (usually first 300-level page)
        
    *   Installation supplements
        
    *   Z-clip locations
        
    *   Install sequence drawings
        
        *   **Name Positions**: \[^transcript-layouts\] For freestanding fixtures that are very detailed, can use name positions to generate exploded isometric on 300-level page without bloating file with additional models. Time-stamp location of parts in Rhino space at given save moment. Toggle between assembled and exploded positions. **Note**: No name positions per layout page - must print all assembled first, then all exploded (can't mix on same page).
            

\[^transcript-layouts\]: Source: Training Video Transcript - "Layouts, Details, and Annotations"

*   **XXXX.XXX.4XX**: Fabrication Supplements – for shop team, includes: \[^transcript-layouts\]
    
    *   Layups
        
    *   Veneer Sequence
        
    *   Glue-up Jig
        
    *   Bucks (jigs/fixtures)
        
    *   Create 400-level drawings for each WC/MT/IP part.
        
    *   First drawing = 400, then 401, etc.
        
    *   Drawing number = WC/MT/IP code (e.g., 1102.MT.00007.400)
        
    *   **Note**: This is an internal series for shop floor needs, not typically part of client submittal.
        
*   **NOTE**: Rhino tabs can have the same name but must be manually labeled using layout user text.
    
*   **XXXX.XXX.SKXX**: Sketches – for quick feedback, not part of submission set
    
=======
## Standard Page Types

- **XXXX.T00**: Title Sheet – includes project index
- **XXXX.G00**: General Requirements and Schedules – includes material tags and bill of materials
- **XXXX.XXX.1XX**: Reference Plans – includes: [^transcript-layouts]
  - Overall floor plans
  - Enlarged plans
  - Key plans for site context
  - VIF (Verify in Field) plans
  - **Note**: For freestanding items without site context, 100-level pages may not be needed. Can import site plans via work session for larger projects.
- **XXXX.XXX.2XX**: Shop Drawings – for client submission, typically includes: [^transcript-layouts]
  - Isometric views (often first page for freestanding items)
  - BOM (Bill of Materials)
  - Plans
  - Elevations
  - Sections
  - Details
  - **Note**: First 200-level page often shows an isometric view for freestanding items, or elevation for large interior wall paneling jobs. Pre-populated detail views are included in templates.
- **XXXX.XXX.3XX**: Install & Shipping Drawings – for install team, includes: [^transcript-layouts]
  - Shipping Components list (usually first 300-level page)
  - Installation supplements
  - Z-clip locations
  - Install sequence drawings
  - **Name Positions**: [^transcript-layouts] For freestanding fixtures that are very detailed, can use name positions to generate exploded isometric on 300-level page without bloating file with additional models. Time-stamp location of parts in Rhino space at given save moment. Toggle between assembled and exploded positions. **Note**: No name positions per layout page - must print all assembled first, then all exploded (can't mix on same page).
- **XXXX.XXX.4XX**: Fabrication Supplements – for shop team, includes: [^transcript-layouts]
  - Layups
  - Veneer Sequence
  - Glue-up Jig
  - Bucks (jigs/fixtures)
  - Create 400-level drawings for each WC/MT/IP part.
  - First drawing = 400, then 401, etc.
  - Drawing number = WC/MT/IP code (e.g., 1102.MT.00007.400)
  - **Note**: This is an internal series for shop floor needs, not typically part of client submittal.
- **NOTE**: Rhino tabs can have the same name but must be manually labeled using layout user text.
- **XXXX.XXX.SKXX**: Sketches – for quick feedback, not part of submission set
>>>>>>> Stashed changes

### Schedules

*   Required for WC and MT jobs
    
*   Use toolkit or custom Grasshopper scripts if toolkit fails.
    
*   Should include part name, type, and topology.
    

## Creating Details

*   Use the Detail command and select "add" to create new detailed views on a layout. \[^transcript-layouts\]
    
*   Name the detail view (e.g., "front view"). The name field ties in with the detail title block.
    
*   Use Hide in Detail to selectively hide objects within a specific detail view.
    
*   You can also hide objects by turning their respective Detail Layer in the layers panel.
    
*   **Note**: This is the secondary light bulb per layer that can be toggle on a per detail basis.
    
*   Always lock your detailed view once finalized to prevent:
    
    *   Accidental shifting
        
    *   Disconnected dimensions and leaders
        

**Setting Views**: \[^transcript-layouts\] Use the dropdown filter "Set View" to choose isometric, plan, elevation, or other view types that best capture your scope.

<<<<<<< Updated upstream
\[^transcript-layouts\]: Source: Training Video Transcript - "Layouts, Details, and Annotations"

=======
>>>>>>> Stashed changes
## Labeling Details

*   Use the "Legends and Symbols" block, specifically the "Detail Title" block.
    
*   Connect block attributes to:
    
    *   Detail view's name
        
    *   Detail view's scale
        
*   Use text fields: object name, object scale
    
*   Ensure the detail title is on the "Detail Title" layer
    

## Section Views

*   Use the "detail tag" block from Legends and Symbols to create section reference tags.
    
*   Link attributes:
    
    *   Detail page
        
    *   Detail number
        
*   This ensures the tag follows the section detail correctly.
    

## Clipping Planes & Sections

*   Create clipping planes on the clip planes sublayer under:
    
    *   03\_CWKA-FE
        
*   Use the Clipping Plane command
    
*   (Rhino 8 offers various options; "vertical" is typical)
    

### Clipping Plane Properties

**Custom Depth**: \[^transcript-layouts\]

*   Controls the distance/extent of the clipping plane (default 0 inches = single plane).
    
*   Set thickness (e.g., 12 inches) to create a depth range for the section.
    
*   **Use Case**: \[^transcript-layouts\] Very helpful when you have visual noise - want to take a section but have adjacent scope (wall paneling, etc.) that you don't want to show. Use custom depth to clear out that area while keeping the section focused.
    

**Objects Clipped**:

*   Filters which objects/layers are cut; allows for "peeled back" sections.
    
*   You can toggle clipping planes on/off for specific model or layout views.
    
*   **Layout Integration**: \[^transcript-layouts\] In clipping plane properties, lower portion shows option to toggle on/off in various model space or layout space views. When you create a detail view in a layout, the clipping plane will appear in the list for that page - toggle it on to show the section in that detail view.
    

**Naming**: \[^transcript-layouts\] You can name clipping planes, but for simple projects with only one section, naming may not be necessary.

<<<<<<< Updated upstream
**Flipping Direction**: \[^transcript-layouts\] Can flip the direction of the clipping plane if needed.

\[^transcript-layouts\]: Source: Training Video Transcript - "Layouts, Details, and Annotations"

=======
>>>>>>> Stashed changes
## Hatches & Section Styles

*   Hatch patterns are set in the Section Style column within the Layer Manager
    
*   **Toolkit Pre-Assignment**: \[^transcript-layouts\] When you import a new material from toolkit and select a material tag, toolkit does its best to pre-assign the section style. However, you may need to set them manually.
    

### Configuring Section Styles

*   **Access**: \[^transcript-layouts\] In Layers window, double-click the Section Style column for the layer you want to configure.
    
*   **Options**: \[^transcript-layouts\] Pop-up shows all different options for that specific section.
    
*   **Custom Section Styles**: \[^transcript-layouts\] Toolkit comes with custom section styles, but configuration may be needed. Often you won't have the actual hatch needed for that specific layer/material type.
    

### Standard Hatch Settings

<<<<<<< Updated upstream
*   **Pattern**: \[^transcript-layouts\] Select appropriate pattern (e.g., "plywood" for plywood materials).
    
*   **Pattern Color**: \[^transcript-layouts\] Typically gray (prints dark gray for lighter appearance).
    
*   **Background**: White
    
*   **Boundary Color**: Black
    
*   **Scale**: \[^transcript-layouts\] Adjust scale as needed (e.g., if pattern is too small, increase scale).
    
*   **Width Scale**: \[^transcript-layouts\] Typical is 5, color black for boundaries.
    

\[^transcript-layouts\]: Source: Training Video Transcript - "Layouts, Details, and Annotations"

=======
>>>>>>> Stashed changes
### Custom Hatch Rotation

*   For objects with grain direction different from the material's default (e.g., perpendicular wood grain):
    
*   Adjust rotation of hatch in:
    
    *   Properties > Section Style > Custom
        

### Section Line Styling

*   Print width: 0.05 mm
    
*   Width scale: 5 (makes section line pop while keeping other linework crisp)
    

### Special Cases

*   Hardware or thin gauge steel:
    
    *   Use hairline print width
        
    *   Use solid white hatch (improves legibility and avoids visual clutter)
        

## Dimensions & Annotations

*   Use the Leader command for:
    
    *   Material tags
        
    *   Other annotations
        

### Material Tags

<<<<<<< Updated upstream
*   **Workflow**: \[^transcript-layouts\] Use Leader command, then go under Notes layer. Press Shift to enable ortho for straight leaders.
    
*   **Tag Types**: \[^transcript-layouts\] Material tag, material tag and finish tag, specialty hardware tag - all are blocks with attributes.
    
*   **Inserting Tags**: \[^transcript-layouts\] Insert block (e.g., "material tag"), enter material code (e.g., "PI01"), place tag.
    
*   **Additional Annotations**: \[^transcript-layouts\] As you work through details, use grain direction, grain match, grain direction annotations, and aligned symbols as needed. All important to include.
    
*   Tags are blocks with attributes (e.g., Pi 01)
    
*   Include grain direction annotations as needed
    

\[^transcript-layouts\]: Source: Training Video Transcript - "Layouts, Details, and Annotations"

=======
>>>>>>> Stashed changes
### Dimension Placement

*   Maintain a gap between dimension line and geometry (prevents merging and improves readability)
    
*   Place dimensions off the drawing geometry to avoid clutter
    

### Leader Line Cleanup

*   For leaders intersecting linework:
    
    *   Use mask background in properties to hide geometry behind text
        
    *   Optionally add a frame around the text
        

## Display Modes for Drafting

### Monochrome:

*   Shows silhouette and curvature well
    
*   Heavy for printing
    
*   Best printed raster
    
*   Output Color in the Print Window: Print Color
    

### Pen (Download & Install):

*   Vector output
    
*   No hidden lines
    
*   Output Color in the Print Window: Print Color
    

### Technical (Download & Install):

*   Vector output
    
*   Hidden lines appear as light gray
    
*   Output Color in the Print Window: Print Display
    

## Printing Considerations

*   **Locked Objects**: \[^transcript-printing\] Locked objects will **not print** - whether locked in Rhino space or layout space. If geometry isn't showing up in prints, check if it's locked.
    
*   **Print Preview**: \[^transcript-printing\] Always use print preview to review pages before printing.
    

### Recommended printer:

*   **Microsoft Print to PDF**: \[^transcript-printing\] Default recommendation - good balance between quality and file size.
    

### Other options:

*   **Rhino PDF**: \[^transcript-printing\] Tends to be very heavy but has good quality if you can load it.
    
*   **Bluebeam**: Quality can be buggy, smaller file size.
    

### Output Types:

*   **Vector vs Raster**: \[^transcript-printing\] If using monochrome and struggling with vector output, try raster output instead.
    
*   **Shading**: \[^transcript-printing\] Shading is a raster feature by definition - can only be printed in raster mode. Shadows and shading require raster output.
    

### Master Plan Integration

*   **Location**: \[^transcript-printing\] Master plan should be kept in separate file in models folder (e.g., `Model Assets > Master Models`).
    
*   **Insertion Method**: \[^transcript-printing\] Can use Block Insert (preference) or Work Session. Block Insert allows better manipulation using Block Manager.
    
*   **Layer Placement**: \[^transcript-printing\] Master plan belongs under PRECON parent layer, under IN-2D and IN-3D sublayers. Can add additional sublayers for other reference plans (e.g., laser scan in 3D). **Note**: Not recommended to have laser scan in working file - not good practice for file performance.
    
*   **Insert Options**: \[^transcript-printing\] Layer style should be set to "Active" (ensures you don't create new layers). Insertion point should be same for everybody (whoever set up master plan should have located it). No scale or rotation changes needed.
    

### Project Cover Page

<<<<<<< Updated upstream
*   **Photo Insertion**: \[^transcript-printing\] Project cover page (front page) has option to insert a photo. This was not common practice at CW previously, but may become standard moving forward.
    

\[^transcript-printing\]: Source: Training Video Transcript - "Printing"

\[^transcript-printing\]: Source: Training Video Transcript - "Printing"

## Hidden Linework in Technical Mode

*   Hidden lines appear light gray
    
*   If print colors are set to black:
    
    *   Print layout as a separate PDF
        
    *   Create a Layer State with all CWKA/Digi scope geometry set to black and Print as previously mentioned.
        
*   **NOTE**: create a Layer State with all your settings BEFORE you change all display colors to black.
    
*   Otherwise, use Bluebeam's color processing tool to convert vector colors to black
=======
## Hidden Linework in Technical Mode

- Hidden lines appear light gray
- If print colors are set to black:
  - Print layout as a separate PDF
  - Create a Layer State with all CWKA/Digi scope geometry set to black and Print as previously mentioned.
- **NOTE**: create a Layer State with all your settings BEFORE you change all display colors to black.
- Otherwise, use Bluebeam's color processing tool to convert vector colors to black

## Footnotes

[^transcript-layouts]: Source: Training Video Transcript - "Layouts, Details, and Annotations"
[^transcript-printing]: Source: Training Video Transcript - "Printing"

>>>>>>> Stashed changes
