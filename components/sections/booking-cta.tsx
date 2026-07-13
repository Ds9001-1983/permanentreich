import { MessageCircle } from 'lucide-react';
import { Magnetic } from '@/components/ui/magnetic';
import { SectionHeading } from '@/components/ui/section-heading';
import { cta, kontakt } from '@/content/copy.de';

/** Instagram-Glyph im Lucide-Strichstil (Brand-Icons sind aus lucide-react v1 entfernt). */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/**
 * Sektion #10 — Termin-CTA: Split 50/50 auf Champagne, Button-Stack mit
 * Magnetic-CTAs (SM-05), WebGL-Slot für den Silk-Shader (Phase 6).
 * Raster-Spec: komponenten-raster.md #10.
 */
export function BookingCta() {
  return (
    <section id="termin" className="relative bg-champagne py-[clamp(80px,10vw,160px)]">
      {/* WebGL-Slot: Silk-Shader als Sektions-Hintergrund (Phase 6) */}
      <div id="cta-gl" className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Links — Einladung */}
          <div>
            <SectionHeading eyebrow={cta.eyebrow} headline={cta.headline} size="xl" />
            <p className="mt-8 max-w-[42ch] text-umber-soft">{cta.text}</p>
          </div>

          {/* Rechts — Button-Stack */}
          <div className="self-center">
            <Magnetic>
              <a
                href={kontakt.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Buchen"
                className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-umber text-lg font-semibold text-light transition-colors duration-300 hover:bg-gold"
              >
                <MessageCircle aria-hidden className="h-5 w-5" />
                {cta.whatsappLabel}
              </a>
            </Magnetic>

            <Magnetic strength={0.25} className="mt-4">
              <a
                href={kontakt.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Buchen"
                className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-umber text-umber transition-colors duration-300 hover:bg-umber hover:text-light"
              >
                <InstagramIcon className="h-5 w-5" />
                {cta.instagramLabel}
              </a>
            </Magnetic>

            <p className="mt-8 text-center text-umber-soft">
              {cta.telefonLabel}{' '}
              <a href={kontakt.telefonLink} className="link-line font-semibold text-umber">
                {kontakt.telefon}
              </a>
            </p>

            {/* Info-Zeile: Adresse · Öffnungszeiten · Karten-Link */}
            <p className="mt-10 border-t border-light pt-8 text-center text-umber-soft">
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
                className="link-line text-umber"
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
