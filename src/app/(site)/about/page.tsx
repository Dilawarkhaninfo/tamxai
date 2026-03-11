'use client';

import { AboutHero } from '@/components/about/AboutHero';
import { NarrativeSection } from '@/components/about/NarrativeSection';
import { ApproachSection } from '@/components/about/ApproachSection';
import { ValuesSection } from '@/components/about/ValuesSection';
import { ImpactMetrics } from '@/components/about/ImpactMetrics';
import { TimelineSection } from '@/components/about/TimelineSection';
import { TeamSection } from '@/components/about/TeamSection';
import { CTASection } from '@/components/home/CTASection';

const aboutImages = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', // Deep space network
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2064&auto=format&fit=crop', // Abstract tech
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', // Blue circuit
];

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Section 1 — Hero */}
      <AboutHero
        title="About TAMx"
        subheading="Building intelligent digital systems that empower modern businesses through cutting-edge AI and human-centric design."
        images={aboutImages}
      />

      {/* Section 2 — Company Narrative */}
      <NarrativeSection />

      {/* Section 3 — Our Approach */}
      <ApproachSection />

      {/* Section 4 — Company Values */}
      <ValuesSection />

      {/* Section 5 — Global Impact Metrics */}
      <ImpactMetrics />

      {/* Section 6 — Leadership & Expertise */}
      <TeamSection />

      {/* Section 7 — Growth Timeline */}
      <TimelineSection />


      {/* Section 9 — CTA (Reusing existing component) */}
      <CTASection />
    </main>
  );
}
