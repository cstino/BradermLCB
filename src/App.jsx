import { useState, useEffect, useRef } from "react";

// ─── Design Tokens ───
// ─── CONSTANTS & THEME ───
const T = {
  navy: "#0B1D32",
  gold: "#D4A04A",
  teal: "#0E7C7B",
  white: "#FFFFFF",
  cream: "#F9F7F2",
  muted: "#6B7C93",
  success: "#4CAF50",
  error: "#FF5252",
  goldGlow: "rgba(212,160,74,0.12)",
  cardBg: "rgba(255,255,255,0.9)",
};

const SERIF = "'Playfair Display', serif";
const FONT = "'Outfit', sans-serif";

const COMPANY = {
  name: "LCB S.r.l.",
  sub: "Laboratori Chimici Braccili",
  address: "Via Scozia 5, 64026, Roseto degli Abruzzi (TE), Italy",
  email: "laboratorio@lcblab.com",
  phone: "+39 085 946 3073",
  whatsapp: "+39 3793096073",
  websites: ["www.braderm.com", "www.lcblab.com"]
};

const LANG = {
  home: {
    menu: [
      { id: "brochure", icon: "book", label: "Brochures", desc: "Browse and download our catalogues" },
      { id: "contacts", icon: "ear", label: "Contacts", desc: "Save our contact info to your phone" },
      { id: "about", icon: "sparkle", label: "About Us", desc: "Discover who we are" },
      { id: "request", icon: "plus", label: "Send a Request", desc: "Get in touch with our team" }
    ],
    footer: `${COMPANY.name} — ${COMPANY.address}`
  },
  brochure: {
    title: "Our Brochures",
    sub: "Select the catalogues you are interested in and download them.",
    btnSelect: "Continue",
    selected: "selected",
    cardView: "View 👁",
    cardDownload: "Download ↓"
  },
  form: {
    title: "Your Details",
    sub: "Fill in the form to download the selected brochures and be contacted.",
    fields: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      company: "Company",
      role: "Your Role",
      notes: "Notes / Interests"
    },
    roles: ["Buyer", "Distributor", "Agent", "Shop Owner", "Beautician / Hairdresser", "Other"],
    submit: "Submit & Download Brochures",
    back: "Back to Selection",
    successTitle: "Thank you, {name}!",
    successBody: "Brochures sent to {email}. We'll be in touch soon.",
    successList: "Your selected brochures",
    newRequest: "New Request",
    menu: "Menu"
  },
  contacts: {
    title: "Our Contacts",
    sub: "Tap to call, email, or find us on the map.",
    saveBtn: "Save to Phone Contacts",
    vcardHelper: "A .vcf file will be downloaded — open it to add LCB to your address book",
    toast: "Contact saved!"
  },
  request: {
    title: "Send a Request",
    sub: "Write to us and we'll get back to you shortly.",
    submit: "Send Request",
    success: "Request sent! We'll reply to {email} as soon as possible."
  },
  staff: {
    title: "Collected Leads",
    subtitle: "{n} contact(s) from the fair",
    empty: "No leads yet. Contacts will appear here.",
    badge: "NEW",
    export: "Export CSV"
  },
  about: {
    slide1: {
      title: "Braderm",
      sub: "Dermocosmetic Innovation Since 2007",
      details: ["LCB S.r.l. — Laboratori Chimici Braccili", "Roseto degli Abruzzi (TE) — Italy"]
    },
    slide2: {
      title: "Our Story",
      timeline: [
        { year: "2007", title: "Braderm Is Born", text: "Founded in Roseto degli Abruzzi, the company enters the dermocosmetic market with a portfolio spanning Dermatology, Gynaecology, ENT and Paediatrics. A team of dedicated professionals drives steady growth and nationwide recognition." },
        { year: "2013", title: "L.C.B. Laboratories Launch", text: "Laboratori Chimici Braccili: in-house R&D and manufacturing for Braderm-branded products and private-label clients. A decisive step toward full innovation control." },
        { year: "Today", title: "A Dermocosmetic Leader", text: "~50 products in portfolio, a widespread network of medical reps across Italy, and a growing international presence in over 13 countries." }
      ],
      stats: [
        { val: "~50", lab: "Products" },
        { val: "4", lab: "Medical Areas" }
      ]
    },
    slide3: {
      title: "Our Medical Devices",
      sub: "Innovative medical devices for real clinical needs",
      products: [
        { name: "Zoylak", desc: "Benzoyl peroxide 4%", use: "Facial acne treatment" },
        { name: "Dorsak", desc: "Benzoyl peroxide 6% spray", use: "Back acne treatment" },
        { name: "Micobat Lavanda", desc: "Boric Acid", use: "Feminine intimate hygiene and wellness" }
      ]
    },
    slide4: {
      title: "Laboratori Chimici Braccili",
      sub: "Research, Development & Manufacturing Since 2013",
      main: "L.C.B. laboratories produce both Braderm-branded products and private-label formulations, ensuring full quality control and innovation at every stage of the production process.",
      points: [
        { t: "Advanced Research", d: "Cutting-edge formulations for the dermocosmetic industry" },
        { t: "Selected Ingredients", d: "Raw materials of the highest quality and safety standards" },
        { t: "Private Label", d: "End-to-end development and manufacturing for third-party brands" }
      ]
    },
    slide5: {
      title: "Our Distribution Model",
      sub: "A comprehensive network from local to global",
      channels: [
        "Wholesalers and pharmaceutical cooperatives",
        "Direct sales to pharmacies",
        "Medical sales representatives across the Italian territory",
        "International distributor network in continuous expansion"
      ],
      collaboration: "Braderm works in close partnership with the medical community, ensuring a science-driven approach to product promotion and usage."
    },
    slide6: {
      title: "Where We Are",
      stat: "13+ Countries Worldwide",
      sub: "International Reach",
      countries: [
        { n: "Italy (HQ)", c: "it" }, { n: "Austria", c: "at" }, { n: "Germany", c: "de" },
        { n: "Romania", c: "ro" }, { n: "Albania", c: "al" }, { n: "Moldova", c: "md" },
        { n: "Ireland", c: "ie" }, { n: "Greece", c: "gr" }, { n: "Cyprus", c: "cy" },
        { n: "Georgia", c: "ge" }, { n: "Lebanon", c: "lb" }, { n: "Libya", c: "ly" },
        { n: "Azerbaijan", c: "az" }, { n: "Colombia", c: "co" }
      ]
    },
    slide7: {
      title: "Innovation at the Service of Health",
      body: "Safe, effective, and cutting-edge dermocosmetic solutions for the medical community and industry professionals.",
      footer: "LCB S.r.l. — Laboratori Chimici Braccili — Roseto degli Abruzzi (TE), Italy"
    }
  }
};

const Icon = ({ name, size = 24, color = "currentColor", fill = "none", strokeWidth = 2 }) => {
  const paths = {
    book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3.5a.5.5 0 0 0-.5-.5H6.5A2.5 2.5 0 0 0 4 5.5v14z M12 3v14",
    tube: "M7 2v18a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2M7 5h10M7 8h10",
    hair: "M12 2c-3.31 0-6 2.69-6 6 0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6zm0 14c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z",
    ear: "M16 8.5c0-2.5-2-4.5-4.5-4.5S7 6 7 8.5c0 1.5.5 2.5 1.5 3.5s2 2 2 3.5v2.5h2V15.5c0-1.5 1-2.5 2-3.5s1.5-2 1.5-3.5z",
    plus: "M12 5v14M5 12h14",
    sparkle: "M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z",
    flask: "M9 3h6v3l4 10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L9 6V3z M9 8h6",
    edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
    trash: "M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M10 11v6 M14 11v6",
    phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
    whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.541 4.19 1.57 6.04L0 24l6.117-1.605a11.803 11.803 0 005.925 1.598h.005c6.635 0 12.032-5.396 12.035-12.032a11.762 11.762 0 00-3.466-8.498",
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
    globe: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
    mapPin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    truck: "M1 14h15V4H1v10z M16 14h5l3-3V7h-8v7z M3 14a3 3 0 1 0 6 0 3 3 0 0 0-6 0z M17 14a3 3 0 1 0 6 0 3 3 0 0 0-6 0z",
    shop: "M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z M3 3h18v6H3V3z M12 3v6",
    users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
    search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35",
    chevronRight: "M9 18l6-6-6-6",
    check: "M20 6L9 17l-5-5",
    file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6"
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || paths.book} />
    </svg>
  );
};

const BROCHURES_INITIAL = [
  { id: 1, line: "BRADERM", title: "General Catalogue", desc: "Complete dermocosmetic range", color: T.navy, icon: "book", file: "/brochure/braderm.pdf", cover: "https://xogyjctphyuyneldhrff.supabase.co/storage/v1/object/public/assets/braderm_cover.png", active: true },
  { id: 2, line: "BRADERM", title: "Acne & Mycosis", desc: "Specialized skin treatments", color: T.teal, icon: "tube", file: "/brochure/acne-mycosis.pdf", cover: "https://xogyjctphyuyneldhrff.supabase.co/storage/v1/object/public/assets/acne_cover.png", active: true },
  { id: 3, line: "BRADERM", title: "Keratosis & Hair", desc: "Dischromia and hair solutions", color: T.gold, icon: "hair", file: "/brochure/Keratosis-Dischromia-Hair.pdf", cover: "https://xogyjctphyuyneldhrff.supabase.co/storage/v1/object/public/assets/hair_cover.png", active: true },
  { id: 4, line: "BRADERM", title: "ENT Line", desc: "Ear, Nose and Throat care", color: "#4A90E2", icon: "ear", file: "/brochure/ent.pdf", cover: "https://xogyjctphyuyneldhrff.supabase.co/storage/v1/object/public/assets/ent_cover.png", active: true },
  { id: 5, line: "BRADERM", title: "General Medicine", desc: "Primary care solutions", color: "#50E3C2", icon: "plus", file: "/brochure/general_medicine.pdf", cover: "https://xogyjctphyuyneldhrff.supabase.co/storage/v1/object/public/assets/medicine_cover.png", active: true },
  { id: 6, line: "LCB LAB", title: "Luxury Line", desc: "Premium wellness solutions", color: "#B8860B", icon: "sparkle", file: "/brochure/luxury.pdf", cover: "https://xogyjctphyuyneldhrff.supabase.co/storage/v1/object/public/assets/luxury_cover.png", active: true },
  { id: 7, line: "LCB LAB", title: "Private Label", desc: "Your customized product line", color: T.teal, icon: "flask", file: "/brochure/LCB_private_label.pdf", cover: "https://xogyjctphyuyneldhrff.supabase.co/storage/v1/object/public/assets/private_label_cover.png", active: true },
];

