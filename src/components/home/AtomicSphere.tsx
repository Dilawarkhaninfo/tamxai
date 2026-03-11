'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function AtomicSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      1,
      2000
    );
    camera.position.z = 480;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const particleCount = 90000;
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);
    
    const radius = 175;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      
      const r = radius + (Math.random() - 0.5) * 6;
      
      positions[i3] = r * Math.cos(theta) * Math.sin(phi);
      positions[i3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i3 + 2] = r * Math.cos(phi);
      
      sizes[i] = 1.0 + Math.random() * 0.7;
      alphas[i] = 0.5 + Math.random() * 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePos: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        attribute float size;
        attribute float alpha;
        varying float vAlpha;
        varying float vDepth;
        uniform float time;
        
        void main() {
          vAlpha = alpha;
          
          vec3 pos = position;
          
          float wave = sin(time * 0.15 + position.x * 0.008 + position.y * 0.008) * 0.4;
          pos += normalize(position) * wave;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vDepth = -mvPosition.z;
          
          gl_PointSize = size * (320.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying float vDepth;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
          alpha *= vAlpha;
          
          float depthFade = smoothstep(200.0, 700.0, vDepth);
          alpha *= mix(1.0, 0.4, depthFade);
          
          // Antimatter-style: slightly warm white with a hint of lavender
          vec3 color = vec3(0.88, 0.88, 0.92);
          
          gl_FragColor = vec4(color, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const glowGeometry = new THREE.CircleGeometry(radius * 1.2, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x696aac,
      transparent: true,
      opacity: 0.02,
      blending: THREE.AdditiveBlending
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = -120;
    scene.add(glow);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.004;

      material.uniforms.time.value = time;
      material.uniforms.mousePos.value = mouseRef.current;

      particles.rotation.y = time * 0.025;
      particles.rotation.x = Math.sin(time * 0.015) * 0.04;

      particles.rotation.y += mouseRef.current.x * 0.015;
      particles.rotation.x += mouseRef.current.y * 0.015;

      renderer.render(scene, camera);
    };

    animate();

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
      
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="particles3d"
      className="absolute lg:fixed pointer-events-none -mt-30 sm:mt-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] sm:size-[700px] 2xl:size-[900px] z-10"
    >
      <div className="relative w-full h-full">
        <div
          ref={containerRef}
          className="relative z-10 w-full h-full"
        />
        <div className="size-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-primary rounded-full blur-[100px]" />
      </div>
    </div>
  );
}
