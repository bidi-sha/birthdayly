import { Gift, CalendarDays, PartyPopper } from 'lucide-react'

interface StatsRowProps {
  total: number
  thisMonth: number
  today: number
}

export default function StatsRow({ total, thisMonth, today }: StatsRowProps) {
  const stats = [
    { label: 'Total', value: total, icon: Gift, tone: 'purple' as const },
    { label: 'This Month', value: thisMonth, icon: CalendarDays, tone: 'neutral' as const },
    { label: 'Today', value: today, icon: PartyPopper, tone: 'pink' as const },
  ]

  const toneStyles = {
    purple: 'bg-[var(--color-primary-light)] text-[var(--color-primary)]',
    pink: 'bg-[var(--color-pink-light)] text-[var(--color-pink)]',
    neutral: 'bg-gray-100 text-gray-500',
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(({ label, value, icon: Icon, tone }) => (
        <div
          key={label}
          className="bg-white rounded-2xl border border-[var(--color-border)] p-4 flex flex-col items-center justify-center gap-1"
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${toneStyles[tone]}`}>
            <Icon size={16} />
          </div>
          <span className="text-xl font-bold text-gray-900">{value}</span>
          <span className="text-xs text-gray-500">{label}</span>
        </div>
      ))}
    </div>
  )
}