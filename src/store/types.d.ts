import {
  MovieGenre,
  MovieDetails
} from '@/types/movie'
import { Dictionary } from '@/types/common'

export interface RootState {}

export interface MoviesState {
  favoriteMoviesIds: number[],
  genresMap: Dictionary<MovieGenre>,
  genresIds: number[]
}