type ThemeType = 'light' | 'dark' | 'sepia'

export const getBackgroundColor = (theme: ThemeType): string => {
	switch (theme) {
		case 'dark':
			return '#000'
		case 'sepia':
			return '#f4ecd8'
		default:
			return '#fff'
	}
}

export const getTextColor = (theme: ThemeType): string => {
	switch (theme) {
		case 'dark':
			return '#fff'
		case 'sepia':
			return '#5b4636'
		default:
			return '#000'
	}
}
