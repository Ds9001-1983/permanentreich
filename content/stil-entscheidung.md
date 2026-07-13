# Stil-Entscheidung (Phase 2 — Gate bestanden)

**Gewählt von Dennis am 2026-07-13: Richtung B — „Editorial Crème"** (moodboards/b.html). Ab jetzt Gesetz für alle Phasen.

## Verbindliche Stil-Regeln (aus Moodboard B)

- **Typografie:** Display **Fraunces** (Variable, Light 300–360, Italic für Akzentwörter, negatives Tracking bei Mega-Größen) · Script **Pinyon Script** (extrem sparsam: nur „Neu in Altklef", Signatur „Olga", 1–2 weitere Einwürfe) · Body **Hanken Grotesk** (17 px Fließtext, 300/400/600). Alle via `next/font/google` self-hosted.
- **Layout:** Magazin-Editorial, asymmetrische Spalten, sehr viel Negativraum, Bilder groß und frei stehend (keine Passepartout-Rahmen), Mega-Typo bis 15 vw.
- **Ornamentik:** radikal reduziert — nur einzelne ✦ als Satzzeichen/Marker und feine Hairlines. Keine Rautenketten, keine Doppellinien-Rahmen, keine Eck-Ornamente.
- **Farbe:** Ivory-Welt dominiert (`#faf6ee`/`#f5f0e8`/`#e8dcc8`), Gold `#bf885a` diszipliniert (~4 % Fläche, nie Tapete), Umber `#2e2620` für Text + genau einen dunklen CTA/Footer-Block.
- **Animations-Charakter:** organic-flowing — Mask-Reveals auf Mega-Typo, weiche lange Eases, Marquee-Claim-Band, Hover-Video-Tiles.
- **WebGL:** Silk-Shader als Hero-Overlay + feiner Film-Grain; Gold-Dust-Partikel in der Wellness-Pin-Section (aus Richtung C übernommen, da im dunklen CTA/Wellness-Kontext stimmig).
- **Bildsprache:** High-Key-Creme, große Freisteller, editorialer Weißraum, goldenes Streiflicht (LOOK.md unverändert gültig).

## Judge-Hinweise, die in die Umsetzung einfließen (Pflicht)

1. **Wärme sichern** (Zielgruppen-Judge): Copy bleibt persönlich-warm („Olga freut sich auf dich", Script-Signatur), trotz reduziertem Look — die Distanz-Gefahr von B wird über Text + echte Fotos + warmes Licht kompensiert.
2. **Lesbarkeit 45+:** 17-px-Body, große Touch-Targets (WhatsApp-CTA min. 56 px Höhe), Kontrast Fließtext über AA.
3. **Markenanker behalten** (Brand-Judge): Logo im Header, Pinyon-Script-Momente und der eine ✦ sind die Brücke zum Print — nicht streichen.

## Panel-Protokoll

Scores (gewichtet 40 % Brand / 30 % Awwwards / 30 % Zielgruppe): A 8,07 · C 7,03 · B 6,93.
Dennis hat sich nach Sichtung aller drei HTML-Previews bewusst für B entschieden (moderner Editorial-Look). Die dokumentierten B-Schwächen (Brand-Distanz, Wärme) werden durch die drei Pflicht-Hinweise oben aktiv gegengesteuert.

## Nachtrag 2026-07-13: „Verspielt-Paket" (Kundenwunsch Dennis)

Feedback: *„es fehlt der Seite so bisschen das weiblich Verspielte."* Die Ornament-Diät aus
Richtung B wird deshalb gezielt gelockert — Editorial bleibt das Fundament, darüber liegt
eine feminine, verspielte Schicht:

1. **Script-Einwürfe** (Pinyon, Gold): pro Sektionskopf ein handschriftliches Akzentwort
   („für dich", „natürlich schön", „deine Auszeit", „ganz entspannt", „Ich freu mich auf
   dich!"), leicht gedreht, sanft schwebend (CSS `schweben`), Overlap ≤ 0,28 em.
2. **Rundbogen-Masken** (`rounded-t-full`): Olga-Portrait, Wellness-Raumfotos, Lounge-Foto,
   mittlere Leistungs-Kachel — greift die echten Moos-Bögen im Studio auf.
3. **Gold-Swash-Flourishes** (SVG, zeichnen sich per Scroll): Hook-Abschluss, Olgas Signatur.
4. **Sparkles**: schwebende ✦/✧-Funken in Hook- und Termin-Sektion (CSS `funkeln`).
5. **Polaroid-Momente**: BTS bei Olga (mit Hover-Wiggle) + „Dein Platz bei mir"
   (Behandlungsraum) in der PMU-Sektion, beide leicht gedreht.
6. **Hover-Tilt** auf den Leistungs-Kacheln (±1,2°), weiche `rounded-2xl` auf Diptychon/Slider.
7. **Marquee-Band 2** wechselt Script und Display-Italic ab.

Alle Effekte respektieren `prefers-reduced-motion`; Script-Overlays sind `aria-hidden`
(der persönliche Gruß in der Termin-Sektion ist echter Inhalt und bleibt lesbar).
