import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/main.scss'
import DropdownItem from 'buefy/src/components/dropdown/DropdownItem.vue'
import clickOutside from './shared/directives/click-outside'
import Dropdown from './components/Dropdown/Dropdown.vue'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.directive('click-outside', clickOutside)
Vue.component('b-dropdown', Dropdown)
Vue.component(DropdownItem.name, DropdownItem)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
