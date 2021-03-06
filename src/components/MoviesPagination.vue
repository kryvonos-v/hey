<template>
  <div class="pagination">
    <custom-router-link
      :to="{ name: routeName, query: previousPageQuery }"
      class="pagination-previous"
      :disabled="!previousPageExist"
    >Previous page</custom-router-link>

    <span class="pagination-results-info">
      Page <span class="title is-4">{{ currentPage }}</span> out of <span class="title is-4">{{ totalPagesToDisplay }}</span>
    </span>

    <custom-router-link
      :to="{ name: routeName, query: nextPageQuery }"
      class="pagination-next"
      :disabled="!nextPageExist"
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
    commonQuery (): any {
      return this.$route.name === this.routeName
        ? this.$route.query
        : {}
    },
    previousPageQuery (): any {
      return {
        ...this.commonQuery,
        page: this.previousPage
      }
    },
    nextPageQuery (): any {
      return {
        ...this.commonQuery,
        page: this.nextPage
      }
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
