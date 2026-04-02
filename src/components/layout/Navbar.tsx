'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import {
  Paintbrush, Code, TrendingUp, Brain, Stethoscope, Cpu,
  ShoppingCart, GraduationCap, LayoutGrid
} from 'lucide-react'
import { usePreloader } from '@/context/PreloaderContext'

const services = [
  {
    title: 'Product Design',
    icon: Paintbrush,
    href: '/services',
    desc: 'End-to-end product design — from research to polished UI systems.',
    items: ['User Research & Strategy', 'UX Flows & Wireframes', 'UI Systems & Prototypes', 'Design Ops & Dev Handoff']
  },
  {
    title: 'Development',
    icon: Code,
    href: '/services',
    desc: 'Robust, scalable products across web and mobile platforms.',
    items: ['Frontend Platforms (React / Next)', 'Backend APIs & Microservices', 'Mobile & Cross-platform (Flutter)', 'CI/CD & Cloud Ops (Docker)']
  },
  {
    title: 'GTM Strategy',
    icon: TrendingUp,
    href: '/services',
    desc: 'Go-to-market plans that drive growth and market fit.',
    items: ['ICP & Segmentation', 'Positioning & Messaging', 'Pricing & Packaging', 'Demand Gen & Content Engine']
  },
  {
    title: 'AI Development',
    icon: Brain,
    href: '/services',
    desc: 'Intelligent solutions powered by cutting-edge AI & ML.',
    items: ['LLM Apps & Agents (RAG / Tools)', 'Fine-tuning & Prompt Optimization', 'Model Evals & Guardrails', 'Vision, NLP & Speech Pipelines']
  },
  {
    title: 'Healthcare Apps',
    icon: Stethoscope,
    href: '/services',
    desc: 'Secure, compliant healthcare technology solutions.',
    items: ['HIPAA & PHI Compliance', 'Telehealth & Patient Portals', 'EHR Integrations (FHIR / HL7)', 'Audit Logging & Access Controls']
  },
  {
    title: 'IoT Development',
    icon: Cpu,
    href: '/services',
    desc: 'Connected device ecosystems from firmware to cloud.',
    items: ['Embedded Firmware & Drivers', 'BLE / Zigbee / LoRa', 'MQTT & Stream Processing', 'Edge AI & OTA Pipelines']
  }
]

