import Link from 'next/link'
import { signup } from './actions'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import PasswordInput from '@/components/ui/PasswordInput'
import AssetPlaceholder from '@/components/ui/AssetPlaceholder'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-8">
      <div className="w-full max-w-md">
        <h1 className="font-heading font-extrabold text-2xl text-[var(--color-heading)] mb-1">
          Create your account 💜
        </h1>
        <p className="text-gray-500 text-sm mb-6 max-w-xs">
          Start adding birthdays and never miss a special day again
        </p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <form action={signup} className="space-y-4">
          <Input
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            required
            placeholder="Emma Watson"
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            required
            placeholder="emma@example.com"
          />

          <PasswordInput
            id="password"
            name="password"
            label="Password"
            required
            minLength={6}
            placeholder="Create passwords"
          />

          <Button type="submit" fullWidth>
            Sign up ✨
          </Button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-[var(--color-border)] flex-1" />
          <span className="text-xs text-gray-400">or continue with</span>
          <div className="h-px bg-[var(--color-border)] flex-1" />
        </div>

        <button
          type="button"
          disabled
          title="Google sign-in coming soon"
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] py-2.5 text-sm font-medium text-gray-500 disabled:opacity-70"
        >
          <AssetPlaceholder label="G" width={18} height={18} className="text-[9px] rounded-full" />
          Google Account
        </button>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--color-primary)] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}