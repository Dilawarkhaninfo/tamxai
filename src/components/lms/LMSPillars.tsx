'use client'

import React, { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { PageSection } from '@/components/layout/PageSection'

const pillars = [
  {
    id: 'cognition',
    title: 'Cognition',
    subtitle: '(Intelligent Knowledge Delivery)',
    description: 'AI-powered personalization ensures the right content reaches the right learner at the right time, enhancing understanding and retention.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="22" fill="url(#pill_grad_1)"></rect>
        <g clipPath="url(#clip_pill_1)">
          <path d="M33.6627 22.0043H32.2258C32.0522 20.8175 31.243 19.821 30.1171 19.4076C31.1925 18.5372 31.6027 17.0837 31.141 15.7795C30.6794 14.4753 29.446 13.6036 28.0626 13.6036C26.6791 13.6036 25.4457 14.4754 24.9841 15.7795C24.5224 17.0837 24.9326 18.5372 26.008 19.4076C25.375 19.6402 24.8291 20.0623 24.4447 20.6164C23.8446 19.0789 22.5432 17.9225 20.9458 17.5075C22.905 16.307 23.8274 13.9504 23.2038 11.7389C22.58 9.52739 20.5623 8 18.2646 8C15.9668 8 13.9491 9.52739 13.3255 11.7389C12.7018 13.9504 13.6242 16.307 15.5835 17.5075C13.4891 18.0515 11.9601 19.8497 11.7599 22.0043H10.3365C9.0489 22.0059 8.00545 23.0493 8.00391 24.3369V33.6674C8.00545 34.955 9.0489 35.9985 10.3365 36H33.6627C34.9503 35.9985 35.9938 34.955 35.9953 33.6674V24.3369C35.9937 23.0493 34.9503 22.0059 33.6627 22.0043ZM25.7318 16.8725C25.7318 15.5843 26.7761 14.5399 28.0644 14.5399C29.3527 14.5399 30.397 15.5843 30.397 16.8725C30.397 18.1608 29.3527 19.2051 28.0644 19.2051C26.7768 19.2036 25.7333 18.1601 25.7318 16.8725ZM27.1313 20.1382H28.9974C30.1055 20.1396 31.0602 20.919 31.2834 22.0043H24.8454C25.0686 20.919 26.0233 20.1396 27.1313 20.1382ZM14.0686 13.1403C14.0686 10.8214 15.9485 8.94156 18.2674 8.94156C20.5863 8.94156 22.4661 10.8214 22.4661 13.1403C22.4661 15.4592 20.5863 17.339 18.2674 17.339C15.9495 17.3365 14.0712 15.4582 14.0686 13.1403ZM16.8678 18.2721H19.6669C21.8039 18.275 23.5986 19.8808 23.8382 22.0043H12.6966C12.9361 19.8808 14.7308 18.275 16.8678 18.2721ZM35.0622 33.6674C35.0622 34.4404 34.4356 35.067 33.6627 35.067H10.3365C9.5635 35.067 8.9369 34.4404 8.9369 33.6674V24.3369C8.9369 23.564 9.5635 22.9374 10.3365 22.9374H33.6627C34.4356 22.9374 35.0622 23.564 35.0622 24.3369V33.6674Z" fill="white"></path></g>
        <defs>
          <linearGradient id="pill_grad_1" x1="6.39106" y1="8.59375" x2="43.1228" y2="12.4676" gradientUnits="userSpaceOnUse"><stop stopColor="#a855f7"></stop><stop offset="1" stopColor="#6366f1"></stop></linearGradient>
          <clipPath id="clip_pill_1"><rect width="28" height="28" fill="white" transform="translate(8 8)"></rect></clipPath>
        </defs>
      </svg>
    )
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    subtitle: '(Learning Without Limits)',
    description: 'Seamless remote access ensures that institutions can provide education anytime, anywhere, making learning inclusive, scalable, and future-ready.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="22" fill="url(#pill_grad_2)"></rect>
        <g clipPath="url(#clip_pill_2)">
          <path d="M32.2331 20.2631C31.9487 20.1494 31.625 20.3594 31.625 20.6656V27.4163C31.0256 27.6569 30.3738 27.8713 29.6737 28.0638L25.0625 26.9088V25.6006C26.7862 24.6819 28.0725 23.015 28.4488 21.0156L29.1969 20.6394C29.3456 20.565 29.4375 20.4163 29.4375 20.25V16.3125C29.4375 16.0719 29.2406 15.875 29 15.875H28.6588C28.9956 13.9938 28.5231 12.0775 27.3244 10.5594C26.0337 8.93187 24.1087 8 22 8C21.0988 8 20.3419 8.20563 19.5412 8.42437C18.325 8.76125 16.9469 9.1375 14.6106 8.87937C14.4444 8.86187 14.2869 8.93188 14.1994 9.07187C14.1556 9.13313 13.215 10.6031 15.3019 12.4669C14.9738 13.0575 14.44 14.3438 14.8469 15.9056V15.9056ZM27.7706 15.875H25.0931" fill="white"></path>
          <path d="M15.4375 19.9787V16.75H28.5625V19.9787L27.1231 20.7006L23.4219 21.1119L22.2406 20.3244" fill="white"></path>
          <path d="M11.5 21.3481V27.0269C9.8025 26.1869 8.875 25.1894 8.875 24.1875" fill="white" strokeWidth="0.5"></path>
        </g>
        <defs>
          <linearGradient id="pill_grad_2" x1="6.39106" y1="8.59375" x2="43.1228" y2="12.4676" gradientUnits="userSpaceOnUse"><stop stopColor="#a855f7"></stop><stop offset="1" stopColor="#6366f1"></stop></linearGradient>
          <clipPath id="clip_pill_2"><rect width="28" height="28" fill="white" transform="translate(8 8)"></rect></clipPath>
        </defs>
      </svg>
    )
  },
  {
    id: 'affection',
    title: 'Affection',
    subtitle: '(Emotionally Engaging Learning)',
    description: 'Gamification, interactive challenges, and real-time feedback create an inspiring environment that keeps learners motivated and connected.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="22" fill="url(#pill_grad_3)"></rect>
        <g clipPath="url(#clip_pill_3)">
          <path d="M34.25 14.8713V12.9164C34.2355 12.2031 33.9517 11.5192 33.4472 11.0149C32.9428 10.5105 32.2589 10.2268 31.5455 10.2261H17.7222C17.0089 10.2269 16.325 10.5106 15.8206 11.0149" fill="white"></path>
          <path d="M13.9054 23.5369V21.2787H19.6437V23.5369C19.5183 27.2999 14.0302 27.2987 13.9054 23.5369Z" fill="white"></path>
          <path d="M22.3734 13.2046H26.8917" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round"></path>
        </g>
        <defs>
          <linearGradient id="pill_grad_3" x1="6.39106" y1="8.59375" x2="43.1228" y2="12.4676" gradientUnits="userSpaceOnUse"><stop stopColor="#a855f7"></stop><stop offset="1" stopColor="#6366f1"></stop></linearGradient>
          <clipPath id="clip_pill_3"><rect width="28" height="28" fill="white" transform="translate(8 8)"></rect></clipPath>
        </defs>
      </svg>
    )
  },
  {
    id: 'conation',
    title: 'Conation',
    subtitle: '(Action-Driven Mastery)',
    description: 'Metaverse classrooms and hands-on simulations provide immersive experiences, enabling learners to apply knowledge in real-world contexts.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="22" fill="url(#pill_grad_4)"></rect>
        <g clipPath="url(#clip_pill_4)">
          <path d="M30.75 27.1336V24.1875C30.75 24.0715 30.7039 23.9602 30.6219 23.8781C30.5398 23.7961 30.4285 23.75 30.3125 23.75H13.6875" fill="white"></path>
          <path d="M17.625 15.875C19.0145 15.874 20.3913 16.1391 21.6811 16.6559L21.8373 16.7185C21.9417 16.7604 22.0583 16.7604 22.1628 16.7185" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round"></path>
        </g>
        <defs>
          <linearGradient id="pill_grad_4" x1="6.39106" y1="8.59375" x2="43.1228" y2="12.4676" gradientUnits="userSpaceOnUse"><stop stopColor="#a855f7"></stop><stop offset="1" stopColor="#6366f1"></stop></linearGradient>
          <clipPath id="clip_pill_4"><rect width="28" height="28" fill="white" transform="translate(8 8)"></rect></clipPath>
        </defs>
      </svg>
    )
  }
]

