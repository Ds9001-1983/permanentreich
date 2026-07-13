'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * SM-10 Hover-Video-Tile: Poster-Bild, bei Hover läuft stumm der Video-Loop.
 * Auf Touch-Geräten: Video startet, sobald die Kachel im Viewport ist.
 * Die Einblendung hängt am Play-Zustand (nicht an :hover) — sonst bleibt
 * das Video auf Touch-Geräten unsichtbar hinter dem Poster.
 * Ohne videoSrc: eleganter Ken-Burns-Zoom auf dem Poster.
 */
export function VideoTile({
  poster,
  videoSrc,
  alt,
  aspect = 'aspect-[4/5]',
  className = '',
  sizes = '(max-width: 768px) 100vw, 33vw',
}: {
  poster: string;
  videoSrc?: string;
  alt: string;
  aspect?: string;
  className?: string;
  sizes?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [spielt, setSpielt] = useState(false);

  useEffect(() => {
    const v = video.current;
    const el = root.current;
    if (!v || !el) return;

    const play = () => {
      v.play()
        .then(() => setSpielt(true))
        .catch(() => {});
    };
    const pause = () => {
      v.pause();
      v.currentTime = 0;
      setSpielt(false);
    };

    if (window.matchMedia('(pointer: fine)').matches) {
      el.addEventListener('mouseenter', play);
      el.addEventListener('mouseleave', pause);
      return () => {
        el.removeEventListener('mouseenter', play);
        el.removeEventListener('mouseleave', pause);
      };
    }

    // Touch: früh anspielen (rootMargin lädt vor, niedrige Schwelle),
    // damit der Loop schon läuft, wenn die Kachel im Blick ist.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : pause()),
      { threshold: 0.2, rootMargin: '15% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [videoSrc]);

  return (
    <div ref={root} className={`group relative ${aspect} w-full overflow-hidden ${className}`}>
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover transition-all duration-[1.2s] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] ${
          spielt && videoSrc ? 'opacity-0' : ''
        }`}
      />
      {videoSrc && (
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            spielt ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
