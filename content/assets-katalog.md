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
