'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PageSection } from '@/components/layout/PageSection'
import { Brain, Gamepad2, Globe } from 'lucide-react'

const features = [
  {
    title: 'AI-Powered Learning Paths',
    description: "Unlock a personalized learning journey with our advanced AI agents. Our intelligent system analyzes each student's strengths and weaknesses, building customized learning paths that enhance understanding, retention, and progress, at their own pace.",
    icon: Brain,
    gradient: 'from-[#2D97CE] to-[#5AB9B4]',
    delay: 0.1
  },
  {
    title: 'Gamified Learning',
    description: 'Dive into a world of interactive learning with our gamified approach! Earn badges, climb leaderboards, and unlock achievements as you progress through engaging lessons and activities.',
    icon: Gamepad2,
    gradient: 'from-[#696aac] to-[#a2a3e9]',
    delay: 0.2
  },
  {
    title: 'Immersive Metaverse Classrooms',
    description: 'Step into our interactive 3D classrooms. Join live lectures, collaborate seamlessly with peers, and participate in virtual seminars, all from anywhere. Experience learning without limits.',
    icon: Globe,
    gradient: 'from-[#c7c8f2] to-[#e3e3f8]',
    delay: 0.3
  }
]

export function LMSFeatures() {
  return (
    <PageSection id="lms-features" fullHeight={false} className="bg-dark-secondary relative z-20">
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Supercharge <span className="gradient-text">Your Learning</span> <br />
          with E-learning
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-1 w-24 bg-brand-purple mx-auto rounded-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
    </PageSection>
  )
}
