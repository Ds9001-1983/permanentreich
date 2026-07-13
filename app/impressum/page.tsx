import type { Metadata } from 'next';
import Link from 'next/link';
import { kontakt } from '@/content/copy.de';
import { Footer } from '@/components/layout/footer';

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
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:px-10">
        <Link href="/" className="flex w-fit items-baseline gap-1.5 whitespace-nowrap">
          <span className="font-display text-[1.05rem] uppercase tracking-[0.18em] text-umber-soft">
            Permanent
          </span>
          <span className="font-script text-[1.7rem] leading-none text-gold">Reich</span>
        </Link>
        <Link
          href="/"
          className="link-line mt-8 inline-flex min-h-11 items-center text-[17px] text-umber-soft"
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
          Verbraucherstreitbeilegung (§ 36 VSBG)
        </h2>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Wir sind nicht verpflichtet und nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </div>
      <Footer />
    </main>
  );
}
