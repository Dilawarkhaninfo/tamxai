'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LMSHero } from '@/components/lms/LMSHero'
import { LMSFeatures } from '@/components/lms/LMSFeatures'
import { LMSCharacters } from '@/components/lms/LMSCharacters'
import { LMSGrowth } from '@/components/lms/LMSGrowth'
import { LMSRewards } from '@/components/lms/LMSRewards'
import { LMSProfessor } from '@/components/lms/LMSProfessor'
import { LMSAgents } from '@/components/lms/LMSAgents'
import { CTASection } from '@/components/home/CTASection'
import { AnimatedBackground } from '@/components/home/AnimatedBackground'

export default function LMSPage() {
  return (
    <main className="relative bg-background min-h-screen">
      {/* Background stays static for standard pages unless specified */}
      <AnimatedBackground />

      <div className="relative z-10 w-full overflow-x-hidden">
        {/* Hero Section */}
        <LMSHero />

        {/* Features & Roadmap Sections */}
        <div className="relative z-20 space-y-0">
          <LMSFeatures />
          <LMSGrowth />
          <LMSCharacters />
          <LMSRewards />
          <LMSProfessor />
          <LMSAgents />
        </div>

        {/* Final CTA Section */}
        <div className="py-20 md:py-32 container-padding w-full max-w-7xl mx-auto relative z-20">
          <CTASection />
        </div>
      </div>
    </main>
  )
}