const TECHNICAL_SHEETS = [
  "ADIPHASE CREMA", "ADIPHASE SCRUB", "AKARISCAB Doccia shampoo", "AKARISCAB topical treatment",
  "AXATOPIC CREMA", "AXATOPIC DETERGENTE", "AZEKUR", "AZN CREMA", "AZN SCRUB", "CIKAVES",
  "CONTORNO OCCHI BRADERM", "CREMA INTIMA DEF", "D.G.M. PLUS", "DETERGENTE DELICATO DEF",
  "DISTROFYD", "DORSAK", "ELACTIVE DEF", "Exoker Doccia shampoo", "Exoker Spray",
  "HIDRANUR", "KERATO 20", "KERATO PSOR DETERGENTE", "KERATO PSOR SHAMPOO", "KERATO-FORTE",
  "KURAC DEF (ZOYLAK)", "KURAGE 2024", "LAKERAL", "LIOKER SHAMPOO", "MICOBAT CREMA",
  "MICOBAT DETERGENTE", "MICOBAT LAVANDA DEF", "MICOBAT POLVERE", "ONYCROM", "OXAGE 2024",
  "PHOTOALA-5", "PHOTOXAL-8", "PHYSIOCLIN", "ROSAC", "SHAMPOO DS", "SHAMPOO OILY SCALP",
  "TRAMEXAL 2%", "TRAMEXAL dec", "TRIKO FORTE SHAMPOO", "VERRUXINE GEL", "VERSIACTIVE DETERGENTE DEF",
  "VERSIACTIVE SPRAY", "VIXAGE", "ZINCO MONODOSE", "ZOYLAK MOUSSE"
].map(name => ({
  name,
  file: `/technical_sheets/${name}${name.includes("AKARISCAB Doccia") || name.includes("Exoker") ? " - technical data sheet" : (name.includes("PHOTO") || name.includes("ZINCO") || name.includes("ADIPHASE") || name.includes("CREMA INTIMA") || name.includes("ELACTIVE") || name.includes("CONTORNO") || name.includes("TRAMEXAL") ? "" : " - information sheet")}.pdf`
})).map(item => {
  // Fix specific filenames that don't follow the general pattern
  if (item.name === "AKARISCAB topical treatment") item.file = "/technical_sheets/AKARISCAB topical treatment.pdf";
  if (item.name === "PHOTOALA-5") item.file = "/technical_sheets/PHOTOALA-5.pdf";
  if (item.name === "PHOTOXAL-8") item.file = "/technical_sheets/PHOTOXAL-8.pdf";
  if (item.name === "ZINCO MONODOSE") item.file = "/technical_sheets/ZINCO MONODOSE - en.pdf";
  if (item.name === "ADIPHASE CREMA") item.file = "/technical_sheets/ADIPHASE CREMA - en.pdf";
  if (item.name === "ADIPHASE SCRUB") item.file = "/technical_sheets/ADIPHASE SCRUB - en.pdf";
  if (item.name === "CREMA INTIMA DEF") item.file = "/technical_sheets/CREMA INTIMA DEF en.pdf";
  if (item.name === "ELACTIVE DEF") item.file = "/technical_sheets/ELACTIVE DEF - EN.pdf";
  if (item.name === "CONTORNO OCCHI BRADERM") item.file = "/technical_sheets/CONTORNO OCCHI BRADERM - gel 2022 - EN.pdf";
  if (item.name === "TRAMEXAL 2%") item.file = "/technical_sheets/TRAMEXAL 2% - ac. cogico 0,7% - en.pdf";
  if (item.name === "TRAMEXAL dec") item.file = "/technical_sheets/TRAMEXAL dec• - en.pdf";
  if (item.name === "MICOBAT LAVANDA DEF") item.file = "/technical_sheets/MICOBAT LAVANDA DEF - en.pdf";
  if (item.name === "MICOBAT POLVERE") item.file = "/technical_sheets/MICOBAT POLVERE - information sheet - 2024.pdf";
  if (item.name === "HIDRANUR") item.file = "/technical_sheets/HIDRANUR - information sheet - nuova 2024 - EN.pdf";
  if (item.name === "KERATO-FORTE") item.file = "/technical_sheets/KERATO-FORTE nuova 2020 - information sheet.pdf";
  if (item.name === "SHAMPOO DS") item.file = "/technical_sheets/SHAMPOO DS - information sheet - NUOVO 2023.pdf";
  if (item.name === "SHAMPOO OILY SCALP") item.file = "/technical_sheets/SHAMPOO OILY SCALP with Charcoal - information sheet.pdf";
  if (item.name === "VERSIACTIVE SPRAY") item.file = "/technical_sheets/VERSIACTIVE SPRAY- information sheet - NUOVO 2022.pdf";
  if (item.name === "AZEKUR") item.file = "/technical_sheets/AZEKUR - information sheet.pdf";
  if (item.name === "CIKAVES") item.file = "/technical_sheets/CIKAVES - information sheet.pdf";
  if (item.name === "LAKERAL") item.file = "/technical_sheets/LAKERAL - information sheet.pdf";
  
  return item;
});

const COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

function Logo({ light = false, size = 26 }) {
  return (
    <div className="logo-wrap" style={{ display: "flex", alignItems: "center" }}>
      <img src="/loghi/logo_braderm.png" alt="Braderm" style={{ height: size * 1.3, objectFit: "contain" }} />
      <div className="logo-sep" style={{ width: 1, height: size * 0.8, background: light ? "rgba(255,255,255,0.2)" : "rgba(11,29,50,0.1)" }} />
      <img src="/loghi/logo_lcb.png" alt="LCB" style={{ height: size, objectFit: "contain", opacity: 0.9 }} />
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", style: sx = {}, disabled, icon, full, type = "button" }) {
  const base = {
    padding: "14px 28px", borderRadius: 30, border: "none", cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)", opacity: disabled ? 0.5 : 1, fontFamily: FONT, width: full ? "100%" : "auto",
    textTransform: "uppercase", letterSpacing: 1,
  };
  const v = {
    primary: { background: T.gold, color: T.navy },
    dark: { background: T.navy, color: T.white },
    outline: { background: "transparent", border: `2px solid ${T.navy}15`, color: T.navy },
    ghost: { background: "transparent", color: T.gold },
    success: { background: T.success, color: T.white },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ ...base, ...v[variant], ...sx }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.transform = ""; }}
    >{icon && <span style={{ fontSize: 18 }}>{icon}</span>}{children}</button>
  );
}

function BackBtn({ onClick, label }) {
  return <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: T.gold, fontSize: 13, fontWeight: 700, padding: "0 0 24px", fontFamily: FONT, textTransform: "uppercase", letterSpacing: 1 }}>← {label || "Back"}</button>;
}

const STAFF_CONTACTS = [
  { name: "Giuseppe Braccili", email: "g.braccili@braderm.com", role: "Management" },
  { name: "Cristiano Braccili", email: "c.braccili@braderm.com", role: "Management" },
  { name: "Giulia Cimini", email: "laboratorio@lcblab.com", role: "Laboratories" },
  { name: "Ludovica Coccia", email: "regolatorio@lcblab.com", role: "Regulatory" },
  { name: "Lorenza Ferretti", email: "marketing@braderm.com", role: "Marketing" }
];

const BRADERM_PRODUCTS = [
  "Zoylak", "AZN Crema", "Dorsak Spray", "Inoak", "Zoylak Mousse", "AZN Scrub", "Braderm A", "Azekur",
  "Rosac", "Exoker Spray", "Exoker Shampoo", "Shampoo DS", "DS Ker Lozione", "Versiactive Spray",
  "Versiactive Detergente", "Micobat Polvere", "MIcobat Crema Plus", "Micobat Detergente", "Micue3",
  "Onycrom", "Distrofyd", "Carbon SEB", "Lioker Shampoo", "Triko Forte Shampoo", "Triko Plus",
  "Kerato Forte", "Kerato Psor Detergente", "Kerato 20", "Kerato Psor Shampoo", "Tramexal",
  "Tramexal Deco", "Verruxine Gel", "Immuxine", "Photoala 5", "Photoala 8", "Axatopic Crema",
  "Axatopic Detergente", "Zinco Monodose", "Detergente Delicato", "Hidranur", "Lakeral", "Cikaves",
  "Eoskin", "DGM Plus", "Kuven", "Vixage", "Collage Skin", "Contorno Occhi", "Elactive", "Oxage",
  "Kurage", "Adiphase Scrub", "Adiphase Crema", "Micobat Lavanda", "Crema Intima", "Physicolin",
  "Xeron", "Rinalplus", "Naresplus", "Narestop", "Otalplus", "Golyx", "Xineflus", "Zeracid",
  "Stipactive soft", "Stipactive plus", "Lanzolact", "Sinerzym", "Noctalin", "Anxivin", "Redol ART", "Redol NEP"
];

function SectionTitle({ title, sub, center }) {
  return (
    <div style={{ marginBottom: 32, textAlign: center ? "center" : "left" }}>
      <h2 style={{ margin: 0, fontSize: "clamp(24px, 5vw, 32px)", fontFamily: SERIF, color: T.navy, lineHeight: 1.2 }}>{title}</h2>
      {sub && <p style={{ margin: "8px 0 0", fontSize: 15, color: T.muted, lineHeight: 1.5, fontFamily: FONT, fontWeight: 400 }}>{sub}</p>}
    </div>
  );
}

function Card({ children, style: sx = {} }) {
  return <div style={{ background: T.cardBg, borderRadius: 24, padding: "32px", boxShadow: "0 4px 20px rgba(10,22,40,0.06)", ...sx }}>{children}</div>;
}

function HomeMenu({ onNavigate }) {
  const L = LANG.home;
  return (
    <div style={{ animation: "fadeUp 0.6s ease" }}>
      <div style={{ textAlign: "center", padding: "40px 0 60px" }}>
        <div className="hero-logos" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          <img src="/loghi/logo_braderm.png" alt="Braderm" style={{ height: 90, objectFit: "contain" }} />
          <div className="logo-sep" style={{ width: 1, height: 50, background: `${T.navy}10` }} />
          <img src="/loghi/logo_lcb.png" alt="LCB" style={{ height: 70, objectFit: "contain", opacity: 0.8 }} />
        </div>
        <h1 style={{ margin: "0 0 8px", fontSize: 36, fontFamily: SERIF, color: T.navy, letterSpacing: -1 }}>Digital Brochure</h1>
        <p style={{ margin: 0, fontSize: 15, color: T.muted, fontFamily: FONT, letterSpacing: 1 }}>{COMPANY.sub}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, maxWidth: 600, margin: "0 auto 80px" }}>
        {L.menu.map((item, i) => (
          <div key={item.id} onClick={() => onNavigate(item.id)}
            style={{
              background: T.cardBg, padding: "24px 28px", borderRadius: 24, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 24, boxShadow: "0 4px 15px rgba(10,22,40,0.04)",
              border: `1.5px solid ${T.navy}05`, transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
              animation: `fadeUp 0.6s ease forwards ${i * 0.1}s`, opacity: 0
            }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.boxShadow = "0 15px 40px rgba(10,22,40,0.08)"; }}
               onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = `${T.navy}05`; e.currentTarget.style.boxShadow = "0 4px 15px rgba(10,22,40,0.04)"; }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: T.gold + "10", color: T.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={item.icon} size={24} color={T.gold} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 19, fontWeight: 800, color: T.navy, fontFamily: FONT }}>{item.label}</div>
              <div style={{ fontSize: 13, color: T.muted, marginTop: 2 }}>{item.desc}</div>
            </div>
            <div style={{ color: T.gold, fontSize: 24 }}>→</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto 100px", textAlign: "center", animation: "fadeUp 0.8s ease forwards 0.4s", opacity: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 20 }}>
          <div style={{ height: 1, background: `${T.navy}15`, flex: 1 }} />
          <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, color: T.muted }}>Certifications & Quality</span>
          <div style={{ height: 1, background: `${T.navy}15`, flex: 1 }} />
        </div>
        
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <img src="/certifications/certifications.png" alt="Quality Certifications" 
               style={{ width: "100%", maxWidth: 300, height: "auto", mixBlendMode: "multiply" }} />
        </div>

      </div>
    </div>
  );
}

