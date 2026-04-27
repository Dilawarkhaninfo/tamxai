'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PageSection } from '@/components/layout/PageSection'
import { Brain, Gamepad2, Globe } from 'lucide-react'

const features = [
  {
    title: 'Adaptive Learning Intelligence',
    description: "Leverage AI-driven cognitive mapping to create hyper-personalized learning journeys that adapt in real-time to each learner's unique pace and proficiency.",
    icon: Brain,
    gradient: 'from-[#2D97CE] to-[#5AB9B4]',
    delay: 0.1
  },
  {
    title: 'Unified Institutional Ecosystem',
    description: 'Consolidate your entire educational infrastructure into one high-performance platform, streamlining administration and enhancing collaboration across all departments.',
    icon: Gamepad2,
    gradient: 'from-[#696aac] to-[#a2a3e9]',
    delay: 0.2
  },
  {
    title: 'Immersive Virtual Classrooms',
    description: 'Bridge the gap between physical and digital with metaverse-ready classrooms and high-fidelity interactive media that redefine student engagement and knowledge retention.',
    icon: Globe,
    gradient: 'from-[#c7c8f2] to-[#e3e3f8]',
    delay: 0.3
  }
]
 
export function LMSFeatures() {
  return (
    <PageSection id="lms-features" fullHeight={false} className="bg-dark-secondary relative z-20 py-16 md:py-32 scroll-mt-32">
      <div className="container-padding w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Engineered for <span className="gradient-text">Educational Excellence</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 w-24 bg-brand-purple mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: feature.delay }}
            whileHover={{ y: -10 }}
            className="group relative p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-purple/30 transition-all duration-500 overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
            
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-8 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
              <feature.icon className="w-full h-full text-white" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-brand-lavender transition-colors duration-300">
              {feature.title}
            </h3>
            
            <p className="text-text-secondary leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              {feature.description}
            </p>

            {/* Bottom Glow Line */}
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} w-0 group-hover:w-full transition-all duration-700`} />
          </motion.div>
        ))}
        </div>
      </div>
    </PageSection>
  )
}
