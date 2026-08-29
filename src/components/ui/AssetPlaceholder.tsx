interface AssetPlaceholderProps {
  label: string
  width?: number
  height?: number
  className?: string
}

export default function AssetPlaceholder({ label, width = 120, height = 120, className = '' }: AssetPlaceholderProps) {
  return (
    <div
      style={{ width, height }}
      className={`flex items-center justify-center text-center rounded-2xl border-2 border-dashed border-[var(--color-primary)]/40 bg-[var(--color-primary-light)]/40 text-[var(--color-primary)] font-medium leading-tight px-2 ${className}`}
    >
      {label}
    </div>
  )
}