'use client';

import { AboutHero, StorySection, BeliefsSection, AboutCTA } from '@/components/about/AboutComponents';

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen">
      {/* Section 1 — Hero */}
      <AboutHero />

      {/* Section 2 — Story & Grid */}
      <StorySection />

      {/* Section 3 — Beliefs */}
      <BeliefsSection />

      {/* Section 4 — CTA */}
      <AboutCTA />
    </main>
  );
}
