| bg-paper | assets/candidates/bg-paper/bg-paper-200001.png | 8.57 |
| hero-mobile | /Users/dennissasse/Desktop/DEV/permanentReich/permanentreich/assets/candidates/hero-mobile/hero-mobile-200002.png | 9 |
| hero-desktop | /Users/dennissasse/Desktop/DEV/permanentReich/permanentreich/assets/candidates/hero-desktop/hero-desktop-200003.png | 8.88 |
| tile-smp | assets/candidates/tile-smp/tile-smp-200003.png | 8.77 |
| bg-interior | assets/candidates/bg-interior/bg-interior-200001.png | 8.13 |
| tile-pmu | /Users/dennissasse/Desktop/DEV/permanentReich/permanentreich/assets/candidates/tile-pmu/tile-pmu-200002.png | 8.28 |
| tile-wellness | assets/candidates/tile-wellness/tile-wellness-200002.png | 9.32 |

## Nachtrag 2026-08-20 — Flyer-Fotos statt KI (Kundenwunsch)

| Slot | Quelle | Farb-Gate (hue / sat / warmBias) |
|---|---|---|
| tiles/smp.jpg (ohne Video) | `flyer-2026-08/_ORIGINAL-smp-portrait.jpeg` | 28,0° / 28,5 % / 87,7 |
| tiles/pmu.jpg + .mp4 | `flyer-2026-08/_ORIGINAL-pmu-frau.jpeg` | 31,8° / 18,5 % / 70,5 |
| olga/bts.jpg | `studio-mann-eu/_ORIGINAL-bts.jpg` | 40,3° / 10,8 % / 13,9 — voller PASS |
| results/pmu-ergebnis.jpg | `Projektordner/…13.46.30 (3).jpeg` | 40,9° / 23,3 % / 9,2 — voller PASS |

Set-Konsistenz über alle Kacheln: hue-sd 2,9° (Grenze 12°).
`warmBias` liegt bei hautfüllenden Nahaufnahmen bauartbedingt über dem
Gate-Korridor (+6…+30) — genau wie bei den schon ausgelieferten Assets
`tiles/pmu.jpg` (74,7) und `results/pmu-nachher.jpg` (85,8). Maßgeblich sind
hier Hue-Korridor und Set-Abweichung.

## Nachtrag 2026-08-21 — Korrekturen aus Olgas Durchsicht

- `olga/bts.jpg`: wieder das echte Studio-Foto (Olga bei der SMP-Behandlung
  unter dem Ringlicht), Caption „Einblick ins Studio“.
- `tiles/smp.jpg`: neuer 4:5-Crop aus `_ORIGINAL-smp-portrait.jpeg`
  (1152×1440 → 1024×1280) mit ganzem Gesicht statt Makro-Ausschnitt,
  Brand-LUT `hald-permanentreich.png` via ffmpeg `haldclut`.
  Kopie des Zwischenstands: `assets/graded/flyer-smp-portrait-tile.jpg`.
- `tiles/smp.mp4` gelöscht — der Clip stammte aus dem Makro-Crop; die Kachel
  läuft jetzt mit Ken-Burns-Zoom auf dem Poster.

Set-Konsistenz nach der Änderung: hue-sd 4,6° (Grenze 12°).
