import {
  MovieGenre,
  MovieDetails
} from '@/types/movie'

export interface RootState {}

export interface MoviesState {
  genres: MovieGenre[],
  popular: MovieDetails[]
}