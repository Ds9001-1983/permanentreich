'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { wellness, kontakt } from '@/content/copy.de';
import { media } from '@/lib/media';
import { Magnetic } from '@/components/ui/magnetic';
import { SectionHeading } from '@/components/ui/section-heading';
import { LazyGoldParticles } from '@/components/gl/lazy';

/** Magnetic Pill-CTA (wie Hero) → direkt in die Online-Buchung (Studiobookr). */
function WellnessCta({ className = '' }: { className?: string }) {
  return (
    <Magnetic className={className}>
      <a
        href={kontakt.booking}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Buchen"
        className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-umber px-10 text-[1.0625rem] font-medium tracking-wide text-light transition-colors duration-500 hover:bg-gold-deep sm:w-auto"
      >
        {wellness.cta}
      </a>
    </Magnetic>
  );
}

/** Kapitel-Inhalt: riesige Gold-Ziffer hinter dem Titel, Titel + Text darüber. */
function Kapitel({ nr, titel, text }: { nr: string; titel: string; text: string }) {
  return (
    <div className="relative pt-[clamp(3rem,6vw,5rem)]">
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 select-none font-display text-[clamp(5rem,12vw,10rem)] leading-none text-gold/30"
      >
        {nr}
      </span>
      <h3 className="relative font-display text-[clamp(1.9rem,3.2vw,3.1rem)] text-umber">
        {titel}
      </h3>
      <p className="relative mt-5 max-w-[44ch] text-lg text-umber/80">{text}</p>
    </div>
  );
}

/**
 * Sektion #6 „Wellness" — SM-03 Pin-Story + SM-14 Kapitel-Zähler.
 * Desktop (lg, motion-safe): 300vh-Strecke, Sticky-Bühne, Kapitel per Scrub.
 * Mobile / reduced-motion: gestapelte Sektion mit einfachem Fade-in.
 */
