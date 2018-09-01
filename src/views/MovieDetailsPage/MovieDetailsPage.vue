<template>
  <article class="p-movie-details">
    <section class="movie-hero movie-hero--under-site-header hero" v-if="this.movie.id">
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
                <movie-rating
                  :rating="movie.voteAverage"
                  :votes-count="movie.voteCount"
                />
                <favorite-movie-button
                  size="large"
                  color="light"
                  class="movie-hero__action"
                  :movie-id="movieId"
                />
              </div>

              <div>
                <section class="movie-info-section">
                  <h2 class="is-hidden">General Info</h2>
                  <movie-info-line category="Genres">
                    <movie-info-line-link
                      v-for="genre in movie.genres"
                      :key="genre.id"
                      to="/"
                    >{{ genre.name }}</movie-info-line-link>
                  </movie-info-line>
                  <movie-info-line category="Countries" :info="productionCountriesNames" />
                  <movie-info-line category="Runtime" :info="runtime" />
                  <movie-info-line category="Budget" :info="getFormattedMoneyAmount(movie.budget) | noInfo" />
                  <movie-info-line category="Revenu" :info="getFormattedMoneyAmount(movie.revenue) | noInfo" />

                  <h2 class="is-hidden">Featured crew</h2>
                  <movie-info-line category="Director" :info="getCrewNamesByJob('Director')" />
                  <movie-info-line category="Screenwriter" :info="getCrewNamesByJob('Screenplay')" />
                  <movie-info-line category="Producer" :info="getCrewNamesByJob('Producer')" />
                  <movie-info-line category="Cinematographer" :info="getCrewNamesByJob('Director of Photography')" />
                  <movie-info-line category="Composer" :info="getCrewNamesByJob('Original Music Composer')" />
                  <movie-info-line category="Production designer" :info="getCrewNamesByJob('Production Design')" />
                </section>
              </div>

              <h2 class="title is-5 movie-hero__section-title">Overview</h2>
              <p class="movie-hero__overview">{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="movie-cast section">
      <div class="container">
        <h2 class="title is-2"><span class="title-underline">Cast</span></h2>

        <div class="columns movie-cast__list is-mobile">
          <div
            v-for="actor in featuredCast"
            :key="actor.id"
            class="column movie-cast__item"
          >
            <actor-card :actor="actor" />
          </div>
        </div>
      </div>
    </section>

    <section class="movie-recommendation section" v-if="movieRecommendationsExist">
      <div class="container">
        <h2 class="title is-2"><span class="title-underline">Recommendations</span></h2>

        <div class="columns movie-recommendation__list is-mobile">
          <div
            v-for="movie in movie.similar.results"
            :key="movie.id"
            class="column movie-recommendation__item"
          >
            <movie-simple-card :movie="movie" />
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import to from 'await-to-js'
import {
  MovieExtendedDetails,
  MovieGenre,
  MovieProductionCountry
} from '@/types/movie'
import { AxiosError } from 'axios'
import { number } from '@/shared/utils/text'
import * as Text from '@/shared/enums/text'
import MovieRating from '@/base-components/MovieRating.vue'
import FavoriteMovieButton from '@/components/FavoriteMovieButton.vue'
import MovieInfoLine from './MovieInfoLine.vue'
import MovieInfoLineLink from './MovieInfoLineLink.vue'
import ActorCard from '@/components/ActorCard.vue'
import MovieSimpleCard from '@/components/MovieSimpleCard.vue'

interface MovieDetailsPage {
  movie: MovieExtendedDetails | any,
  error: AxiosError | null
}

export default Vue.extend({
  components: {
    FavoriteMovieButton,
    MovieRating,
    MovieInfoLine,
    MovieInfoLineLink,
    ActorCard,
    MovieSimpleCard
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
    movieGenresInfo (): string {
      return this.movie.genres && this.movie.genres.length
        ? ''
        : Text.NO_INFO
    },
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
    },
    runtime (): string {
      return this.movie.runtime
        ? this.movie.runtime + ' min'
        : ''
    },
    productionCountriesNames (): string[] {
      return this.movie.productionCountries
        ? this.movie.productionCountries.map((country: MovieGenre) => country.name)
        : []
    },
    crew (): any[] {
      try {
        return this.movie.credits.crew
      } catch (e) {
        return []
      }
    },
    featuredCast (): any[] {
      return this.movie.credits.cast.slice(0, 20)
    },
    movieRecommendationsExist (): boolean {
      return !!(
        this.movie.similar &&
        this.movie.similar.results &&
        this.movie.similar.results.length
      )
    }
  },

  async created () {
    const [error, movieDetails] = await to(this.$store.dispatch('getMovieDetails', { movieId: this.movieId }))

    if (error) this.error = error
    if (movieDetails) this.movie = movieDetails
  },

  methods: {
    getFormattedMoneyAmount (value: string | number) {
      return '$' + number(value, { decimals: 3, divider: ' ' })
    },

    getCrewNamesByJob (job: string): string[] {
      return this.crew
        .filter(item => item.job === job)
        .map(item => item.name)
    }
  }
})
</script>

<style lang="scss">
.movie-hero {
  position: relative;
  overflow: hidden;
  color: whitesmoke;

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
    margin-bottom: 1.5rem;
  }
  
  &__action {
    margin-left: 20px
  }

  // We use [class] to increase specifity of selector.
  &__section-title[class] {
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  &__overview {
    font-family: 'Open Sans', sans-serif;
    line-height: 1.4;
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
    background-color: #2D2D2D;
    opacity: 0.97;
  }
}

.movie-cast {
  &__list {
    overflow: auto;
  }

  &__item {
    flex: none;
  }
}


.movie-recommendation {
  &__list {
    overflow: auto;
  }

  &__item {
    flex: none;
  }
}

.movie-info-section {
  display: inline-flex;
  flex-direction: column;
}
</style>


