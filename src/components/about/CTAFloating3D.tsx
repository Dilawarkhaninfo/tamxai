'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function CTAFloating3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // --- 1. NEURAL CORE (The Heart of AI) ---
    const coreGeom = new THREE.IcosahedronGeometry(1.5, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x6366f1,
      emissiveIntensity: 2,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    group.add(core);

    // Inner Solid Glow
    const innerGeom = new THREE.SphereGeometry(1.0, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        emissive: 0x6366f1,
        emissiveIntensity: 5,
        transparent: true,
        opacity: 0.4,
    });
    const innerCore = new THREE.Mesh(innerGeom, innerMat);
    group.add(innerCore);

    // --- 2. DATA RINGS (Orbits) ---
    const rings: THREE.Mesh[] = [];
    const ringColors = [0x3b82f6, 0x6366f1, 0x818cf8, 0x3b82f6, 0x6366f1];
    const ringCount = 5;
    for (let i = 0; i < ringCount; i++) {
        const radius = 1.4 + i * 0.4; // Controlled, even spacing
        const ringGeom = new THREE.TorusGeometry(radius, 0.01, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({
            color: ringColors[i % 5],
            transparent: true,
            opacity: 0.4 - (i * 0.04),
        });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        
        // UNIQUE INITIAL ORIENTATIONS
        ring.rotation.x = (i * Math.PI) / 3;
        ring.rotation.y = (i * Math.PI) / 4;
        ring.rotation.z = (i * Math.PI) / 6;

        group.add(ring);
        rings.push(ring);
        
        // Add "Data Nodes" to rings
        const nodeCount = 5 + i;
        const nodeGeom = new THREE.SphereGeometry(0.04, 8, 8);
        const nodeMat = new THREE.MeshStandardMaterial({ 
            color: 0xffffff, 
            emissive: ringColors[i % 5],
            emissiveIntensity: 3,
            transparent: true, 
            opacity: 0.9 
        });
        for(let j=0; j<nodeCount; j++) {
            const node = new THREE.Mesh(nodeGeom, nodeMat);
            const angle = (j / nodeCount) * Math.PI * 2;
            node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
            ring.add(node);
        }
    }

    // --- 3. FLOATING DATA PARTICLES ---
    const partGeom = new THREE.BufferGeometry();
    const count = 1000; // Increased for full section
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 40; // Wider spread
    }
    partGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const partMat = new THREE.PointsMaterial({
        color: 0x818cf8,
        size: 0.02,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
    });
    const particles = new THREE.Points(partGeom, partMat);
    scene.add(particles);

    // Lighting
    const pointLight = new THREE.PointLight(0x6366f1, 25, 60);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 4);
    scene.add(ambientLight);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      // DYNAMIC MOVEMENT & CORE POSITIONING
      group.position.y = Math.sin(time * 0.7) * 0.2;
      group.position.x = 2.5 + Math.cos(time * 0.5) * 0.1; // Centered on right side
      
      group.rotation.x += 0.001;
      group.rotation.y += 0.001;

      core.rotation.z = -time * 0.4;
      core.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
      
      innerCore.scale.setScalar(1 + Math.sin(time * 3) * 0.08);

      rings.forEach((ring, i) => {
          // UNIQUE ROTATION PATHS FOR EACH LAYER
          ring.rotation.x += 0.004 + (i * 0.001);
          ring.rotation.y += 0.003 - (i * 0.0005);
          ring.rotation.z += 0.002 + (i * 0.0015);
      });

      particles.rotation.y = time * 0.02;
      
      renderer.render(scene, camera);
    };

    animate();

    // Balanced scale for full-width containment
    group.scale.setScalar(0.8);

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.children.forEach(child => {
        if ((child as any).geometry) (child as any).geometry.dispose();
        if ((child as any).material) {
            if (Array.isArray((child as any).material)) {
                (child as any).material.forEach((m: any) => m.dispose());
            } else {
                (child as any).material.dispose();
            }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <div ref={containerRef} className="w-full h-full" />
      {/* Background Glow Ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-purple/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-brand-blue/10 rounded-full blur-[100px] -z-10 animate-pulse" />
    </div>
  );
}
