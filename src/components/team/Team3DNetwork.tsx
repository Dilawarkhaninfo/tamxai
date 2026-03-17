'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Team3DNetwork() {
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
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Neural Network Parameters
    const nodesCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodesCount * 3);
    const velocities = [];

    for (let i = 0; i < nodesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 800;
      
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      ));
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Nodes Material (Slightly larger and glowing)
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x8587e3,
      size: 4,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const nodePoints = new THREE.Points(geometry, nodeMaterial);
    scene.add(nodePoints);

    // Lines Connection
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4c4dac,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });

    let lineGeometry = new THREE.BufferGeometry();
    let lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

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
      time += 0.005;

      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const linePositions = [];

      for (let i = 0; i < nodesCount; i++) {
        const i3 = i * 3;
        posAttr.array[i3] += velocities[i].x;
        posAttr.array[i3 + 1] += velocities[i].y;
        posAttr.array[i3 + 2] += velocities[i].z;

        // Bounce back
        if (Math.abs(posAttr.array[i3]) > 400) velocities[i].x *= -1;
        if (Math.abs(posAttr.array[i3 + 1]) > 400) velocities[i].y *= -1;
        if (Math.abs(posAttr.array[i3 + 2]) > 400) velocities[i].z *= -1;

        // Check distances for lines
        for (let j = i + 1; j < nodesCount; j++) {
          const j3 = j * 3;
          const dx = posAttr.array[i3] - posAttr.array[j3];
          const dy = posAttr.array[i3 + 1] - posAttr.array[j3 + 1];
          const dz = posAttr.array[i3 + 2] - posAttr.array[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 150) {
            linePositions.push(
              posAttr.array[i3], posAttr.array[i3 + 1], posAttr.array[i3 + 2],
              posAttr.array[j3], posAttr.array[j3 + 1], posAttr.array[j3 + 2]
            );
          }
        }
      }

      posAttr.needsUpdate = true;
      
      lines.geometry.dispose();
      lines.geometry = new THREE.BufferGeometry();
      lines.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));

      // Parallax movement
      scene.rotation.y = time * 0.05 + mouseRef.current.x * 0.1;
      scene.rotation.x = Math.sin(time * 0.03) * 0.05 + mouseRef.current.y * 0.1;

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
      nodeMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="team-network-3d"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <div className="relative w-full h-full">
        <div
          ref={containerRef}
          className="relative z-10 w-full h-full scale-110 md:scale-100"
        />
        {/* Deep ambient glow matching main theme */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] md:size-[1000px] bg-brand-purple/5 rounded-full blur-[150px] opacity-40" />
      </div>
    </div>
  );
}
