import { getSignedUrls } from '@/lib/supabase/storage'

export async function withProfilePictureUrls<T extends { profile_picture_path: string | null }>(
  birthdays: T[]
): Promise<(T & { profilePictureUrl: string | null })[]> {
  const paths = birthdays.map((b) => b.profile_picture_path).filter((p): p is string => !!p)
  const urlMap = await getSignedUrls(paths)

  return birthdays.map((b) => ({
    ...b,
    profilePictureUrl: b.profile_picture_path ? urlMap[b.profile_picture_path] ?? null : null,
  }))
}