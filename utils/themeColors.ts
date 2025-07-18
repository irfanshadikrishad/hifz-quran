export const themes = ['light', 'dark', 'sepia', 'green'] as const

export type ThemeType = 'light' | 'dark' | 'sepia' | 'green'

export const getBackgroundColor = (theme: ThemeType): string => {
	switch (theme) {
		case 'dark':
			return '#12130f'
		case 'sepia':
			return '#f4ecd8'
		case 'green':
			return '#b7e4c7'
		default:
			return '#e3e6ed'
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

export const getHeaderBackgroundColor = (theme: ThemeType): string => {
	switch (theme) {
		case 'dark':
			return '#252525'
		case 'sepia':
			return '#582f0e'
		case 'green':
			return '#588157'
		default:
			return '#cadfd4'
	}
}

export const getHeaderTextColor = (theme: ThemeType): string => {
	switch (theme) {
		case 'dark':
			return '#dad7cd'
		case 'sepia':
			return '#dad7cd'
		case 'green':
			return '#fff'
		default:
			return '#252525'
	}
}

export const getButtonBackgroundColor = (theme: ThemeType): string => {
	switch (theme) {
		case 'dark':
			return '#252525'
		case 'sepia':
			return '#582f0e'
		case 'green':
			return '#2d6a4f'
		default:
			return '#cadfd4'
	}
}

export const getButtonTextColor = (theme: ThemeType): string => {
	switch (theme) {
		case 'dark':
			return '#dad7cd'
		case 'sepia':
			return '#dad7cd'
		case 'green':
			return '#fff'
		default:
			return '#252525'
	}
}

export const getInputBackgroundColor = (theme: ThemeType): string => {
	switch (theme) {
		case 'dark':
			return '#6c757d'
		case 'sepia':
			return '#fefae0'
		case 'green':
			return '#aedcc0'
		default:
			return '#e2e2e2'
	}
}
