import Link from 'next/link'
import { signup } from './actions'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import BearMascot from '@/components/ui/BearMascot'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-[var(--radius-card)] shadow-sm p-8 relative overflow-visible">
        <BearMascot variant="gift" size={90} className="absolute -top-10 right-6" />

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account 💜</h1>
        <p className="text-gray-500 mb-6">Start adding birthdays and never miss a special day again.</p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <form action={signup} className="space-y-4">
          <Input id="fullName" name="fullName" type="text" label="Full name" required placeholder="Enter your name" />
          <Input id="email" name="email" type="email" label="Email" required placeholder="you@example.com" />
          <Input id="password" name="password" type="password" label="Password" required minLength={6} placeholder="Create a password" />
          <Button type="submit" fullWidth>Sign up</Button>
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
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--color-primary)] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}