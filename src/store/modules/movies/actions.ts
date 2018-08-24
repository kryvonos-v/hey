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
import { MovieGenre } from '@/types/movie'
import to from 'await-to-js'
import { normalizeArray } from '@/store/utils'

const actions: ActionTree<MoviesState, RootState> = {
  getMovieGenres: {
    root: true,
    async handler ({ commit }) {
      const [error, response] = await to(getMovieGenres())

      if (error) throw error
      if (response) {
        const genres: MovieGenre[] = response.data.genres
        const normalized = normalizeArray(genres)

        commit('SET_MOVIE_GENRES_MAP', normalized.entities.map)
        commit('SET_MOVIE_GENRES_IDS', normalized.result.array)
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
      const [error, response] = await to(searchMovie(params))

      if (error) throw error
      if (response) return response.data
    }
  }
}

export default actions