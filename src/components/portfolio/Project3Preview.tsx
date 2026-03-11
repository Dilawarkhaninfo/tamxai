'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, useCursor } from '@react-three/drei';
import * as THREE from 'three';

function PreviewScene({ type }: { type: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, hovered ? state.mouse.y * 0.5 : 0, 0.1);
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, hovered ? state.mouse.x * 0.5 : 0, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere
        ref={mesh}
        args={[1, 64, 64]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={1.2}
      >
        <MeshDistortMaterial
          color={type === 'AI Solutions' ? '#a855f7' : '#3b82f6'}
          speed={4}
          distort={0.4}
          radius={1}
        />
      </Sphere>
    </Float>
  );
}

export function Project3Preview({ type, isHovered }: { type: string, isHovered: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <SpotLight position={[0, 5, 0]} intensity={2} />
        <PreviewScene type={type} />
      </Canvas>
    </div>
  );
}

function SpotLight(props: any) {
  const ref = useRef<THREE.SpotLight>(null);
  return <spotLight ref={ref} {...props} />;
}
