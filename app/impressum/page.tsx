import type { Metadata } from 'next';
import Link from 'next/link';
import { kontakt } from '@/content/copy.de';

export const metadata: Metadata = {
  title: 'Impressum — PermanentReich',
  description:
    'Impressum von PermanentReich, Inhaberin Olga Reich, Altklef 4, 51674 Wiehl.',
};

function Platzhalter({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 border-l-2 border-gold pl-4 text-[17px] leading-relaxed text-gold-deep">
      {children}
    </p>
  );
}

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 md:px-10">
        <Link
          href="/"
          className="link-line inline-block text-[17px] text-umber-soft"
        >
          ← Zurück zu deinem Reich
        </Link>

        <h1 className="font-display mt-10 text-4xl text-umber">Impressum</h1>

        <h2 className="font-display mb-3 mt-10 text-xl text-umber">
          Angaben gemäß § 5 DDG
        </h2>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          {kontakt.name}
          <br />
          Inhaberin: {kontakt.inhaberin}
          <br />
          {kontakt.strasse}
          <br />
          {kontakt.ort}
        </p>

        <h2 className="font-display mb-3 mt-10 text-xl text-umber">Kontakt</h2>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Telefon:{' '}
          <a href={kontakt.telefonLink} className="link-line text-umber">
            {kontakt.telefon}
          </a>
          <br />
          Instagram:{' '}
          <a
            href={kontakt.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line text-umber"
          >
            {kontakt.instagramHandle}
          </a>
        </p>
        <Platzhalter>[NOCH ERGÄNZEN: E-Mail-Adresse]</Platzhalter>

        <h2 className="font-display mb-3 mt-10 text-xl text-umber">
          Umsatzsteuer
        </h2>
        <Platzhalter>
          [NOCH ERGÄNZEN: USt-IdNr. oder Hinweis Kleinunternehmerregelung § 19
          UStG]
        </Platzhalter>

        <h2 className="font-display mb-3 mt-10 text-xl text-umber">
          Verantwortliche i.&nbsp;S.&nbsp;d. § 18 Abs. 2 MStV
        </h2>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          {kontakt.inhaberin}
          <br />
          {kontakt.strasse}
          <br />
          {kontakt.ort}
        </p>

        <h2 className="font-display mb-3 mt-10 text-xl text-umber">
          EU-Streitschlichtung
        </h2>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-line text-umber"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Unsere Kontaktdaten findest du oben in diesem Impressum.
        </p>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Wir sind nicht verpflichtet und nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </div>
    </main>
  );
}
