import Vue from 'vue'
import VueRouter from 'vue-router'
import MoviesPage from '@/views/MoviesPage.vue'
import MovieDetailsPage from '@/views/MovieDetailsPage.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: MoviesPage
    },
    {
      path: '/movies',
      name: 'movies-list',
      component: MoviesPage
    },
    {
      path: '/movies/:movieId',
      name: 'move-details',
      component: MovieDetailsPage,
      props: true
    }
  ]
})
