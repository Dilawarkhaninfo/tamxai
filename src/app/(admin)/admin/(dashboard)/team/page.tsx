import { getTeamMembers } from '@/app/_actions/team';
import { TeamAdminClient } from '@/components/admin/TeamAdminClient';

export default async function TeamManagementPage() {
  const members = await getTeamMembers();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <TeamAdminClient initialMembers={members as any[]} />;
}

