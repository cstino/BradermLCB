# Reports Dashboard — Complete Rebuild

## Goal
Rebuild the "Reports" tab in the Staff Hub from scratch into a modern, data-rich dashboard. The current version is just a static page with two info blocks — we need a real performance dashboard with live data, visualisations, and actionable insights.

## Layout Overview

The page should be organised in **5 distinct sections**, stacked vertically (or in a 2-column grid on desktop where it makes sense):

1. **Top KPI Bar** — Live activity counters (always at top, sticky if possible)
2. **World Heatmap** — Interactive map showing countries with leads
3. **Traffic Heatmap** — Day × Hour grid of QR scans
4. **Top Interests** — Brochure download ranking
5. **Hot Leads** — Top 5 highest-priority leads to follow up

Use the existing brand palette: navy `#0B1D32`, gold `#D4A04A`, teal `#0E7C7B`, off-white `#F5F7FA`, light grey `#E8ECF0`.

---

## Section 1 — Top KPI Bar (Live Activity)

A horizontal row of 4 KPI cards at the very top of the page, below the page title "Fair Performance Report".

### KPI Cards

**Card 1 — Total Leads**
- Big number, count-up animation when the page loads (animate from 0 to actual value over 1.5s)
- Small live indicator: green pulsing dot + "LIVE" label
- Subtitle: "since fair start"

**Card 2 — Last Lead**
- Relative time: "2 minutes ago"
- Lead snippet: "John Smith — Lebanon"
- Updates automatically when a new lead comes in

**Card 3 — Conversion Rate**
- Percentage with count-up animation
- Formula: `(completed forms / total QR scans) * 100`
- Small subtitle: "of QR scans converted"

**Card 4 — Peak Hour Today**
- Time range: "14:00 — 15:00"
- Lead count: "8 leads"
- Subtitle: "busiest hour"

