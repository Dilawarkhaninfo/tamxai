'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { NeuralNetwork3D } from '@/components/ui/NeuralNetwork3D';

export function NarrativeSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-[#030712] py-24 overflow-hidden">
      {/* Decorative Neural Network Hub for Right Side */}
      <div className="absolute top-1/2 -right-1/4 w-[800px] h-[800px] pointer-events-none opacity-40 z-0">
          <NeuralNetwork3D />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
             initial={{ opacity: 0, x: -60 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
             viewport={{ once: true }}
             className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-brand-purple/40" />
                <span className="text-brand-lavender font-bold uppercase tracking-[0.4em] text-[10px]">Our Mission</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 md:mb-12 leading-[1.1] tracking-tighter">
              The <span className="gradient-text">Human Element</span> <br /> behind AI
            </h2>
            
            <div className="space-y-8 text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl opacity-80">
              <p>
                At TAMx, we believe that technology should be more than just a tool—it should be a catalyst for meaningful change. Founded by a team of visionary engineers and designers, our mission is to bridge the gap between complex AI capabilities and real-world business outcomes.
              </p>
              <p>
                We collaborate with forward-thinking organizations to design, develop, and deploy intelligent systems that are not only powerful but also intuitive, ethical, and built to scale.
              </p>
              <div className="pt-8 grid grid-cols-2 gap-8 border-t border-white/5 mt-12">
                  <div>
                      <h4 className="text-white font-bold text-3xl mb-1 tracking-tight">Visionary</h4>
                      <p className="text-text-muted text-[10px] uppercase tracking-widest font-bold">Engineering first</p>
                  </div>
                  <div>
                      <h4 className="text-white font-bold text-3xl mb-1 tracking-tight">Impactful</h4>
                      <p className="text-text-muted text-[10px] uppercase tracking-widest font-bold">Results driven</p>
                  </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side Visual with Interactive Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[3rem] overflow-hidden group"
            style={{ perspective: '2000px' }}
          >
            {/* Background Image / Mesh Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/20 via-transparent to-brand-blue/20 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
              alt="TAMx Technical Depth" 
              className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-110 transition-transform duration-[3000ms]"
            />
            {/* Floating UI Elements */}
            <div className="absolute inset-0 p-12 flex flex-col justify-end z-20">
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="p-10 rounded-[2.5rem] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <p className="text-[10px] font-bold text-brand-lavender mb-4 uppercase tracking-[0.4em]">Innovation Framework v2</p>
                    <p className="text-white text-2xl font-bold leading-tight tracking-tight">Designing architectures that balance cutting-edge AI with reliable human-centric feedback loops.</p>
                </motion.div>
            </div>

            {/* Light Sweep Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] z-30" />
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Rings */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
