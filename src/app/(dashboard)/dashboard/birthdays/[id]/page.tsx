import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { enrichAndSortBirthdays } from '@/lib/birthday-utils'
import BirthdayDetailClient from '@/components/birthday/BirthdayDetailClient'
import type { Birthday } from '@/types/birthday'

export default async function BirthdayDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: birthday, error } = await supabase
    .from('birthdays')
    .select('*')
    .eq('id', id)
    .single<Birthday>()

  if (error || !birthday) notFound()

  const [enriched] = enrichAndSortBirthdays([birthday])

  return <BirthdayDetailClient birthday={enriched} />
}