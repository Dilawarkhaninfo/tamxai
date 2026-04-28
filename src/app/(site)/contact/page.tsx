import { getNavigationServices, getNavigationProducts } from '@/app/_actions/navigation';
import { ContactClient } from './ContactClient';

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
