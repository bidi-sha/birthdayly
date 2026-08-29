'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Bell, Plus, ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import StatsRow from './StatsRow'
import EmptyState from './EmptyState'
import BirthdayCard from '@/components/birthday/BirthdayCard'
import TodayCelebration from '@/components/birthday/TodayCelebration'
import BirthdayForm from '@/components/birthday/BirthdayForm'
import BirthdayAddedSuccess from '@/components/birthday/BirthdayAddedSuccess'
import DeleteConfirmDialog from '@/components/birthday/DeleteConfirmDialog'
import type { BirthdayWithMeta } from '@/types/birthday'

interface DashboardClientProps {
  birthdays: BirthdayWithMeta[]
  greetingName: string
}

export default function DashboardClient({ birthdays, greetingName }: DashboardClientProps) {
  const router = useRouter()

  const [addOpen, setAddOpen] = useState(false)
  const [addedId, setAddedId] = useState<string | null>(null)
  const [editTarget, setEditTarget] = useState<BirthdayWithMeta | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<BirthdayWithMeta | null>(null)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const todayBirthdays = useMemo(() => birthdays.filter((b) => b.isToday), [birthdays])
  const thisMonthCount = useMemo(() => birthdays.filter((b) => b.isThisMonth).length, [birthdays])
  const preview = birthdays.slice(0, 4)

  const closeAddFlow = () => {
    setAddOpen(false)
    setAddedId(null)
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-[var(--color-heading)]">
            Hi, {greetingName}! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Have a lovely day!</p>
        </div>
        <button
          className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0"
          aria-label="Notifications"
          disabled
          title="Notifications coming soon"
        >
          <Bell size={18} />
        </button>
      </div>

      <StatsRow total={birthdays.length} thisMonth={thisMonthCount} today={todayBirthdays.length} />

      {birthdays.length > 0 && <TodayCelebration birthdays={todayBirthdays} />}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Upcoming Birthdays</h2>
          <button
            onClick={() => setAddOpen(true)}
            className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center"
            aria-label="Add birthday"
          >
            <Plus size={16} />
          </button>
        </div>

        {preview.length === 0 ? (
          <EmptyState variant="no-birthdays" onAddClick={() => setAddOpen(true)} />
        ) : (
          <>
            <div className="space-y-3">
              {preview.map((b) => (
                <BirthdayCard
                  key={b.id}
                  birthday={b}
                  onEdit={setEditTarget}
                  onDelete={setDeleteTarget}
                  linkToDetail
                />
              ))}
            </div>
            {birthdays.length > 4 && (
              <Link
                href="/dashboard/birthdays"
                className="flex items-center justify-center gap-1 text-sm font-medium text-[var(--color-primary)] mt-3 py-2"
              >
                View all {birthdays.length} birthdays <ChevronRight size={16} />
              </Link>
            )}
          </>
        )}
      </div>

      <Modal isOpen={addOpen} onClose={closeAddFlow} title={addedId ? 'Birthday Added!' : 'Add New Birthday'}>
        {addedId ? (
          <BirthdayAddedSuccess
            birthdayId={addedId}
            onAddAnother={() => setAddedId(null)}
            onViewBirthday={() => {
              closeAddFlow()
              router.push(`/dashboard/birthdays/${addedId}`)
            }}
          />
        ) : (
          <BirthdayForm
            mode="add"
            onCancel={closeAddFlow}
            onAdded={(id) => {
              router.refresh()
              setAddedId(id)
            }}
          />
        )}
      </Modal>

      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Birthday">
        {editTarget && (
          <BirthdayForm
            mode="edit"
            birthday={editTarget}
            onCancel={() => setEditTarget(null)}
            onSuccess={() => {
              setEditTarget(null)
              router.refresh()
            }}
          />
        )}
      </Modal>

      {deleteTarget && (
        <DeleteConfirmDialog
          isOpen={!!deleteTarget}
          birthdayId={deleteTarget.id}
          birthdayName={deleteTarget.name}
          onClose={() => setDeleteTarget(null)}
          onDeleted={() => {
            setDeleteTarget(null)
            router.refresh()
          }}
        />
      )}
    </div>
  )
}