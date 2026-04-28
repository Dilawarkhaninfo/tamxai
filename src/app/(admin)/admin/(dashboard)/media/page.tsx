import { getMediaAssets } from '@/app/_actions/media';
import { MediaAdminClient } from '@/components/admin/MediaAdminClient';

export default async function MediaPage() {
  const assets = await getMediaAssets();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <MediaAdminClient initialAssets={assets as any[]} />;
}

