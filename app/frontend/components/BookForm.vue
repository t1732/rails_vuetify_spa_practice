<template lang="pug">
v-card(v-if="localResouce")
  v-card-title
    h3 Create book
  v-card-text(v-if="localFormErrors.length > 0")
    template(v-for="error in localFormErrors")
      .red--text {{ error }}
  v-card-text
    form
      v-text-field(
        ref="title"
        v-model="localResouce.title"
        v-validate="validates.title"
        :error-messages="errors.collect('title')"
        :counter="(validates.title || {}).max"
        label="title"
        data-vv-name="title"
        name="title"
        key="title"
        required)
      v-text-field(
        v-model="localResouce.author"
        v-validate="validates.author"
        :error-messages="errors.collect('author')"
        :counter="(validates.author || {}).max"
        label="author"
        data-vv-name="author"
        author="author"
        key="author"
        required)
      v-text-field(
        v-model="localResouce.publisher"
        v-validate="validates.publisher"
        :error-messages="errors.collect('publisher')"
        :counter="(validates.publisher || {}).max"
        label="publisher"
        data-vv-name="publisher"
        publisher="publisher"
        key="publisher"
        required)
      v-text-field(
        v-model="localResouce.genre"
        v-validate="validates.genre"
        :error-messages="errors.collect('genre')"
        :counter="(validates.genre || {}).max"
        label="genre"
        data-vv-name="ganre"
        genre="genre"
        key="genre"
        required)
  v-card-actions
    v-spacer
    v-btn(
      flat
      color="grey darken-1"
      :disabled="processing"
      @click="onCancel")
      | Cancel
    v-btn(
      flat
      color="accent"
      :loading="processing"
      @click="onSubmit")
      | Save
</template>

<script>
import Vue from 'vue'
import Book from '@/models/book'

export default {
  props: {
    processing: false,
    resource: Book,
    validates: {
      type: Object,
      default: () => ({})
    },
    formErrors: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    localResouce: {
      get () {
        return this.resource
      },
      set (val) {
        this.$emit('update:resource', val)
      }
    },
    localFormErrors: {
      get () {
        return this.formErrors
      },
      set (val) {
        this.$emit('update:formErrors', val)
      }
    }
  },
  watch: {
    resource (a, b) {
      if (a && !b) {
        this.$nextTick(() => {
          this.$refs.title.focus()
          this.$validator.resume()
        })
      }
    }
  },
  methods: {
    onCancel () {
      this.localResouce = null
      this.localFormErrors = []
      this.$validator.reset()
      this.$validator.pause()
      this.$emit('cancel')
    },
    onSubmit () {
      this.$validator.validate().then(result => {
        if (result) {
          this.$emit('submit', this.localResouce)
          this.$validator.pause()
        }
      })
    }
  }
}
</script>
