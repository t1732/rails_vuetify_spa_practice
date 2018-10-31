<template lang="pug">
v-slide-y-transition
  v-btn#page-loading-icon(
    v-if="value"
    :class="{ loading: value }"
    color="white"
    fixed
    top
    fab)
    v-progress-circular(:size="35" indeterminate color="primary")
</template>

<script>
export default {
  name: 'IconPageLoading',
  props: {
    value: Boolean,
  },
}
</script>

<style lang="sass" scoped>
#page-loading-icon
  position: absolute
  left: 0
  right: 0
  margin:
    left: auto
    top: 0
    bottom: auto
    right: auto

  &.loading
    margin-top: 50px
</style>
