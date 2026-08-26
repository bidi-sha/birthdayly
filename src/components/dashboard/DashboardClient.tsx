'use client'

import { useMemo, useState } from 'react'
import { Search, Plus } from 'lucide-react'
import Chip from '@/components/ui/Chip'
import Button from '@/components/ui/Button'
import StatsRow from './StatsRow'
import EmptyState from './EmptyState'
import BirthdayCard from '@/components/birthday/BirthdayCard'
import TodayCelebration from '@/components/birthday/TodayCelebration'
import type { BirthdayWithMeta } from '@/types/birthday'

type FilterOption = 'all' | 'month' | '3months'

interface DashboardClientProps {
  birthdays: BirthdayWithMeta[]
  greetingName: string
}

export default function DashboardClient({ birthdays, greetingName }: DashboardClientProps) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterOption>('all')

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const todayBirthdays = useMemo(() => birthdays.filter((b) => b.isToday), [birthdays])

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

  const thisMonthCount = useMemo(() => birthdays.filter((b) => b.isThisMonth).length, [birthdays])

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {greeting}, {greetingName}! 👋
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Here&apos;s what&apos;s happening with your birthdays.</p>
      </div>

      <StatsRow total={birthdays.length} thisMonth={thisMonthCount} today={todayBirthdays.length} />

      {birthdays.length > 0 && <TodayCelebration birthdays={todayBirthdays} />}

      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search birthdays..."
            className="w-full rounded-xl border border-[var(--color-border)] pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
        </div>
        <Button disabled title="Coming in Phase 10" className="shrink-0 flex items-center gap-1.5">
          <Plus size={16} />
          <span className="hidden sm:inline">Add Birthday</span>
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <Chip active={filter === 'all'} onClick={() => setFilter('all')}>All</Chip>
        <Chip active={filter === 'month'} onClick={() => setFilter('month')}>This Month</Chip>
        <Chip active={filter === '3months'} onClick={() => setFilter('3months')}>Next 3 Months</Chip>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Upcoming Birthdays</h2>
        {filteredBirthdays.length === 0 ? (
          <EmptyState variant={birthdays.length === 0 ? 'no-birthdays' : 'no-results'} />
        ) : (
          <div className="space-y-3">
            {filteredBirthdays.map((b) => (
              <BirthdayCard key={b.id} birthday={b} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}