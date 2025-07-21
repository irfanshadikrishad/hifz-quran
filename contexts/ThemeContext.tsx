import { ThemeType } from '@/utils/themeColors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Appearance } from 'react-native'

const STORAGE_KEY = 'appTheme'

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const AppThemeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [theme, setThemeState] = useState<ThemeType>('light')

  const setTheme = async (newTheme: ThemeType) => {
    setThemeState(newTheme)
    await AsyncStorage.setItem(STORAGE_KEY, newTheme)
  }

  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      if (stored === 'light' || stored === 'dark' || stored === 'sepia') {
        setThemeState(stored)
      } else {
        const system = Appearance.getColorScheme()
        setThemeState(system === 'dark' ? 'dark' : 'light')
      }
    }
    loadTheme()
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useAppTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}
