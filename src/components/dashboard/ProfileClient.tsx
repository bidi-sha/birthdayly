'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/Toast'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import AssetPlaceholder from '@/components/ui/AssetPlaceholder'
import LogoutButton from '@/components/layout/LogoutButton'

export default function ProfileClient({ email, fullName }: { email: string; fullName: string }) {
  const supabase = createClient()
  const { showToast } = useToast()
  const [name, setName] = useState(fullName)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    const { error } = await supabase.auth.updateUser({ data: { full_name: name.trim() } })
    setSaving(false)
    if (error) {
      setError(error.message)
      return
    }
    showToast('Profile updated ✨')
  }

  return (
    <div className="p-4 md:p-8 max-w-md mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-heading font-bold text-xl text-[var(--color-heading)]">Profile</h1>
      </div>

      <div className="flex flex-col items-center gap-3">
        <AssetPlaceholder label="Avatar" width={90} height={90} className="rounded-full" />
      </div>

      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 space-y-4">
        <Input
          id="fullName"
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <p className="text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-2.5">{email}</p>
          <p className="text-xs text-gray-400 mt-1">Email changes aren&apos;t supported yet.</p>
        </div>

        {error && <div className="rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3">{error}</div>}

        <Button fullWidth onClick={handleSave} disabled={saving || name.trim() === fullName}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <LogoutButton variant="button" />
    </div>
  )
}