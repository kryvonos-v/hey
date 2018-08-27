import {
  MoviesState,
  RootState
} from '@/store/types'
import { GetterTree } from 'vuex'

const getters: GetterTree<MoviesState, RootState> = {
  isMovieFavorite (state) {
    return (moviedId: number): boolean => state.favoriteMoviesIds.includes(moviedId)
  }
}

export default getters