'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export function BlogHero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create a abstract wireframe mesh for a "Research" look
    const geometry = new THREE.IcosahedronGeometry(2, 15);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePos: { value: new THREE.Vector2(0, 0) },
        color1: { value: new THREE.Color('#3b82f6') }, // Blue
        color2: { value: new THREE.Color('#8b5cf6') }, // Purple
      },
      vertexShader: `
        uniform float time;
        uniform vec2 mousePos;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Finite movement based on time and wave
          float elevation = sin(pos.x * 2.0 + time) * 0.1;
          elevation += sin(pos.y * 2.0 + time * 0.5) * 0.1;
          
          // Mouse interaction (displacement)
          float dist = distance(vec2(pos.x, pos.y), mousePos * 2.0);
          elevation += (1.0 - smoothstep(0.0, 1.5, dist)) * 0.3;
          
          pos += normal * elevation;
          vElevation = elevation;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = 2.5 * (1.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying float vElevation;

        void main() {
          float strength = vElevation * 2.0 + 0.5;
          vec3 finalColor = mix(color1, color2, strength);
          gl_FragColor = vec4(finalColor, 0.4);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Add extra glowing sphere
    const glowGeo = new THREE.SphereGeometry(2.1, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.05,
      wireframe: true,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowMesh);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      material.uniforms.time.value = time * 0.001;
      material.uniforms.mousePos.value.lerp(mouseRef.current, 0.05);

      points.rotation.y += 0.002;
      points.rotation.x += 0.001;
      glowMesh.rotation.y -= 0.001;

      renderer.render(scene, camera);
    };

    animate(0);

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden bg-[#020617]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
      
      {/* 3D Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0 opacity-60"
      />

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
               <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
               Expert Analysis
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-tight">
                Insights <span className="gradient-text">& Research</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto opacity-70 leading-relaxed">
                Exploring the technical frontiers of digital innovation through senior engineering analysis and strategic research.
            </p>
        </motion.div>
      </div>

      {/* Decorative Blur Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617] to-transparent z-10" />
    </div>
  );
}
