'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AppBackground from '@/components/layout/AppBackground'
import AssetPlaceholder from '@/components/ui/AssetPlaceholder'

export default function OnboardingSplashPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => router.push('/onboarding/welcome'), 2500)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <AppBackground>
      <button
        onClick={() => router.push('/onboarding/welcome')}
        className="min-h-screen w-full flex flex-col items-center justify-between px-6 py-14 text-center"
        aria-label="Continue to welcome screen"
      >
        <div />
        <div className="flex flex-col items-center gap-6 max-w-sm">
          <h1 className="font-heading font-extrabold text-4xl leading-[1.05] text-[var(--color-heading)]">
            BirthDay
            <br />
            Reminder App
          </h1>
          <p className="font-heading font-bold text-[var(--color-primary)] text-lg">
            Never miss a special day ✨
          </p>
          <div className="w-full flex justify-center py-6">
            <AssetPlaceholder label="Splash illustration" width={220} height={155} />
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">Reminders with a warm hug 💜</p>
        </div>
        <div className="w-10 h-1.5 rounded-full bg-[var(--color-heading)]" />
      </button>
    </AppBackground>
  )
}