export interface Birthday {
  id: string
  user_id: string
  name: string
  birthday: string
  birth_year: number | null
  category: string | null
  notes: string | null
  profile_picture_path: string | null
  created_at: string
  updated_at: string
}

export interface BirthdayWithMeta extends Birthday {
  nextOccurrence: Date
  daysUntil: number
  isToday: boolean
  isThisMonth: boolean
  isWithinNext3Months: boolean
  upcomingAge: number | null
  profilePictureUrl?: string | null
}