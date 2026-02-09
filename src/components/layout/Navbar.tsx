'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-primary/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="font-display text-xl font-bold tracking-[0.2em] uppercase text-white">
            TAMx
          </span>
        </Link>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
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
                  className="rounded-lg px-4 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-white"
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
