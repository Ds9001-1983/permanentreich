'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { footer, kontakt } from '@/content/copy.de';
import { media } from '@/lib/media';

/**
 * Sektion #11 — Footer: Full-bleed Umber-Block als dunkler Schlussakkord.
 * Mega-Claim in Pinyon-Script (Gold) steigt sanft auf, darunter Kontakt-Grid,
 * Rechtliches und der SUPERBRAND-Pflichtfooter.
 */
export function Footer() {
  const claimRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = claimRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 90 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-umber text-light">
      <div className="mx-auto max-w-[1440px] px-6 pt-[clamp(80px,10vw,160px)] pb-10 md:px-10 lg:px-16">
        {/* Mega-Claim */}
        <p
          ref={claimRef}
          className="font-script text-gold text-[clamp(4rem,14vw,12rem)] leading-[1.15] will-change-transform"
        >
          {footer.megaClaim}
        </p>

        {/* Kontakt-Grid */}
        <div className="mt-[clamp(48px,6vw,96px)] grid grid-cols-1 gap-12 border-t border-light/10 pt-[clamp(40px,5vw,72px)] md:grid-cols-3 md:gap-10">
          <address className="not-italic">
            {/* Original-Wortmarke (CI) — Grau/Gold funktioniert auch auf Umber */}
            <Image
              src={media.logoWortmarke}
              alt={kontakt.name}
              width={140}
              height={64}
              className="h-16 w-auto"
            />
            <a
              href={kontakt.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line mt-4 inline-flex min-h-11 items-center text-[17px] leading-relaxed text-light/80"
            >
              {kontakt.strasse}
              <br />
              {kontakt.ort}
            </a>
          </address>

          <div>
            <a
              href={kontakt.telefonLink}
              className="link-line font-display inline-flex min-h-11 items-center text-[clamp(1.375rem,2vw,1.75rem)] text-light"
            >
              {kontakt.telefon}
            </a>
          </div>

          <div>
            <a
              href={kontakt.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line font-display inline-flex min-h-11 items-center text-[clamp(1.375rem,2vw,1.75rem)] text-light"
            >
              {kontakt.instagramHandle}
            </a>
          </div>
        </div>

        {/* Beschreibung */}
        <p className="mt-12 max-w-[62ch] text-[15px] leading-relaxed text-light/60">
          {footer.beschreibung}
        </p>

        {/* Ornament-Trenner */}
        <div aria-hidden className="text-gold my-[clamp(40px,5vw,72px)] text-center text-xl">
          ✦
        </div>

        {/* Rechtliches + Pflicht-Branding */}
        <div className="flex flex-col gap-6 border-t border-light/10 pt-8 md:flex-row md:items-center md:justify-between">
          <nav className="flex gap-8">
            {footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-line inline-flex min-h-11 items-center text-[15px] text-light/70"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-sm opacity-70">
            {footer.superbrand.prefix}{' '}
            <a href={footer.superbrand.href} className="underline hover:text-[#6cbe45]">
              {footer.superbrand.label}
            </a>{' '}
            {footer.superbrand.suffix}
          </p>
        </div>
      </div>
    </footer>
  );
}