export function LMSPillars() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for parallax
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x * 100)
    mouseY.set(y * 100)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <PageSection 
      id="pillars" 
      fullHeight={false} 
      className="bg-dark-primary py-32 relative overflow-hidden"
    >
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="container-padding w-full max-w-7xl mx-auto relative z-10"
      >
        {/* Atmosphere Blobs */}
        <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-brand-purple/5 blur-[150px] -z-10" />
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-brand-lavender/5 blur-[150px] -z-10" />

        {/* Header Block */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-24 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-brand-lavender" />
              <span className="text-brand-lavender font-bold tracking-widest uppercase text-sm">Strategic Excellence</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1]">
              Our Four <span className="gradient-text">Pillars of Smart</span> Learning
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="flex-shrink-0"
          >
            <img 
              src="https://edeviser.com/wp-content/uploads/2025/03/mic-and-star-circles.svg" 
              alt="Decoration" 
              className="w-32 h-auto drop-shadow-glow-purple"
            />
          </motion.div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center relative">
          {/* Left Column Pillars */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            {pillars.slice(0, 2).map((pillar, idx) => (
              <PillarCard key={pillar.id} pillar={pillar} index={idx} side="left" />
            ))}
          </div>

          {/* Central AI Nexus Hub */}
          <div className="order-1 lg:order-2 flex items-center justify-center py-12 lg:py-0 scale-75 md:scale-90 lg:scale-100">
            <AINexusHub mouseX={springX} mouseY={springY} />
          </div>

          {/* Right Column Pillars */}
          <div className="space-y-6 md:space-y-8 order-3">
            {pillars.slice(2).map((pillar, idx) => (
              <PillarCard key={pillar.id} pillar={pillar} index={idx + 2} side="right" />
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  )
}

function AINexusHub({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
  const rotateX = useTransform(mouseY, [-50, 50], [10, -10])
  const rotateY = useTransform(mouseX, [-50, 50], [-10, 10])

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="relative flex items-center justify-center min-h-[350px] md:min-h-[450px] lg:min-h-[550px] w-full max-w-[500px] mx-auto group"
    >
      {/* Central Radiance Core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] bg-brand-purple/20 blur-[80px] md:blur-[120px] rounded-full animate-pulse" />
        <div className="w-32 h-32 md:w-48 md:h-48 bg-brand-lavender/10 blur-[40px] md:blur-[60px] rounded-full absolute" />
      </div>

      {/* Holographic Layers */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none scale-[0.7] md:scale-100">
        {/* Outer Orbital - Slow Rotation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[350px] h-[350px] md:w-[480px] md:h-[480px] rounded-full border border-white/5"
        >
          <div className="absolute -top-1 left-1/2 w-2 h-2 bg-brand-purple rounded-full shadow-[0_0_20px_#a855f7]" />
        </motion.div>

        {/* Middle Complex Rings */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[320px] h-[320px] md:w-[380px] md:h-[380px]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
            <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="0.1" fill="none" strokeDasharray="1 10" />
            <circle cx="50" cy="50" r="40" stroke="url(#nexus_grad)" strokeWidth="0.5" fill="none" strokeDasharray="5 15" />
            <defs>
              <linearGradient id="nexus_grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Inner Tech Ring with "Comets" */}
        <div className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border border-brand-lavender/20 rounded-full"
          >
            <motion.div 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 right-1/4 w-12 h-[1px] bg-gradient-to-l from-brand-lavender to-transparent shadow-[0_0_15px_#e9d5ff]" 
            />
          </motion.div>
        </div>

        {/* The Heart of the Nexus */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotateZ: [0, 5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex items-center justify-center"
        >
          {/* Nested Geometric Pulse */}
          <div className="absolute w-56 h-56 rounded-full bg-brand-purple/5 backdrop-blur-3xl border border-white/10" />
          
          {/* AI Sphere */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full relative overflow-hidden flex items-center justify-center shadow-2xl shadow-brand-purple/40">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/60 via-indigo-600/40 to-transparent" />
            
            {/* Holographic Grid Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:10px_10px]" />
            
            {/* Center Glowing Logo/Icon Substitute */}
            <motion.div
              animate={{ 
                filter: ['drop-shadow(0 0 5px #a855f7)', 'drop-shadow(0 0 20px #a855f7)', 'drop-shadow(0 0 5px #a855f7)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative z-10"
            >
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v10M12 12l-4-4M12 12l4-4M18 12a6 6 0 11-12 0 6 6 0 0112 0z" />
                <path d="M12 22v-6M12 16l-4 4M12 16l4 4" />
              </svg>
            </motion.div>

            {/* Energetic Ripples */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: 'easeOut' }}
                className="absolute w-full h-full border border-white/20 rounded-full"
              />
            ))}
          </div>

          {/* orbital particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: { duration: 10 + i * 2, repeat: Infinity, ease: 'linear' },
                scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="absolute w-1.5 h-1.5 bg-brand-lavender rounded-full blur-[1px]"
              style={{
                transform: `rotate(${i * 72}deg) translateX(100px)`
              }}
            />
          ))}
        </motion.div>
      </div>

    </motion.div>
  )
}

function PillarCard({ pillar, index, side }: { pillar: any, index: number, side: 'left' | 'right' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl group hover:bg-white/10 transition-all duration-500"
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="p-1 rounded-full bg-black/20 group-hover:scale-110 transition-transform duration-500">
          {pillar.icon}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-lavender transition-colors duration-300">
        {pillar.title} <span className="text-white/40 block text-lg font-medium mt-1">{pillar.subtitle}</span>
      </h3>
      
      <p className="text-text-secondary leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        {pillar.description}
      </p>
    </motion.div>
  )
}
