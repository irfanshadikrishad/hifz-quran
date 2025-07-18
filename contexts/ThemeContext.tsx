import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Appearance } from 'react-native'

const STORAGE_KEY = 'appTheme'

export type ThemeType = 'light' | 'dark' | 'sepia'

interface ThemeContextType {
	theme: ThemeType
	setTheme: (theme: ThemeType) => void
	colors: {
		background: string
		text: string
		button: string
	}
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const AppThemeProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [theme, setThemeState] = useState<ThemeType>('dark')

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
				// Default to system preference
				const system = Appearance.getColorScheme()
				setThemeState(system === 'dark' ? 'dark' : 'light')
			}
		}
		loadTheme()
	}, [])

	const colors =
		theme === 'light'
			? { background: 'white', text: 'black', button: '#2563eb' }
			: theme === 'dark'
				? { background: 'black', text: 'white', button: '#1f2937' }
				: { background: '#f4ecd8', text: '#3e2f1c', button: '#d1a055' }

	return (
		<ThemeContext.Provider value={{ theme, setTheme, colors }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useAppTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) throw new Error('useTheme must be used inside ThemeProvider')
	return context
}
