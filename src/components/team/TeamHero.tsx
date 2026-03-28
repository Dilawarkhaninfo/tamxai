'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Team3DNetwork } from './Team3DNetwork';
import { usePreloader } from '@/context/PreloaderContext';

export default function TeamHero() {
  const { finished } = usePreloader();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0B0F1C]"
    >
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <Team3DNetwork />
      </motion.div>
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(105,106,172,0.05)_0%,transparent_70%)] pointer-events-none" />

      <motion.div 
        style={{ scale }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 w-main mx-auto"
      >
        <motion.div
           initial={{ opacity: 0 }}
           animate={finished ? { opacity: 1 } : { opacity: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center">
            {/* Brand Logo Icon */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={finished ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className="mb-8"
            >
              <img 
                src="/Logo_tamx.png" 
                alt="TAMx Logo" 
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={finished ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 1.5, ease: 'anticipate', delay: 0.4 }}
              className="py-2"
            >
               <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
                Welcome to <span className="bg-gradient-to-r from-brand-purple to-blue-400 bg-clip-text text-transparent italic font-bold">TAMx Technologies</span>
              </h1>
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={finished ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
            className="text-base md:text-lg lg:text-xl text-foreground/70 max-w-3xl mx-auto font-light leading-relaxed mt-4"
          >
            At TAMx Technologies, we are dedicated to empowering businesses and individuals through innovative technology solutions. 
            Our mission is to bridge the gap between cutting-edge technology and practical applications, making it accessible for everyone. 
            We are not just a technology provider; we are your partners in success.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={finished ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-4 group cursor-pointer"
          onClick={() => {
            const nextSection = document.getElementById('team-grid');
            nextSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 group-hover:text-white transition-colors duration-300 font-medium">
                Scroll to Meet Us
            </span>
            <motion.div 
               animate={{ y: [0, 8, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="p-3 border border-white/5 rounded-full group-hover:border-brand-purple/50 transition-colors duration-300 backdrop-blur-sm"
            >
                <ArrowDown className="text-foreground/30 group-hover:text-white" size={16} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
