import moment from "moment";
import constants from "../config/constants";

export const getters = {

    getAllAvailableForms: state => {
      return state.form_schemas.forms;
    },

    getAppVersion: state => {
      return state.version;
    },

    getAllEditedForms: state => {
        let edited_forms = Array();
        for (let form_type in state.forms) {
            for (let form_id in state.forms[form_type]) {
                if ("data" in state.forms[form_type][form_id]) {
                    edited_forms.push(state.forms[form_type][form_id])
                }
            }
        }
        return edited_forms;
    },

    getCurrentlyEditedFormObject: state => {
        return state.currently_editing_form_object;
    },

    getCurrentlyEditedFormId: state => {
        return state.currently_editing_form_object.form_id;
    },

    getFormData: state => (form_type, form_id) => {
        return state.forms[form_type][form_id].data;
    },

    getCurrentlyEditedFormData: state => {
        let form_object = state.currently_editing_form_object;
        let root = state.forms[form_object.form_type][form_object.form_id]
        return root.data;
    },

    getFormSteps: state => {
        let form_object = state.currently_editing_form_object;
        return state.forms[form_object.form_type][form_object.form_id].steps;
    },

    getFormCurrentStep: state => {
        let form_object = state.currently_editing_form_object;
        return state.forms[form_object.form_type][form_object.form_id].data.current_step;
    },

    isPreviousButtonDisabled: state => {
        let form_object = state.currently_editing_form_object;
        if (state.forms[form_object.form_type][form_object.form_id].data.current_step === 1) {
            return true
        }
    },

    isNextButtonDisabled: state => {
        let form_object = state.currently_editing_form_object;
        let max_steps = state.forms[form_object.form_type][form_object.form_id].steps.length
        if (state.forms[form_object.form_type][form_object.form_id].data.current_step === max_steps) {
            return true
        }
    },

    getAttributeValue: state => id => {
        let form_object = state.currently_editing_form_object;
        let root = state.forms[form_object.form_type][form_object.form_id].data;
        if (!(id in root)) {
            return '';
        }
        return root[id];
    },

    checkBoxStatus: state => (id, value) => {
        let form_object = state.currently_editing_form_object;
        let root = state.forms[form_object.form_type][form_object.form_id].data;
        if (!(id in root)) {
            return false;
        }
        return root[id].includes(value);
    },

    getArrayOfBCCityNames: state => {
        return state.cities;
    },

    getArrayOfCommonCarColors: state => {
        return state.colors;
    },

    getArrayOfVehicleYears: () => {
        const start = constants.MIN_VEHICLE_YEAR;
        const end = constants.MAX_VEHICLE_YEAR;
        return Array( end - start + 1).fill().map((_, idx) => start + idx)
    },

    getArrayOfVehicleMakes: state => {
        return state.vehicles.map(v => v.make).filter(_onlyUnique);
    },

    getArrayOfVehicleModels: state => {
        let form_object = state.currently_editing_form_object;
        let make = state.forms[form_object.form_type][form_object.form_id].data.vehicle_make
        let results = state.vehicles.filter( v => v.make === make);
        if (results.length > 0) {
            return results.map( v => v.model )
        } else {
            return []
        }
    },

    getArrayOfVehicleStyles: state => {
        return state.vehicle_styles;
    },

    isRecentProhibitions: state => {
        for (let form_type in state.forms) {
            // console.log('form_type', form_type)
            for (let form_object in state.forms[form_type]) {
                if("data" in state.forms[form_type][form_object]) {
                    // the 'data' attribute is added when the form is first edited
                    return true
                }
            }
        }
        return false
    },

    isNetworkOnline: state => {
        return state.isOnline;
    },

    isFormEditable: state => form_object => {
        return state.forms[form_object.form_type][form_object.form_id].printed_timestamp == null;
    },

    getServedStatus: state => form_object => {
        if (state.forms[form_object.form_type][form_object.form_id].printed_timestamp) {
            return "Printed";
        }
        return "Not Printed"
    },

    getRoadSafetyEmailAddress: state => {
        return state.ROADSAFETY_EMAIL;
    },

    getPdfFileNameString: state => (form_object, document_type) => {
        let file_extension = ".pdf"
        let root = state.forms[form_object.form_type][form_object.form_id]
        let last_name = root.data.last_name;
        let form_id = root.form_id;
        return last_name + "_" + form_id + "_" + document_type + file_extension;
    },

    getPDFTemplateFileName: state => document_type => {
        let form_object = state.currently_editing_form_object;
        return state.form_schemas.forms[form_object.form_type].documents[document_type].pdf;
    },

    documentObjects: state => {
        let form_object = state.currently_editing_form_object;
        return state.form_schemas.forms[form_object.form_type].documents;
    },

    getArrayOfJurisdictions: state => {
        return state.jurisdictions;
    },

    getArrayOfProvinces: state => {
        return state.provinces;
    },

    getArrayOfImpoundLotOperators: state => {
        return state.impound_lot_operators.map( o => o.name + ", " + o.lot_address + ", " + o.city + ", " + o.phone);
    },

    getArrayOfPickupLocations: state => {
        return state.pickup_locations.map( o => o.address + ", " + o.city);
    },

    isPlateJurisdictionBC: state => {
        let form_object = state.currently_editing_form_object;
        let root = state.forms[form_object.form_type][form_object.form_id].data;
        return root['plate_province'] === "British Columbia"
    },

    isLicenceJurisdictionBC: state => {
        let form_object = state.currently_editing_form_object;
        let root = state.forms[form_object.form_type][form_object.form_id].data;
        return root['drivers_licence_jurisdiction'] === "British Columbia"
    },

    corporateOwner: state => {
        let form_object = state.currently_editing_form_object;
        let root = state.forms[form_object.form_type][form_object.form_id].data;
        if( ! root['corporate_owner']) {
            return false;
        }
        return root['corporate_owner'].includes("Owned by corporate entity")
    },

    areNewUniqueIdsRequiredByType: (state, getters) => form_type => {
        // Business rules state that X number of forms must be available to use offline
        if (getters.getFormTypeCount[form_type] < constants.MINIMUM_NUMBER_OF_UNIQUE_IDS_PER_TYPE) {
            console.log("inside areNewUniqueIdsRequiredByType", getters.getFormTypeCount, form_type)
            return true;
        }
        return false
    },

    getFormTypeCount: state => {
        let FormTypeCount = {}
        for (let form_type in state.forms) {
            FormTypeCount[form_type] = 0;
            for (let form_id in state.forms[form_type]) {
                if ( ! ("data" in state.forms[form_type][form_id])) {
                    FormTypeCount[form_type]++
                }

            }
        }
        return FormTypeCount;
    },

    getNextAvailableUniqueIdByType: state => form_type => {
        console.log("inside getNextAvailableUniqueIdByType()", form_type)
        for (let form_id in state.forms[form_type]) {
            if( ! ("data" in state.forms[form_type][form_id])) {
                return form_id
            }
        }
    },

    arrayOfFormsRequiringRenewal: state => {
        let forms = Array();
        for (let form_type in state.forms) {
            for (let form_id in state.forms[form_type]) {
                let form_object = state.forms[form_type][form_id]
                let days_to_expiry = moment(form_object.lease_expiry).diff(moment(), 'days')
                if (! form_object.printed_timestamp && days_to_expiry < constants.UNIQUE_ID_REFRESH_DAYS) {
                    forms.push(form_object)
                }
            }
        }
        return forms
    },

    apiHeader: state => {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json')
        if (state.keycloak) {
            headers.set('Authorization', 'Bearer ' + state.keycloak.token)
        }
        return headers
    },

    getKeycloakUsername: state => {
        if (state.keycloak) {
            return state.keycloak.userName;
        }
        return ''
    },

    getFormPrintValue: state => (form_object, attribute) => {
        let root = state.forms[form_object.form_type][form_object.form_id].data;
        if (!(attribute in root)) {
            return '';
        }
        return root[attribute];
    },

    getFormPrintRadioValue: state => (form_object, attribute, checked_value) => {
        let root = state.forms[form_object.form_type][form_object.form_id].data;
        if (!(attribute in root)) {
            return false;
        }
        return (root[attribute] === checked_value);
    },

    getFormPrintCheckedValue: state => (form_object, attribute, checked_value) => {
        let root = state.forms[form_object.form_type][form_object.form_id].data;
        if (!(attribute in root)) {
            return '';
        }
        return (root[attribute].includes(checked_value))
    },

    getFormPrintJurisdiction: state => (form_object, attribute) => {
        let root = state.forms[form_object.form_type][form_object.form_id].data;
        if (!(attribute in root)) {
            return '';
        }
        let filteredObject = state.jurisdictions.filter( j => j['objectDsc'] === root[attribute]);
        console.log('filteredObject', filteredObject)
        return filteredObject[0]['objectCd']
    }

}

function _onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

