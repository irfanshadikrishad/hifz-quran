import { ThemedText } from '@/components/ThemedText'
import { useAppTheme } from '@/contexts/ThemeContext'
import { getBackgroundColor, getTextColor } from '@/utils/themeColors'
import { useRouter } from 'expo-router'
import {
	Alert,
	BackHandler,
	Platform,
	Pressable,
	StyleSheet,
	View,
} from 'react-native'

export default function QuitScreen() {
	const router = useRouter()
	const { theme } = useAppTheme()

	const handleQuit = () => {
		if (Platform.OS === 'android') {
			BackHandler.exitApp()
		} else {
			Alert.alert(
				'Not supported',
				'Quitting the app programmatically is not supported on iOS.'
			)
		}
	}

	return (
		<View
			style={[styles.container, { backgroundColor: getBackgroundColor(theme) }]}
		>
			<ThemedText
				type='title'
				style={[styles.title, { color: getTextColor(theme) }]}
			>
				Quit Hifz Quran?
			</ThemedText>

			<Pressable onPress={handleQuit} style={styles.button}>
				<ThemedText style={styles.buttonText}>Quit</ThemedText>
			</Pressable>

			<Pressable
				onPress={() => router.back()}
				style={[styles.button, styles.cancelButton]}
			>
				<ThemedText style={styles.buttonText}>Cancel</ThemedText>
			</Pressable>
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
	title: { fontSize: 24, marginBottom: 40 },
	button: {
		backgroundColor: '#c1121f',
		paddingVertical: 14,
		paddingHorizontal: 30,
		borderRadius: 10,
		marginVertical: 10,
		width: '70%',
		alignItems: 'center',
	},
	cancelButton: {
		backgroundColor: '#6c757d',
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
	},
})
