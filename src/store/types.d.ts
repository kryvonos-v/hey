import {
  MovieGenre,
  MovieDetails
} from '@/types/movie'
import { Dictionary } from '@/types/common'
import { Route } from 'vue-router'

export interface RootState {
  route: Route
}

export interface MoviesState {
  favoriteMoviesIds: number[],
  genresMap: Dictionary<MovieGenre>,
  genresIds: number[]
}