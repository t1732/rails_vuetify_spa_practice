<template lang="pug">
v-flex(xs12 sm6 offset-sm3)
  v-card
    v-list(two-line)
      template(v-for="(book, index) in books")
        v-list-tile
          v-list-tile-content
            v-list-tile-title {{ book.title }}
            v-list-tile-sub-title(class="grey--text text--darken-4") {{ book.author }}
            v-list-tile-sub-title {{ book.publisher }}
        v-divider(v-if="index + 1 < books.length" :key="book.title")
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      books: [],
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      this.$store.commit("setPageLoading", true)
      axios.get("/books")
        .then((response) => {
          this.books = response.data
          this.$store.commit("setPageLoading", false)
        });
    }
  }
}
</script>
