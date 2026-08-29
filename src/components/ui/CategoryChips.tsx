'use client'

import Chip from './Chip'

const CATEGORIES = ['All', 'Work', 'Play', 'Love', 'Family']

interface CategoryChipsProps {
  value: string
  onChange: (value: string) => void
  name: string
}

export default function CategoryChips({ value, onChange, name }: CategoryChipsProps) {
  return (
    <div>
      <input type="hidden" name={name} value={value} />
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <Chip key={cat} active={value === cat} onClick={() => onChange(cat)}>
            {cat}
          </Chip>
        ))}
      </div>
    </div>
  )
}