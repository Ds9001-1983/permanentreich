'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ergebnisse, kontakt } from '@/content/copy.de';
import { ergebnisListe } from '@/lib/media';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { BeforeAfterSlider } from '@/components/ui/before-after-slider';
import { SectionHeading } from '@/components/ui/section-heading';
import { Flourish } from '@/components/ui/flourish';

/**
 * Sektion #ergebnisse — der gebündelte Beweis. Jede Karte zeigt genau so viel,
 * wie das Material hergibt: Drag-Slider bei deckungsgleichen Aufnahmen,
 * Diptychon wenn sie es nicht sind, Einzelbild wenn kein Vorher existiert.
 * Inhalt kommt aus `ergebnisListe` (lib/media.ts) — neue Fotos = ein Eintrag.
 */
export function Ergebnisse() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-ergebnis-item]', {
        opacity: 0,
        y: 32,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: '[data-ergebnis-grid]',
          start: 'top 82%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="ergebnisse" ref={root} className="bg-light py-[clamp(80px,10vw,160px)]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow={ergebnisse.eyebrow}
          script={ergebnisse.script}
          headline={ergebnisse.headline}
          align="center-mobile"
          scriptGap="mb-2 lg:-mb-[0.15em]"
          className="max-w-3xl"
        />

        <p className="mt-8 max-w-[54ch] text-umber-soft max-lg:mx-auto max-lg:text-center">
          {ergebnisse.text}
        </p>

        {/* Masonry über CSS-Spalten: die Belege haben sehr verschiedene
            Seitenverhältnisse (Hochformat, 16/9-Streifen, Diptychon) — ein
            Zeilenraster würde dazwischen Löcher reißen. */}
        <div
          data-ergebnis-grid
          className="mt-16 columns-1 lg:mt-24 lg:columns-2 lg:gap-x-12"
        >
          {ergebnisListe.map((eintrag) => (
            <article
              key={eintrag.id}
              data-ergebnis-item
              className="mb-16 break-inside-avoid lg:mb-24"
            >
              <div className="overflow-hidden rounded-2xl">
                {eintrag.modus === 'einzel' ? (
                  <figure className={`relative ${eintrag.aspect} w-full`}>
                    <Image
                      src={eintrag.bild}
                      alt={`${eintrag.kategorie} — ${eintrag.titel}`}
                      fill
                      sizes="(max-width: 1023px) 92vw, 44vw"
                      className="object-cover"
                    />
                    <figcaption className="absolute right-4 top-4 rounded-full bg-gold/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-light">
                      {ergebnisse.labelErgebnis}
                    </figcaption>
                  </figure>
                ) : eintrag.modus === 'diptychon' ? (
                  <div className="grid grid-cols-2 gap-1">
                    {(
                      [
                        { src: eintrag.vorher, label: ergebnisse.labelVorher, gold: false },
                        {
                          src: eintrag.nachher,
                          label: eintrag.nachherLabel ?? ergebnisse.labelNachher,
                          gold: true,
                        },
                      ] as const
                    ).map((bild) => (
                      <figure key={bild.label} className="relative">
                        <div className={`relative ${eintrag.aspect} w-full overflow-hidden`}>
                          <Image
                            src={bild.src}
                            alt={`${eintrag.titel} — ${bild.label}`}
                            fill
                            sizes="(max-width: 1023px) 46vw, 22vw"
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
                ) : (
                  <BeforeAfterSlider
                    vorher={eintrag.vorher}
                    nachher={eintrag.nachher}
                    vorherLabel={ergebnisse.labelVorher}
                    nachherLabel={eintrag.nachherLabel ?? ergebnisse.labelNachher}
                    alt={`${eintrag.kategorie} — ${eintrag.titel}`}
                    aspect={eintrag.aspect}
                  />
                )}
              </div>

              <p className="eyebrow mb-3 mt-7">{eintrag.kategorie}</p>
              <h3 className="font-display text-2xl text-umber">{eintrag.titel}</h3>
              <p className="mt-3 max-w-[44ch] text-umber-soft">{eintrag.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-[clamp(56px,7vw,96px)] max-w-[52ch] max-lg:mx-auto max-lg:text-center">
          <p className="text-sm leading-relaxed tracking-wide text-umber-soft">
            <span aria-hidden className="text-gold">
              ✦{' '}
            </span>
            {ergebnisse.hinweis}
          </p>
          <Flourish variant="bogen" className="mt-2 h-5 w-40 max-lg:mx-auto" />
          <a
            href={kontakt.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Buchen"
            className="link-line mt-6 inline-flex min-h-[56px] items-center gap-3 text-lg font-medium text-umber"
          >
            <span>{ergebnisse.cta}</span>
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
