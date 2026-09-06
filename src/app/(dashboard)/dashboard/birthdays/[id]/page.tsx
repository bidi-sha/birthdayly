import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { enrichAndSortBirthdays } from '@/lib/birthday-utils'
import { getSignedUrl, getSignedUrls } from '@/lib/supabase/storage'
import BirthdayDetailClient from '@/components/birthday/BirthdayDetailClient'
import type { Birthday } from '@/types/birthday'
import type { Memory, MemoryWithUrl } from '@/types/memory'

export default async function BirthdayDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: birthday, error } = await supabase.from('birthdays').select('*').eq('id', id).single<Birthday>()
  if (error || !birthday) notFound()

  const { data: memoriesData } = await supabase
    .from('memories')
    .select('*')
    .eq('birthday_id', id)
    .order('memory_date', { ascending: false, nullsFirst: false })
    .returns<Memory[]>()

  const memories = memoriesData ?? []
  const memoryUrlMap = await getSignedUrls(memories.map((m) => m.image_path))
  const memoriesWithUrls: MemoryWithUrl[] = memories
    .filter((m) => memoryUrlMap[m.image_path])
    .map((m) => ({ ...m, imageUrl: memoryUrlMap[m.image_path] }))

  const [enriched] = enrichAndSortBirthdays([birthday])
  const profilePictureUrl = await getSignedUrl(birthday.profile_picture_path)

  return <BirthdayDetailClient birthday={{ ...enriched, profilePictureUrl }} memories={memoriesWithUrls} />
}