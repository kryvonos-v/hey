import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/main.scss'
import Buefy from 'buefy'
import clickOutside from './shared/directives/click-outside'
import Dropdown from './components/Dropdown/Dropdown.vue'

let BuefyComponents = <any>Buefy

Vue.directive('click-outside', clickOutside)
Vue.component('b-dropdown', Dropdown)
Vue.component(BuefyComponents.DropdownItem.name, BuefyComponents.DropdownItem)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
