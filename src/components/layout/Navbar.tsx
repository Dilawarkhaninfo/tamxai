'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, Layout, Code2, Rocket, Brain, Stethoscope, Cpu, ChevronDown } from 'lucide-react'

const services = [
  {
    title: 'Product Design',
    icon: Layout,
    items: ['User Research & Strategy', 'UX Flows & Wireframes', 'UI Systems & Prototypes', 'Design Ops & Dev Handoff']
  },
  {
    title: 'Development',
    icon: Code2,
    items: ['Frontend Platforms (React / Next)', 'Backend APIs & Microservices (Node)', 'Mobile & Cross-platform (Flutter)', 'CI/CD & Cloud Ops (Docker)']
  },
  {
    title: 'GTM Strategy',
    icon: Rocket,
    items: ['ICP & Segmentation', 'Positioning, Narrative & Messaging', 'Pricing & Packaging', 'Demand Gen & Content Engine']
  },
  {
    title: 'AI Development',
    icon: Brain,
    items: ['LLM Apps & Agents (RAG / Tools)', 'Fine-tuning & Prompt Optimization', 'Model Evals, Guardrails & Monitoring', 'Vision, NLP & Speech Pipelines']
  },
  {
    title: 'Healthcare Apps',
    icon: Stethoscope,
    items: ['HIPAA & PHI Compliance', 'Telehealth & Patient Portals', 'EHR Integrations (FHIR / HL7)', 'Audit Logging & Access Controls']
  },
  {
    title: 'IoT Development',
    icon: Cpu,
    items: ['Embedded Firmware & Drivers', 'BLE / Zigbee / LoRA Connectivity', 'MQTT Ingestion & Stream Processing', 'Edge AI & OTA Update Pipelines']
  }
]

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services', hasDropdown: true },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark-primary/40 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <span className="font-display text-2xl font-bold tracking-[0.3em] uppercase text-white transition-all duration-300 group-hover:tracking-[0.4em]">
            TAM<span className="text-brand-purple">x</span>
          </span>
        </Link>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative group"
              onMouseEnter={() => link.hasDropdown && setIsServicesOpen(true)}
              onMouseLeave={() => link.hasDropdown && setIsServicesOpen(false)}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 py-2 ${
                  pathname === link.href ? 'text-brand-lavender' : 'text-text-secondary hover:text-brand-lavender'
                }`}
              >
                <span>{link.label}</span>
                {link.hasDropdown && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ 
                      opacity: isServicesOpen ? 1 : 0, 
                      width: isServicesOpen ? 'auto' : 0,
                      marginLeft: isServicesOpen ? 4 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </motion.div>
                )}
                <span className={`absolute -bottom-1 left-0 w-full h-[1.5px] bg-brand-lavender rounded-full origin-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>

              {/* Megamenu */}
              {link.hasDropdown && (
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -20, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] bg-[#0F172A]/90 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.7)] z-50 overflow-hidden"
                    >
                      {/* Left-to-right reveal overlay */}
                      <motion.div
                         initial={{ scaleX: 1 }}
                         animate={{ scaleX: 0 }}
                         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                         className="absolute inset-0 bg-brand-purple/10 origin-right z-10 pointer-events-none"
                      />

                      <div className="grid grid-cols-3 gap-4 relative z-0">
                        {services.map((service, idx) => (
                          <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 + 0.1 }}
                            className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-purple/10 group/card"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-brand-lavender transition-all duration-500 group-hover/card:scale-110 group-hover/card:bg-brand-purple/20 group-hover/card:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                <service.icon className="w-5 h-5" />
                              </div>
                              <h3 className="text-lg font-bold text-white group-hover/card:text-brand-lavender transition-colors">
                                {service.title}
                              </h3>
                            </div>
                            <ul className="flex flex-col gap-2">
                              {service.items.map((item) => (
                                <li 
                                  key={item}
                                  className="text-[13px] text-text-secondary group-hover/card:text-text-primary transition-colors flex items-center gap-2"
                                >
                                  <div className="w-1 h-1 rounded-full bg-brand-purple/30 group-hover/card:bg-brand-purple transition-colors" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button - Right */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="group relative flex items-center gap-2 rounded-full border border-white/20 bg-white px-5 py-2.5 text-sm font-medium text-dark-primary transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-dark-primary/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    pathname === link.href ? 'bg-white/10 text-white' : 'text-text-secondary hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-white/10">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-dark-primary transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
