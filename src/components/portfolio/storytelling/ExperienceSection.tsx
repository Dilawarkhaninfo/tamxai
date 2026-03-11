'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const mockupScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden py-32">
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 text-center">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="mb-20"
            >
                <h3 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">Product Experience</h3>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                    A seamless fusion of performance and aesthetics. Every pixel is optimized for enterprise scale.
                </p>
            </motion.div>

            <motion.div 
               style={{ y: mockupY, scale: mockupScale }}
               className="relative mx-auto max-w-5xl rounded-[3rem] border border-white/10 bg-[#0F172A] p-4 shadow-2xl overflow-hidden aspect-video group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 mix-blend-overlay" />
                <img 
                    src="https://images.unsplash.com/photo-1551288049-bbbda5366991?q=80&w=2070&auto=format&fit=crop" 
                    className="w-full h-full object-cover rounded-[2.5rem] opacity-80"
                    alt="Mockup"
                />
                
                {/* Floating Elements on Mockup */}
                <motion.div 
                   animate={{ y: [0, -20, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-12 right-12 w-48 h-24 backdrop-blur-3xl bg-white/5 border border-white/20 rounded-2xl p-6 shadow-2xl"
                >
                    <div className="w-12 h-2 bg-brand-purple rounded-full mb-3" />
                    <div className="w-full h-1 bg-white/10 rounded-full mb-2" />
                    <div className="w-2/3 h-1 bg-white/10 rounded-full" />
                </motion.div>
            </motion.div>
        </div>
    </section>
  );
}
