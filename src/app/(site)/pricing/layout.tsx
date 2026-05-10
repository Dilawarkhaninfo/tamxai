import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent pricing plans for TAMx digital solutions. Choose the plan that fits your business — from startups to enterprise.',
  openGraph: {
    title: 'Pricing Plans | TAMx',
    description: 'Transparent pricing for AI-powered digital solutions — startups to enterprise.',
    url: '/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
