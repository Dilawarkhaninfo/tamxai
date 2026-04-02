'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ProductHero } from '@/components/product/ProductHero'
import { ChaosToControl } from '@/components/product/ChaosToControl'
import { EcosystemRoles } from '@/components/product/EcosystemRoles'
import { AutomationEngine } from '@/components/product/AutomationEngine'
import { ScaleGrowth } from '@/components/product/ScaleGrowth'
import { ProductCTA } from '@/components/product/ProductCTA'
import { AnimatedBackground } from '@/components/home/AnimatedBackground'

export default function EcommercePage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Cursor Glow Trail effect logic
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <main className="relative bg-background min-h-screen selection:bg-[#00D1FF]/30">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00D1FF] to-[#7A5CFF] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Global Cursor Glow Trail */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-[#00D1FF]/10 blur-[120px] rounded-full pointer-events-none z-0 hidden lg:block"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 150, mass: 0.5 }}
      />

      {/* Standard Animated Background */}
      <AnimatedBackground />

      <div className="relative z-10 w-full overflow-x-hidden">
        {/* Sections */}
        <ProductHero />
        
        <div className="space-y-0 relative">
          <ChaosToControl />
          <EcosystemRoles />
          <AutomationEngine />
          <ScaleGrowth />
          <ProductCTA />
        </div>
      </div>
    </main>
  )
}
