Bilkul yar! Yahan dono files ka complete content hai:

DESIGN.MD - TAMx Project
markdown# TAMx Design System
**Technology & AI-Driven Solutions Platform**

Version: 1.0  
Last Updated: February 2026  
Reference: Antimatter AI (antimatter.ai)

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Layout & Grid](#layout--grid)
5. [Components](#components)
6. [Animations & Interactions](#animations--interactions)
7. [Responsive Design](#responsive-design)
8. [Accessibility](#accessibility)

---

## Design Philosophy

### Core Principles

- **Futuristic Minimalism**: Clean layouts with subtle complexity
- **Technology-Forward**: AI and digital transformation aesthetic
- **Premium Feel**: High-end, professional presentation
- **User-Centric**: Intuitive navigation and clear information hierarchy

### Visual Theme

- Dark mode primary (deep navy/black backgrounds)
- Purple-to-blue gradient accents
- Glass morphism effects
- Particle/dot matrix patterns
- Smooth animations and transitions
- Floating card layouts

---

## Color System

### Primary Palette

**Purple Spectrum (Brand Identity)**

```
Primary Purple:   #9333EA
Light Purple:     #A855F7
Lavender:         #C084FC
Purple Glow:      #9333EA with 40% opacity
```

**Blue Spectrum (Technology)**

```
Primary Blue:     #3B82F6
Light Blue:       #60A5FA
Cyan Accent:      #06B6D4
Blue Glow:        #3B82F6with 30% opacity
```

### Neutral Palette

**Backgrounds**

```
Primary Dark:     #0F172A (slate-900)
Secondary Dark:   #1E293B (slate-800)
Card Background:  #1E293B with 60% opacity
Overlay:          #000000 with 80% opacity
```

**Text Colors**

```
Primary Text:     #F1F5F9 (slate-100)
Secondary Text:   #94A3B8 (slate-400)
Muted Text:       #64748B (slate-500)
White:            #FFFFFF
```

### Gradient Definitions

**Hero Gradient (Top to Bottom)**

```css
background: linear-gradient(180deg, #1e293b 0%, #0f172a 50%, #000000 100%);
```

**Purple-Blue Gradient**

```css
background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%);
```

**Card Glow Effect**

```css
box-shadow:
  0 0 40px rgba(147, 51, 234, 0.3),
  0 0 80px rgba(59, 130, 246, 0.2);
```

---

## Typography

### Font Families

**Primary Font: Inter**

- Headings: 600-700 weight
- Body: 400-500 weight
- Links/Buttons: 500-600 weight

**Accent Font: Space Grotesk** (for hero titles)

- Display headings: 700 weight

**Monospace: JetBrains Mono** (for code/tech elements)

- Tech labels: 400 weight

### Type Scale

```
Display (Hero):      48px - 72px (3rem - 4.5rem)
H1:                  36px - 48px (2.25rem - 3rem)
H2:                  30px - 36px (1.875rem - 2.25rem)
H3:                  24px - 30px (1.5rem - 1.875rem)
H4:                  20px - 24px (1.25rem - 1.5rem)
Body Large:          18px - 20px (1.125rem - 1.25rem)
Body:                16px (1rem)
Small:               14px (0.875rem)
Caption:             12px (0.75rem)
```

### Line Heights

```
Display:             1.1
Headings:            1.2
Body:                1.6
Small Text:          1.5
```

### Font Weights

```
Light:               300
Regular:             400
Medium:              500
Semibold:            600
Bold:                700
```

---

## Layout & Grid

### Container Sizes

```
Mobile:              100% (with 16px padding)
Tablet:              768px
Desktop:             1024px
Large Desktop:       1280px
Extra Large:         1536px
```

### Grid System

- **12-column grid** for desktop
- **6-column grid** for tablet
- **4-column grid** for mobile
- **Gap**: 24px (1.5rem)

### Spacing Scale

```
xs:     4px   (0.25rem)
sm:     8px   (0.5rem)
md:     16px  (1rem)
lg:     24px  (1.5rem)
xl:     32px  (2rem)
2xl:    48px  (3rem)
3xl:    64px  (4rem)
4xl:    96px  (6rem)
5xl:    128px (8rem)
```

### Section Spacing

```
Section Padding (Y):     80px - 120px
Component Margin:        40px - 60px
Card Padding:            24px - 32px
```

---

## Components

### 1. Navigation Bar

**Structure:**

- Fixed top position
- Transparent background with blur
- Backdrop filter: blur(12px)
- Border bottom: 1px solid rgba(255,255,255,0.1)

**Elements:**

- Logo (left): 32px height
- Nav links (center): 16px, medium weight
- CTA button (right): Primary purple gradient

**States:**

- Default: Transparent with blur
- Scrolled: Slight background opacity increase
- Hover: Links scale 1.05, color shift to purple

---

### 2. Hero Section

**Layout:**

- Full viewport height (min-height: 100vh)
- Centered content
- Particle background effect
- Gradient overlay

**Components:**

- Main heading: 48px-72px, Space Grotesk, bold
- Subheading: 18px-20px, regular weight, muted color
- CTA buttons: Primary + Secondary
- Stats bar: 3-4 metrics with animated counters

**Background Effect:**

- Animated particle dots
- Purple/blue glow effects
- Subtle gradient movement

---

### 3. Service Cards (Bento Grid Layout)

**Card Structure:**

- Glass morphism background
- Border: 1px solid rgba(255,255,255,0.1)
- Border radius: 16px
- Padding: 24px-32px
- Backdrop filter: blur(8px)

**Card Variants:**

```
Small:      1 column x 1 row
Medium:     2 columns x 1 row
Large:      2 columns x 2 rows
Tall:       1 column x 2 rows
```

**Card Content:**

- Icon/Number: Top left, 48px
- Title: 24px, semibold
- Description: 16px, muted
- Arrow icon: Bottom right
- Hover: Lift effect, glow increase

**Hover Effect:**

```css
transform: translateY(-8px);
box-shadow: 0 20px 60px rgba(147, 51, 234, 0.4);
```

---

### 4. Feature Sections

**Layout Pattern:**

- Alternating left-right content
- 50/50 split on desktop
- Stack on mobile

**Content Side:**

- Heading: 36px-48px
- Description: 18px, line-height 1.6
- Feature list: Checkmarks, 16px
- CTA button

**Visual Side:**

- Screenshot/illustration
- Floating effect
- Shadow and glow
- Optional: Video/animation

---

### 5. Buttons

**Primary Button:**

```css
background: linear-gradient(135deg, #9333ea, #3b82f6);
padding: 12px 32px;
border-radius: 8px;
font-weight: 600;
transition: all 0.3s;

&:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(147, 51, 234, 0.4);
}
```

**Secondary Button:**

```css
background: transparent;
border: 2px solid rgba(147, 51, 234, 0.5);
padding: 12px 32px;
border-radius: 8px;

&:hover {
  border-color: #9333ea;
  background: rgba(147, 51, 234, 0.1);
}
```

**Ghost Button:**

```css
background: transparent;
color: #a855f7;
padding: 12px 24px;

&:hover {
  background: rgba(147, 51, 234, 0.1);
}
```

---

### 6. Cards & Containers

**Glass Card:**

```css
background: rgba(30, 41, 59, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
padding: 32px;
```

**Glowing Card:**

```css
background: rgba(30, 41, 59, 0.8);
border: 1px solid rgba(147, 51, 234, 0.3);
box-shadow:
  0 0 40px rgba(147, 51, 234, 0.2),
  inset 0 0 20px rgba(147, 51, 234, 0.1);
```

---

### 7. Input Fields

**Text Input:**

```css
background: rgba(30, 41, 59, 0.6);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 8px;
padding: 12px 16px;
color: #f1f5f9;

&:focus {
  border-color: #9333ea;
  box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.2);
}
```

---

### 8. Statistics/Metrics

**Counter Display:**

- Large number: 48px, bold, gradient text
- Label: 14px, muted
- Animated count-up on scroll into view
- Optional: Icon or symbol

**Layout:**

- Horizontal row on desktop
- Stack on mobile
- Equal spacing
- Dividers between items

---

### 9. Testimonials

**Card Style:**

- Quote icon: Top left
- Quote text: 18px, italic
- Author info: Name, title, company
- Photo: 48px circle, left of info
- Rating stars (optional)

**Layout:**

- Carousel/slider on mobile
- 3-column grid on desktop
- Auto-rotate (optional)

---

### 10. Footer

**Structure:**

- 4-column grid on desktop
- Stack on mobile
- Dark background (#0F172A)
- Top border: Gradient line

**Sections:**

- Company info + logo
- Quick links
- Services
- Contact info
- Social media icons

**Bottom Bar:**

- Copyright
- Privacy policy
- Terms of service
- Back to top button

---

## Animations & Interactions

### Scroll Animations

**Fade In Up:**

```
Initial: opacity 0, translateY(40px)
Animate: opacity 1, translateY(0)
Duration: 0.6s
Easing: ease-out
```

**Scale In:**

```
Initial: opacity 0, scale(0.9)
Animate: opacity 1, scale(1)
Duration: 0.5s
```

**Stagger Children:**

```
Parent delay: 0s
Child delay: 0.1s increment
```

### Hover Animations

**Card Hover:**

- Transform: translateY(-8px)
- Shadow: Increase glow
- Border: Brighten color
- Duration: 0.3s

**Button Hover:**

- Transform: scale(1.05)
- Shadow: Add glow
- Background: Slight brighten
- Duration: 0.2s

**Link Hover:**

- Color: Shift to purple
- Transform: translateX(4px) for arrows
- Underline: Expand from left

### Page Transitions

- Fade in/out: 0.3s
- Smooth scroll behavior
- Loading states with skeleton screens

### Micro-interactions

- Button press: Scale down to 0.95
- Input focus: Glow effect
- Checkbox: Checkmark animation
- Toggle: Slide animation

---

## Responsive Design

### Breakpoints

```css
mobile:       320px - 639px
tablet:       640px - 1023px
desktop:      1024px - 1279px
large:        1280px - 1535px
xlarge:       1536px+
```

### Mobile Adaptations

- Stack all columns
- Full-width buttons
- Hamburger menu
- Simplified animations
- Touch-friendly (44px min tap target)
- Reduced padding/margins

### Tablet Adaptations

- 2-column layouts
- Condensed navigation
- Adjusted font sizes
- Optimized images

### Desktop Enhancements

- Multi-column layouts
- Advanced hover effects
- Larger typography
- More whitespace
- Parallax effects (optional)

---

## Accessibility

### Color Contrast

- Minimum 4.5:1 for body text
- Minimum 3:1 for large text
- Ensure readability on all backgrounds

### Keyboard Navigation

- All interactive elements accessible via Tab
- Focus indicators clearly visible
- Skip to main content link
- Logical tab order

### Screen Readers

- Semantic HTML5 elements
- ARIA labels where needed
- Alt text for all images
- Descriptive link text

### Motion

- Respect prefers-reduced-motion
- Disable animations if requested
- Ensure functionality without animations

### Forms

- Clear labels
- Error messages
- Success feedback
- Visible focus states

---

## Design Assets

### Icons

- Use Lucide React or Heroicons
- 24px standard size
- Consistent stroke width (2px)
- Monochrome or gradient fill

### Images

- High-quality, optimized
- WebP format preferred
- Lazy loading
- Proper alt text
- Aspect ratios maintained

### Illustrations

- Consistent style (flat, gradient, or 3D)
- Purple/blue color scheme
- Technology/AI themed
- SVG format when possible

---

## Brand Voice & Messaging

### Tone

- Professional yet approachable
- Innovative and forward-thinking
- Confident but not arrogant
- Clear and concise

### Key Messages

- "Building Digital Solutions That Matter"
- AI-driven transformation
- Scalable and future-proof
- Trusted by industry leaders

---

## Implementation Checklist

- [ ] Set up design tokens (colors, spacing, typography)
- [ ] Create component library in Figma
- [ ] Build reusable UI components
- [ ] Implement animation system
- [ ] Test responsive layouts
- [ ] Validate accessibility
- [ ] Optimize performance
- [ ] Cross-browser testing
- [ ] Get client approval on mockups
- [ ] Hand off to development

---

**Document prepared by:** CascadingXol Private Limited  
**For project:** TAMx Website Development  
**Reference:** antimatter.ai  
**Status:** Ready for development

DEVELOPMENT_UI_FRONTEND.MD
markdown# TAMx Frontend Development Guide
**Next.js + TypeScript + Tailwind CSS**

Version: 1.0  
Last Updated: February 2026  
Stack: Next.js 14, TypeScript, Tailwind CSS, Framer Motion

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Setup](#project-setup)
3. [Configuration](#configuration)
4. [Component Implementation](#component-implementation)
5. [Animation Patterns](#animation-patterns)
6. [Utilities & Helpers](#utilities--helpers)
7. [Performance Optimization](#performance-optimization)
8. [Deployment](#deployment)

---

## Tech Stack

### Core Technologies

```json
{
  "framework": "Next.js 14.x",
  "language": "TypeScript 5.x",
  "styling": "Tailwind CSS 3.x",
  "animations": "Framer Motion 11.x",
  "ui-components": "shadcn/ui",
  "icons": "lucide-react",
  "fonts": "next/font (Google Fonts)"
}
```

### Additional Libraries

```json
{
  "form-handling": "react-hook-form + zod",
  "state-management": "Zustand (if needed)",
  "analytics": "Google Analytics / Vercel Analytics",
  "seo": "next-seo"
}
```

---

## Project Setup

### 1. Initialize Next.js Project

```bash
npx create-next-app@latest tamx-website --typescript --tailwind --app --eslint
cd tamx-website
```

### 2. Install Dependencies

```bash
# UI Components
npx shadcn@latest init
npx shadcn@latest add button card input label textarea

# Animations
npm install framer-motion

# Icons
npm install lucide-react

# Forms
npm install react-hook-form @hookform/resolvers zod

# Utilities
npm install clsx tailwind-merge
npm install @vercel/analytics
```

### 3. Project Structure

```
tamx-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   ├── services/
│   ├── contact/
│   └── globals.css
├── components/
│   ├── ui/              # shadcn components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Features.tsx
│   │   └── CTA.tsx
│   └── shared/
│       ├── AnimatedSection.tsx
│       ├── GradientText.tsx
│       └── ParticleBackground.tsx
├── lib/
│   ├── utils.ts
│   └── animations.ts
├── public/
│   ├── images/
│   └── icons/
└── types/
    └── index.ts
```

---

## Configuration

### tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Purple spectrum
        "brand-purple": {
          DEFAULT: "#9333EA",
          light: "#A855F7",
          lavender: "#C084FC",
        },
        // Blue spectrum
        "brand-blue": {
          DEFAULT: "#3B82F6",
          light: "#60A5FA",
          cyan: "#06B6D4",
        },
        // Backgrounds
        dark: {
          primary: "#0F172A",
          secondary: "#1E293B",
          card: "rgba(30, 41, 59, 0.6)",
        },
        // Text
        text: {
          primary: "#F1F5F9",
          secondary: "#94A3B8",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-space-grotesk)"],
        mono: ["var(--font-jetbrains-mono)"],
      },
      backgroundImage: {
        "gradient-purple-blue":
          "linear-gradient(135deg, #9333EA 0%, #3B82F6 100%)",
        "gradient-hero":
          "linear-gradient(180deg, #1E293B 0%, #0F172A 50%, #000000 100%)",
      },
      boxShadow: {
        "glow-purple":
          "0 0 40px rgba(147, 51, 234, 0.3), 0 0 80px rgba(59, 130, 246, 0.2)",
        "glow-card": "0 20px 60px rgba(147, 51, 234, 0.4)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

export default config;
```

### app/layout.tsx

```typescript
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "TAMx - Building Digital Solutions That Matter",
  description: "AI-driven technology solutions for modern businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return { children };
}
```

### app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-dark-primary text-text-primary;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .glass-effect {
    @apply bg-dark-card backdrop-blur-xl border border-white/10;
  }

  .gradient-text {
    @apply bg-gradient-purple-blue bg-clip-text text-transparent;
  }

  .section-padding {
    @apply py-20 md:py-28 lg:py-32;
  }

  .container-padding {
    @apply px-4 md:px-6 lg:px-8;
  }
}
```

---

## Component Implementation

### 1. Navbar Component

```typescript
// components/layout/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ]

  return (



          {/* Logo */}


              TAMx



          {/* Desktop Navigation */}

            {navLinks.map((link) => (

                {link.label}

            ))}


          {/* CTA Button */}


              Get Started



          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ?  : }



        {/* Mobile Menu */}
        {isMobileMenuOpen && (

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-text-secondary hover:text-brand-purple transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}

            ))}

              Get Started


        )}


  )
}
```

### 2. Hero Section

```typescript
// components/sections/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ParticleBackground } from '@/components/shared/ParticleBackground'

export function Hero() {
  return (

      {/* Particle Background */}


      {/* Content */}


          {/* Badge */}


            AI-Powered Solutions


          {/* Main Heading */}

            Building{' '}
            Digital Solutions

            That Matter


          {/* Subheading */}

            Transform your business with cutting-edge AI and technology solutions.
            We build scalable platforms that drive growth and innovation.


          {/* CTA Buttons */}


              Start Your Project



              View Our Work



          {/* Stats */}

            {[
              { value: '50+', label: 'Projects Delivered' },
              { value: '100%', label: 'Client Satisfaction' },
              { value: '24/7', label: 'Support Available' },
              { value: '5+', label: 'Years Experience' },
            ].map((stat, index) => (


                  {stat.value}

                {stat.label}

            ))}




      {/* Gradient Overlay */}


  )
}
```

### 3. Particle Background

```typescript
// components/shared/ParticleBackground.tsx
'use client'

import { useEffect, useRef } from 'react'

export function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Particle system
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(147, 51, 234, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      particles.forEach((a, index) => {
        particles.slice(index + 1).forEach((b) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 - distance / 750})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (

  )
}
```

### 4. Service Cards (Bento Grid)

```typescript
// components/sections/Services.tsx
'use client'

import { motion } from 'framer-motion'
import { Code, Sparkles, Rocket, Shield, Database, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'

const services = [
  {
    icon: Sparkles,
    title: 'AI Solutions',
    description: 'Cutting-edge artificial intelligence to transform your business operations',
    gridClass: 'md:col-span-2',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Modern, responsive websites built with latest technologies',
    gridClass: 'md:col-span-1',
  },
  {
    icon: Rocket,
    title: 'E-commerce Platforms',
    description: 'Scalable online stores with seamless user experiences',
    gridClass: 'md:col-span-1',
  },
  {
    icon: Database,
    title: 'Digital Transformation',
    description: 'End-to-end digitalization of your business processes',
    gridClass: 'md:col-span-2',
  },
  {
    icon: Shield,
    title: 'Automation',
    description: 'Streamline workflows with intelligent automation',
    gridClass: 'md:col-span-1',
  },
  {
    icon: Zap,
    title: 'API Development',
    description: 'Robust and scalable backend solutions',
    gridClass: 'md:col-span-1',
  },
]

export function Services() {
  return (


        {/* Section Header */}


            Our Services


            Comprehensive technology solutions tailored to your business needs



        {/* Bento Grid */}

          {services.map((service, index) => {
            const Icon = service.icon
            return (



                    {/* Icon */}




                    {/* Content */}

                      {service.title}


                      {service.description}


                    {/* Arrow */}

                      Learn more →




            )
          })}



  )
}
```

### 5. Contact Form

```typescript
// components/sections/ContactForm.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Send } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(data)
    setSubmitSuccess(true)
    setIsSubmitting(false)
    reset()

    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  return (





              Let's Work Together


              Tell us about your project and we'll get back to you within 24 hours





              {/* Name */}

                Name *

                {errors.name && (
                  {errors.name.message}
                )}


              {/* Email */}

                Email *

                {errors.email && (
                  {errors.email.message}
                )}



            {/* Company */}

              Company (Optional)



            {/* Message */}

              Message *

              {errors.message && (
                {errors.message.message}
              )}


            {/* Submit Button */}

              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message

                </>
              )}


            {submitSuccess && (

                Message sent successfully! We'll get back to you soon.

            )}




  )
}
```

### 6. Footer

```typescript
// components/layout/Footer.tsx
import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Contact', href: '/contact' },
    ],
    services: [
      { label: 'AI Solutions', href: '/services/ai' },
      { label: 'Web Development', href: '/services/web' },
      { label: 'E-commerce', href: '/services/ecommerce' },
      { label: 'Automation', href: '/services/automation' },
    ],
    resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Support', href: '/support' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com' },
    { icon: Twitter, href: 'https://twitter.com' },
    { icon: Linkedin, href: 'https://linkedin.com' },
    { icon: Github, href: 'https://github.com' },
  ]

  return (

      {/* Main Footer */}


          {/* Company Info */}



                TAMx



              Building digital solutions that matter. We transform businesses through AI-driven technology and innovation.


              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (

                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-brand-purple/20 transition-colors"
                  >


                )
              })}



          {/* Links Columns */}

            Company

              {footerLinks.company.map((link) => (


                    {link.label}


              ))}




            Services

              {footerLinks.services.map((link) => (


                    {link.label}


              ))}




            Resources

              {footerLinks.resources.map((link) => (


                    {link.label}


              ))}




        {/* Contact Info */}





                Email

                  info@tamxai.com






                Phone

                  +92 315-5320243






                Location
                Islamabad, Pakistan






      {/* Bottom Bar */}




              © {currentYear} TAMx. All rights reserved.



                Privacy Policy


                Terms of Service


                Cookie Policy






  )
}
```

---

## Animation Patterns

### lib/animations.ts

```typescript
// Reusable animation variants for Framer Motion

export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const hoverScale = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2 },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: "0 20px 60px rgba(147, 51, 234, 0.4)",
  },
  transition: { duration: 0.3 },
};
```

---

## Utilities & Helpers

### lib/utils.ts

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// Truncate text
export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + "..." : str;
}

// Scroll to element
export function scrollToElement(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

---

## Performance Optimization

### Image Optimization

```typescript
import Image from 'next/image'

// Use Next.js Image component
<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // For above-the-fold images
  quality={90}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Lazy Loading Components

```typescript
import dynamic from 'next/dynamic'

// Lazy load heavy components
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => Loading...,
  ssr: false, // Disable SSR if needed
})
```

### Font Optimization

```typescript
// Already implemented in layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Use font-display: swap
  variable: "--font-inter",
});
```

---

## Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://tamxai.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Testing Checklist

- [ ] Responsive on all devices (mobile, tablet, desktop)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Performance (Lighthouse score 90+)
- [ ] Accessibility (WCAG AA compliance)
- [ ] SEO optimization (meta tags, sitemap, robots.txt)
- [ ] Forms validation and submission
- [ ] All links working
- [ ] Images optimized and loading
- [ ] Animations smooth on all devices
- [ ] Console errors resolved

---

**Development Guide prepared by:** CascadingXol Private Limited  
**For project:** TAMx Website  
**Tech Stack:** Next.js 14 + TypeScript + Tailwind CSS  
**Status:** Ready for implementation
