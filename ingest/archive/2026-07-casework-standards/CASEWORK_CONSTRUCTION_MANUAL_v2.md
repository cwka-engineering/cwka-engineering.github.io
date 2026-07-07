# CWKA Standard Casework Construction Manual (v2)

> **Source**: CWKA_ENG_Standard_Casework.pdf (Issue Date: 9/11/2023, 17 pages, 28 drawings)
> **Method**: Every rule below was extracted by cross-referencing plan sections, cross sections, front elevations, and detail views at 1-1/2" = 1'-0" and other scales. Where a rule appeared in the General Notes of multiple drawings, it was reconciled across all instances.
> **AWI Grade**: All casework conforms to Architectural Woodwork Institute (AWI) quality standards.
> **Revision**: v2 incorporates field-verified corrections from lead engineer MH's markup of v1 (markup dated 7/6/2026). Each correction below was cross-checked against the original drawing set where the underlying page was available. See **Revision Log** (Appendix B) for the full list of changes and three open items still worth a verbal confirm with MH.

---

## 1. Carcase Assembly — Universal Rules

These rules apply to **all** cabinet types unless a type-specific override is noted.

### 1.1 Structural Members

| Member | Width | Joinery | Machining |
|---|---|---|---|
| Stretchers | 5" | Doweled in place | CNC bore for dowels |
| Nailers | 4" | Glued and pocket screwed | NO CNC machining |

**Exception — Sink cabinets (BS2D)**: The back stretcher is 4" wide, not 5".

Stretchers are the primary structural horizontal members that receive dowel joints and transfer loads. Nailers are secondary members used for mounting/alignment — they are field-attached with glue and pocket screws and do not pass through the CNC.

### 1.2 Back Panel

The back panel is a critical structural element captured in dados on the carcase.

| Parameter | Value | Notes |
|---|---|---|
| Inset from rear | 3/4" from back of cabinet sides | Back face of back, not front face |
| Captured in | Sides and bottom (3 sides) | Standard condition |
| Captured in (upper, top visible) | All 4 sides | When top panel is exposed |
| Dado depth | 7mm | Into each capturing member |
| Dado width | Back thickness + 1/32" | Provides assembly clearance |
| Standard back thickness | 1/4" | For 1/4" backs, dado is 7mm × 7mm |
| Thicker back dado width | Back thickness + 1/32" | For non-standard backs |

**ADA Sink Cabinet (BS2D_ADA) Exception**: Back is 3/4" plant-on back (not dadoed), unless finished side condition. If either side is finished, the 3/4" back is captured between sides and pocket screwed.

### 1.3 Adjustable Shelves

| Parameter | Value |
|---|---|
| Front setback | 1/8" from front of cabinet |
| Width | 1/16" less than interior opening width (1/32" gap each side) |
| Thickness | 3/4" (standard panel stock) |

### 1.4 Fixed Shelves

| Parameter | Value |
|---|---|
| Front alignment | Flush with front of cabinet |
| Width | Full interior opening width |
| Joinery | Doweled (same as stretchers) |
| Required when | Tall cabinets over 72" high — at approximately mid-height |

### 1.5 Predrills

Predrill holes (Ø5mm) are placed in **all** of the following unless the face is a finished condition:
- Tops
- Bottoms
- Fixed shelves
- Dividers

If the face is a finished/visible condition, omit predrills on that face. See Construction Boring (Section 8) for hole patterns.

---

## 2. 32mm System Line Bore

The 32mm system is the backbone of adjustable shelf positioning and is used on every cabinet with adjustable shelves.

### 2.1 Hole Specification

| Parameter | Value |
|---|---|
| Hole diameter | Ø 5mm |
| Hole depth | 1/2" |
| Hole spacing | 32mm on center |
| Column inset from front edge (of adjustable shelf) | 2" |
| Column inset from back edge (of adjustable shelf) | 2" |

### 2.2 Vertical Limits

| Parameter | Rule |
|---|---|
| First hole (bottom) | 6" above top face of bottom panel (or fixed shelf) |
| Last hole (top) | Closest to 6" below bottom face of top panel (or top stretcher, or drawer stretcher, or fixed shelf) |

**Important**: The "last hole" rule uses "closest to 6"" — meaning the 32mm grid determines the exact position, and the last hole is the one in the grid nearest to (but not exceeding) the 6" clearance zone.

### 2.3 Tall Cabinet Special Case

In tall cabinets with a fixed shelf at mid-height, the line bore is split into two zones:
- **Lower zone**: 6" above bottom to 6" below fixed shelf
- **Upper zone**: 6" above fixed shelf to 6" below top

