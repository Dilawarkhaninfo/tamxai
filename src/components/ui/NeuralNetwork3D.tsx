'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 5000 }) {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        temp[i3] = (Math.random() - 0.5) * 10;
        temp[i3 + 1] = (Math.random() - 0.5) * 10;
        temp[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
      <points ref={mesh}>
        <bufferGeometry>
          {React.createElement('bufferAttribute', {
            attach: 'attributes-position',
            count: count,
            array: particles,
            itemSize: 3,
          })}
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#9333EA"
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
  );
}

export function NeuralNetwork3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
