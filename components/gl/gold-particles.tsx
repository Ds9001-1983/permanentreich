'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useWebglCapable, useInView } from './use-webgl-capable';
import { GlErrorBoundary } from './gl-guard';

/**
 * „Gold Dust" — Staub im Sonnenlicht um den Sessel (Wellness-Pin-Section).
 * Instanzierte Points, additiv, langsames Aufsteigen + Maus-Parallax.
 * Mobil halbierte Dichte; Render-Pause außerhalb des Viewports.
 */

/** Weicher runder Gold-Bokeh-Sprite (radialer Verlauf) statt hartem Quadrat. */
function makeDustSprite(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255, 235, 205, 1)');
  g.addColorStop(0.35, 'rgba(191, 136, 90, 0.55)');
  g.addColorStop(1, 'rgba(191, 136, 90, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function DustField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const sprite = useMemo(() => makeDustSprite(), []);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    // Deterministische Pseudozufallsfolge (kein Hydration-/Replay-Problem)
    let s = 42;
    const rnd = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rnd() - 0.5) * 2.4;
      positions[i * 3 + 1] = (rnd() - 0.5) * 2.4;
      positions[i * 3 + 2] = rnd() * -0.5;
      speeds[i] = 0.02 + rnd() * 0.05;
    }
    return { positions, speeds };
  }, [count]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.set(
        (e.clientX / window.innerWidth - 0.5) * 0.15,
        (0.5 - e.clientY / window.innerHeight) * 0.1,
      );
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state, delta) => {
    const geo = points.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + speeds[i] * delta;
      if (y > 1.25) y = -1.25;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    if (points.current) {
      points.current.position.x += (mouse.current.x - points.current.position.x) * 0.04;
      points.current.position.y += (mouse.current.y - points.current.position.y) * 0.04;
      points.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        alphaMap={sprite}
        color="#bf885a"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function GoldParticles({ className = '' }: { className?: string }) {
  const capable = useWebglCapable();
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, capable);
  // Safari: verlorener WebGL-Kontext → Canvas dauerhaft abbauen (s. SilkCanvas)
  const [lost, setLost] = useState(false);
  const count =
    typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : 600;

  if (!capable || lost) return null;

  return (
    <div ref={wrap} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <GlErrorBoundary>
        <Canvas
          dpr={[1, 1.5]}
          frameloop={inView ? 'always' : 'never'}
          gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
          camera={{ position: [0, 0, 1.6], fov: 60 }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              'webglcontextlost',
              () => setLost(true),
              { once: true },
            );
          }}
        >
          <DustField count={count} />
        </Canvas>
      </GlErrorBoundary>
    </div>
  );
}
