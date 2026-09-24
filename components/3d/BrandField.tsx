'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useWebGLSupport, useReducedMotion } from '@/hooks/useWebGLSupport';
import { detectQualityTier } from '@/lib/3d/quality';

/**
 * Viewport-gated wrapper around the SceneCanvas WebGL scene
 * (CircuitCore + EnergyParticles from HeroEnergyField.tsx).
 *
 * The scene itself was written for the hero but never mounted anywhere, leaving
 * three.js in the bundle doing nothing. It is reinstated here as a background
 * accent on the closing call to action rather than as the hero, because the
 * standing decision is that a CSS slideshow beats a WebGL hero for Cloudflare
 * Pages performance.
 *
 * Four gates before any three.js code is fetched:
 *   1. the element has scrolled near the viewport (IntersectionObserver)
 *   2. the browser actually has a WebGL context
 *   3. the visitor has not asked for reduced motion
 *   4. the device is not on the LOW quality tier (mobile, few cores, low memory)
 *
 * When any gate fails the component renders a static brand gradient instead, so
 * the section never looks broken — it just looks quieter.
 */
const EnergyScene = dynamic(
  () => import('@/components/3d/SceneCanvas').then((m) => m.SceneCanvas),
  { ssr: false, loading: () => <StaticField /> }
);

function StaticField() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy-400/30" />
    </div>
  );
}

export function BrandField({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [affordable, setAffordable] = useState(false);

  const webgl = useWebGLSupport();
  const reduced = useReducedMotion();

  useEffect(() => {
    setAffordable(detectQualityTier().tier !== 'LOW');
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const shouldRender = inView && webgl && !reduced && affordable;

  return (
    <div ref={containerRef} className={className} aria-hidden>
      {shouldRender ? <EnergyScene interactive={false} /> : <StaticField />}
    </div>
  );
}