Each zone has its own independent column of holes on both the front and back edges.

---

## 3. Base Cabinets

### 3.1 Standard Dimensions

| Parameter | Value |
|---|---|
| Standard height | 30.5" (Inventor-validated) |
| Standard depth | 24" (side panel depth) |
| Side thickness | 3/4" |
| Bottom thickness | 3/4" |
| Nailer thickness | 0.75" (shop plywood, Inventor-validated) |

### 3.2 Internal Layout (Cross Section, top to bottom)

> **Corrected in v2**: v1 described a single "top stretcher" and a "bottom stretcher." Per MH's markup — and confirmed visually in the BC2D cross section (Drawing 0000.03), which shows a stretcher/doweled callout at *both* the front-top and back-top corners with no corresponding callout at the bottom — base cabinets actually carry **two stretchers, both located near the top of the carcase (one front, one back)**. There is no stretcher resting on the bottom panel.

1. **Front stretcher** — 5" wide × 3/4" thick, doweled between sides at the top front of the carcase
2. **Back stretcher** — 5" wide × 3/4" thick, doweled between sides at the top, inside the back (pairs with the front stretcher to form the top frame)
3. **Nailer** — 4" wide × 0.75" thick, glued and pocket screwed, immediately below the stretchers
4. **Adjustable shelf zone** — line bore columns at 2" from front and back edges of the adjustable shelf
5. **Bottom panel** — 3/4" thick, between sides
6. **Back nailer** — 4" wide × 0.75" thick, at rear, pocket screwed
7. **Back panel** — 1/4" thick, in 7mm dado, 3/4" inset from rear

### 3.3 Stretcher Count by Type

| Cabinet Type | Stretchers | Notes |
|---|---|---|
| BC1D, BC2D, BCO | 2 | Front + back, both at top |
| BC1D1D (door + drawer) | 3 | Front + back at top, plus mid (under drawer) |
| BC2D1D (2 door + drawer) | 3 | Front + back at top, plus mid (under drawer) |
| BC2D2D (2 door + 2 drawer) | 3 | Front + back at top, plus mid (under drawers) |
| BDS3 (3 drawer) | 4 | Front + back at top, plus between each drawer pair |
| BDS4 (4 drawer) | 5 | Front + back at top, plus between each drawer pair |

### 3.4 Drawer Stretcher Placement

The stretcher under a drawer is positioned so that it is **centered on the reveal** between the door and drawer front. This means the stretcher's centerline aligns with the 1/8" gap between the door and drawer fronts.

### 3.5 Doors

| Parameter | Value |
|---|---|
| Inset from exterior sides | 1/16" each side |
| Reveal at top (below cabinet top) | 1/4" |
| Reveal between door and drawer | 1/8" |
| Thickness | 3/4" |
| Max width (1 door cabinet) | 24" |
| Max width (2 door cabinet) | 48" |

### 3.6 Hinge Placement — Base Cabinets

| Parameter | Value |
|---|---|
| Top hinge from top of door | 3" |
| Bottom hinge from bottom of door | 3" |
| Third hinge | Add if door > 36" high |

**Exception — Sink cabinet (BS2D)**: Top hinge is 6" from top of door (not 3"). Bottom hinge remains 3" from bottom.

### 3.7 Pull Placement — Base Cabinet Doors

| Parameter | Value |
|---|---|
| Inset from side of door (to center) | 1-1/2" |
| Down from top of door (to center) | 1-1/2" |
| Side | Hinge-opposite side U.N.O. |

### 3.8 Dividers

| Condition | Rule |
|---|---|
| Cabinets ≤ 35-1/2" wide | No divider required |
| Cabinets > 35-1/2" wide | Full-height divider required, OR thick shelves |
| BC2D2D ≤ 35-1/2" wide | Divider between top stretchers and drawer stretcher only |
| BC2D2D > 35-1/2" wide | Full-height divider |

### 3.9 Type-Specific Notes

**BCO (Open Cabinet)**: Full top panel (unlike standard base cabinets, which are open at top). No stretchers — uses nailers only (4" wide). No doors or drawer fronts. Otherwise identical carcase construction. *Confirmed against Drawing 0000.10 cross section, which shows a full-depth solid top panel rather than the narrow front/back stretcher strips seen on door-front base cabinets.*

**BS2D (Sink Cabinet)**: Open interior for plumbing. Back stretcher is 4" wide (not 5"). Interior has no shelf obstructions between the sides below the stretchers. **The front stretcher is vertical** (same construction principle as BS2D_ADA below) — this is a field-verified addition from MH; it is not called out in the general notes on Drawing 0000.11 itself, only on the ADA sheet (0000.12).

