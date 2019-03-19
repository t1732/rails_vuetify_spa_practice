process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

const LicenseInfoWebpackPlugin = require('license-info-webpack-plugin').default
environment.plugins.prepend('LicenseInfoWebpackPlugin', new LicenseInfoWebpackPlugin({
  glob: '{LICENSE,license,License}*',
  outputType: 'banner'
}))

module.exports = environment.toWebpackConfig()
