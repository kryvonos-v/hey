import { Genre } from './genre'
import { ResourceResults } from './api'

export interface MovieBaseDetails {
  id: string,
  title: string,
  originalTitle: string,
  originalLanguage: string,
  posterPath: string | null,
  backdropPath: string | null,
  overview: string | null,
  releaseDate?: string,
  adult: boolean,
  popularity?: number,
  video: boolean,
  voteCount?: number,
  voteAverage?: number
}

export interface MovieGenre extends Genre {}

export interface MovieProductionCompany {
  id: number,
  name: string,
  logoPath?: string | null,
  originCountry?: string
}

export interface MovieProductionCountry {
  name: string,
  iso31661: string
}

export interface MovieSpokenLanguage {
  name: string,
  iso6391: string
}

export interface MovieGenre extends Genre {}

export interface MovieExtendedDetails extends MovieBaseDetails {
  genres: MovieGenre[],
  belongsToCollection?: null | object,
  budget?: number,
  homepage?: string | null,
  imdbId?: string | null,
  productionCompanies?: MovieProductionCountry[],
  productionCountries?: MovieProductionCompany[],
  revenue?: number,
  runtime?: number | null,
  spokenLanguages?: MovieSpokenLanguage[],
  status?: string,
  tagline?: string | null
}

export interface MovieDetails extends MovieBaseDetails {
  genreIds?: number[]
}

export interface MovieResults extends ResourceResults<MovieDetails> {}