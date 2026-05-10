import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Management System',
  description: 'TAMx LMS — a powerful learning management platform with interactive courses, progress tracking, and AI-assisted learning paths.',
  openGraph: {
    title: 'LMS | TAMx',
    description: 'Interactive learning management system with AI-assisted learning paths.',
    url: '/lms',
  },
};

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  return children;
}
