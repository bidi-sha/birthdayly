import BearMascot from '@/components/ui/BearMascot'
import Button from '@/components/ui/Button'
import type { BirthdayWithMeta } from '@/types/birthday'
import { format } from 'date-fns'

interface TodayCelebrationProps {
  birthdays: BirthdayWithMeta[]
}

export default function TodayCelebration({ birthdays }: TodayCelebrationProps) {
  if (birthdays.length === 0) return null

  const [first, ...rest] = birthdays

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-pink-light)] rounded-[var(--radius-card)] p-6 flex flex-col items-center text-center">
      <BearMascot variant="party" size={110} />
      <h3 className="text-xl font-bold text-gray-900 mt-2">
        It&apos;s {first.name}&apos;s Birthday! 🎉
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        {format(first.nextOccurrence, 'd MMMM')}
        {first.upcomingAge ? ` · Turning ${first.upcomingAge}` : ''}
      </p>
      {rest.length > 0 && (
        <p className="text-xs text-gray-500 mt-1">
          +{rest.length} more birthday{rest.length > 1 ? 's' : ''} today
        </p>
      )}
      <Button variant="primary" className="mt-4" disabled title="Coming soon">
        Send Wishes 💌
      </Button>
    </div>
  )
}