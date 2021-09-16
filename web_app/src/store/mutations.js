import Vue from 'vue'

export const mutations = {

    editExistingForm (state, payload) {
       state.currently_editing_form_object = {
           form_id: payload.form_id,
           form_type: payload.form_type
       };
    },

    updateFormField (state, payload) {
        let id = payload.target.id;
        let value = payload.target.value;
        let form_object = state.currently_editing_form_object
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, id, value);
    },

    updateCheckBox (state, payload) {
        let id = payload.target.id;
        let value = payload.target.value;
        let form_object = state.currently_editing_form_object
        let root = state.forms[form_object.form_type][form_object.form_id].data
        if (root[id]) {
            if (root[id].includes(value) && typeof root[id] === "object") {
                // item exists; remove it
                let indexOfValue = root[id].indexOf(value)
                root[id].splice(indexOfValue, 1)
            } else {
                // item doesn't exist; so add it
                root[id].push(value);
            }
        } else {
            Vue.set(root, id, [value])
        }
    },

    deleteForm(state, payload) {
        // TODO - add business logic to ensure user can delete a form
        Vue.delete(state.forms[payload.form_type][payload.form_id], "data")
    },

    stopEditingCurrentForm(state) {
        state.currently_editing_form_object.form_type = null;
        state.currently_editing_form_object.form_id = null;
    },

    markFormStatusAsServed(state, date) {
        let form_object = state.currently_editing_form_object
        Vue.set(state.forms[form_object.form_type][form_object.form_id], "served_timestamp", date)
    },

    networkBackOnline(state) {
        state.isOnline = true;
    },

    networkOffline(state) {
        state.isOnline = false;
    },

    nextStep(state) {
        let form_object = state.currently_editing_form_object
        let current_step_number = state.forms[form_object.form_type][form_object.form_id].data.current_step;
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "current_step", current_step_number + 1);
    },

    previousStep(state) {
        let form_object = state.currently_editing_form_object
        let current_step_number = state.forms[form_object.form_type][form_object.form_id].data.current_step;
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "current_step", current_step_number - 1);
    },

    setNewFormDefaults(state, form_object) {
        console.log("inside setNewFormDefaults()", form_object)
        let root = state.forms[form_object.form_type][form_object.form_id]
        Vue.set( root, "data", Object())
        Vue.set( root.data, "current_step", 1);
        Vue.set( root.data, "submitted", false);

        for (let form_property in state.form_schemas.forms[form_object.form_type]) {
            Vue.set(root, form_property, state.form_schemas.forms[form_object.form_type][form_property])
        }

    },

    populateStaticLookupTables(state, payload) {
        Vue.set(state, payload.type, payload.data)
    },

    populateDriverFromICBC(state, data) {
        let form_object = state.currently_editing_form_object
        const address = data['party']['addresses'][0]
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "drivers_number", data['dlNumber']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "last_name", data['party']['lastName']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "first_name", data['party']['firstName']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "address1", address['addressLine1']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "city", address['city']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "province", address['region']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "postal", address['postalCode']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "dob", data['birthDate']);
    },

    saveICBCVehicleToStore(state, data) {
        Vue.set(state, 'icbc_vehicle_lookup', data)
    },

    populateVehicleFromICBC(state, data) {
        let form_object = state.currently_editing_form_object
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "registration_number", data['registrationNumber']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "vehicle_year", data['vehicleModelYear']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "vehicle_make", data['vehicleMake']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "vehicle_model", data['vehicleModel']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "vehicle_color", data['vehicleColour']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "vin_number", data['vehicleIdNumber']);

        const owner = data['vehicleParties'][0]['party']
        const address = owner['addresses'][0]

        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "owner_is_driver", []);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "owners_last_name", owner['lastName']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "owners_first_name", owner['firstName']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "owners_address1", address['addressLine1']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "owners_city", address['city']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "owners_province", address['region']);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "owners_postal", address['postalCode']);
    },

    populateOwnerFromDriver(state) {
        let form_object = state.currently_editing_form_object
        let root = state.forms[form_object.form_type][form_object.form_id].data
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "owners_last_name", root.last_name);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "owners_first_name", root.first_name);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "owners_address1", root.address1);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "owners_city", root.city);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "owners_province", root.province);
        Vue.set(state.forms[form_object.form_type][form_object.form_id].data, "owners_postal", root.postal);
    },

    pushFormToStore(state, form_object) {
        console.log("inside pushFormToStore()", form_object)
        Vue.set(state.forms[form_object.form_type], form_object.form_id, form_object)
    }
}





