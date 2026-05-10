import { getActivePlans } from '@/app/_actions/pricing';
import PricingPageClient from './PricingPageClient';

export default async function PricingPage() {
  const plans = await getActivePlans();
  return <PricingPageClient dbPlans={plans} />;
}
