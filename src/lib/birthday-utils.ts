import {
  startOfDay,
  differenceInCalendarDays,
  isLeapYear,
  getMonth,
  getDate,
  getYear,
} from 'date-fns'
import type { Birthday, BirthdayWithMeta } from '@/types/birthday'

const FEB = 1 // date-fns/JS Date months are 0-indexed

/**
 * Given a birthday's month/day and a target year, returns the date to
 * celebrate it on that year — handling Feb 29 by falling back to Feb 28
 * in non-leap years.
 */
function resolveDateForYear(month: number, day: number, year: number): Date {
  if (month === FEB && day === 29 && !isLeapYear(new Date(year, FEB, 1))) {
    return new Date(year, FEB, 28)
  }
  return new Date(year, month, day)
}

/**
 * Finds the next occurrence of a birthday on or after `today`.
 * If this year's date has already passed, rolls forward to next year.
 */
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
  // ~3 months, generously covering month-length variation
  return days >= 0 && days <= 92
}

/**
 * Age the person will turn on their next occurrence, if birth_year is known.
 */
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
 * Takes raw Birthday rows and returns them enriched with all calculated
 * fields, sorted by soonest upcoming birthday first.
 */
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