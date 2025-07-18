import { ThemedText } from '@/components/ThemedText'
import { useAppTheme } from '@/contexts/ThemeContext'
import { getBackgroundColor, getTextColor } from '@/utils/themeColors'
import { StyleSheet, View } from 'react-native'

export default function Bookmarks() {
	const { theme } = useAppTheme()
	return (
		<View
			style={[styles.container, { backgroundColor: getBackgroundColor(theme) }]}
		>
			<ThemedText style={[styles.text, { color: getTextColor(theme) }]}>
				Bookmarks
			</ThemedText>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	text: { fontSize: 20 },
})