const products = [
  {
    title: 'Ecommerce',
    icon: ShoppingCart,
    href: '/product/ecommerce',
    desc: 'Full-featured ecommerce platform with inventory management, payments, and analytics.',
  },
  {
    title: 'LMS',
    icon: GraduationCap,
    href: '/lms',
    desc: 'Learning management system with E-Courses, assessments, and progress tracking.',
  },
  {
    title: 'CRM',
    icon: LayoutGrid,
    href: '/product',
    desc: 'Customer relationship management system to streamline your sales and support.',
  },
]

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services', hasDropdown: true, dropdownId: 'services' as const },
  { href: '/product', label: 'Product', hasDropdown: true, dropdownId: 'product' as const },
  { href: '/courses', label: 'E-Courses' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Pricing' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isProductOpen, setIsProductOpen] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const navRef = useRef<HTMLUListElement>(null)
  const linkRefs = useRef<(HTMLLIElement | null)[]>([])
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const productTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const { finished } = usePreloader()
  const isHomepage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getIndicatorStyle = useCallback(() => {
    if (hoveredIdx === null || !linkRefs.current[hoveredIdx] || !navRef.current) {
      return { opacity: 0, width: '0px', transform: 'translateX(0px)' }
    }
    const el = linkRefs.current[hoveredIdx]!
    const nav = navRef.current
    const elRect = el.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()
    return {
      opacity: 1,
      width: `${elRect.width - 8}px`,
      height: '34px',
      transform: `translateX(${elRect.left - navRect.left + 4}px)`,
    }
  }, [hoveredIdx])

  const openDropdown = useCallback((id: 'services' | 'product') => {
    if (id === 'services') {
      if (servicesTimeoutRef.current) { clearTimeout(servicesTimeoutRef.current); servicesTimeoutRef.current = null }
      setIsServicesOpen(true)
      setIsProductOpen(false)
    } else {
      if (productTimeoutRef.current) { clearTimeout(productTimeoutRef.current); productTimeoutRef.current = null }
      setIsProductOpen(true)
      setIsServicesOpen(false)
    }
  }, [])

  const closeDropdown = useCallback((id: 'services' | 'product') => {
    if (id === 'services') {
      servicesTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 150)
    } else {
      productTimeoutRef.current = setTimeout(() => setIsProductOpen(false), 150)
    }
  }, [])

  if (isHomepage && !finished) return null

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 z-50 w-full py-4 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
      id="header"
    >
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isScrolled ? 1 : 0.8,
          background: 'linear-gradient(to bottom, var(--background) 20%, transparent 100%)'
        }}
      />

      <div className="relative z-20 mx-auto" style={{ width: 'calc(100% - 60px)', maxWidth: '1400px' }}>
        <div className="flex justify-between items-center relative">
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <Image
              src="/Logo_tamx.png"
              alt="TAMx Logo"
              width={32}
              height={32}
              className="w-7 h-7 lg:w-8 lg:h-8"
              priority
            />
            <Image
              src="/logo_name.png"
              alt="TAMx"
              width={100}
              height={24}
              className="h-5 lg:h-6 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <ul
              ref={navRef}
              className="flex items-center text-sm relative"
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {navLinks.map((link, idx) => (
                <li
                  key={link.href}
                  ref={(el) => { linkRefs.current[idx] = el }}
                  className="relative"
                  onMouseEnter={() => {
                    setHoveredIdx(idx)
                    if (link.hasDropdown && link.dropdownId) openDropdown(link.dropdownId)
                  }}
                  onMouseLeave={() => {
                    if (link.hasDropdown && link.dropdownId) closeDropdown(link.dropdownId)
                  }}
                >
                  {link.hasDropdown ? (
                    <button className="px-4 lg:px-6 py-2 flex items-center gap-1 cursor-pointer text-foreground/70 hover:text-foreground transition-colors duration-200">
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${(link.dropdownId === 'services' && isServicesOpen) || (link.dropdownId === 'product' && isProductOpen) ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`px-4 lg:px-6 py-2 flex whitespace-nowrap transition-colors duration-200 ${
                        pathname === link.href ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Product dropdown — rendered inside li for correct centering */}
                  {link.dropdownId === 'product' && (
                    <AnimatePresence>
                      {isProductOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
                        >
                          <div className="w-[340px] bg-zinc-950 border border-foreground/20 rounded-xl overflow-hidden">
                            <div className="p-3">
                              {products.map((product) => (
                                <Link
                                  key={product.title}
                                  href={product.href}
                                  className="flex items-start gap-3 px-3 py-2.5 rounded-lg border border-transparent transition hover:bg-white/5 hover:border-white/5 cursor-pointer group/item text-foreground no-underline"
                                  onClick={() => setIsProductOpen(false)}
                                >
                                  <div className="mt-0.5 text-white/90">
                                    <product.icon className="w-5 h-5" />
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    <h3 className="text-sm font-semibold">{product.title}</h3>
                                    <p className="text-xs text-pretty leading-snug opacity-60">
                                      {product.desc}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}

              <div
                className="absolute top-1/2 -translate-y-1/2 bg-white/[0.07] rounded-full pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={getIndicatorStyle()}
              />
            </ul>
          </nav>

          <Link href="/contact" className="hidden md:block">
            <div className="border border-foreground/30 font-medium bg-white/3 backdrop-blur-xl cursor-pointer p-0.5 lg:p-1 h-10 lg:h-12 rounded-full hover:scale-105 hover:border-foreground/50 duration-300 text-sm group">
              <div className="relative pl-3 lg:pl-5 pr-14 lg:pr-16 flex items-center h-full">
                <span className="text-foreground font-light text-[13px] lg:text-sm">Contact</span>
                <div className="absolute right-0 top-0 bg-foreground w-9 lg:w-10 h-full rounded-full text-background flex items-center justify-center transition-all duration-300 group-hover:bg-brand-purple group-hover:text-foreground">
                  <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
              </div>
            </div>
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 flex flex-col justify-center items-center gap-3 cursor-pointer z-50"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`w-full h-0.5 bg-foreground duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`w-full h-0.5 bg-foreground duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Services Mega Dropdown — anchored to header, not to the li */}
      <AnimatePresence>
        {isServicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 hidden md:block"
            onMouseEnter={() => openDropdown('services')}
            onMouseLeave={() => closeDropdown('services')}
          >
            <div className="w-[680px] lg:w-[860px] xl:w-[980px] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a14]/95 backdrop-blur-2xl shadow-2xl shadow-black/40">
              <div className="p-2">
                <div className="grid grid-cols-3 gap-1">
                  {services.map((service) => (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="group/card p-4 rounded-xl hover:bg-white/4 transition-all duration-200 relative"
                    >
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-9 h-9 rounded-lg bg-white/6 border border-white/6 flex items-center justify-center text-foreground/60 group-hover/card:text-brand-purple group-hover/card:border-brand-purple/30 group-hover/card:bg-brand-purple/10 transition-all duration-200">
                          <service.icon className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[13px] font-semibold text-foreground mb-1 group-hover/card:text-white transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-[11px] leading-relaxed text-foreground/40 mb-2.5">
                            {service.desc}
                          </p>
                          <div className="flex flex-col gap-1">
                            {service.items.map((item) => (
                              <span key={item} className="text-[11px] text-foreground/30 group-hover/card:text-foreground/50 transition-colors">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/6 px-5 py-3 flex items-center justify-between">
                <span className="text-[12px] text-foreground/40">Explore all our capabilities</span>
                <Link
                  href="/services"
                  className="text-[12px] text-brand-purple hover:text-foreground transition-colors flex items-center gap-1 font-medium"
                >
                  View All Services
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-foreground/5 mt-4"
          >
            <div className="flex flex-col gap-1 px-8 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-3 text-base transition-colors ${
                    pathname === link.href ? 'bg-foreground/10 text-foreground' : 'text-foreground/60 hover:bg-foreground/5 hover:text-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-foreground/10">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-full border border-foreground/40 bg-background/20 backdrop-blur-xl px-6 py-3 text-sm font-light text-foreground transition-all hover:scale-105 duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Contact</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
