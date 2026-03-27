'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Story3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      1,
      3000
    );
    camera.position.z = 800;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Crystalline Particles
    const nodesCount = 150;
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshPhongMaterial({
      color: 0x696aac,
      emissive: 0x4c4dac,
      specular: 0xffffff,
      shininess: 100,
      transparent: true,
      opacity: 0.4,
      flatShading: true
    });

    const light = new THREE.PointLight(0x8587e3, 2, 1000);
    light.position.set(0, 0, 500);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const particles = new THREE.Group();
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < nodesCount; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        (Math.random() - 0.5) * 1200,
        (Math.random() - 0.5) * 1200,
        (Math.random() - 0.5) * 1200
      );
      
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const scale = 0.5 + Math.random() * 2;
      mesh.scale.set(scale, scale, scale);

      particles.add(mesh);
      
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3
      ));
    }

    scene.add(particles);

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
      time += 0.002;

      particles.children.forEach((mesh: any, i) => {
        mesh.position.add(velocities[i]);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        // Wrap around
        if (Math.abs(mesh.position.x) > 600) velocities[i].x *= -1;
        if (Math.abs(mesh.position.y) > 600) velocities[i].y *= -1;
        if (Math.abs(mesh.position.z) > 600) velocities[i].z *= -1;
      });

      // Parallax and global rotation
      particles.rotation.y = time * 0.1 + mouseRef.current.x * 0.05;
      particles.rotation.x = Math.sin(time * 0.05) * 0.05 + mouseRef.current.y * 0.05;

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
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div ref={containerRef} className="w-full h-full opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>
  );
}
