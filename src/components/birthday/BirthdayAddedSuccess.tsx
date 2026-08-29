import AssetPlaceholder from '@/components/ui/AssetPlaceholder'
import Button from '@/components/ui/Button'

interface BirthdayAddedSuccessProps {
  birthdayId: string
  onViewBirthday: () => void
  onAddAnother: () => void
}

export default function BirthdayAddedSuccess({ onViewBirthday, onAddAnother }: BirthdayAddedSuccessProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-2">
      <AssetPlaceholder label="Celebration illustration" width={140} height={140} />
      <p className="text-sm text-gray-500">
        Birthday added to your list — you won&apos;t miss it!
      </p>
      <div className="flex flex-col gap-3 w-full pt-2">
        <Button fullWidth onClick={onViewBirthday}>
          View Birthday
        </Button>
        <Button fullWidth variant="secondary" onClick={onAddAnother}>
          Add Another Birthday
        </Button>
      </div>
    </div>
  )
}