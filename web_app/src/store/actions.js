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
        let payload = getters.getNextAvailableUniqueId(prohibition_type)
        console.log("payload", payload)
        if (payload) {
            commit("deleteUniqueIdFromAvailableList", {"type": prohibition_type, "idx": payload.idx})
            commit("saveUniqueIdsToLocalStorage")
            return payload.id;
        }

    },

    setNewFormToEdit ({dispatch, commit, state}, form) {
        console.log('inside setNewFormToEdit')
        let new_index = state.edited_forms.push(JSON.parse(JSON.stringify(form))) - 1;
        let root = state.edited_forms[new_index]
        dispatch("pluckNextUniqueIdFromListByType", root.short_name).then( response => {
            let unique_id = response
            console.log("root", root)
            Vue.set( root, "data", Object())
            Vue.set( root.data, "current_step", 1);
            Vue.set( root.data, "served", false);
            Vue.set( root.data, "submitted", false);
            Vue.set( root.data, "owner_is_driver", ["Driver is the vehicle owner"])
            Vue.set( root.data, "prohibition_number", unique_id)
            state.currently_editing_prohibition_index = new_index;
            console.log("check edited_forms: " + JSON.stringify(state.edited_forms));
            commit("saveUniqueIdsToLocalStorage")
        })

    },

    retrieveAndSaveUniqueIds ({commit, getters, state}) {
        console.log("inside retrieveAndSaveUniqueIds()")
        commit("retrieveUniqueIdsFromLocalStorage")
        if (getters.areNewUniqueIdsRequired) {
            console.log("new UniqueIDs are required")
            const url = "http://localhost:5002/api/v1/prohibitions/leases/"
            for( let schema in state.form_schemas.forms) {
                fetch(url + schema, {
                "method": 'POST',
            })
                .then(response => response.json())
                .then(data => {
                    commit("updateUniqueIDs", {"schema": schema, "data": data})
                    commit("saveUniqueIdsToLocalStorage")
                })
                .catch(function (error) {
                    console.log(error)
                });
            }
        } else {
            console.log("new UniqueIDs are NOT required")
        }
    }
}
