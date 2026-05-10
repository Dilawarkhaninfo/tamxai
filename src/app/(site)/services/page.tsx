import { getPublishedServices } from '@/app/_actions/services';
import ServicesPageClient from './ServicesPageClient';

export default async function ServicesPage() {
  const services = await getPublishedServices();
  return <ServicesPageClient services={services} />;
}
