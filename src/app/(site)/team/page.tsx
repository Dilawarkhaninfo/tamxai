import React from 'react';
import { Metadata } from 'next';
import TeamHero from '@/components/team/TeamHero';
import TeamSection from '@/components/team/TeamSection';
import TeamVision from '@/components/team/TeamVision';
import { getActiveTeamMembers } from '@/app/_actions/team';

export const metadata: Metadata = {
  title: 'Our Team | TAMx',
  description: 'Meet the visionaries, engineers, and AI specialists behind TAMx - building the next generation of intelligent digital systems.',
};

export default async function TeamPage() {
  const members = await getActiveTeamMembers();
  return (
    <main className="relative min-h-screen bg-black">
      <TeamHero />
      <TeamSection dbMembers={members} />
      <TeamVision />
    </main>
  );
}
