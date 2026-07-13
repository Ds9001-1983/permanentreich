'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useWebglCapable, useInView } from './use-webgl-capable';
import { GlErrorBoundary } from './gl-guard';

/**
 * SM-09 „Liquid Gold Silk" — domain-warped FBM in der Marken-Farb-Ramp
 * (#faf6ee → #f5f0e8 → #e8dcc8 → #bf885a, Gold nur in den „Faltentälern").
 * Sehr langsame Zeitbasis, Maus-Uniform gelerpt: Seide reagiert wie auf
 * einen Luftzug. Läuft als Hero-Overlay (soft-light) und CTA-Hintergrund.
 */

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntensity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p = p * 2.05 + vec2(13.7, 7.3);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.05;

    // Domain-Warp: zwei ineinander geschobene FBM-Felder = fließende Seide
    vec2 q = vec2(
      fbm(uv * 2.2 + vec2(t, -t * 0.6)),
      fbm(uv * 2.2 + vec2(-t * 0.4, t))
    );
    vec2 warp = uv + 0.35 * q + 0.08 * (uMouse - 0.5);
    float silk = fbm(warp * 2.6 - vec2(t * 0.5, 0.0));

    // Marken-Ramp: light → ivory → champagne → gold (Gold nur in Tälern)
    vec3 cLight     = vec3(0.980, 0.965, 0.933); // #faf6ee
    vec3 cIvory     = vec3(0.961, 0.941, 0.910); // #f5f0e8
    vec3 cChampagne = vec3(0.910, 0.863, 0.784); // #e8dcc8
    vec3 cGold      = vec3(0.749, 0.533, 0.353); // #bf885a

    vec3 col = mix(cLight, cIvory, smoothstep(0.25, 0.55, silk));
    col = mix(col, cChampagne, smoothstep(0.55, 0.78, silk));
    col = mix(col, cGold, smoothstep(0.82, 0.98, silk) * 0.55);

    // Feiner Film-Grain
    float grain = (hash(uv * vec2(1920.0, 1080.0) + fract(uTime)) - 0.5) * 0.035;
    col += grain;

    gl_FragColor = vec4(col, uIntensity);
  }
`;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

function SilkPlane({ intensity }: { intensity: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uIntensity: { value: intensity },
    }),
    [intensity],
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    // Maus sanft nachziehen (Luftzug, kein Wobble)
    uniforms.uMouse.value.lerp(mouse.current, 0.06);
  });

  // Maus global lesen — Canvas ist pointer-events-none
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function SilkCanvas({
  intensity = 1,
  className = '',
  blend = 'normal',
}: {
  /** 0..1 — Alpha des Shaders (Hero-Overlay nutzt ~0.5) */
  intensity?: number;
  className?: string;
  blend?: 'normal' | 'soft-light';
}) {
  const capable = useWebglCapable();
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, capable);
  // Safari: verlorener WebGL-Kontext → Canvas dauerhaft abbauen statt
  // pro Frame in Three.js-Fehler zu laufen (friert sonst Lenis/GSAP ein).
  const [lost, setLost] = useState(false);
  // Auf Phones kostet der Shader mehr als er zeigt (läuft dort nur unter
  // 65 % Champagne in der Termin-Sektion) — Ivory-Welt reicht als Fallback.
  const [phone, setPhone] = useState(false);

  useEffect(() => {
    setPhone(window.matchMedia('(max-width: 767px)').matches);
  }, []);

  if (!capable || lost || phone) return null;

  return (
    <div
      ref={wrap}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={blend === 'soft-light' ? { mixBlendMode: 'soft-light' } : undefined}
    >
      <GlErrorBoundary>
        <Canvas
          // DPR 1 reicht: FBM-Seide ist niederfrequent, Retina-Auflösung
          // kostet nur Fragment-Last (Jank bei Soft-Light-Blend in Safari)
          dpr={1}
          frameloop={inView ? 'always' : 'never'}
          gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
          camera={{ position: [0, 0, 1] }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              'webglcontextlost',
              () => setLost(true),
              { once: true },
            );
          }}
        >
          <SilkPlane intensity={intensity} />
        </Canvas>
      </GlErrorBoundary>
    </div>
  );
}
