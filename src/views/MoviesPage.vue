<template>
  <div class="p-movies section">
    <section class="container">
      <h1 class="title is-1">
        <span class="title-underline">Movies</span>
      </h1>

      <div class="columns is-multiline" style="margin-top: 50px">
        <div class="column is-12 is-half-desktop is-4-fullhd" v-for="movie in popularMovies" :key="movie.id">
          <movie-card :movie="movie" />
        </div>
      </div>

      <div class="pagination l-pagination">
        <router-link
          v-if="previousPageExist"
          :to="{ name: 'movies-list', query: { page: previousPage } }"
          class="button is-danger is-rounded pagination__button"
        >Previous page</router-link>

        <router-link
          v-if="nextPageExist"
          :to="{ name: 'movies-list', query: { page: nextPage } }"
          class="button is-danger is-rounded pagination__button"
        >Next page</router-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import to from 'await-to-js'
import MovieCard from '@/components/MovieCard.vue'
import { PopularMoviesParams } from '@/types/api'

export default Vue.extend({
  components: {
    MovieCard
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

  computed: {
    previousPage (): number {
      return this.page - 1
    },
    nextPage (): number {
      return this.page + 1
    },
    previousPageExist (): boolean {
      return this.page > 1
    },
    nextPageExist (): boolean {
      return this.page < this.totalPages
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
.pagination {
  display: flex;
  justify-content: flex-start;

  &__button {
    margin-right: 15px;
  }
}
</style>
