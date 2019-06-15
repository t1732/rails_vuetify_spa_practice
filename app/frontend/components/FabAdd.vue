<template lang="pug">
v-fab-transition
  v-btn.btnAdd(
    v-if="localValue"
    fab
    fixed
    bottom
    right
    color="accent"
    @click="onClick")
    v-icon(v-text="$vuetify.icons.add")
</template>

<script>
export default {
  props: {
    value: {
      tyle: Boolean,
      default: true
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
