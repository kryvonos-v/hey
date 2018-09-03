<template>
  <article class="movie-card">
    <router-link :to="moviePageLink" class="movie-card__poster-box">
      <div class="movie-card__background is-hidden-tablet" :style="backgroundStyles"></div>
      <img class="movie-card__poster" :src="posterLink" />
    </router-link>

    <div class="movie-card__info-box">
      <div class="movie-card__background is-hidden-mobile" :style="backgroundStyles"></div>
      <h2 class="title is-5 movie-card__title">
        <router-link class="link" :to="moviePageLink">
          {{ movie.title }}
        </router-link>
        <span
          v-if="formattedReleaseYear"
          class="movie-card__release-year"
        >({{ formattedReleaseYear }})</span>
      </h2>

      <div class="movie-card__genres">
        <a
          v-for="genre in movieGenres"
          :key="genre.id"
          class="tag is-dark movie-card__genre"
          @click.prevent="showMoviesOfTheSameGenre(genre)"
        >{{ genre.name }}</a>
      </div>

      <p class="movie-card__description">{{ shortDescrtiption }}</p>

      <footer class="movie-card__footer">
        <favorite-movie-button :movie-id="movie.id" />
      </footer>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { Location } from 'vue-router'
import { Genre } from '@/types/genre'
import { Dictionary } from '@/types/common'
import {
  MovieDetails,
  MovieGenre
} from '@/types/movie'
import { truncate, removeRepeatedCommas } from '@/shared/utils/text'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
import union from 'lodash/union'
import FavoriteMovieButton from '@/components/FavoriteMovieButton.vue'

const localeDateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

export default Vue.extend({
  components: {
    FavoriteMovieButton
  },

  props: {
    movie: {
      type: Object as () => MovieDetails,
      required: true
    }
  },

  computed: {
    movieGenresMap (): Dictionary<MovieGenre> {
      return this.$store.state.movies.genresMap
    },
    movieGenresToSearch (): number[] {
      return this.$store.getters['movies/moviesGenresToSearch']
    },
    movieGenres (): Genre[] {
      let genres: Genre[] = []

      if (this.movie && this.movie.genreIds) {
        genres = this.movie.genreIds
          .map(genreId => this.getGenre(genreId))
          .filter(genre => genre)
      }

      return uniqWith(genres, isEqual)
    },
    posterLink (): string {
      return this.movie.posterPath
        ? 'https://image.tmdb.org/t/p/w300/' + this.movie.posterPath
        : ''
    },
    moviePageLink (): Location {
      return {
        name: 'movie-details',
        params: { movieId: this.movie.id }
      }
    },
    formattedReleaseYear (): string {
      return typeof this.movie.releaseDate === 'string'
        ? this.movie.releaseDate.split('-')[0]
        : ''
    },
    shortDescrtiption (): string {
      return truncate(this.movie.overview || '', 180)
    },
    backgroundStyles (): Dictionary<string> {
      return { 'background-image': `url(${this.posterLink})` }
    }
  },

  methods: {
    getGenre (genreId: number): Genre {
      return this.movieGenresMap[genreId]
    },

    showMoviesOfTheSameGenre (genre: Genre): void {
      let withGenres: number[] = [...this.movieGenresToSearch]
      let genreId = Number(genre.id)

      if (!withGenres.includes(genreId)) {
        withGenres.push(genreId)
      }

      this.$router.push({
        name: 'movies-search',
        query: { withGenres: String(withGenres) }
      })
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
  overflow: hidden;
  background-color: #5a5a5a;

  @include mobile {
    flex-direction: column;
  }

  @include tablet {
    height: 350px;
  }

  @include desktop {
    height: 300px;
  }

  &__poster-box {
    @include unselectable;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100%;
    overflow: hidden;
    text-align: center;
  }

  &__poster {
    position: relative;
    z-index: 10;
    height: 100%;
  }

  &__background {
    position: absolute;
    z-index: 0;
    top: -5px;
    left: -13px;
    right: -13px;
    bottom: -5px;
    background-size: cover;
    opacity: 0.8;
    filter: blur(4px);

    @include tablet {
      z-index: -1;
      filter: blur(25px);
    }
  }

  &__title[class] {
    margin-bottom: 1rem;
    line-height: 1.3;
    font-weight: 700;

    @include desktop-only {
      font-size: 1rem;
    }
  }

  &__release-year[class] {
    margin-left: 0.2rem;
    display: inline-block;
    font-size: 0.8em;
    font-weight: 500;
    color: #959595;
  }

  &__genres {
    margin-bottom: 0.5rem;
    display: inline-block;
    font-size: 14px;
    line-height: 1.35;
  }

  &__genre {
    margin-bottom: 0.4rem;
    margin-right: 0.4rem;
  }

  &__genres-divider {
    display: inline-block;
    margin: 0 5px;
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

  &__footer {
    margin-top: 1rem;
  }

  &__info-box {
    flex: auto;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    padding: 20px;
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
