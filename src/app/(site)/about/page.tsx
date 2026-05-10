import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about TAMx — a team of engineers, designers, and AI specialists building intelligent digital solutions that transform businesses worldwide.',
  openGraph: {
    title: 'About TAMx',
    description: 'Engineers, designers, and AI specialists building intelligent digital solutions.',
    url: '/about',
  },
};
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
