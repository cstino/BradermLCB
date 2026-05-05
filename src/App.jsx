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
  address: "Roseto degli Abruzzi (TE), Italy",
  email: "info@lcb-srl.it",
  phone: "+39 085 893 0567",
  website: "https://www.lcb-srl.it"
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

const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const paths = {
    book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3.5a.5.5 0 0 0-.5-.5H6.5A2.5 2.5 0 0 0 4 5.5v14z M12 3v14",
    tube: "M7 2v18a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2M7 5h10M7 8h10",
    hair: "M12 2c-3.31 0-6 2.69-6 6 0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6zm0 14c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z",
    ear: "M16 8.5c0-2.5-2-4.5-4.5-4.5S7 6 7 8.5c0 1.5.5 2.5 1.5 3.5s2 2 2 3.5v2.5h2V15.5c0-1.5 1-2.5 2-3.5s1.5-2 1.5-3.5z",
    plus: "M12 5v14M5 12h14",
    sparkle: "M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z",
    flask: "M9 3h6v3l4 10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L9 6V3z M9 8h6",
    edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
    trash: "M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M10 11v6 M14 11v6"
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

function Logo({ light = false, size = 26 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
      <img src="/loghi/logo_braderm.png" alt="Braderm" style={{ height: size * 1.3, objectFit: "contain" }} />
      <div style={{ width: 1, height: size * 0.8, background: light ? "rgba(255,255,255,0.2)" : "rgba(11,29,50,0.1)" }} />
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30, marginBottom: 24 }}>
          <img src="/loghi/logo_braderm.png" alt="Braderm" style={{ height: 90, objectFit: "contain" }} />
          <div style={{ width: 1, height: 50, background: `${T.navy}10` }} />
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
    </div>
  );
}

