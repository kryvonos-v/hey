<template>
  <movies-results-page
    :results="filteredMovies"
    :page="page"
    :total-pages="totalPages"
    pagination-route-name="movies-search"
  >
    <div slot="header" class="l-movies-results-header">
      <h1 class="title is-1">
        <span class="title-underline">Movies search</span>
      </h1>
    </div>
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
    },
    genresIds: {
      type: Array as () => number[],
      required: false
    }
  },

  data () {
    return {
      filteredMovies: [],
      totalPages: Number.POSITIVE_INFINITY
    }
  },

  async created () {
    await Promise.all([
      this.$store.dispatch('getMovieGenres'),
      this.getMoviesList({ page: this.page, withGenres: this.genresIds.join(',') })
    ])
  },

  methods: {
    async getMoviesList (params: any) {
      let [error, results] = await to(this.$store.dispatch('getMoviesWithFiltering', params))

      if (error) return
      if (results) {
        this.totalPages = results.totalPages
        this.filteredMovies = results.results
      }
    }
  }
})
</script>

<style lang="scss">
</style>
