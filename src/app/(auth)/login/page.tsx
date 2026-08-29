import Link from 'next/link'
import { login } from './actions'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import PasswordInput from '@/components/ui/PasswordInput'
import AssetPlaceholder from '@/components/ui/AssetPlaceholder'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-8">
      <div className="w-full max-w-md">
        <h1 className="font-heading font-extrabold text-2xl text-[var(--color-heading)] mb-1">
          Welcome back! 👋
        </h1>
        <p className="text-gray-500 text-sm mb-6">Log in to continue</p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <form action={login} className="space-y-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            required
            placeholder="your@email.com"
          />

          <div>
            <PasswordInput
              id="password"
              name="password"
              label="Password"
              required
              placeholder="••••••••"
            />
            <div className="text-right mt-1.5">
              <Link href="#" className="text-xs font-medium text-[var(--color-primary)] hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button type="submit" fullWidth>
            Log in →
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
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[var(--color-primary)] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}