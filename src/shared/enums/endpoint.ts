export const API_URL = process.env.VUE_APP_MOVIE_DB_API_URL

export const get = {
  // https://developers.themoviedb.org/3/search/search-movies
  searchMovie:      () => `/3/search/movie`,
  // https://developers.themoviedb.org/3/genres/get-movie-list
  getMoviesGenres:  () => `/3/genre/movie/list`,
  // https://developers.themoviedb.org/3/movies/get-popular-movies
  getPopularMovies: () => `/3/movie/popular`,
  // https://developers.themoviedb.org/3/movies/get-movie-details
  getMovieDetails: (movieId: number) => `/3/movie/${movieId}`,
  // https://developers.themoviedb.org/3/movies/get-movie-recommendations
  getMovieRecommendation: (movieId: number) => `/3/movie/${movieId}/recommendations`
}

export const post = {}