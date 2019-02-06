<template lang="pug">
v-app
  v-toolbar(fixed dark :color="toolbarColor" app)
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
      icon-loading(v-model="pageLoading")
      transition(name="slide-x")
        router-view
  v-footer(app)
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import IconLoading from '@/components/IconLoading'

export default Vue.extend({
  components: {
    IconLoading
  },
  data () {
    return {
      drawer: false,
      clipped: true,
      items: [
        { title: 'Home', icon: 'dashboard', path: '/' },
        { title: 'List', icon: 'list',      path: '/list' },
        { title: 'Carousel', icon: 'image', path: '/carousel' },
      ],
      toolbarColor: 'red darken-4', // https://vuetifyjs.com/style/colors
    }
  },
  computed: mapState([
    'pageLoading'
  ]),
  methods: {
    linkTo(path: string) {
      this.$router.push(path)
    }
  }
})
</script>
