import { getContactSubmissions } from '@/app/_actions/contact';
import { ContactsAdminClient } from '@/components/admin/ContactsAdminClient';

export default async function ContactsAdminPage() {
  const submissions = await getContactSubmissions();
  return <ContactsAdminClient initialSubmissions={submissions} />;
}
