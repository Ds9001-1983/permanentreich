'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/section-heading';
import { kontakt, pmu } from '@/content/copy.de';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { media } from '@/lib/media';

/**
 * Sektion #4 — Permanent Make-up: Split 55/45, Editorial-Detail-Liste links,
 * Vorher/Nachher-Beweis rechts (versetzt). Raster-Spec: komponenten-raster.md #4.
 */
export function Pmu() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-pmu-item]', {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.16,
        scrollTrigger: {
          trigger: '[data-pmu-list]',
          start: 'top 82%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pmu" ref={root} className="bg-light py-[clamp(80px,10vw,160px)]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Links — Text & Editorial-Liste */}
          <div className="lg:col-span-6">
            <SectionHeading eyebrow={pmu.eyebrow} headline={pmu.headline} />

            <p className="mt-8 max-w-[52ch] text-umber-soft">{pmu.text}</p>

            <ul data-pmu-list className="mt-14 border-b border-champagne">
              {pmu.details.map((detail) => (
                <li key={detail.titel} data-pmu-item className="border-t border-champagne py-7">
                  <h3 className="font-display text-xl text-umber">{detail.titel}</h3>
                  <p className="mt-2 max-w-[48ch] text-umber-soft">{detail.text}</p>
                </li>
              ))}
            </ul>

            <a
              href={kontakt.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Buchen"
              className="link-line mt-10 inline-flex min-h-14 items-center text-lg font-semibold text-gold-text"
            >
              {pmu.cta}
            </a>
          </div>

          {/* Rechts — Beweis als Diptychon (die beiden Aufnahmen sind nicht
              deckungsgleich — nebeneinander ist der ehrliche Vergleich) */}
          <div className="lg:col-span-5 lg:col-start-8 lg:mt-24">
            <div className="grid grid-cols-2 gap-1">
              {(
                [
                  { src: media.results.pmu.vorher, label: pmu.slider.vorher, gold: false },
                  { src: media.results.pmu.nachher, label: pmu.slider.nachher, gold: true },
                ] as const
              ).map((bild) => (
                <figure key={bild.label} className="relative">
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={bild.src}
                      alt={`Powderbrows — ${bild.label}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-light ${
                      bild.gold ? 'bg-gold/90' : 'bg-umber/55 backdrop-blur-[2px]'
                    }`}
                  >
                    {bild.label}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-4 text-sm tracking-wide text-umber-soft">
              <span aria-hidden className="text-gold">
                ✦{' '}
              </span>
              {pmu.slider.hinweis}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
