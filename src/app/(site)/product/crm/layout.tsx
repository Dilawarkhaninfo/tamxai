import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CRM Platform',
  description: 'TAMx CRM — an AI-powered customer relationship management platform built for modern sales teams. Manage leads, automate pipelines, and close deals faster.',
  openGraph: {
    title: 'CRM Platform | TAMx',
    description: 'AI-powered CRM for modern sales teams — lead management, pipeline automation, and analytics.',
    url: '/product/crm',
  },
};

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return children;
}
