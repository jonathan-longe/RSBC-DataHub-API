import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons, ModalPlugin } from 'bootstrap-vue'

import "@/config/custom_stylesheet.scss";
import getters from "@/store/getters.js"
import mutations from "@/store/mutations";
import form_schemas from "@/config/form_schemas.json";
import bc_city_names from "@/config/cities.json";
import car_colors from "@/config/car_colors.json"

Vue.use(Vuex)

// Make BootstrapVue components throughout your project
Vue.use(BootstrapVue)
Vue.use(ModalPlugin)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    isOnline: null,
    bc_city_names: bc_city_names,
    car_colors: car_colors,
    edited_prohibition_numbers: Array(),
    edited_forms: Array(),
    currently_editing_prohibition_number: null,
    form_schemas: form_schemas
  },
  mutations: mutations,
  getters: getters
})

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
