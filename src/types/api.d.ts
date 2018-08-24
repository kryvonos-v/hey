import { MovieDetails } from './movie'

export interface MovieAPIBaseParams {
  apiKey?: string,
  language?: string,
}

export interface MovieSearchParams extends MovieAPIBaseParams {
  query: string,
  page?: number,
  includeAdult?: boolean,
  region?: string,
  year?: number,
  primaryReleaseYear?: number
}

export interface MovieGenresParams extends MovieAPIBaseParams {
}

export interface MovieDetailsParams extends MovieAPIBaseParams {
  appendToResponse?: string
}