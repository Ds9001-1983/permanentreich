import Image from 'next/image';
import { CalendarHeart, MessageCircle } from 'lucide-react';
import { Magnetic } from '@/components/ui/magnetic';
import { SectionHeading } from '@/components/ui/section-heading';
import { Sparkles } from '@/components/ui/sparkles';
import { LazySilk } from '@/components/gl/lazy';
import { cta, kontakt } from '@/content/copy.de';
import { media } from '@/lib/media';

/**
 * Sektion #10 — Termin-CTA: Split 50/50 auf Champagne, Button-Stack mit
 * Magnetic-CTAs (SM-05), Silk-Shader-Hintergrund. Primärer Weg ist die
 * Online-Buchung (Studiobookr), WhatsApp bleibt der persönliche Draht.
 * Verspielt-Paket: Lounge-Foto im Rundbogen, Script-Einwurf, Sparkles.
 */
export function BookingCta() {
  return (
    <section id="termin" className="relative bg-champagne py-[clamp(80px,10vw,160px)]">
      {/* Silk-Shader als lebendiger Sektions-Hintergrund — 0.65 lässt genug
          Champagne durchscheinen (Stil-Gesetz: Sektion bleibt Champagne) */}
      <LazySilk intensity={0.65} />
      <Sparkles />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Links — Einladung + echtes Lounge-Foto im Rundbogen */}
          <div>
            <SectionHeading eyebrow={cta.eyebrow} headline={cta.headline} size="xl" />
            <p className="mt-8 max-w-[42ch] text-umber/80">{cta.text}</p>

            <div className="relative mx-auto mt-12 hidden aspect-[3/4] w-full max-w-xs overflow-hidden rounded-t-full lg:block">
              <Image
                src={media.cta.lounge}
                alt={cta.loungeAlt}
                fill
                sizes="(min-width: 1024px) 20rem, 1px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Rechts — Button-Stack */}
          <div className="self-center">
            {/* Olgas persönlicher Gruß über dem Stack — echter Inhalt, kein Deko */}
            <p className="font-script mb-6 block w-fit text-[clamp(1.8rem,3vw,2.4rem)] text-gold-deep [--schweb-rot:-2deg] motion-safe:animate-[schweben_5.5s_ease-in-out_infinite_alternate] motion-reduce:-rotate-2">
              {cta.script}
            </p>

            <Magnetic>
              <a
                href={kontakt.booking}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Buchen"
                className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-umber text-lg font-semibold text-light transition-colors duration-300 hover:bg-gold"
              >
                <CalendarHeart aria-hidden className="h-5 w-5" />
                {cta.bookingLabel}
              </a>
            </Magnetic>

            <Magnetic strength={0.25} className="mt-4">
              <a
                href={kontakt.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Schreiben"
                className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-umber text-umber transition-colors duration-300 hover:bg-umber hover:text-light"
              >
                <MessageCircle aria-hidden className="h-5 w-5" />
                {cta.whatsappLabel}
              </a>
            </Magnetic>

            <p className="mt-8 text-center text-umber/80">
              {cta.telefonLabel}{' '}
              <a href={kontakt.telefonLink} className="link-line inline-flex min-h-11 items-center font-semibold text-umber">
                {kontakt.telefon}
              </a>
              <span aria-hidden className="mx-3 text-gold">
                ·
              </span>
              <a
                href={kontakt.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line inline-flex min-h-11 items-center font-semibold text-umber"
              >
                {kontakt.instagramHandle}
              </a>
            </p>

            {/* Info-Zeile: Adresse · Öffnungszeiten · Karten-Link */}
            <p className="mt-10 border-t border-light pt-8 text-center text-umber/80">
              {kontakt.strasse}, {kontakt.ort}
              <span aria-hidden className="mx-3 text-gold">
                ·
              </span>
              {cta.oeffnungszeiten}
              <span aria-hidden className="mx-3 text-gold">
                ·
              </span>
              <a
                href={kontakt.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line inline-flex min-h-11 items-center text-umber"
              >
                {cta.kartenHinweis}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
