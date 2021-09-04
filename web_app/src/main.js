import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons, ModalPlugin } from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate';

import "@/config/custom_stylesheet.scss";
import getters from "@/store/getters.js"
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import './registerServiceWorker'
import {version} from "../package";

Vue.use(Vuex)

// Make BootstrapVue components throughout your project
Vue.use(BootstrapVue)
Vue.use(ModalPlugin)
Vue.use(BootstrapVueIcons)

// import custom validation rules
require("@/helpers/validators");
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    version: version,
    isOnline: null,
    edited_forms: Array(),
    currently_editing_prohibition_index: null,
    form_schemas: {
      forms: {
        "12Hour": {
          "component": "TwelveHourProhibition",
          "short_name": "12Hour",
          "steps": ["Prohibition" ,"Validate & Serve"],
          "description": "12 Hour Driving Suspension",
          "full_name": "MV2906",
          "pdf_template": "MV2906_12h_Suspension_2021-04-27.pdf"
        },
        "24Hour": {
          "component": "TwentyFourHourProhibition",
          "steps": ["Prohibition" ,"Validate & Serve"],
          "short_name": "24Hour",
          "description": "24-Hour Prohibition",
          "full_name": "MV2634",
          "pdf_template": "MV2634_24h_Prohibition_2021-04-27.pdf"
        },
        "IRP": {
          "component": "ImmediateRoadsideProhibition",
          "short_name": "IRP",
          "description": "Immediate Roadside Prohibition",
          "full_name": "MV2723",
          "pdf_template": "MV2906_12h_Suspension_2021-04-27.pdf"
        }
      }
    },
    unique_ids: {},
    impoundLotOperators: [],
    provinces: [],
    jurisdictions: [],
    countries: [],
    cities: [],
    colors: [],
    vehicles: [],
    pickup_locations: [],
    ROADSAFETY_EMAIL: '[to_be_determined@gov.bc.ca]'
  },
  mutations: mutations,
  getters: getters,
  actions: actions
})

new Vue({
  store: store,
  beforeCreate() {
    store.dispatch("retrieveAndSaveUniqueIds")
    store.dispatch("initializeStore");
  },
  render: h => h(App),
}).$mount('#app')
