<template>
  <article class="movie-card">
    <img class="movie-card__poster" :src="posterLink" />

    <div class="movie-card__info-box">
      <div class="movie-card__background" :style="{ 'background-image': `url(${posterLink})` }"></div>
      <h2 class="title is-5 movie-card__title">{{ movie.title }}</h2>
      <p class="movie-card__release-date">{{ formattedReleaseDate }}</p>
      <span class="movie-card__divider"></span>
      <p class="movie-card__description" v-if="false">
        <span v-for="genre in movieGenres" :key="genre.id">{{ genre.name }} </span>
      </p>
      <p class="movie-card__description">{{ shortDescrtiption }}</p>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { Genre } from '@/types/genre'
import { MovieDetails } from '@/types/movie'
import { truncate } from '@/shared/utils/text'

const localeDateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

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
    },
    formattedReleaseDate (): string {
      return this.movie.releaseDate
        ? new Date(this.movie.releaseDate).toLocaleString('en-US', localeDateOptions)
        : ''
    },
    shortDescrtiption (): string {
      return truncate(this.movie.overview || '', 180)
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
  max-width: 570px;
  height: 300px;
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

  &__title[class] {
    margin-bottom: 0.6rem;
    line-height: 1.3;
    font-weight: 700;
  }

  &__release-date {
    margin-bottom: 1rem;
    font-weight: 500;
  }

  &__description {
    flex: auto;
    display: flex;
    overflow: hidden;
    font-family: 'Open Sans';
    font-weight: 400;
    line-height: 1.3;
    font-size: 14px;
    letter-spacing: 0.15px;
  }

  &__divider {
    display: block;
    margin-bottom: 1rem;
    width: 15px;
    height: 3px;
    background-color: whitesmoke;
    background-color: #963D5A;
  }

  &__info-box {
    flex: auto;
    display: flex;
    flex-direction: column;
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
      opacity: 0.86;
      background-color: #5a5a5a;
    }
  }
}
</style>
