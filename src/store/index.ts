import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from './types'

import movies from './modules/movies'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {},
  modules: {
    movies
  },
  mutations: {},
  actions: {}
})