### Visual style
- Each card: white background, rounded corners (16px), subtle shadow, padding 24px
- Big number in bold serif (e.g. Playfair Display), 36-44px, navy or gold colour
- Labels in uppercase small caps (DM Sans), 11px, muted grey
- Live pulsing dot: small green circle (#22C55E) with CSS animation:
```css
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}
.live-dot {
  animation: pulse 2s infinite;
}
```
- Count-up animation: use a simple JS function that increments the displayed number from 0 to target over 1500ms with easing

---

## Section 2 — World Heatmap

Replace the current "Global Reach (by country)" list with an **interactive SVG world map**.

### Behaviour
- All countries displayed in light grey by default
- Countries with leads coloured in **gold** (`#D4A04A`), with intensity proportional to lead count:
  - 1 lead: light gold (#F2E0B5)
  - 2-4 leads: medium gold (#E8C170)
  - 5+ leads: full gold (#D4A04A)
- Hover/tap on a country: tooltip appears with country name + lead count + last lead date
- Italy always highlighted in **teal** (#0E7C7B) as HQ marker

### Implementation
Use the **react-simple-maps** library (lightweight, perfect for this use case):

```bash
npm install react-simple-maps
```

```jsx
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

<ComposableMap projection="geoMercator">
  <Geographies geography={geoUrl}>
    {({ geographies }) =>
      geographies.map(geo => {
        const leadCount = leadsByCountry[geo.properties.name] || 0;
        const fill = getColorForCount(leadCount);
        return (
          <Geography
            key={geo.rsmKey}
            geography={geo}
            fill={fill}
            stroke="#FFF"
            strokeWidth={0.5}
            onMouseEnter={() => setTooltip(geo.properties.name, leadCount)}
            onMouseLeave={() => setTooltip(null)}
            style={{
              default: { outline: "none" },
              hover: { fill: "#0E7C7B", cursor: "pointer" },
            }}
          />
        );
      })
    }
  </Geographies>
</ComposableMap>
```

Below the map, keep a small legend: a horizontal gradient bar showing "0 leads" (grey) → "5+ leads" (full gold).

### Card style
White card with rounded corners and a section title "GLOBAL REACH" in uppercase muted grey. Map should be roughly 600px wide on desktop, full-width on mobile.

---

## Section 3 — Traffic Heatmap

A GitHub-style contribution heatmap showing fair traffic intensity by **day × hour**.

### Structure
- Y-axis: hours of the day (e.g. 09:00, 10:00, ..., 19:00 — typical fair hours)
- X-axis: days of the fair (e.g. Day 1, Day 2, Day 3...)
- Each cell is a small square (24×24px), coloured by intensity:
  - 0 scans: very light grey (`#F0EBE1`)
  - 1-2: light teal (`#A4D4D3`)
  - 3-5: medium teal (`#5BA8A7`)
  - 6+: full teal (`#0E7C7B`)
- Hover/tap on a cell: tooltip with "Day 2, 14:00 — 8 scans"
- Subtle gap between cells (2-3px)

### Insights below the grid
After the heatmap, display 2-3 auto-generated text insights:
- "Peak traffic: Day 2, 14:00–15:00 (8 scans)"
- "Quietest period: Day 1, 09:00–10:00 (0 scans)"
- "Average: 3.2 scans/hour"

### Card style
Same white-card style as the other sections. Title: "TRAFFIC HEATMAP".

---

## Section 4 — Top Interests (Brochure Ranking)

A ranked list of the most-downloaded brochures.

### Layout
- Section title: "MOST REQUESTED BROCHURES"
- List of brochures with rank position, name, count, and animated horizontal bar showing relative popularity

### Visual structure per row
```
[1]  Skincare              ████████████████████  24
[2]  Haircare              ███████████████        18
[3]  Sun Care              ██████████              12
[4]  Make-Up                ████████                9
[5]  Body Care              ██████                  7
```

### Style details
- Top 3 ranks get medal indicators: gold/silver/bronze coloured circles with the number inside
- Bar fills are animated (grow from 0 to full width on page load, 800ms ease-out)
- Bar colours: gold for #1, lighter shades descending for the rest
- Brochure name in bold navy
- Count number on the right in muted grey

### Card style
White card. Title: "TOP INTERESTS".

---

## Section 5 — Hot Leads (Lead Quality Score)

A list of the top 5 highest-priority leads, scored by an algorithm.

### Scoring algorithm
Each lead gets a score from 0 to 100 based on:

| Factor | Points |
|--------|--------|
| Role = Buyer | +30 |
| Role = Distributor | +25 |
| Role = Agent | +20 |
| Role = Shop Owner | +10 |
| Role = Other / empty | +5 |
| Phone provided | +15 |
| Notes/interests provided | +10 |
| 3+ brochures requested | +20 |
| 1-2 brochures requested | +10 |
| Country in target list (Italy, Germany, Romania, Albania, Moldova, Turkey, Lebanon, etc.) | +15 |

Show the top 5 leads sorted by score, descending.

### Visual structure per lead row
- Quality badge on the left: **5 stars filled** (90-100), **4 stars** (70-89), **3 stars** (50-69), **2 stars** (30-49), **1 star** (<30)
- Lead name in bold
- Company + Role
- Score number in a coloured pill (gold for 80+, teal for 50-79, grey for <50)
- "Contact" button on the right (opens email client with `mailto:` link to lead's email)

### Style details
- Each row in a light card with hover effect (slight elevation + cursor pointer)
- Badge colour: gold star (#D4A04A) for filled stars, light grey for empty
- Animated entrance: rows fade in with stagger (100ms between each)

### Card style
White card. Title: "HOT LEADS — TOP 5 TO CONTACT FIRST".

---

## Bottom of page — CSV Export

Keep the existing "Detailed analytics and data exports available in the CSV export" footer card, but make the icon and CTA more prominent: turn it into a real **download button** that exports all leads as CSV. Style it as a primary gold button.

---

## General notes for Antigravity

- All sections use the same card design language: white background, 16px border-radius, soft shadow, 24-32px padding
- Use **DM Sans** for body and **Playfair Display** for big numbers/headlines
- All animations should be subtle and fast (≤1500ms), nothing distracting
- The page must be fully responsive — on mobile, all sections stack to full width and the world map and heatmap stay readable
- Data shown should come from the actual leads database (Supabase) — don't hardcode mock data, use real queries
- Add a refresh button or auto-refresh every 30 seconds to keep KPIs live
