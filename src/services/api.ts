import {
  MoviesSearchParams,
  MovieGenresResponse,
  PopularMoviesParams,
  MovieDetailsParams,
  MoviesSearchWithFilteringParams
} from '@/types/api'
import {
  MovieResults,
  MovieExtendedDetails
} from '@/types/movie'

import * as endpoint from '@/shared/enums/endpoint'
import axios, { AxiosResponse } from 'axios'
import camelCaseKeys from 'camelcase-keys'
import snakeCaseKeys from 'snakecase-keys'

function snakeCaseKeysWithNormalizedGteAndLte (obj: any): any {
  let objWithSnakeCaseKeys = snakeCaseKeys(obj)
  let objWithNormalizedSnakeCaseKeys: any = {}
  let normalizeKey = (key: string, suffix: string) => key.slice(0, -4) + suffix

  for (let key in objWithSnakeCaseKeys) {
    let normalizedKey = key

    if (key.endsWith('_gte')) {
      normalizedKey = normalizeKey(key, '.gte')
    } else if (key.endsWith('_lte')) {
      normalizedKey = normalizeKey(key, '.lte')
    } 
    
    objWithNormalizedSnakeCaseKeys[normalizedKey] = objWithSnakeCaseKeys[key]
  }

  return objWithNormalizedSnakeCaseKeys
}

let axiosMovieDB = axios.create({
  baseURL: endpoint.API_URL,
  params: {
    api_key: process.env.VUE_APP_MOVIE_DB_API_KEY
  },
  transformResponse: [(data, headers) => {
    let dataObj = JSON.parse(data)

    return camelCaseKeys(dataObj, { deep: true })
  }]
})

export function searchMovie (params: MoviesSearchParams): Promise<AxiosResponse<MovieResults>> {
  return axiosMovieDB.get(endpoint.get.searchMovie(), { params: snakeCaseKeys(params) })
}

export function getMovieGenres (): Promise<AxiosResponse<MovieGenresResponse>> {
  return axiosMovieDB.get(endpoint.get.getMoviesGenres())
}

export function getPopularMovies (params: PopularMoviesParams = {}): Promise<AxiosResponse<MovieResults>> {
  return axiosMovieDB.get(endpoint.get.getPopularMovies(), { params: snakeCaseKeys(params) })
}

export function getMovieDetails (params: MovieDetailsParams): Promise<AxiosResponse<MovieExtendedDetails>> {
  let { movieId, ...paramsWithoutMovieId } = params
  paramsWithoutMovieId = snakeCaseKeys(paramsWithoutMovieId)

  return axiosMovieDB.get(endpoint.get.getMovieDetails(movieId), {
    params: {
      ...paramsWithoutMovieId,
      append_to_response: 'credits,similar'
    }
  })
}

export function getMoviesWithFiltering (params: MoviesSearchWithFilteringParams): Promise<AxiosResponse<MovieResults>> {
  return axiosMovieDB.get(endpoint.get.getMoviesWithFiltering(), { params: snakeCaseKeysWithNormalizedGteAndLte(params) })
}
