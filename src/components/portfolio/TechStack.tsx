'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCode2, 
  Terminal, 
  Layers, 
  Database, 
  Cloud, 
  ShieldCheck, 
  Cpu, 
  Workflow,
  Sparkles
} from 'lucide-react';

const technologies = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Typescript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
];

const layers = [
  { radius: 120, speed: 30, direction: -1, items: technologies.slice(0, 3) }, // Inner: Anticlockwise
  { radius: 220, speed: 45, direction: 1, items: technologies.slice(3, 6) },  // Middle: Clockwise
  { radius: 320, speed: 60, direction: -1, items: technologies.slice(6, 10) }, // Outer: Anticlockwise
];

export function TechStack() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return (
    <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-center bg-[#030712] py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Built with a <span className="gradient-text">World-Class Stack</span>
            </h2>
        </div>
    </section>
  );

  return (
    <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-center bg-[#030712] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white mb-6"
        >
          Built with a <span className="gradient-text">World-Class Stack</span>
        </motion.h2>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg opacity-60">
          Our engineering excellence is powered by the most advanced technologies in the industry.
        </p>
      </div>

      <div className="relative w-full h-[640px] flex items-center justify-center">
        {/* Central Logo / Visual */}
        <div className="absolute w-32 h-32 rounded-full bg-brand-purple/10 border border-brand-purple/20 backdrop-blur-3xl flex items-center justify-center z-20">
            <AnimatePresence mode="wait">
                {hoveredTech ? (
                    <motion.div
                        key={hoveredTech}
                        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                        className="text-center"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-lavender block mb-1">Active</span>
                        <span className="text-lg font-bold text-white whitespace-nowrap">{hoveredTech}</span>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mx-auto mb-2">
                             <Sparkles className="w-6 h-6 text-brand-purple" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">TAMx Core</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Orbiting Layers */}
        {layers.map((layer, layerIdx) => (
          <motion.div 
            key={layerIdx} 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: layerIdx * 0.2, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Visual Orbit Line / Clock Detail */}
            <div 
              style={{ width: layer.radius * 2, height: layer.radius * 2 }}
              className="absolute rounded-full border border-white/[0.05] flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
            >
                {/* Decorative Ticks */}
                <motion.svg 
                    initial={{ rotate: -90, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 0.2 }}
                    transition={{ duration: 2, delay: layerIdx * 0.3 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <circle 
                        cx="50%" 
                        cy="50%" 
                        r={layer.radius} 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="1" 
                        strokeDasharray="1 15" 
                    />
                </motion.svg>
            </div>

            <motion.div
              animate={{ rotate: [0, 360 * layer.direction] }}
              transition={{ duration: layer.speed, repeat: Infinity, ease: "linear" }}
              className="relative"
              style={{ width: layer.radius * 2, height: layer.radius * 2 }}
            >
              {layer.items.map((tech, idx) => {
                const angle = (idx / layer.items.length) * Math.PI * 2;
                const x = Math.cos(angle) * layer.radius;
                const y = Math.sin(angle) * layer.radius;

                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: (layerIdx * 0.4) + (idx * 0.1) }}
                    className="absolute pointer-events-auto cursor-pointer"
                    style={{ 
                      left: '50%', 
                      top: '50%',
                      x: x - 40, 
                      y: y - 40,
                      width: 80,
                      height: 80
                    }}
                  >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        onMouseEnter={() => setHoveredTech(tech.name)}
                        onMouseLeave={() => setHoveredTech(null)}
                        animate={{ 
                            rotate: [0, -360 * layer.direction],
                            x: hoveredTech === tech.name ? -x : 0,
                            y: hoveredTech === tech.name ? -y : 0,
                            scale: hoveredTech === tech.name ? 1.4 : 1,
                            zIndex: hoveredTech === tech.name ? 50 : 1
                        }}
                        transition={{ 
                            rotate: { duration: layer.speed, repeat: Infinity, ease: "linear" },
                            x: { type: 'spring', stiffness: 40, damping: 20 },
                            y: { type: 'spring', stiffness: 40, damping: 20 },
                            scale: { duration: 0.5, ease: "circOut" }
                        }}
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-700 backdrop-blur-3xl p-4 ${
                            hoveredTech === tech.name 
                            ? 'bg-brand-purple/30 border-brand-purple/60 shadow-[0_0_60px_rgba(147,51,234,0.4)]' 
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                        }`}
                    >
                        <img 
                            src={tech.logo} 
                            alt={tech.name} 
                            className={`w-full h-full object-contain ${hoveredTech === tech.name ? 'opacity-100' : 'opacity-60'} transition-opacity duration-700`} 
                        />
                        
                        {/* Glow effect for center translation */}
                        {hoveredTech === tech.name && (
                            <motion.div 
                                layoutId="glow"
                                className="absolute inset-0 bg-brand-purple/20 blur-2xl rounded-full -z-10"
                            />
                        )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
