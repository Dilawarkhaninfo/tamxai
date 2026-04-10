'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Team3DNetwork } from './Team3DNetwork';

export default function TeamVision() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const titleX = useTransform(scrollYProgress, [0, 0.5], ["-50px", "0px"]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.7], ["50px", "0px"]);

  const lineReveal = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0, x: -30 },
    visible: { 
      clipPath: 'inset(0 0% 0 0)', 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  const visionText = "We envision a world where technology enhances everyday life and empowers individuals and businesses to achieve their full potential. At TAMx Technologies, we are committed to continuous improvement and innovation, ensuring that we stay at the forefront of the tech industry.";
  const words = visionText.split(" ");
  const highlightedWords = ['technology', 'empowers', 'potential', 'innovation', 'forefront'];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[80vh] py-24 w-full flex items-center justify-center overflow-hidden bg-black px-6 md:px-0"
    >
      {/* 3D NEURAL NETWORK BACKGROUND WITH PARALLAX */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <Team3DNetwork />
      </motion.div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-95" />
      </div>

      <div className="relative z-20 w-main mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12">
          
          {/* Top Left: Typography Title */}
          <motion.div 
            style={{ x: titleX }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="lg:col-span-12 xl:col-span-5 self-start"
          >
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.3em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="flex items-center gap-4 text-brand-purple text-[10px] md:text-xs font-black uppercase mb-8"
            >
              <div className="w-12 h-[1px] bg-brand-purple/50" />
              Strategic Vision
            </motion.div>
            
            <div className="space-y-4">
              <div className="overflow-hidden">
                 <motion.h3 
                  variants={lineReveal}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter text-white"
                >
                  Our <span className="text-brand-purple italic">Vision</span>
                </motion.h3>
              </div>
            </div>
          </motion.div>

          {/* Bottom Right: Content */}
          <motion.div 
            style={{ y: contentY }}
            initial={{ opacity: 0, x: 40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-12 xl:col-start-6 xl:col-span-7 relative z-10 lg:mt-0"
          >
            <div className="flex flex-wrap text-left lg:pl-12 lg:border-l border-brand-purple/10">
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
                  className={`text-lg sm:text-xl lg:text-2xl font-light leading-relaxed mr-2.5 mb-2.5 tracking-tight ${
                    highlightedWords.includes(word.toLowerCase().replace(/[.,]/g, "")) 
                      ? "text-white font-semibold shimmer-text" 
                      : "text-white/50"
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
               className="mt-10 h-[1px] w-full bg-gradient-to-r from-brand-purple/30 via-brand-purple/60 to-transparent origin-left"
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
