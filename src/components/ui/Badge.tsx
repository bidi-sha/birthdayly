interface BadgeProps {
  children: React.ReactNode
  tone?: 'purple' | 'pink' | 'neutral' | 'green' | 'orange'
}

const toneStyles = {
  purple: 'bg-[var(--color-primary-light)] text-[var(--color-primary)]',
  pink: 'bg-[var(--color-pink-light)] text-[var(--color-pink)]',
  neutral: 'bg-gray-100 text-gray-600',
  green: 'bg-[var(--color-green-light)] text-[var(--color-green)]',
  orange: 'bg-[var(--color-orange-light)] text-[var(--color-orange)]',
}

export default function Badge({ children, tone = 'purple' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${toneStyles[tone]}`}
    >
      {children}
    </span>
  )
}