import Vue from 'vue/dist/vue.esm'
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
            path: '/books',
            name: 'Books',
            component: views.Books
        },
    ]
})
