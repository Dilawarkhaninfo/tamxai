'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ProjectHero({ title, category, image }: { title: string, category: string, image: string }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img src={image} className="w-full h-full object-cover opacity-60" alt={title} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-dark-primary" />
      </motion.div>
      
      <motion.div style={{ opacity }} className="relative z-10 text-center px-6">
        <span className="text-brand-lavender font-bold tracking-[0.3em] uppercase mb-6 block">{category}</span>
        <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter mb-8 leading-none">{title}</h1>
        <div className="w-24 h-[1px] bg-white/20 mx-auto" />
      </motion.div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Scroll to Explore</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-brand-purple to-transparent" 
        />
      </div>
    </section>
  );
}
