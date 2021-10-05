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

    async renewFormLeasesFromApiIfNecessary (context) {
        console.log("inside renewFormLeasesFromApiIfNecessary()")
        for( let form in context.getters.arrayOfFormsRequiringRenewal) {
            let number_of_attempts = 0
            while (number_of_attempts < constants.MAX_NUMBER_UNIQUE_ID_FETCH_ATTEMPTS) {
                number_of_attempts++;
                await context.dispatch("renewFormFromApiById", form.form_type, form.form_id)
                    .then(data => {
                        if (data) {
                            context.commit("pushFormToStore", data)
                            context.dispatch("saveCurrentFormToDB", data)
                        }
                    })
                    .catch(function (error) {
                        console.log('Unable to renew form lease for ' + form.form_id)
                        console.log(error)
                    })
           }
        }
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
                        if (data) {
                            context.commit("pushFormToStore", data)
                            context.dispatch("saveCurrentFormToDB", data)
                        }
                    })
                    .catch(function (error) {
                        console.log('Unable to retrieve UniqueIDs for ' + form_type)
                        console.log(error)
                    })
           }
        }
    },

    async getFormIdsFromApiByType (context, form_type) {
        const url = constants.API_ROOT_URL + "/api/v1/forms/" + form_type
        return await fetch(url, {
            "method": "POST",
            headers: context.getters.apiHeader,
            credentials: "same-origin"})
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

    async renewFormFromApiById (context, form_type, form_id) {
        console.log("inside renewFormFromApiById()")
        const url = constants.API_ROOT_URL + "/api/v1/forms/" + form_type + "/" + form_id
        return await fetch(url, {
            "method": "PATCH",
            headers: context.getters.apiHeader,
            credentials: "same-origin"})
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

    async lookupDriverFromICBC(context, icbcPayload) {
        console.log("inside actions.js lookupDriverFromICBC(): " + icbcPayload)
        let dlNumber = icbcPayload['dlNumber']
        const url = constants.API_ROOT_URL + "/api/v1/icbc/drivers/" + dlNumber
        return await new Promise((resolve, reject) => {
             fetch(url, {
                "method": 'GET',
                "headers": context.getters.apiHeader
            })
                .then(response => response.json())
                .then(data => {
                    console.log("data", data)
                    resolve(context.commit("populateDriverFromICBC", data ))
                })
                .catch( (error) => {
                    if (error) {
                        reject("error" in error ? error.error : {"description": "No valid response"})
                    }
                    reject({"description": "Server did not respond"})
                });
            })
    },

    async lookupPlateFromICBC(context, icbcPayload) {
        console.log("inside actions.js lookupPlateFromICBC(): ")
        console.log("icbcPayload", icbcPayload)
        let plate_number = icbcPayload['plateNumber']
        const url = constants.API_ROOT_URL + "/api/v1/icbc/vehicles/" + plate_number
        return await new Promise((resolve, reject) => {
            fetch(url, {
            "method": 'GET',
            "headers": context.getters.apiHeader
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("data", data)
                        resolve(context.commit("populateVehicleFromICBC", data))
                    })
                    .catch((error) => {
                        console.log("error", error)
                        if (error) {
                            reject("error" in error ? error.error : {"description": "No valid response"})
                        }
                        reject({"description": "Server did not respond"})
                        });
                })
    },

    fetchDynamicLookupTables(context, type) {
        const url = constants.API_ROOT_URL + "/api/v1/" + type
        let networkDataRetrieved = false

        // trigger request for fresh data from API
        var networkUpdate = fetch(url, {
            "method": 'GET',
            "headers": context.getters.apiHeader
        })
            .then( response => {
                return response.json()
            })
            .then( data => {
                networkDataRetrieved = true
                context.commit("populateStaticLookupTables", { "type": type, "data": data })
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
                context.commit("populateStaticLookupTables", { "type": type, "data": data })
                return data;
            }
        }).catch( function() {
            // we didn't get cached data, the API is our last hope
            return networkUpdate;
        })
    },

    async fetchStaticLookupTables(context, type) {
        const url = constants.API_ROOT_URL + "/api/v1/" + type

        caches.match(url).then( response => {
            if (!response) throw Error("No cached data");
            return response.json();
        }).then ( data => {
            context.commit("populateStaticLookupTables", { "type": type, "data": data })
        }).catch( async function() {
            // we didn't get cached data, get the data from the network
            return await fetch(url, {
                "method": 'GET',
                "headers": context.getters.apiHeader
        }).then( response => {
                return response.json()
            })
            .then( data => {
                context.commit("populateStaticLookupTables", { "type": type, "data": data })
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
    },


}
