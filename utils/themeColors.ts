export const themes = ['light', 'dark', 'sepia', 'green'] as const

export type ThemeType = 'light' | 'dark' | 'sepia' | 'green'

export const getBackgroundColor = (theme: ThemeType): string => {
	switch (theme) {
		case 'dark':
			return '#000'
		case 'sepia':
			return '#f4ecd8'
		case 'green':
			return '#b7e4c7'
		default:
			return '#edebe9'
	}
}

export const getTextColor = (theme: ThemeType): string => {
	switch (theme) {
		case 'dark':
			return '#fff'
		case 'sepia':
			return '#5b4636'
		case 'green':
			return '#000'
		default:
			return '#000'
	}
}
