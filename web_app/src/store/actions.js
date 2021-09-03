import constants from "@/config/constants";

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

    async lookupDriverFromICBC({commit}, icbcPayload) {
        console.log("inside actions.js lookupDriverFromICBC(): " + icbcPayload)
        let dlNumber = icbcPayload['dlNumber']
        const url = constants.URL_ROOT + "/api/v1/drivers/" + dlNumber
        return await fetch(url, {
            "method": 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log("data", data)
                commit("populateDriverFromICBC", data )
            })
            .catch(function (error) {
                console.log(error)
            });
    },

    async lookupPlateFromICBC({commit}, icbcPayload) {
        console.log("inside actions.js populateFromICBCPlateLookup(): ")
        console.log("icbcPayload", icbcPayload)
        let plate_number = icbcPayload['plateNumber']
        const url = constants.URL_ROOT + "/api/v1/vehicles/" + plate_number
        return await fetch(url, {
            "method": 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log("data", data)
                commit("populateVehicleFromICBC", data)
            })
            .catch(function (error) {
                console.log("catch inside populateFromIcbcPlateLookup()")
               console.log(error)
            });
    },

    fetchDynamicLookupTables({commit}, type) {
        const url = constants.URL_ROOT + "/api/v1/configuration/" + type
        let networkDataRetrieved = false

        // trigger request for fresh data from API
        var networkUpdate = fetch(url, {
            "method": 'GET',
        })
            .then( response => {
                return response.json()
            })
            .then( data => {
                networkDataRetrieved = true
                commit("populateStaticLookupTables", { "type": type, "data": data })
            })
            .catch(function (error) {
                console.log('network request failed', error)
            });

        caches.match(url).then( response => {
            if (!response) throw Error("No cached data");
            return response.json();
        }).then ( data => {
            // don't overwrite newer network data
            if(!networkDataRetrieved) {
                commit("populateStaticLookupTables", { "type": type, "data": data })
                return data;
            }
        }).catch( function() {
            // we didn't get cached data, the API is our last hope
            return networkUpdate;
        })
    },

    fetchStaticLookupTables({commit}, type) {
        const url = constants.URL_ROOT + "/api/v1/configuration/" + type

        caches.match(url).then( response => {
            if (!response) throw Error("No cached data");
            return response.json();
        }).then ( data => {
            commit("populateStaticLookupTables", { "type": type, "data": data })
        }).catch( function() {
            // we didn't get cached data, the API is our last hope
            return fetch(url, {
            "method": 'GET',
        }).then( response => {
                return response.json()
            })
            .then( data => {
                commit("populateStaticLookupTables", { "type": type, "data": data })
            })
            .catch(function (error) {
                console.log('network request failed', error)
            });
        })
    }
}
