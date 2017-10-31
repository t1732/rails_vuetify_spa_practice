<template lang="pug">
v-app
  v-toolbar(dark :color="toolbarColor" app)
    v-toolbar-side-icon(@click="drawer = !drawer")
  v-navigation-drawer(dark temporary :clipped="clipped" v-model="drawer" app)
    v-list
      template(v-for="item in items")
        v-list-tile(ripple @click="linkTo(item.path)")
          v-list-tile-action
            v-icon(dark v-html="item.icon")
          v-list-tile-content
            v-list-tile-title(v-text="item.title")
  main
    v-content
      v-container(fluid)
        v-page-loading(v-if="pageLoading")
        router-view
  v-footer(app)
</template>

<script>
  import { mapState } from 'vuex'
  import PageLoading from './components/PageLoading'

  export default {
    components: {
      'v-page-loading': PageLoading
    },

    data () {
      return {
        drawer: false,
        clipped: true,
        items: [
          { title: 'ホーム',   icon: 'dashboard', path: '/' },
          { title: 'アイテム', icon: 'list',      path: '/items' },
        ],
        toolbarColor: 'red darken-4', // https://vuetifyjs.com/style/colors
      }
    },

    computed: mapState([
      'pageLoading'
    ]),

    methods: {
      linkTo(path) {
        this.$router.push(path)
      }
    }
  }
</script>
