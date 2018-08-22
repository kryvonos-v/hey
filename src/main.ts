import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/main.scss'
import Buefy from 'buefy'
import clickOutside from './shared/directives/click-outside'

Vue.use(Buefy)
Vue.directive('click-outside', clickOutside)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
