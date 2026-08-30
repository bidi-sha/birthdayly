


import type { Metadata } from 'next'
import { Geist, Geist_Mono, Baloo_2 } from 'next/font/google'
import './globals.css'
import AppBackground from '@/components/layout/AppBackground'
import { AppPreferencesProvider } from '@/components/providers/AppPreferences'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const baloo2 = Baloo_2({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Birthdayly',
  description: 'Never miss a special day',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${baloo2.variable}`}
      >
        <AppPreferencesProvider>
          <AppBackground>
            {children}
          </AppBackground>
        </AppPreferencesProvider>
      </body>
    </html>
  )
}

