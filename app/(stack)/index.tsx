import { ThemedText } from '@/components/ThemedText'
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

	return (
		<View style={styles.container}>
			<ThemedText type='title' style={styles.title}>
				Hifz Quran
			</ThemedText>
			{buttons.map(({ label, route }) => (
				<Pressable
					key={route}
					onPress={() => router.push(route as any)}
					style={styles.button}
				>
					<ThemedText style={styles.text}>{label}</ThemedText>
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
	title: { fontSize: 28, marginBottom: 30, fontWeight: 'bold' },
	button: {
		backgroundColor: '#2d6a4f',
		paddingVertical: 14,
		paddingHorizontal: 40,
		borderRadius: 10,
		marginVertical: 10,
		width: '80%',
		alignItems: 'center',
	},
	text: { color: 'white', fontSize: 18 },
})
