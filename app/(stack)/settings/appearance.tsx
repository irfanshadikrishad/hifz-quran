import { useAppTheme } from '@/contexts/ThemeContext'
import { getBackgroundColor, getTextColor, themes } from '@/utils/themeColors'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function AppearanceScreen() {
  const { theme, setTheme } = useAppTheme()

  return (
    <View
      style={[styles.container, { backgroundColor: getBackgroundColor(theme) }]}
    >
      <Text style={[styles.title, { color: getTextColor(theme) }]}>
        Appearance
      </Text>
      <Text style={[styles.subTitle, { color: getTextColor(theme) }]}>
        Select Theme
      </Text>

      <View style={styles.themesRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {themes.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTheme(t)}
              style={[
                styles.themeCard,
                {
                  borderColor: theme === t ? '#007aff' : '#cccccc40',
                  backgroundColor: theme === t ? '#007aff20' : 'transparent',
                },
              ]}
            >
              <View
                style={[
                  styles.previewBox,
                  { backgroundColor: getBackgroundColor(t) },
                ]}
              >
                <Text
                  style={{
                    color: getTextColor(t),
                    fontWeight: 'bold',
                  }}
                >
                  Preview
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 8,
                  color: theme === t ? '#007aff' : getTextColor(theme),
                  fontWeight: theme === t ? 'bold' : 'normal',
                  textAlign: 'center',
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)} Mode
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  themesRow: {
    height: 160,
  },
  themeCard: {
    width: 120,
    height: 140,
    padding: 10,
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  previewBox: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
