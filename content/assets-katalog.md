# Asset-Katalog (Projektordner/, Stand 2026-07-13)

Originale bleiben unangetastet. Verarbeitete Versionen → `assets/graded/`, Web-Formate → `public/media/`.

| Datei | Inhalt | Slot | Behandlung |
|---|---|---|---|
| `Reich, Olga Permanent Logo 6.pdf` | Logo (Vektor): Gold `#bf885a`, Grau `#999999` | Header, Preloader, Ornamente | → `assets/brand/logo.svg` ✓ |
| `…11.43.00.jpeg` | Flyer außen (Leistungen/Kontakt/Neu in Altklef) | Brand-Referenz, Copy-Quelle | keine (nicht auf Site) |
| `…11.43.00 (1).jpeg` | Flyer innen (PMU/SMP/Wellness) | Copy-Quelle: „Perfektion, die bleibt", „Selbstbewusstsein beginnt hier", „Zeit für dich" | keine |
| `…13.47.40.jpeg` | Visitenkarten | Farb-Referenz | keine |
| `…13.33.26.jpeg` | Portrait Olga sitzend, High-Key | Über-Olga (Haupt) | LUT leicht |
| `…13.35.26.jpeg` | Portrait Olga stehend | Über-Olga (Alternative) | LUT leicht ✓ getestet |
| `…13.46.30 (1).jpeg` | Goldener Massagesessel, Creme-Raum | Wellness-Pin-Section (Haupt), evtl. i2v-Tile | minimal |
| `…13.46.30.jpeg` | SMP Vorher/Nachher Frau (Collage, Text eingebrannt) | SMP-Slider Frau | croppen in 2 Bilder, WB angleichen |
| `…13.46.31.jpeg` | SMP Mann Oberkopf (nachher-artig) | SMP-Slider Mann | LUT warm |
| `…13.46.31 (1).jpeg` | SMP Mann Oberkopf (Ausgang, kühle Wand) | SMP-Slider Mann (vorher) | LUT warm ✓ getestet |
| `…13.46.30 (3).jpeg` | Powderbrows-Ergebnis Frau (frisch, Rötung) | PMU-Beleg klein | LUT + dezent, klein zeigen |
| `…13.46.31 (4).jpeg` | Brauen Vorher/Nachher Split | PMU-Slider | Split trennen, croppen, LUT |
| `…13.46.31 (2).jpeg` | Behandlung durch Ringlicht („Auszeit"-Kissen) | Behind-the-scenes klein (Über-Olga) | LUT warm |
| `…13.46.31 (3).jpeg` | SMP-Behandlung „Dienstag"-Story-Text | — Reserve | Text stört; nur Notfall |
| `…13.46.26.jpeg` | Behandlung lila Handschuhe, kühl | **AUSSCHUSS** (Farbwelt-Bruch) | — |
| `…13.46.30 (2).jpeg` | PMU-Behandlung dunkel | **AUSSCHUSS** (zu dunkel) | — |

## Brand-Dateien (erzeugt)

- `assets/brand/logo.svg` — Vektor-Logo aus PDF
- `assets/brand/logo-1.png` — 300-dpi-Raster (transparent)
- `assets/brand/hald-identity.png` — HALD-Identity (Basis)
- `assets/brand/hald-permanentreich.png` — **Brand-LUT v1** (colortemperature 5100 K, warme Balance, Sättigung 0.95, lifted shadows)
  - Anwenden Foto: `ffmpeg -i IN -i assets/brand/hald-permanentreich.png -filter_complex haldclut OUT`
  - Anwenden Video: gleicher Filter, identischer Look für alles

## Nachtrag 2026-07-13

| Datei | Inhalt | Slot | Behandlung |
|---|---|---|---|
| `IMG_6698.mov` | Studio-Rundgang (iPhone, HLG/HDR, 2160×3840@60, 6,3 s): Liege → Sitzecke → Gold-Sessel | Mobiler Scrollytelling-Hero | `scripts/build-scrub.sh`: eq-Kompensation + Brand-LUT + 76 WebP-Frames → `public/media/hero/scrub/` ✓ Gate |
| *(Logo-Derivat)* | Kern-Wortmarke „PERMANENT Reich" — farbsepariert aus dem Vektor (graue Subline entfernt, PDF-Rahmenlinie beschnitten) | Header, Preloader, Footer, Rechtsseiten, OG-Bild | `public/logo-wortmarke.png` |
| *(Logo-Derivat)* | Gold-Script-„R" als Favicon/App-Icon | Browser-Tab, iOS-Homescreen | `app/icon.png`, `app/apple-icon.png` |

## Nachtrag 2026-08-20 (Flyer-Fotos, Kundenwunsch Olga)

Olgas Rückmeldung: die Männerbilder auf der Site zeigten Buzzcut statt SMP.
Ersatz kommt aus derselben Foto-Serie wie der Flyer (`…11.43.00 (1).jpeg`).
Originale liegen in `assets/candidates/flyer-2026-08/` (gitignored).

| Original | Inhalt | Slot | Behandlung |
|---|---|---|---|
| `_ORIGINAL-smp-makro.jpeg` (1536×2048) | Oberkopf-Makro, SMP-Punkte + gezogener Haaransatz | SMP-Kachel `#leistungen` | `crop=1200:1500:230:400` → 1024×1280, Brand-LUT + `eq=saturation=0.82` + `colorbalance=rs=-0.03:rm=-0.04` |
| `_ORIGINAL-smp-portrait.jpeg` (1152×1536) | 3/4-Portrait, gepflegte Stoppelglatze | Polaroid „SMP für Ihn" (Über Olga) | `crop=1152:1152:0:130` → 1200×1200, gleiches Grading |
| `_ORIGINAL-pmu-frau.jpeg` (1638×2048) | Halbes Gesicht: Braue, Wimpernkranz, Lippen | PMU-Kachel `#leistungen` | nur `scale=1024:1280`, gleiches Grading |
| `…13.46.30 (3).jpeg` (Projektordner) | Powderbrows-Ergebnis echte Kundin | Ergebnis-Karte `#ergebnisse` | `crop=600:800:130:300` → 900×1200, LUT + `eq=saturation=0.75` — **bewusst enger Brauen-Ausschnitt** (ohne Mund/Nase), solange keine schriftliche Einwilligung für eine Gesichtsaufnahme vorliegt |

**Hover-Videos** (`tiles/smp.mp4`, `tiles/pmu.mp4`) sind kein i2v mehr, sondern ein
nahtloser Ping-Pong-Push-in aus dem jeweils gegradeten Standbild:
`zoompan` 1.00→1.10 auf 4×-Upscale → 720×900, vorwärts + `reverse` konkateniert.
Dadurch zeigen Poster und Video garantiert dieselbe Person und exakt dieselbe Farbe.
