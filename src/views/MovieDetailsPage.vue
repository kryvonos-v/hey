<template>
  <article class="p-movie-details">
    <section class="movie-hero movie-hero--under-site-header hero">
      <div class="movie-hero__background-image" :style="{ 'background-image': `url(${backdropLink})` }"></div>

      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1 movie-hero__title">
            {{ movie.title }}
            <span class="movie-hero__release-date" v-if="formattedReleaseDate">({{ formattedReleaseDate }})</span>
          </h1>
          <p class="subtitle is-4 movie-hero__tagline" v-if="movie.tagline">{{ movie.tagline }}</p>

          <div class="columns">
            <div class="column">
              <img class="movie-hero__poster" :src="posterLink" />
            </div>
            <div class="column is-8">
              <div class="movie-hero__rating-and-actions">
                <movie-rating :rating="5.2" :votes-count="1837" />
                <favorite-movie-button
                  size="large"
                  color="light"
                  class="movie-hero__action"
                  :movie-id="movie.id || 0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import to from 'await-to-js'
import { MovieExtendedDetails } from '@/types/movie'
import { AxiosError } from 'axios'
import MovieRating from '@/base-components/MovieRating.vue'
import FavoriteMovieButton from '@/components/FavoriteMovieButton.vue'

interface MovieDetailsPage {
  movie: MovieExtendedDetails | any,
  error: AxiosError | null
}

export default Vue.extend({
  components: {
    FavoriteMovieButton,
    MovieRating
  },
  props: {
    movieId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      movie: {},
      error: null
    } as MovieDetailsPage
  },
  computed: {
    posterLink (): string {
      return this.movie.posterPath
        ? 'https://image.tmdb.org/t/p/w342/' + this.movie.posterPath
        : ''
    },
    backdropLink (): string {
      return this.movie.backdropPath
        ? 'https://image.tmdb.org/t/p/w1280/' + this.movie.backdropPath
        : ''
    },
    formattedReleaseDate (): string {
      return this.movie.releaseDate
        ? this.movie.releaseDate.split('-')[0]
        : ''
    }
  },
  async created () {
    const [error, movieDetails] = await to(this.$store.dispatch('getMovieDetails', { movieId: this.movieId }))

    if (error) this.error = error
    if (movieDetails) this.movie = movieDetails
  }
})
</script>

<style lang="scss">
.movie-hero {
  position: relative;
  overflow: hidden;

  &--under-site-header {
    margin-top: -3.2rem;
    padding-top: 2.3rem;
  }

  .hero-body {
    position: relative;
    z-index: 10;
  }

  // We use [class] to increase specifity of font-weight.
  &__release-date[class] {
    display: inline-block;
    margin-left: 0.5rem;
    font-size: 0.7em;
    font-weight: 300;
    color: #b1b0b0;
  }

  &__poster {
    border-radius: 7px;
  }

  // We use [class] to increase specifity of font-weight.
  &__tagline[class] {
    margin-bottom: 2rem;
    font-weight: 300;
    color: #b1b0b0;
  }

  &__rating-and-actions {
    display: flex;
    align-items: center;
  }
  
  &__action {
    margin-left: 20px
  }

  &__background-image {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(2px);
  }

  &:after {
    content: '';
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #363636;
    opacity: 0.8;
  }
}
</style>


