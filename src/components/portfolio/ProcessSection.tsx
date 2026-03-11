'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Cpu, Rocket, Activity, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    title: 'Discovery',
    icon: Search,
    description: 'Deep dive into your business needs, market position, and technical requirements.',
  },
  {
    title: 'Architecture',
    icon: Compass,
    description: 'Designing scalable, secure, and performant systems using cutting-edge technologies.',
  },
  {
    title: 'Development',
    icon: Cpu,
    description: 'Agile execution by world-class engineers focused on quality and performance.',
  },
  {
    title: 'Deployment',
    icon: Rocket,
    description: 'Seamless integration with CI/CD pipelines and cloud-agnostic infrastructure.',
  },
  {
    title: 'Optimization',
    icon: Activity,
    description: 'Continuous monitoring and AI-driven enhancements for sustained growth.',
  },
];

export function ProcessSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-black py-24 overflow-hidden">
      {/* Decorative Light Beams */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-lavender text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
          >
            Our Workflow
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            The Process Behind <span className="gradient-text">Excellence</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-[60px] left-[calc(50%+40px)] w-[calc(100%-80px)] h-[1px] bg-white/5 group-hover:bg-brand-purple/30 transition-colors duration-500 z-0" />
              )}
              
              <div className="relative z-10 bg-white/[0.03] border border-white/5 rounded-[2rem] p-10 h-full transition-all duration-500 hover:bg-white/[0.08] hover:border-brand-purple/20 hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(147,51,234,0.1)]">
                <div className="w-20 h-20 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-brand-purple transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]">
                  <step.icon className="w-10 h-10 text-brand-lavender group-hover:text-white transition-colors duration-500" />
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-black text-brand-purple/50">0{idx + 1}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-lavender transition-colors">{step.title}</h3>
                </div>
                
                <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">
                  {step.description}
                </p>
                
                <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <CheckCircle2 className="w-6 h-6 text-brand-purple" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
