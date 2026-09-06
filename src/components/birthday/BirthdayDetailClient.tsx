'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import ProfilePictureUploader from './ProfilePictureUploader'
import MemoriesGallery from './MemoriesGallery'
import BirthdayForm from './BirthdayForm'
import DeleteConfirmDialog from './DeleteConfirmDialog'
import type { BirthdayWithMeta } from '@/types/birthday'
import type { MemoryWithUrl } from '@/types/memory'

interface BirthdayDetailClientProps {
  birthday: BirthdayWithMeta
  memories: MemoryWithUrl[]
}

export default function BirthdayDetailClient({ birthday, memories }: BirthdayDetailClientProps) {
  const router = useRouter()
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const pronoun = 'their'

  return (
    <div className="p-4 md:p-8 max-w-md mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/birthdays" className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center" aria-label="Back">
          <ArrowLeft size={18} />
        </Link>
      </div>

      <div className="flex flex-col items-center text-center gap-3">
        <ProfilePictureUploader birthdayId={birthday.id} imageUrl={birthday.profilePictureUrl ?? null} size={110} />
        <h1 className="font-heading font-bold text-xl text-[var(--color-heading)]">{birthday.name}</h1>
        {birthday.category && <Badge tone="pink">{birthday.category}</Badge>}
      </div>

      {!birthday.isToday ? (
        <div className="rounded-xl bg-[var(--color-yellow-light)] text-[var(--color-yellow)] text-sm font-medium text-center px-4 py-3">
          🎂 {birthday.daysUntil} day{birthday.daysUntil === 1 ? '' : 's'} left until {pronoun} special day!
        </div>
      ) : (
        <div className="rounded-xl bg-[var(--color-pink-light)] text-[var(--color-pink)] text-sm font-medium text-center px-4 py-3">
          🎉 It&apos;s {birthday.name}&apos;s birthday today!
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-gray-500">Birthday Date</span>
          <span className="text-sm font-medium text-gray-900">
            {format(new Date(birthday.birthday), 'd MMMM yyyy')} ({format(birthday.nextOccurrence, 'EEEE')})
          </span>
        </div>
        {birthday.upcomingAge != null && (
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-gray-500">Age turning</span>
            <span className="text-sm font-medium text-gray-900">Turning {birthday.upcomingAge} 🎂</span>
          </div>
        )}
        {birthday.notes && (
          <div className="px-4 py-3">
            <span className="text-sm text-gray-500 block mb-1">Notes</span>
            <span className="text-sm text-gray-700">{birthday.notes}</span>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" fullWidth onClick={() => setEditOpen(true)}>Edit Details</Button>
        <Button variant="destructive" fullWidth onClick={() => setDeleteOpen(true)}>Delete Reminders</Button>
      </div>

      <MemoriesGallery birthdayId={birthday.id} memories={memories} />

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Birthday">
        <BirthdayForm
          mode="edit"
          birthday={birthday}
          onCancel={() => setEditOpen(false)}
          onSuccess={() => {
            setEditOpen(false)
            router.refresh()
          }}
        />
      </Modal>

      <DeleteConfirmDialog
        isOpen={deleteOpen}
        birthdayId={birthday.id}
        birthdayName={birthday.name}
        onClose={() => setDeleteOpen(false)}
        onDeleted={() => router.push('/dashboard/birthdays')}
      />
    </div>
  )
}