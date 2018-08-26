import {
  MovieSearchParams,
  MovieGenresResponse,
  PopularMoviesParams,
  MovieDetailsParams
} from '@/types/api'
import {
  MovieResults,
  MovieExtendedDetails
} from '@/types/movie'

import * as endpoint from '@/shared/enums/endpoint'
import axios, { AxiosResponse } from 'axios'
import camelCaseKeys from 'camelcase-keys'

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

export function searchMovie (params: MovieSearchParams): Promise<AxiosResponse<MovieResults>> {
  return axiosMovieDB.get(endpoint.get.searchMovie(), { params: camelCaseKeys(params) })
}

export function getMovieGenres (): Promise<AxiosResponse<MovieGenresResponse>> {
  return axiosMovieDB.get(endpoint.get.getMoviesGenres())
}

export function getPopularMovies (params: PopularMoviesParams = {}): Promise<AxiosResponse<MovieResults>> {
  return axiosMovieDB.get(endpoint.get.getPopularMovies(), { params: camelCaseKeys(params) })
}

export function getMovieDetails (params: MovieDetailsParams): Promise<AxiosResponse<MovieExtendedDetails>> {
  let { movieId, ...paramsWithoutMovieId } = params
  paramsWithoutMovieId = camelCaseKeys(paramsWithoutMovieId)

  return axiosMovieDB.get(endpoint.get.getMovieDetails(movieId), {
    params: {
      ...paramsWithoutMovieId,
      append_to_response: 'credits,similar'
    }
  })
}
