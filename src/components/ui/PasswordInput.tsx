'use client'

import { useState, InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function PasswordInput({ label, error, id, className = '', ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className={`
            w-full rounded-xl border px-4 py-2.5 pr-11 text-sm
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
            ${error ? 'border-red-300' : 'border-[var(--color-border)]'}
            ${className}
          `}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}