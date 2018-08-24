import {
  MovieDetails,
  MovieGenre
} from './movie'

export interface TheMovieDBBaseParams {
  apiKey?: string,
  language?: string,
}

export interface MovieSearchParams extends TheMovieDBBaseParams {
  query: string,
  page?: number,
  includeAdult?: boolean,
  region?: string,
  year?: number,
  primaryReleaseYear?: number
}

export interface PopularMoviesParams extends TheMovieDBBaseParams {
  page?: number,
  region?: string
}

export interface MovieGenresResponse extends TheMovieDBBaseParams {
  genres: MovieGenre[]
}

export interface MovieDetailsParams extends TheMovieDBBaseParams {
  appendToResponse?: string
}

export interface ResourceResults<T> {
  page: number,
  results: T[],
  totalResults: number,
  totalPages: number
}