**BS2D_ADA (ADA Sink Cabinet)**:
- Front stretcher is VERTICAL (not horizontal), positioned with bottom at 27" AFF minimum
- Back is 3/4" plant-on back (not dadoed) unless finished side condition; if either side is finished, the 3/4" back is captured between sides and pocket screwed to sides
- Toe kicks attached to door faces with ADA bracket hardware (GM.HW.00516 white, GM.HW.00517 black)
- Overall height: 32-1/2" (adjustable for countertop thickness) — *confirmed directly on Drawing 0000.12's front elevation dimension string*
- Knee clearance: 27" minimum height, 23-1/4" depth

**BCT1D / BCT_PO (Trash Cabinets)**: Standard carcase with drawer opening for trash pullout. Same stretcher and nailer rules as drawer cabinets. *Note: the issued drawing set (Drawing 0000.13/0000.14 title blocks and the TOC) labels these BCTRASH1D and BCTRASHPO. MH's markup renames them to BCT1D / BCT_PO — this contradicts the drawing's own title block, so confirm whether this reflects an updated part-numbering standard before it's used in Epicor or shop documentation.*

---

## 4. Drawer Construction

### 4.1 Drawer Front

| Parameter | Value |
|---|---|
| Standard height (top drawer) | 6" U.N.O. |
| Inset from cabinet exterior sides | 1/16" |
| Reveal from adjacent doors | 1/8" |
| Reveal at top of cabinet | 1/4" |

### 4.2 Drawer Box

