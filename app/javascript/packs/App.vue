<template lang="pug">
v-app
  v-toolbar(dark :color="toolbarColor" app)
    v-toolbar-side-icon(@click="drawer = !drawer")
  v-navigation-drawer(dark temporary :clipped="clipped" v-model="drawer" app)
    v-list
      template(v-for="item in items")
        v-list-tile(ripple @click="linkTo(item.title)")
          v-list-tile-action
            v-icon(dark v-html="item.icon")
          v-list-tile-content
            v-list-tile-title(v-text="item.title")
  main
    v-content
      v-container(fluid)
        router-view
  v-footer(app)
</template>

<script>
  import router from './router'

  export default {
    data () {
      return {
        drawer: false,
        clipped: true,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'Items', icon: 'list' },
        ],
        toolbarColor: 'red darken-4', // https://vuetifyjs.com/style/colors
      }
    },

    methods: {
      linkTo(title) {
        console.log("link: " + title)
        router.push({ name: title })
      }
    }
  }
</script>
