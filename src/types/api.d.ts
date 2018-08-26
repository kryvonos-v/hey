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
  // This property doesn't present on original params object for requesting movie details.
  // We use it just to unify usage of API service.
  movieId: number,
  appendToResponse?: string
}

export interface ResourceResults<T> {
  page: number,
  results: T[],
  totalResults: number,
  totalPages: number
}
