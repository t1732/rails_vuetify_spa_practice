<template lang="pug">
v-flex(xs12 sm6 offset-sm3)
  v-carousel.mt-3
    v-carousel-item(
      v-for="(e,i) in images"
      :key="i"
      :src="e.src"
      @error="imageLoadOnError(i)")
</template>

<script>
import Vue from 'vue'

const DEFAULT_IMAGE = "https://picsum.photos/800/500/?image=404"

class Numberbox {
  constructor (min, max) {
    this.min = min
    this.max = max
  }
  get random () {
    return Math.floor(Math.random() * (this.max - this.min) + this.min)
  }
}

export default Vue.extend({
  data () {
    const box = new Numberbox(1000, 1080)
    return {
      images: [...Array(3)].map(() => {
        return { src: `https://picsum.photos/800/500/?image=${box.random}` }
      })
    }
  },
  methods: {
    imageLoadOnError (index) {
      this.images[index].src = DEFAULT_IMAGE
    },
  },
})
</script>
