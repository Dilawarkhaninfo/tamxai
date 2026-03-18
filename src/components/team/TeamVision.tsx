'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Team3DNetwork } from './Team3DNetwork';

export default function TeamVision() {
  const visionText = "We envision a future where intelligent systems empower businesses to operate faster, smarter, and more efficiently. At TAMx, we are committed to building scalable AI-driven solutions that redefine how modern organizations grow and innovate.";
  const words = visionText.split(" ");

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black px-4 md:px-0">
      {/* 3D NEURAL NETWORK BACKGROUND */}
      <Team3DNetwork />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.05)_0%,transparent_70%)]" />
        
        {/* Infinite Scanning Beam */}
        <motion.div 
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent blur-sm"
        />
      </div>

      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-4 text-brand-purple-light text-xs md:text-sm font-bold uppercase mb-12"
        >
          <div className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent" />
          Our Vision
          <div className="w-8 md:w-16 h-px bg-gradient-to-l from-transparent via-brand-purple/50 to-transparent" />
        </motion.div>

        {/* Main Vision Statement */}
        <div className="flex flex-wrap justify-center max-w-5xl mx-auto mb-16 px-4">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + (i * 0.03),
                ease: "easeOut"
              }}
              className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mr-2 md:mr-3 mb-1 tracking-tight ${
                ['intelligent', 'empower', 'TAMx', 'AI-driven', 'redefine'].includes(word.replace(/[.,]/g, "")) 
                  ? "text-white drop-shadow-[0_0_20px_rgba(167,139,250,0.5)] shimmer-text" 
                  : "text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <Link href="/contact" className="group">
            <div className="flex items-center gap-6 px-10 py-5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md hover:border-brand-purple/30 hover:bg-black/60 transition-all duration-500 shadow-2xl group-active:scale-95">
              <span className="text-white font-medium text-lg">Start Your Project</span>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-brand-purple group-hover:text-white transition-all duration-500 transform group-hover:rotate-[360deg] shadow-lg">
                <ArrowUpRight size={24} />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(167, 139, 250, 0) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(167, 139, 250, 0) 100%
          );
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
          background-clip: text;
          -webkit-background-clip: text;
        }

        @keyframes shimmer {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </section>
  );
}
