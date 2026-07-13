'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { smp, kontakt } from '@/content/copy.de';
import { media } from '@/lib/media';
import { SectionHeading } from '@/components/ui/section-heading';
import { BeforeAfterSlider } from '@/components/ui/before-after-slider';

/** SSR-sicheres LayoutEffect (Crossfade soll vor dem Paint starten). */
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type Zielgruppe = 'sie' | 'ihn';

const inhalte = {
  sie: { text: smp.sie.text, bilder: media.results.smpFrau },
  ihn: { text: smp.ihn.text, bilder: media.results.smpMann },
} as const;

/**
 * Sektion #5 — SMP: Split gespiegelt (Slider links, Text rechts),
 * Segmented-Toggle „Für Sie / Für Ihn" mit sanftem GSAP-Crossfade.
 */
export function Smp() {
  const [modus, setModus] = useState<Zielgruppe>('sie');
  const textRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useIsoLayoutEffect(() => {
    // Erster Render: nichts animieren, Inhalt steht statisch.
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (prefersReducedMotion()) return;

    const targets = [textRef.current, sliderRef.current].filter(
      (el): el is HTMLDivElement => el !== null,
    );
    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.06,
        clearProps: 'opacity,transform',
      },
    );

    return () => {
      tween.kill();
    };
  }, [modus]);

  const aktiv = inhalte[modus];

  return (
    <section id="smp" className="bg-ivory py-[clamp(80px,10vw,160px)]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow={smp.eyebrow}
          headline={smp.headline}
          className="mb-[clamp(48px,6vw,96px)] max-w-5xl"
        />

        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          {/* Text rechts (Desktop) / oben (Mobile) */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <p className="max-w-[52ch] text-lg leading-relaxed text-umber-soft">{smp.text}</p>

            {/* Toggle „Für Sie / Für Ihn" als Segmented-Pill */}
            <div
              role="group"
              aria-label={`${smp.toggle.sie} / ${smp.toggle.ihn}`}
              className="mt-10 inline-flex overflow-hidden rounded-full border border-umber"
            >
              {(['sie', 'ihn'] as const).map((ziel) => (
                <button
                  key={ziel}
                  type="button"
                  aria-pressed={modus === ziel}
                  onClick={() => setModus(ziel)}
                  className={`min-h-[56px] px-8 text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                    modus === ziel
                      ? 'bg-umber text-light'
                      : 'bg-transparent text-umber hover:bg-umber/5'
                  }`}
                >
                  {smp.toggle[ziel]}
                </button>
              ))}
            </div>

            {/* Wechselnder Text je Zielgruppe */}
            <div ref={textRef} className="mt-8 border-t border-umber/15 pt-7">
              <p className="max-w-[52ch] text-lg leading-relaxed text-umber">{aktiv.text}</p>
            </div>

            <a
              href={kontakt.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Buchen"
              className="link-line mt-10 inline-flex min-h-[56px] items-center gap-3 text-lg font-medium text-umber"
            >
              <span>{smp.cta}</span>
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Vorher/Nachher-Slider links (Desktop) / unten (Mobile) */}
          <div ref={sliderRef} className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <BeforeAfterSlider
              key={modus}
              vorher={aktiv.bilder.vorher}
              nachher={aktiv.bilder.nachher}
              vorherLabel={smp.slider.vorher}
              nachherLabel={smp.slider.nachher}
              alt={`${smp.eyebrow} — ${smp.toggle[modus]}`}
              // Crops nativ: Frau ~2:1 (Collage-Streifen), Mann hochformat
              aspect={modus === 'sie' ? 'aspect-[16/9]' : 'aspect-[3/4]'}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
