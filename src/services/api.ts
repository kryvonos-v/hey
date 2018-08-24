import {
  MovieSearchParams
} from '@/types/api'
import * as endpoint from '@/shared/enums/endpoint'
import axios from 'axios'
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

export async function searchMovie (params: MovieSearchParams) {
  return axiosMovieDB.get(endpoint.get.searchMovie(), { params })
}