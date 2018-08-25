<template>
  <b-dropdown
    ref="dropdown"
    class="navbar-item app-search"
    position="is-bottom-left"
    :mobile-modal="false"
    :active="active"
    :close-when-click-outside="false"
    @active-change="$emit('active-change', $event)"
  >
    <search-toggler
      slot="trigger"
      :active="active"
      class="app-search__toggler"
      @click.native="focusSearchInput"
    />

    <b-dropdown-item custom>
      <base-input
        placeholder="Type movie name"
        ref="searchInput"
        class="app-search__input"
        v-model="searchInput"
        @input="handleSearchInput"
      />
    </b-dropdown-item>
    <span class="dropdown-divider" />

    <b-dropdown-item
      v-if="searchError"
      custom class="app-search__info"
    >Ooops, something went wrong :(</b-dropdown-item>

    <b-dropdown-item
      v-else-if="loading"
      custom class="app-search__info"
    >We are searching for the movies...</b-dropdown-item>

    <b-dropdown-item
      v-else-if="searchInput === ''"
      custom class="app-search__info"
    >Type something to see results</b-dropdown-item>

    <b-dropdown-item
      v-else-if="!searchResults || !searchResults.length"
      custom class="app-search__info"
    >We could not find anything :(</b-dropdown-item>

    <template v-else-if="searchResults">
      <b-dropdown-item
        v-for="result in searchResults.slice(0, 10)"
        :key="result.id"
        class="app-search__result is-text-overflow"
        :title="`${result.title} (${getMovieReleaseYear(result)})`"
      >
        <span class="app-search__movie-title">{{ result.title }} </span>
        <span class="app-search__movie-year">({{ getMovieReleaseYear(result) }})</span>
      </b-dropdown-item>
    </template>
  </b-dropdown>
</template>

<script lang="ts">
import Vue, { VNodeDirective } from 'vue'
import BaseInput from '@/base-components/forms/BaseInput.vue'
import SearchToggler from './SearchToggler.vue'
import to from 'await-to-js'
import { MovieResults, MovieDetails } from '@/types/movie'

export default Vue.extend({
  components: {
    BaseInput,
    SearchToggler
  },

  model: {
    prop: 'active',
    event: 'active-change'
  },

  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      loading: false,
      searchInput: '',
      searchResults: [],
      searchError: null
    }
  },

  methods: {
    async handleSearchInput (event: any) {
      let query = event.target.value

      if (query !== '') {
        this.loading = true
        let [error, searchResults] = await to(this.$store.dispatch('searchMovie', { query }))

        this.loading = false
        this.searchError = error
        this.searchResults = searchResults as MovieResults
          ? searchResults.results
          : []
      } else {
        this.searchError = null
        this.searchResults = []
      }
    },

    getMovieReleaseYear (movie: MovieDetails): number {
      return Number(movie.releaseDate.split('-')[0])
    },

    focusSearchInput (event: MouseEvent): void {
      let searchInput = this.$refs.searchInput as any

      setTimeout(() => {
        searchInput.$el.focus()
      }, 1)
    },
  }
})
</script>

<style lang="scss">
.app-search {
  &__toggler {
    color: whitesmoke;
    display: flex;
    align-items: center;

    &:hover {
      color: inherit;
    }
  }

  &__input {
    width: 100%;
  }

  &__movie-title {
    font-weight: strong;
  }

  &__movie-year {
    font-weight: normal;
  }

  // We use [class] to increase selector specifity.
  &__info[class] {
    color: #b7b7b7;
    font-weight: normal;
  }
}
</style>


