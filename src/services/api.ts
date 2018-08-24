import {
  MovieSearchRequest
} from '@/types/api'
import * as endpoint from '@/shared/enums/endpoint'
import axios from 'axios'

let axiosMovieDB = axios.create({
  baseURL: endpoint.API_URL,
  params: {
    api_key: process.env.VUE_APP_MOVIE_DB_API_KEY
  }
})

export async function searchMovie (params: MovieSearchRequest) {
  return axiosMovieDB.get(endpoint.get.searchMovie(), { params })
}