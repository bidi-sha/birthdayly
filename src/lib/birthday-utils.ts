import {
  startOfDay,
  differenceInCalendarDays,
  isLeapYear,
  isSameDay,
  getMonth,
  getDate,
  getYear,
} from 'date-fns'
import type { Birthday, BirthdayWithMeta } from '@/types/birthday'

const FEB = 1

export function resolveDateForYear(month: number, day: number, year: number): Date {
  if (month === FEB && day === 29 && !isLeapYear(new Date(year, FEB, 1))) {
    return new Date(year, FEB, 28)
  }
  return new Date(year, month, day)
}

export function getNextOccurrence(birthdayDateStr: string, today: Date = new Date()): Date {
  const todayStart = startOfDay(today)
  const source = new Date(birthdayDateStr)
  const month = getMonth(source)
  const day = getDate(source)

  const thisYear = getYear(todayStart)
  let candidate = resolveDateForYear(month, day, thisYear)

  if (candidate < todayStart) {
    candidate = resolveDateForYear(month, day, thisYear + 1)
  }

  return candidate
}

export function getDaysUntil(birthdayDateStr: string, today: Date = new Date()): number {
  const next = getNextOccurrence(birthdayDateStr, today)
  return differenceInCalendarDays(next, startOfDay(today))
}

export function isBirthdayToday(birthdayDateStr: string, today: Date = new Date()): boolean {
  return getDaysUntil(birthdayDateStr, today) === 0
}

export function isBirthdayThisMonth(birthdayDateStr: string, today: Date = new Date()): boolean {
  const next = getNextOccurrence(birthdayDateStr, today)
  return getMonth(next) === getMonth(startOfDay(today)) && getYear(next) === getYear(startOfDay(today))
}

export function isBirthdayWithinNext3Months(birthdayDateStr: string, today: Date = new Date()): boolean {
  const days = getDaysUntil(birthdayDateStr, today)
  return days >= 0 && days <= 92
}

export function getUpcomingAge(
  birthYear: number | null,
  birthdayDateStr: string,
  today: Date = new Date()
): number | null {
  if (birthYear == null) return null
  const next = getNextOccurrence(birthdayDateStr, today)
  return getYear(next) - birthYear
}

/**
 * Checks whether a birthday (month/day, Feb-29-aware) falls on a specific
 * calendar date, in that date's own year — used by the Calendar screen
 * when browsing arbitrary months, not just "next occurrence."
 */
export function fallsOnDate(birthdayDateStr: string, date: Date): boolean {
  const source = new Date(birthdayDateStr)
  const month = getMonth(source)
  const day = getDate(source)
  const target = resolveDateForYear(month, day, getYear(date))
  return isSameDay(target, date)
}

export function enrichAndSortBirthdays(
  birthdays: Birthday[],
  today: Date = new Date()
): BirthdayWithMeta[] {
  const enriched: BirthdayWithMeta[] = birthdays.map((b) => {
    const nextOccurrence = getNextOccurrence(b.birthday, today)
    const daysUntil = getDaysUntil(b.birthday, today)
    return {
      ...b,
      nextOccurrence,
      daysUntil,
      isToday: daysUntil === 0,
      isThisMonth: isBirthdayThisMonth(b.birthday, today),
      isWithinNext3Months: isBirthdayWithinNext3Months(b.birthday, today),
      upcomingAge: getUpcomingAge(b.birth_year, b.birthday, today),
    }
  })

  return enriched.sort((a, b) => a.daysUntil - b.daysUntil)
}