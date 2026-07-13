/**
 * Verspielt-Paket — schwebende Gold-Funken (✦/✧) als Sektions-Overlay.
 * Rein dekorativ, pointer-events-none; die Funkel-Animation läuft in CSS
 * (Keyframes `funkeln`) und wird von der globalen reduced-motion-Regel
 * automatisch stillgelegt.
 */
const FUNKEN = [
  { top: '14%', left: '7%', size: '1.1rem', dauer: '5.2s', delay: '0s', zeichen: '✦' },
  { top: '26%', left: '88%', size: '0.8rem', dauer: '6.4s', delay: '1.2s', zeichen: '✧' },
  { top: '58%', left: '4%', size: '0.7rem', dauer: '7.1s', delay: '2.1s', zeichen: '✧' },
  { top: '72%', left: '92%', size: '1rem', dauer: '5.8s', delay: '0.7s', zeichen: '✦' },
  { top: '88%', left: '16%', size: '0.85rem', dauer: '6.8s', delay: '3s', zeichen: '✦' },
] as const;

export function Sparkles({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
    >
      {FUNKEN.map((f, i) => (
        <span
          key={i}
          className="absolute text-gold"
          style={{
            top: f.top,
            left: f.left,
            fontSize: f.size,
            opacity: 0.12,
            animation: `funkeln ${f.dauer} ease-in-out ${f.delay} infinite`,
          }}
        >
          {f.zeichen}
        </span>
      ))}
    </div>
  );
}
