import {
  MoviesState,
  RootState 
} from '@/store/types'
import { ActionTree } from 'vuex'
import {
  searchMovie,
  getMovieGenres,
  getPopularMovies
} from '@/services/api'
import {
  MovieSearchParams,
  PopularMoviesParams
} from '@/types/api'
import to from 'await-to-js'

const actions: ActionTree<MoviesState, RootState> = {
  getMovieGenres: {
    root: true,
    async handler ({ commit }) {
      const [error, response] = await to(getMovieGenres())

      if (error) throw error
      if (response) {
        commit('SET_MOVIE_GENRES', response.data.genres)
      }
    }
  },

  getPopularMovies: {
    root: true,
    async handler ({ commit }, params: PopularMoviesParams) {
      const [error, response] = await to(getPopularMovies(params))

      if (error) throw error
      if (response) return response.data
    }
  },

  searchMovie: {
    root: true,
    async handler (context, params: MovieSearchParams) {
      let [error, response] = await to(searchMovie(params))

      if (error) throw error
      if (response) return response.data
    }
  }
}

export default actions