function AboutSection({ onBack }) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setVisible(parseInt(entry.target.dataset.index)); });
    }, { threshold: 0.5 });
    const sections = document.querySelectorAll(".about-slide");
    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, []);

  const L = LANG.about;
  const IMGS = ["/images/braderm-lcb.png", "/images/lcb 1.png", "/images/lcb 2.png", "/images/lcb 3.png", "/images/lcb 4.png", "/images/lcb 1.png", "/images/braderm-lcb.png"];

  return (
    <div className="slider-container" style={{ position: "relative", background: T.navy, color: T.white, height: "100vh", overflowY: "scroll", scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}>
      <div style={{ position: "fixed", top: 25, left: 25, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: `1px solid ${T.white}20`, borderRadius: "50%", width: 48, height: 48, cursor: "pointer", color: T.white, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }} onMouseEnter={e => e.currentTarget.style.background = T.gold} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>✕</button>
      </div>
      <div style={{ position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 12, zIndex: 100 }}>
        {[...Array(7)].map((_, i) => (
          <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: visible === i ? T.gold : `${T.white}25`, transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)", transform: visible === i ? "scale(3)" : "scale(1)" }} />
        ))}
      </div>
      <div>
        <section data-index={0} className="about-slide" style={{ background: T.navy }}>
          <div className="ken-burns" style={{ backgroundImage: `url(${IMGS[0]})`, opacity: 0.3, transform: visible === 0 ? "scale(1.1)" : "scale(1)" }} />
          <div className="content-wrap" style={{ textAlign: "center", opacity: visible === 0 ? 1 : 0, transform: visible === 0 ? "translateY(0)" : "translateY(30px)" }}>
            <h1 style={{ fontSize: "clamp(60px, 15vw, 120px)", fontFamily: SERIF, fontWeight: 900, color: T.gold, marginBottom: 10, lineHeight: 0.8 }}>{L.slide1.title}</h1>
            <p style={{ fontSize: "clamp(18px, 4vw, 24px)", fontFamily: FONT, fontWeight: 300, letterSpacing: 4, textTransform: "uppercase", marginBottom: 60 }}>{L.slide1.sub}</p>
          </div>
        </section>
        <section data-index={1} className="about-slide" style={{ background: T.cream, color: T.navy }}>
          <div className="content-wrap" style={{ textAlign: "left", opacity: visible === 1 ? 1 : 0, transform: visible === 1 ? "translateY(0)" : "translateY(30px)" }}>
            <h2 className="slide-title" style={{ color: T.navy }}>{L.slide2.title}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 35 }}>
              {L.slide2.timeline.map((t, idx) => (
                <div key={t.year} style={{ display: "flex", gap: 20, opacity: visible === 1 ? 1 : 0 }}>
                  <div style={{ flexShrink: 0, width: 60, height: 60, borderRadius: "50%", background: T.gold, color: T.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>{t.year}</div>
                  <div>
                    <h4 style={{ fontSize: 18, fontFamily: SERIF, margin: "0 0 6px" }}>{t.title}</h4>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: T.muted, margin: 0 }}>{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section data-index={2} className="about-slide" style={{ background: T.navy }}>
          <div className="content-wrap" style={{ textAlign: "center", opacity: visible === 2 ? 1 : 0, transform: visible === 2 ? "translateY(0)" : "translateY(30px)" }}>
            <h2 className="slide-title">{L.slide3.title}</h2>
            <p className="slide-sub">{L.slide3.sub}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {L.slide3.products.map(p => (
                <div key={p.name} className="glass-card" style={{ opacity: visible === 2 ? 1 : 0 }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: T.gold, fontFamily: SERIF }}>{p.name}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, margin: "4px 0" }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section data-index={3} className="about-slide" style={{ background: T.white, color: T.navy }}>
          <div className="content-wrap" style={{ textAlign: "left", opacity: visible === 3 ? 1 : 0, transform: visible === 3 ? "translateY(0)" : "translateY(30px)" }}>
            <h2 className="slide-title" style={{ color: T.navy }}>{L.slide4.title}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: T.muted, marginBottom: 40 }}>{L.slide4.main}</p>
          </div>
        </section>
        <section data-index={4} className="about-slide" style={{ background: T.navy }}>
          <div className="content-wrap" style={{ textAlign: "left", opacity: visible === 4 ? 1 : 0, transform: visible === 4 ? "translateY(0)" : "translateY(30px)" }}>
            <h2 className="slide-title">{L.slide5.title}</h2>
            <p className="slide-sub">{L.slide5.sub}</p>
            <p style={{ fontSize: 16, fontStyle: "italic", borderLeft: `3px solid ${T.gold}`, paddingLeft: 20, color: `${T.white}CC`, lineHeight: 1.6 }}>{L.slide5.collaboration}</p>
          </div>
        </section>
        <section data-index={5} className="about-slide" style={{ background: T.navy }}>
          <div className="content-wrap" style={{ textAlign: "center", opacity: visible === 5 ? 1 : 0, transform: visible === 5 ? "translateY(0)" : "translateY(30px)" }}>
            <h2 className="slide-title">{L.slide6.title}</h2>
            <div style={{ fontSize: "clamp(80px, 20vw, 120px)", fontWeight: 900, color: T.gold, fontFamily: SERIF, lineHeight: 1 }}>{L.slide6.stat.split(" ")[0]}</div>
          </div>
        </section>
        <section data-index={6} className="about-slide" style={{ background: T.navy }}>
          <div className="content-wrap" style={{ textAlign: "center", opacity: visible === 6 ? 1 : 0, transform: visible === 6 ? "translateY(0)" : "translateY(30px)" }}>
            <h2 className="slide-title" style={{ fontSize: "clamp(32px, 8vw, 56px)" }}>{L.slide7.title}</h2>
            <Btn onClick={onBack} variant="primary" style={{ padding: "18px 50px", fontSize: 16 }}>Return to Menu</Btn>
          </div>
        </section>
      </div>
      <style>{`
        .slider-container::-webkit-scrollbar { display: none; }
        .about-slide { height: 100vh; display: flex; align-items: center; justify-content: center; padding: 80px 24px; box-sizing: border-box; scroll-snap-align: start; scroll-snap-stop: always; position: relative; overflow: hidden; }
        .ken-burns { position: absolute; inset: 0; background-size: cover; background-position: center; transition: transform 10s ease-out; z-index: 0; }
        .content-wrap { position: relative; z-index: 1; width: 100%; max-width: 500px; transition: all 1s cubic-bezier(0.23,1,0.32,1); }
        .slide-title { font-size: clamp(32px, 8vw, 56px); font-family: ${SERIF}; line-height: 1.1; margin: 0 0 25px; }
        .slide-sub { font-size: 18px; line-height: 1.5; color: ${T.white}AA; margin-bottom: 40px; }
        .glass-card { background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); padding: 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 12px; transition: all 0.8s ease; }
        .slider-container { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

function LeadForm({ initialData, selected, onSubmit, onBack, title, sub, submitLabel, submitIcon, backLabel, hideBrochures }) {
  const [f, setF] = useState(initialData || { name: "", email: "", phone: "", company: "", country: "", role: "", interest: "", notes: "" });
  const [showCountries, setShowCountries] = useState(false);
  const [err, setErr] = useState("");
  const L = LANG.form;
  
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

          <textarea rows="3" placeholder="Additional notes..." value={f.notes} onChange={e => setF({...f, notes: e.target.value})} style={{ width: "100%", boxSizing: "border-box", padding: "14px", borderRadius: 12, border: `1.5px solid ${T.navy}10`, fontSize: 16, fontFamily: FONT, resize: "none" }} />
          
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginBottom: 40 }}>
        {activeBrochures.map(b => (
          <div key={b.id} onClick={() => toggle(b.id)} style={{ background: T.cardBg, borderRadius: 24, overflow: "hidden", cursor: "pointer", border: `2px solid ${selected.includes(b.id) ? T.gold : "transparent"}`, transition: "0.3s", position: "relative" }}>
             <div style={{ height: 180, position: "relative", overflow: "hidden" }}>
                <img src={b.cover} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }} />
                {selected.includes(b.id) && <div style={{ position: "absolute", top: 15, right: 15, width: 30, height: 30, borderRadius: "50%", background: T.gold, color: T.navy, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>✓</div>}
             </div>
             <div style={{ padding: 20 }}>
               <div style={{ fontSize: 10, fontWeight: 900, color: b.color, letterSpacing: 2, marginBottom: 5 }}>{b.line}</div>
               <h3 style={{ fontSize: 18, fontFamily: SERIF, marginBottom: 8 }}>{b.title}</h3>
               <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.5, marginBottom: 15 }}>{b.desc}</p>
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
    const vcf = `BEGIN:VCARD\nVERSION:3.0\nFN:${COMPANY.name}\nORG:${COMPANY.name}\nTEL;TYPE=WORK,VOICE:${COMPANY.phone}\nEMAIL:${COMPANY.email}\nURL:${COMPANY.website}\nADR;TYPE=WORK:;;${COMPANY.address}\nEND:VCARD`;
    const blob = new Blob([vcf], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "LCB_Contact.vcf"; a.click();
  };
  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <BackBtn onClick={onBack} />
      <SectionTitle title={L.title} sub={L.sub} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 500, margin: "0 auto 40px" }}>
        {[{ icon: "📞", label: "Phone", val: COMPANY.phone, href: `tel:${COMPANY.phone}` }, { icon: "✉️", label: "Email", val: COMPANY.email, href: `mailto:${COMPANY.email}` }, { icon: "🌐", label: "Website", val: COMPANY.website.replace("https://", ""), href: COMPANY.website }, { icon: "📍", label: "Address", val: COMPANY.address, href: "https://maps.google.com/?q=" + encodeURIComponent(COMPANY.address) }].map(c => (
          <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <Card style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 24px" }}>
              <div style={{ fontSize: 24 }}>{c.icon}</div>
              <div><div style={{ fontSize: 10, fontWeight: 900, color: T.gold, textTransform: "uppercase" }}>{c.label}</div><div style={{ fontSize: 16, fontWeight: 800, color: T.navy }}>{c.val}</div></div>
            </Card>
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

function StaffDashboard({ leads, brochures, onToggleBrochure, onAddLead, onUpdateLead, onDeleteLead, onClose }) {
  const [tab, setTab] = useState("leads");
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
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
       {/* PREMIUM HEADER */}
       <header style={{ background: T.navy, color: T.white, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
             <Logo light size={18} />
             <div style={{ background: "rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 800, letterSpacing: 1 }}>STAFF HUB</div>
          </div>
          <button onClick={onClose} style={{ background: T.gold, border: "none", color: T.navy, padding: "8px 16px", borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>EXIT</button>
       </header>

       {/* TABS CONTROLLER */}
       <div style={{ background: T.white, display: "flex", padding: "0 10px" }}>
          {["leads", "inventory"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "16px", border: "none", background: "none", color: tab === t ? T.navy : T.muted, fontWeight: 800, fontSize: 12, textTransform: "uppercase", borderBottom: `3px solid ${tab === t ? T.gold : "transparent"}`, transition: "0.3s" }}>{t}</button>
          ))}
       </div>

       <main style={{ flex: 1, overflow: "auto", padding: "20px" }}>
          {tab === "leads" && (
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
               {/* QUICK STATS */}
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
                      <div key={i} style={{ background: T.white, padding: 15, borderRadius: 16, boxShadow: "0 2px 6px rgba(0,0,0,0.03)", display: "flex", gap: 15, animation: "fadeIn 0.3s ease" }}>
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
                                  <button onClick={() => setEditItem(l)} style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.5, color: T.navy }}>
                                     <Icon name="edit" size={18} />
                                  </button>
                                  <button onClick={() => setDeleteId(l.id)} style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.5, color: T.error }}>
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
       </main>

       {/* FLOATING ACTION BUTTON */}
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
    const leadData = { ...d, added_by: currentUser || "Visitor", created_at: new Date().toISOString() };
    
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
    return <StaffDashboard leads={leads} brochures={brochures} onToggleBrochure={toggleBrochure} onAddLead={addLead} onUpdateLead={updateLead} onDeleteLead={deleteLead} onClose={logout} />;
  }

  // --- VISITOR VIEW ---
  return (
    <div style={{ minHeight: "100vh", background: page === "about" ? T.navy : T.cream, fontFamily: FONT, color: T.navy }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
      `}</style>
      
      {page !== "about" && (
        <header style={{ position: "sticky", top: 0, zIndex: 1000, background: T.navy, padding: "15px 25px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
           <div onClick={() => setPage("home")} style={{ cursor: "pointer" }}><Logo light size={24} /></div>
        </header>
      )}

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
