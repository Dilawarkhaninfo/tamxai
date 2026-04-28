import { getSettings } from '@/app/_actions/settings';
import { SettingsAdminClient } from '@/components/admin/SettingsAdminClient';

export default async function SettingsPage() {
  const settings = await getSettings();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <SettingsAdminClient initialSettings={settings as any} />;
}

