'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Bot, Package, BarChart3, Truck, CreditCard, Cpu, Zap } from 'lucide-react'
import Image from 'next/image'

const features = [
  { icon: Bot, label: 'AI Optimization', angle: 0, delay: 0.1 },
  { icon: Package, label: 'Auto Routing', angle: 90, delay: 0.2 },
  { icon: BarChart3, label: 'Analytics', angle: 180, delay: 0.3 },
  { icon: Truck, label: 'Logistics', angle: 270, delay: 0.4 },
]

export function AutomationEngine() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Parallax / Cursor Tilt Logic
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15])

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen py-32 md:py-48 flex flex-col items-center justify-center bg-black overflow-visible selection:bg-[#00D1FF]/30"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,209,255,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.04] scale-125" />
      </div>

      <div className="container-padding max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center max-w-4xl px-6 mb-24 sm:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tighter"
          >
            Powered by <span className="text-[#00D1FF]">Intelligent</span> <br />
            <span className="gradient-text">Automation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Advanced AI systems orchestrating the heartbeat of your business—from sourcing to global distribution.
          </motion.p>
        </div>

        {/* 3D Visual Section */}
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative w-full h-[400px] sm:h-[650px] flex items-center justify-center"
        >
          {/* Animated Central Neural Core Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-20 w-64 h-64 sm:w-[450px] sm:h-[450px] flex items-center justify-center group overflow-visible"
          >
            {/* Multi-layered Core Glows */}
            <div className="absolute inset-[-60px] bg-[#00D1FF]/10 blur-[80px] rounded-full scale-125 animate-pulse" />
            
            {/* High-Quality Automation Core Image */}
            <div className="relative w-full h-full rounded-[60px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,209,255,0.2)]">
              <Image 
                src="/images/ecommerce/automation.png"
                alt="Intelligence Automation Core"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Hub Overlay Decorative Elements */}
            <div className="absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none">
              <div className="w-32 h-32 bg-[#00D1FF]/20 blur-3xl animate-pulse rounded-full" />
              
              {/* Floating Data Fragments */}
              {mounted && Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotate: 360,
                    y: [0, -20, 0],
                    x: [0, 10, 0]
                  }}
                  transition={{ 
                    rotate: { duration: 15 + i * 2, repeat: Infinity, ease: 'linear' },
                    y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  className="absolute w-2 h-2 bg-white/40 skew-x-12"
                  style={{ 
                    left: `${50 + Math.cos(i * 45) * 60}%`, 
                    top: `${50 + Math.sin(i * 45) * 60}%` 
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Connected Data Scanning Lines */}
          <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full z-10 pointer-events-none stroke-[#00D1FF]/40 stroke-[1.5] fill-none overflow-visible">
            {mounted && features.map((f, i) => {
              const rad = (f.angle * Math.PI) / 180
              const tx = 300 + Math.cos(rad) * 280
              const ty = 300 + Math.sin(rad) * 280
              return (
                <g key={i}>
                  <line x1="300" y1="300" x2={tx} y2={ty} strokeDasharray="5,10" className="opacity-20" />
                  <motion.circle
                     r="4"
                     fill="white"
                     className="shadow-[0_0_15px_#fff]"
                     animate={{ cx: [300, tx], cy: [300, ty], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                     transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: f.delay }}
                  />
                  {/* Laser Scan Pulse */}
                  <motion.line
                    x1="300" y1="300" x2={tx} y2={ty}
                    stroke="#00D1FF"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: f.delay + 1 }}
                  />
                </g>
              )
            })}
          </svg>

          {/* Interactive Orbiting Nodes */}
          {features.map((feature, idx) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay + 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-30"
              style={{
                transform: `rotate(${feature.angle}deg) translate(280px) rotate(-${feature.angle}deg)`,
                translateZ: '100px'
              }}
            >
              <div className="group relative flex flex-col items-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white/5 border border-white/20 backdrop-blur-3xl flex items-center justify-center p-5 transition-all duration-500 group-hover:scale-110 group-hover:border-[#00D1FF]/60 group-hover:shadow-[0_0_40px_rgba(0,209,255,0.4)] shadow-2xl overflow-hidden">
                   {/* Internal Tech Grid Decal */}
                   <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 group-hover:opacity-30 transition-opacity" />
                   
                   <feature.icon className="w-10 h-10 text-[#00D1FF] group-hover:text-white transition-colors relative z-10" />
                   <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                </div>
                
                <div className="absolute top-[100px] px-6 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 pointer-events-none transition-all duration-500 shadow-2xl">
                   <span className="text-[11px] font-bold text-white tracking-[0.3em] uppercase whitespace-nowrap">{feature.label}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Volumetric Orbital Ring Decals */}
          <div className="absolute w-[650px] h-[650px] border border-white/[0.05] rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
          <div className="absolute w-[450px] h-[450px] border border-white/[0.03] rounded-full pointer-events-none" />
        </motion.div>
      </div>

      {/* Footer Decal */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
         <div className="flex items-center gap-12">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent" />
            <span className="text-[11px] font-bold tracking-[0.6em] text-[#00D1FF] uppercase whitespace-nowrap">Unified Intelligence Core</span>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent" />
         </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #00D1FF 0%, #7A5CFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .shadow-glow-blue {
          box-shadow: 0 0 30px #00D1FF;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
}
