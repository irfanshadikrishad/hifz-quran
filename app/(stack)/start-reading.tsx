import { quranImages } from '@/constants/quranImages'
import { useAppTheme } from '@/contexts/ThemeContext'
import {
	getBackgroundColor,
	getButtonBackgroundColor,
	getButtonTextColor,
} from '@/utils/themeColors'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
	Alert,
	FlatList,
	Image,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	ToastAndroid,
	View,
	useWindowDimensions,
} from 'react-native'

const TOTAL_PAGES = 5 // TODO: will change after adding more pages
const STORAGE_KEY = 'lastReadPage'
const BOOKMARKS_KEY = 'bookmarkedPages'

export default function StartReading() {
	const { width, height } = useWindowDimensions()
	const flatListRef = useRef<FlatList>(null)
	const [initialIndex, setInitialIndex] = useState<number | null>(null)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const { page } = useLocalSearchParams()
	const goToPage = page ? parseInt(page as string, 10) : null

	const { theme } = useAppTheme()

	const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => {
		const page = String(i + 1).padStart(3, '0')
		return { id: page, uri: quranImages[page] }
	})

	useEffect(() => {
		const loadInitialPage = async () => {
			let index = 0

			if (goToPage && goToPage >= 1 && goToPage <= TOTAL_PAGES) {
				index = goToPage - 1
			} else {
				const stored = await AsyncStorage.getItem(STORAGE_KEY)
				const storedPage = stored ? parseInt(stored, 10) : 1
				index = storedPage - 1
			}

			setInitialIndex(index)
			setCurrentPage(index + 1)

			setTimeout(() => {
				flatListRef.current?.scrollToIndex({ index, animated: false })
			}, 100)
		}

		loadInitialPage()
	}, [goToPage])

	const handleScroll = async (
		event: NativeSyntheticEvent<NativeScrollEvent>
	) => {
		const pageWidth = event.nativeEvent.layoutMeasurement.width
		const offset = event.nativeEvent.contentOffset.x
		const index = Math.round(offset / pageWidth)
		const pageNumber = index + 1
		setCurrentPage(pageNumber)
		await AsyncStorage.setItem(STORAGE_KEY, pageNumber.toString())
	}

	const handleBookmark = async () => {
		try {
			const stored = await AsyncStorage.getItem(BOOKMARKS_KEY)
			let bookmarks: number[] = stored ? JSON.parse(stored) : []

			if (!bookmarks.includes(currentPage)) {
				bookmarks.push(currentPage)
				await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
				if (Platform.OS === 'android') {
					ToastAndroid.show(`Bookmarked page ${currentPage}`, 1)
				} else {
					Alert.alert('Bookmark', `Bookmarked page ${currentPage}`)
				}
			} else {
				if (Platform.OS === 'android') {
					ToastAndroid.show(`Page ${currentPage} is already bookmarked`, 1)
				} else {
					Alert.alert('Bookmark', `Page ${currentPage} is already bookmarked`)
				}
			}
		} catch (err) {
			console.error('Failed to bookmark:', err)
		}
	}

	if (initialIndex === null) return null

	return (
		<View
			style={[styles.container, { backgroundColor: getBackgroundColor(theme) }]}
		>
			<FlatList
				ref={flatListRef}
				data={pages}
				keyExtractor={(item) => item.id}
				horizontal
				pagingEnabled
				inverted
				initialScrollIndex={initialIndex}
				getItemLayout={(_, index) => ({
					length: width,
					offset: width * index,
					index,
				})}
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={handleScroll}
				renderItem={({ item }) => (
					<Image
						source={item.uri}
						style={{ width, height }}
						resizeMode='contain'
					/>
				)}
			/>

			<Pressable
				style={[
					styles.bookmarkButton,
					{ backgroundColor: getButtonBackgroundColor(theme) },
				]}
				onPress={handleBookmark}
			>
				<Text style={styles.bookmarkText}>
					<FontAwesome6
						name='book-bookmark'
						size={24}
						color={getButtonTextColor(theme)}
					/>
				</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bookmarkButton: {
		position: 'absolute',
		right: 20,
		bottom: 40,
		borderRadius: 30,
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	bookmarkText: {
		color: '#fff',
		fontSize: 24,
	},
})
