

'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type Theme = 'Light' | 'Dark'

interface AppPreferencesContextType {
  notifications: boolean
  setNotifications: (value: boolean) => void
  theme: Theme
  setTheme: (value: Theme) => void
}

const AppPreferencesContext =
  createContext<AppPreferencesContextType | null>(null)

export function AppPreferencesProvider({
  children,
}: {
  children: ReactNode
}) {
  const [notifications, setNotificationsState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true

    const saved = localStorage.getItem('birthdayly-notifications')

    return saved !== null ? saved === 'true' : true
  })

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'Light'

    const saved = localStorage.getItem('birthdayly-theme')

    return saved === 'Dark' ? 'Dark' : 'Light'
  })

  useEffect(() => {
    localStorage.setItem(
      'birthdayly-notifications',
      String(notifications)
    )
  }, [notifications])

  useEffect(() => {
    localStorage.setItem('birthdayly-theme', theme)

    document.documentElement.classList.toggle(
      'dark',
      theme === 'Dark'
    )

    document.documentElement.setAttribute(
      'data-theme',
      theme.toLowerCase()
    )
  }, [theme])

  const setNotifications = (value: boolean) => {
    setNotificationsState(value)
  }

  const setTheme = (value: Theme) => {
    setThemeState(value)
  }

  return (
    <AppPreferencesContext.Provider
      value={{
        notifications,
        setNotifications,
        theme,
        setTheme,
      }}
    >
      {children}
    </AppPreferencesContext.Provider>
  )
}

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext)

  if (!context) {
    throw new Error(
      'useAppPreferences must be used within AppPreferencesProvider'
    )
  }

  return context
}

