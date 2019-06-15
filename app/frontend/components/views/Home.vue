<template lang="pug">
v-container(fluid grid-list-md)
  v-layout(row wrap align-start)
    v-flex(d-flex xs12 sm6 md4)
      v-card(hover)
        v-card-title
          h4 App Version
        template(v-if="appInfo.systems")
          v-divider
          v-list(dense)
            v-list-tile(v-for="e in appInfo.systems" :key="e.label")
              v-list-tile-content {{ `${e.label}:` }}
              v-list-tile-content.align-end {{ e.version }}
        template(v-if="appInfo.jsPackages")
          v-divider
          v-list(dense)
            v-list-tile(v-for="e in appInfo.jsPackages" :key="e.label")
              v-list-tile-content {{ `${e.label}:` }}
              v-list-tile-content.align-end {{ e.version }}
</template>

<script>
import Vue from 'vue'
import { plainToClass } from 'class-transformer'
import model from '@/models'
import GraphqlResponse from '@/utils/graphql-response'
import RepositoryFactory from '@/repositories/repository-factory'

const homeRepository = RepositoryFactory.get("home")

export default Vue.extend({
  created () {
    this.fetchData()
  },
  data: () => ({
    appInfo: new model.AppInfo,
  }),
  methods: {
    async fetchData () {
      this.$store.commit("setPageLoading", true)
      try {
        const response = new GraphqlResponse(await homeRepository.get())
        this.appInfo = response.data.appInfo
      } catch (error) {
        console.log(error)
      } finally {
        this.$store.commit("setPageLoading", false)
      }
    }
  }
})
</script>
