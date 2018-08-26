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
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import to from 'await-to-js'
import MovieCard from '@/components/MovieCard.vue'

export default Vue.extend({
  components: {
    MovieCard
  },
  data () {
    return {
      popularMovies: []
    }
  },
  async created () {
    await Promise.all([
      this.getMoviesList(),
      this.$store.dispatch('getMovieGenres')
    ])
  },
  methods: {
    async getMoviesList () {
      let [error, results] = await to(this.$store.dispatch('getPopularMovies'))

      if (error) return
      if (results) {
        this.popularMovies = results.results
      }
    }
  }
})
</script>

<style lang="scss">

</style>


