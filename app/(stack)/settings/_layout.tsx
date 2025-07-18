import { useAppTheme } from '@/contexts/ThemeContext'
import {
	getHeaderBackgroundColor,
	getHeaderTextColor,
} from '@/utils/themeColors'
import { Stack } from 'expo-router'

export default function SettingsLayout() {
	const { theme } = useAppTheme()
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: getHeaderBackgroundColor(theme),
				},
				headerTintColor: getHeaderTextColor(theme),
				headerTitleStyle: { fontWeight: 'bold' },
			}}
		>
			<Stack.Screen
				name='index'
				options={{
					title: 'Settings',
				}}
			/>
			<Stack.Screen
				name='appearance'
				options={{
					title: 'Appearance',
				}}
			/>
			<Stack.Screen
				name='about'
				options={{
					title: 'About',
				}}
			/>
		</Stack>
	)
}
