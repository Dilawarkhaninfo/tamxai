import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-Courses',
  description: 'Learn AI, software development, and digital product design with TAMx expert-led courses. Hands-on training for the next generation of builders.',
  openGraph: {
    title: 'E-Courses | TAMx',
    description: 'Expert-led courses in AI, software development, and digital product design.',
    url: '/e-courses',
  },
};

export default function ECoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
