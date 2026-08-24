import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  fullWidth?: boolean
  children: ReactNode
}

const variantStyles = {
  primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]',
  secondary: 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-gray-50',
  ghost: 'bg-transparent text-[var(--color-text-muted)] hover:bg-gray-100',
  destructive: 'bg-white text-red-500 border border-red-200 hover:bg-red-50',
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        rounded-xl px-4 py-2.5 text-sm font-medium transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}