function AboutSection({ onBack }) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setVisible(parseInt(entry.target.dataset.index)); });
    }, { threshold: 0.6 });
    const sections = document.querySelectorAll(".about-slide");
    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, []);

  const BRADERM_COUNTRIES = [
    { n: "Italy", c: "it" }, { n: "Austria", c: "at" }, { n: "Germany", c: "de" },
    { n: "Romania", c: "ro" }, { n: "United Kingdom", c: "gb" }, { n: "Ukraine", c: "ua" },
    { n: "Kuwait", c: "kw" }, { n: "Libya", c: "ly" }, { n: "Morocco", c: "ma" },
    { n: "Greece", c: "gr" }, { n: "Cyprus", c: "cy" }, { n: "Lebanon", c: "lb" },
    { n: "Vietnam", c: "vn" }
  ];

  const LCB_COUNTRIES = [
    { n: "Italy", c: "it" }, { n: "United Kingdom", c: "gb" }, { n: "Spain", c: "es" },
    { n: "USA", c: "us" }, { n: "Ukraine", c: "ua" }, { n: "Moldova", c: "md" },
    { n: "Latvia", c: "lv" }, { n: "Lithuania", c: "lt" }, { n: "Greece", c: "gr" },
    { n: "Cyprus", c: "cy" }, { n: "Colombia", c: "co" }, { n: "UAE", c: "ae" },
    { n: "Saudi Arabia", c: "sa" }, { n: "Sweden", c: "se" }
  ];

  return (
    <div className="about-container" style={{ position: "fixed", inset: 0, background: T.navy, color: T.white, overflowY: "scroll", scrollSnapType: "y mandatory", scrollBehavior: "smooth", zIndex: 2000 }}>
      {/* UI OVERLAYS */}
      <div style={{ position: "fixed", top: 25, left: 25, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: `1px solid ${T.white}20`, borderRadius: "50%", width: 48, height: 48, cursor: "pointer", color: T.white, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", transition: "0.3s" }}>✕</button>
      </div>
      <div style={{ position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 12, zIndex: 100 }}>
        {[...Array(7)].map((_, i) => (
          <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: visible === i ? T.gold : `${T.white}25`, transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)", transform: visible === i ? "scale(3)" : "scale(1)" }} />
        ))}
      </div>

      <div className="slides-wrapper">
        {/* SLIDE 1: TITLE */}
        <section data-index={0} className={`about-slide slide-dark ${visible === 0 ? "active" : ""}`} style={{ 
          backgroundImage: 'linear-gradient(rgba(10, 25, 47, 0.85), rgba(10, 25, 47, 0.85)), url("/images/braderm-lcb.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="slide-content content-center">
            <div className="anim-up" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, marginBottom: 30 }}>
              <img src="/loghi/logo_braderm.png" alt="Braderm" style={{ width: "80%", maxWidth: 300, filter: "brightness(0) invert(1)" }} />
              <img src="/loghi/logo_lcb.png" alt="LCB" style={{ width: "40%", maxWidth: 150, filter: "brightness(0) invert(1)", opacity: 0.8 }} />
            </div>
            <p className="anim-up delay-1" style={{ fontSize: 18, letterSpacing: 2, textTransform: "uppercase", fontWeight: 400, color: "rgba(255,255,255,0.9)" }}>Dermocosmetic Innovation Since 2007</p>
          </div>
          <div className="anim-up delay-3" style={{ position: "absolute", bottom: 40, left: 0, right: 0, textAlign: "center", opacity: 0.5, fontSize: 11, padding: "0 20px" }}>
            <div>LCB S.r.l. — Laboratori Chimici Braccili</div>
            <div>Roseto degli Abruzzi (TE), Italy</div>
          </div>
        </section>

        {/* SLIDE 2: STORY */}
        <section data-index={1} className={`about-slide slide-light ${visible === 1 ? "active" : ""}`} style={{
          backgroundImage: 'linear-gradient(rgba(249, 247, 242, 0.94), rgba(249, 247, 242, 0.94)), url("/images/lcb 2.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="slide-content content-left">
            <h2 className="slide-title anim-up">Our Story</h2>
            <div className="timeline">
              {[
                { y: "2007", t: "BRADERM IS BORN", b: "Founded in Roseto degli Abruzzi, the company enters the market with a portfolio spanning Dermatology, Gynaecology, ENT and Paediatrics.", c: T.teal },
                { y: "2013", t: "L.C.B. LABORATORIES", b: "Laboratori Chimici Braccili: in-house R&D and manufacturing for Braderm and private-label clients.", c: T.gold },
                { y: "TODAY", t: "A LEADER", b: "~50 products, a network across Italy, and international presence in 13+ countries.", c: T.navy }
              ].map((item, i) => (
                <div key={i} className={`timeline-item anim-up delay-${i + 1}`}>
                  <div className="timeline-dot" style={{ background: item.c }}>{item.y}</div>
                  <div className="timeline-text">
                    <h4 style={{ color: item.c, margin: "0 0 4px", fontSize: 14, fontWeight: 800 }}>{item.t}</h4>
                    <p style={{ margin: 0, fontSize: 12, lineHeight: 1.4, color: T.muted }}>{item.b}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="stat-row anim-up delay-4">
              <div className="stat-card"><strong>~50</strong><span>Products</span></div>
              <div className="stat-card"><strong>4</strong><span>Medical Areas</span></div>
            </div>
          </div>
        </section>

        {/* SLIDE 3: MEDICAL DEVICES */}
        <section data-index={2} className={`about-slide slide-dark ${visible === 2 ? "active" : ""}`} style={{
          backgroundImage: 'linear-gradient(rgba(10, 25, 47, 0.9), rgba(10, 25, 47, 0.9)), url("/images/lcb 4.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="slide-content content-center">
            <h2 className="slide-title anim-up">Our Medical Devices</h2>
            <p className="slide-sub anim-up delay-1">Innovative medical devices for real clinical needs</p>
            <div className="product-list">
              {[
                { n: "ZOYLAK", d: "Benzoyl peroxide 4%", u: "Facial acne treatment", c: T.teal, i: "flask" },
                { n: "DORSAK", d: "Benzoyl peroxide 6% spray", u: "Back acne treatment", c: T.gold, i: "tube" },
                { n: "MICOBAT LAVANDA", d: "Boric Acid", u: "Feminine intimate wellness", c: T.teal, i: "sparkle" }
              ].map((p, i) => (
                <div key={i} className={`product-card anim-up delay-${i + 2}`}>
                  <div className="product-accent" style={{ background: p.c }} />
                  <div className="product-info">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong style={{ fontSize: 20 }}>{p.n}</strong>
                      <Icon name={p.i} size={20} color={p.c} />
                    </div>
                    <div className="p-desc">{p.d}</div>
                    <div className="p-use">{p.u}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 4: LABORATORIES */}
        <section data-index={3} className={`about-slide slide-light ${visible === 3 ? "active" : ""}`} style={{
          backgroundImage: 'linear-gradient(rgba(249, 247, 242, 0.94), rgba(249, 247, 242, 0.94)), url("/images/lcb 1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="slide-content content-left">
            <h2 className="slide-title anim-up" style={{ color: T.navy }}>Laboratori Chimici Braccili</h2>
            <p className="anim-up delay-1" style={{ color: T.teal, fontWeight: 800, marginBottom: 20, fontSize: 14 }}>Research, Development & Manufacturing Since 2013</p>
            <div className="glass-block anim-up delay-2">
              L.C.B. laboratories produce both Braderm-branded products and private-label formulations, ensuring full quality control and innovation.
            </div>
            <div className="points-list">
              {[
                { t: "Advanced Research", d: "Cutting-edge formulations for the industry" },
                { t: "Selected Ingredients", d: "Raw materials of the highest safety standards" },
                { t: "Private Label", d: "End-to-end development for third-party brands" }
              ].map((p, i) => (
                <div key={i} className={`point-item anim-up delay-${i + 3}`}>
                  <div className="point-num">{i + 1}</div>
                  <div>
                    <div className="point-t">{p.t}</div>
                    <div className="point-d">{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 5: DISTRIBUTION */}
        <section data-index={4} className={`about-slide slide-dark ${visible === 4 ? "active" : ""}`} style={{
          backgroundImage: 'linear-gradient(rgba(10, 25, 47, 0.9), rgba(10, 25, 47, 0.9)), url("/images/lcb 3.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="slide-content content-left">
            <h2 className="slide-title anim-up">Our Distribution</h2>
            <p className="slide-sub anim-up delay-1" style={{ color: T.gold }}>A comprehensive network from local to global</p>
            <div className="dist-list">
              {[
                { i: "truck", t: "Wholesalers and pharmaceutical cooperatives" },
                { i: "shop", t: "Direct sales to pharmacies" },
                { i: "users", t: "Medical sales representatives across Italy" },
                { i: "globe", t: "International distributor network" }
              ].map((d, i) => (
                <div key={i} className={`dist-item anim-up delay-${i + 2}`}>
                  <div className="dist-icon"><Icon name={d.i} size={20} color={T.teal} /></div>
                  <div className="dist-t">{d.t}</div>
                </div>
              ))}
            </div>
            <div className="mission-block anim-up delay-6">
              Braderm works in close partnership with the medical community, ensuring a science-driven approach.
            </div>
          </div>
        </section>

        <section data-index={5} className={`about-slide slide-dark ${visible === 5 ? "active" : ""}`} style={{ justifyContent: "center", padding: "40px 24px" }}>
          <div className="slide-content" style={{ width: "100%", maxWidth: 600, display: "flex", flexDirection: "column", gap: 40 }}>
            
            <div className="anim-up" style={{ textAlign: "center", marginBottom: 20 }}>
              <h2 className="slide-title" style={{ color: T.gold, marginBottom: 10 }}>Our Group in the World</h2>
              <div style={{ width: 40, height: 2, background: T.gold, margin: "0 auto", opacity: 0.5 }} />
            </div>
            
            {/* BRADERM SECTION */}
            <div className="anim-up">
              <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 20 }}>
                <img src="/loghi/logo_braderm.png" alt="Braderm" style={{ height: 32, filter: "brightness(0) invert(1)" }} />
                <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, color: T.gold }}>Distributor Network</div>
              </div>
              <div className="marquee-container" style={{ marginLeft: 0, width: "100%" }}>
                <div className="flag-strip" style={{ animationDuration: "25s" }}>
                  {[...BRADERM_COUNTRIES, ...BRADERM_COUNTRIES].map((c, i) => (
                    <div key={i} className="flag-item">
                      <img src={`https://flagcdn.com/w40/${c.c}.png`} alt={c.n} style={{ border: c.c === 'it' ? `2px solid ${T.gold}` : "none" }} />
                      <span style={{ fontSize: 12, whiteSpace: "nowrap" }}>{c.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ height: 1, background: "rgba(255,255,255,0.1)", width: "60%", margin: "0 auto" }} />

            {/* LCB SECTION */}
            <div className="anim-up delay-2">
              <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 20 }}>
                <img src="/loghi/logo_lcb.png" alt="LCB" style={{ height: 26, filter: "brightness(0) invert(1)", opacity: 0.9 }} />
                <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, color: T.gold }}>Private Label Presence</div>
              </div>
              <div className="marquee-container" style={{ marginLeft: 0, width: "100%" }}>
                <div className="flag-strip" style={{ animationDuration: "30s", animationDirection: "reverse" }}>
                  {[...LCB_COUNTRIES, ...LCB_COUNTRIES].map((c, i) => (
                    <div key={i} className="flag-item">
                      <img src={`https://flagcdn.com/w40/${c.c}.png`} alt={c.n} style={{ border: c.c === 'it' ? `2px solid ${T.gold}` : "none" }} />
                      <span style={{ fontSize: 12, whiteSpace: "nowrap" }}>{c.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SLIDE 7: CLOSING */}
        <section data-index={6} className={`about-slide slide-dark ${visible === 6 ? "active" : ""}`}>
          <div className="accent-bar" />
          <div className="slide-content content-center">
            <h2 className="slide-title anim-up" style={{ fontSize: "clamp(32px, 8vw, 40px)" }}>Innovation at the Service of Health</h2>
            <p className="anim-up delay-1" style={{ opacity: 0.7, lineHeight: 1.6, marginBottom: 40, fontSize: 14 }}>Safe, effective, and cutting-edge dermocosmetic solutions for the medical community and industry professionals.</p>
            <div className="divider anim-up delay-2" />
            <div className="contact-info anim-up delay-3" style={{ fontSize: 16 }}>
              <div style={{ whiteSpace: "nowrap" }}>laboratorio@lcblab.com</div>
              <div style={{ whiteSpace: "nowrap" }}>www.braderm.com</div>
              <div style={{ whiteSpace: "nowrap" }}>+39 085 946 3073</div>
            </div>
            <Btn onClick={onBack} variant="primary" style={{ marginTop: 40, padding: "18px 40px", marginLeft: "auto", marginRight: "auto" }}>Back to Menu</Btn>
          </div>
          <div className="anim-up delay-4" style={{ position: "absolute", bottom: 40, left: 0, right: 0, textAlign: "center", opacity: 0.5, fontSize: 10, padding: "0 20px" }}>
            LCB S.r.l. — Laboratori Chimici Braccili — Roseto degli Abruzzi (TE), Italy
          </div>
        </section>
      </div>

      <style>{`
        .about-container { -ms-overflow-style: none; scrollbar-width: none; overflow-x: hidden; width: 100vw; }
        .about-container::-webkit-scrollbar { display: none; }
        .about-slide { height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; scroll-snap-align: start; scroll-snap-stop: always; position: relative; overflow: hidden; padding: 80px 24px 40px; box-sizing: border-box; }
        .slide-dark { background: ${T.navy}; color: ${T.white}; }
        .slide-light { background: #F5F7FA; color: ${T.navy}; }
        .slide-content { width: 100%; max-width: 450px; position: relative; z-index: 5; }
        .content-center { text-align: center; }
        .content-left { text-align: left; }
        .slide-title { font-size: clamp(32px, 8vw, 38px); font-family: ${SERIF}; margin-bottom: 24px; line-height: 1.1; font-weight: 900; }
        .slide-sub { font-size: 15px; opacity: 0.7; margin-bottom: 32px; }

        /* TIMELINE */
        .timeline { display: flex; flex-direction: column; gap: 24px; margin-bottom: 32px; position: relative; }
        .timeline::before { content: ""; position: absolute; left: 25px; top: 0; bottom: 0; width: 2px; background: rgba(0,0,0,0.05); }
        .timeline-item { display: flex; gap: 20px; position: relative; z-index: 2; }
        .timeline-dot { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 900; color: #fff; flex-shrink: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-transform: uppercase; }
        .timeline-text { flex: 1; }
        
        .stat-row { display: flex; gap: 12px; }
        .stat-card { flex: 1; background: #fff; padding: 16px; border-radius: 16px; boxShadow: 0 4px 15px rgba(0,0,0,0.05); text-align: center; border: 1px solid rgba(0,0,0,0.03); }
        .stat-card strong { display: block; fontSize: 24px; color: ${T.teal}; font-family: ${SERIF}; }
        .stat-card span { fontSize: 10px; text-transform: uppercase; color: ${T.muted}; letter-spacing: 1px; font-weight: 700; }

        /* PRODUCTS */
        .product-list { display: flex; flex-direction: column; gap: 12px; }
        .product-card { background: #fff; border-radius: 20px; overflow: hidden; display: flex; text-align: left; box-shadow: 0 8px 25px rgba(0,0,0,0.12); width: 100%; }
        .product-accent { width: 6px; flex-shrink: 0; }
        .product-info { padding: 16px 20px; flex: 1; }
        .product-info strong { color: ${T.navy}; font-family: ${SERIF}; }
        .p-desc { fontSize: 13px; fontWeight: 700; color: ${T.teal}; margin: 4px 0; }
        .p-use { fontSize: 12px; color: ${T.muted}; line-height: 1.4; }

        /* LABS */
        .glass-block { background: rgba(14, 124, 123, 0.08); border: 1px solid rgba(14, 124, 123, 0.15); padding: 20px; border-radius: 20px; margin-bottom: 24px; fontSize: 14px; lineHeight: 1.6; }
        .points-list { display: flex; flex-direction: column; gap: 16px; }
        .point-item { display: flex; gap: 16px; align-items: flex-start; }
        .point-num { width: 32px; height: 32px; border-radius: 50%; background: ${T.teal}; color: #fff; display: flex; align-items: center; justify-content: center; fontSize: 14px; fontWeight: 900; flex-shrink: 0; }
        .point-t { fontWeight: 800; fontSize: 15px; margin-bottom: 2px; color: ${T.navy}; }
        .point-d { fontSize: 13px; color: ${T.muted}; }

        /* DISTRIBUTION */
        .dist-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
        .dist-item { display: flex; align-items: center; gap: 16px; }
        .dist-icon { width: 44px; height: 44px; border-radius: 14px; background: rgba(14, 124, 123, 0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .dist-t { fontSize: 14px; fontWeight: 500; color: rgba(255,255,255,0.9); }
        .mission-block { border-left: 3px solid ${T.gold}; padding-left: 20px; font-style: italic; color: rgba(255,255,255,0.7); fontSize: 14px; lineHeight: 1.6; background: rgba(255,255,255,0.03); padding: 16px 20px; border-radius: 0 16px 16px 0; }

        /* INTERNATIONAL */
        .marquee-container { width: 100vw; margin-left: -24px; overflow: hidden; position: relative; }
        .flag-strip { display: flex; gap: 2.5rem; align-items: center; animation: scroll-flags 30s linear infinite; width: max-content; padding: 10px 0; }
        .flag-item { display: flex; align-items: center; gap: 12px; }
        .flag-item img { height: 24px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
        .hq-flag { border: 2px solid ${T.gold}; }
        @keyframes scroll-flags { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* CLOSING */
        .accent-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: ${T.gold}; z-index: 10; }
        .divider { width: 60px; height: 2px; background: ${T.gold}; margin: 24px auto; }
        .contact-info { color: ${T.gold}; fontWeight: 700; display: flex; flex-direction: column; gap: 12px; }

        /* ANIMATIONS */
        .anim-up { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.23,1,0.32,1); }
        .anim-fade { opacity: 0; transition: opacity 1.2s ease; }
        
        .active .anim-up, .active .anim-fade { opacity: 1; transform: translate(0); }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
        .delay-5 { transition-delay: 0.5s; }
        .delay-6 { transition-delay: 0.6s; }
      `}</style>
    </div>
  );
}

function LeadForm({ initialData, selected, onSubmit, onBack, title, sub, submitLabel, submitIcon, backLabel, hideBrochures }) {
  const [f, setF] = useState(initialData || { name: "", email: "", phone: "", company: "", country: "", role: "", interest: "", notes: "", products: [] });
  const [showCountries, setShowCountries] = useState(false);
  const [err, setErr] = useState("");
  const L = LANG.form;
  
  const toggleProd = p => {
    const list = f.products || [];
    setF({ ...f, products: list.includes(p) ? list.filter(x => x !== p) : [...list, p] });
  };

  const filteredCountries = f.country.length > 1 
    ? COUNTRIES.filter(c => c.toLowerCase().includes(f.country.toLowerCase())).slice(0, 5)
    : [];

  const handle = (e) => {
    e.preventDefault();
    if (!f.name || !f.email) return setErr("Please fill in Name and Email");
    onSubmit(f);
  };

  return (
    <div style={{ animation: "fadeUp 0.4s ease", maxWidth: 500, margin: "0 auto" }}>
      {onBack && <BackBtn onClick={onBack} label={backLabel || L.back} />}
      <SectionTitle title={title || L.title} sub={sub || L.sub} />
      <Card>
        <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
          <input required placeholder="Full Name *" value={f.name} onChange={e => setF({...f, name: e.target.value})} style={{ width: "100%", boxSizing: "border-box", padding: "14px", borderRadius: 12, border: `1.5px solid ${T.navy}10`, fontSize: 16, fontFamily: FONT }} />
          <input type="email" required placeholder="Email Address *" value={f.email} onChange={e => setF({...f, email: e.target.value})} style={{ width: "100%", boxSizing: "border-box", padding: "14px", borderRadius: 12, border: `1.5px solid ${T.navy}10`, fontSize: 16, fontFamily: FONT }} />
          
          <div style={{ display: "flex", gap: 20, width: "100%", boxSizing: "border-box" }}>
            <input placeholder="Phone" value={f.phone} onChange={e => setF({...f, phone: e.target.value})} style={{ flex: 1, minWidth: 0, boxSizing: "border-box", padding: "14px", borderRadius: 12, border: `1.5px solid ${T.navy}10`, fontSize: 16, fontFamily: FONT }} />
            <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
               <input placeholder="Country" value={f.country} 
                 onChange={e => { setF({...f, country: e.target.value}); setShowCountries(true); }} 
                 onBlur={() => setTimeout(() => setShowCountries(false), 200)}
                 style={{ width: "100%", boxSizing: "border-box", padding: "14px", borderRadius: 12, border: `1.5px solid ${T.navy}10`, fontSize: 16, fontFamily: FONT }} />
               {showCountries && filteredCountries.length > 0 && (
                 <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: T.white, border: `1px solid ${T.navy}15`, borderRadius: 12, marginTop: 5, zIndex: 10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)", overflow: "hidden" }}>
                    {filteredCountries.map(c => (
                      <div key={c} onMouseDown={() => { setF({...f, country: c}); setShowCountries(false); }} style={{ padding: "12px 15px", cursor: "pointer", fontSize: 14, borderBottom: `1px solid ${T.navy}05` }}>{c}</div>
                    ))}
                 </div>
               )}
            </div>
          </div>

          <div style={{ display: "flex", gap: 20, width: "100%", boxSizing: "border-box" }}>
            <input placeholder="Company" value={f.company} onChange={e => setF({...f, company: e.target.value})} style={{ flex: 1, minWidth: 0, boxSizing: "border-box", padding: "14px", borderRadius: 12, border: `1.5px solid ${T.navy}10`, fontSize: 16, fontFamily: FONT }} />
            <select value={f.role} onChange={e => setF({...f, role: e.target.value})} style={{ flex: 1, minWidth: 0, boxSizing: "border-box", padding: "14px", borderRadius: 12, border: `1.5px solid ${T.navy}10`, fontSize: 16, fontFamily: FONT, background: T.white }}>
               <option value="">Role...</option>
               {L.roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <select value={f.interest} onChange={e => setF({...f, interest: e.target.value})} style={{ width: "100%", boxSizing: "border-box", padding: "14px", borderRadius: 12, border: `1.5px solid ${T.navy}10`, fontSize: 16, fontFamily: FONT, background: T.white }}>
             <option value="">Interested in...</option>
             <option value="Braderm (Brand Distribution)">Braderm (Brand Distribution)</option>
             <option value="LCB (Private Label)">LCB (Private Label)</option>
          </select>

          {f.interest === "Braderm (Brand Distribution)" && (
            <div style={{ animation: "fadeIn 0.3s ease", border: `1.5px solid ${T.gold}20`, borderRadius: 16, padding: "18px", background: T.gold + "05" }}>
               <div style={{ fontSize: 13, fontWeight: 800, color: T.gold, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name="sparkle" size={16} color={T.gold} />
                  Interested Braderm Products (Optional)
               </div>
               <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxHeight: 220, overflowY: "auto", paddingRight: 8 }} className="custom-scroll">
                  {BRADERM_PRODUCTS.map(p => {
                    const sel = (f.products || []).includes(p);
                    return (
                      <div key={p} onClick={() => toggleProd(p)} style={{ 
                        padding: "6px 12px", borderRadius: 10, fontSize: 12, fontWeight: 700, 
                        cursor: "pointer", transition: "0.2s",
                        background: sel ? T.gold : T.white,
                        color: sel ? T.navy : T.muted,
                        border: `1.5px solid ${sel ? T.gold : T.navy + "10"}`,
                        boxShadow: sel ? `0 4px 10px ${T.gold}30` : "none"
                      }}>
                        {p}
                      </div>
                    );
                  })}
               </div>
            </div>
          )}

          <textarea rows="3" placeholder="Additional notes..." value={f.notes} onChange={e => setF({...f, notes: e.target.value})} style={{ width: "100%", boxSizing: "border-box", padding: "14px", borderRadius: 12, border: `1.5px solid ${T.navy}10`, fontSize: 16, fontFamily: FONT, resize: "none" }} />
          
          {initialData && (
            <div style={{ borderTop: `1px solid ${T.navy}05`, paddingTop: 20, marginTop: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: T.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Assigned To</div>
              <select value={f.added_by || ""} onChange={e => setF({...f, added_by: e.target.value})} style={{ width: "100%", boxSizing: "border-box", padding: "14px", borderRadius: 12, border: `1.5px solid ${T.navy}10`, fontSize: 16, fontFamily: FONT, background: T.white }}>
                <option value="Visitor">Visitor (No Staff)</option>
                {STAFF_ACCOUNTS.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
              </select>
            </div>
          )}

          {!hideBrochures && selected && selected.length > 0 && <div style={{ padding: "12px", background: T.gold + "10", borderRadius: 12, fontSize: 13, fontWeight: 700, color: T.gold }}>📄 {selected.length} Brochures selected</div>}
          {err && <div style={{ color: T.error, fontSize: 12, fontWeight: 700 }}>{err}</div>}
          <Btn variant="primary" type="submit" full icon={submitIcon}>{submitLabel || L.submit}</Btn>
        </form>
      </Card>
    </div>
  );
}

function BrochureSection({ onBack, onLead, brochures }) {
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState("grid");
  const [done, setDone] = useState(null);
  const activeBrochures = brochures.filter(b => b.active);
  const L = LANG.brochure;
  const F = LANG.form;
  const toggle = id => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  if (step === "done" && done) {
    const items = brochures.filter(b => done.brochures.includes(b.id));
    return (
      <div style={{ textAlign: "center", animation: "fadeUp 0.5s ease" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: T.success + "15", color: T.success, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 40 }}>✓</div>
        <h2 style={{ fontSize: 28, fontFamily: SERIF, marginBottom: 10 }}>{F.successTitle.replace("{name}", done.name.split(" ")[0])}</h2>
        <p style={{ color: T.muted, marginBottom: 40 }}>{F.successBody.replace("{email}", done.email)}</p>
        <Card style={{ textAlign: "left", maxWidth: 450, margin: "0 auto 30px" }}>
           {items.map(b => (
             <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 15, padding: "12px 0", borderBottom: `1px solid ${T.navy}05` }}>
               <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 14 }}>{b.title}</div><div style={{ fontSize: 11, color: T.muted }}>{b.line}</div></div>
               <div style={{ display: "flex", gap: 8 }}>
                 <button onClick={() => window.open(b.file, "_blank")} style={{ background: "none", border: `1px solid ${T.navy}15`, padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>View</button>
                 <a href={b.file} download style={{ background: T.gold + "15", color: T.gold, padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, textDecoration: "none" }}>Download</a>
               </div>
             </div>
           ))}
        </Card>
        <Btn onClick={onBack} variant="dark">{F.menu}</Btn>
      </div>
    );
  }
  if (step === "form") return <LeadForm selected={selected} onBack={() => setStep("grid")} onSubmit={d => { const full = {...d, brochures: selected, date: new Date().toISOString()}; onLead(full); setDone(full); setStep("done"); }} />;
  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <BackBtn onClick={onBack} label="Back to Menu" />
      <SectionTitle title={L.title} sub={L.sub} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, marginBottom: 40 }}>
        {activeBrochures.map(b => (
          <div key={b.id} 
            onClick={() => window.open(b.file, "_blank")}
            style={{ 
              background: b.color, 
              borderRadius: 32, 
              height: 280, 
              padding: "35px 30px", 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between", 
              cursor: "pointer", 
              position: "relative", 
              overflow: "hidden", 
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)", 
              transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
              transform: "translateY(0)"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-8px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            {/* Background Decoration */}
            <div style={{ position: "absolute", bottom: -10, right: -10, opacity: 0.12, transform: "rotate(-10deg)" }}>
              <img 
                src={b.line.includes("LCB") ? "/loghi/logo_lcb.png" : "/loghi/logo_braderm.png"} 
                alt="" 
                style={{ height: b.line.includes("LCB") ? 180 : 130, filter: "brightness(0) invert(1)" }} 
              />
            </div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.7)", letterSpacing: 3, textTransform: "uppercase" }}>{b.line}</div>
              <h3 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontFamily: SERIF, color: T.white, margin: "12px 0 0", lineHeight: 1, fontWeight: 900 }}>{b.title}</h3>
            </div>

            <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.9)", maxWidth: "75%", fontWeight: 400, fontFamily: FONT }}>{b.desc}</div>
              <button 
                onClick={(e) => { e.stopPropagation(); toggle(b.id); }}
                style={{ 
                  width: 56, 
                  height: 56, 
                  borderRadius: "50%", 
                  background: selected.includes(b.id) ? T.white : "rgba(255,255,255,0.25)", 
                  backdropFilter: "blur(10px)",
                  border: "none", 
                  color: selected.includes(b.id) ? b.color : T.white, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontSize: 32, 
                  fontWeight: 300,
                  cursor: "pointer", 
                  transition: "0.3s", 
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)" 
                }}
              >
                {selected.includes(b.id) ? "✓" : "+"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selected.length > 0 && (
        <div style={{ position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)", background: T.navy, color: T.white, padding: "14px 30px", borderRadius: 40, display: "flex", alignItems: "center", gap: 30, boxShadow: "0 10px 40px rgba(0,0,0,0.3)", zIndex: 1000 }}>
           <div style={{ fontWeight: 700 }}>{selected.length} {L.selected}</div>
           <Btn onClick={() => setStep("form")} variant="primary" style={{ padding: "10px 30px" }}>Continue →</Btn>
        </div>
      )}
    </div>
  );
}

function ContactsSection({ onBack }) {
  const L = LANG.contacts;
  const save = () => {
    const vcf = `BEGIN:VCARD\nVERSION:3.0\nFN:${COMPANY.name}\nORG:${COMPANY.name}\nTEL;TYPE=WORK,VOICE:${COMPANY.phone}\nTEL;TYPE=CELL,VOICE:${COMPANY.whatsapp}\nEMAIL:${COMPANY.email}\nURL:${COMPANY.websites[0]}\nURL:${COMPANY.websites[1]}\nADR;TYPE=WORK:;;${COMPANY.address}\nEND:VCARD`;
    const blob = new Blob([vcf], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "LCB_Contact.vcf"; a.click();
  };
  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <BackBtn onClick={onBack} />
      <SectionTitle title={L.title} sub={L.sub} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 40 }}>
        {STAFF_CONTACTS.map((s, i) => (
          <div key={i} style={{ 
            background: T.white, borderRadius: 20, padding: "20px 15px", textAlign: "center", 
            boxShadow: "0 4px 15px rgba(0,0,0,0.03)", border: `1.5px solid ${T.navy}05`
          }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: T.gold + "15", color: T.gold, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontWeight: 800, fontSize: 14 }}>
              {s.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div style={{ fontWeight: 800, fontSize: 14, color: T.navy, marginBottom: 2 }}>{s.name}</div>
            <div style={{ fontSize: 10, color: T.gold, textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.5, marginBottom: 12 }}>{s.role}</div>
            <a href={`mailto:${s.email}`} style={{ textDecoration: "none", color: T.teal, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Icon name="mail" size={12} color={T.teal} />
              EMAIL
            </a>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 24, fontSize: 12, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 2, textAlign: "center" }}>Company Info</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 500, margin: "0 auto 40px" }}>
        {[
          { icon: "phone", label: "Phone", val: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, "")}`, color: T.navy },
          { icon: "whatsapp", label: "WhatsApp", val: COMPANY.whatsapp, href: `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`, color: "#25D366", fill: "#25D366" },
          { icon: "globe", label: "Braderm Website", val: COMPANY.websites[0], href: `https://${COMPANY.websites[0]}`, color: T.navy },
          { icon: "sparkle", label: "LCB Website", val: COMPANY.websites[1], href: `https://${COMPANY.websites[1]}`, color: T.gold },
          { icon: "mapPin", label: "Address", val: COMPANY.address, href: "https://maps.google.com/?q=" + encodeURIComponent(COMPANY.address) }
        ].map(c => (
          <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ background: T.white, borderRadius: 20, display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)", border: `1px solid ${T.navy}03` }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: (c.color || T.gold) + "08", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={c.icon} size={18} color={c.color || T.gold} fill={c.fill || "none"} strokeWidth={c.icon === 'whatsapp' ? 0 : 2} />
              </div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 9, fontWeight: 800, color: T.gold, textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</div><div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{c.val}</div></div>
              <div style={{ color: T.gold, opacity: 0.5, fontSize: 16 }}>→</div>
            </div>
          </a>
        ))}
      </div>
      <Btn onClick={save} variant="primary" full style={{ maxWidth: 350, margin: "0 auto" }} icon="📥">{L.saveBtn}</Btn>
    </div>
  );
}

function RequestSection({ onBack, onLead }) {
  const L = LANG.request;
  const [done, setDone] = useState(null);
  if (done) return (
    <div style={{ textAlign: "center", paddingTop: 50, animation: "fadeUp 0.5s ease" }}>
      <h2 style={{ fontSize: 28, fontFamily: SERIF, marginBottom: 10 }}>Sent!</h2>
      <p style={{ color: T.muted, marginBottom: 40 }}>{L.success.replace("{email}", done.email)}</p>
      <Btn onClick={onBack} variant="outline">Back to Menu</Btn>
    </div>
  );
  return <LeadForm onBack={onBack} title={L.title} sub={L.sub} submitLabel={L.submit} hideBrochures onSubmit={d => { onLead({...d, type: "general", date: new Date().toISOString()}); setDone(d); }} />;
}

function StaffDashboard({ currentUser, leads, brochures, onToggleBrochure, onAddLead, onUpdateLead, onDeleteLead, onClose }) {
  const [tab, setTab] = useState("leads");
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [techSearch, setTechSearch] = useState("");
  const L = LANG.staff;
  
  const totalToday = leads.filter(l => new Date(l.created_at || l.date).toDateString() === new Date().toDateString()).length;

  const exportCSV = () => {
    const headers = ["Date", "Name", "Email", "Phone", "Country", "Company", "Role", "Interest", "Added By", "Brochures", "Notes"];
    const rows = leads.map(l => {
      const bNames = (l.brochures || []).map(id => brochures.find(x => x.id === id)?.title || id).join(" | ");
      const data = [
        new Date(l.created_at || l.date).toLocaleString().replace(",", ""), 
        l.name, l.email, l.phone, l.country, l.company, l.role, l.interest, l.added_by || "Visitor", bNames, (l.notes || "").replace(/\n/g, " ")
      ];
      return data.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",");
    });
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `LCB_Leads_${new Date().toISOString().split('T')[0]}.csv`; a.click();
  };

  const getInitials = (n) => n ? n.split(" ").map(x => x[0]).join("").toUpperCase().slice(0, 2) : "??";

  return (
    <div style={{ position: "fixed", inset: 0, background: "#F8F9FA", zIndex: 5000, display: "flex", flexDirection: "column", fontFamily: FONT }}>
       <header style={{ background: T.navy, color: T.white, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
             <Logo light size={18} />
             <div style={{ background: "rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 800, letterSpacing: 1 }}>STAFF HUB</div>
          </div>
          <button onClick={onClose} style={{ background: T.gold, border: "none", color: T.navy, padding: "8px 16px", borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>EXIT</button>
       </header>

       <div style={{ background: T.white, display: "flex", padding: "0 10px" }}>
          {["leads", "inventory", "technical", "reports", "my_pass"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "16px", border: "none", background: "none", color: tab === t ? T.navy : T.muted, fontWeight: 800, fontSize: 12, textTransform: "uppercase", borderBottom: `3px solid ${tab === t ? T.gold : "transparent"}`, transition: "0.3s" }}>{t}</button>
          ))}
       </div>

       <main style={{ flex: 1, overflow: "auto", padding: "20px" }}>
          {tab === "leads" && (
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginBottom: 25 }}>
                  <div style={{ background: T.white, padding: 15, borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                     <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, textTransform: "uppercase" }}>Total Leads</div>
                     <div style={{ fontSize: 24, fontWeight: 900, color: T.navy }}>{leads.length}</div>
                  </div>
                  <div style={{ background: T.white, padding: 15, borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                     <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, textTransform: "uppercase" }}>New Today</div>
                     <div style={{ fontSize: 24, fontWeight: 900, color: T.gold }}>{totalToday}</div>
                  </div>
               </div>

               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                  <h2 style={{ fontSize: 18, fontFamily: SERIF }}>Recent Activity</h2>
                  <button onClick={exportCSV} style={{ background: "none", border: `1.2px solid ${T.navy}20`, padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>📊 Export CSV</button>
               </div>

               {leads.length === 0 ? (
                 <div style={{ textAlign: "center", padding: "60px 20px", color: T.muted }}>No leads yet. Start collecting!</div>
               ) : (
                 <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {leads.map((l, i) => (
                      <div key={i} onClick={() => setViewItem(l)} style={{ background: T.white, padding: 15, borderRadius: 16, boxShadow: "0 2px 6px rgba(0,0,0,0.03)", display: "flex", gap: 15, animation: "fadeIn 0.3s ease", cursor: "pointer" }}>
                         <div style={{ width: 45, height: 45, borderRadius: 12, background: T.navy + "08", color: T.navy, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>{getInitials(l.name)}</div>
                         <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                               <div>
                                  <div style={{ fontWeight: 800, fontSize: 15 }}>{l.name}</div>
                                  <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{l.company || "Private"} • {l.country || "Intl"}</div>
                               </div>
                               <div style={{ textAlign: "right" }}>
                                  <div style={{ fontSize: 10, color: T.muted }}>{new Date(l.created_at || l.date).toLocaleDateString()}</div>
                                  <div style={{ fontSize: 9, color: T.gold, fontWeight: 700, marginTop: 4 }}>By: {l.added_by || "Visitor"}</div>
                               </div>
                            </div>
                            <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                               <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                  {l.interest && <span style={{ background: T.gold + "15", color: T.gold, padding: "2px 8px", borderRadius: 4, fontSize: 9, fontWeight: 800 }}>{l.interest.split("(")[0]}</span>}
                                  {(l.brochures || []).map(id => <span key={id} style={{ background: T.navy + "05", color: T.navy, padding: "2px 8px", borderRadius: 4, fontSize: 9, fontWeight: 700 }}>{brochures.find(x => x.id === id)?.line || "Docs"}</span>)}
                               </div>
                               <div style={{ display: "flex", gap: 12 }}>
                                  <button onClick={(e) => { e.stopPropagation(); setEditItem(l); }} style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.5, color: T.navy }}>
                                     <Icon name="edit" size={18} />
                                  </button>
                                  <button onClick={(e) => { e.stopPropagation(); setDeleteId(l.id); }} style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.5, color: T.error }}>
                                     <Icon name="trash" size={18} />
                                  </button>
                               </div>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          )}

          {tab === "inventory" && (
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
               <h2 style={{ fontSize: 18, fontFamily: SERIF, marginBottom: 20 }}>Brochure Visibility & Preview</h2>
               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {brochures.map(b => (
                    <div key={b.id} style={{ background: T.white, display: "flex", alignItems: "center", gap: 15, padding: "12px 20px", borderRadius: 16, boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
                       <div style={{ fontSize: 20, color: b.active ? b.color : T.muted }}>
                        <Icon name={b.icon} size={22} color={b.active ? b.color : T.muted} />
                     </div>
                       <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 800, fontSize: 14 }}>{b.title}</div>
                          <div style={{ fontSize: 11, color: T.muted }}>{b.line}</div>
                       </div>
                       
                       <button onClick={() => window.open(b.file, "_blank")} style={{ background: T.navy, color: T.white, border: "none", padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 10, fontWeight: 900, letterSpacing: 0.5 }}>VIEW</button>

                       <div onClick={() => onToggleBrochure(b.id)} style={{ width: 44, height: 24, background: b.active ? T.success : "#E9ECEF", borderRadius: 12, position: "relative", cursor: "pointer", transition: "0.3s" }}>
                          <div style={{ width: 18, height: 18, background: T.white, borderRadius: "50%", position: "absolute", top: 3, left: b.active ? 23 : 3, transition: "0.3s", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {tab === "technical" && (
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h2 style={{ fontSize: 18, fontFamily: SERIF, margin: 0 }}>Technical Data Sheets</h2>
                  <div style={{ position: "relative", width: 220 }}>
                    <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", opacity: 0.3 }}>
                      <Icon name="search" size={14} color={T.navy} />
                    </div>
                    <input 
                      placeholder="Search product..." 
                      value={techSearch}
                      onChange={e => setTechSearch(e.target.value)}
                      style={{ width: "100%", padding: "10px 12px 10px 32px", borderRadius: 12, border: `1.5px solid ${T.navy}15`, fontSize: 12, outline: "none", background: T.white }}
                    />
                  </div>
               </div>
               <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {TECHNICAL_SHEETS.filter(s => s.name.toLowerCase().includes(techSearch.toLowerCase())).map((s, i) => (
                    <div key={i} onClick={() => window.open(s.file, "_blank")} 
                         style={{ background: T.white, display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", borderRadius: 16, boxShadow: "0 2px 6px rgba(0,0,0,0.03)", cursor: "pointer" }}
                         onMouseEnter={e => e.currentTarget.style.background = "#fcfcfc"}
                         onMouseLeave={e => e.currentTarget.style.background = T.white}>
                       <div style={{ width: 36, height: 36, borderRadius: 10, background: T.teal + "10", color: T.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon name="file" size={18} />
                       </div>
                       <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 800, fontSize: 14, color: T.navy }}>{s.name}</div>
                          <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Technical Sheet • PDF</div>
                       </div>
                       <div style={{ color: T.gold }}><Icon name="chevronRight" size={16} /></div>
                    </div>
                  ))}
                  {TECHNICAL_SHEETS.filter(s => s.name.toLowerCase().includes(techSearch.toLowerCase())).length === 0 && (
                    <div style={{ textAlign: "center", padding: 40, color: T.muted, fontSize: 14 }}>No data sheets found.</div>
                  )}
               </div>
            </div>
          )}

          {tab === "reports" && (
            <div style={{ maxWidth: 800, margin: "0 auto", animation: "fadeIn 0.5s ease" }}>
               <h2 style={{ fontSize: 24, fontFamily: SERIF, marginBottom: 25, color: T.navy }}>Fair Performance Report</h2>
               
               <div style={{ marginBottom: 30 }}>
                  <Card style={{ padding: 25 }}>
                     <h3 style={{ fontSize: 14, fontWeight: 800, color: T.muted, marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 }}>Interest Distribution</h3>
                     <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                        {["Braderm", "LCB"].map(type => {
                           const count = leads.filter(l => l.interest && l.interest.includes(type)).length;
                           const pct = leads.length > 0 ? (count / leads.length) * 100 : 0;
                           return (
                             <div key={type}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, fontWeight: 700 }}>
                                   <span>{type} {type === "Braderm" ? "Brand" : "Private Label"}</span>
                                   <span>{count} ({Math.round(pct)}%)</span>
                                </div>
                                <div style={{ height: 10, background: "#eee", borderRadius: 5, overflow: "hidden" }}>
                                   <div style={{ height: "100%", width: `${pct}%`, background: type === "Braderm" ? T.gold : T.teal, borderRadius: 5, transition: "width 1s ease" }} />
                                </div>
                             </div>
                           );
                        })}
                     </div>
                  </Card>
               </div>

               <Card style={{ padding: 25, marginBottom: 30 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: T.muted, marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 }}>Global Reach (By Country)</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
                     {Object.entries(leads.reduce((acc, l) => {
                        const c = l.country || "Unknown";
                        acc[c] = (acc[c] || 0) + 1;
                        return acc;
                     }, {})).sort((a,b) => b[1] - a[1]).slice(0, 10).map(([country, count]) => (
                       <div key={country} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 15px", background: "#fcfcfc", borderRadius: 12, border: "1px solid #f0f0f0" }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.gold + "10", color: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 10 }}>{count}</div>
                          <div style={{ fontWeight: 700, fontSize: 13, color: T.navy }}>{country}</div>
                       </div>
                     ))}
                  </div>
               </Card>

               <div style={{ textAlign: "center", padding: 40, border: `2px dashed ${T.navy}10`, borderRadius: 24, background: T.white }}>
                  <Icon name="globe" size={40} color={T.navy} style={{ opacity: 0.1, marginBottom: 15 }} />
                  <div style={{ fontSize: 13, color: T.muted, fontWeight: 600 }}>Detailed analytics and data exports available in the CSV export.</div>
               </div>
            </div>
          {tab === "my_pass" && (
            <div style={{ maxWidth: 500, margin: "0 auto", animation: "fadeUp 0.5s ease" }}>
               <h2 style={{ fontSize: 24, fontFamily: SERIF, marginBottom: 25, color: T.navy }}>My Travel Documents</h2>
               
               {(() => {
                  const firstName = (currentUser || "").split(" ")[0];
                  const folder = (currentUser || "").replace(/\s+/g, "_");
                  const badge = `/addetti/${folder}/badge/badge ${firstName.toLowerCase()}.pdf`;
                  const flight = `/addetti/${folder}/biglietti_aereo/BP_${firstName}.pdf`;
                  
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                       {/* Badge Card */}
                       <div style={{ background: T.white, borderRadius: 24, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: `1px solid ${T.navy}05` }}>
                          <div style={{ background: T.gold, padding: "15px 25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                             <div style={{ color: T.navy, fontWeight: 900, fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Entry Badge</div>
                             <Icon name="sparkle" size={18} color={T.navy} />
                          </div>
                          <div style={{ padding: 25, display: "flex", alignItems: "center", gap: 20 }}>
                             <div style={{ width: 60, height: 60, borderRadius: 16, background: T.navy + "05", display: "flex", alignItems: "center", justifyContent: "center", color: T.navy, fontSize: 20, fontWeight: 800 }}>
                                {getInitials(currentUser)}
                             </div>
                             <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 18, fontWeight: 800, color: T.navy, marginBottom: 4 }}>{currentUser}</div>
                                <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, textTransform: "uppercase" }}>Braderm Fair Team</div>
                             </div>
                          </div>
                          <div style={{ padding: "0 25px 25px" }}>
                             <Btn onClick={() => window.open(badge, "_blank")} variant="primary" full icon="🎟">VIEW ENTRY BADGE</Btn>
                          </div>
                       </div>

                       {/* Boarding Pass Card */}
                       <div style={{ background: T.white, borderRadius: 24, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: `1px solid ${T.navy}05` }}>
                          <div style={{ background: T.navy, padding: "15px 25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                             <div style={{ color: T.white, fontWeight: 900, fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Boarding Pass</div>
                             <Icon name="globe" size={18} color={T.gold} />
                          </div>
                          <div style={{ padding: 25 }}>
                             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                                <div>
                                   <div style={{ fontSize: 10, fontWeight: 800, color: T.muted, textTransform: "uppercase", marginBottom: 2 }}>Passenger</div>
                                   <div style={{ fontSize: 16, fontWeight: 800, color: T.navy }}>{currentUser}</div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                   <div style={{ fontSize: 10, fontWeight: 800, color: T.muted, textTransform: "uppercase", marginBottom: 2 }}>Destination</div>
                                   <div style={{ fontSize: 16, fontWeight: 800, color: T.navy }}>Trade Fair</div>
                                </div>
                             </div>
                             <Btn onClick={() => window.open(flight, "_blank")} variant="outline" full icon="✈">OPEN FLIGHT TICKET</Btn>
                          </div>
                       </div>

                       <div style={{ padding: 20, background: T.gold + "08", borderRadius: 20, border: `1px dashed ${T.gold}`, textAlign: "center" }}>
                          <p style={{ margin: 0, fontSize: 12, color: T.muted, fontWeight: 600 }}>Please ensure you have these documents saved or printed for the trip.</p>
                       </div>
                    </div>
                  );
               })()}
            </div>
          )}
        </main>

       {tab === "leads" && (
         <button onClick={() => setShowAdd(true)} style={{ position: "fixed", bottom: 25, right: 25, width: 60, height: 60, borderRadius: "50%", background: T.navy, color: T.white, border: "none", fontSize: 24, boxShadow: "0 8px 25px rgba(11,29,50,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 6000 }}>+</button>
       )}

       {showAdd && (
         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(5px)", zIndex: 7000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div style={{ background: T.cream, width: "100%", maxWidth: 500, borderRadius: 24, overflow: "auto", maxHeight: "95vh", padding: 20, boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center" }}>
                  <h3 style={{ fontFamily: SERIF, margin: 0 }}>Add New Lead</h3>
                  <button onClick={() => setShowAdd(false)} style={{ border: "none", background: "#eee", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
               </div>
               <LeadForm submitLabel="SUBMIT" onSubmit={d => { onAddLead(d); setShowAdd(false); }} />
            </div>
         </div>
       )}

       {editItem && (
         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(5px)", zIndex: 7000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div style={{ background: T.cream, width: "100%", maxWidth: 500, borderRadius: 24, overflow: "auto", maxHeight: "95vh", padding: 20, boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center" }}>
                  <h3 style={{ fontFamily: SERIF, margin: 0 }}>Edit Lead</h3>
                  <button onClick={() => setEditItem(null)} style={{ border: "none", background: "#eee", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
               </div>
               <LeadForm initialData={editItem} submitLabel="UPDATE" onSubmit={d => { onUpdateLead(editItem.id, d); setEditItem(null); }} />
            </div>
         </div>
       )}

       {viewItem && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", zIndex: 7000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
             <div style={{ background: T.white, width: "100%", maxWidth: 500, borderRadius: 32, overflow: "auto", maxHeight: "90vh", boxShadow: "0 30px 70px rgba(0,0,0,0.4)", animation: "fadeUp 0.3s ease" }}>
                <div style={{ background: T.navy, padding: "25px 30px", color: T.white, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: T.gold, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>Lead Details</div>
                      <h3 style={{ fontFamily: SERIF, margin: 0, fontSize: 24 }}>{viewItem.name}</h3>
                   </div>
                   <button onClick={() => setViewItem(null)} style={{ border: "none", background: "rgba(255,255,255,0.1)", color: T.white, width: 36, height: 36, borderRadius: "50%", cursor: "pointer" }}>✕</button>
                </div>
                
                <div style={{ padding: 30 }}>
                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 30 }}>
                      <div>
                         <div style={{ fontSize: 10, fontWeight: 800, color: T.muted, textTransform: "uppercase", marginBottom: 5 }}>Email</div>
                         <a href={`mailto:${viewItem.email}`} style={{ color: T.teal, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>{viewItem.email}</a>
                      </div>
                      <div>
                         <div style={{ fontSize: 10, fontWeight: 800, color: T.muted, textTransform: "uppercase", marginBottom: 5 }}>Phone</div>
                         <a href={`tel:${viewItem.phone}`} style={{ color: T.navy, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>{viewItem.phone || "—"}</a>
                      </div>
                      <div>
                         <div style={{ fontSize: 10, fontWeight: 800, color: T.muted, textTransform: "uppercase", marginBottom: 5 }}>Company</div>
                         <div style={{ color: T.navy, fontWeight: 700, fontSize: 14 }}>{viewItem.company || "Private"}</div>
                      </div>
                      <div>
                         <div style={{ fontSize: 10, fontWeight: 800, color: T.muted, textTransform: "uppercase", marginBottom: 5 }}>Country</div>
                         <div style={{ color: T.navy, fontWeight: 700, fontSize: 14 }}>{viewItem.country || "—"}</div>
                      </div>
                   </div>

                   <div style={{ marginBottom: 25 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>Primary Interest</div>
                      <div style={{ display: "inline-block", background: T.gold + "15", color: T.gold, padding: "6px 14px", borderRadius: 10, fontWeight: 800, fontSize: 12 }}>{viewItem.interest || "General Inquiry"}</div>
                   </div>

                   {viewItem.products && viewItem.products.length > 0 && (
                      <div style={{ marginBottom: 25 }}>
                         <div style={{ fontSize: 10, fontWeight: 800, color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>Interested Products</div>
                         <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {viewItem.products.map(p => <span key={p} style={{ background: T.teal + "08", color: T.teal, padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700, border: `1px solid ${T.teal}15` }}>{p}</span>)}
                         </div>
                      </div>
                   )}

                   {viewItem.brochures && viewItem.brochures.length > 0 && (
                      <div style={{ marginBottom: 25 }}>
                         <div style={{ fontSize: 10, fontWeight: 800, color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>Requested Brochures</div>
                         <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                            {viewItem.brochures.map(id => {
                               const b = brochures.find(x => x.id === id);
                               return (
                                 <div key={id} style={{ fontSize: 13, color: T.navy, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.gold }} />
                                    {b ? b.title : id}
                                 </div>
                               );
                            })}
                         </div>
                      </div>
                   )}

                   {viewItem.notes && (
                      <div style={{ marginBottom: 25, padding: 15, background: "#F8F9FA", borderRadius: 16, borderLeft: `4px solid ${T.gold}` }}>
                         <div style={{ fontSize: 10, fontWeight: 800, color: T.muted, textTransform: "uppercase", marginBottom: 5 }}>Internal Notes</div>
                         <div style={{ fontSize: 13, color: T.navy, lineHeight: 1.5 }}>{viewItem.notes}</div>
                      </div>
                   )}

                   <div style={{ borderTop: `1px solid ${T.navy}05`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 11, color: T.muted }}>Added: <b>{new Date(viewItem.created_at || viewItem.date).toLocaleString()}</b></div>
                      <div style={{ fontSize: 11, color: T.gold, fontWeight: 800 }}>BY: {viewItem.added_by || "Visitor"}</div>
                   </div>
                </div>
                
                <div style={{ padding: "0 30px 30px" }}>
                   <Btn onClick={() => { setEditItem(viewItem); setViewItem(null); }} variant="primary" full icon="✎">EDIT LEAD DATA</Btn>
                </div>
             </div>
          </div>
       )}

       {deleteId && (
         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", zIndex: 8000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div style={{ background: T.white, width: "100%", maxWidth: 400, borderRadius: 28, padding: "40px 30px", textAlign: "center", boxShadow: "0 25px 60px rgba(0,0,0,0.3)", animation: "fadeUp 0.3s ease" }}>
               <div style={{ width: 60, height: 60, background: T.error + "15", color: T.error, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <Icon name="trash" size={30} />
               </div>
               <h3 style={{ fontFamily: SERIF, fontSize: 22, color: T.navy, marginBottom: 12 }}>Confirm Deletion</h3>
               <p style={{ color: T.muted, fontSize: 14, lineHeight: 1.6, marginBottom: 30 }}>Are you sure you want to remove this lead? This action cannot be undone.</p>
               <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: "14px", borderRadius: 16, border: `1.5px solid ${T.navy}15`, background: "none", fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                  <button onClick={() => { onDeleteLead(deleteId); setDeleteId(null); }} style={{ flex: 1, padding: "14px", borderRadius: 16, border: "none", background: T.error, color: T.white, fontWeight: 800, cursor: "pointer" }}>Delete Now</button>
               </div>
            </div>
         </div>
       )}
    </div>
  );
}

import { supabase } from "./supabase";

const STAFF_ACCOUNTS = [
  { name: "Giulia Cimini", user: "GiuliaLCB", pass: "Braderm1!" },
  { name: "Ludovica Coccia", user: "LudovicaLCB", pass: "Braderm1!" },
  { name: "Lorenza Ferretti", user: "LorenzaLCB", pass: "Braderm1!" },
  { name: "Cristiano Braccili", user: "CristianoLCB", pass: "Braderm1!" },
];

export default function LCBFairApp() {
  const [route, setRoute] = useState(window.location.pathname);
  
  // Update route on popstate
  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const isAdminRoute = route.startsWith("/admin");
  const isVisitorRoute = route.startsWith("/visitors");

  // Redirect root to /visitors
  useEffect(() => {
    if (route === "/" || (!isAdminRoute && !isVisitorRoute)) {
      window.history.pushState({}, "", "/visitors");
      setRoute("/visitors");
    }
  }, [route]);

  const [isLogged, setIsLogged] = useState(() => localStorage.getItem("lcb_logged") === "true");
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem("lcb_user"));
  const [page, setPage] = useState("home");
  const [leads, setLeads] = useState([]);
  const [brochures, setBrochures] = useState(BROCHURES_INITIAL);
  
  // Update Theme Color for mobile status bar
  useEffect(() => {
    const color = page === "about" ? T.navy : T.cream;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", color);
  }, [page]);
  
  // Login State
  const [loginForm, setLoginForm] = useState({ email: "", pass: "" });
  const [loginErr, setLoginErr] = useState("");

  // --- SUPABASE SYNC ---
  useEffect(() => {
    fetchLeads();
    fetchInventory();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setLeads(data);
    else if (error) console.error("Sync Error Leads:", error);
  };

  const fetchInventory = async () => {
    const { data, error } = await supabase
      .from('inventory')
      .select('*');
    
    if (data && data.length > 0) {
      const updated = BROCHURES_INITIAL.map(b => {
        const remote = data.find(r => r.id === b.id);
        return remote ? { ...b, active: remote.active } : b;
      });
      setBrochures(updated);
    }
  };

  const addLead = async (d) => {
    // If d already has added_by (from staff dashboard), use it. Otherwise use "Visitor".
    const leadData = { ...d, added_by: d.added_by || "Visitor", created_at: new Date().toISOString() };
    
    // 1. Optimistic Local Update
    setLeads(p => [leadData, ...p]);
    
    // 2. Online Sync
    const { data, error } = await supabase
      .from('leads')
      .insert([{
        name: d.name,
        email: d.email,
        phone: d.phone,
        country: d.country,
        company: d.company,
        role: d.role,
        interest: d.interest,
        notes: d.notes,
        products: d.products,
        brochures: d.brochures,
        added_by: leadData.added_by,
        type: d.type || 'brochure_request'
      }])
      .select(); // Get the inserted row back
    
    if (error) {
       console.error("Supabase Save Error:", error);
    } else if (data) {
       // Replace the optimistic lead with the real one from DB (with ID)
       setLeads(p => p.map(l => l.email === d.email && !l.id ? data[0] : l));
    }
  };

  const updateLead = async (id, d) => {
    setLeads(p => p.map(l => l.id === id ? { ...l, ...d } : l));
    const { error } = await supabase.from('leads').update(d).eq('id', id);
    if (error) console.error("Update Error:", error);
  };

  const deleteLead = async (id) => {
    setLeads(p => p.filter(l => l.id !== id));
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) console.error("Delete Error:", error);
  };
  
  const toggleBrochure = async (id) => {
    const target = brochures.find(b => b.id === id);
    if (!target) return;
    
    const newState = !target.active;
    
    // 1. Local Update
    setBrochures(p => p.map(b => b.id === id ? { ...b, active: newState } : b));
    
    // 2. Online Sync
    const { error } = await supabase
      .from('inventory')
      .upsert({ id, active: newState });
    
    if (error) console.error("Inventory Sync Error:", error);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    const account = STAFF_ACCOUNTS.find(a => a.user === loginForm.email && a.pass === loginForm.pass);
    if (account) {
      setIsLogged(true);
      setCurrentUser(account.name);
      localStorage.setItem("lcb_logged", "true");
      localStorage.setItem("lcb_user", account.name);
      setLoginErr("");
    } else {
      setLoginErr("Invalid credentials. Try again.");
    }
  };

  const logout = () => {
    setIsLogged(false);
    setCurrentUser(null);
    localStorage.removeItem("lcb_logged");
    localStorage.removeItem("lcb_user");
    window.history.pushState({}, "", "/");
    setIsAdminRoute(false);
  };

  // --- STAFF VIEW ---
  if (isAdminRoute) {
    if (!isLogged) {
      return (
        <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${T.navy} 0%, #06101c 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: FONT }}>
          <div style={{ background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", padding: "40px 30px", borderRadius: 32, width: "100%", maxWidth: 400, boxShadow: "0 25px 50px rgba(0,0,0,0.3)", textAlign: "center", animation: "fadeUp 0.6s ease" }}>
            <Logo size={24} />
            <h1 style={{ fontFamily: SERIF, fontSize: 28, color: T.navy, marginTop: 30, marginBottom: 10 }}>Staff Portal</h1>
            <p style={{ color: T.muted, fontSize: 14, marginBottom: 35 }}>Secure access for LCB/Braderm team</p>
            
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.5 }}>👤</span>
                <input 
                  placeholder="Username" 
                  value={loginForm.email} 
                  onChange={e => setLoginForm({...loginForm, email: e.target.value})} 
                  style={{ width: "100%", boxSizing: "border-box", padding: "16px 16px 16px 45px", borderRadius: 16, border: `1.5px solid ${T.navy}15`, fontSize: 16, fontFamily: FONT, background: T.white, outline: "none" }} 
                />
              </div>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.5 }}>🔒</span>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={loginForm.pass} 
                  onChange={e => setLoginForm({...loginForm, pass: e.target.value})} 
                  style={{ width: "100%", boxSizing: "border-box", padding: "16px 16px 16px 45px", borderRadius: 16, border: `1.5px solid ${T.navy}15`, fontSize: 16, fontFamily: FONT, background: T.white, outline: "none" }} 
                />
              </div>
              
              {loginErr && <div style={{ color: T.error, fontSize: 12, fontWeight: 700 }}>{loginErr}</div>}
              
              <button type="submit" style={{ width: "100%", padding: "16px", borderRadius: 16, border: "none", background: T.gold, color: T.navy, fontWeight: 900, fontSize: 14, cursor: "pointer", marginTop: 10, boxShadow: `0 8px 20px ${T.gold}40`, transition: "0.3s" }}>
                LOGIN TO DASHBOARD
              </button>
            </form>
            
            <button onClick={() => { setIsAdminRoute(false); window.history.pushState({}, "", "/"); }} style={{ background: "none", border: "none", color: T.muted, fontSize: 13, marginTop: 30, cursor: "pointer", fontWeight: 600 }}>
              ← Back to Visitor Site
            </button>
          </div>
        </div>
      );
    }
    return <StaffDashboard currentUser={currentUser} leads={leads} brochures={brochures} onToggleBrochure={toggleBrochure} onAddLead={d => addLead({...d, added_by: currentUser})} onUpdateLead={updateLead} onDeleteLead={deleteLead} onClose={logout} />;
  }

  // --- VISITOR VIEW ---
  return (
    <div style={{ minHeight: "100vh", background: page === "about" ? T.navy : T.cream, fontFamily: FONT, color: T.navy }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        .hero-logos { gap: 30px; }
        .logo-wrap { gap: 15px; }
        .logo-sep { margin: 0 5px; }
        @media (max-width: 600px) {
          .hero-logos { gap: 12px; }
          .logo-wrap { gap: 8px; }
          .hero-logos img:first-child { height: 70px !important; }
          .hero-logos img:last-child { height: 55px !important; }
          .hero-logos .logo-sep { height: 40px !important; }
        }
      `}</style>
      

      <main style={page === "about" ? {} : { maxWidth: 900, margin: "0 auto", padding: "30px 20px 100px" }}>
        {page === "home" && <HomeMenu onNavigate={setPage} />}
        {page === "brochure" && <BrochureSection onBack={() => setPage("home")} onLead={addLead} brochures={brochures} />}
        {page === "contacts" && <ContactsSection onBack={() => setPage("home")} />}
        {page === "about" && <AboutSection onBack={() => setPage("home")} />}
        {page === "request" && <RequestSection onBack={() => setPage("home")} onLead={addLead} />}
      </main>

      <footer style={{ textAlign: "center", padding: "40px 20px", opacity: 0.5 }}>
         <Logo size={18} />
         <p style={{ marginTop: 15, fontSize: 11, letterSpacing: 1 }}>{LANG.home.footer}</p>
      </footer>
    </div>
  );
}
