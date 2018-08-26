<template>
  <div class="pagination">
    <custom-router-link
      :to="{ name: routeName, query: { page: previousPage } }"
      class="pagination-previous"
      :disabled="!previousPageExist"
    >Previous page</custom-router-link>

    <custom-router-link
      v-if="nextPageExist"
      :to="{ name: routeName, query: { page: nextPage } }"
      class="pagination-next"
    >Next page</custom-router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    routeName: {
      type: String,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    previousPage (): number {
      return this.currentPage - 1
    },
    nextPage (): number {
      return this.currentPage + 1
    },
    previousPageExist (): boolean {
      return this.currentPage > 1
    },
    nextPageExist (): boolean {
      return this.currentPage < this.totalPages
    }
  }
})
</script>

<style lang="scss">

</style>
