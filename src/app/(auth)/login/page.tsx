import Link from 'next/link'
import { login } from './actions'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-[var(--radius-card)] shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back 👋</h1>
        <p className="text-gray-500 mb-6">Log in to continue</p>

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
            placeholder="you@example.com"
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            required
            placeholder="Enter your password"
          />
          <Button type="submit" fullWidth>
            Log in
          </Button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-[var(--color-border)] flex-1" />
          <span className="text-xs text-gray-400">or continue with</span>
          <div className="h-px bg-[var(--color-border)] flex-1" />
        </div>

        <Button variant="secondary" fullWidth type="button" disabled title="Coming soon">
          Continue with Google
        </Button>

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