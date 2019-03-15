const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const pug = require('./loaders/pug')
const stylus = require('./loaders/stylus')
const typescript =  require('./loaders/typescript')
const vue =  require('./loaders/vue')
const shortid = require('shortid')
const webpack = require('webpack')
const path = require('path')

environment.loaders.append('pug', pug)
environment.loaders.append('stylus', stylus)
environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)
environment.loaders.prepend('typescript', typescript)

const isProduction = process.env.NODE_ENV === 'production'
const VUETIFY_CSP_NONCE = shortid.generate()
const API_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
const API_ENDPOINT = `${API_HOST}/api/graphql`;
environment.plugins.append('DefinePlugin', new webpack.DefinePlugin({
  VUETIFY_CSP_NONCE: JSON.stringify(VUETIFY_CSP_NONCE),
  API_ENDPOINT: JSON.stringify(API_ENDPOINT)
}))

environment.plugins.prepend('HtmlWebpackPlugin', new HtmlWebpackPlugin({
  // title: 'Rails Vuetify SPA',
  inject: true,
  template: path.resolve(__dirname, '..', '..', 'app/frontend/templates/index.pug'),
  'meta': {
    'viewport': 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
  }
}))

environment.plugins.prepend('ScriptExtHtmlWebpackPlugin', new ScriptExtHtmlWebpackPlugin({
  defaultAttribute: 'defer'
}))

const cspOptions = {
  'base-uri': "'self'",
  'connect-src': [
    "'self'"
  ],
  'default-src': [
    "'self'"
  ],
  'font-src': [
    "'self'"
  ],
  'img-src': [
    "'self'",
    "data:",
    "blob:",
    "https://picsum.photos"
  ],
  'object-src': "'none'",
  'script-src': [
    "'self'"
  ],
  'style-src': [
    "'self'",
    `'nonce-${VUETIFY_CSP_NONCE}'`
  ]
}
if (process.env.NODE_ENV === 'development') {
  cspOptions['connect-src'] = [
    "'self'",
    "http://localhost:3035",
    "ws://localhost:3035"
  ]
  cspOptions['style-src'] = [
    "'self'",
    "blob:",
    "'unsafe-inline'"
  ]
}
environment.plugins.prepend('CspHtmlWebpackPlugin', new CspHtmlWebpackPlugin(
  cspOptions,
  {
    enabled: true,
    hashingMethod: 'sha256',
    hashEnabled: {
      'script-src': isProduction,
      'style-src': isProduction
    },
    nonceEnabled: {
      'script-src': isProduction,
      'style-src': isProduction
    }
  }
))

environment.config.merge({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '..', '..', 'app/frontend'),
      'vue$': 'vue/dist/vue.esm'
    }
  }
})

module.exports = environment
