import {
  MovieGenre,
  MovieDetails
} from '@/types/movie'

export interface RootState {}

export interface MoviesState {
  genresMap: { [key: string]: MovieGenre },
  genresIds: number[]
}