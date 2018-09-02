import {
  MoviesState,
  RootState
} from '@/store/types'
import { GetterTree } from 'vuex'
import { removeRepeatedCommas } from '@/shared/utils/text'

const getters: GetterTree<MoviesState, RootState> = {
  isMovieFavorite (state) {
    return (moviedId: number): boolean => state.favoriteMoviesIds.includes(moviedId)
  },

  moviesGenresToSearch (state, getters, { route }) {
    return route.name === 'movies-search'
      ? removeRepeatedCommas(route.query.withGenres)
          .split(',')
          .filter(Boolean)
          .map(Number)
      : []
  }
}

export default getters