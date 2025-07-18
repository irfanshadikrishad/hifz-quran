import { useAppTheme } from '@/contexts/ThemeContext'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function SettingsScreen() {
	const { theme, setTheme } = useAppTheme()

	const themes = ['light', 'dark', 'sepia'] as const

	const getBackgroundColor = () => {
		switch (theme) {
			case 'dark':
				return '#000'
			case 'sepia':
				return '#f4ecd8'
			default:
				return '#fff'
		}
	}

	const getTextColor = () => {
		switch (theme) {
			case 'dark':
				return '#fff'
			case 'sepia':
				return '#5b4636'
			default:
				return '#000'
		}
	}

	return (
		<View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
			<Text style={[styles.title, { color: getTextColor() }]}>Settings</Text>

			<Text style={[styles.subTitle, { color: getTextColor() }]}>
				Select Theme
			</Text>

			{themes.map((t) => (
				<TouchableOpacity
					key={t}
					onPress={() => setTheme(t)}
					style={[
						styles.option,
						{
							borderColor: theme === t ? '#007aff' : '#ccc',
							backgroundColor: theme === t ? '#007aff20' : 'transparent',
						},
					]}
				>
					<Text
						style={{
							color: theme === t ? '#007aff' : getTextColor(),
							fontWeight: theme === t ? 'bold' : 'normal',
						}}
					>
						{t.charAt(0).toUpperCase() + t.slice(1)} Mode
					</Text>
				</TouchableOpacity>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	subTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	option: {
		padding: 15,
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 12,
	},
})
