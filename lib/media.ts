/**
 * Zentrale Medien-Map — einzige Quelle für Medien-Pfade in Sektionen.
 * Phase 5b ersetzt Platzhalter (Hero-Video, Tiles) durch Judging-Gewinner;
 * die Pfade bleiben stabil.
 */

export const media = {
  hero: {
    posterDesktop: '/media/hero/poster-desktop.jpg',
    posterMobile: '/media/hero/poster-mobile.jpg',
    videoDesktopMp4: '/media/hero/hero.mp4',
    videoDesktopWebm: '/media/hero/hero.webm',
    videoMobileMp4: '/media/hero/hero-mobile.mp4',
    /** Mobiler Scrollytelling-Rundgang (scripts/build-scrub.sh) */
    scrub: {
      count: 76,
      frame: (i: number) => `/media/hero/scrub/f${String(i + 1).padStart(2, '0')}.webp`,
    },
  },
  tiles: {
    pmu: { poster: '/media/tiles/pmu.jpg', video: '/media/tiles/pmu.mp4' },
    /* Kein Hover-Video: das Vollgesicht-Foto trägt die Kachel allein
       (der alte Clip stammte aus dem engen Makro-Crop). */
    smp: { poster: '/media/tiles/smp.jpg', video: undefined },
    wellness: { poster: '/media/tiles/wellness.jpg', video: '/media/tiles/wellness.mp4' },
  },
  results: {
    pmu: { vorher: '/media/results/pmu-vorher.jpg', nachher: '/media/results/pmu-nachher.jpg' },
    smpFrau: { vorher: '/media/results/smp-frau-vorher.jpg', nachher: '/media/results/smp-frau-nachher.jpg' },
    smpMann: { vorher: '/media/results/smp-mann-vorher.jpg', nachher: '/media/results/smp-mann-nachher.jpg' },
    /** Powderbrows direkt nach der Sitzung — nur Ergebnis, kein Vorher-Pendant */
    pmuErgebnis: '/media/results/pmu-ergebnis.jpg',
  },
  olga: {
    portrait: '/media/olga/portrait-1.jpg',
    portraitAlt: '/media/olga/portrait-2.jpg',
    bts: '/media/olga/bts.jpg',
  },
  wellness: {
    sessel: '/media/wellness/sessel.jpg',
    /** Echte Studio-Fotos (LUT-gegradet, Farb-Gate PASS) — je Kapitel eins */
    raeume: [
      '/media/wellness/raum-01.jpg',
      '/media/wellness/raum-02.jpg',
      '/media/wellness/raum-03.jpg',
    ],
  },
  cta: {
    /** Echte Sitzecke — warmer Anker in der Termin-Sektion */
    lounge: '/media/cta/lounge.jpg',
  },
  /** Behandlungsraum mit „Auszeit"-Kissen — Polaroid in der PMU-Sektion */
  pmuStudio: '/media/pmu-studio.jpg',
  textures: {
    paper: '/media/textures/paper.jpg',
    interior: '/media/textures/interior.jpg',
  },
  logo: '/logo.svg',
  /** Kern-Wortmarke (PERMANENT + Reich-Script), farbsepariert aus dem Logo-Vektor */
  logoWortmarke: '/logo-wortmarke.png',
} as const;

/** Hover-Videos + Hero-Videos sind generiert, komprimiert und farb-geprüft */
export const VIDEOS_READY = true;

/**
 * Beweis-Galerie (#ergebnisse) — eine Quelle für alle Vorher/Nachher-Belege.
 * Ein neues Foto-Paar von Olga ist genau ein Eintrag hier, sonst nichts.
 *
 * `modus` bildet ab, was das Material hergibt:
 *   slider    — deckungsgleiche Aufnahmen, Drag-Vergleich möglich
 *   diptychon — Aufnahmen nicht deckungsgleich, nebeneinander ist der ehrliche Vergleich
 *   einzel    — nur ein Ergebnis, kein Vorher-Pendant vorhanden
 */
export type Ergebnis =
  | {
      id: string;
      kategorie: string;
      titel: string;
      text: string;
      aspect: string;
      modus: 'slider' | 'diptychon';
      vorher: string;
      nachher: string;
      nachherLabel?: string;
    }
  | {
      id: string;
      kategorie: string;
      titel: string;
      text: string;
      aspect: string;
      modus: 'einzel';
      bild: string;
    };

export const ergebnisListe: readonly Ergebnis[] = [
  {
    id: 'pmu-frisch',
    kategorie: 'Permanent Make-up',
    titel: 'Frisch pigmentiert',
    text: 'Direkt nach der Sitzung: klare Kontur, weicher Verlauf. Die Farbe hellt beim Heilen noch auf.',
    modus: 'einzel',
    aspect: 'aspect-[3/4]',
    bild: media.results.pmuErgebnis,
  },
] as const;
