'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay,
  isToday as isTodayFn,
} from 'date-fns'
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { fallsOnDate } from '@/lib/birthday-utils'
import EmptyState from './EmptyState'
import type { Birthday } from '@/types/birthday'

export default function CalendarClient({ birthdays }: { birthdays: Birthday[] }) {
  const router = useRouter()
  const [viewedMonth, setViewedMonth] = useState(() => startOfMonth(new Date()))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewedMonth))
    const end = endOfWeek(endOfMonth(viewedMonth))
    return eachDayOfInterval({ start, end })
  }, [viewedMonth])

  const birthdaysOnDate = (date: Date) => birthdays.filter((b) => fallsOnDate(b.birthday, date))

  const selectedDayBirthdays = selectedDate ? birthdaysOnDate(selectedDate) : []

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-heading font-bold text-xl text-[var(--color-heading)]">Calendar</h1>
      </div>

      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setViewedMonth((m) => subMonths(m, 1))}
            className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-500"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="font-semibold text-gray-900">{format(viewedMonth, 'MMMM yyyy')}</span>
          <button
            onClick={() => setViewedMonth((m) => addMonths(m, 1))}
            className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-500"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
            <div key={d} className="text-center text-[11px] font-medium text-gray-400 py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const inMonth = isSameMonth(day, viewedMonth)
            const hasBirthday = birthdaysOnDate(day).length > 0
            const selected = selectedDate && isSameDay(day, selectedDate)
            const todayFlag = isTodayFn(day)

            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`
                  relative aspect-square rounded-xl text-sm flex items-center justify-center
                  ${!inMonth ? 'text-gray-300' : 'text-gray-700'}
                  ${selected ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-gray-50'}
                  ${todayFlag && !selected ? 'font-bold text-[var(--color-primary)]' : ''}
                `}
              >
                {format(day, 'd')}
                {hasBirthday && (
                  <span
                    className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                      selected ? 'bg-white' : 'bg-[var(--color-pink)]'
                    }`}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {selectedDate && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            {format(selectedDate, 'EEEE, d MMMM')}
          </h2>
          {selectedDayBirthdays.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No birthdays on this date.</p>
          ) : (
            <div className="space-y-2">
              {selectedDayBirthdays.map((b) => (
                <button
                  key={b.id}
                  onClick={() => router.push(`/dashboard/birthdays/${b.id}`)}
                  className="w-full flex items-center gap-3 bg-white rounded-2xl border border-[var(--color-border)] p-4 text-left hover:shadow-sm transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-semibold shrink-0">
                    {b.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-900">{b.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {birthdays.length === 0 && (
        <EmptyState variant="no-birthdays" onAddClick={() => router.push('/dashboard/birthdays?add=1')} />
      )}
    </div>
  )
}