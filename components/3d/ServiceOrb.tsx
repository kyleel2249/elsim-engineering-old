'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function Orb({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * (hovered ? 0.9 : 0.25);
    ref.current.rotation.y += delta * (hovered ? 1.1 : 0.3);
    const targetScale = hovered ? 1.12 : 1;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#101A2C"
        emissive={hovered ? '#22D3EE' : '#0FB8D6'}
        emissiveIntensity={hovered ? 1.4 : 0.7}
        roughness={0.35}
        metalness={0.5}
        wireframe={!hovered}
      />
    </mesh>
  );
}

/** Tiny always-on 3D marker for a service card; static dot if motion is reduced. */
export function ServiceOrb() {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className="h-10 w-10 rounded-full border border-cyan-500/60" aria-hidden />;
  }

  return (
    <div
      className="h-10 w-10"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      aria-hidden
    >
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 2.6], fov: 40 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[2, 2, 2]} intensity={12} color="#22D3EE" />
        <Orb hovered={hovered} />
      </Canvas>
    </div>
  );
}
