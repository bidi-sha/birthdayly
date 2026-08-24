interface ChipProps {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}

export default function Chip({ children, active = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-full px-4 py-1.5 text-sm font-medium transition-colors
        ${active
          ? 'bg-[var(--color-primary)] text-white'
          : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)] hover:bg-gray-50'}
      `}
    >
      {children}
    </button>
  )
}