import Image from 'next/image'
import { ReactNode } from 'react'

export default function AppBackground({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Image
        src="/images/backgrounds/lilac-stars.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  )
}