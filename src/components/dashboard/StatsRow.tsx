interface StatsRowProps {
  total: number
  thisMonth: number
  today: number
}

export default function StatsRow({ total, thisMonth, today }: StatsRowProps) {
  const stats = [
    { label: 'Total Birthdays', value: total, bg: 'bg-[var(--color-primary-light)]', text: 'text-[var(--color-primary)]' },
    { label: 'This Month', value: thisMonth, bg: 'bg-[var(--color-pink-light)]', text: 'text-[var(--color-pink)]' },
    { label: 'Today 👍', value: today, bg: 'bg-[var(--color-yellow-light)]', text: 'text-[var(--color-yellow)]' },
  ]

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {stats.map(({ label, value, bg, text }) => (
        <div key={label} className={`rounded-2xl ${bg} p-3 sm:p-4 flex flex-col items-center justify-center gap-0.5`}>
          <span className={`text-xl sm:text-2xl font-bold ${text}`}>{value}</span>
          <span className={`text-[11px] sm:text-xs font-medium text-center ${text} opacity-80`}>{label}</span>
        </div>
      ))}
    </div>
  )
}