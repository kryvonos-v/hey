import {
  MovieDetails,
  MovieGenre
} from './movie'

export interface TheMovieDBBaseParams {
  apiKey?: string,
  language?: string,
}

export interface BaseSearchParams extends TheMovieDBBaseParams {
  page?: number,
  region?: string
}

export interface MoviesSearchParams extends BaseSearchParams {
  query: string,
  includeAdult?: boolean,
  year?: number,
  primaryReleaseYear?: number
}

export interface MoviesSearchWithFilteringParams extends BaseSearchParams {
  sortBy?: string,
  certificationCountry?: string,
  certification?: string,
  certificationLte?: string,
  includeAdult?: boolean,
  includeVideo?: boolean,
  primaryReleaseYear?: number,
  primaryReleaseDateGte?: string,
  primaryReleaseDateLte?: string,
  releaseDateGte?: string,
  releaseDateLte?: string,
  voteCountGte?: number,
  voteCountLte?: number,
  voteAverageGte?: number,
  voteAverageLte?: number,
  withCast?: string,
  withCrew?: string,
  withCompanies?: string,
  withGenres?: string,
  withKeywords?: string,
  withPeople?: string,
  year?: number,
  withoutGenres?: string,
  withRuntimeGte?: number,
  withRuntimeLte?: number,
  withReleaseType?: number,
  withOriginalLanguage?: string,
  withoutKeywords?: string
}

export interface PopularMoviesParams extends BaseSearchParams {}

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
