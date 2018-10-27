<template lang="pug">
v-flex(xs12 sm6 offset-sm3)
  v-card
    v-list(two-line)
      template(v-for="(book, index) in books")
        v-list-tile
          v-list-tile-content
            v-list-tile-title {{ book.title }}
            v-list-tile-sub-title.grey--text.text--darken-4 {{ book.author }}
            v-list-tile-sub-title {{ book.publisher }}
        v-divider(v-if="isDivider(index)")
</template>

<script>
import { plainToClass } from 'class-transformer'
import model from '../../models'
import axios from '../../utils/axios'
import GraphqlResponse from '../../utils/graphql-response'

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
    async fetchData () {
      if (this.$store.state.pageLoading) return
      this.$store.commit("setPageLoading", true)
      try {
        const response = new GraphqlResponse(await axios.post("/api/graphql", {
          query: '{ books {id, title, author, publisher, updatedAt, createdAt} }'
        }))
        this.books = response.data.books.map(e => plainToClass(model.Book, e))
      } catch (error) {
        console.log(error)
      } finally {
        this.$store.commit("setPageLoading", false)
      }
    },
    isDivider (index) {
      return index + 1 < this.books.length
    }
  }
}
</script>
