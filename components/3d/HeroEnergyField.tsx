'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { usePointer } from '@/hooks/usePointer';

const PARTICLE_COUNT = 220;
const LINK_DISTANCE = 1.35;
const FIELD_RADIUS = 4.2;

export function EnergyParticles({ intensity = 1 }: { intensity?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointer = usePointer();

  const { positions, velocities, phases } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = FIELD_RADIUS * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.6;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, velocities, phases };
  }, []);

  const maxSegments = 400;
  const linePositions = useMemo(() => new Float32Array(maxSegments * 2 * 3), []);

  useFrame((state, delta) => {
    const geometry = pointsRef.current?.geometry;
    const lineGeometry = linesRef.current?.geometry;
    if (!geometry) return;

    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      arr[ix] += velocities[ix] * delta * 12;
      arr[ix + 1] += velocities[ix + 1] * delta * 12 + Math.sin(t * 0.4 + phases[i]) * 0.0009;
      arr[ix + 2] += velocities[ix + 2] * delta * 12;

      const dist = Math.hypot(arr[ix], arr[ix + 1], arr[ix + 2]);
      if (dist > FIELD_RADIUS) {
        arr[ix] *= 0.97;
        arr[ix + 1] *= 0.97;
        arr[ix + 2] *= 0.97;
      }
    }
    posAttr.needsUpdate = true;

    if (pointsRef.current) {
      const targetY = (pointer as { x: number; y: number }).x * 0.35 * intensity;
      const targetX = -(pointer as { x: number; y: number }).y * 0.2 * intensity;
      pointsRef.current.rotation.y += (targetY - pointsRef.current.rotation.y) * 0.04;
      pointsRef.current.rotation.x += (targetX - pointsRef.current.rotation.x) * 0.04;
      if (linesRef.current) {
        linesRef.current.rotation.copy(pointsRef.current.rotation);
      }
    }

    if (lineGeometry) {
      let segCount = 0;
      const step = 2;
      for (let i = 0; i < PARTICLE_COUNT && segCount < maxSegments; i += step) {
        for (let j = i + 1; j < PARTICLE_COUNT && segCount < maxSegments; j += step) {
          const ix = i * 3;
          const jx = j * 3;
          const dx = arr[ix] - arr[jx];
          const dy = arr[ix + 1] - arr[jx + 1];
          const dz = arr[ix + 2] - arr[jx + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < LINK_DISTANCE * LINK_DISTANCE) {
            const base = segCount * 6;
            linePositions[base] = arr[ix];
            linePositions[base + 1] = arr[ix + 1];
            linePositions[base + 2] = arr[ix + 2];
            linePositions[base + 3] = arr[jx];
            linePositions[base + 4] = arr[jx + 1];
            linePositions[base + 5] = arr[jx + 2];
            segCount++;
          }
        }
      }
      const lineAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      (lineAttr.array as Float32Array).set(linePositions);
      lineAttr.needsUpdate = true;
      lineGeometry.setDrawRange(0, segCount * 2);
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#22D3EE"
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#0FB8D6" transparent opacity={0.22} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export function CircuitCore() {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = usePointer();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.x +=
      ((pointer as { x: number; y: number }).y * 0.15 - groupRef.current.rotation.x) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#0B1220"
          emissive="#0FB8D6"
          emissiveIntensity={1.1}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}
