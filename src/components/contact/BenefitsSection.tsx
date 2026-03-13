'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Users } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'AI-First Development',
    description: 'We integrate advanced machine learning models into your core business logic for unprecedented efficiency.',
    color: 'from-purple-500/20 to-lavender-500/20',
    iconColor: 'text-brand-lavender'
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Architecture',
    description: 'Our systems are built to scale, ensuring security, reliability, and high availability for global deployments.',
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400'
  },
  {
    icon: Users,
    title: 'Dedicated Engineering Team',
    description: 'Work directly with world-class specialists committed to your project success from inception to launch.',
    color: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-rose-400'
  }
];

export function BenefitsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-dark-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-brand-lavender font-bold uppercase tracking-widest text-sm mb-4"
          >
            The TAMx Advantage
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Why Work With <span className="gradient-text">TAMx?</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${benefit.color} border border-white/5 backdrop-blur-xl relative group overflow-hidden shadow-2xl`}
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`p-4 rounded-2xl bg-dark-primary/50 ${benefit.iconColor} w-fit mb-8 shadow-large`}>
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
              <p className="text-text-secondary leading-relaxed opacity-70">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
