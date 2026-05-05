# LCB Fair App — Complete Content & Design Brief

---

## Global Instructions for Antigravity

### Language
The ENTIRE app must be in English — not just the About Us slides. This includes:
- **Home hub menu** (Brochure, Contacts, About Us, Send a Request)
- **Brochure section** (product cards, tags, selection UI, floating CTA)
- **Contact form** (all field labels, placeholders, role chips, validation messages, success screen)
- **Contacts page** (labels, save button, vCard description)
- **Staff panel** (lead cards, export button, empty state)
- **All buttons, toasts, tooltips, and micro-copy**

Implement a single `LANG` dictionary object at the top of the file. All visible strings must come from this object — no hardcoded text in components. This makes future translation a single-object swap.

### Scroll Snapping (About Us slides only)
```css
.slider-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

.slide {
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 24px 40px;
  box-sizing: border-box;
}
```

### Country flags
Use real flag images from flagcdn.com, NOT emoji:
```
https://flagcdn.com/w40/{iso_code}.png
```

---

## HOME HUB MENU

| Item | Icon | Label | Description |
|------|------|-------|-------------|
| 1 | 📄 | Brochures | Browse and download our catalogues |
| 2 | 📇 | Contacts | Save our contact info to your phone |
| 3 | 🏢 | About Us | Discover who we are |
| 4 | ✉️ | Send a Request | Get in touch with our team |

**Footer:** LCB S.r.l. — Roseto degli Abruzzi, Italy

---

## BROCHURE SECTION

Keep the current structure (product grid → selection → form → success). Translate all UI:

- Floating CTA: "{n} selected" → "Continue"
- Form title: "Your Details"
- Form subtitle: "Fill in the form to download the selected brochures and be contacted."
- Fields: Full Name, Email, Phone, Company, Role, Notes / Interests
- Role chips: Buyer, Distributor, Agent, Shop Owner, Beautician / Hairdresser, Other
- Submit button: "Submit & Download Brochures"
- Success title: "Thank you, {name}!"
- Success body: "Brochures sent to {email}. We'll be in touch soon."

---

## CONTACTS PAGE

- Section title: "Our Contacts"
- Subtitle: "Tap to call, email, or find us on the map."
- Save button: "Save to Phone Contacts"
- Confirmation: "Contact saved!"
- Helper text: "A .vcf file will be downloaded — open it to add LCB to your address book"

---

## SEND A REQUEST

- Section title: "Send a Request"
- Subtitle: "Write to us and we'll get back to you shortly."
- Submit button: "Send Request"
- Success: "Request sent! We'll reply to {email} as soon as possible."

---

## STAFF PANEL

- Title: "Collected Leads"
- Subtitle: "{n} contact(s) from the fair"
- Empty state: "No leads yet. Contacts will appear here."
- Badge on each lead: "NEW"
- Export button: "Export CSV"

---

## ABOUT US — 7 SLIDES

### Design Direction — NOT generic

The current About Us feels like a plain text page on a dark background. It needs to feel like a **premium brand experience** — something you'd see at a high-end cosmetics booth, not a tech startup pitch deck.

