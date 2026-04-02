'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Bot, Package, BarChart3, Truck, CreditCard, Cpu, Zap } from 'lucide-react'
import Image from 'next/image'

const features = [
  { icon: Bot, label: 'AI Strategy', description: 'Advanced neural models optimizing your multi-channel sales strategy.', color: '#00D1FF' },
  { icon: Package, label: 'Supply Chain', description: 'Automated procurement and inventory levels across global warehouses.', color: '#7A5CFF' },
  { icon: BarChart3, label: 'Predictive ROI', description: 'Real-time analytics predicting demand and profit margins with 99% accuracy.', color: '#00D1FF' },
  { icon: Truck, label: 'Fulfilment Ops', description: 'Smart routing and logistics orchestration for 24-hour global delivery.', color: '#7A5CFF' },
]

export function AutomationEngine() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Subtle Parallax Tilt
  const mouseX = useSpring(0, { stiffness: 40, damping: 30 })
  const mouseY = useSpring(0, { stiffness: 40, damping: 30 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scrollTranslateY = useTransform(scrollYProgress, [0, 1], [30, -30])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen py-24 md:py-32 flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* High-End Background - Rays and Grid from Services Page */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,209,255,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
      </div>

      <div className="container-padding max-w-7xl mx-auto w-full relative z-10">
        {/* Header Section - Matches "Our Services" Style */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-24 justify-between items-end mb-24 md:mb-32">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-6"
            >
              The Intelligent <br />
              <span className="gradient-text">Automation Hub</span>
            </motion.h2>
            <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: '80px' }}
               className="h-1.5 bg-[#00D1FF] rounded-full shadow-[0_0_20px_#00D1FF]"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:max-w-sm"
          >
            <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">
              We replace fragmented manual workflows with a unified, code-driven engine that orchestrates your entire ecosystem in real-time.
            </p>
          </motion.div>
        </div>

        {/* Professional SaaS Layout - Grid + Core */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Features */}
          <div className="lg:col-span-3 space-y-6">
            {features.slice(0, 2).map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-[#00D1FF]/50 transition-colors">
                  <item.icon className="w-6 h-6 text-[#00D1FF]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.label}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Central 3D Dashboard Core */}
          <div className="lg:col-span-6 relative perspective-1000">
            <motion.div
              style={{ 
                rotateX: useTransform(mouseY, [-0.5, 0.5], [10, -10]), 
                rotateY: useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
                y: scrollTranslateY,
                transformStyle: 'preserve-3d'
              }}
              className="relative w-full aspect-square flex items-center justify-center"
            >
              {/* Outer Glows */}
              <div className="absolute inset-0 bg-[#00D1FF]/5 blur-[100px] rounded-full animate-pulse" />
              
              {/* Main Professional Core Framework */}
              <div className="relative z-10 w-full h-full p-4 p-px bg-gradient-to-tr from-white/10 via-white/5 to-transparent rounded-[60px] shadow-2xl">
                <div className="relative w-full h-full rounded-[58px] overflow-hidden bg-black/60 border border-white/10 backdrop-blur-3xl group">
                  {/* Subtle Technical Grid HUD overlay */}
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] scale-150 pointer-events-none" />
                  
                  {/* The AI Core Asset */}
                  <Image 
                    src="/images/ecommerce/automation_dashboard.png"
                    alt="Autonomous Core Dashboard"
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                    priority
                  />

                  {/* Glassmorphism Bottom Card HUD */}
                  <div className="absolute bottom-8 left-8 right-8 p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl flex items-center justify-between pointer-events-none">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center animate-pulse">
                           <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <div>
                           <div className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase mb-1">Status: Stable</div>
                           <div className="text-lg font-bold text-white leading-none">CORE ENGINE ACTIVE</div>
                        </div>
                     </div>
                     <div className="h-10 w-px bg-white/10" />
                     <div className="text-right">
                        <div className="text-[10px] font-bold tracking-widest text-[#00D1FF] uppercase mb-1">Efficiency</div>
                        <div className="text-xl font-bold text-white leading-none">99.8%</div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Data Flow Pulse Lines - Simplified */}
              {mounted && (
                <div className="absolute inset-0 pointer-events-none z-20">
                  <svg viewBox="0 0 600 600" className="w-full h-full">
                     <motion.path
                        d="M 100 300 Q 300 100 500 300"
                        stroke="url(#saasFlow)"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.1 }}
                        viewport={{ once: true }}
                     />
                     <defs>
                        <linearGradient id="saasFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                           <stop offset="0%" stopColor="#00D1FF" stopOpacity="0" />
                           <stop offset="50%" stopColor="#00D1FF" />
                           <stop offset="100%" stopColor="#00D1FF" stopOpacity="0" />
                        </linearGradient>
                     </defs>
                  </svg>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column Features */}
          <div className="lg:col-span-3 space-y-6">
            {features.slice(2, 4).map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-[#7A5CFF]/50 transition-colors">
                  <item.icon className="w-6 h-6 text-[#7A5CFF]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.label}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Footer Technical Decal */}
        <div className="mt-24 md:mt-32 pt-12 border-t border-white/5 flex flex-wrap gap-12 items-center justify-center opacity-30 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-3">
             <Cpu className="w-5 h-5 text-[#00D1FF]" />
             <span className="text-[10px] font-bold tracking-[0.4em] text-white uppercase mt-1">Autonomous Processor</span>
          </div>
          <div className="flex items-center gap-3">
             <Zap className="w-5 h-5 text-[#7A5CFF]" />
             <span className="text-[10px] font-bold tracking-[0.4em] text-white uppercase mt-1">Real-Time Sync</span>
          </div>
          <div className="flex items-center gap-3">
             <Bot className="w-5 h-5 text-[#00D1FF]" />
             <span className="text-[10px] font-bold tracking-[0.4em] text-white uppercase mt-1">Neural Optimization</span>
          </div>
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
