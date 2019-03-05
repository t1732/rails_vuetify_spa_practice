const { environment } = require('@rails/webpacker')
const shortid = require('shortid')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin')
const path = require('path')
const pug = require('./loaders/pug')
const typescript =  require('./loaders/typescript')
const vue =  require('./loaders/vue')

environment.loaders.append('typescript', typescript)
environment.loaders.append('vue', vue)
environment.loaders.append('pug', pug)

const VUETIFY_CSP_NONCE = shortid.generate()
environment.plugins.append('DefinePlugin', new webpack.DefinePlugin({
  VUETIFY_CSP_NONCE: JSON.stringify(VUETIFY_CSP_NONCE)
}))

environment.plugins.prepend('HtmlWebpackPlugin', new HtmlWebpackPlugin({
  title: 'Rails Vuetify SPA',
  inject: true,
  template: path.resolve(__dirname, '..', '..', 'app/frontend/templates/index.pug'),
  'meta': {
    'viewport': 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
  }
}))

environment.plugins.prepend('CspHtmlWebpackPlugin', new CspHtmlWebpackPlugin(
  {
    'base-uri': "'self'",
    'object-src': "'none'",
    'script-src': [
      "'unsafe-inline'",
      "'self'",
      "'unsafe-eval'"
    ],
    'style-src': [
      "'unsafe-inline'",
      "'self'",
      "'unsafe-eval'",
      `'nonce-${VUETIFY_CSP_NONCE}'`
    ]
  },
  {
    enabled: true,
    hashingMethod: 'sha256',
    hashEnabled: {
      'script-src': true,
      'style-src': true
    },
    nonceEnabled: {
      'script-src': true,
      'style-src': true
    }
  }))

environment.config.merge({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '..', '..', 'app/frontend'),
      'vue$': 'vue/dist/vue.esm'
    }
  }
})

module.exports = environment
