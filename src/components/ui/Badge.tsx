interface BadgeProps {
  children: React.ReactNode
  tone?: 'purple' | 'pink' | 'neutral'
}

const toneStyles = {
  purple: 'bg-[var(--color-primary-light)] text-[var(--color-primary)]',
  pink: 'bg-[var(--color-pink-light)] text-[var(--color-pink)]',
  neutral: 'bg-gray-100 text-gray-600',
}

export default function Badge({ children, tone = 'purple' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${toneStyles[tone]}`}
    >
      {children}
    </span>
  )
}