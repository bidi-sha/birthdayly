interface DotsIndicatorProps {
  total: number
  activeIndex: number
}

export default function DotsIndicator({
  total,
  activeIndex,
}: DotsIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i === activeIndex
              ? 'w-5 bg-[var(--color-primary)]'
              : 'w-1.5 bg-white/70'
          }`}
        />
      ))}
    </div>
  )
}