
'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Search, X } from 'lucide-react'
import Chip from '@/components/ui/Chip'
import Modal from '@/components/ui/Modal'
import EmptyState from './EmptyState'
import BirthdayCard from '@/components/birthday/BirthdayCard'
import BirthdayForm from '@/components/birthday/BirthdayForm'
import BirthdayAddedSuccess from '@/components/birthday/BirthdayAddedSuccess'
import DeleteConfirmDialog from '@/components/birthday/DeleteConfirmDialog'
import type { BirthdayWithMeta } from '@/types/birthday'

type FilterOption = 'all' | 'month' | '3months'

export default function UpcomingBirthdaysClient({ birthdays }: { birthdays: BirthdayWithMeta[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterOption>('all')

  const [addOpen, setAddOpen] = useState(() => searchParams.get('add') === '1')
  const [addedId, setAddedId] = useState<string | null>(null)
  const [editTarget, setEditTarget] = useState<BirthdayWithMeta | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<BirthdayWithMeta | null>(null)

  const filteredBirthdays = useMemo(() => {
    return birthdays.filter((b) => {
      const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase())
      const matchesFilter =
        filter === 'all' ||
        (filter === 'month' && b.isThisMonth) ||
        (filter === '3months' && b.isWithinNext3Months)
      return matchesSearch && matchesFilter
    })
  }, [birthdays, search, filter])

  const closeAddFlow = () => {
    setAddOpen(false)
    setAddedId(null)
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-heading font-bold text-xl text-[var(--color-heading)]">Upcoming Birthdays</h1>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <Chip active={filter === 'all'} onClick={() => setFilter('all')}>All</Chip>
        <Chip active={filter === 'month'} onClick={() => setFilter('month')}>This Month</Chip>
        <Chip active={filter === '3months'} onClick={() => setFilter('3months')}>Next 3 Months</Chip>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search birthdays..."
          className="w-full rounded-xl border border-[var(--color-border)] pl-10 pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {filteredBirthdays.length === 0 ? (
        <EmptyState
          variant={birthdays.length === 0 ? 'no-birthdays' : 'no-results'}
          onAddClick={() => setAddOpen(true)}
        />
      ) : (
        <div className="space-y-3">
          {filteredBirthdays.map((b) => (
            <BirthdayCard key={b.id} birthday={b} onEdit={setEditTarget} onDelete={setDeleteTarget} linkToDetail />
          ))}
        </div>
      )}

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