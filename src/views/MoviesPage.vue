<template>
  <div class="p-movies section">
    <section class="container">
      <h1 class="title is-1">Movies</h1>
      <span class="divider" style="margin-bottom: 30px;"></span>

      <div class="columns is-multiline">
        <div class="column is-half" v-for="movie in popularMovies" :key="movie.id">
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


