'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Submit your request',
    description: 'Provide your project details using our secure inquiry form.'
  },
  {
    number: '02',
    title: 'Strategy consultation',
    description: 'Our lead architects review your vision and define the technical scope.'
  },
  {
    number: '03',
    title: 'Technical planning',
    description: 'We design a custom roadmap with milestones and resource allocation.'
  },
  {
    number: '04',
    title: 'Project kickoff',
    description: 'Development begins with our dedicated engineering squad.'
  }
];

export function ProcessSection() {
  return (
    <section className="py-24 relative bg-dark-primary border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-brand-lavender font-bold uppercase tracking-widest text-sm mb-4"
            >
              Our Workflow
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              How We Start <br /> <span className="gradient-text">Your Project</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-text-secondary max-w-sm opacity-60"
          >
            A systematic, transparent approach to transforming high-level concepts into production-ready intelligence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative group hover:border-brand-lavender/30 transition-all duration-500"
            >
              <div className="text-5xl font-black text-white/5 mb-8 group-hover:text-brand-lavender/10 transition-colors">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10 group-hover:text-brand-lavender transition-colors">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed opacity-60 relative z-10">
                {step.description}
              </p>
              
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="size-2 rounded-full bg-brand-lavender shadow-glow-lavender" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
