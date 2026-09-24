'use client';

import { Canvas } from '@react-three/fiber';
import { Component, ReactNode, Suspense } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { CircuitCore, EnergyParticles } from './HeroEnergyField';

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return <StaticBlueprint />;
    return this.props.children;
  }
}

/** Calm, no-motion composition shown when 3D can't or shouldn't run. */
function StaticBlueprint() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center bg-blueprint bg-grid opacity-90"
    >
      <svg width="220" height="220" viewBox="0 0 220 220" className="text-cyan-400/70">
        <polygon
          points="110,20 190,70 190,150 110,200 30,150 30,70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="110" cy="110" r="42" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function SceneCanvas({ interactive = true }: { interactive?: boolean }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <StaticBlueprint />;
  }

  return (
    <SceneErrorBoundary>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        className="!absolute inset-0"
      >
        <color attach="background" args={['#070B14']} />
        <fog attach="fog" args={['#070B14', 6, 11]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 3, 5]} intensity={40} color="#22D3EE" />
        <pointLight position={[-4, -2, -3]} intensity={20} color="#E08A3C" />
        <Suspense fallback={null}>
          <CircuitCore />
          <EnergyParticles intensity={interactive ? 1 : 0.3} />
        </Suspense>
      </Canvas>
    </SceneErrorBoundary>
  );
}
