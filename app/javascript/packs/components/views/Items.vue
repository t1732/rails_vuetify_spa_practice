<template lang="pug">
  div Items
</template>

<script>
export default {
  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      this.$store.commit("setPageLoading", false)
    }
  }
}
</script>
