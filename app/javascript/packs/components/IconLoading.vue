<template lang="pug">
.icon-loading
  v-progress-circular(indeterminate :size="50" color="primary")
</template>

<style lang="sass">
.icon-loading
  position: absolute
  text-align: center
  top: 0
  right: 0
  bottom: 0
  left: 0
  margin: auto
  width: 100%
  height: 3.2rem
</style>
