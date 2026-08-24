import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/layout/LogoutButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-[#F5F3FB] p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re logged in! 🎉</h1>
        <p className="text-gray-500 mb-6">Signed in as {user?.email}</p>
        <LogoutButton />
      </div>
    </div>
  )
}