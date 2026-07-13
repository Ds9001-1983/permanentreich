'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { hero, kontakt } from '@/content/copy.de';
import { media, VIDEOS_READY } from '@/lib/media';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { SplitReveal } from '@/components/ui/split-reveal';
import { Magnetic } from '@/components/ui/magnetic';
import { LazySilk } from '@/components/gl/lazy';

/**
 * Sektion #1 — Hero `#start` (Raster: Full-bleed 100svh, kein Sektions-Padding).
 * Video-BG (Poster-Fallback solange VIDEOS_READY false), Script-Badge,
 * 3-zeilige Mega-Headline mit gestaffeltem SplitReveal, WhatsApp-CTA, Scroll-Hint.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const strichRef = useRef<HTMLSpanElement>(null);
  // null = SSR/vor Mount (Poster via CSS-Breakpoint), danach passendes Video
  const [vertical, setVertical] = useState<boolean | null>(null);

  useEffect(() => {
    setVertical(window.matchMedia('(max-width: 767px)').matches);
  }, []);

  // Italic-Akzent: letztes Wort der zweiten Headline-Zeile in Fraunces Italic.
  const zeile2Woerter = hero.headline[1].split(' ');
  const akzent = zeile2Woerter[zeile2Woerter.length - 1];
  const zeile2Auftakt = zeile2Woerter.slice(0, -1).join(' ');

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const fades = root.querySelectorAll<HTMLElement>('[data-hero-fade]');

      if (prefersReducedMotion()) {
        gsap.set(fades, { opacity: 1 });
        videoRef.current?.pause();
        return;
      }

      gsap.fromTo(
        fades,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.14,
          delay: 0.85,
        },
      );

      // Scroll-Hint: 1px-Gold-Strich zeichnet sich von oben, löst sich nach unten.
      if (strichRef.current) {
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.35, delay: 1.6 })
          .fromTo(
            strichRef.current,
            { scaleY: 0, transformOrigin: 'top center' },
            { scaleY: 1, duration: 0.9, ease: 'power2.inOut' },
          )
          .to(
            strichRef.current,
            { scaleY: 0, transformOrigin: 'bottom center', duration: 0.9, ease: 'power2.inOut' },
            '+=0.15',
          );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="start" ref={rootRef} className="relative min-h-[100svh] overflow-hidden">
      {/* Hintergrund-Ebene: Poster (LCP, je Viewport) + Video nach Mount */}
      <div className="absolute inset-0">
        <Image
          src={media.hero.posterDesktop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover md:block"
        />
        <Image
          src={media.hero.posterMobile}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover md:hidden"
        />
        {VIDEOS_READY && vertical !== null && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={vertical ? media.hero.posterMobile : media.hero.posterDesktop}
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          >
            {!vertical && <source src={media.hero.videoDesktopWebm} type="video/webm" />}
            <source
              src={vertical ? media.hero.videoMobileMp4 : media.hero.videoDesktopMp4}
              type="video/mp4"
            />
          </video>
        )}
      </div>

      {/* Sanfter Lesbarkeits-Verlauf von unten — kein Blur-Kasten */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-ivory/70 via-ivory/20 to-transparent"
      />

      {/* WebGL-Silk-Shader als Soft-Light-Overlay über dem Video */}
      <LazySilk intensity={0.5} blend="soft-light" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-center px-6 md:px-10 lg:px-16">
        <SplitReveal
          as="p"
          immediate
          delay={0.2}
          className="font-script -rotate-3 text-[clamp(1.8rem,4vw,3rem)] text-gold"
        >
          {hero.badge}
        </SplitReveal>

        <h1 className="font-display mt-4 text-[clamp(3.2rem,10vw,9.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-umber">
          <SplitReveal as="span" className="block" immediate delay={0.2}>
            {hero.headline[0]}
          </SplitReveal>
          <span className="block">
            {zeile2Auftakt && (
              <SplitReveal as="span" immediate delay={0.35}>
                {zeile2Auftakt}
              </SplitReveal>
            )}{' '}
            <SplitReveal
              as="em"
              className="italic"
              immediate
              delay={0.35 + zeile2Woerter.length * 0.055 - 0.055}
            >
              {akzent}
            </SplitReveal>
          </span>
          <SplitReveal as="span" className="block" immediate delay={0.5}>
            {hero.headline[2]}
          </SplitReveal>
        </h1>

        <p
          data-hero-fade
          className="mt-8 max-w-xl text-[clamp(1.0625rem,1.4vw,1.1875rem)] leading-relaxed text-umber opacity-0"
        >
          {hero.sub}
        </p>

        <div data-hero-fade className="mt-10 opacity-0">
          <Magnetic className="inline-block">
            <a
              href={kontakt.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Buchen"
              className="inline-flex h-14 items-center rounded-full bg-umber px-10 text-light transition-colors duration-300 hover:bg-gold"
            >
              {hero.cta}
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Scroll-Hint unten mittig */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <div data-hero-fade className="flex flex-col items-center gap-3 opacity-0">
          <span className="text-xs uppercase tracking-[0.25em] text-umber-soft">
            {hero.scrollHint}
          </span>
          <span ref={strichRef} aria-hidden className="block h-12 w-px bg-gold" />
        </div>
      </div>
    </section>
  );
}
