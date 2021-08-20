import constants from "@/config/constants";
import Vue from "vue";

export default {
    initializeStore (context) {
        console.log("inside actions.js initializeStore()")
        context.commit('retrieveFormsFromLocalStorage')
    },

    saveDoNotPrint (context) {
        console.log("inside actions.js saveDoNotPrint()");
        context.commit('stopEditingCurrentForm');
        context.commit('saveFormsToLocalStorage');
    },

    deleteSpecificForm({ commit }, prohibition_index) {
        commit('deleteForm', prohibition_index)
        commit('saveFormsToLocalStorage');
        commit('stopEditingCurrentForm');
    },

    pluckNextUniqueIdFromListByType ({commit, getters}, prohibition_type) {
        console.log("inside pluckNextUniqueIdFromListByType()", prohibition_type)
        let payload = getters.getNextAvailableUniqueIdByType(prohibition_type)
        console.log("payload", payload)
        if (payload) {
            commit("deleteUniqueIdFromAvailableList", {"type": prohibition_type, "idx": payload.idx})
            commit("saveUniqueIdsToLocalStorage")
            return payload.id;
        }

    },

    setNewFormToEdit ({dispatch, commit}, form_short_name) {
        console.log('inside setNewFormToEdit')
        dispatch("pluckNextUniqueIdFromListByType", form_short_name).then( prohibition_number => {
            commit("editNewForm", {"prohibition_number": prohibition_number, "form_short_name": form_short_name})
            commit("saveUniqueIdsToLocalStorage")
        })

    },

    retrieveAndSaveUniqueIds ({commit, getters, state}) {
        console.log("inside retrieveAndSaveUniqueIds()")
        commit("retrieveUniqueIdsFromLocalStorage")
        for( let schema in state.form_schemas.forms) {
            if (getters.areNewUniqueIdsRequiredByType(schema)) {
                console.log("new UniqueIDs are required for " + schema)
                const url = constants.URL_ROOT + "/api/v1/prohibitions/leases/"
                fetch(url + schema, {
                    "method": 'POST',
                })
                    .then(response => response.json())
                    .then(data => {
                        commit("updateUniqueIDs", {"schema": schema, "data": data})
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            } else {
                console.log("new UniqueIDs are NOT required", schema)
            }
        }
        commit("saveUniqueIdsToLocalStorage")
    },

    populateDriversFromICBC({state}, icbcPayload) {
        console.log("inside actions.js populateDriversFromICBC(): " + icbcPayload)
        let prohibition_index = icbcPayload['formIndex']
        let dlNumber = icbcPayload['dlNumber']
        const url = constants.URL_ROOT + "/api/v1/drivers/" + dlNumber
        fetch(url, {
            "method": 'GET',
        })
            .then(response => response.json())
            .then(data => {
                const address = data['party']['addresses'][0]
                Vue.set(state.edited_forms[prohibition_index].data, "drivers_number", data['dlNumber']);
                Vue.set(state.edited_forms[prohibition_index].data, "last_name", data['party']['lastName']);
                Vue.set(state.edited_forms[prohibition_index].data, "first_name", data['party']['firstName']);
                Vue.set(state.edited_forms[prohibition_index].data, "address1", address['addressLine1']);
                Vue.set(state.edited_forms[prohibition_index].data, "city", address['city']);
                Vue.set(state.edited_forms[prohibition_index].data, "province", address['region']);
                Vue.set(state.edited_forms[prohibition_index].data, "postal", address['postalCode']);
                Vue.set(state.edited_forms[prohibition_index].data, "dob", data['birthDate']);
            })
            .catch(function (error) {
                console.log(error)
            });
    },

    populateFromICBCPlateLookup({state}, icbcPayload) {
        console.log("inside actions.js populateFromICBCPlateLookup(): ")
        // populateDriver(state,prohibition_index);
        console.log("icbcPayload", icbcPayload)
        let prohibition_index = icbcPayload['formIndex']
        let plate_number = icbcPayload['plateNumber']
        const url = constants.URL_ROOT + "/api/v1/vehicles/" + plate_number
        fetch(url, {
            "method": 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log("data", data)
                // Vue.set(state.edited_forms[prohibition_index].data, "plate_year", "2021");
                // Vue.set(state.edited_forms[prohibition_index].data, "plate_val_tag", "1234567");
                Vue.set(state.edited_forms[prohibition_index].data, "registration_number", data['registrationNumber']);
                Vue.set(state.edited_forms[prohibition_index].data, "vehicle_year", data['vehicleModelYear']);
                Vue.set(state.edited_forms[prohibition_index].data, "vehicle_make", data['vehicleMake']);
                Vue.set(state.edited_forms[prohibition_index].data, "vehicle_model", data['vehicleModel']);
                Vue.set(state.edited_forms[prohibition_index].data, "vehicle_color", data['vehicleColour']);
                Vue.set(state.edited_forms[prohibition_index].data, "vin_number", data['vehicleIdNumber']);

                const owner = data['vehicleParties'][0]['party']
                const address = owner['addresses'][0]

                Vue.set(state.edited_forms[prohibition_index].data, "owner_is_driver", []);
                Vue.set(state.edited_forms[prohibition_index].data, "owners_last_name", owner['lastName']);
                Vue.set(state.edited_forms[prohibition_index].data, "owners_first_name", owner['firstName']);
                Vue.set(state.edited_forms[prohibition_index].data, "owners_address1", address['addressLine1']);
                Vue.set(state.edited_forms[prohibition_index].data, "owners_city", address['city']);
                Vue.set(state.edited_forms[prohibition_index].data, "owners_province", address['region']);
                Vue.set(state.edited_forms[prohibition_index].data, "owners_postal", address['postalCode']);

            })
            .catch(function (error) {
               console.log(error)
            });
    },
}
