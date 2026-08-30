
'use client'

import { useEffect, useMemo, useState } from 'react'
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

export default function UpcomingBirthdaysClient({
  birthdays,
}: {
  birthdays: BirthdayWithMeta[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterOption>('all')

  const [addOpen, setAddOpen] = useState(false)
  const [addedId, setAddedId] = useState<string | null>(null)
  const [editTarget, setEditTarget] = useState<BirthdayWithMeta | null>(null)
  const [deleteTarget, setDeleteTarget] =
    useState<BirthdayWithMeta | null>(null)

  // Opens the Add Birthday modal when the URL contains ?add=1
  // Example: /dashboard/birthdays?add=1
  useEffect(() => {
    if (searchParams.get('add') === '1') {
      setAddOpen(true)
    }
  }, [searchParams])

  const filteredBirthdays = useMemo(() => {
    return birthdays.filter((b) => {
      const matchesSearch = b.name
        .toLowerCase()
        .includes(search.toLowerCase())

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

    // Remove ?add=1 from the URL after closing the modal
    if (searchParams.get('add') === '1') {
      router.replace('/dashboard/birthdays')
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={18} />
        </Link>

        <h1 className="font-heading font-bold text-xl text-[var(--color-heading)]">
          Upcoming Birthdays
        </h1>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Chip
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          All
        </Chip>

        <Chip
          active={filter === 'month'}
          onClick={() => setFilter('month')}
        >
          This Month
        </Chip>

        <Chip
          active={filter === '3months'}
          onClick={() => setFilter('3months')}
        >
          Next 3 Months
        </Chip>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search birthdays..."
          className="w-full rounded-xl border border-[var(--color-border)] pl-10 pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          aria-label="Search birthdays"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Birthday List */}
      {filteredBirthdays.length === 0 ? (
        <EmptyState
          variant={
            birthdays.length === 0
              ? 'no-birthdays'
              : 'no-results'
          }
          onAddClick={() => setAddOpen(true)}
        />
      ) : (
        <div className="space-y-3">
          {filteredBirthdays.map((b) => (
            <BirthdayCard
              key={b.id}
              birthday={b}
              onEdit={setEditTarget}
              onDelete={setDeleteTarget}
              linkToDetail
            />
          ))}
        </div>
      )}

      {/* Add Birthday Modal */}
      <Modal
        isOpen={addOpen}
        onClose={closeAddFlow}
        title={addedId ? 'Birthday Added!' : 'Add New Birthday'}
      >
        {addedId ? (
          <BirthdayAddedSuccess
            birthdayId={addedId}
            onAddAnother={() => setAddedId(null)}
            onViewBirthday={() => {
              closeAddFlow()
              router.push(
                `/dashboard/birthdays/${addedId}`
              )
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

      {/* Edit Birthday Modal */}
      <Modal
        isOpen={!!editTarget}
        onClose={() => setEditTarget(null)}
        title="Edit Birthday"
      >
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

      {/* Delete Confirmation */}
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

