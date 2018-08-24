<template functional>
</template>

<script lang="ts">
import Vue from 'vue'
import MoviesPage from './MoviesPage.vue'

export default Vue.extend({
  render (h, { data, children }) {
    return h(MoviesPage, data, children)
  }
})
</script>

<style lang="scss">

</style>


