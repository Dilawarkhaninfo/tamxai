'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Send, Sparkles, BookOpen, GraduationCap, Laptop } from 'lucide-react'
import { useState } from 'react'

export default function ECoursesPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setEmail('')
    }, 1500)
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#020202] text-foreground flex flex-col items-center justify-center selection:bg-brand-purple/30 selection:text-white">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(to right, #696aac 1px, transparent 1px), linear-gradient(to bottom, #696aac 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
          }}
        />
        
        {/* Gradient Glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-brand-purple/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-brand-lavender/10 rounded-full blur-[150px]" 
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 py-20 flex flex-col items-center text-center">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors duration-300 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>

        {/* Icon Floating Bundle */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-20 h-20 bg-brand-purple/10 border border-brand-purple/20 rounded-2xl flex items-center justify-center backdrop-blur-sm relative z-10"
          >
            <GraduationCap className="w-10 h-10 text-brand-purple" />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 w-10 h-10 bg-brand-lavender/10 border border-brand-lavender/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 text-brand-lavender" />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <Laptop className="w-6 h-6 text-white/50" />
          </motion.div>
        </div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-brand-purple font-semibold tracking-[0.2em] text-sm uppercase mb-4">
            Educational Platform
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
              Coming
            </span>{" "}
            <span className="inline-block text-brand-purple relative">
              Soon
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 1 }}
                className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-brand-purple to-transparent"
              />
            </span>
          </h1>
          <p className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Elevate your skills with our upcoming world-class E-courses. 
            We're building an immersive learning experience tailored for the next generation of creators and tech leaders.
          </p>
        </motion.div>

        {/* Notification Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-md"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple/50 to-brand-lavender/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email for early access"
                  className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none placeholder:text-foreground/30"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  disabled={isSubmitting}
                  className="bg-brand-purple hover:bg-brand-purple-light text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-[0_0_20px_rgba(105,106,172,0.4)]"
                >
                  {isSubmitting ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <>
                      Notify Me
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex flex-col items-center gap-3 backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold">You're on the list!</h3>
              <p className="text-foreground/50 text-sm">We'll reach out to you as soon as we launch.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {[
            { icon: BookOpen, title: "Expert Content", desc: "Curated by industry leaders" },
            { icon: Sparkles, title: "Interactive UI", desc: "Gamified learning experience" },
            { icon: Laptop, title: "Lifetime Access", desc: "Learn at your own pace" }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center group cursor-default">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-brand-purple/10 group-hover:border-brand-purple/30 transition-all duration-500 group-hover:-translate-y-1">
                <feature.icon className="w-5 h-5 text-foreground/40 group-hover:text-brand-purple transition-colors" />
              </div>
              <h4 className="font-semibold mb-1 group-hover:text-white transition-colors">{feature.title}</h4>
              <p className="text-xs text-foreground/40">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CSS for custom mask if needed, but Tailwind handle most */}
    </main>
  )
}
