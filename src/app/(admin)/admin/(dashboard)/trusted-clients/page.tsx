import { getTrustedClients } from '@/app/_actions/trusted-clients';
import { TrustedClientsAdminClient } from '@/components/admin/TrustedClientsAdminClient';

export default async function TrustedClientsAdminPage() {
  const clients = await getTrustedClients();
  return <TrustedClientsAdminClient initialClients={clients} />;
}
