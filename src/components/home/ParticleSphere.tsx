'use client';

import { useEffect, useRef, useState } from 'react';

export function ParticleSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Subtle parallax - max 12 degrees for smooth, premium feel
        const rotateX = ((e.clientY - centerY) / centerY) * 12;
        const rotateY = ((e.clientX - centerX) / centerX) * -12;
        
        setMousePosition({ x: rotateY, y: rotateX });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Idle animation loop
  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.005; // Slow, elegant speed
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Generate particles in spherical formation
  const particles = [];
  const particleCount = 400; // Increased for fuller sphere
  const radius = 280;

  for (let i = 0; i < particleCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / particleCount);
    const theta = Math.sqrt(particleCount * Math.PI) * phi;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    // Add unique offset for each particle's idle animation
    const offset = i * 0.1;

    particles.push({ x, y, z, id: i, offset });
  }

  return (
    <div 
      ref={containerRef}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none z-10"
      style={{ perspective: '1500px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
        }}
      >
        {particles.map((particle) => {
          // Calculate opacity based on z-position (depth)
          const baseOpacity = (particle.z + radius) / (2 * radius);
          const scale = 0.3 + baseOpacity * 0.9;
          
          // Idle animation - gentle float and pulse
          const time = timeRef.current;
          const floatX = Math.sin(time + particle.offset) * 3;
          const floatY = Math.cos(time * 0.8 + particle.offset) * 3;
          const floatZ = Math.sin(time * 0.6 + particle.offset) * 3;
          const pulse = 0.85 + Math.sin(time * 2 + particle.offset) * 0.15;
          
          const finalOpacity = baseOpacity * pulse;
          
          return (
            <div
              key={particle.id}
              className="absolute rounded-full transition-all duration-300 ease-out"
              style={{
                width: '3px',
                height: '3px',
                left: '50%',
                top: '50%',
                transform: `translate3d(${particle.x + floatX}px, ${particle.y + floatY}px, ${particle.z + floatZ}px) scale(${scale})`,
                background: `radial-gradient(circle, 
                  rgba(255, 255, 255, ${finalOpacity * 0.9}) 0%, 
                  rgba(230, 220, 255, ${finalOpacity * 0.7}) 30%,
                  rgba(200, 180, 255, ${finalOpacity * 0.5}) 60%,
                  rgba(147, 51, 234, ${finalOpacity * 0.3}) 100%
                )`,
                boxShadow: `
                  0 0 ${8 * finalOpacity}px rgba(255, 255, 255, ${finalOpacity * 0.6}),
                  0 0 ${16 * finalOpacity}px rgba(200, 180, 255, ${finalOpacity * 0.4}),
                  0 0 ${24 * finalOpacity}px rgba(147, 51, 234, ${finalOpacity * 0.2})
                `,
                opacity: finalOpacity * 0.95,
                filter: `blur(${0.3 * (1 - baseOpacity)}px)`,
                willChange: 'transform, opacity'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
