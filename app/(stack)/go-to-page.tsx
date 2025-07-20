import { useAppTheme } from '@/contexts/ThemeContext'
import {
	getBackgroundColor,
	getButtonBackgroundColor,
	getButtonTextColor,
	getInputBackgroundColor,
	getPlaceholderTextColor,
	getTextColor,
} from '@/utils/themeColors'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
} from 'react-native'

export default function GoToPageScreen() {
	const [page, setPage] = useState('')
	const router = useRouter()
	const { theme } = useAppTheme()

	const handleGo = () => {
		const pageNumber = parseInt(page)
		if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 604) {
			Alert.alert('Invalid Page', 'Please enter a number between 1 and 604.')
			return
		}

		router.push({
			pathname: '/start-reading',
			params: { page: pageNumber.toString() },
		})
	}

	return (
		<KeyboardAvoidingView
			style={[styles.container, { backgroundColor: getBackgroundColor(theme) }]}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<Text style={[styles.title, { color: getTextColor(theme) }]}>
				Go to Page
			</Text>
			<TextInput
				style={[
					styles.input,
					{
						backgroundColor: getInputBackgroundColor(theme),
						borderColor: getButtonBackgroundColor(theme),
						color: getTextColor(theme),
					},
				]}
				placeholder='Enter page number (1–604)'
				placeholderTextColor={getPlaceholderTextColor(theme)}
				keyboardType='numeric'
				value={page}
				onChangeText={setPage}
			/>
			<Pressable
				style={[
					styles.button,
					{ backgroundColor: getButtonBackgroundColor(theme) },
				]}
				onPress={handleGo}
			>
				<Text style={[styles.buttonText, { color: getButtonTextColor(theme) }]}>
					Go
				</Text>
			</Pressable>
		</KeyboardAvoidingView>
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
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	input: {
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		width: '80%',
		marginBottom: 20,
		fontSize: 18,
	},
	button: {
		paddingVertical: 14,
		paddingHorizontal: 40,
		borderRadius: 10,
		width: '80%',
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
})
