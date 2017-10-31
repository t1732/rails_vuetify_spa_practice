<template lang="pug">
  div Home
</template>

<script>
export default {
  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      this.$store.commit("setPageLoading", true)
    }
  }
}
</script>
