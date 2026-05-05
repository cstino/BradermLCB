# Braderm — About Us Presentation (7 Slides)

---

## Instructions for Antigravity

### Scroll Snapping (magnetic slide effect)
The presentation must work as a full-screen vertical slider with **scroll snapping**: each slide takes up 100% of the viewport and a small scroll automatically locks to the next slide.

```css
/* Parent container */
.slider-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

/* Each slide */
.slide {
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

### Language / i18n
All visible text must be **externalised into a single dictionary object** at the top of the file so it can be swapped for any language without touching the components. Structure:

```js
const LANG = {
  slide1: { title: "Braderm", subtitle: "Dermocosmetic Innovation Since 2007", ... },
  slide2: { ... },
  // ...
};
```

The current version is in **English**. To switch to Italian (or any other language), only the `LANG` object needs to change.

### Country flags
Do NOT use emoji flags — they render inconsistently across OS/browsers. Use real flag icon images instead. Recommended source:

```
https://flagcdn.com/w40/{code}.png
```

Where `{code}` is the ISO 3166-1 alpha-2 lowercase code. Examples:
- Italy: `https://flagcdn.com/w40/it.png`
- Germany: `https://flagcdn.com/w40/de.png`

This CDN serves optimised PNGs at various widths (w20, w40, w80). Use `w40` for the flag strip, `w80` if flags need to be larger.

---

## Slide 1 — Title

**Title:** Braderm

**Subtitle:** Dermocosmetic Innovation Since 2007

**Bottom details:**
- LCB S.r.l. — Laboratori Chimici Braccili
- Roseto degli Abruzzi (TE) — Italy

---

## Slide 2 — Our Story

**Section title:** Our Story

**Timeline:**

**2007 — Braderm Is Born**
Founded in Roseto degli Abruzzi, the company enters the dermocosmetic market with a product portfolio spanning Dermatology, Gynaecology, ENT and Paediatrics. A team of dedicated professionals drives steady growth and nationwide recognition.

**2013 — L.C.B. Laboratories Launch**
Laboratori Chimici Braccili: in-house research and manufacturing for both Braderm-branded products and private-label clients. A decisive step toward full innovation control.

**Today — A Dermocosmetic Leader**
Approximately 50 products in portfolio, a widespread network of medical representatives across Italy, and a growing international presence in over 13 countries.

**Key stat:** ~50 products in portfolio
**Therapeutic areas:** Dermatology · Gynaecology · ENT · Paediatrics

---

## Slide 3 — Our Medical Devices

**Section title:** Our Medical Devices

**Subtitle:** Innovative medical devices for real clinical needs

**Product 1 — Zoylak**
Benzoyl peroxide 4%
Facial acne treatment

**Product 2 — Dorsak**
Benzoyl peroxide 6% spray
Back acne treatment

**Product 3 — Micobat Lavanda**
Boric Acid
Feminine intimate hygiene and wellness

---

## Slide 4 — Laboratori Chimici Braccili

**Section title:** Laboratori Chimici Braccili

**Subtitle:** Research, development and manufacturing since 2013

**Main paragraph:**
L.C.B. laboratories produce both Braderm-branded products and private-label formulations, ensuring full quality control and innovation at every stage of the production process.

**Point 1 — Advanced Research**
Cutting-edge formulations for the dermocosmetic industry

**Point 2 — Selected Ingredients**
Raw materials of the highest quality and safety standards

**Point 3 — Private Label**
End-to-end development and manufacturing for third-party brands

---

## Slide 5 — Distribution Model

**Section title:** Our Distribution Model

**Subtitle:** A comprehensive network from local to global

**Channels:**
- Wholesalers and pharmaceutical cooperatives
- Direct sales to pharmacies
- Medical sales representatives across the Italian territory
- International distributor network in continuous expansion

**Collaboration with the medical community:**
Braderm works in close partnership with the medical community, ensuring a science-driven approach to product promotion and usage.

---

## Slide 6 — International Presence

**Section title:** Where We Are

**Key stat:** 13+ countries worldwide

### Flag strip

A horizontal strip of country flags that auto-scrolls in an infinite loop (marquee, right to left). Each flag is followed by the country name. Use real flag images from flagcdn.com, NOT emoji.

**Countries with ISO codes for flag URLs:**

| Country | Code | Flag URL |
|---------|------|----------|
| Italy (HQ) | it | https://flagcdn.com/w40/it.png |
| Austria | at | https://flagcdn.com/w40/at.png |
| Germany | de | https://flagcdn.com/w40/de.png |
| Romania | ro | https://flagcdn.com/w40/ro.png |
| Albania | al | https://flagcdn.com/w40/al.png |
| Moldova | md | https://flagcdn.com/w40/md.png |
| Ireland | ie | https://flagcdn.com/w40/ie.png |
| Greece | gr | https://flagcdn.com/w40/gr.png |
| Cyprus | cy | https://flagcdn.com/w40/cy.png |
| Georgia | ge | https://flagcdn.com/w40/ge.png |
| Lebanon | lb | https://flagcdn.com/w40/lb.png |
| Libya | ly | https://flagcdn.com/w40/ly.png |
| Azerbaijan | az | https://flagcdn.com/w40/az.png |
| Colombia | co | https://flagcdn.com/w40/co.png |

**CSS for seamless infinite marquee:**
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
Duplicate the entire flag list in the DOM so that when the first copy scrolls out on the left, the second is already visible — seamless loop.

**Italy should be visually distinguished** as the headquarters (e.g. gold border or "(HQ)" label next to it).

---

## Slide 7 — Closing

**Title:** Innovation at the Service of Health

**Body:**
Safe, effective, and cutting-edge dermocosmetic solutions for the medical community and industry professionals.

**Contact:**
- Email: info@lcb-srl.it
- Web: www.lcb-srl.it
- Phone: +39 085 123 4567

**Footer:** LCB S.r.l. — Laboratori Chimici Braccili — Roseto degli Abruzzi (TE), Italy
