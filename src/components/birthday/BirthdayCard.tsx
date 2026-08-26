'use client'

import { format } from 'date-fns'
import { Pencil, Trash2 } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import type { BirthdayWithMeta } from '@/types/birthday'

interface BirthdayCardProps {
  birthday: BirthdayWithMeta
}

function badgeTone(daysUntil: number): 'purple' | 'pink' | 'neutral' {
  if (daysUntil === 0) return 'pink'
  if (daysUntil <= 7) return 'purple'
  return 'neutral'
}

export default function BirthdayCard({ birthday }: BirthdayCardProps) {
  const initial = birthday.name.charAt(0).toUpperCase()

  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-[var(--color-border)] p-4 hover:shadow-sm transition-shadow">
      <div className="w-11 h-11 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-semibold shrink-0">
        {initial}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{birthday.name}</p>
        <p className="text-xs text-gray-500">
          {format(birthday.nextOccurrence, 'd MMM')}
          {birthday.isToday ? ' · Today!' : ` · in ${birthday.daysUntil} day${birthday.daysUntil === 1 ? '' : 's'}`}
          {birthday.upcomingAge ? ` · Turning ${birthday.upcomingAge}` : ''}
        </p>
      </div>

      <Badge tone={badgeTone(birthday.daysUntil)}>
        {birthday.isToday ? '🎉' : birthday.daysUntil}
      </Badge>

      <div className="flex items-center gap-1 shrink-0">
        <button
          className="text-gray-400 hover:text-[var(--color-primary)] p-1.5 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-40"
          disabled
          title="Coming in Phase 10"
        >
          <Pencil size={15} />
        </button>
        <button
          className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-40"
          disabled
          title="Coming in Phase 10"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}