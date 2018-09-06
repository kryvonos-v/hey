<template>
  <div class="p-movies-results section">
    <section class="container">
      <slot name="header" />

      <movies-pagination
        class="l-pagination-b"
        :current-page="page"
        :total-pages="totalPages"
        :route-name="paginationRouteName"
      />

      <div class="columns is-multiline" data-loader-target>
        <loader-with-overlay type="cards" v-show="loading" />

        <div
          class="column is-12 is-half-desktop is-4-fullhd"
          v-for="movie in results"
          :key="movie.id"
        >
          <movie-card :movie="movie" />
        </div>
      </div>

      <movies-pagination
        class="l-pagination-t"
        :current-page="page"
        :total-pages="totalPages"
        :route-name="paginationRouteName"
      />

      <slot name="footer" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MovieCard from '@/components/MovieCard.vue'
import MoviesPagination from '@/components/MoviesPagination.vue'
import LoaderWithOverlay from '@/base-components/LoaderWithOverlay.vue'
import { MovieBaseDetails } from '@/types/movie'
import { AxiosError } from 'axios'

export default Vue.extend({
  components: {
    MovieCard,
    MoviesPagination,
    LoaderWithOverlay
  },

  props: {
    page: {
      type: Number,
      default: 1
    },
    results: {
      type: Array as () => MovieBaseDetails[],
      required: true
    },
    totalPages: {
      type: Number,
      default: Number.POSITIVE_INFINITY
    },
    paginationRouteName: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: Object as () => AxiosError
    }
  },

  watch: {
    results (newResults) {
      console.log(newResults)
    }
  }
})
</script>

<style lang="scss">
.p-movies-results {
  padding-bottom: 50px;
}

.l-pagination-t {
  margin-top: 1.5rem;
}

.l-pagination-b {
  margin-bottom: 1.5rem;
}

// We use [class] to increase specifity of selector.
.l-movies-results-header[class] {
  margin-bottom: 3rem;
}
</style>
