import {
  MoviesState,
  RootState
} from '@/store/types'
import { MovieGenre } from '@/types/movie'
import { GetterTree } from 'vuex'
import { removeRepeatedCommas } from '@/shared/utils/text'

const getters: GetterTree<MoviesState, RootState> = {
  isMovieFavorite (state) {
    return (moviedId: number): boolean => state.favoriteMoviesIds.includes(moviedId)
  },

  getMovieGenre (state) {
    return (genreId: number): MovieGenre => state.genresMap[genreId]
  },

  moviesGenresToSearch (state, getters, { route }): number[] {
    return route.name === 'movies-search'
      ? removeRepeatedCommas(route.query.withGenres)
          .split(',')
          .filter(Boolean)
          .map(Number)
      : []
  }
}

export default getters