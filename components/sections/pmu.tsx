'use client';

import { useEffect, useRef } from 'react';
import { BeforeAfterSlider } from '@/components/ui/before-after-slider';
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
              className="link-line mt-10 inline-block font-semibold text-gold-text"
            >
              {pmu.cta}
            </a>
          </div>

          {/* Rechts — Beweis: Vorher/Nachher-Slider, versetzt */}
          <div className="lg:col-span-5 lg:col-start-8 lg:mt-24">
            <BeforeAfterSlider
              vorher={media.results.pmu.vorher}
              nachher={media.results.pmu.nachher}
              vorherLabel={pmu.slider.vorher}
              nachherLabel={pmu.slider.nachher}
              alt="Powderbrows Ergebnis"
              aspect="aspect-[3/4]"
            />
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
