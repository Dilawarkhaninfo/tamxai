'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

export function GlobalNetworkSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const targetRotation = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.z = 800;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle Group
    const group = new THREE.Group();
    scene.add(group);

    const particleCount = 2000;
    const radius = 280;
    
    // Geometry for nodes
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const baseColor = new THREE.Color("#8884d8"); // Lavender
    const electricBlue = new THREE.Color("#00eeff");

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Sphere distribution
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        
        positions[i3] = radius * Math.cos(theta) * Math.sin(phi);
        positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
        positions[i3 + 2] = radius * Math.cos(phi);

        // Randomly blend Lavender and Blue
        const mix = Math.random();
        const color = baseColor.clone().lerp(electricBlue, mix);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        sizes[i] = 1.5 + Math.random() * 2.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        void main() {
          vColor = color;
          vec3 pos = position;
          // Subtle pulse
          float pulse = sin(time * 0.5 + length(position) * 0.01) * 5.0;
          pos += normalize(position) * pulse;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.3, 0.5, d);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    group.add(particles);

    // Connections (Lines)
    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x8884d8, 
        transparent: true, 
        opacity: 0.12, 
        blending: THREE.AdditiveBlending 
    });
    
    // Create random connections between nearby points
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    
    const maxConnections = particleCount * 2;
    const maxDistance = 60;
    
    const vecA = new THREE.Vector3();
    const vecB = new THREE.Vector3();

    for (let i = 0; i < particleCount; i++) {
        vecA.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        let connections = 0;
        for (let j = i + 1; j < particleCount && connections < 2; j++) {
            vecB.set(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
            if (vecA.distanceTo(vecB) < maxDistance) {
                linePositions.push(vecA.x, vecA.y, vecA.z);
                linePositions.push(vecB.x, vecB.y, vecB.z);
                connections++;
            }
        }
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);

    // Core glow
    const glowGeo = new THREE.SphereGeometry(radius * 0.8, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
        color: 0x5b21b6, // Deep purple
        transparent: true,
        opacity: 0.05,
        blending: THREE.AdditiveBlending
    });
    const coreGlow = new THREE.Mesh(glowGeo, glowMat);
    group.add(coreGlow);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      material.uniforms.time.value = time;

      // Slow rotation
      group.rotation.y += 0.001;
      group.rotation.x += 0.0005;

      // Mouse influence
      targetRotation.current.x = mouseRef.current.y * 0.2;
      targetRotation.current.y = mouseRef.current.x * 0.2;

      group.rotation.x += (targetRotation.current.x - group.rotation.x) * 0.05;
      group.rotation.y += (targetRotation.current.y - group.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-primary/20 to-dark-primary pointer-events-none" />
    </div>
  );
}
