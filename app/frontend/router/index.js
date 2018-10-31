import Vue from 'vue'
import VueRouter from 'vue-router'
import views from './../components/views'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: views.Home
    },
    {
      path: '/list',
      name: 'List',
      component: views.List
    },
  ]
})
