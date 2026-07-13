'use client';

import { Component, type ReactNode } from 'react';

/**
 * Error-Boundary für WebGL-Canvases: Safari verliert unter Speicherdruck
 * gerne WebGL-Kontexte — Three.js wirft dann in Init/Render (z. B.
 * getShaderPrecisionFormat auf totem Kontext). Ohne Boundary reißt so ein
 * Fehler den React-Baum bzw. den Animations-Loop mit und die Seite friert
 * beim Scrollen ein. Mit Boundary verschwindet nur der Shader — die
 * CSS-Ivory-Welt bleibt stehen.
 */
export class GlErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
