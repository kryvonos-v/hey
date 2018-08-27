import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/main.scss'
import DropdownItem from 'buefy/src/components/dropdown/DropdownItem.vue'
import clickOutside from './shared/directives/click-outside'
import Dropdown from './components/Dropdown/Dropdown.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import CustomRouterLink from './base-components/CustomRouterLink.vue'
import registerGlobalFilters from './register-global-filters'

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.directive('click-outside', clickOutside)
Vue.component('b-dropdown', Dropdown)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component('custom-router-link', CustomRouterLink)

registerGlobalFilters(Vue)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