export function WellnessPin() {
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const stackedRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bildRefs = useRef<(HTMLDivElement | null)[]>([]);
  const strokeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    /* Pin-Story nur auf lg-Desktop UND ohne Motion-Einschränkung */
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const wrap = pinWrapRef.current;
      const chapters = chapterRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!wrap || chapters.length === 0) return;

      /* Dezenter Schwebe-Loop des Sessels (±8px, yoyo) */
      if (floatRef.current) {
        gsap.fromTo(
          floatRef.current,
          { y: -8 },
          { y: 8, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 },
        );
      }

      const bilder = bildRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap.set(chapters.slice(1), { autoAlpha: 0, y: 60 });
      gsap.set(bilder.slice(1), { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            const idx = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length));
            strokeRefs.current.forEach((stroke, i) => {
              if (!stroke) return;
              stroke.classList.toggle('bg-gold', i === idx);
              stroke.classList.toggle('bg-umber/20', i !== idx);
            });
          },
        },
      });

      /* Kapitel i lebt im Progress-Fenster i/3 … (i+1)/3 */
      chapters.forEach((chapter, i) => {
        if (i > 0) {
          tl.fromTo(
            chapter,
            { autoAlpha: 0, y: 60 },
            { autoAlpha: 1, y: 0, duration: 0.3 },
            i,
          );
        }
        if (i < chapters.length - 1) {
          tl.to(chapter, { autoAlpha: 0, y: -60, duration: 0.3 }, i + 0.7);
        }
      });

      /* Raumfoto i crossfadet synchron zum Kapitelwechsel */
      bilder.forEach((bild, i) => {
        if (i > 0) {
          tl.fromTo(bild, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, i - 0.05);
        }
        if (i < bilder.length - 1) {
          tl.to(bild, { autoAlpha: 0, duration: 0.35 }, i + 0.75);
        }
      });
      /* Strecke bis Progress 1 auffüllen, damit Kapitel 03 seine volle Lesezeit bekommt */
      tl.set({}, {}, chapters.length);
    });

    /* Mobile/Tablet motion-safe: sanfter Fade-in der gestapelten Kapitel */
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const scope = stackedRef.current;
      if (!scope) return;
      const items = gsap.utils.toArray<HTMLElement>('[data-wellness-fade]', scope);
      items.forEach((item) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="wellness" className="relative overflow-clip bg-champagne">
      {/* ————— Desktop-Pin-Story (lg + motion-safe): 300vh Strecke, Sticky-Bühne ————— */}
      <div ref={pinWrapRef} className="relative hidden h-[300vh] lg:motion-safe:block">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          {/* Gold-Dust-Partikel IN der Sticky-Bühne (nicht auf der 300vh-Strecke) */}
          <LazyGoldParticles />
          {/* Sektionskopf oben absolut im Sticky-Bereich */}
          <div className="absolute inset-x-0 top-[clamp(2rem,6vh,4.5rem)]">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
              <SectionHeading
                eyebrow={wellness.eyebrow}
                script={wellness.script}
                headline={wellness.headline}
              />
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[1440px] items-center gap-[clamp(2.5rem,5vw,6rem)] px-6 pt-[clamp(4rem,10vh,7rem)] md:px-10 lg:px-16">
            {/* Echte Raumfotos im Rundbogen — schwebend, crossfaden je Kapitel */}
            <div className="w-[40%] shrink-0">
              <div
                ref={floatRef}
                className="relative mx-auto h-[min(62svh,38rem)] w-full max-w-[26rem] overflow-hidden rounded-t-full will-change-transform"
              >
                {media.wellness.raeume.map((src, i) => (
                  <div
                    key={src}
                    ref={(el) => {
                      bildRefs.current[i] = el;
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={src}
                      alt={wellness.bildAlts[i]}
                      fill
                      sizes="(min-width: 1024px) 26rem, 90vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Kapitel — übereinander, per Scrub durchgeblättert */}
            <div className="min-w-0 flex-1">
              <div className="relative h-[min(46svh,26rem)]">
                {wellness.kapitel.map((k, i) => (
                  <div
                    key={k.nr}
                    ref={(el) => {
                      chapterRefs.current[i] = el;
                    }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <Kapitel nr={k.nr} titel={k.titel} text={k.text} />
                  </div>
                ))}
              </div>

              {/* Fortschritt: drei feine Striche, aktiver in Gold */}
              <div aria-hidden className="mt-8 flex items-center gap-3">
                {wellness.kapitel.map((k, i) => (
                  <span
                    key={k.nr}
                    ref={(el) => {
                      strokeRefs.current[i] = el;
                    }}
                    className={`h-px w-12 transition-colors duration-500 ${
                      i === 0 ? 'bg-gold' : 'bg-umber/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CTA unten im Sticky-Bereich */}
          <div className="absolute inset-x-0 bottom-[clamp(1.75rem,5vh,3.5rem)] flex justify-center px-6">
            <WellnessCta />
          </div>
        </div>
      </div>

      {/* ————— Mobile / reduced-motion: normale gestapelte Sektion ————— */}
      <div ref={stackedRef} className="relative lg:motion-safe:hidden">
        <div className="mx-auto max-w-[1440px] px-6 py-[clamp(80px,10vw,160px)] md:px-10 lg:px-16">
          <SectionHeading
            eyebrow={wellness.eyebrow}
            script={wellness.script}
            headline={wellness.headline}
          />

          <div
            data-wellness-fade
            className="relative mx-auto mt-14 aspect-[3/4] w-full max-w-md overflow-hidden rounded-t-full"
          >
            <Image
              src={media.wellness.raeume[0]}
              alt={wellness.bildAlts[0]}
              fill
              sizes="(min-width: 768px) 28rem, 92vw"
              className="object-cover"
            />
          </div>

          <div className="mt-16 flex flex-col gap-[clamp(3.5rem,10vw,5rem)]">
            {wellness.kapitel.map((k) => (
              <div key={k.nr} data-wellness-fade>
                <Kapitel nr={k.nr} titel={k.titel} text={k.text} />
              </div>
            ))}
          </div>

          <div data-wellness-fade className="mt-16 flex justify-center sm:justify-start">
            <WellnessCta className="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
