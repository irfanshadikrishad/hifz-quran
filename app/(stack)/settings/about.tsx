import { useAppTheme } from '@/contexts/ThemeContext'
import { appVersion } from '@/utils/appInfo'
import { getBackgroundColor, getTextColor } from '@/utils/themeColors'
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

export default function AboutScreen() {
	const { theme } = useAppTheme()

	function checkForUpdates() {
		// TODO: Will implement later
	}

	function openLink(url: string) {
		Linking.openURL(url).catch((err) =>
			console.error('Failed to open URL:', err)
		)
	}

	return (
		<View
			style={[styles.container, { backgroundColor: getBackgroundColor(theme) }]}
		>
			<Text style={[styles.title, { color: getTextColor(theme) }]}>
				Hifz Quran App
			</Text>

			<View>
				<Text style={[styles.subTitle, { color: getTextColor(theme) }]}>
					Version
				</Text>
				<Text style={[styles.subParagraph, { color: getTextColor(theme) }]}>
					{appVersion}
				</Text>
			</View>

			<View>
				<Pressable onPress={checkForUpdates}>
					<Text style={[styles.subTitle, { color: getTextColor(theme) }]}>
						Check for updates
					</Text>
				</Pressable>
			</View>

			<View style={styles.socialLinksContainer}>
				<View style={styles.iconRow}>
					<Pressable
						onPress={() => openLink('https://irfanshadikrishad.github.io')}
					>
						<FontAwesome name='globe' size={25} color={getTextColor(theme)} />
					</Pressable>
					<Pressable
						onPress={() => openLink('https://github.com/irfanshadikrishad')}
					>
						<FontAwesome name='github' size={25} color={getTextColor(theme)} />
					</Pressable>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 60,
		marginBottom: 60,
		textAlign: 'center',
	},
	subTitle: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 5,
	},
	subParagraph: {
		fontSize: 14,
		marginBottom: 15,
	},
	link: {
		fontSize: 16,
		textDecorationLine: 'underline',
		marginBottom: 10,
	},
	socialLinksContainer: {
		marginTop: 30,
		alignItems: 'center',
	},
	iconRow: {
		flexDirection: 'row',
		gap: 20,
		marginTop: 10,
	},
})
