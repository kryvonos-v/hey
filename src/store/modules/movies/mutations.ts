import { MoviesState } from '@/store/types'
import { MutationTree } from 'vuex'

const mutations: MutationTree<MoviesState> = {
  SET_MOVIE_GENRES (state, genres) {
    state.genres = genres
  }
}

export default mutations