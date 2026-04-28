import { getServices } from '@/app/_actions/services';
import { ServicesAdminClient } from '@/components/admin/ServicesAdminClient';

export default async function ServicesManagementPage() {
  const services = await getServices();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <ServicesAdminClient initialServices={services as any[]} />;
}

