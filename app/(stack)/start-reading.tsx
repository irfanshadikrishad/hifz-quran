import { quranImages } from '@/constants/quranImages'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useRef, useState } from 'react'
import {
	FlatList,
	Image,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native'

const TOTAL_PAGES = 5
const STORAGE_KEY = 'lastReadPage'

export default function StartReading() {
	const { width, height } = useWindowDimensions()
	const flatListRef = useRef<FlatList>(null)
	const [initialIndex, setInitialIndex] = useState<number | null>(null)

	const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => {
		const page = String(i + 1).padStart(3, '0')
		return { id: page, uri: quranImages[page] }
	})

	// Load last read page on mount
	useEffect(() => {
		const loadLastPage = async () => {
			const stored = await AsyncStorage.getItem(STORAGE_KEY)
			const index = stored ? TOTAL_PAGES - parseInt(stored) : 0
			setInitialIndex(index)
		}
		loadLastPage()
	}, [])

	// Save last read page on scroll
	const handleScroll = async (event: any) => {
		const pageWidth = event.nativeEvent.layoutMeasurement.width
		const offset = event.nativeEvent.contentOffset.x
		const index = Math.round(offset / pageWidth)
		const pageNumber = TOTAL_PAGES - index
		await AsyncStorage.setItem(STORAGE_KEY, pageNumber.toString())
	}

	if (initialIndex === null) return null // wait for page to load

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
