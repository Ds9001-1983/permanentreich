import type { Metadata } from 'next';
import Link from 'next/link';
import { kontakt } from '@/content/copy.de';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Datenschutz — PermanentReich',
  description:
    'Datenschutzerklärung von PermanentReich, Olga Reich, Wiehl-Altklef — Informationen nach DSGVO.',
};

const betroffenenrechte = [
  'Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)',
  'Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
  'Löschung deiner Daten (Art. 17 DSGVO)',
  'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
  'Datenübertragbarkeit (Art. 20 DSGVO)',
  'Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)',
];

export default function DatenschutzPage() {
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

        <h1 className="font-display mt-10 text-4xl text-umber">
          Datenschutzerklärung
        </h1>

        <p className="mb-4 mt-6 text-[17px] leading-relaxed text-umber-soft">
          Deine Daten sind bei uns gut aufgehoben. Diese Erklärung informiert
          dich darüber, welche personenbezogenen Daten beim Besuch dieser
          Website verarbeitet werden — und welche Rechte du hast.
        </p>

        <h2 className="font-display mb-3 mt-10 text-xl text-umber">
          Verantwortliche
        </h2>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Verantwortliche im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          {kontakt.inhaberin}
          <br />
          {kontakt.name}
          <br />
          {kontakt.strasse}
          <br />
          {kontakt.ort}
          <br />
          Telefon:{' '}
          <a href={kontakt.telefonLink} className="link-line text-umber">
            {kontakt.telefon}
          </a>
          <br />
          E-Mail:{' '}
          <a href={kontakt.emailLink} className="link-line text-umber">
            {kontakt.email}
          </a>
        </p>

        <h2 className="font-display mb-3 mt-10 text-xl text-umber">Hosting</h2>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Diese Website wird bei Vercel gehostet. Anbieter ist die Vercel
          Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Die
          personenbezogenen Daten, die beim Besuch dieser Website erfasst
          werden (z.&nbsp;B. IP-Adressen in Server-Logfiles), werden auf der
          Infrastruktur von Vercel verarbeitet — dabei kann eine Übermittlung
          in die USA stattfinden.
        </p>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Mit Vercel besteht ein Vertrag über Auftragsverarbeitung nach
          Art.&nbsp;28 DSGVO (Vercel Data Processing Addendum). Die
          Übermittlung in die USA stützt sich auf die Zertifizierung von
          Vercel unter dem EU-US Data Privacy Framework sowie auf
          EU-Standardvertragsklauseln. Rechtsgrundlage der Verarbeitung ist
          Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO — unser berechtigtes
          Interesse an einer sicheren und schnellen Bereitstellung der
          Website.
        </p>

        <h2 className="font-display mb-3 mt-10 text-xl text-umber">
          Server-Logfiles
        </h2>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Beim Aufruf dieser Website erhebt der Hoster automatisch
          Informationen in sogenannten Server-Logfiles, die dein Browser
          übermittelt: IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene
          Seite, verwendeter Browser und Betriebssystem sowie die zuvor
          besuchte Seite (Referrer). Diese Daten werden nicht mit anderen
          Datenquellen zusammengeführt.
        </p>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
          DSGVO. Unser berechtigtes Interesse liegt in der technisch
          fehlerfreien Darstellung und der Sicherheit der Website. Die
          Logfiles werden nach kurzer Zeit automatisch gelöscht.
        </p>

        <h2 className="font-display mb-3 mt-10 text-xl text-umber">
          Schriftarten (lokal gehostet)
        </h2>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Diese Website nutzt Schriftarten, die lokal auf unserem Server
          eingebunden sind. Beim Aufruf der Seite wird keine Verbindung zu
          Servern von Google oder anderen Drittanbietern aufgebaut — es werden
          also keine Daten an Google übertragen.
        </p>

        <h2 className="font-display mb-3 mt-10 text-xl text-umber">
          Keine Cookies, kein Tracking
        </h2>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Diese Website setzt keine Cookies und verwendet keine Analyse- oder
          Tracking-Dienste. Dein Besuch wird nicht ausgewertet — deshalb
          brauchst du hier auch kein Cookie-Banner wegzuklicken.
        </p>

        <h2 className="font-display mb-3 mt-10 text-xl text-umber">
          Kontakt per WhatsApp
        </h2>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Auf dieser Website findest du Links, über die du uns per WhatsApp
          kontaktieren kannst. Erst wenn du auf einen solchen Link klickst,
          wird eine Verbindung zu WhatsApp (Meta Platforms Ireland Ltd.)
          hergestellt — dabei können personenbezogene Daten (z.&nbsp;B. deine
          IP-Adresse und Telefonnummer) an Meta übertragen werden, unter
          Umständen auch an Server in den USA. Auf diese Verarbeitung haben
          wir keinen Einfluss; es gelten die Datenschutzhinweise von WhatsApp.
        </p>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Rechtsgrundlage ist deine Einwilligung durch die aktive Nutzung des
          Links (Art. 6 Abs. 1 lit. a DSGVO) sowie — soweit deine Anfrage der
          Anbahnung oder Durchführung eines Vertrags dient — Art. 6 Abs. 1
          lit. b DSGVO. Die Inhalte deiner Nachrichten nutzen wir
          ausschließlich zur Bearbeitung deiner Anfrage und Terminplanung.
        </p>

        <h2 className="font-display mb-3 mt-10 text-xl text-umber">
          Verlinkung zu Instagram
        </h2>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Diese Website enthält einen einfachen Link zu unserem
          Instagram-Profil ({kontakt.instagramHandle}). Es handelt sich nicht
          um ein eingebundenes Plugin — beim bloßen Besuch dieser Website
          werden keine Daten an Instagram übertragen. Erst wenn du dem Link
          folgst, verarbeitet Instagram (Meta Platforms Ireland Ltd.) deine
          Daten nach den dort geltenden Datenschutzbestimmungen.
        </p>

        <h2 className="font-display mb-3 mt-10 text-xl text-umber">
          Deine Rechte
        </h2>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Dir stehen als betroffene Person folgende Rechte zu:
        </p>
        <ul className="mb-4 list-disc pl-5 text-[17px] leading-relaxed text-umber-soft marker:text-gold">
          {betroffenenrechte.map((recht) => (
            <li key={recht} className="mb-1">
              {recht}
            </li>
          ))}
        </ul>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die
          Zukunft widerrufen. Wende dich dafür einfach an die oben genannten
          Kontaktdaten.
        </p>
        <p className="mb-4 text-[17px] leading-relaxed text-umber-soft">
          Außerdem hast du das Recht, dich bei einer
          Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).
          Zuständig für uns ist die Landesbeauftragte für Datenschutz und
          Informationsfreiheit Nordrhein-Westfalen (LDI NRW),
          Kavalleriestraße 2–4, 40213 Düsseldorf,{' '}
          <a
            href="https://www.ldi.nrw.de"
            target="_blank"
            rel="noopener noreferrer"
            className="link-line text-umber"
          >
            www.ldi.nrw.de
          </a>
          .
        </p>
      </div>
      <Footer />
    </main>
  );
}
