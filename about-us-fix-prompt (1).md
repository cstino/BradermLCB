# About Us — Bug Fix & Layout Overhaul

## CRITICAL: This is a vertical mobile layout (1080×1920). NOTHING should scroll horizontally or be cut off on the right edge.

---

## Global issues to fix on ALL slides

### 1. No horizontal overflow anywhere
Every element must fit within the screen width. No horizontal scrolling, no content cut off on the right. If items were placed in a horizontal row (flex-direction: row) and they overflow, change them to vertical stacking (flex-direction: column) or a wrapping grid.

### 2. Too much empty space above content
Content is pushed too low on most slides, leaving the top half nearly empty. The content should be vertically centred within the slide using:
```css
.slide {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 24px 40px;
}
```

### 3. Slide order is wrong
The correct order must be:
1. Title (Braderm)
2. Our Story
3. Our Medical Devices
4. Laboratori Chimici Braccili
5. Our Distribution Model
6. Where We Are (with flag marquee)
7. Closing (Innovation at the Service of Health)

Currently slide 6 (Where We Are / flags) is completely missing. Add it back.

---

## Slide-by-slide fixes

### Slide 1 — Title
**Problem:** "BRADERM" and subtitle are crammed in the bottom-left. "LCB S.r.l." text overlaps with the subtitle.
**Fix:**
- Centre everything vertically and horizontally on the slide
- "BRADERM" large and centred (font-size 60-72px)
- Subtitle "Dermocosmetic Innovation Since 2007" below it with clear spacing (margin-top 16px)
- "LCB S.r.l. — Laboratori Chimici Braccili" and "Roseto degli Abruzzi (TE), Italy" at the very bottom of the slide (position absolute bottom, or margin-top auto), small muted text, no overlap

### Slide 2 — Our Story
**Problem:** Timeline is horizontal and gets cut off on the right ("TO..." truncated). This is a vertical screen — a horizontal timeline does not work.
**Fix:**
- Change the timeline to VERTICAL layout
- Stack the three entries top to bottom: 2007 → 2013 → Today
- Each entry: coloured circle with year on the left, title + description text on the right
- Vertical connecting line between circles
- Stat cards (~50 Products, 4 Medical Areas) at the bottom, side by side (these two are narrow enough to fit in a row)
- Remove all horizontal scrolling

### Slide 3 — Our Medical Devices
**Problem:** This slide must come BEFORE the Laboratori slide (currently swapped). The three product cards are too small side by side.
**Fix:**
- Move this to position 3 in the slide order
- Stack the three product cards VERTICALLY (full width each, one below the other)
- Each card: product name bold, active ingredient, indication, with a coloured left border accent
- Cards should be tall enough to read comfortably, with padding inside

### Slide 4 — Laboratori Chimici Braccili
**Problem:** The three numbered points (Advanced Research, Selected Ingredients, Private Label) are in a horizontal row and get cut off.
**Fix:**
- Move this to position 4 in the slide order
- Stack the three numbered points VERTICALLY
- Each point: teal circle with number on the left, title + description on the right
- Full width, no horizontal overflow

### Slide 5 — Our Distribution Model
**Problem:** The four distribution channels are in a horizontal row and get cut off. The partnership text is crammed underneath.
**Fix:**
- Stack the four channels VERTICALLY (icon + text per row, full width)
- Add spacing between each channel row (margin-bottom 16px)
- The partnership quote goes below with clear separation (gold left border, slightly different background)

### Slide 6 — Where We Are (MISSING — must be added)
This slide is completely missing. Add it back between Distribution and Closing.
**Content:**
- Title: "Where We Are" centred at top
- Large stat: "13+" in gold (80-100px font), "Countries Worldwide" below in white
- Below the stat: auto-scrolling flag marquee strip (horizontal infinite loop, right to left)
- Flags are real PNG images from flagcdn.com, NOT emoji
- Each flag followed by the country name in white text

**Countries and flag URLs:**
- Italy (HQ): flagcdn.com/w40/it.png
- Austria: flagcdn.com/w40/at.png
- Germany: flagcdn.com/w40/de.png
- Romania: flagcdn.com/w40/ro.png
- Albania: flagcdn.com/w40/al.png
- Moldova: flagcdn.com/w40/md.png
- Ireland: flagcdn.com/w40/ie.png
- Greece: flagcdn.com/w40/gr.png
- Cyprus: flagcdn.com/w40/cy.png
- Georgia: flagcdn.com/w40/ge.png
- Lebanon: flagcdn.com/w40/lb.png
- Libya: flagcdn.com/w40/ly.png
- Azerbaijan: flagcdn.com/w40/az.png
- Colombia: flagcdn.com/w40/co.png

**Flag marquee CSS:**
```css
.flag-strip-wrapper {
  overflow: hidden;
  width: 100%;
}
.flag-strip {
  display: flex;
  gap: 2rem;
  align-items: center;
  animation: scroll-flags 25s linear infinite;
  width: max-content;
}
@keyframes scroll-flags {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```
Duplicate the entire flag list in the DOM so the loop is seamless. Italy flag should have a gold border to mark it as HQ.

### Slide 7 — Closing
**Problem:** The phone number breaks across multiple lines (each digit group on its own line). Contact info layout is broken.
**Fix:**
- Contact info should be stacked vertically, one per line:
  - laboratorio@lcblab.com
  - www.braderm.com
  - +39 085 946 3073
- Each contact line on a single row, not wrapping mid-number
- "BACK TO MENU" button at the bottom is fine, keep it
- Footer "LCB S.r.l. — Laboratori Chimici Braccili — Roseto degli Abruzzi (TE), Italy" at the very bottom

---

## Summary of what to do
1. Fix vertical centering on ALL slides (too much empty space on top)
2. Change ALL horizontal layouts that overflow to VERTICAL stacking
3. Fix slide order: Title → Story → Medical Devices → Laboratori → Distribution → Where We Are → Closing
4. Add back the missing "Where We Are" slide with flag marquee
5. Fix phone number wrapping on closing slide
6. No horizontal scroll on any slide — everything fits within screen width
