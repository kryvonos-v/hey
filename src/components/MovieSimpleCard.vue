<template>
  <div class="movie-simple-card">
    <router-link :to="movieLink" class="movie-simple-card__img-box">
      <img
        v-if="movie.posterPath"
        class="movie-simple-card__img"
        :alt="movie.title"
        :src="posterImg"
      />
      <span
        v-else
        class="movie-simple-card__img-fallback"
      >{{ movie.title }}</span>
    </router-link>
    <h3 class="movie-simple-card__title title">{{ movie.title }}</h3>
    <p class="movie-simple-card__year subtitle">{{ releaseYear }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MovieDetails } from '@/types/movie'
import { Location } from 'vue-router'

export default Vue.extend({
  props: {
    movie: {
      type: Object as () => MovieDetails,
      required: true
    }
  },
  computed: {
    posterImg (): string {
      return 'https://image.tmdb.org/t/p/w300/' + this.movie.posterPath
    },
    movieLink (): Location {
      return {
        name: 'movie-details',
        params: { movieId: this.movie.id }
      }
    },
    releaseYear (): string {
      return this.movie.releaseDate
        ? this.movie.releaseDate.split('-')[0]
        : ''
    }
  }
})
</script>

<style lang="scss">
.movie-simple-card {
  width: 200px;

  &__img-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    border-radius: 5px;
    overflow: hidden;
    text-align: center;
    color: #939393;
    background-color: #4d4d4d;
  }

  &__img {
    max-width: 100%;
  }

  &__img-fallback {
    display: block;
    padding: 1rem;
  }

  // To increase specifity
  &__title[class] {
    margin-top: 0.4rem;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.2;
  }

  &__year {
    font-weight: 500;
    font-size: 12px;
    color: #8f8f8f;
  }
}
</style>
