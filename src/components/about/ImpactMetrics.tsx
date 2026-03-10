'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const metrics = [
  { label: 'Projects Delivered', value: 50, suffix: '+' },
  { label: 'Global Clients', value: 30, suffix: '+' },
  { label: 'AI Platforms Built', value: 12, suffix: '' },
  { label: 'Client Satisfaction', value: 98, suffix: '%' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    let startTime: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
}

export function ImpactMetrics() {
  return (
    <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center bg-black overflow-hidden py-32">
      {/* Background Animated Grid */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0F172A]/20" />
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="absolute inset-0"
            style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
            }}
          />
          {/* Subtle Scanning Line */}
          <motion.div 
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[2px] bg-brand-purple/20 blur-sm z-10"
          />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-24">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-lavender mb-8"
            >
                Quantifiable Impact
            </motion.h2>
            <motion.h3 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-5xl md:text-8xl font-bold text-white tracking-tighter"
            >
                Built for <span className="gradient-text">Growth</span>
            </motion.h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-b border-white/5 py-24">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter group-hover:gradient-text transition-all duration-500">
                <Counter value={metric.value} suffix={metric.suffix} />
              </div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-text-muted group-hover:text-white transition-colors">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cinematic Glare */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-purple/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-brand-blue/5 to-transparent pointer-events-none" />
    </section>
  );
}
