# Komponenten-Raster (Phase 3) — PermanentReich One-Pager

Breakpoints: Mobile < 768 (4-col) · Tablet 768–1024 (6-col) · Desktop > 1024 (12-col, max 1440 px Container, Full-bleed nur Medien). Sektions-Padding `clamp(80px, 10vw, 160px)`. Typo/Farb-Details folgen der Moodboard-Entscheidung.

| # | Sektion | Funktion (User versteht/tut) | Layout | Content-Slots | Signature-Move | WebGL | Mobile-Anpassung |
|---|---|---|---|---|---|---|---|
| 0 | **Preloader** | Marke spüren, Ladezeit überbrücken | zentriert, Fullscreen Ivory | Monogramm-SVG, %-Zahl | SM-15 echter Progress (Asset-Manifest: Fonts, Hero-Poster, Hero-Video-canplay) | – | identisch |
| 1 | **Hero** `#start` | „Hier bin ich richtig" in 2 s; scrollen | Full-bleed 100svh | Video-BG (16:9/9:16), Script-Badge „Neu in Altklef", H1 Claim, Sub (Leistungs-Trias), Scroll-Hint | SM-01 Split-Text (zeilenweise); Video-Hero | Silk-Shader-Overlay (soft-light) + Grain | eigenes 9:16-Video < 2 MB |
| 2 | **Hook** `#reich` | USP verinnerlichen | zentriert, Mega-Typo `clamp(64px,12vw,200px)` | 3 Zeilen „Persönlich. Ehrlich. Auf Augenhöhe.", Ornament-Linie | SM-12 Mask-Reveal per Scroll-Scrub; SVG-Linie zeichnet sich | – (Papiertextur CSS) | 3 Zeilen gestapelt, 15vw |
| 3 | **Leistungen** `#leistungen` | 3 Reiche erkennen, eines wählen | asymmetrisches 3er-Grid (5/4/3-Spans, versetzt) | je: Tile-Video, Eyebrow, Titel, 1-Zeiler, Anchor-Link | SM-10 Hover-Video-Tiles + SM-05 Magnetic, Cursor-Label „Entdecken" | – | 1-spaltig, Videos autoplay bei InView |
| 4 | **PMU** `#pmu` | Angebot verstehen + Beweis sehen | Split 55/45, Bild rechts versetzt | Eyebrow, H2, Fließtext, 3 Detail-Items (Powderbrows/Lippen/Wimpernkranz) mit Linien-Icons, Vorher/Nachher-Slider, Text-Link CTA | Custom Drag-Slider (Gold-Rauten-Griff, Cursor „Ziehen") | – | gestapelt: Text → Slider |
| 5 | **SMP** `#smp` | „auch für mich" (Sie & Ihn) | Split 45/55 gespiegelt | Eyebrow, H2, Toggle Sie↔Ihn, Fließtext, Vorher/Nachher-Slider (wechselt mit Toggle), CTA | Toggle-Crossfade (GSAP Flip/Fade) + Drag-Slider | – | gestapelt |
| 6 | **Wellness** `#wellness` | Sessel als Erlebnis begehren | Full-bleed Pin, 300vh Scroll-Strecke | Sessel-Bild (freigestellt/Foto), 3 Kapitel-Texte „Ankommen/Abschalten/Auftanken", Kapitel-Zähler 01–03 | SM-03 Pin-Story + SM-14 Counter | Gold-Dust-Partikel, Dichte an Scroll-Progress | Pin bleibt, kürzere Strecke (200vh), Partikel halbiert |
| 7 | **Über Olga** `#olga` | Vertrauen zur Person | asymmetrisch 5/7 (Bild links) | Portrait, Script-Zitat, Fließtext (persönlich, Du), Behind-the-scenes-Mini | SM-13 Parallax (Bild langsamer) | optional Hover-Ripple (nur Desktop) | Bild oben, Text unten |
| 8 | **Ablauf** `#ablauf` | Hemmschwelle senken: so einfach geht's | 3 Spalten horizontal | 3 Schritte (Beratung kostenlos → Behandlung → Nachsorge), Nummern 01–03, je 2 Sätze | SM-14 Nummern zählen hoch bei InView | – | vertikal gestapelt mit Linie |
| 9 | **Stimmen** | Social Proof | Full-width Marquee, 2 Bänder | Band 1: Kundinnen-Zitate (Name + Ort), Band 2: Claim-Repetition „Schönheit ✦ Gesundheit ✦ Zeit für dich" | SM-07 Marquee (40 s, Hover pausiert) | – | Geschwindigkeit reduziert |
| 10 | **Termin-CTA** `#termin` | Termin buchen JETZT | Split 50/50 | H2 („Dein Termin in deinem Reich."), WhatsApp-Btn (vorformulierte Nachricht), Instagram-Btn, tel-Link, Adresse, Öffnungszeiten, statisches Kartenbild + Maps-Link | SM-05 Magnetic Buttons, Cursor „Buchen" | Silk-Shader als Sektions-BG | gestapelt, Buttons full-width |
| 11 | **Footer** | Abschluss, Recht, Branding | Full-bleed dunkel (#2e2620) | Mega-Claim „Dein Reich." (Script), Kontakt-Grid, Instagram, Impressum/Datenschutz-Links, SUPERBRAND-Footer | Mega-Typo-Reveal | – | Grid 1-spaltig |

**Seiten:** `/` (alle Sektionen) · `/impressum` · `/datenschutz` (reduziertes Layout: Header + Prosa + Footer; Page-Transition Gold-Vorhang).

**Globale Elemente:** Custom Cursor (Gold-Kreis + Kontext-Labels, Touch deaktiviert) · Scroll-Progress (1 px Gold-Linie oben) · Header (Logo-SVG, Anchor-Nav, „Termin"-Pill; blendet bei Scroll-down aus, bei Scroll-up ein) · Lenis Smooth-Scroll · `prefers-reduced-motion`: alle Scrub/Pin aus, Inhalte statisch sichtbar, Video → Poster.

**Cursor-Labels:** Leistungs-Tiles „Entdecken" · Slider „Ziehen" · CTA-Buttons „Buchen" · Marquee „Halten".

**Asset-Zuordnung:** Tiles V3/V4/V5 (KI) · PMU-Slider R3 (`13.46.31 (4)` Split) · SMP-Slider Frau R4 (Collage-Crop), Mann R5 (`13.46.31 (1)` vorher / `13.46.31` nachher) · Wellness R2 (Sessel) · Olga R1 (`13.33.26` Haupt) · BTS R6 (`13.46.31 (2)`).
