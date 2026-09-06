

'use client'

import { useState, useTransition } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import CategoryChips from '@/components/ui/CategoryChips'
import AssetPlaceholder from '@/components/ui/AssetPlaceholder'
import ProfilePictureUploader from './ProfilePictureUploader'
import { addBirthday, updateBirthday, type ActionResult } from '@/app/(dashboard)/dashboard/actions'
import type { BirthdayWithMeta } from '@/types/birthday'
import { useToast } from '@/components/ui/Toast'

interface BirthdayFormProps {
  mode: 'add' | 'edit'
  birthday?: BirthdayWithMeta
  onSuccess?: () => void
  onAdded?: (id: string) => void
  onCancel: () => void
}

export default function BirthdayForm({
  mode,
  birthday,
  onSuccess,
  onAdded,
  onCancel,
}: BirthdayFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState(birthday?.category ?? 'All')
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()

  const handleSubmit = (formData: FormData) => {
    setError(null)

    startTransition(async () => {
      const result: ActionResult =
        mode === 'add'
          ? await addBirthday(formData)
          : await updateBirthday(birthday!.id, formData)

      if (!result.success) {
        setError(result.error)
        return
      }

      if (mode === 'add' && result.id && onAdded) {
        onAdded(result.id)
      } else {
        showToast('Birthday updated ✨')
        onSuccess?.()
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {mode === 'add' && (
        <div className="flex justify-center">
          <AssetPlaceholder
            label="Add birthday illustration"
            width={140}
            height={70}
          />
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      {mode === 'edit' && birthday && (
        <div className="flex justify-center pb-1">
          <ProfilePictureUploader
            birthdayId={birthday.id}
            imageUrl={birthday.profilePictureUrl ?? null}
            size={84}
          />
        </div>
      )}

      <Input
        id="name"
        name="name"
        label="Name"
        required
        placeholder="Enter name"
        defaultValue={birthday?.name}
      />

      <Input
        id="birthday"
        name="birthday"
        type="date"
        label="Birthday"
        required
        defaultValue={birthday?.birthday}
      />

      <Input
        id="birth_year"
        name="birth_year"
        type="number"
        label="Birth Year (Optional)"
        placeholder="e.g. 2000"
        min={1900}
        max={new Date().getFullYear()}
        defaultValue={birthday?.birth_year ?? undefined}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Category / Group
        </label>
        <CategoryChips
          name="category"
          value={category}
          onChange={setCategory}
        />
      </div>

      {mode === 'edit' && (
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            defaultValue={birthday?.notes ?? ''}
            placeholder="Loves cute chocolate cupcakes and pastel stationery!"
            className="w-full rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          fullWidth
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button type="submit" fullWidth disabled={isPending}>
          {isPending
            ? 'Saving...'
            : mode === 'add'
              ? 'Add Birthday 🎉'
              : 'Save Changes ✨'}
        </Button>
      </div>
    </form>
  )
}

