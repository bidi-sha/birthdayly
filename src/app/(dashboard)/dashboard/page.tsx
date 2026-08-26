import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { enrichAndSortBirthdays } from '@/lib/birthday-utils'
import DashboardClient from '@/components/dashboard/DashboardClient'
import type { Birthday } from '@/types/birthday'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: birthdays, error } = await supabase
    .from('birthdays')
    .select('*')
    .returns<Birthday[]>()

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Something went wrong loading your birthdays. Please try refreshing.
      </div>
    )
  }

  const enriched = enrichAndSortBirthdays(birthdays ?? [])
  const greetingName = (user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ?? 'there'

  return <DashboardClient birthdays={enriched} greetingName={greetingName} />
}