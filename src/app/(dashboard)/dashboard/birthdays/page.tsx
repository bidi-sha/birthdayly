import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { enrichAndSortBirthdays } from '@/lib/birthday-utils'
import { withProfilePictureUrls } from '@/lib/birthday-media'
import UpcomingBirthdaysClient from '@/components/dashboard/UpcomingBirthdaysClient'
import type { Birthday } from '@/types/birthday'

export default async function UpcomingBirthdaysPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: birthdays, error } = await supabase.from('birthdays').select('*').returns<Birthday[]>()
  if (error) {
    return <div className="p-8 text-center text-red-500">Couldn&apos;t load your birthdays.</div>
  }

  const enriched = enrichAndSortBirthdays(birthdays ?? [])
  const withPictures = await withProfilePictureUrls(enriched)

  return <UpcomingBirthdaysClient birthdays={withPictures} />
}