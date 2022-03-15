import withPlugins from 'next-compose-plugins'
import * as tamagui from '@tamagui/next-plugin'

const { withTamagui } = tamagui.default

export default withPlugins([
  withTamagui({
    // your tamagui config
    config: './tamagui.config.ts',
    // your design system (npm module name)
    components: ['tamagui'],
    // follow normalized imports matching these file names, attempt to evaluate
    // their exports for static extraction
    importsWhitelist: ['constants.js', 'colors.js'],
    // display detailed output (default true)
    logTimings: true,
    // disable static extraction, faster to iterate in dev mode (default false)
    disableExtraction: process.env.NODE_ENV === 'development',
    // optionally exclude some react-native-web imports to lighten bundle
    excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker'],
  })
])
