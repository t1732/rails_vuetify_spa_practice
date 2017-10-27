/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

//console.log('Hello World from Webpacker')

require('vuetify/dist/vuetify.min.css')

import Vue from 'vue/dist/vue.esm'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'

Vue.use(Vuetify)

document.addEventListener('DOMContentLoaded', () => {
    new Vue({
        el: '#app',
        router,
        template: '<App/>',
        components: { App }
    })
})
