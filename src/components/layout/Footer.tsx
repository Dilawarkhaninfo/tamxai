import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'AI Solutions', href: '/services#ai' },
    { label: 'Web Development', href: '/services#web' },
    { label: 'E-commerce', href: '/services#ecommerce' },
    { label: 'Automation', href: '/services#automation' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Support', href: '/support' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-dark-primary">
      {/* Gradient top border */}
      <div className="h-px w-full gradient-purple-blue" />

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-display text-xl font-bold tracking-[0.2em] uppercase text-white">
                TAMx
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-text-secondary">
              Building digital solutions that matter. We transform businesses
              through AI-driven technology and innovation.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full glass-effect transition-colors hover:bg-brand-purple/20"
                  >
                    <Icon className="h-4 w-4 text-text-secondary" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-brand-purple-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-brand-purple-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple-light" />
                <div>
                  <p className="text-xs text-text-muted">Email</p>
                  <a
                    href="mailto:info@tamxai.com"
                    className="text-sm text-text-secondary transition-colors hover:text-brand-purple-light"
                  >
                    info@tamxai.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple-light" />
                <div>
                  <p className="text-xs text-text-muted">Phone</p>
                  <a
                    href="tel:+923155320243"
                    className="text-sm text-text-secondary transition-colors hover:text-brand-purple-light"
                  >
                    +92 315-5320243
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple-light" />
                <div>
                  <p className="text-xs text-text-muted">Location</p>
                  <p className="text-sm text-text-secondary">Islamabad, Pakistan</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row lg:px-8">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} TAMx. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-text-muted transition-colors hover:text-text-secondary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-text-muted transition-colors hover:text-text-secondary"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-text-muted transition-colors hover:text-text-secondary"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
