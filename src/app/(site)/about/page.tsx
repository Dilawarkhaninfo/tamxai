import React from 'react';
import TeamHero from '@/components/team/TeamHero';
import TeamSection from '@/components/team/TeamSection';
import TeamVision from '@/components/team/TeamVision';
import { StorySection, AboutCTA } from '@/components/about/AboutComponents';
import { VideoShowcase } from '@/components/about/VideoShowcase';
import { PageTransition } from '@/components/layout/PageTransition';

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen bg-black">
        {/* About Hero */}
        <TeamHero />
        
        {/* Our Vision */}
        <TeamVision />

        {/* Story Section */}
        <StorySection />

        {/* Team Section */}
        <TeamSection />

        {/* Video Showcase Section */}
        <VideoShowcase />

        {/* CTA */}
        <AboutCTA />
      </main>
    </PageTransition>
  );
}
