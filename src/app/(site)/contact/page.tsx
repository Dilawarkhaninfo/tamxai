import type { Metadata } from 'next';
import { getNavigationServices, getNavigationProducts, getSiteSettings } from '@/app/_actions/navigation';
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
  const [services, products, settings] = await Promise.all([
    getNavigationServices(),
    getNavigationProducts(),
    getSiteSettings(),
  ]);

  return (
    <ContactClient
      serviceNames={services.map((s) => s.title)}
      productNames={products.map((p) => p.title)}
      contactEmail={settings.contact_email}
      contactPhone={settings.contact_phone}
      contactAddress={settings.contact_address}
      socialLinkedin={settings.social_linkedin}
      socialFacebook={settings.social_facebook}
      socialInstagram={settings.social_instagram}
    />
  );
}
