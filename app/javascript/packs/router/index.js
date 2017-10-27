import Vue from 'vue/dist/vue.esm'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = { template: '<div>Home</div>' }
const Items = { template: '<div>Items</div>' }

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/items',
            name: 'Items',
            component: Items
        },
    ]
})
