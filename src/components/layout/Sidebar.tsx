'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, Settings, User, Gift } from 'lucide-react'
import LogoutButton from './LogoutButton'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/calendar', label: 'Calendar', icon: Calendar },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:justify-between h-screen sticky top-0 bg-white border-r border-[var(--color-border)] p-6">
      <div>
        <div className="flex items-center gap-2 mb-8">
          <Gift className="text-[var(--color-primary)]" size={22} />
          <span className="font-bold text-lg text-gray-900">Birthdayly</span>
        </div>

        <nav className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
                  ${active
                    ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                    : 'text-gray-600 hover:bg-gray-50'}
                `}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </nav>
      </div>

      <LogoutButton />
    </aside>
  )
}