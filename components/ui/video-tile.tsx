'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/**
 * SM-10 Hover-Video-Tile: Poster-Bild, bei Hover läuft stumm der Video-Loop.
 * Auf Touch-Geräten: Video startet, sobald die Kachel im Viewport ist.
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

  useEffect(() => {
    const v = video.current;
    const el = root.current;
    if (!v || !el) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const play = () => v.play().catch(() => {});
    const pause = () => {
      v.pause();
      v.currentTime = 0;
    };

    if (finePointer) {
      el.addEventListener('mouseenter', play);
      el.addEventListener('mouseleave', pause);
      return () => {
        el.removeEventListener('mouseenter', play);
        el.removeEventListener('mouseleave', pause);
      };
    }

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : pause()),
      { threshold: 0.5 },
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
        className={`object-cover transition-all duration-[1.2s] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] ${videoSrc ? 'group-hover:opacity-0' : ''}`}
      />
      {videoSrc && (
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
