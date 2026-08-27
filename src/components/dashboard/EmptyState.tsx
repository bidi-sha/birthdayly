import BearMascot from '@/components/ui/BearMascot'
import Button from '@/components/ui/Button'

interface EmptyStateProps {
  variant: 'no-birthdays' | 'no-results'
  onAddClick?: () => void
}

export default function EmptyState({ variant, onAddClick }: EmptyStateProps) {
  const isNoResults = variant === 'no-results'

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <BearMascot variant={isNoResults ? 'plain' : 'balloon'} size={140} />
      <h3 className="text-lg font-bold text-gray-900 mt-4">
        {isNoResults ? 'No matches found' : 'No birthdays yet!'}
      </h3>
      <p className="text-sm text-gray-500 mt-1 max-w-xs">
        {isNoResults
          ? 'Try a different name or clear your filters.'
          : 'Add your first birthday to get started and never miss a special day.'}
      </p>
      {!isNoResults && (
        <Button className="mt-5" onClick={onAddClick}>
          + Add Birthday
        </Button>
      )}
    </div>
  )
}