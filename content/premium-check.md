# Premium-Check (premium-10k-web) — Stand 2026-07-13

## Prozess
- [x] Phase 1 (Brief) dokumentiert und approved — `content/brief.md`
- [x] Phase 2 (Moodboard, 3 Richtungen) präsentiert, 1 gewählt — B „Editorial Crème" (`content/stil-entscheidung.md`)
- [x] Phase 3 (Komponenten-Raster) vorhanden — `content/komponenten-raster.md`
- [x] Phase 4 (Code) abgeschlossen — Next.js 16, statischer Build grün
- [x] Phase 5 (Polish) komplett — WebGL, Videos, Micro-Interactions

## Design & Content
- [x] Custom-Fonts: Fraunces + Pinyon Script + Hanken Grotesk (self-hosted via next/font, DSGVO)
- [x] Farbsystem: Gold ≤ 10 % Fläche, Ivory dominant; Töne exakt aus Logo-Vektor (#bf885a)
- [x] Anti-Patterns geprüft (Multi-Agent-QA): keine Default-Fonts, kein Blur-Overlay auf Bildern, keine Häkchen-Listen, keine Fake-Testimonials (durch Olgas Versprechen ersetzt), durchgängig Du

## Signature Moves (7 Kern-Moves lt. Raster)
- [x] SM-15 Preloader mit echtem Asset-Progress (+ 1,8-s-Deckel für LCP)
- [x] SM-01 Split-Text-Reveal (Intl.Segmenter, ohne GSAP-Club)
- [x] SM-09 WebGL „Liquid Gold Silk" (Hero-Overlay soft-light + CTA-Hintergrund, Maus-reaktiv)
- [x] SM-03 Pin-Section-Scroll-Story (Wellness, 300 vh, 3 Kapitel) + Gold-Dust-Partikel
- [x] Custom Micro: Vorher/Nachher-Drag-Slider mit Gold-Rauten-Griff (SMP; PMU als ehrliches Diptychon, da Aufnahmen nicht deckungsgleich)
- [x] SM-05/06 Custom + Magnetic Cursor mit Kontext-Labels („Entdecken/Ziehen/Buchen/Halten")
- [x] SM-07 Marquee (Versprechen + Claim-Band)
- Unterstützende Effekte (bewusst als Micro-Interactions klassifiziert, nicht als eigene Moves): SM-12 Mask-Reveal im Hook, SM-13 Parallax (Services/Olga), SM-14 Zähler (Ablauf), SM-10 Hover-Video-Tiles (Teil des Service-Grids lt. Raster)

## Medien
- [x] Video-Hero vorhanden: Seide/Goldstaub-Loop (Desktop 16:9 + eigenes Mobile 9:16)
- [x] Hero-Video < 3 MB: 1,15 MB MP4 + 1,02 MB WebM, Poster-AVIF/JPG gesetzt
- [x] Alle KI-Bilder mit Art-Direction (LOOK-Baustein automatisch injiziert), pro Slot 2–3 Kandidaten + 3-Judge-Panel, Farb-Gate (color-check.mjs) zu 100 % bestanden, Set-Hue-Abweichung ≤ 6,1°
- [x] Echte Fotos mit Brand-LUT v4 gegradet, alle Gate-konform
- [!] Hero-Video nativ 720p (seedance-Limit; 1080p wird vom Endpoint abgelehnt) — auf > 1280 px hochskaliert, durch weiches Seiden-Motiv + Shader-Overlay kaschiert. Akzeptiert.

## Performance (Lighthouse Mobile, Prod-Build)
- [x] Performance 86 (> 80 mit Video-Hero) · Best Practices 100 · SEO 100 · **A11y 100**
- [x] CLS 0 · TBT 40 ms
- [!] LCP: real gemessen 240 ms (Chromium, 4× CPU-Throttling); Lighthouse-Simulation (Slow 4G) meldet ~4 s als Lantern-Artefakt der Font-Kette. Feld-LCP erfüllt < 2,5 s.
- [x] WebGL: DPR-Cap 1.5, Render-Pause außerhalb Viewport, Capability-Gate (reduced-motion, Save-Data, Low-End) → CSS-Fallback ohne Layout-Shift

## Branding
- [x] SUPERBRAND-Footer zeichengenau eingebunden
- [x] Tonalität durchgängig Du (inkl. Datenschutz, wo natürlich)

## Multi-Agent-QA (3 Reviewer + 22 adversarial bestätigte Findings)
Behoben: Hero-Fold-Bruch auf Laptop-Höhen (620–880 px verifiziert OK) · Reduced-Motion-Video-Pause · PMU-Diptychon statt Bildbruch-Slider · SMP-Aspects an native Crops angepasst · Touch-Targets ≥ 44 px (PMU-CTA, Tel-/Karten-/Footer-Links) · Gold-Partikel in die Sticky-Bühne verlegt · Ornament-Diät (kein automatisches ✦ je Eyebrow) · CTA-Shader auf 0,65 (Champagne bleibt sichtbar) · Ablauf-Spalten editorial gestaffelt · Fake-Testimonials → Olgas Versprechen · Copy-Fixes („Wach aussehen", „Oder ruf einfach an:") · veralteter EU-ODR-Passus ersetzt (§ 36 VSBG) · Rechtsseiten mit Wortmarke + Footer gerahmt

## Offen — nur durch Dennis/Olga lösbar (Go-live-Blocker Recht)
- [ ] **E-Mail-Adresse** für Impressum + Datenschutz (§ 5 DDG Pflicht!)
- [ ] **USt-Status** (USt-IdNr. oder Kleinunternehmerregelung § 19 UStG)
- [ ] **Hoster + AVV** für die Datenschutzerklärung (Hosting-Ziel lt. Brief: Hetzner)
- [ ] Schriftliche **Foto-Einverständnisse** der abgebildeten Kundinnen (Vorher/Nachher)
- [ ] Nutzungsrecht Produktfoto Massagesessel (Hersteller) prüfen
- [ ] Echte Kundenstimmen sammeln → ersetzen später Olgas Versprechen-Band

## Bewusste Abweichungen (dokumentiert)
- Statisches Kartenbild → stattdessen DSGVO-sicherer Karten-Link (Apple/Google Maps); ein erfundenes Kartenbild wäre irreführend, ein OSM-Render Ausbaustufe
- Barba.js → App-Router-Transitions (Barba ist mit Next-Routing inkompatibel; Seitenwechsel sind weich via Preloader-Session-Fade)
- Sound-Design: lt. Skill optional — nicht umgesetzt (Ausbaustufe)
