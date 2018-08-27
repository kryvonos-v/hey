import { MoviesState } from '@/store/types'
import { MutationTree } from 'vuex'

const mutations: MutationTree<MoviesState> = {
  SET_MOVIE_GENRES_MAP (state, genresMap) {
    state.genresMap = genresMap
  },

  SET_MOVIE_GENRES_IDS (state, genresIds) {
    state.genresIds = genresIds
  },

  SELECT_FAVORITE_MOVIE (state, { movieId, favorite }) {
    let favoriteMovieIndexOf = state.favoriteMoviesIds.indexOf(movieId)

    if (favorite && favoriteMovieIndexOf === -1) {
      state.favoriteMoviesIds.push(movieId)
    } else if (!favorite && favoriteMovieIndexOf !== -1) {
      state.favoriteMoviesIds.splice(favoriteMovieIndexOf, 1)
    }
  }
}

export default mutations