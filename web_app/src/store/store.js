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
          "steps": ["Prohibition" ,"Review", "Download Documents"],
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
            }
          }
        },
        "24Hour": {
          "component": "TwentyFourHourProhibition",
          "steps": ["Prohibition" ,"Review", "Download Documents"],
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
          }
        },
        "IRP": {
          "component": "ImmediateRoadsideProhibition",
          "form_type": "IRP",
          "description": "Immediate Roadside Prohibition",
          "full_name": "MV2723",
          "documents": {
            "notice": "MV2906_12h_Suspension_2021-04-27.pdf"
          }
        }
      }
    },
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
    keycloak: {}
  },

  getters: getters,
  mutations: mutations,
  actions: actions
})

