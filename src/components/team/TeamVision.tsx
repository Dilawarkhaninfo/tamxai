'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Team3DNetwork } from './Team3DNetwork';

export default function TeamVision() {
  const visionText = "We envision a world where technology enhances everyday life and empowers individuals and businesses to achieve their full potential. At TAMx Technologies, we are committed to continuous improvement and innovation, ensuring that we stay at the forefront of the tech industry.";
  const words = visionText.split(" ");
  
  // Highlighted words for the new content
  const highlightedWords = ['technology', 'empowers', 'potential', 'innovation', 'forefront'];

  const lineReveal = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0, x: -20 },
    visible: { 
      clipPath: 'inset(0 0% 0 0)', 
      opacity: 1, 
      x: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  return (
    <section className="relative min-h-screen py-32 w-full flex items-center justify-center overflow-hidden bg-black px-6 md:px-0">
      {/* 3D NEURAL NETWORK BACKGROUND */}
      <Team3DNetwork />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-95" />
      </div>

      <div className="relative z-20 w-main mx-auto">
        <div className="grid grid-cols-12 gap-y-12">
          
          {/* Top Left: Typography Title (No Box Background) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="col-start-1 col-end-13 lg:col-start-1 lg:col-end-7 self-start"
          >
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.3em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.5em' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="flex items-center gap-6 text-brand-purple text-xs md:text-sm font-black uppercase mb-10"
            >
              <div className="w-16 h-[2px] bg-brand-purple" />
              Strategic Vision
            </motion.div>
            
            <div className="space-y-4">
              <div className="overflow-hidden">
                 <motion.h3 
                  variants={lineReveal}
                  className="text-5xl md:text-6xl lg:text-8xl font-black leading-none tracking-tighter text-white"
                >
                  Our <span className="text-brand-purple italic">Vision</span>
                </motion.h3>
              </div>
            </div>
          </motion.div>

          {/* Bottom Right: Content (No Box Background) */}
          <motion.div 
            initial={{ opacity: 0, x: 60, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="col-start-1 lg:col-start-6 col-end-13 relative lg:-mt-12 z-10"
          >
            <div className="flex flex-wrap text-left lg:pl-10">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6 + (i * 0.02),
                    ease: "easeOut"
                  }}
                  className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mr-2.5 mb-2.5 tracking-tight ${
                    highlightedWords.includes(word.toLowerCase().replace(/[.,]/g, "")) 
                      ? "text-white font-semibold shimmer-text" 
                      : "text-white/60"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Specialized Decorative Line */}
            <motion.div 
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               transition={{ duration: 1.5, delay: 1 }}
               className="mt-12 h-[1px] w-full bg-gradient-to-r from-brand-purple/50 via-brand-purple to-transparent origin-left"
            />
          </motion.div>
          
        </div>
      </div>

      <style jsx>{`
        .shimmer-text {
          background: linear-gradient(
            to right,
            #fff 20%,
            #a78bfa 40%,
            #a78bfa 60%,
            #fff 80%
          );
          background-size: 200% auto;
          color: #fff;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s linear infinite;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </section>
  );
}
