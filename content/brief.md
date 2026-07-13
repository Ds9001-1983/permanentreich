# Design-Brief „PermanentReich" (Phase 1 — 8 harte Antworten)

**1. Kunde / Branche / Zielgruppe**
Olga Reich, PermanentReich — Beauty-&-Wellness-Studio (Permanent Make-up, Kopfhautpigmentierung, Luxus-Massagesessel) in Wiehl/Altklef, Oberbergischer Kreis; Zielgruppe: Frauen 30–65 (PMU), Männer & Frauen mit Haarverlust (SMP), lokal + Umkreis 30 km.

**2. Emotions-Hook (erste 2 Sekunden)**
**Wärme + Luxus** — „Ich betrete ein goldenes, ruhiges Reich, hier werde ich persönlich umsorgt."

**3. Ein-Satz-Headline (Hero)**
**„Dein Reich für Schönheit & Gesundheit."** (etablierter Marken-Claim; Script-Badge darüber: „Neu in Altklef")

**4. Farb-Hauptton**
Primär: Gold `#bf885a` (exakt aus Logo, max. 10 % Fläche) · Neutral-Palette: `#faf6ee` / `#f5f0e8` / `#e8dcc8` (Ivory/Champagner) · Text: `#2e2620` / `#6b6560` (warmes Dunkelbraun/Warmgrau). Keine weiteren Farben.

**5. Typo-Stimmung**
**luxury-italic / warm-serif** — Serif-Caps (wie Logo „PERMANENT") + Copperplate-Script-Akzente (wie Logo „Reich") + humanistischer Sans-Body. Finale Paarung entscheidet das Moodboard.

**6. Drei Referenz-URLs** (aus Skill-Benchmark, passend zur Richtung)
1. exoape.com — langsame cinematische Pans, Video-Hero-Dramaturgie
2. monopo.tokyo — Soft-Luxury-Feinheit, Custom Cursor, Micro-Animationen
3. 14islands.com — helle, weiche Shader-Welt (Beweis: WebGL geht auch hell)

**7. Inhalts-Inventar (One-Pager, nicht mehr, nicht weniger)**
Preloader → Hero (Video) → Hook-Statement → Leistungen (3er-Grid) → PMU (mit Vorher/Nachher) → SMP Sie & Ihn (mit Vorher/Nachher) → Wellness (Pin-Story Sessel) → Über Olga → Ablauf/Beratung (3 Schritte) → Stimmen-Marquee → Termin-CTA (WhatsApp/Instagram/Tel) → Footer. Unterseiten: /impressum, /datenschutz.

**8. Technik-Rahmen**
Next.js 14+ App Router (TypeScript, Tailwind), Lenis + GSAP + ScrollTrigger, Three.js/R3F (Silk-Shader + Gold-Partikel), Video-Hero via z-image-turbo→seedance (Higgsfield als Zweitquelle), Fonts self-hosted (DSGVO), statische Karte statt Google Maps. Performance-Budget: Lighthouse Mobile > 80, LCP < 2.5 s, CLS < 0.1, Hero-Video < 3 MB. Hosting-Ziel: Hetzner (lt. Skill), Domain permanentreich.info. Tonalität: durchgängig Du.

---
Status: **approved** (Plan-Freigabe durch Dennis am 2026-07-13; Stilrahmen „Hell: Creme + Gold" bestätigt)
