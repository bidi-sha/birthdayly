'use client'

import { motion } from 'framer-motion'
import BearMascot from '@/components/ui/BearMascot'
import Button from '@/components/ui/Button'
import type { BirthdayWithMeta } from '@/types/birthday'
import { format } from 'date-fns'

interface TodayCelebrationProps {
  birthdays: BirthdayWithMeta[]
}

export default function TodayCelebration({ birthdays }: TodayCelebrationProps) {
  if (birthdays.length === 0) return null

  const [first, ...rest] = birthdays

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-pink-light)] rounded-[var(--radius-card)] p-6 flex flex-col items-center text-center"
    >
      <motion.div
        animate={{ rotate: [0, -6, 6, -4, 4, 0] }}
        transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
      >
        <BearMascot variant="party" size={110} />
      </motion.div>
      <h3 className="text-xl font-bold text-gray-900 mt-2">
        It&apos;s {first.name}&apos;s Birthday! 🎉
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        {format(first.nextOccurrence, 'd MMMM')}
        {first.upcomingAge ? ` · Turning ${first.upcomingAge}` : ''}
      </p>
      {rest.length > 0 && (
        <p className="text-xs text-gray-500 mt-1">
          +{rest.length} more birthday{rest.length > 1 ? 's' : ''} today
        </p>
      )}
      <Button variant="primary" className="mt-4" disabled title="Coming soon">
        Send Wishes 💌
      </Button>
    </motion.div>
  )
}