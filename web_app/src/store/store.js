import Vue from 'vue'
import Vuex from 'vuex'
import {getters} from "@/store/getters";
import {actions} from "@/store/actions"
import {mutations} from "@/store/mutations";
import {version} from "../../package.json";

Vue.use(Vuex)


export const store = new Vuex.Store ({
  state: {
    version: version,
    isOnline: null,
    forms: {
      "IRP": {},
      "24Hour": {},
      "12Hour": {}
    },
    currently_editing_form_object: {
      "form_type": null,
      "form_id": null
    },
    form_schemas: {
      forms: {
        "12Hour": {
          "component": "TwelveHourProhibition",
          "form_type": "12Hour",
          "description": "12 Hour Driving Suspension",
          "full_name": "MV2906",
          "documents": {
            "driver": {
              "name": "Driver Copy",
             "variants": ['driver'],
            },
            "police": {
              "name": "Police Copy",
              "variants": ['police'],
            },
            "all": {
              "name": "All Copies",
              "variants": ['driver', 'police']
            }
          },
          "disabled": false
        },
        "24Hour": {
          "component": "TwentyFourHourProhibition",
          "form_type": "24Hour",
          "description": "24-Hour Prohibition",
          "full_name": "MV2634",
          "documents": {
            "driver": {
              "name": "Driver Copy",
              "variants": ['driver'],
            },
            "ilo": {
              "name": "ILO Copy",
              "variants": ['ilo']
            },
            "report": {
              "name": "Police Copy",
              "variants": ['police']
            },
            "all": {
              "name": "All Copies",
              "variants": ['driver', 'ilo', 'police']
            }
          },
          "disabled": false
        },
        "IRP": {
          "component": "ImmediateRoadsideProhibition",
          "form_type": "IRP",
          "description": "Immediate Roadside Prohibition",
          "full_name": "MV2723",
          "documents": {},
          "disabled": true
        }
      }
    },
    agencies: [],
    impound_lot_operators: [],
    provinces: [],
    jurisdictions: [],
    countries: [],
    cities: [],
    colors: [],
    vehicles: [],
    vehicle_styles: [],
    pickup_locations: [],
    ROADSAFETY_EMAIL: '[to_be_determined@gov.bc.ca]',
    icbc_vehicle_lookup: [],
    keycloak: {},
    user_roles: {},
    users: {}
  },

  getters: getters,
  mutations: mutations,
  actions: actions
})

