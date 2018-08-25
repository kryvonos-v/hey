import {
  RootState,
  MoviesState
} from '@/store/types'
import { Module } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state: MoviesState = {
  genresIds: [],
  genresMap: {}
}

const genres: Module<MoviesState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default genres