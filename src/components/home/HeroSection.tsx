'use client';

import { ShineButton } from '@/components/ui/ShineButton';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 z-20">
      <div className="max-w-7xl w-full">
        {/* Main Hero Content - Centered */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Building{' '}
            <span className="gradient-text">Digital</span>
            <br />
            <span className="gradient-text">Solutions</span>{' '}
            That Matter
          </h1>
        </div>

        {/* Bottom Left - Tagline and CTA Button */}
        <div className="absolute bottom-12 left-8 max-w-sm hidden lg:block">
          <p className="text-sm text-text-secondary leading-relaxed mb-6">
            We empower organizations with AI that turns complex challenges
            into real-world outcomes.
          </p>
          
          <ShineButton>
            Start Your Project
            <ArrowRight className="w-5 h-5" />
          </ShineButton>
        </div>

        {/* Mobile CTA - Centered */}
        <div className="lg:hidden text-center mt-10">
          <ShineButton>
            Start Your Project
            <ArrowRight className="w-5 h-5" />
          </ShineButton>
        </div>

        {/* Bottom Right - Statistics */}
        <div className="absolute bottom-12 right-8 hidden lg:flex items-center gap-12">
          {/* Stat 1 */}
          <div className="text-right">
            <div className="text-3xl font-bold text-white">
              20<span className="gradient-text">+</span>
            </div>
            <div className="text-xs text-text-secondary mt-1">
              Projects
              <br />
              Delivered
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-brand-purple/30 to-transparent" />

          {/* Stat 2 */}
          <div className="text-right">
            <div className="text-3xl font-bold text-white">
              100<span className="gradient-text">%</span>
            </div>
            <div className="text-xs text-text-secondary mt-1">
              Client
              <br />
              Satisfaction
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-brand-blue/30 to-transparent" />

          {/* Stat 3 */}
          <div className="text-right">
            <div className="text-3xl font-bold text-white">
              24<span className="gradient-text">/</span>7
            </div>
            <div className="text-xs text-text-secondary mt-1">
              Support
              <br />
              Available
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
