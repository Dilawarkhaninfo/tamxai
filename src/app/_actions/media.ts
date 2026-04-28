'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { MediaKind } from '@/lib/supabase/types'

function detectKind(mime: string): MediaKind {
  if (mime.startsWith('image/svg')) return 'vector'
  if (mime.startsWith('image/')) return 'image'
  if (mime.startsWith('video/')) return 'video'
  if (mime.startsWith('audio/')) return 'audio'
  if (mime === 'application/pdf') return 'document'
  if (mime.includes('json') || mime.includes('javascript') || mime.includes('text/')) return 'code'
  return 'other'
}

export async function getMediaAssets() {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { data } = await supabase
    .from('media_assets')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function getUploadUrl(filename: string, mime: string) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const ext = filename.split('.').pop()
  const path = `library/${Date.now()}-${filename}`

  const { data, error } = await supabase.storage
    .from('media')
    .createSignedUploadUrl(path)

  if (error) return { error: error.message }

  return { signedUrl: data.signedUrl, token: data.token, path, fullPath: data.path }
}

export async function registerMediaAsset(params: {
  path: string
  filename: string
  mime: string
  size_bytes: number
  width?: number
  height?: number
}) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase.from('media_assets').insert({
    bucket: 'media',
    path: params.path,
    filename: params.filename,
    mime: params.mime,
    kind: detectKind(params.mime),
    size_bytes: params.size_bytes,
    width: params.width ?? null,
    height: params.height ?? null,
    uploaded_by: user?.id ?? null,
  }).select().single()

  if (error) return { error: error.message }
  revalidatePath('/admin/media')
  return { data }
}

export async function deleteMediaAsset(id: string, path: string) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  await supabase.storage.from('media').remove([path])
  await supabase.from('media_assets').delete().eq('id', id)
  revalidatePath('/admin/media')
  return { success: true }
}

export async function getPublicUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!
  return `${base}/storage/v1/object/public/media/${path}`
}

