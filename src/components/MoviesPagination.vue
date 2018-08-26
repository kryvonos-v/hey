<template>
  <div class="pagination">
    <custom-router-link
      :to="{ name: routeName, query: { page: previousPage } }"
      class="pagination-previous"
      :disabled="!previousPageExist"
    >Previous page</custom-router-link>

    <span class="pagination-results-info">
      Page <span class="title is-4">{{ currentPage }}</span> out of <span class="title is-4">{{ totalPagesToDisplay }}</span>
    </span>

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
    },
    showPagesStats: {
      type: Boolean,
      default: true
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
    },
    totalPagesToDisplay (): string | number {
      return this.totalPages === Number.POSITIVE_INFINITY
        ? '∞'
        : this.totalPages
    }
  }
})
</script>

<style lang="scss">
@import '~bulma/sass/utilities/all';

.pagination-results-info {
  order: 2;
  color: #959595;

  @include mobile {
    margin-top: 0.75rem;
    width: 100%;
    flex: none;
  }

  .title {
    margin-left: 3px;
    margin-right: 3px;
  }
}
</style>
