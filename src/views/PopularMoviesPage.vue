<template>
  <movies-results-page
    :results="popularMovies"
    :page="page"
    :total-pages="totalPages"
  >
    <h1 class="title is-1 l-movies-results-header" slot="header">
      <span class="title-underline">Movies</span>
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
      popularMovies: [],
      totalPages: Number.POSITIVE_INFINITY
    }
  },

  async created () {
    await Promise.all([
      this.$store.dispatch('getMovieGenres'),
      this.getMoviesList({ page: this.page })
    ])
  },

  methods: {
    async getMoviesList (params: PopularMoviesParams) {
      let [error, results] = await to(this.$store.dispatch('getPopularMovies', params))

      if (error) return
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
