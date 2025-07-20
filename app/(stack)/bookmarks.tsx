import { useAppTheme } from '@/contexts/ThemeContext'
import { getBackgroundColor, getTextColor } from '@/utils/themeColors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
	Alert,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'

const BOOKMARKS_KEY = 'bookmarkedPages'

export default function Bookmarks() {
	const { theme } = useAppTheme()
	const [bookmarks, setBookmarks] = useState<number[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchBookmarks = async () => {
			try {
				const stored = await AsyncStorage.getItem(BOOKMARKS_KEY)
				const data = stored ? JSON.parse(stored) : []
				setBookmarks(data)
			} catch (err) {
				console.error('Failed to load bookmarks:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchBookmarks()
	}, [])

	const removeBookmark = async (page: number) => {
		try {
			const updated = bookmarks.filter((p) => p !== page)
			await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated))
			setBookmarks(updated)
		} catch (err) {
			console.error('Failed to remove bookmark:', err)
		}
	}

	const confirmRemove = (page: number) => {
		Alert.alert('Remove Bookmark', `Remove bookmark for page ${page}?`, [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Remove',
				style: 'destructive',
				onPress: () => removeBookmark(page),
			},
		])
	}

	return (
		<View
			style={[styles.container, { backgroundColor: getBackgroundColor(theme) }]}
		>
			<Text style={[styles.title]}>Bookmarks</Text>
			{loading ? null : bookmarks.length === 0 ? (
				<View style={styles.emptyContainer}>
					<Text style={[styles.emptyText, { color: getTextColor(theme) }]}>
						No bookmarks added yet
					</Text>
				</View>
			) : (
				<FlatList
					data={bookmarks}
					keyExtractor={(item) => item.toString()}
					renderItem={({ item }) => (
						<View style={styles.bookmarkItem}>
							<Text style={[styles.text, { color: getTextColor(theme) }]}>
								Page {item}
							</Text>
							<View style={styles.actions}>
								<Pressable
									onPress={() => router.push(`/start-reading?page=${item}`)}
								>
									<Text style={[styles.link, { color: getTextColor(theme) }]}>
										Go
									</Text>
								</Pressable>
								<Pressable onPress={() => confirmRemove(item)}>
									<Text style={[styles.link, { color: 'red' }]}>Remove</Text>
								</Pressable>
							</View>
						</View>
					)}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 25,
		fontWeight: 500,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: {
		fontSize: 18,
		opacity: 0.7,
	},
	bookmarkItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderColor: '#ccc',
	},
	text: {
		fontSize: 18,
	},
	actions: {
		flexDirection: 'row',
		gap: 15,
	},
	link: {
		fontSize: 16,
	},
})
