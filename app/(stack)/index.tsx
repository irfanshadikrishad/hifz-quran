import { ThemedText } from '@/components/ThemedText'
import { useAppTheme } from '@/contexts/ThemeContext'
import {
	getBackgroundColor,
	getButtonBackgroundColor,
	getButtonTextColor,
	getTextColor,
} from '@/utils/themeColors'
import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'

const buttons = [
	{ label: 'Start Reading', route: '/start-reading' },
	{ label: 'Go to Page', route: '/go-to-page' },
	{ label: 'Surahs', route: '/surahs' },
	{ label: 'Bookmarks', route: '/bookmarks' },
	{ label: 'Settings', route: '/settings' },
	{ label: 'Quit', route: '/quit' },
] as const satisfies readonly {
	label: string
	route:
		| '/start-reading'
		| '/go-to-page'
		| '/surahs'
		| '/bookmarks'
		| '/settings'
		| '/quit'
}[]

export default function HomeScreen() {
	const router = useRouter()
	const { theme } = useAppTheme()

	return (
		<View
			style={[styles.container, { backgroundColor: getBackgroundColor(theme) }]}
		>
			<ThemedText
				type='title'
				style={[styles.title, { color: getTextColor(theme) }]}
			>
				Hifz Al-Quran
			</ThemedText>
			<ThemedText
				type='title'
				style={[styles.hifzUlQuran, { color: getTextColor(theme) }]}
			>
				حفظ القرآن
			</ThemedText>
			{buttons.map(({ label, route }) => (
				<Pressable
					key={route}
					onPress={() => router.push(route as any)}
					style={[
						styles.button,
						{
							backgroundColor: getButtonBackgroundColor(theme),
						},
					]}
				>
					<ThemedText
						style={[styles.text, { color: getButtonTextColor(theme) }]}
					>
						{label}
					</ThemedText>
				</Pressable>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
	},
	button: {
		backgroundColor: '#2d6a4f',
		paddingVertical: 14,
		paddingHorizontal: 40,
		borderRadius: 10,
		marginVertical: 10,
		width: '80%',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontSize: 18,
		fontWeight: '600',
	},
	hifzUlQuran: {
		fontSize: 30,
		marginBottom: 30,
	},
})
