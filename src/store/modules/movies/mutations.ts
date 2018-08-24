import { MoviesState } from '@/store/types'
import { MutationTree } from 'vuex'

const mutations: MutationTree<MoviesState> = {
  SET_MOVIE_GENRES_MAP (state, genresMap) {
    state.genresMap = genresMap
  },

  SET_MOVIE_GENRES_IDS (state, genresIds) {
    state.genresIds = genresIds
  }
}

export default mutations