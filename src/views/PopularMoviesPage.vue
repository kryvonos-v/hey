<template>
  <div class="p-movies section">
    <section class="container">
      <h1 class="title is-1">
        <span class="title-underline">Movies</span>
      </h1>

      <movies-pagination
        class="l-pagination-b"
        style="margin-top: 50px"
        :current-page="page"
        :total-pages="totalPages"
        route-name="movies-list"
      />

      <div class="columns is-multiline">
        <div class="column is-12 is-half-desktop is-4-fullhd" v-for="movie in popularMovies" :key="movie.id">
          <movie-card :movie="movie" />
        </div>
      </div>

      <movies-pagination
        class="l-pagination-t"
        :current-page="page"
        :total-pages="totalPages"
        route-name="movies-list"
      />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import to from 'await-to-js'
import MovieCard from '@/components/MovieCard.vue'
import MoviesPagination from '@/components/MoviesPagination.vue'
import { PopularMoviesParams } from '@/types/api'

export default Vue.extend({
  components: {
    MovieCard,
    MoviesPagination
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
