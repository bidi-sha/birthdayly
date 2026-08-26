export interface Birthday {
  id: string
  user_id: string
  name: string
  birthday: string // ISO date string, e.g. "2000-11-19" — year is a placeholder unless birth_year is also set
  birth_year: number | null
  created_at: string
  updated_at: string
}

export interface BirthdayWithMeta extends Birthday {
  nextOccurrence: Date
  daysUntil: number
  isToday: boolean
  isThisMonth: boolean
  isWithinNext3Months: boolean
  upcomingAge: number | null // age they're turning on nextOccurrence, if birth_year is known
}