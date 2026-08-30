'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Plus, Calendar, User } from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()

  const items = [
    { href: '/dashboard', icon: Home },
    { href: '/dashboard/birthdays', icon: Search },
    { href: '/dashboard/birthdays?add=1', icon: Plus, isFab: true },
    { href: '/dashboard/calendar', icon: Calendar },
    { href: '/dashboard/profile', icon: User },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--color-border)] px-4 py-2">
      <div className="flex items-center justify-between">
        {items.map(({ href, icon: Icon, isFab }, i) => {
          const active = pathname === href.split('?')[0]
          if (isFab) {
            return (
              <Link
                key={i}
                href={href}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-primary)] text-white -mt-6 shadow-lg"
                aria-label="Add birthday"
              >
                <Icon size={22} />
              </Link>
            )
          }
          return (
            <Link
              key={i}
              href={href}
              className={`flex items-center justify-center w-11 h-11 rounded-lg ${active ? 'text-[var(--color-primary)]' : 'text-gray-400'}`}
            >
              <Icon size={20} />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}