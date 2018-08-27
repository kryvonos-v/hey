import { MoviesState } from '@/store/types'
import { MutationTree } from 'vuex'
import store from 'store'

const mutations: MutationTree<MoviesState> = {
  SET_MOVIE_GENRES_MAP (state, genresMap) {
    state.genresMap = genresMap
  },

  SET_MOVIE_GENRES_IDS (state, genresIds) {
    state.genresIds = genresIds
  },

  SELECT_FAVORITE_MOVIE (state, payload: { movieId: number, favorite: boolean }) {
    let { movieId, favorite } = payload 
    let favoriteMovieIndexOf = state.favoriteMoviesIds.indexOf(movieId)

    if (favorite && favoriteMovieIndexOf === -1) {
      state.favoriteMoviesIds.push(movieId)
    } else if (!favorite && favoriteMovieIndexOf !== -1) {
      state.favoriteMoviesIds.splice(favoriteMovieIndexOf, 1)
    }

    store.set('favoriteMoviesIds', state.favoriteMoviesIds)
  }
}

export default mutations