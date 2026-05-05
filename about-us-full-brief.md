# About Us — Full Brief (1080×1920 vertical slides)

---

## General Instructions

- Format: 7 full-screen vertical slides, 1080×1920px
- Scroll snap mandatory on Y axis — each slide locks in place with minimal scroll
- Each slide's content must be vertically centred with 80px top padding (to avoid overlapping the close button) and 40px bottom padding
- Alternate dark and light backgrounds for visual rhythm (e.g. Slide 1 dark, Slide 2 light, Slide 3 dark, etc.)
- Colour palette: navy #0B1D32, gold #D4A04A, teal #0E7C7B, off-white #F5F7FA, light grey #E8ECF0
- Typography: distinctive serif for headlines (Playfair Display or Cormorant Garamond), clean sans-serif for body (DM Sans or Outfit). Headlines large and confident (40-60px scaled for mobile), body 14-16px
- Every slide must have a different layout — do not repeat the same structure
- Staggered fade-in animations on elements as each slide snaps into view (200ms delay between elements)
- Country flags: use real PNG images from flagcdn.com/w40/{code}.png — NOT emoji

---

## Slide 1 — Title

**Text:**

BRADERM

Dermocosmetic Innovation Since 2007

LCB S.r.l. — Laboratori Chimici Braccili
Roseto degli Abruzzi (TE), Italy

