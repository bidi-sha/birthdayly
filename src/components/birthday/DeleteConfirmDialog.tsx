'use client'

import { useState, useTransition } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { deleteBirthday } from '@/app/(dashboard)/dashboard/actions'

interface DeleteConfirmDialogProps {
  isOpen: boolean
  birthdayId: string
  birthdayName: string
  onClose: () => void
  onDeleted: () => void
}

export default function DeleteConfirmDialog({
  isOpen,
  birthdayId,
  birthdayName,
  onClose,
  onDeleted,
}: DeleteConfirmDialogProps) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    setError(null)
    startTransition(async () => {
      const result = await deleteBirthday(birthdayId)
      if (result.success) {
        onDeleted()
      } else {
        setError(result.error)
      }
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Birthday">
      <p className="text-sm text-gray-600 mb-1">
        Are you sure you want to delete <span className="font-semibold text-gray-900">{birthdayName}</span>?
      </p>
      <p className="text-sm text-gray-500 mb-5">This can&apos;t be undone.</p>

      {error && (
        <div className="rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3 mb-4">{error}</div>
      )}

      <div className="flex gap-3">
        <Button variant="secondary" fullWidth onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button variant="destructive" fullWidth onClick={handleDelete} disabled={isPending}>
          {isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Modal>
  )
}