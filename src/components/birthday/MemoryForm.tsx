'use client'

import { useState, useRef, useTransition } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { resizeImageFile } from '@/lib/image-utils'
import { addMemory, updateMemory } from '@/app/(dashboard)/dashboard/birthdays/[id]/actions'
import type { Memory } from '@/types/memory'

interface MemoryFormProps {
  birthdayId: string
  mode: 'add' | 'edit'
  memory?: Memory
  currentImageUrl?: string | null
  onSuccess: () => void
  onCancel: () => void
}

export default function MemoryForm({ birthdayId, mode, memory, currentImageUrl, onSuccess, onCancel }: MemoryFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(currentImageUrl ?? null)
  const [file, setFile] = useState<File | null>(null)
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    const resized = await resizeImageFile(selected, 1200, 0.82)
    setFile(resized)
    setPreview(URL.createObjectURL(resized))
  }

  const handleSubmit = (formData: FormData) => {
    setError(null)
    if (file) formData.set('file', file)

    startTransition(async () => {
      const result = mode === 'add' ? await addMemory(birthdayId, formData) : await updateMemory(memory!.id, formData)
      if (!result.success) {
        setError(result.error)
        return
      }
      onSuccess()
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && <div className="rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Photo</label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-video rounded-xl border-2 border-dashed border-[var(--color-border)] overflow-hidden flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm text-gray-400">Tap to choose a photo</span>
          )}
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>

      <Input id="caption" name="caption" label="Caption (optional)" placeholder="e.g. Her 10th birthday party" defaultValue={memory?.caption ?? ''} />
      <Input id="memory_date" name="memory_date" type="date" label="Date (optional)" defaultValue={memory?.memory_date ?? ''} />

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" fullWidth onClick={onCancel} disabled={isPending}>Cancel</Button>
        <Button type="submit" fullWidth disabled={isPending || (mode === 'add' && !file)}>
          {isPending ? 'Saving...' : mode === 'add' ? 'Add Memory' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}