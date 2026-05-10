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
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { getActiveTeamMembers } from '@/app/_actions/team';
import { getActiveTestimonials } from '@/app/_actions/testimonials';
import { getPublishedProjects } from '@/app/_actions/projects';
import { AboutProjectsSection } from '@/components/about/AboutProjectsSection';

export default async function AboutPage() {
  const [members, testimonials, projects] = await Promise.all([
    getActiveTeamMembers(),
    getActiveTestimonials(),
    getPublishedProjects(),
  ]);
  return (
    <main className="relative min-h-screen bg-black">
      <TeamHero />
      <TeamVision />
      <StorySection />
      <TeamSection dbMembers={members} />
      <AboutProjectsSection projects={projects} />
      <TestimonialsSection dbTestimonials={testimonials} />
      <VideoShowcase />
      <AboutCTA />
    </main>
  );
}
