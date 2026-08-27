'use client'

import { useState, useTransition } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { addBirthday, updateBirthday, type ActionResult } from '@/app/(dashboard)/dashboard/actions'
import type { Birthday } from '@/types/birthday'

interface BirthdayFormProps {
  mode: 'add' | 'edit'
  birthday?: Birthday
  onSuccess: () => void
  onCancel: () => void
}

export default function BirthdayForm({ mode, birthday, onSuccess, onCancel }: BirthdayFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (formData: FormData) => {
    setError(null)
    startTransition(async () => {
      const result: ActionResult =
        mode === 'add'
          ? await addBirthday(formData)
          : await updateBirthday(birthday!.id, formData)

      if (result.success) {
        onSuccess()
      } else {
        setError(result.error)
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3">{error}</div>
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

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" fullWidth onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? 'Saving...' : mode === 'add' ? 'Add Birthday' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}