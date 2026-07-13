'use client';

/**
 * SM-07 Marquee Infinite Strip: horizontal endlos, pausiert bei Hover.
 * Inhalt wird intern dupliziert (aria-hidden), Animation reine CSS.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = '',
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      data-cursor="Halten"
      className={`group/marquee flex w-full overflow-hidden ${className}`}
      style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex w-max shrink-0 animate-marquee items-center group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none"
          style={{
            animationDuration: `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
