import { getBookings } from '@/app/_actions/bookings';
import { BookingsAdminClient } from '@/components/admin/BookingsAdminClient';

export default async function BookingsAdminPage() {
  const bookings = await getBookings();
  return <BookingsAdminClient initialBookings={bookings} />;
}
