import { useAppTheme } from '@/contexts/ThemeContext'
import { getBackgroundColor, getTextColor } from '@/utils/themeColors'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function SettingsScreen() {
  const { theme } = useAppTheme()
  const router = useRouter()

  return (
    <View
      style={[styles.container, { backgroundColor: getBackgroundColor(theme) }]}
    >
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => router.push('/settings/appearance')}
      >
        <Text style={[styles.optionText, { color: getTextColor(theme) }]}>
          Appearance
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => router.push('/settings/about')}
      >
        <Text style={[styles.optionText, { color: getTextColor(theme) }]}>
          About
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  optionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#cccccc40',
  },
  optionText: { fontSize: 18 },
})
