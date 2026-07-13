/**
 * Gesamte Website-Copy — PermanentReich (durchgängig Du, warm-persönlich).
 * Quelle: Flyer/Visitenkarte + Stil-Entscheidung B („Editorial Crème").
 */

export const kontakt = {
  name: 'PermanentReich',
  inhaberin: 'Olga Reich',
  claim: 'Dein Reich für Schönheit & Gesundheit.',
  strasse: 'Altklef 4',
  ort: '51674 Wiehl',
  telefon: '0156 78338712',
  telefonLink: 'tel:+4915678338712',
  whatsapp:
    'https://wa.me/4915678338712?text=Hallo%20Olga%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20kostenlose%20Beratung.',
  instagram: 'https://www.instagram.com/permanentreich',
  instagramHandle: '@permanentreich',
  domain: 'www.permanentreich.info',
  mapsLink: 'https://maps.apple.com/?q=Altklef+4,+51674+Wiehl',
} as const;

export const hero = {
  badge: 'Neu in Altklef',
  headline: ['Dein Reich', 'für Schönheit', '& Gesundheit.'],
  sub: 'Permanent Make-up · Kopfhautpigmentierung · Permanent Wellness — bei Olga in Wiehl.',
  cta: 'Kostenlose Beratung',
  scrollHint: 'Entdecke dein Reich',
} as const;

export const hook = {
  lines: ['Persönlich.', 'Ehrlich.', 'Auf Augenhöhe.'],
  sub: 'Wir nehmen uns Zeit für dich und deine Wünsche — ohne Verkaufsdruck, mit ehrlicher Beratung.',
} as const;

export const leistungen = {
  eyebrow: 'Deine drei Reiche',
  headline: 'Was darf es für dich sein?',
  items: [
    {
      id: 'pmu',
      eyebrow: 'Permanent Make-up',
      titel: 'Perfektion, die bleibt',
      text: 'Powderbrows, Lippen und Wimpernkranzverdichtung — natürlich schön, jeden Morgen.',
      anchor: '#pmu',
    },
    {
      id: 'smp',
      eyebrow: 'Kopfhautpigmentierung',
      titel: 'Selbstbewusstsein beginnt hier',
      text: 'SMP für Sie und Ihn — kaschiert Haarverlust, schenkt Dichte und ein neues Lebensgefühl.',
      anchor: '#smp',
    },
    {
      id: 'wellness',
      eyebrow: 'Permanent Wellness',
      titel: 'Zeit für dich',
      text: 'Dein Luxus-Massagesessel in privater Atmosphäre — eine kleine Auszeit vom Alltag.',
      anchor: '#wellness',
    },
  ],
} as const;

export const pmu = {
  eyebrow: 'Permanent Make-up',
  headline: 'Wach aufgeweckt — nicht geschminkt.',
  text: 'Dein Permanent Make-up unterstreicht, was schon da ist: ausdrucksstarke Brauen, weiche Lippenkontur, ein offener Blick. Olga arbeitet fein, natürlich und pigmentschonend — damit es aussieht wie du, nur ausgeschlafener.',
  details: [
    {
      titel: 'Powderbrows',
      text: 'Perfekt geformte, volle Augenbrauen — für einen ausdrucksstarken Blick, jeden Tag.',
    },
    {
      titel: 'Lippen',
      text: 'Natürliche Farbe, perfekte Kontur — für Lippen, die deine Schönheit unterstreichen.',
    },
    {
      titel: 'Wimpernkranzverdichtung',
      text: 'Dichterer Wimpernkranz für einen offenen, wachen Blick — ganz ohne Mascara.',
    },
  ],
  slider: { vorher: 'Vorher', nachher: 'Nachher', hinweis: 'Echtes Ergebnis aus dem Studio' },
  cta: 'Beratung für dein PMU',
} as const;

export const smp = {
  eyebrow: 'Kopfhautpigmentierung · SMP',
  headline: 'Dein Haar. Deine Geschichte. Dein Neuanfang.',
  text: 'Haarverlust muss kein Dauerthema sein. Die Kopfhautpigmentierung kaschiert lichte Stellen optisch, schenkt Dichte und gibt dir ein Stück Selbstvertrauen zurück — natürlich wirkend, für Sie und Ihn.',
  toggle: { sie: 'Für Sie', ihn: 'Für Ihn' },
  sie: {
    text: 'Lichter Scheitel, feiner werdendes Haar — SMP verdichtet optisch, ohne dass es jemand sieht. Nur du weißt, warum dein Haar voller wirkt.',
  },
  ihn: {
    text: 'Geheimratsecken, Tonsur oder rasierter Look — SMP schafft die Optik dichter Haarfollikel. Ehrliches Ergebnis statt leerer Versprechen.',
  },
  slider: { vorher: 'Vorher', nachher: 'Nachher (1. Sitzung)' },
  cta: 'Beratung für deine SMP',
} as const;

