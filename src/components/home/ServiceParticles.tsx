'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import { gsap } from 'gsap';

const PARTICLE_COUNT = 4500;

function MorphingPoints({ activeIndex }: { activeIndex: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const targetPositions = useMemo(() => {
    const shapes: Float32Array[] = [];
    
    // 1. SPARKLES / STARS (Product Design)
    const sparkles = new Float32Array(PARTICLE_COUNT * 3);
    const starCount = 3;
    const starOffsets = [[-1.2, 1.2, 0], [1.2, -0.6, -0.6], [0, -1.5, 0.8]];
    const starScales = [1.8, 1.2, 0.9];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const sIdx = i % starCount;
        const offset = starOffsets[sIdx];
        const scale = starScales[sIdx];
        
        // 4-pointed star logic
        const t = Math.random() * Math.PI * 2;
        const side = Math.floor(Math.random() * 4);
        const l = Math.pow(Math.random(), 2) * 1.5; // Concentrated at center
        
        let x = 0, y = 0;
        if (side === 0) { x = l; y = 0; }
        else if (side === 1) { x = -l; y = 0; }
        else if (side === 2) { x = 0; y = l; }
        else { x = 0; y = -l; }

        // Add some volume/dust
        x += (Math.random() - 0.5) * 0.4;
        y += (Math.random() - 0.5) * 0.4;
        const z = (Math.random() - 0.5) * 0.4;

        sparkles[i * 3] = (x * scale) + offset[0];
        sparkles[i * 3 + 1] = (y * scale) + offset[1];
        sparkles[i * 3 + 2] = (z * scale) + offset[2];
    }
    shapes.push(sparkles);

    // 2. CODING (Development)
    const coding = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const part = Math.random();
        if (part < 0.4) { // Brackets
            const side = Math.random() < 0.5 ? -1 : 1;
            const u = Math.random();
            const angle = (u - 0.5) * Math.PI * 0.6;
            coding[i * 3] = side * (1.2 + Math.abs(Math.sin(angle)) * 0.5);
            coding[i * 3 + 1] = Math.cos(angle) * (u < 0.5 ? 1.5 : -1.5);
            coding[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        } else if (part < 0.7) { // Slash /
            const u = Math.random();
            coding[i * 3] = (u - 0.5) * 1.2;
            coding[i * 3 + 1] = (u - 0.5) * 3.5;
            coding[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        } else { // Points/Dots
            coding[i * 3] = (Math.random() - 0.5) * 3;
            coding[i * 3 + 1] = (Math.random() - 0.5) * 3;
            coding[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        }
    }
    shapes.push(coding);

    // 3. GRAPH (GTM Strategy)
    const graph = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const u = Math.random();
        if (u < 0.6) { // Bars
            const barIdx = Math.floor(Math.random() * 3);
            const barHeights = [1, 2, 3];
            const xPos = [-1.2, 0, 1.2];
            graph[i * 3] = xPos[barIdx] + (Math.random() - 0.5) * 0.6;
            graph[i * 3 + 1] = (Math.random() * barHeights[barIdx]) - 1.5;
            graph[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
        } else { // Arrow
            const t = Math.random();
            const x = -2 + t * 4;
            const y = -1 + Math.pow(t, 1.5) * 3;
            graph[i * 3] = x + (Math.random() - 0.5) * 0.1;
            graph[i * 3 + 1] = y + (Math.random() - 0.5) * 0.1;
            graph[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
        }
    }
    shapes.push(graph);

    // 4. DNA (Healthcare)
    const dna = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const u = Math.random();
        if (u < 0.8) { // The Two Strands
            const strand = Math.random() < 0.5 ? 0 : Math.PI;
            const t = Math.random() * Math.PI * 4;
            const r = 1.6;
            dna[i * 3] = Math.cos(t + strand) * r;
            dna[i * 3 + 1] = (t - Math.PI * 2) * 1.2;
            dna[i * 3 + 2] = Math.sin(t + strand) * r;
        } else { // Rungs (Connecting lines)
            const t = Math.random() * Math.PI * 4;
            const lerpVal = Math.random();
            const r = 1.6;
            const s1x = Math.cos(t) * r;
            const s1z = Math.sin(t) * r;
            const s2x = Math.cos(t + Math.PI) * r;
            const s2z = Math.sin(t + Math.PI) * r;
            dna[i * 3] = s1x + (s2x - s1x) * lerpVal;
            dna[i * 3 + 1] = (t - Math.PI * 2) * 1.2;
            dna[i * 3 + 2] = s1z + (s2z - s1z) * lerpVal;
        }
    }
    shapes.push(dna);

    // 5. DOUBLE SPHERICAL CUBE (AI Development)
    const cubeFrame = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const layer = Math.random() < 0.6 ? 2.3 : 1.2; // Double layer
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        let x = Math.sin(phi) * Math.cos(theta);
        let y = Math.sin(phi) * Math.sin(theta);
        let z = Math.cos(phi);
        
        const p = 4; // Rounded cube sharpness
        x = Math.sign(x) * Math.pow(Math.abs(x), 1/p) * layer;
        y = Math.sign(y) * Math.pow(Math.abs(y), 1/p) * layer;
        z = Math.sign(z) * Math.pow(Math.abs(z), 1/p) * layer;
        
        cubeFrame[i * 3] = x + (Math.random() - 0.5) * 0.1;
        cubeFrame[i * 3 + 1] = y + (Math.random() - 0.5) * 0.1;
        cubeFrame[i * 3 + 2] = z + (Math.random() - 0.5) * 0.1;
    }
    shapes.push(cubeFrame);

    // 6. GLOBAL NETWORK (IoT Development)
    const iot = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const u = Math.random();
        if (u < 0.4) { // Latitude lines
            const lat = (Math.floor(Math.random() * 8) - 4) * (Math.PI / 8);
            const lon = Math.random() * Math.PI * 2;
            const r = 2.4;
            iot[i * 3] = r * Math.cos(lat) * Math.cos(lon);
            iot[i * 3 + 1] = r * Math.sin(lat);
            iot[i * 3 + 2] = r * Math.cos(lat) * Math.sin(lon);
        } else if (u < 0.8) { // Longitude lines
            const lon = (Math.floor(Math.random() * 12)) * (Math.PI / 6);
            const lat = (Math.random() - 0.5) * Math.PI;
            const r = 2.4;
            iot[i * 3] = r * Math.cos(lat) * Math.cos(lon);
            iot[i * 3 + 1] = r * Math.sin(lat);
            iot[i * 3 + 2] = r * Math.cos(lat) * Math.sin(lon);
        } else { // Surface points
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2.4;
            iot[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            iot[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            iot[i * 3 + 2] = r * Math.cos(phi);
        }
    }
    shapes.push(iot);

    return shapes;
  }, []);

  const currentPositions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

  useEffect(() => {
    // Initial shape
    const initialShape = targetPositions[0];
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      currentPositions[i] = initialShape[i];
    }
    if (pointsRef.current) {
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  }, [targetPositions, currentPositions]);

  useEffect(() => {
    const shapeIndex = activeIndex % targetPositions.length;
    const target = targetPositions[shapeIndex];
    
    // Store original positions for lerping
    const startPositions = new Float32Array(currentPositions);
    
    const obj = { progress: 0 };
    gsap.to(obj, {
      progress: 1,
      duration: 1.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        for (let i = 0; i < currentPositions.length; i++) {
          currentPositions[i] = startPositions[i] + (target[i] - startPositions[i]) * obj.progress;
        }
        if (pointsRef.current) {
          pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }
    });
  }, [activeIndex, targetPositions, currentPositions]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.005;
      pointsRef.current.rotation.z += 0.002;
      
      // Floating movement
      const t = state.clock.getElapsedTime();
      pointsRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#a2a3e9') },
      },
      vertexShader: `
        varying float vOpacity;
        uniform float uTime;
        
        void main() {
          vec3 pos = position;
          
          // Subtle individual movement
          pos.x += sin(uTime * 0.5 + position.y * 2.0) * 0.08;
          pos.y += cos(uTime * 0.5 + position.x * 2.0) * 0.08;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size based on depth - INCREASED
          gl_PointSize = 25.0 * (1.0 / -mvPosition.z);
          
          // Opacity based on depth
          vOpacity = smoothstep(-15.0, 8.0, mvPosition.z + 10.0);
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        uniform vec3 uColor;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.1, dist) * vOpacity;
          gl_FragColor = vec4(uColor, alpha * 0.9);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      pointsRef.current.rotation.y += 0.0015; // Slower, more elegant
      pointsRef.current.rotation.z += 0.0005;
      
      const t = state.clock.getElapsedTime();
      pointsRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          itemSize={3}
          args={[currentPositions, 3]}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
}

export function ServiceParticles({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <MorphingPoints activeIndex={activeIndex} />
      </Canvas>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(105,106,172,0.1)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}
