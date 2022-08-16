const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

//MARK::Add Web Blocks
const appIncludes = [
resolveApp('../blocks/search/src/'),
resolveApp('../blocks/core/src/'),
resolveApp('../blocks/share/src/'),
resolveApp('../blocks/social-media-account-registration/src/'),
resolveApp('../blocks/social-media-account/src/'),
resolveApp('../blocks/email-account-login/src/'),
resolveApp('../blocks/utilities/src/'),
resolveApp('../blocks/email-account-registration/src/'),
resolveApp('../blocks/country-code-selector/src/'),
resolveApp('../blocks/forgot-password/src/'),
resolveApp('../blocks/otp-input-confirmation/src/'),
resolveApp('../blocks/social-media-account-login/src/'),
resolveApp('../blocks/pushnotifications/src/'),
resolveApp('../blocks/ordermanagement/src/'),
resolveApp('../blocks/catalogue/src/'),
resolveApp('../blocks/postcreation/src/'),
resolveApp('../blocks/categoriessubcategories/src/'),
resolveApp('../blocks/user-profile-basic/src/'),
resolveApp('../blocks/educational-user-profile/src/'),
resolveApp('../blocks/splashscreen/src/'),
resolveApp('../blocks/sorting/src/'),
resolveApp('../blocks/visualanalytics/src/'),
resolveApp('../blocks/onboardingguide/src/'),
resolveApp('../blocks/navigationmenu/src/'),
resolveApp('../blocks/landingpage/src/'),
resolveApp('../blocks/analytics/src/'),
resolveApp('../blocks/promocodes/src/'),
resolveApp('../blocks/customisableusersubscriptions/src/'),
resolveApp('../blocks/videos/src/'),
resolveApp('../blocks/shoppingcart/src/'),
resolveApp('../blocks/favourites/src/'),
resolveApp('../blocks/contactus/src/'),
resolveApp('../blocks/BulkUploading/src/'),
resolveApp('../blocks/ProductRecommendationEngine/src/'),
resolveApp('../blocks/InvoiceBilling/src/'),
resolveApp('../blocks/ShippingChargeCalculator/src/'),
resolveApp('../blocks/AdminConsole3/src/'),
resolveApp('../blocks/RolesPermissions2/src/'),
resolveApp('../blocks/Wishlist2/src/'),
resolveApp('../blocks/VideoLibrary/src/'),
resolveApp('../blocks/DeliveryEstimator13/src/'),
resolveApp('../blocks/Documentation/src/'),
resolveApp('../blocks/Trending/src/'),
resolveApp('../blocks/StripeIntegration/src/'),
resolveApp('../blocks/TargetedFeed/src/'),
resolveApp('../blocks/TermsAndConditions/src/'),
resolveApp('../blocks/CustomisableUserProfiles/src/'),
resolveApp('../blocks/Settings5/src/'),
resolveApp('../blocks/MeatTypeMap/src/'),

  resolveApp('src'),
  resolveApp('../components/src'),
  resolveApp('../framework/src'),
  resolveApp('../../node_modules/radar_sdk_js'),
  resolveApp('../../node_modules/react-native-elements'),
  resolveApp('../../node_modules/react-native-vector-icons'),
  resolveApp('../../node_modules/react-native-ratings'),
  resolveApp('../../node_modules/react-native-image-picker'),
  resolveApp('../../node_modules/react-native-check-box'),
  resolveApp('../../node_modules/react-native-calendars'),
  resolveApp('../../node_modules/react-native-swipe-gestures'),
  resolveApp('../../node_modules/react-native-password-strength-meter'),
  resolveApp('../blocks/restClient/src'),
  resolveApp('../blocks/alert/src'),
  resolveApp('../blocks/adapters/src'),
  resolveApp('../blocks/info-page/src')
]

const CompressionPlugin = require('compression-webpack-plugin'); //gzip
const BrotliPlugin = require('brotli-webpack-plugin'); //brotli

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  )
  config.module.rules[0].include = appIncludes
  config.module.rules[1] = null
  config.module.rules[2].oneOf[1].include = appIncludes
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web'),
  ].concat(config.module.rules[2].oneOf[1].options.plugins)
  config.module.rules = config.module.rules.filter(Boolean)
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' }),
    //gzip
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    }),
    //brotli plugin
    new BrotliPlugin({ 
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  )
  config.resolve.alias = {'react-native-maps': 'react-native-web-maps', 'react-native': 'react-native-web'};
  return config
}