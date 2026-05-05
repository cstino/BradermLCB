# Bug Fix: Layout Issues on Slides

## Problem 1 — Content overlaps the close button (X)

The text content on every slide starts too high and overlaps with the "X" close button in the top-left corner.

**Fix:**
Add a safe top padding to every slide's content area so that no text or element can overlap with the close button. The close button sits roughly in the top 60-70px of the viewport.

```
- Add `padding-top: 80px` (or equivalent) to each slide's inner content wrapper
- Do NOT add padding to the slide container itself (that would break scroll-snap)
- The padding must be on the inner content div inside each slide
```

**Do not** move or resize the close button. Only adjust the content area.

---

## Problem 2 — Too much empty space at the bottom of slides

The content on most slides is vertically top-aligned, leaving a large empty gap at the bottom. This looks unfinished, especially on taller mobile screens.

**Fix:**
Center the content vertically within each slide using flexbox:

```css
.slide {
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  flex-direction: column;
  justify-content: center; /* vertically centers content */
  padding: 80px 24px 40px; /* top accounts for close button, bottom adds breathing room */
  box-sizing: border-box;
}
```

This way the content sits in the vertical middle of each slide, with safe margins from the close button at the top and the screen edge at the bottom.

**Important constraints:**
- Do not change the scroll-snap behaviour
- Do not change the slide height (must stay 100vh)
- Do not change the text content, fonts, or colours
- Only adjust padding and vertical alignment
