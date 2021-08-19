import Vue from 'vue'
import xfdf from "@/helpers/xfdf_generator";
import constants from "@/config/constants";

export default {

    editExistingForm (state, prohibition_index) {
       console.log("inside editExistingForm: " + prohibition_index)
       state.currently_editing_prohibition_index = prohibition_index;
    },

    updateFormField (state, payload) {
        console.log("inside mutations.js updateFormField(): " + JSON.stringify(payload))
        console.log("ID: " + payload.target.id)
        console.log("value: " + payload.target.value)
        let id = payload.target.id;
        let value = payload.target.value;
        let prohibition_index = state.currently_editing_prohibition_index
        Vue.set(state.edited_forms[prohibition_index].data, id, value);
    },

    updateCheckBox (state, payload) {
        console.log("inside mutations.js updateCheckBox():", payload)
        console.log("ID: " + payload.target.id)
        console.log("value: " + payload.target.value)
        let id = payload.target.id;
        let value = payload.target.value;
        let prohibition_index = state.currently_editing_prohibition_index
        let root = state.edited_forms[prohibition_index].data
        if (root[id]) {
            if (root[id].includes(value) && typeof root[id] === "object") {
                // item exists; remove it
                console.log(value, 'exists, remove it')
                let indexOfValue = root[id].indexOf(value)
                root[id].splice(indexOfValue, 1)
            } else {
                // item doesn't exist; so add it
                console.log(value, 'does not exist, add it')
                root[id].push(value);
            }
        } else {
            console.log('initial push', value)
            Vue.set(root, id, [value])
        }
    },

    saveFormsToLocalStorage (state) {
         console.log("inside mutations.js saveFormsToLocalStorage()");
         localStorage.setItem("digitalProhibitions", JSON.stringify(state.edited_forms) );
    },

    retrieveFormsFromLocalStorage (state) {
        let digitalProhibitions = localStorage.getItem("digitalProhibitions");
        if (digitalProhibitions) {
            let local_data = JSON.parse(digitalProhibitions);
            console.log("localStorage.digitalProhibitions does exists");
            local_data.forEach( form => {
                state.edited_forms.push(form);
            })
        } else {
            console.log("localStorage.digitalProhibitions does not exist")
        }
    },

    saveUniqueIdsToLocalStorage (state) {
         console.log("inside mutations.js saveUniqueIdsToLocalStorage()");
         localStorage.setItem("uniqueIds", JSON.stringify(state.unique_ids) );
         let d = localStorage.getItem("uniqueIds")
         console.log("saved d", d)
    },

    retrieveUniqueIdsFromLocalStorage (state) {
        console.log("inside mutations.js retrieveUniqueIdsFromLocalStorage()");
        let e = localStorage.getItem("uniqueIds")
        if (e) {
            state.unique_ids = JSON.parse(e)
        }
        console.log(state.unique_ids, "unique_ids")
    },

    deleteForm(state, prohibition_index) {
        console.log("inside mutations.js deleteForm()")
        Vue.delete(state.edited_forms, prohibition_index)
    },

    stopEditingCurrentForm(state) {
        state.currently_editing_prohibition_index = null;
    },

    markFormStatusAsServed(state) {
        console.log("inside markFormStatusAsServed()")
        let prohibition_index = state.currently_editing_prohibition_index
        Vue.set(state.edited_forms[prohibition_index].data, "served", true)
    },

    networkBackOnline(state) {
        state.isOnline = true;
    },

    networkOffline(state) {
        state.isOnline = false;
    },

    generateXFDF(state, xml_filename) {
        let prohibition_index = state.currently_editing_prohibition_index
        let key_value_pairs = getKeyValuePairs(state, prohibition_index);
        let root = state.edited_forms[prohibition_index].data
        Vue.set(root, 'xfdf', xfdf.generate(xml_filename, key_value_pairs))
    },

    populateDriversFromICBC(state, payload) {
        console.log("inside mutations.js populateDriversFromICBC(): " + payload)
        populateDriver(state,payload)
    },

    populateFromICBCPlateLookup(state, payload) {
        console.log("inside mutations.js populateFromICBCPlateLookup(): " + payload)
        // populateDriver(state,prohibition_index);
        populateVehicleInfo(state, payload);
    },

    nextStep(state) {
        let prohibition_index = state.currently_editing_prohibition_index
        let current_step_number = state.edited_forms[prohibition_index].data.current_step;
        Vue.set(state.edited_forms[prohibition_index].data, "current_step", current_step_number + 1);
    },

    previousStep(state) {
        let prohibition_index = state.currently_editing_prohibition_index
        let current_step_number = state.edited_forms[prohibition_index].data.current_step;
        Vue.set(state.edited_forms[prohibition_index].data, "current_step", current_step_number - 1);
    },

    updateUniqueIDs(state, payload) {
        let now = new Date()
        Vue.set(state.unique_ids, "retrieved_date", now.toISOString());
        Vue.set(state.unique_ids.ids, payload.schema, payload.data)
        console.log('data: ', state.unique_ids)
    },

    deleteUniqueIdFromAvailableList(state, payload) {
        console.log("inside deleteUniqueIdFromAvailableList()", payload)
        state.unique_ids.ids[payload.type].shift(payload.idx)
    }
}

function getKeyValuePairs (state, prohibition_index) {
    console.log("getKeyValuePairs(): ", prohibition_index)
    let form_data = state.edited_forms[prohibition_index].data;
    console.log("getFormKeyValuePairs()", form_data)
    let key_value_pairs = Array();
    for( let object in form_data) {
        key_value_pairs[object] = form_data[object];
    }
    console.log('getKeyValuePairs()', key_value_pairs)
    return key_value_pairs;
}

async function populateVehicleInfo(state, icbcPayload) {
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
            Vue.set(state.edited_forms[prohibition_index].data, "plate_year", "2021");
            Vue.set(state.edited_forms[prohibition_index].data, "plate_val_tag", "1234567");
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
}


async function populateDriver(state, icbcPayload) {
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
}




