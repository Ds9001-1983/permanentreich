# LOOK „PermanentReich Gold-Ivory" — Single Source of Truth

Jedes Pixel der Site (KI-Bilder, Videos, echte Fotos, UI-Farben, Shader) lebt in
dieser warmen Ivory/Gold-Welt. Weißabgleich ~4800–5200 K, Farbton-Schwerpunkt
Orange-Gold. Abweichungen = Fail im color-check.

## Farb-Anker (Hex)

| Token | Hex | Quelle / Einsatz |
|---|---|---|
| `light` | `#faf6ee` | hellster Punkt, Highlights, Shader-Ramp Start |
| `ivory` | `#f5f0e8` | Flächen-Grundton (Flyer-Papier) |
| `champagne` | `#e8dcc8` | Mitteltöne, Karten, Passepartouts |
| `gold` | `#bf885a` | **exakt aus Logo-SVG** — Akzent, Script, Ornamente, max. 10 % Fläche |
| `gold-deep` | `#a8743f` | Hover-/Schattenstufe von Gold |
| `stone` | `#999999` | **exakt aus Logo-SVG** — nur im Logo-Kontext |
| `umber-soft` | `#6b6560` | Sekundärtext (warmgrau) |
| `umber` | `#2e2620` | Fließtext, dunkle Footer-Fläche (warmes Dunkelbraun statt Schwarz) |

## Art-Direction-Prompt-Baustein (JEDEM KI-Prompt voranstellen — via scripts/gen-image.mjs)

```
editorial luxury beauty photography, warm ivory cream palette (#f5f0e8 background,
#e8dcc8 midtones, #bf885a gold accents), soft diffused warm morning light (~4800K),
gentle golden backlight, lifted shadows, creamy soft highlights, subtle fine film
grain (Fuji Pro 400H pastel emulation), airy negative space, high-key brightness,
shot on medium format 80mm — no text, no logos, no watermark, no harsh contrast,
no cool or blue tones, no purple, no distorted anatomy
```

## Referenzbilder (Look-Book-Anker)

1. `Projektordner/WhatsApp Image 2026-07-10 at 11.43.00.jpeg` — Flyer außen (Papiertextur, Gold-Script, Ornamente)
2. `Projektordner/WhatsApp Image 2026-07-10 at 13.46.30 (1).jpeg` — goldener Sessel im Creme-Raum (brand-perfektes Foto)
3. `Projektordner/WhatsApp Image 2026-07-10 at 13.33.26.jpeg` — Portrait Olga, helles High-Key

## Messkriterien (Pass/Fail, scripts/color-check.mjs)

| Metrik | Zielbereich | prüft |
|---|---|---|
| Farbton (Hue, Bildmittel, HSL) | 25°–55° | Orange-Gold-Welt, kein Blau/Lila |
| Warm-Bias Weiß-Patch (hellste 10 %) | R−B zwischen +6 und +30 (8-bit) | warme Highlights statt Neutral-/Kaltweiß |
| Sättigung Bildmittel | 8–35 % | edel-pastellig, nicht knallig |
| ΔE2000 zum nächsten Brand-Anker | < 18 | Palette-Nähe |
| Set-Konsistenz (alle Assets) | Std-Abweichung der Hues < 12° | Assets passen untereinander |

Videos: 3 extrahierte Frames (Anfang/Mitte/Ende) müssen einzeln bestehen.

## Grading-Regeln echte Fotos

- Brand-LUT (`assets/brand/hald-permanentreich.png`) via ffmpeg `haldclut` auf Fotos UND Videos — identischer Look
- Vorher/Nachher-Fotos: Warm-Grading ja, aber Hautton glaubwürdig lassen (Beweisfotos!)
- Ausschuss (Farbwelt-Bruch, nicht verwenden): `13.46.26.jpeg` (lila Handschuhe), `13.46.30 (2).jpeg` (zu dunkel)
