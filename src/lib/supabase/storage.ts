import { createClient } from './server'

export const BUCKET = 'birthday-media'
const SIGNED_URL_EXPIRY = 60 * 60 // 1 hour

export async function getSignedUrl(path: string | null): Promise<string | null> {
  if (!path) return null
  const supabase = await createClient()
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, SIGNED_URL_EXPIRY)
  if (error || !data) return null
  return data.signedUrl
}

export async function getSignedUrls(paths: string[]): Promise<Record<string, string>> {
  if (paths.length === 0) return {}
  const supabase = await createClient()
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrls(paths, SIGNED_URL_EXPIRY)
  if (error || !data) return {}
  const map: Record<string, string> = {}
  data.forEach((item) => {
    if (item.signedUrl && item.path) map[item.path] = item.signedUrl
  })
  return map
}

export async function deleteStorageObject(path: string) {
  const supabase = await createClient()
  await supabase.storage.from(BUCKET).remove([path])
}

export async function deleteAllMediaForBirthday(userId: string, birthdayId: string) {
  const supabase = await createClient()
  const basePrefix = `${userId}/${birthdayId}`

  const { data: topLevel } = await supabase.storage.from(BUCKET).list(basePrefix)
  const { data: memoryFiles } = await supabase.storage.from(BUCKET).list(`${basePrefix}/memories`)

  const paths: string[] = []
  topLevel?.forEach((f) => {
    if (f.id) paths.push(`${basePrefix}/${f.name}`) // f.id is null for the "memories" sub-folder entry
  })
  memoryFiles?.forEach((f) => {
    if (f.id) paths.push(`${basePrefix}/memories/${f.name}`)
  })

  if (paths.length > 0) {
    await supabase.storage.from(BUCKET).remove(paths)
  }
}