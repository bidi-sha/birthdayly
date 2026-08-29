import Link from 'next/link'
import AppBackground from '@/components/layout/AppBackground'
import AssetPlaceholder from '@/components/ui/AssetPlaceholder'
import DotsIndicator from '@/components/ui/DotsIndicator'
import Button from '@/components/ui/Button'

export default function OnboardingWelcomePage() {
  return (
    <AppBackground>
      <div className="min-h-screen flex flex-col items-center justify-between px-6 py-14 text-center">
        <div />

        <div className="flex flex-col items-center gap-5 max-w-xs">
          <AssetPlaceholder label="Welcome illustration" width={140} height={140} />

          <h1 className="font-heading font-extrabold text-2xl text-[var(--color-heading)]">
            Welcome to BirthDay!
          </h1>

          <p className="text-sm text-[var(--color-text-muted-purple)] leading-relaxed">
            Remember every special moment and never forget a birthday again 🎈
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 w-full max-w-xs">
          <DotsIndicator total={3} activeIndex={0} />
          <Link href="/login" className="w-full">
            <Button fullWidth>Get Started ✨</Button>
          </Link>
        </div>
      </div>
    </AppBackground>
  )
}