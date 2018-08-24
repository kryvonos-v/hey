import { MovieDetails } from './movie'

export interface MovieAPIBaseRequest {
  apiKey?: string,
  language?: string,
}

export interface MovieSearchRequest extends MovieAPIBaseRequest {
  query: string,
  page?: number,
  includeAdult?: boolean,
  region?: string,
  year?: number,
  primaryReleaseYear?: number
}

export interface MovieSearchResponse {
  page?: number,
  results?: MovieDetails[],
  totalResults?: number,
  totalPages?: number
}

export interface MovieGenresRequest extends MovieAPIBaseRequest {
}

export interface MovieDetailsRequest extends MovieAPIBaseRequest {
  appendToResponse?: string
}