
'use client'

import { format } from 'date-fns'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import type { BirthdayWithMeta } from '@/types/birthday'

interface BirthdayCardProps {
  birthday: BirthdayWithMeta
  onEdit: (birthday: BirthdayWithMeta) => void
  onDelete: (birthday: BirthdayWithMeta) => void
  linkToDetail?: boolean
}

const AVATAR_PALETTE = [
  { bg: 'bg-[var(--color-primary-light)]', text: 'text-[var(--color-primary)]' },
  { bg: 'bg-[var(--color-pink-light)]', text: 'text-[var(--color-pink)]' },
  { bg: 'bg-[var(--color-green-light)]', text: 'text-[var(--color-green)]' },
  { bg: 'bg-[var(--color-orange-light)]', text: 'text-[var(--color-orange)]' },
]

function avatarStyleForName(name: string) {
  const idx = name.charCodeAt(0) % AVATAR_PALETTE.length
  return AVATAR_PALETTE[idx]
}

function badgeTone(
  daysUntil: number
): 'purple' | 'pink' | 'neutral' | 'green' | 'orange' {
  if (daysUntil === 0) return 'pink'
  if (daysUntil <= 3) return 'green'
  if (daysUntil <= 10) return 'orange'
  return 'neutral'
}

export default function BirthdayCard({
  birthday,
  onEdit,
  onDelete,
  linkToDetail = false,
}: BirthdayCardProps) {
  const initial = birthday.name.charAt(0).toUpperCase()
  const avatarStyle = avatarStyleForName(birthday.name)

  const content = (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-[var(--color-border)] p-4 hover:shadow-sm transition-shadow">
      {birthday.profilePictureUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={birthday.profilePictureUrl}
          alt=""
          loading="lazy"
          className="w-11 h-11 rounded-full object-cover shrink-0"
        />
      ) : (
        <div
          className={`w-11 h-11 rounded-full ${avatarStyle.bg} ${avatarStyle.text} flex items-center justify-center font-semibold shrink-0`}
        >
          {initial}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">
          {birthday.name}
        </p>

        <p className="text-xs text-gray-500">
          {format(birthday.nextOccurrence, 'd MMM')}
          {birthday.upcomingAge
            ? ` · Turning ${birthday.upcomingAge}`
            : ''}
        </p>
      </div>

      <Badge tone={badgeTone(birthday.daysUntil) as 'purple' | 'pink' | 'neutral'}>
        {birthday.isToday ? '🎉' : `In ${birthday.daysUntil}d`}
      </Badge>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={(e) => {
            e.preventDefault()
            onEdit(birthday)
          }}
          className="text-gray-400 hover:text-[var(--color-primary)] p-2.5 rounded-lg hover:bg-gray-50 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label={`Edit ${birthday.name}`}
        >
          <Pencil size={15} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault()
            onDelete(birthday)
          }}
          className="text-gray-400 hover:text-red-500 p-2.5 rounded-lg hover:bg-gray-50 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label={`Delete ${birthday.name}`}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )

  if (linkToDetail) {
    return (
      <Link href={`/dashboard/birthdays/${birthday.id}`}>
        {content}
      </Link>
    )
  }

  return content
}
