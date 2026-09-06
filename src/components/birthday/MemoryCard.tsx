'use client'

import { format } from 'date-fns'
import { Pencil, Trash2 } from 'lucide-react'
import type { MemoryWithUrl } from '@/types/memory'

interface MemoryCardProps {
  memory: MemoryWithUrl
  onEdit: () => void
  onDelete: () => void
}

export default function MemoryCard({ memory, onEdit, onDelete }: MemoryCardProps) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]">
      <div className="aspect-square bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={memory.imageUrl} alt={memory.caption ?? 'Memory'} loading="lazy" className="w-full h-full object-cover" />
      </div>

      {(memory.caption || memory.memory_date) && (
        <div className="p-2.5">
          {memory.caption && <p className="text-xs font-medium text-gray-900 truncate">{memory.caption}</p>}
          {memory.memory_date && <p className="text-[11px] text-gray-400">{format(new Date(memory.memory_date), 'd MMM yyyy')}</p>}
        </div>
      )}

      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <button onClick={onEdit} className="w-7 h-7 rounded-full bg-white/90 text-gray-600 hover:text-[var(--color-primary)] flex items-center justify-center shadow" aria-label="Edit memory">
          <Pencil size={12} />
        </button>
        <button onClick={onDelete} className="w-7 h-7 rounded-full bg-white/90 text-gray-600 hover:text-red-500 flex items-center justify-center shadow" aria-label="Delete memory">
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  )
}