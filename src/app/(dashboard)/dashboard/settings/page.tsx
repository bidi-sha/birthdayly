

'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Switch from '@/components/ui/Switch'
import Chip from '@/components/ui/Chip'
import LogoutButton from '@/components/layout/LogoutButton'
import AssetPlaceholder from '@/components/ui/AssetPlaceholder'
import { useAppPreferences } from '@/components/providers/AppPreferences'

export default function SettingsPage() {
  const {
    notifications,
    setNotifications,
    theme,
    setTheme,
  } = useAppPreferences()

  return (
    <div className="p-4 md:p-8 max-w-md mx-auto space-y-5 pb-24">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={18} />
        </Link>

        <h1 className="font-heading font-bold text-xl text-[var(--color-heading)]">
          Settings
        </h1>
      </div>

      {/* Account / Profile */}
      <Link
        href="/dashboard/profile"
        className="flex items-center gap-3 bg-white rounded-2xl border border-[var(--color-border)] p-4 hover:shadow-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
      >
        <AssetPlaceholder
          label="Avatar"
          width={44}
          height={44}
          className="rounded-full text-[9px]"
        />

        <div>
          <p className="text-sm font-semibold text-gray-900">
            Account
          </p>

          <p className="text-xs text-gray-500">
            Manage your profile
          </p>
        </div>
      </Link>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] divide-y divide-[var(--color-border)]">

        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-sm font-medium text-gray-700">
            Notifications
          </span>

          <Switch
            checked={notifications}
            onChange={setNotifications}
            label="Notifications"
          />
        </div>

        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-sm text-gray-500">
            Reminder Time
          </span>

          <span className="text-sm text-gray-700">
            9:00 AM
          </span>
        </div>

        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-sm text-gray-500">
            Default Reminder
          </span>

          <span className="text-sm text-gray-700">
            1 day before
          </span>
        </div>

      </div>

      {/* Appearance */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] divide-y divide-[var(--color-border)]">

        <div className="flex items-center justify-between px-4 py-3.5">

          <span className="text-sm font-medium text-gray-700">
            Theme
          </span>

          <div className="flex gap-1.5">

            <Chip
              active={theme === 'Light'}
              onClick={() => setTheme('Light')}
            >
              Light
            </Chip>

            <Chip
              active={theme === 'Dark'}
              onClick={() => setTheme('Dark')}
            >
              Dark
            </Chip>

          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-sm text-gray-500">
            Language
          </span>

          <span className="text-sm text-gray-700">
            English
          </span>
        </div>

      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] divide-y divide-[var(--color-border)]">

        <button
          disabled
          title="Coming soon"
          className="w-full text-left px-4 py-3.5 text-sm font-medium text-gray-700 disabled:opacity-50"
        >
          Change Password
        </button>

        <button
          disabled
          title="Coming soon"
          className="w-full text-left px-4 py-3.5 text-sm font-medium text-gray-700 disabled:opacity-50"
        >
          Export Data
        </button>

        <button
          disabled
          title="Not yet available — needs a dedicated confirmation flow"
          className="w-full text-left px-4 py-3.5 text-sm font-medium text-red-500 disabled:opacity-50"
        >
          Delete Account
        </button>

      </div>

      {/* Version */}
      <p className="text-center text-xs text-gray-400">
        BirthDay App · Version 1.0 (Build 1)
      </p>

      {/* Logout */}
      <LogoutButton variant="button" />

    </div>
  )
}