| Parameter | Formula |
|---|---|
| Box width (side-mount slides) | Opening width − 2 × (slide thickness + 0.03") |
| Box width (undermount slides) | Opening width − 8mm |
| Box depth | Cabinet depth − 2-1/2", rounded DOWN to next available drawer slide length |
| Box height | Drawer front height − 1-1/2", rounded DOWN to next 1/2" increment |
| Material (sides/back/subfront) — shop-built | 1/2" MDF MEL02 |
| Material (sides/back/subfront) — buyout | 5/8" Maple |
| Material (bottom) — shop-built | 1/4" MDF MEL02 |
| Material (bottom) — buyout | 1/4" Maple veneer |

> **Corrected in v2**: v1 only documented the shop-built MDF MEL02 drawer box and the side-mount width formula. MH's markup adds a **buyout Maple drawer box** as an alternate construction, and a separate width formula for undermount slides (see §4.3 — undermount is actually the standard slide type, not the alternate).

### 4.3 Drawer Slides

| Parameter | Value |
|---|---|
| Type (standard) | Undermount |
| Type (alternate) | Side-mount — Accuride 3832 ESC |
| Mounting position (vertical, side-mount) | Centered on drawer box height |
| Mounting position (horizontal) | Flush with front of cabinet side |
| Available lengths (undermount) | Standard increments (12", 15", 18", etc.) |
| Available lengths (side-mount) | Standard increments (18", 20", 24", etc.) |

> **Corrected in v2**: v1 listed side-mount (Blum Tandem 21") as the standard slide. Per MH's markup, **undermount is the actual standard**; side-mount is the alternate, and when side-mount is used it's Accuride 3832 ESC hardware, not Blum Tandem. Lengths were also corrected (side-mount: 18/20/24" not 18/21/24"). The vertical mounting-position rule shown above is specific to side-mount; undermount mounting position was not specified in the markup.

### 4.4 Drawer Pull Placement

| Parameter | Value |
|---|---|
| Horizontal | Centered side to side |
| Vertical | 1-1/2" down from top edge of drawer front (to center) |

### 4.5 BDS3 Graduated Drawer Heights (Inventor-Validated)

| Drawer | Front Height | Box Height |
|---|---|---|
| Top (DB1) | 6" | 4.0" |
| Middle (DB2) | ~8.5" | 7.0" |
| Bottom (DB3) | ~14" | 12.5" |

### 4.6 BDS4 Drawer Heights

Top drawer is 6" standard. Remaining three drawers are **equally spaced** in the remaining opening height.

---

## 5. Upper Cabinets

### 5.1 Key Differences from Base Cabinets

| Feature | Base Cabinet | Upper Cabinet |
|---|---|---|
| Horizontal members | Stretchers (5" wide, doweled) | Nailers ONLY (4" wide, pocket screwed) |
| Top panel | None (open, covered by countertop) | Yes — 3/4" thick panel |
| Back capture | 3 sides (sides + bottom) | 3 sides standard; 4 sides if top is visible |
| Nailer material | 0.75" shop plywood | 0.75" shop plywood (same material as base/tall — not a separate panel stock) |
| Door pull position | 1-1/2" down from TOP | 1-1/2" up from BOTTOM |
| Door alignment (vertical) | 1/4" reveal at top | FLUSH with top and bottom (sides remain inset 1/16") |

> **Corrected in v2**: Two fixes here. (1) v1 gave base-cabinet nailers as 0.73" and upper-cabinet nailers as a separate "panel stock" at 0.75" — both are wrong; all nailers (base, tall, and upper) are the same 0.75" shop plywood. (2) v1 said upper cabinet doors are inset 1/16" from top and bottom — they're actually **flush**, same principle as tall cabinet doors (§6.4). Only the sides remain inset 1/16". This wasn't stated in Drawing 0000.17/18's general notes (which only mention inset from the exterior sides), so treat it as a field correction from MH rather than something visible in the issued notes.

### 5.2 Standard Dimensions

| Parameter | Value |
|---|---|
| Standard height | 42" (Inventor-validated default) |
| Standard depth | 12" (body depth; 14.1" overall with doors) |
| Side thickness | 3/4" |
| Top thickness | 3/4" |
| Bottom thickness | 3/4" |
| Nailer thickness | 0.75" |

### 5.3 Internal Layout (Cross Section)

1. **Top panel** — 3/4" thick, between sides
2. **Nailer (top)** — 4" wide × 0.75", pocket screwed below top
3. **Adjustable shelf zone** — line bore columns at 2" from front and back
4. **Nailer (bottom)** — 4" wide × 0.75", pocket screwed above bottom
5. **Bottom panel** — 3/4" thick, between sides
6. **Back panel** — 1/4" thick, in 7mm dado, 3/4" inset from rear

### 5.4 Hinge Placement — Upper Cabinets

Same as base: 3" from top and bottom of door. Third hinge if door > 36" high.

### 5.5 Pull Placement — Upper Cabinet Doors

**CRITICAL DIFFERENCE**: Upper cabinet pulls are positioned at the BOTTOM of the door, not the top.

| Parameter | Value |
|---|---|
| Inset from side of door (to center) | 1-1/2" |
| Up from BOTTOM of door (to center/lower screw) | 1-1/2" |

### 5.6 Light Valance

If a light valance is required:
- Set back 1/8" from front face of cabinet
- Do NOT make valance per cabinet (too short)
- Make long continuous lengths
- Ship loose for field installation

### 5.7 Back Panel — Visible Top Condition

When the top of an upper cabinet is visible (e.g., not against a ceiling):
- Back is captured on **all 4 sides** (top, bottom, both sides)
- Standard condition (top not visible): captured on 3 sides (bottom + both sides)

---

## 6. Tall Cabinets

### 6.1 Standard Dimensions

> **Corrected in v2**: Depth changed from 24.125" to 25"; nailer thickness changed from 0.73" to 0.75" (see the universal nailer-thickness note in §3.1). The depth figure is Inventor-sourced and wasn't independently visible as a called-out dimension on the Drawing 0000.21 sheet available for cross-check — trusted on MH's correction.

| Parameter | Value |
|---|---|
| Standard height | 80" (Inventor-validated) |
| Standard depth | 25" (Inventor-validated) |
| Side thickness | 3/4" |
| Nailer thickness | 0.75" (shop plywood, same as base and upper) |

### 6.2 Fixed Shelf Requirement

**Cabinets over 72" tall MUST have a fixed shelf at approximately mid-height.** This divides the interior into upper and lower compartments, each with its own independent line bore zone.

### 6.3 Hinge Placement — Tall Cabinets

| Parameter | Value |
|---|---|
| Top hinge from top of cabinet | 3" |
| Bottom hinge from bottom of cabinet | 3" |
| Intermediate hinges | Equally spaced between top and bottom hinges |
| Sixth hinge | Add if door > 90" high |
| Hinge vs. fixed shelf | Adjust hinge location to maintain clearance from fixed shelf if needed |

### 6.4 Door Alignment — Tall Cabinets

| Parameter | Value |
|---|---|
| Inset from exterior sides | 1/16" |
| Top alignment | FLUSH with top of cabinet (not 1/4" reveal like base) |
| Bottom alignment | FLUSH with bottom of cabinet |

### 6.5 Pull Placement — Tall Cabinets

| Parameter | Value |
|---|---|
| Inset from side of door (to center) | 1-1/2" |
| Height | 40" up from finished floor (to center) U.N.O. |

### 6.6 Internal Layout

1. **Top nailer** — 4" × 0.75", pocket screwed at top
2. **Upper adjustable shelf zone** — line bore from 6" below top to 6" above fixed shelf
3. **Fixed shelf** — at approximately mid-height, doweled
4. **Nailer pairs** — flanking the fixed shelf (above and below)
5. **Lower adjustable shelf zone** — line bore from 6" above bottom to 6" below fixed shelf
6. **Bottom nailer** — 4" × 0.75", 3" above bottom
7. **Back panel** — 1/4", dadoed, same rules as base cabinets

---

## 7. Fillers

### 7.1 Base Filler (BF)

> **Corrected in v2**: v1 described base and upper fillers as simple flat panels pocket-screwed in place. Per MH's markup, both are actually **L-cleat constructions**, not flat panels. Attachment method for the base filler beyond the L-cleat itself wasn't specified in the markup — confirm with MH before publishing a fabrication-ready spec.

Base filler: L-cleat construction, 3" wide × 3.75" deep (standard), height matches adjacent base or tall cabinet.

### 7.2 Base Corner Filler (BCF)

L-shaped assembly built from two L-cleats (not solid panels). Each leg is 3" wide. Full height of adjacent base cabinet. Creates a finished corner return between perpendicular cabinet runs. 4 parts total (Inventor-validated).

### 7.3 Base ADA Filler (BF.ADA)

Similar to base filler but with a **toekick recess** at the bottom. The recess accommodates the ADA toekick bracket (GM.HW.00516/00517) from the adjacent ADA sink cabinet. Width matches the standard base filler (the v1 claim that it's wider, ~5-1/4", was struck by MH). Height is 32.5" (ADA cabinet height — matches the corrected BS2D_ADA overall height in §3.9). 3 parts (Inventor-validated). Left and right handed.

### 7.4 Upper Filler (UF)

L-shaped L-cleat construction, filling the front-and-bottom gap (not a simple flat panel). 3" wide, height matches adjacent upper cabinet. Depth matches upper cabinet body depth. Left and right handed. 4 parts.

> Note: v1 stated depth as "upper cabinet body depth + 2-1/8" (to align with door face)." MH struck the "+2-1/8"" addition, which reads as removing that offset now that the filler is an L-cleat rather than a flat panel — the cleat shape likely handles the door-face alignment inherently. The exact boundary of that strikethrough was hard to pin down precisely from the markup image, so treat the "no offset" reading as the best available interpretation rather than a certainty.

### 7.5 Upper Corner Filler (UFC)

L-shaped corner return for upper cabinets. Width = upper cabinet box depth + filler width. Height = upper cabinet height. 10 parts (Inventor-validated — includes blocking and support members for the deeper corner condition).

---

## 8. Construction Boring

This section defines the CNC boring patterns for all dowel joints and predrill positions. All machining is based on the **32mm system**.

### 8.1 Dowel Holes

| Parameter | Value |
|---|---|
| Diameter | Ø 8mm |
| Depth | 1/2" |
| First dowel from front/edge of part | 1" |

> **Corrected in v2**: v1 gave dowel hole depth as 30mm, sourced from the Inventor part name "DOWEL-8mm-.75in-30mm." MH corrected this to 1/2". The 30mm figure appears to be the dowel pin's overall length, not the drilled hole depth — a dowel is only inserted partway into each mating part, so hole depth is necessarily shallower than total pin length.

### 8.2 Dowel Spacing by Member Type

| Member | Spacing | Notes |
|---|---|---|
| Stretchers (5" wide) | 64mm (2 × 32mm) | Tighter spacing for structural joints |
| All other parts | 96mm (3 × 32mm) | Standard spacing |

### 8.3 Predrill Holes

| Parameter | Value |
|---|---|
| Diameter | Ø 5mm |
| Position | Centered between adjacent dowel holes |
| Placement | All unexposed cabinet sides |
| Omit when | Face is a finished/visible condition |

### 8.4 Pattern Layout (from Drawing 0000.28)

> **Flagged for deletion in v2**: MH marked this entire subsection with a large X and the note "THIS SECTION NEEDS TO BE REWRITTEN OR DELETED." The joint-detail bullets below are from v1 and should **not be relied on** — they likely misread which cross-section detail corresponds to which joint type. Section 8.1–8.3 above (the tabular specs) were not flagged and remain trustworthy. Recommend removing this narrative subsection entirely and, if a written walkthrough of Drawing 0000.28 is still wanted, rebuilding it from scratch with MH reviewing the draft against the actual sheet.
>
> ~~**Horizontal joint (top detail — nailer/stretcher to side)**:~~
> ~~- Part edge at top~~
> ~~- 4" nailer width shown~~
> ~~- Ø8.0 dowel holes at ends~~
> ~~- Ø5.0 predrill hole centered between dowels~~
> ~~- 48mm + 48mm = 96mm total spacing for nailers~~
>
> ~~**Vertical joint (bottom detail — side to bottom/top)**:~~
> ~~- 5" stretcher width shown~~
> ~~- Ø8.0 dowel holes at 32mm + 32mm = 64mm spacing~~
> ~~- Ø5.0 predrill centered between dowels~~
> ~~- 1" minimum edge distance from front edge~~
> ~~- Pattern repeats at 96mm along the length of the joint~~

---

## 9. Pencil Drawers (PD1D, PD2D)

Pencil drawers are shallow drawer units, typically installed in the knee space of desks or workstations.

- Same drawer box construction rules as standard drawers (Section 4)
- Standard drawer front height = 5.25" (corrected in v2 — v1 incorrectly used the standard base-cabinet drawer height of 6")
- Side-mount slides flush with front of cabinet side
- Pull centered side to side, 1-1/2" down from top edge

---

## 10. Ladder Base (LB)

The ladder base is a structural platform that raises base cabinets off the floor.

| Parameter | Value |
|---|---|
| Overall height | 4" standard |
| Depth | Matches cabinet depth minus toekick setback |
| Material | All 0.75" shop plywood (Inventor-validated; part quantity varies with ladder base length — the "11 parts" figure is not fixed) |
| Construction | Open frame ("ladder" rungs) with cross-members for support |
| Toekick setback | 3" from front face |

---

## 11. Summary of Critical Dimensions

### 11.1 Reveals and Clearances

| Condition | Dimension |
|---|---|
| Door to cabinet top (base) | 1/4" reveal |
| Door to cabinet sides | 1/16" inset each side |
| Door to door (double door) | 1/8" reveal |
| Door to drawer front | 1/8" reveal |
| Drawer front to cabinet top | 1/4" reveal |
| Upper cabinet door to top/bottom | FLUSH (0" reveal) — corrected in v2, see §5.1 |
| Tall cabinet door to top/bottom | FLUSH (0" reveal) |
| Back panel setback from rear of sides | 3/4" |
| Adjustable shelf setback from front | 1/8" |
| Adjustable shelf width clearance | 1/32" gap each side |
| Dado clearance (width) | Back thickness + 1/32" |

### 11.2 Pull Positions by Cabinet Type

| Type | Horizontal | Vertical |
|---|---|---|
| Base cabinet door | 1-1/2" from side (to center) | 1-1/2" down from TOP (to center) |
| Upper cabinet door | 1-1/2" from side (to center) | 1-1/2" up from BOTTOM (to center) |
| Tall cabinet door | 1-1/2" from side (to center) | 40" up from finished floor (to center) |
| Drawer front (all types) | Centered side to side | 1-1/2" down from top edge (to center) |

### 11.3 Hinge Positions by Cabinet Type

| Type | Top Hinge | Bottom Hinge | Additional |
|---|---|---|---|
| Base (standard) | 3" from top of door | 3" from bottom of door | Third hinge if > 36" |
| Base (sink, BS2D) | 6" from top of door | 3" from bottom of door | Third hinge if > 36" |
| Upper | 3" from top of door | 3" from bottom of door | Third hinge if > 36" |
| Tall | 3" from top of cabinet | 3" from bottom of cabinet | Equally spaced between; sixth if > 90" |

### 11.4 Thresholds and Maximums

| Rule | Value |
|---|---|
| 1-door cabinet max width | 24" |
| 2-door cabinet max width | 48" |
| Divider required (base) | Width > 35-1/2" |
| Fixed shelf required (tall) | Height > 72" |
| Third hinge required | Door height > 36" |
| Sixth hinge required (tall) | Door height > 90" |

---

## 12. Material Thickness Reference (Inventor-Validated)

| Material | Nominal | Model At | Use |
|---|---|---|---|
| MDF (carcase panels) | 3/4" | 0.75" | Sides, tops, bottoms, shelves, dividers, stretchers |
| MDF (backs, standard) | 1/4" | 0.25" | Back panels |
| Shop plywood (nailers, ALL cabinets) | 3/4" | 0.75" | Nailers in base, tall, and upper cabinets |
| MDF MEL02 (drawer sides, shop-built) | 1/2" | 0.50" | Drawer box sides, backs, subfronts |
| MDF MEL02 (drawer bottoms, shop-built) | 1/4" | 0.25" | Drawer box bottoms |
| Maple (drawer sides, buyout) | 5/8" | 0.625" | Buyout drawer box sides, backs, subfronts |
| Maple veneer (drawer bottoms, buyout) | 1/4" | 0.25" | Buyout drawer box bottoms |
| Door panels | 3/4" | 0.75" | Laminated or veneered |

> **Corrected in v2**: v1 listed two separate nailer materials/thicknesses — 0.73" shop plywood for base/tall, and a distinct 0.75" "panel stock" for upper. Both were wrong: there is one nailer material (0.75" shop plywood) used across all three cabinet families. Also added the buyout Maple drawer box option (see §4.2).

---

## Appendix A: Drawing Index

| DWG # | Type | Key Features |
|---|---|---|
| 0000.02 | BC1D (L/R) | Base 1 door — foundational detail |
| 0000.03 | BC2D | Base 2 door — master general notes |
| 0000.04 | BC2D_WD | Base 2 door with divider |
| 0000.05 | BC1D1D (L/R) | Base 1 door + 1 drawer — drawer rules |
| 0000.06 | BC2D1D | Base 2 door + 1 drawer |
| 0000.07 | BC2D2D | Base 2 door + 2 drawer — divider variants |
| 0000.08 | BDS3 | 3-drawer stack — graduated heights |
| 0000.09 | BDS4 | 4-drawer stack — equal lower spacing |
| 0000.10 | BCO | Open cabinet — full top, nailers only |
| 0000.11 | BS2D | Sink 2 door — 4" back stretcher, vertical front stretcher, 6" top hinge |
| 0000.12 | BS2D_ADA | ADA sink — vertical front stretcher, plant-on back, 32-1/2" height |
| 0000.13 | BCT1D¹ | Trash 1 drawer |
| 0000.14 | BCT_PO¹ | Trash pullout |
| 0000.15 | PD1D | Pencil drawer 1 |
| 0000.16 | PD2D | Pencil drawer 2 |
| 0000.17 | UC1D (L/R) | Upper 1 door — pull at bottom, nailers only, flush doors |
| 0000.18 | UC2D | Upper 2 door |
| 0000.19 | UC2D_ND² | Upper 2 door, **no divider**² |
| 0000.20 | UCO | Upper open |
| 0000.21 | TC1D (L/R) | Tall 1 door — fixed shelf, 40" pull, flush doors |
| 0000.22 | TC2D (L/R) | Tall 2 door |
| 0000.23 | TC2D | Tall 2 door (symmetric) |
| 0000.24 | TC4D | Tall 4 door |
| 0000.25 | BF, BCF, BF.ADA | Base fillers — L-cleat construction |
| 0000.26 | UF, UCF | Upper fillers — L-cleat construction |
| 0000.27 | LB | Ladder base |
| 0000.28 | Construction Boring | Dowel and predrill patterns |

¹ The issued drawing's own title block and the TOC on Drawing 0000.01 both read **BCTRASH1D** / **BCTRASHPO**. MH's markup renames these to BCT1D / BCT_PO. See Appendix B, Open Item 1.
² The issued TOC on Drawing 0000.01 reads **UC2D_WD — "UPPER CABINET 2 DOOR W/ DIVIDER."** MH's markup reverses this to UC2D_ND, "no divider." See Appendix B, Open Item 2.

---

## Appendix B: Revision Log (v1 → v2)

All items below originate from MH's markup review of v1 (dated 7/6/2026). Where possible, each was cross-checked against the original drawing set; the cross-check result is noted.

| # | Section | Change | Cross-check |
|---|---|---|---|
| 1 | §2.1 | Line-bore column inset (2") clarified as measured from the adjustable shelf's edges, not the cabinet's | Consistent with Drawing 0000.03 note 12 |
| 2 | §3.1, §3.2, §5.1, §6.1, §6.6, §10, §12 | Nailer thickness corrected from 0.73" to 0.75" everywhere; upper-cabinet "panel stock" merged into the same shop-plywood spec used for base/tall | Dimension is Inventor-sourced; not independently visible in 2D drawings, trusted on MH's authority |
| 3 | §3.2, §3.3 | Base cabinet stretcher layout corrected: front + back stretchers at top, not top + bottom | **Confirmed** — BC2D cross section (0000.03) shows a stretcher/dowel callout at both top-front and top-back, with no stretcher callout at the bottom |
| 4 | §3.4 | Removed redundant "front" in "door front and drawer front" | Wording only |
| 5 | §3.9 (BCO) | Added "full top panel" | **Confirmed** — Drawing 0000.10 cross section shows a full-depth solid top, unlike the narrow stretcher/nailer strip on door-front base cabinets |
| 6 | §3.9 (BS2D) | Removed "or bottom" from interior-obstruction note; added that the front stretcher is vertical | Not stated in Drawing 0000.11's general notes (only appears on the ADA sheet) — field knowledge from MH, doesn't contradict the drawing, just isn't derivable from it |
| 7 | §3.9 (BS2D_ADA) | Restored truncated sentence on the plant-on back exception | Matches full text of the equivalent note in §1.2 |
| 8 | §3.9 (BS2D_ADA) | Overall height corrected from 34-1/8" to 32-1/2" | **Confirmed** — Drawing 0000.12 front elevation dimension string reads "32-1/2" ADJUST FOR COUNTERTOP THICKNESS" |
| 9 | §3.9, Appendix A | BCTRASH1D/BCTRASHPO renamed to BCT1D/BCT_PO | **Contradicts** Drawing 0000.13/0000.14 title blocks and the 0000.01 TOC — see Open Item 1 |
| 10 | §4.2 | Added undermount box-width formula and buyout Maple drawer box option | New information, not previously documented |
| 11 | §4.3 | Slide standard corrected: undermount is standard, side-mount (Accuride 3832 ESC, not Blum Tandem) is the alternate; length increments corrected | New information / correction, not visible in the provided drawing pages |
| 12 | §5.1 | Door alignment corrected: upper cabinet doors are flush top/bottom, not inset 1/16" | Not stated either way in Drawing 0000.17/18 general notes — field correction from MH |
| 13 | §6.1 | Tall cabinet depth corrected from 24.125" to 25" | Inventor-sourced; not independently visible on Drawing 0000.21 |
| 14 | §7.1, §7.2, §7.4 | Base and upper fillers corrected from "simple flat panel" to L-cleat construction; base filler depth (3.75") added | Not verifiable from the filler drawing pages available (dimension-only sheets); trusted on MH's authority |
| 15 | §7.3 | Removed "wider than standard filler" claim; height corrected 34.5" → 32.5" | Height matches the confirmed BS2D_ADA correction (Item 8) |
| 16 | §7.4 | Removed "+2-1/8" to align with door face" depth offset | **Uncertain** — the exact scope of this strikethrough was hard to read precisely; see Open Item 3 |
| 17 | §8.1 | Dowel hole depth corrected from 30mm to 1/2" | Logically consistent (30mm is the Inventor dowel-pin part length, not a hole depth) |
| 18 | §8.4 | Entire "Pattern Layout" narrative flagged by MH for deletion or rewrite | Not independently re-verified; recommend removing rather than trusting the v1 text |
| 19 | §9 | Pencil drawer front height corrected from 6" to 5.25" | Source page for PD1D/PD2D (0000.15/16) wasn't in the drawing excerpt available for cross-check |
| 20 | §10 | Ladder base part count changed from a fixed "11 parts" to "varies with length" | Logical clarification, not a drawing dimension |
| 21 | §11.1 | Added upper-cabinet flush-door row for consistency with Item 12 | Derived, not separately marked up |
| 22 | Appendix A | UC2D_WD renamed to UC2D_ND; description reversed from "with divider" to "no divider" | **Contradicts** Drawing 0000.01 TOC, which reads "UC2D_WD — UPPER CABINET 2 DOOR W/ DIVIDER" — see Open Item 2 |

### Open items — confirm with MH before treating as final

1. **BCTRASH1D/BCTRASHPO → BCT1D/BCT_PO.** This contradicts the issued drawing's own title blocks and TOC. Possible explanations: an updated Epicor/production naming convention post-dates this drawing issue, or the drawing itself needs a title-block revision. Either way, don't push the new codes into Epicor or shop paperwork without confirming which system is authoritative.
2. **UC2D_WD → UC2D_ND (divider reversal).** Same issue, higher stakes — this doesn't just rename a part, it reverses whether the cabinet has a divider. Worth a direct verbal check before this propagates anywhere.
3. **Upper filler depth offset ("+2-1/8" to align with door face").** MH's strikethrough appeared to remove this offset, but the exact boundary of the mark was ambiguous at the resolution available. Confirm the intended depth formula before using it for cut lists.


