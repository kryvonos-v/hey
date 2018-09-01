import Vue from 'vue'
import VueRouter from 'vue-router'
import PopularMoviesPage from '@/views/PopularMoviesPage.vue'
import MoviesSearchPage from '@/views/MoviesSearchPage.vue'
import MovieDetailsPage from '@/views/MovieDetailsPage/MovieDetailsPage.vue'
import { removeRepeatedCommas } from '@/shared/utils/text'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/movies'
    },
    {
      path: '/movies',
      name: 'movies-list',
      component: PopularMoviesPage,
      beforeEnter (to, from, next) {
        if (Number(to.query.page) < 1) {
          next({
            name: 'movies-list',
            query: { page: '1' }
          })
        } else {
          next()
        }
      },
      props: route => {
        return {
          page: Number(route.query.page || 1)
        }
      }
    },
    {
      path: '/movies-search',
      name: 'movies-search',
      component: MoviesSearchPage,
      props: route => {
        let genresIds = removeRepeatedCommas(route.query.withGenres)
          .split(',')
          .filter(Boolean)
          .map(Number)

        return {
          page: Number(route.query.page || 1),
          genresIds
        }
      }
    },
    {
      path: '/movies/:movieId',
      name: 'movie-details',
      component: MovieDetailsPage,
      props: route => ({
        movieId: Number(route.params.movieId)
      })
    }
  ]
})
