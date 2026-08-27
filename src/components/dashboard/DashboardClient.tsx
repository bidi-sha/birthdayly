'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Plus, X } from 'lucide-react'
import Chip from '@/components/ui/Chip'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import PageTransition from '@/components/layout/PageTransition'
import StatsRow from './StatsRow'
import EmptyState from './EmptyState'
import BirthdayCard from '@/components/birthday/BirthdayCard'
import TodayCelebration from '@/components/birthday/TodayCelebration'
import BirthdayForm from '@/components/birthday/BirthdayForm'
import DeleteConfirmDialog from '@/components/birthday/DeleteConfirmDialog'
import type { BirthdayWithMeta } from '@/types/birthday'

type FilterOption = 'all' | 'month' | '3months'

interface DashboardClientProps {
  birthdays: BirthdayWithMeta[]
  greetingName: string
}

export default function DashboardClient({
  birthdays,
  greetingName,
}: DashboardClientProps) {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterOption>('all')

  const [addOpen, setAddOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<BirthdayWithMeta | null>(null)
  const [deleteTarget, setDeleteTarget] =
    useState<BirthdayWithMeta | null>(null)

  const hour = new Date().getHours()

  const greeting =
    hour < 12
      ? 'Good morning'
      : hour < 18
        ? 'Good afternoon'
        : 'Good evening'

  const todayBirthdays = useMemo(
    () => birthdays.filter((b) => b.isToday),
    [birthdays]
  )

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

  const thisMonthCount = useMemo(
    () => birthdays.filter((b) => b.isThisMonth).length,
    [birthdays]
  )

  const hasActiveFilters = search.trim() !== '' || filter !== 'all'

  const clearFilters = () => {
    setSearch('')
    setFilter('all')
  }

  const refreshAndClose = (closeFn: () => void) => {
    closeFn()
    router.refresh()
  }

  return (
    <PageTransition>
      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {greeting}, {greetingName}! 👋
          </h1>

          <p className="text-gray-500 text-sm mt-0.5">
            Here&apos;s what&apos;s happening with your birthdays.
          </p>
        </div>

        {/* Stats */}
        <StatsRow
          total={birthdays.length}
          thisMonth={thisMonthCount}
          today={todayBirthdays.length}
        />

        {/* Today's birthdays */}
        {birthdays.length > 0 && (
          <TodayCelebration birthdays={todayBirthdays} />
        )}

        {/* Search + Add */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
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
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <Button
            onClick={() => setAddOpen(true)}
            className="shrink-0 flex items-center gap-1.5"
          >
            <Plus size={16} />

            <span className="hidden sm:inline">
              Add Birthday
            </span>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-2">
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

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-[var(--color-primary)] hover:underline shrink-0 whitespace-nowrap"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Birthday Results */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">
              Upcoming Birthdays
            </h2>

            {hasActiveFilters && (
              <span className="text-xs text-gray-400">
                {filteredBirthdays.length} of {birthdays.length}
              </span>
            )}
          </div>

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
            <motion.div
              layout
              className="space-y-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredBirthdays.map((b, index) => (
                  <motion.div
                    key={b.id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.04,
                    }}
                  >
                    <BirthdayCard
                      birthday={b}
                      onEdit={setEditTarget}
                      onDelete={setDeleteTarget}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Add Birthday Modal */}
        <Modal
          isOpen={addOpen}
          onClose={() => setAddOpen(false)}
          title="Add New Birthday"
        >
          <BirthdayForm
            mode="add"
            onCancel={() => setAddOpen(false)}
            onSuccess={() =>
              refreshAndClose(() => setAddOpen(false))
            }
          />
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
              onSuccess={() =>
                refreshAndClose(() => setEditTarget(null))
              }
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
            onDeleted={() =>
              refreshAndClose(() => setDeleteTarget(null))
            }
          />
        )}
      </div>
    </PageTransition>
  )
}