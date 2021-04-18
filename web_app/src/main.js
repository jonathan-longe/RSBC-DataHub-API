import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import "@/config/custom_stylesheet.scss";
import getters from "@/store/getters.js"
import mutations from "@/store/mutations";
import form_config from "@/config/forms.json";
import bc_city_names from "@/config/cities.json";

Vue.use(Vuex)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

// Install the BootstrapVue icon components plugin
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    isOnline: null,
    bc_city_names: bc_city_names,
    edited_prohibition_numbers: Array(),
    edited_forms: Array(),
    currently_editing_prohibition_number: null,
    form_config: form_config
  },
  mutations: mutations,
  getters: getters
})

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
