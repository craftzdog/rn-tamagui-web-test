const path = require("path");
const withPlugins = require('next-compose-plugins')
const { withTamagui } = require('@tamagui/next-plugin')

const transform = withPlugins([
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

module.exports = function (name, { defaultConfig }) {
  defaultConfig.experimental.reactRoot = 'concurrent'
  defaultConfig.typescript.ignoreBuildErrors = true
  console.log('defaultConfig:', defaultConfig)
  defaultConfig.webpack = (config, options) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
    }

    return config
  }
  return transform(name, { defaultConfig })
}
