
'use client'

import { useState, useTransition } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import AssetPlaceholder from '@/components/ui/AssetPlaceholder'
import { deleteBirthday } from '@/app/(dashboard)/dashboard/actions'
import { useToast } from '@/components/ui/Toast'

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
  const { showToast } = useToast()

  const handleDelete = () => {
    setError(null)

    startTransition(async () => {
      const result = await deleteBirthday(birthdayId)

      if (result.success) {
        showToast('Birthday deleted')
        onDeleted()
      } else {
        setError(result.error)
      }
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Birthday?"
    >
      <div className="flex flex-col items-center text-center gap-3">
        <AssetPlaceholder
          label="Sad illustration"
          width={90}
          height={90}
        />

        <p className="text-sm text-gray-600">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-gray-900">
            {birthdayName}
          </span>
          ? This can&apos;t be undone.
        </p>

        {error && (
          <div className="rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3 w-full">
            {error}
          </div>
        )}

        <div className="flex gap-3 w-full pt-2">
          <Button
            variant="secondary"
            fullWidth
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            fullWidth
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
