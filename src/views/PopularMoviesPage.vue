<template>
  <movies-results-page
    :results="popularMovies"
    :page="page"
    :total-pages="totalPages"
    :loading="loading"
    :error="error"
    pagination-route-name="movies-list"
  >
    <h1 class="title is-1 l-movies-results-header" slot="header">
      <span class="title-underline">Popular movies</span>
    </h1>
  </movies-results-page>
</template>

<script lang="ts">
import Vue from 'vue'
import to from 'await-to-js'
import { PopularMoviesParams } from '@/types/api'
import MoviesResultsPage from './MoviesResultsPage.vue'

export default Vue.extend({
  components: {
    MoviesResultsPage
  },

  props: {
    page: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      error: null,
      loading: false,
      popularMovies: [],
      totalPages: Number.POSITIVE_INFINITY
    }
  },

  watch: {
    page (newPage) {
      this.getMoviesListForCurrentPage()
    }
  },

  async created () {
    await Promise.all([
      this.$store.dispatch('getMovieGenres'),
      this.getMoviesListForCurrentPage()
    ])
  },

  methods: {
    async getMoviesListForCurrentPage () {
      return this.getMoviesList({ page: this.page })
    },
    async getMoviesList (params: PopularMoviesParams) {
      this.loading = true
      let [error, results] = await to(this.$store.dispatch('getPopularMovies', { page: this.page }))
      this.loading = false
      this.error = error

      if (results) {
        this.totalPages = results.totalPages
        this.popularMovies = results.results
      }
    }
  }
})
</script>

<style lang="scss">
.p-movies {
  padding-bottom: 50px;
}

.l-pagination-t {
  margin-top: 1.5rem;
}

.l-pagination-b {
  margin-bottom: 1.5rem;
}
</style>