**Design principles:**
- **Editorial / magazine feel** — think Aesop, La Mer, Diptyque websites. Large serif typography, generous whitespace, subtle motion.
- **Photography-driven** (or illustration-driven if no photos available) — each slide should have a strong visual anchor, not just text on a background. If no real product photos are available, use abstract visuals: macro textures (cream swirls, liquid drops, botanical close-ups), geometric patterns, or gradient meshes that evoke luxury cosmetics.
- **Varied layouts per slide** — do NOT repeat the same layout. Mix: full-bleed image with text overlay, split screen, centered headline with scattered elements, card grids, timeline with visual markers, etc.
- **Motion** — staggered fade-in on each slide's elements as it snaps into view (use Intersection Observer or scroll-triggered animations). Subtle parallax on background elements. The flag marquee already scrolls.
- **Colour palette** — keep the navy (#0B1D32) + gold (#D4A04A) + teal (#0E7C7B) brand palette but use it with more contrast and drama. Not every slide needs to be dark — alternate between dark and light slides for rhythm. Example: Slide 1 dark, Slide 2 light, Slide 3 dark, etc.
- **Typography** — use a distinctive serif for headlines (e.g. Playfair Display, Cormorant Garamond) paired with a clean sans for body (DM Sans, Outfit). Headlines should be large and confident (48-72px on desktop, scaled for mobile).

### Slide 1 — Title

**Layout:** Full-screen dark, centered content, minimal

**Title:** Braderm
**Subtitle:** Dermocosmetic Innovation Since 2007
**Bottom:** LCB S.r.l. — Laboratori Chimici Braccili · Roseto degli Abruzzi, Italy

*Design note: the brand name should feel monumental — very large serif, gold colour, with a subtle entrance animation (fade up + slight scale). The subtitle in a lighter weight below. Consider a faint abstract texture or gradient mesh in the background to avoid flat emptiness.*

---

### Slide 2 — Our Story

**Layout:** Vertical timeline on the left, large stat card on the right (desktop) or stacked (mobile)

**Section title:** Our Story

**2007 — Braderm Is Born**
Founded in Roseto degli Abruzzi, the company enters the dermocosmetic market with a portfolio spanning Dermatology, Gynaecology, ENT and Paediatrics. A team of dedicated professionals drives steady growth and nationwide recognition.

**2013 — L.C.B. Laboratories Launch**
Laboratori Chimici Braccili: in-house R&D and manufacturing for Braderm-branded products and private-label clients. A decisive step toward full innovation control.

**Today — A Dermocosmetic Leader**
~50 products in portfolio, a widespread network of medical reps across Italy, and a growing international presence in over 13 countries.

**Stat cards:**
- ~50 Products
- 4 Medical Areas

*Design note: timeline markers should be visually distinct (coloured circles with year inside). Consider animating each entry as the slide snaps in — stagger 200ms between entries. The stat cards should feel weighty (large numbers, small labels). Use a light background for this slide to break the dark rhythm.*

---

### Slide 3 — Our Medical Devices

**Layout:** Three product cards side by side (horizontal scroll on mobile)

**Section title:** Our Medical Devices
**Subtitle:** Innovative medical devices for real clinical needs

**Zoylak** — Benzoyl peroxide 4% · Facial acne treatment
**Dorsak** — Benzoyl peroxide 6% spray · Back acne treatment
**Micobat Lavanda** — Boric Acid · Feminine intimate hygiene and wellness

*Design note: each card should have a coloured accent (top border or side stripe), an icon or abstract visual, and the product info. Cards should have subtle hover/tap elevation. Consider a dark background for this slide with the cards in white/light — the contrast makes them pop.*

---

### Slide 4 — Laboratori Chimici Braccili

**Layout:** Split — left side is a descriptive block, right side is 3 numbered key points

**Section title:** Laboratori Chimici Braccili
**Subtitle:** Research, Development & Manufacturing Since 2013

**Main paragraph:**
L.C.B. laboratories produce both Braderm-branded products and private-label formulations, ensuring full quality control and innovation at every stage of the production process.

**1 — Advanced Research**
Cutting-edge formulations for the dermocosmetic industry

**2 — Selected Ingredients**
Raw materials of the highest quality and safety standards

**3 — Private Label**
End-to-end development and manufacturing for third-party brands

*Design note: dark background works well here. The numbered points should feel structured — teal circles with numbers, bold titles, muted descriptions. The left block could have a frosted glass card effect.*

---

### Slide 5 — Distribution Model

**Layout:** Two columns — channels on the left, key message on the right (or a visual element)

**Section title:** Our Distribution Model
**Subtitle:** A comprehensive network from local to global

**Channels:**
- Wholesalers and pharmaceutical cooperatives
- Direct sales to pharmacies
- Medical sales representatives across the Italian territory
- International distributor network in continuous expansion

**Key message:**
Braderm works in close partnership with the medical community, ensuring a science-driven approach to product promotion and usage.

*Design note: light background. Channels could be displayed as icon + text rows rather than plain bullets. The key message could sit in a highlighted quote-style block with a gold left border.*

---

### Slide 6 — International Presence

**Layout:** Centred big stat at top, flag marquee strip below

**Section title:** Where We Are
**Key stat:** 13+ Countries Worldwide

**Flag strip (infinite marquee, right to left):**

| Country | ISO Code | Flag URL |
|---------|----------|----------|
| Italy (HQ) | it | flagcdn.com/w40/it.png |
| Austria | at | flagcdn.com/w40/at.png |
| Germany | de | flagcdn.com/w40/de.png |
| Romania | ro | flagcdn.com/w40/ro.png |
| Albania | al | flagcdn.com/w40/al.png |
| Moldova | md | flagcdn.com/w40/md.png |
| Ireland | ie | flagcdn.com/w40/ie.png |
| Greece | gr | flagcdn.com/w40/gr.png |
| Cyprus | cy | flagcdn.com/w40/cy.png |
| Georgia | ge | flagcdn.com/w40/ge.png |
| Lebanon | lb | flagcdn.com/w40/lb.png |
| Libya | ly | flagcdn.com/w40/ly.png |
| Azerbaijan | az | flagcdn.com/w40/az.png |
| Colombia | co | flagcdn.com/w40/co.png |

Italy should be visually distinguished as HQ (gold border or small "HQ" badge).

**Marquee CSS:**
```css
.flag-strip-wrapper { overflow: hidden; width: 100%; }
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
Duplicate the flag list in the DOM for seamless loop.

*Design note: dark background, the "13+" should be huge and gold (80-100px), centred. The flag strip sits in the lower third of the slide. Each flag should be a small rounded rectangle image (not emoji) with the country name beside it in white. Consider a second row of flags moving in the opposite direction for visual richness.*

---

### Slide 7 — Closing

**Layout:** Centred, dark, minimal — mirror the title slide for bookend symmetry

**Title:** Innovation at the Service of Health

**Body:**
Safe, effective, and cutting-edge dermocosmetic solutions for the medical community and industry professionals.

**Contact info:**
- info@lcb-srl.it
- www.lcb-srl.it
- +39 085 123 4567

**Footer:** LCB S.r.l. — Laboratori Chimici Braccili — Roseto degli Abruzzi (TE), Italy

*Design note: same energy as Slide 1 — gold title, subtle background texture, contact info in a clean row at the bottom. The title should fade in with a slight delay. Consider a gentle gold gradient glow behind the title text.*
