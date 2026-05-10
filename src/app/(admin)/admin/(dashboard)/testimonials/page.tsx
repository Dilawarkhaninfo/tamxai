import { getTestimonials } from '@/app/_actions/testimonials';
import { TestimonialsAdminClient } from '@/components/admin/TestimonialsAdminClient';

export default async function TestimonialsAdminPage() {
  const testimonials = await getTestimonials();
  return <TestimonialsAdminClient initialTestimonials={testimonials} />;
}
