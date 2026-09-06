'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import MemoryCard from './MemoryCard'
import MemoryForm from './MemoryForm'
import { deleteMemory } from '@/app/(dashboard)/dashboard/birthdays/[id]/actions'
import { useToast } from '@/components/ui/Toast'
import type { MemoryWithUrl } from '@/types/memory'

export default function MemoriesGallery({ birthdayId, memories }: { birthdayId: string; memories: MemoryWithUrl[] }) {
  const router = useRouter()
  const { showToast } = useToast()
  const [addOpen, setAddOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<MemoryWithUrl | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<MemoryWithUrl | null>(null)
  const [isPending, startTransition] = useTransition()
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDelete = () => {
    if (!deleteTarget) return
    setDeleteError(null)
    startTransition(async () => {
      const result = await deleteMemory(deleteTarget.id)
      if (!result.success) {
        setDeleteError(result.error)
        return
      }
      showToast('Memory deleted')
      setDeleteTarget(null)
      router.refresh()
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-700">Photos & Memories</h2>
        <button onClick={() => setAddOpen(true)} className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center" aria-label="Add memory">
          <Plus size={16} />
        </button>
      </div>

      {memories.length === 0 ? (
        <button
          onClick={() => setAddOpen(true)}
          className="w-full flex flex-col items-center gap-2 py-10 rounded-2xl border-2 border-dashed border-[var(--color-border)] text-gray-400 hover:bg-gray-50 transition-colors"
        >
          <Plus size={20} />
          <span className="text-sm">Add your first memory</span>
        </button>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {memories.map((m) => (
            <MemoryCard key={m.id} memory={m} onEdit={() => setEditTarget(m)} onDelete={() => setDeleteTarget(m)} />
          ))}
        </div>
      )}

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Add Memory">
        <MemoryForm
          birthdayId={birthdayId}
          mode="add"
          onCancel={() => setAddOpen(false)}
          onSuccess={() => {
            setAddOpen(false)
            showToast('Memory added ✨')
            router.refresh()
          }}
        />
      </Modal>

      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Memory">
        {editTarget && (
          <MemoryForm
            birthdayId={birthdayId}
            mode="edit"
            memory={editTarget}
            currentImageUrl={editTarget.imageUrl}
            onCancel={() => setEditTarget(null)}
            onSuccess={() => {
              setEditTarget(null)
              showToast('Memory updated ✨')
              router.refresh()
            }}
          />
        )}
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Memory?">
        <div className="flex flex-col items-center text-center gap-3">
          <p className="text-sm text-gray-600">This memory will be permanently deleted. This can&apos;t be undone.</p>
          {deleteError && <div className="rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3 w-full">{deleteError}</div>}
          <div className="flex gap-3 w-full pt-2">
            <Button variant="secondary" fullWidth onClick={() => setDeleteTarget(null)} disabled={isPending}>Cancel</Button>
            <Button variant="destructive" fullWidth onClick={handleDelete} disabled={isPending}>
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}