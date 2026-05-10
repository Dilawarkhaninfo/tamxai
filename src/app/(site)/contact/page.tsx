import type { Metadata } from 'next';
import { getNavigationServices, getNavigationProducts } from '@/app/_actions/navigation';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with TAMx for AI development, product design, web and mobile solutions. Book a free consultation or send us a message.',
  openGraph: {
    title: 'Contact TAMx',
    description: 'Book a free consultation or reach out for AI-powered digital solutions.',
    url: '/contact',
  },
};

export default async function ContactPage() {
  const [services, products] = await Promise.all([
    getNavigationServices(),
    getNavigationProducts(),
  ]);

  return (
    <ContactClient
      serviceNames={services.map((s) => s.title)}
      productNames={products.map((p) => p.title)}
    />
  );
}
