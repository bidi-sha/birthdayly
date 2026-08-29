'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import AssetPlaceholder from '@/components/ui/AssetPlaceholder'
import { createClient } from '@/lib/supabase/client'

export default function LogoutConfirmDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Out?">
      <div className="flex flex-col items-center text-center gap-3">
        <AssetPlaceholder label="Waving illustration" width={90} height={90} />
        <p className="text-sm text-gray-600">
          Are you sure you want to log out? You can log back in anytime.
        </p>
        <div className="flex gap-3 w-full pt-2">
          <Button variant="secondary" fullWidth onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button fullWidth onClick={handleLogout} disabled={loading}>
            {loading ? 'Logging out...' : 'Log Out'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}