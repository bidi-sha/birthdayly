'use client'

import { useState } from 'react'
import { LogOut } from 'lucide-react'
import LogoutConfirmDialog from './LogoutConfirmDialog'
import Button from '@/components/ui/Button'

export default function LogoutButton({ variant = 'link' }: { variant?: 'link' | 'button' }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <>
      {variant === 'link' ? (
        <button
          onClick={() => setConfirmOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <LogOut size={15} />
          Log out
        </button>
      ) : (
        <Button variant="secondary" fullWidth onClick={() => setConfirmOpen(true)}>
          Log Out 👋
        </Button>
      )}
      <LogoutConfirmDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} />
    </>
  )
}