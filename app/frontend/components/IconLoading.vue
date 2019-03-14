<template lang="pug">
v-slide-y-transition
  v-btn.page__loading-icon(
    v-if="value"
    :class="{ loading: value }"
    color="white"
    fixed
    top
    fab)
    v-progress-circular(:size="35" indeterminate color="primary")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IconPageLoading',
  props: {
    value: Boolean
  }
})
</script>

<style lang="styl" scoped>
.page__loading-icon
  position: absolute
  left: 0
  right: 0
  margin-left: auto
  margin-top: 0
  margin-bottom: auto
  margin-right: auto

  &.loading
    margin-top: 50px
</style>