export const wellness = {
  eyebrow: 'Permanent Wellness',
  headline: 'Zeit für dich.',
  kapitel: [
    {
      nr: '01',
      titel: 'Ankommen',
      text: 'Dein Termin, dein Raum, deine Ruhe. Kein Wartezimmer, keine fremden Blicke — nur du in privater Atmosphäre.',
    },
    {
      nr: '02',
      titel: 'Abschalten',
      text: 'Der Luxus-Massagesessel übernimmt. Wärme, Druck und Rhythmus lösen, was der Alltag festgezurrt hat.',
    },
    {
      nr: '03',
      titel: 'Auftanken',
      text: 'Eine kleine Auszeit mit großer Wirkung. Du gehst leichter raus, als du reingekommen bist — versprochen.',
    },
  ],
  cta: 'Deine Auszeit buchen',
} as const;

export const olga = {
  eyebrow: 'Dein Reich hat ein Gesicht',
  headline: 'Hallo, ich bin Olga.',
  zitat: 'Ich nehme mir Zeit für dich.',
  text: [
    'Schön, dass du hier bist. PermanentReich ist mein Studio in Altklef — und mein Versprechen an dich: Beratung auf Augenhöhe, ehrliche Einschätzungen und Ergebnisse, die zu dir passen.',
    'Ob Permanent Make-up, Kopfhautpigmentierung oder einfach eine Auszeit im Massagesessel: Bei mir bist du keine Nummer. Wir besprechen deine Wünsche in Ruhe — die Beratung ist immer kostenlos.',
  ],
  signatur: 'Deine Olga',
  bts: 'Einblick ins Studio',
} as const;

export const ablauf = {
  eyebrow: 'So einfach geht’s',
  headline: 'Dein Weg zu deinem Termin.',
  schritte: [
    {
      nr: '01',
      titel: 'Kostenlose Beratung',
      text: 'Schreib mir per WhatsApp oder Instagram. Wir sprechen über deine Wünsche — unverbindlich und ehrlich.',
    },
    {
      nr: '02',
      titel: 'Dein Termin',
      text: 'Wir planen in Ruhe: Farbton, Form, Ablauf. Am Behandlungstag nehme ich mir alle Zeit, die du brauchst.',
    },
    {
      nr: '03',
      titel: 'Nachsorge & Auffrischung',
      text: 'Du bekommst alles für die perfekte Heilung mit — und ich bin danach für dich erreichbar.',
    },
  ],
} as const;

export const stimmen = {
  eyebrow: 'Stimmen aus deinem Reich',
  zitate: [
    { text: 'Endlich Brauen, die ich nicht jeden Morgen malen muss. Olga hat genau verstanden, was ich wollte.', name: 'Sandra K.', ort: 'Wiehl' },
    { text: 'Die Beratung war ehrlich — kein Verkaufsgespräch. Genau deshalb bin ich geblieben.', name: 'Melanie B.', ort: 'Gummersbach' },
    { text: 'Nach der Pigmentierung schaue ich wieder gern in den Spiegel. Danke, Olga!', name: 'Thomas R.', ort: 'Nümbrecht' },
    { text: 'Der Massagesessel ist der beste Kurzurlaub im Oberbergischen.', name: 'Petra S.', ort: 'Bielstein' },
  ],
  marquee: ['Schönheit', 'Gesundheit', 'Zeit für dich', 'Neu in Altklef'],
} as const;

export const cta = {
  eyebrow: 'Dein Termin',
  headline: 'Dein Termin in deinem Reich.',
  text: 'Schreib mir — ich antworte persönlich. Die Beratung ist kostenlos, dein Termin bequem geplant.',
  whatsappLabel: 'Per WhatsApp schreiben',
  instagramLabel: 'Auf Instagram folgen',
  telefonLabel: 'Oder ruf an',
  oeffnungszeiten: 'Termine nach Vereinbarung',
  kartenHinweis: 'Route in Karten öffnen',
} as const;

export const footer = {
  megaClaim: 'Dein Reich.',
  beschreibung: 'PermanentReich — Beauty & Wellness bei Olga Reich. Permanent Make-up, Kopfhautpigmentierung und Permanent Wellness in Wiehl-Altklef.',
  links: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
  superbrand: {
    prefix: 'Made with ❤️ by',
    label: 'SUPERBRAND.marketing',
    href: 'https://superbrand.marketing',
    suffix: '– Dein Superheld für deine Werbung.',
  },
} as const;

export const nav = {
  items: [
    { label: 'Leistungen', href: '#leistungen' },
    { label: 'Permanent Make-up', href: '#pmu' },
    { label: 'Kopfhaut', href: '#smp' },
    { label: 'Wellness', href: '#wellness' },
    { label: 'Über Olga', href: '#olga' },
  ],
  cta: 'Termin',
} as const;

export const preloader = {
  wort: 'PermanentReich',
} as const;

export const meta = {
  title: 'PermanentReich — Dein Reich für Schönheit & Gesundheit | Wiehl',
  description:
    'Permanent Make-up (Powderbrows, Lippen, Wimpernkranz), Kopfhautpigmentierung für Sie & Ihn und Luxus-Massagesessel in privater Atmosphäre. Neu in Wiehl-Altklef. Kostenlose Beratung.',
} as const;
