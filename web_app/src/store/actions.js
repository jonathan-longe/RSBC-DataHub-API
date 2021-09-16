import constants from "@/config/constants";
import persistence from "@/helpers/persistence";


export const actions = {

    saveDoNotPrint (context) {
        console.log("inside actions.js saveDoNotPrint()");
        let form_object = context.getters.getCurrentlyEditedFormObject;
        context.commit('stopEditingCurrentForm');
        context.dispatch('saveCurrentFormToDB', context.state.forms[form_object.form_type][form_object.form_id]);
    },

    deleteSpecificForm(context, form_object ) {
        context.dispatch('deleteFormFromDB', form_object.form_id)
        context.commit('deleteForm', form_object)
        context.commit('stopEditingCurrentForm');
    },


    setNewFormToEdit (context, form_type) {
        console.log('inside setNewFormToEdit()')
        let form_object = context.getters.getNextAvailableUniqueIdByType(form_type)

        // copy form boilerplate to form
        context.commit("setNewFormDefaults", form_object)
        context.commit("editExistingForm", form_object)
        context.dispatch("saveCurrentFormToDB", context.state.forms[form_object.form_type][form_object.form_id])
    },

    async getMoreFormsFromApiIfNecessary (context) {
        console.log("inside getMoreFormsFromApiIfNecessary()")
        for( let form_type in context.state.form_schemas.forms) {
            let number_of_attempts = 0
            while (context.getters.areNewUniqueIdsRequiredByType(form_type)
            && number_of_attempts < constants.MAX_NUMBER_UNIQUE_ID_FETCH_ATTEMPTS) {
                number_of_attempts++;
                await context.dispatch("getFormIdsFromApiByType", form_type)
                    .then(data => {
                        context.commit("pushFormToStore", data)
                        context.dispatch("saveCurrentFormToDB", data)
                    })
                    .catch(function (error) {
                        console.log('Unable to retrieve UniqueIDs for ' + form_type)
                        console.log(error)
                    })
           }
        }
    },

    async getFormIdsFromApiByType (context, form_type) {
        const headers = new Headers();
        const url = constants.URL_ROOT + "/api/v1/forms/" + form_type
        // TODO - remove before flight
        headers.set('Content-Type', 'application/json')
        headers.set('Authorization', 'Basic ' + btoa(constants.USERNAME + ":" + constants.PASSWORD));
        return await fetch(url, {"method": 'POST', headers: headers, credentials: "same-origin"})
            .then(response => response.json())
            .then(data => {
                return {
                    form_id: data.id,
                    form_type: data.form_type,
                    lease_expiry: data.lease_expiry,
                    served_timestamp: data.served_timestamp
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    },

    async lookupDriverFromICBC({commit}, icbcPayload) {
        console.log("inside actions.js lookupDriverFromICBC(): " + icbcPayload)
        let dlNumber = icbcPayload['dlNumber']
        const url = constants.URL_ROOT + "/api/v1/icbc/drivers/" + dlNumber
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
        const url = constants.URL_ROOT + "/api/v1/icbc/vehicles/" + plate_number
        return await fetch(url, {
            "method": 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log("data", data)
                commit("saveICBCVehicleToStore", data)
            })
            .catch(function (error) {
               console.log(error)
            });
    },

    fetchDynamicLookupTables({commit}, type) {
        const url = constants.URL_ROOT + "/api/v1/" + type
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

    async fetchStaticLookupTables({commit}, type) {
        const url = constants.URL_ROOT + "/api/v1/" + type

        caches.match(url).then( response => {
            if (!response) throw Error("No cached data");
            return response.json();
        }).then ( data => {
            commit("populateStaticLookupTables", { "type": type, "data": data })
        }).catch( async function() {
            // we didn't get cached data, get the data from the network
            return await fetch(url, {
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
    },

    async deleteFormFromDB(context, form_id) {
        await persistence.del(form_id);
    },

    async getAllFormsFromDB(context) {
        context.state.forms = {
            "IRP": {},
            "12Hour": {},
            "24Hour": {}
        };
        await persistence.all()
            .then( forms => {
                console.log("inside getAllFormsFromDB()", forms)
                forms.forEach( form => {
                    context.commit("pushFormToStore", form)
                });
            })

    },

    async saveCurrentFormToDB(context, form_object) {
        let form_object_to_save = context.state.forms[form_object.form_type][form_object.form_id]
        await persistence.updateOrCreate(form_object.form_id, form_object_to_save)
    }


}
