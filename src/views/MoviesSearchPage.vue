<template>
  <movies-results-page
    :results="filteredMovies"
    :page="page"
    :total-pages="totalPages"
    :loading="loading"
    :error="error"
    pagination-route-name="movies-search"
  >
    <div slot="header" class="l-movies-results-header">
      <h1 class="title is-1">
        <span class="title-underline">Movies search</span>
      </h1>

      <section class="filter-section">
        <div class="
          filter-section__inner field
          is-grouped is-grouped-multiline"
        >
          <h2 class="
            control title is-4
            has-text-weight-light"
          >Selected genres: </h2>
          
          <template v-if="genresToSearch.length">
            <div
              class="control"
              v-for="genre in genresToSearch"
              :key="genre.id"
            >
              <span class="tag is-primary is-small">
                {{ genre.name }}
                <button
                  class="delete is-small"
                  @click="removeGenreFromSearch(genre)"
                />
              </span>
            </div>
          </template>
          <div v-else class="control">
            <span class="tag is-primary is-small">All</span>
          </div>
        </div>
      </section>
    </div>
  </movies-results-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { MovieGenre } from '@/types/movie'
import { AxiosError } from 'axios'
import { mapGetters } from 'vuex'
import to from 'await-to-js'
import { MoviesSearchWithFilteringParams } from '@/types/api'
import MoviesResultsPage from './MoviesResultsPage.vue'

const {
  getMovieGenre
} = mapGetters('movies', ['getMovieGenre'])

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
      loading: false,
      error: null,
      filteredMovies: [],
      totalPages: Number.POSITIVE_INFINITY
    }
  },

  computed: {
    getMovieGenre,

    genresToSearch (): MovieGenre[] {
      return this.genresIds
        .map(this.getMovieGenre)
        .filter(Boolean) as MovieGenre[]
    }
  },

  watch: {
    page () {
      this.getMoviesListForCurrentPageAndFilters()
    },
    genresIds () {
      this.getMoviesListForCurrentPageAndFilters()
    }
  },

  async created () {
    await Promise.all([
      this.$store.dispatch('getMovieGenres'),
      this.getMoviesListForCurrentPageAndFilters()
    ])
  },

  methods: {
    async getMoviesListForCurrentPageAndFilters () {
      return this.getMoviesList({
        page: this.page,
        withGenres: this.genresIds.toString()
      })
    },
    async getMoviesList (params: MoviesSearchWithFilteringParams) {
      this.loading = true
      let [error, results] = await to(this.$store.dispatch('getMoviesWithFiltering', params))
      this.loading = false
      this.error = error

      if (results) {
        this.totalPages = results.totalPages
        this.filteredMovies = results.results
      }
    },

    removeGenreFromSearch (genre: MovieGenre) {
      let route = this.$route
      let genresIds = this.genresIds.filter(id => id !== genre.id)

      this.$router.push({
        name: route.name,
        query: {
          ...route.query,
          page: '1',
          withGenres: String(genresIds)
        }
      })
    }
  }
})
</script>

<style lang="scss">
.filter-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  &__inner {
    align-items: center;
  }

  &__title[class] {
    margin-bottom: 0.75rem;
    margin-right: 0.75rem;
    font-weight: 300;
  }
}
</style>