**Design:**
- Dark background (navy #0B1D32)
- "BRADERM" in gold (#D4A04A), very large serif (60px+), centred, with a fade-up + slight scale entrance animation
- Subtitle in lighter weight, white or off-white, smaller size below the title
- Company details at the bottom of the slide in muted grey, small font
- Background: subtle abstract texture or gradient mesh to avoid flatness — think soft gold-to-navy radial gradient or a faint noise overlay
- Minimal and monumental — let the brand name breathe

---

## Slide 2 — Our Story

**Text:**

Our Story

2007 — BRADERM IS BORN
Founded in Roseto degli Abruzzi, the company enters the dermocosmetic market with a portfolio spanning Dermatology, Gynaecology, ENT and Paediatrics. A team of dedicated professionals drives steady growth and nationwide recognition.

2013 — L.C.B. LABORATORIES LAUNCH
Laboratori Chimici Braccili: in-house R&D and manufacturing for Braderm-branded products and private-label clients. A decisive step toward full innovation control.

TODAY — A DERMOCOSMETIC LEADER
~50 products in portfolio, a widespread network of medical representatives across Italy, and a growing international presence in over 13 countries.

~50 Products · 4 Medical Areas

**Design:**
- Light background (off-white #F5F7FA)
- Vertical timeline on the left side: coloured circles with the year/label inside (2007 in teal, 2013 in gold, Today in navy), connected by a thin vertical line
- Each timeline entry: bold title in gold/teal, body text in dark grey, staggered fade-in (200ms between entries)
- Bottom of slide: two stat cards side by side — large number (~50, 4) in teal, small label below (Products, Medical Areas), cards with subtle shadow on white background
- Section title "Our Story" at the top in navy serif, left-aligned

---

## Slide 3 — Medical Devices

**Text:**

Our Medical Devices

Innovative medical devices for real clinical needs

ZOYLAK
Benzoyl peroxide 4%
Facial acne treatment

DORSAK
Benzoyl peroxide 6% spray
Back acne treatment

MICOBAT LAVANDA
Boric Acid
Feminine intimate hygiene and wellness

**Design:**
- Dark background (navy #0B1D32)
- Section title in white serif, subtitle in muted grey below
- Three product cards stacked vertically (full width, since it's mobile 1080px wide) with small gaps between them
- Each card: white/light background, rounded corners, subtle shadow. Coloured accent stripe on the left edge (Zoylak = teal, Dorsak = gold, Micobat = teal). Product name bold and large, details in regular weight below
- Cards should have a subtle entrance animation (slide in from right, staggered)
- If space allows, add a small abstract icon per card (flask, spray, drop) in the accent colour

---

## Slide 4 — Laboratories

**Text:**

Laboratori Chimici Braccili

Research, Development & Manufacturing Since 2013

L.C.B. laboratories produce both Braderm-branded products and private-label formulations, ensuring full quality control and innovation at every stage of the production process.

1 — Advanced Research
Cutting-edge formulations for the dermocosmetic industry

2 — Selected Ingredients
Raw materials of the highest quality and safety standards

3 — Private Label
End-to-end development and manufacturing for third-party brands

**Design:**
- Light background (off-white #F5F7FA)
- Section title in navy serif at top, subtitle in teal below
- Main paragraph in a card with frosted/glass effect or a light teal-tinted background, rounded corners
- Three numbered points below: teal circle with white number (1, 2, 3), bold title in navy, description in grey underneath
- Vertical layout — everything stacked, generous spacing between blocks
- Numbered points fade in one by one with stagger

---

## Slide 5 — Distribution

**Text:**

Our Distribution Model

A comprehensive network from local to global

Wholesalers and pharmaceutical cooperatives
Direct sales to pharmacies
Medical sales representatives across Italy
International distributor network in continuous expansion

Braderm works in close partnership with the medical community, ensuring a science-driven approach to product promotion and usage.

**Design:**
- Dark background (navy #0B1D32)
- Section title in white serif, subtitle in gold
- Four distribution channels displayed as icon + text rows (not plain bullets): each row has a small icon in a teal circle on the left, channel name in white on the right. Icons: truck/box for wholesalers, storefront for pharmacies, user/people for reps, globe for international
- Below the channels, the partnership message sits in a highlighted block — gold left border, slightly lighter navy background, italic or different weight to distinguish it as a quote/mission statement
- Staggered entrance on the channel rows

---

## Slide 6 — International Presence

**Text:**

Where We Are

13+ Countries Worldwide

Flag strip (auto-scrolling marquee, right to left, infinite loop):

Italy (HQ) — https://flagcdn.com/w40/it.png
Austria — https://flagcdn.com/w40/at.png
Germany — https://flagcdn.com/w40/de.png
Romania — https://flagcdn.com/w40/ro.png
Albania — https://flagcdn.com/w40/al.png
Moldova — https://flagcdn.com/w40/md.png
Ireland — https://flagcdn.com/w40/ie.png
Greece — https://flagcdn.com/w40/gr.png
Cyprus — https://flagcdn.com/w40/cy.png
Georgia — https://flagcdn.com/w40/ge.png
Lebanon — https://flagcdn.com/w40/lb.png
Libya — https://flagcdn.com/w40/ly.png
Azerbaijan — https://flagcdn.com/w40/az.png
Colombia — https://flagcdn.com/w40/co.png

**Design:**
- Dark background (navy #0B1D32)
- "Where We Are" in white serif at the top, centred
- "13+" in gold, massive (80-100px), centred, with "Countries Worldwide" in white below it, smaller
- The number should have a subtle gold glow or text-shadow for emphasis
- Flag marquee strip in the lower third of the slide: each item is a small rounded flag image (from flagcdn.com PNG, not emoji) followed by the country name in white. Gap between items ~2rem
- Italy's flag should have a gold border or a small "HQ" label to distinguish it
- The flag list is duplicated in the DOM for seamless infinite loop:
```css
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
- Consider a second marquee row scrolling in the opposite direction for visual richness (optional, only if it doesn't feel cluttered)

---

## Slide 7 — Closing

**Text:**

Innovation at the Service of Health

Safe, effective, and cutting-edge dermocosmetic solutions for the medical community and industry professionals.

info@lcb-srl.it · www.lcb-srl.it · +39 085 123 4567

LCB S.r.l. — Laboratori Chimici Braccili — Roseto degli Abruzzi (TE), Italy

**Design:**
- Dark background (navy #0B1D32) — mirrors Slide 1 for bookend symmetry
- Gold left accent bar (thin vertical line on the left edge, same as Slide 1 if present)
- Title in white serif, large (40-48px), centred or left-aligned
- Body text in light grey below, generous line height
- Gold horizontal divider line between body and contact info
- Contact details in gold, single row or stacked, near the bottom
- Footer in muted grey, smallest text
- Subtle fade-in with delay on the title
- Optional: faint gold gradient glow behind the title, matching Slide 1's visual feel
