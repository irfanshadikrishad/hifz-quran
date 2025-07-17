import { quranImages } from '@/constants/quranImages'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
	FlatList,
	Image,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native'

const TOTAL_PAGES = 5 //  TODO: will change after adding more pages
const STORAGE_KEY = 'lastReadPage'

export default function StartReading() {
	const { width, height } = useWindowDimensions()
	const flatListRef = useRef<FlatList>(null)
	const [initialIndex, setInitialIndex] = useState<number | null>(null)

	const { page } = useLocalSearchParams()
	const goToPage = page ? parseInt(page as string, 10) : null

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

			// scroll manually
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
		await AsyncStorage.setItem(STORAGE_KEY, pageNumber.toString())
	}

	if (initialIndex === null) return null

	return (
		<View style={styles.container}>
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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
})
