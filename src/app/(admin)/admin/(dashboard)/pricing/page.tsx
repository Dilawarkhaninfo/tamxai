import { getPlans } from '@/app/_actions/pricing';
import { PricingAdminClient } from '@/components/admin/PricingAdminClient';

export default async function PricingManagementPage() {
  const plans = await getPlans();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <PricingAdminClient initialPlans={plans as any[]} />;
}

