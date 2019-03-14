/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb
import 'babel-polyfill'
import 'reflect-metadata'
import 'typeface-roboto'
import 'material-icons/iconfont/material-icons.css'
import 'vuetify/dist/vuetify.min.css'
import '@/assets/stylesheets/transition'

import Vue from 'vue'
import Vuetify from 'vuetify'
import App from '@/components/App.vue'
import router from '@/router'
import store from '@/store'

declare const VUETIFY_CSP_NONCE: string
Vue.use(Vuetify, {
  options: {
    cspNonce: VUETIFY_CSP_NONCE
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const el = document.body.appendChild(document.createElement('app'))
  const app = new Vue({
    el: el,
    store,
    router,
    render: h => h(App),
    mounted () {
      const loading = document.getElementById('entry-loading')
      if (loading) loading.remove()
    }
  })
})
