import Vue from 'vue'

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
        Vue.set(state.unique_ids, payload.schema, payload.data)
        console.log('data: ', state.unique_ids)
    },

    deleteUniqueIdFromAvailableList(state, payload) {
        console.log("inside deleteUniqueIdFromAvailableList()", payload)
        state.unique_ids[payload.type].shift(payload.idx)
    },

    editNewForm(state, payload) {
        console.log("inside editNewForm", payload)
        let form = state.form_schemas.forms[payload.form_short_name]
        console.log("debug", form)
        let new_index = state.edited_forms.push(JSON.parse(JSON.stringify(form))) - 1;
        let root = state.edited_forms[new_index]
        console.log("root", root)
        Vue.set( root, "data", Object())
        Vue.set( root.data, "current_step", 1);
        Vue.set( root.data, "served", false);
        Vue.set( root.data, "submitted", false);
        Vue.set( root.data, "prohibition_number", payload.prohibition_number)
        state.currently_editing_prohibition_index = new_index;
        console.log("check edited_forms: " + JSON.stringify(state.edited_forms));
    },

    populateStaticLookupTables(state, payload) {
        Vue.set(state, payload.type, payload.data)
    },

    populateDriverFromICBC(state, data) {
        let prohibition_index = state.currently_editing_prohibition_index
        const address = data['party']['addresses'][0]
        Vue.set(state.edited_forms[prohibition_index].data, "drivers_number", data['dlNumber']);
        Vue.set(state.edited_forms[prohibition_index].data, "last_name", data['party']['lastName']);
        Vue.set(state.edited_forms[prohibition_index].data, "first_name", data['party']['firstName']);
        Vue.set(state.edited_forms[prohibition_index].data, "address1", address['addressLine1']);
        Vue.set(state.edited_forms[prohibition_index].data, "city", address['city']);
        Vue.set(state.edited_forms[prohibition_index].data, "province", address['region']);
        Vue.set(state.edited_forms[prohibition_index].data, "postal", address['postalCode']);
        Vue.set(state.edited_forms[prohibition_index].data, "dob", data['birthDate']);
    },

    populateVehicleFromICBC(state, data) {
        let prohibition_index = state.currently_editing_prohibition_index
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
    },

    populateOwnerFromDriver(state) {
        let prohibition_index = state.currently_editing_prohibition_index
        let root = state.edited_forms[prohibition_index].data
        Vue.set(state.edited_forms[prohibition_index].data, "owners_last_name", root.last_name);
        Vue.set(state.edited_forms[prohibition_index].data, "owners_first_name", root.first_name);
        Vue.set(state.edited_forms[prohibition_index].data, "owners_address1", root.address1);
        Vue.set(state.edited_forms[prohibition_index].data, "owners_city", root.city);
        Vue.set(state.edited_forms[prohibition_index].data, "owners_province", root.province);
        Vue.set(state.edited_forms[prohibition_index].data, "owners_postal", root.postal);
    }
}





