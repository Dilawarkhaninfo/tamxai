import { getUsers } from '@/app/_actions/users';
import { UsersAdminClient } from '@/components/admin/UsersAdminClient';

export default async function UsersPage() {
  const users = await getUsers();
  return <UsersAdminClient initialUsers={users as any[]} />;
}
