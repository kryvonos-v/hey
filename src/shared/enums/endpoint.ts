export const API_URL = process.env.VUE_APP_MOVIE_DB_API_URL

export const get = {
  searchMovie:      () => `/3/search/movie`,
  getMoviesGenres:  () => `/3/genre/movie/list`,
  getPopularMoview: () => `/3/movie/popular`,
  getMovie: (movieId: number) => `/3/movie/${movieId}`,
  getMovieRecommendation: (movieId: number) => `/3/movie/${movieId}/recommendations`
}

export const post = {}