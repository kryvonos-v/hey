import {
  ActionTree,
  StoreOptions
} from 'vuex'
import { searchMovie } from '@/services/api'
import { MovieSearchParams } from '@/types/api'
import { RootState, MoviesState } from '../types'
import to from 'await-to-js'

const state = {
}

const getters = {
}

const mutations = {
}

const actions: ActionTree<MoviesState, RootState> = {
  async searchMovie (context, params: MovieSearchParams) {
    let [error, response] = await to(searchMovie(params))

    if (error) throw error
    if (response) return response.data
  }
}

const movies: StoreOptions<any> = {
  state,
  getters,
  mutations,
  actions
}

export default movies