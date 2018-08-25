<template>
  <article class="movie-card">
    <img class="movie-card__poster" :src="posterLink" />

    <div class="movie-card__info-box">
      <div class="movie-card__background" :style="{ 'background-image': `url(${posterLink})` }"></div>
      <h2 class="title is-5 movie-card__title">{{ movie.title }}</h2>
      <p class="movie-card__release-date">{{ movie.releaseDate }}</p>
      <p>
        <span v-for="genre in movieGenres" :key="genre.id">{{ genre.name }} </span>
      </p>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { Genre } from '@/types/genre'
import { MovieDetails } from '@/types/movie'

export default Vue.extend({
  props: {
    movie: {
      type: Object as () => MovieDetails,
      required: true
    }
  },
  computed: {
    movieGenresMap (): any {
      return this.$store.state.movies.genresMap
    },
    movieGenres (): any {
      return this.movie && this.movie.genreIds
        ? this.movie.genreIds
          .map(genreId => this.getGenre(genreId))
          .filter(genre => genre)
        : []
    },
    posterLink (): string {
      return this.movie.posterPath
        ? 'https://image.tmdb.org/t/p/w300/' + this.movie.posterPath
        : ''
    }
  },
  methods: {
    getGenre (genreId: number): Genre {
      return this.movieGenresMap[genreId]
    }
  }
})
</script>

<style lang="scss">
@import '~bulma/sass/utilities/all';

.movie-card {
  display: flex;
  border-radius: 10px;
  width: 100%;
  max-width: 550px;
  height: 280px;
  overflow: hidden;
  background-color: #5a5a5a;

  &__poster {
    height: 100%;
  }

  &__background {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    opacity: 1;
    filter: blur(25px);
  }

  &__info-box {
    flex: auto;
    position: relative;
    z-index: 1;
    padding: 25px;
    color: whitesmoke;

    &:after {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.8;
      background-color: #5a5a5a;
    }
  }
  
  &__title {
    margin-bottom: 0.5rem;
  }
}
</style>
