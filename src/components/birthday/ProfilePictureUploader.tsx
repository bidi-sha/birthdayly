'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, Trash2, Loader2 } from 'lucide-react'
import { resizeImageFile } from '@/lib/image-utils'
import { uploadProfilePicture, deleteProfilePicture } from '@/app/(dashboard)/dashboard/birthdays/[id]/actions'
import { useToast } from '@/components/ui/Toast'
import AssetPlaceholder from '@/components/ui/AssetPlaceholder'

interface ProfilePictureUploaderProps {
  birthdayId: string
  imageUrl: string | null
  size?: number
}

export default function ProfilePictureUploader({ birthdayId, imageUrl, size = 110 }: ProfilePictureUploaderProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setLoading(true)
    try {
      const resized = await resizeImageFile(file, 800, 0.85)
      const formData = new FormData()
      formData.append('file', resized)
      const result = await uploadProfilePicture(birthdayId, formData)
      if (!result.success) {
        setError(result.error)
      } else {
        showToast('Profile picture updated ✨')
        router.refresh()
      }
    } catch {
      setError('Something went wrong processing that image.')
    } finally {
      setLoading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleDelete = async () => {
    setError(null)
    setLoading(true)
    const result = await deleteProfilePicture(birthdayId)
    setLoading(false)
    if (!result.success) {
      setError(result.error)
    } else {
      showToast('Profile picture removed')
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt="Profile"
            loading="lazy"
            className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm"
          />
        ) : (
          <AssetPlaceholder label="Profile" width={size} height={size} className="rounded-full" />
        )}

        {loading && (
          <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center">
            <Loader2 className="animate-spin text-white" size={20} />
          </div>
        )}

        <button
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-md hover:bg-[var(--color-primary-hover)] disabled:opacity-50"
          aria-label="Change profile picture"
        >
          <Camera size={14} />
        </button>
      </div>

      <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      {imageUrl && (
        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex items-center gap-1 text-xs text-red-500 hover:underline disabled:opacity-50"
        >
          <Trash2 size={12} /> Remove photo
        </button>
      )}

      {error && <p className="text-xs text-red-500 text-center max-w-[180px]">{error}</p>}
    </div>
  )
}