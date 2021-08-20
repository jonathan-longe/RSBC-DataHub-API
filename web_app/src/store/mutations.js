import Vue from 'vue'
import xfdf from "@/helpers/xfdf_generator";

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
        Vue.set( root.data, "owner_is_driver", ["Driver is the vehicle owner"])
        Vue.set( root.data, "prohibition_number", payload.prohibition_number)
        state.currently_editing_prohibition_index = new_index;
        console.log("check edited_forms: " + JSON.stringify(state.edited_forms));
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





