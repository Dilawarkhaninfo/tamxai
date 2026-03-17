'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Team3DNetwork } from './Team3DNetwork';
import { usePreloader } from '@/context/PreloaderContext';

export default function TeamHero() {
  const { finished } = usePreloader();

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0B0F1C]">
      <Team3DNetwork />
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(105,106,172,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 w-main mx-auto">
        <motion.div
           initial={{ opacity: 0 }}
           animate={finished ? { opacity: 1 } : { opacity: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={finished ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
              transition={{ duration: 1.5, ease: 'anticipate' }}
              className="py-2"
            >
               <h1 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-2">
                Meet the <span className="italic font-bold">Minds</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={finished ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
              transition={{ duration: 1.5, ease: 'anticipate', delay: 0.1 }}
              className="py-2"
            >
               <h1 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6">
                Behind <span className="bg-gradient-to-r from-brand-purple to-blue-400 bg-clip-text text-transparent italic font-bold">TAMx</span>
              </h1>
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={finished ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: 'anticipate' }}
            className="text-base md:text-lg text-foreground/60 max-w-xl mx-auto font-light leading-relaxed mt-4"
          >
            A team of engineers, designers, and AI specialists building 
            intelligent digital systems for the future.
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
      </div>
    </section>
  );
}
