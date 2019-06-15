<template lang="pug">
v-flex(xs12 sm6 offset-sm3)
  v-card(v-if="books.length > 0")
    v-list(two-line)
      template(v-for="(book, index) in books")
        v-list-tile
          v-list-tile-content
            v-list-tile-title {{ book.title }}
            v-list-tile-sub-title.grey--text.text--darken-4 {{ book.author }}
            v-list-tile-sub-title {{ book.publisher }}
        v-divider(v-if="isDivider(index)")
    .lozad(v-if="pageInfo && pageInfo.hasNextPage")
</template>

<script>
import Vue from 'vue'
import lozad from 'lozad'
import { plainToClass } from 'class-transformer'
import model from '@/models'
import RepositoryFactory from '@/repositories/repository-factory'
import GraphqlResponse from '@/utils/graphql-response'

const ROW_PER_PAGE = 25
const BooksRepository = RepositoryFactory.get('books')

export default Vue.extend({
  data () {
    return {
      observer: null,
      pageInfo: null,
      books: [],
    }
  },
  created () {
    this.fetchData()
    this.observer = lozad('.lozad', {
      rootMargin: '5%',
      load: el => {
        this.fetchData()
      },
    })
  },
  computed: {
    edgeAfter () {
      if (this.pageInfo) {
        return this.pageInfo.endCursor
      }
      return ""
    }
  },
  watch: {
    pageInfo (value) {
      if (value.hasNextPage) {
        this.$nextTick(() => {
          this.observer.observe()
        })
      }
    }
  },
  methods: {
    async fetchData () {
      this.$store.commit("setPageLoading", true)
      try {
        const response = new GraphqlResponse(await BooksRepository.getPages(ROW_PER_PAGE, this.edgeAfter))
        const elm = response.getElement('booksConnection')
        this.pageInfo = elm.pageInfo
        this.books = this.books.concat(elm.items.map(e => plainToClass(model.Book, e)))
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
})
</script>
