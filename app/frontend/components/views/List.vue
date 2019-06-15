<template lang="pug">
v-flex(xs12 sm6 offset-sm3)
  fab-add(@click="onAdd")
  v-dialog(:value="formDialog" max-width="360" persistent)
    book-form(
      :processing="formProcessing"
      :resource.sync="formResource"
      :validates="formValidates"
      :form-errors.sync="formErrors"
      @submit="onSubmit"
      @cancel="formDialog = false")
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
import BookForm from '@/components/BookForm'
import FabAdd from '@/components/FabAdd'
import RepositoryFactory from '@/repositories/repository-factory'
import GraphqlResponse from '@/utils/graphql-response'

const ROW_PER_PAGE = 25
const BooksRepository = RepositoryFactory.get('books')

export default Vue.extend({
  components: {
    BookForm,
    FabAdd
  },
  data () {
    return {
      observer: null,
      pageInfo: null,
      books: [],
      formDialog: false,
      formResource: null,
      formValidates: model.Book.validates,
      formProcessing: false,
      formErrors: []
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
    },
    onAdd () {
      this.formResource = new model.Book()
      this.formDialog = true
    },
    async onSubmit (resource) {
      if (this.formProcessing) {
        return
      }
      this.formProcessing = true
      try {
        const response = new GraphqlResponse(await BooksRepository.create(resource.getCreateParams()))
        const data = response.getMutationData("createBook")
        if (data.errors.length > 0) {
          this.formErrors = data.errors
        } else {
          this.formDialog = false
          this.books.unshift(plainToClass(model.Book, data.book))
        }
      } catch (error) {

      } finally {
        this.formProcessing = false
      }
    }
  }
})
</script>
