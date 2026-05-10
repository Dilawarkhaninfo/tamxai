import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'TAMx offers product design, full-stack development, AI & ML solutions, healthcare apps, IoT systems, and go-to-market strategy — all under one roof.',
  openGraph: {
    title: 'Our Services | TAMx',
    description: 'Product design, development, AI solutions, healthcare apps, IoT, and GTM strategy.',
    url: '/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
