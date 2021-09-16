import moment from "moment";
import constants from "../config/constants";
import xfdf from "../helpers/xfdf_generator";

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

    isFormBeingEdited: state => {
        return state.currently_editing_form_object.form_id !== null
    },

    getCurrentlyEditedFormObject: state => {
        return state.currently_editing_form_object;
    },

    getCurrentlyEditedFormId: state => {
        return state.currently_editing_form_object.form_id;
    },

    getSelectedFormComponent: state => {
        let form_object = state.currently_editing_form_object;
        if (form_object.form_id == null) {
            return null;
        }
        return state.forms[form_object.form_type][form_object.form_id].component;
    },

    getCurrentlyEditedFormData: state => {
        let form_object = state.currently_editing_form_object;
        return state.forms[form_object.form_type][form_object.form_id].data;
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

    getArrayOfVehicleYears: state => {
        return state.vehicles.map(v => v.year).filter(_onlyUnique);
    },

    getArrayOfVehicleMakes: state => {
        let form_object = state.currently_editing_form_object;
        let year = state.forms[form_object.form_type][form_object.form_id].data.vehicle_year
        let results = state.vehicles.filter(v => v.year === year);
        if (results.length > 0) {
            return results.map( v => v.make ).filter(_onlyUnique)
        } else {
            return []
        }
    },

    getArrayOfVehicleModels: state => {
        let form_object = state.currently_editing_form_object;
        let year = state.forms[form_object.form_type][form_object.form_id].data.vehicle_year
        let make = state.forms[form_object.form_type][form_object.form_id].data.vehicle_make
        let results = state.vehicles.filter( v => v.year === year && v.make === make);
        if (results.length > 0) {
            return results.map( v => v.model )
        } else {
            return []
        }
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
        return state.forms[form_object.form_type][form_object.form_id].served_timestamp == null;
    },

    getServedStatus: state => form_object => {
        if (state.forms[form_object.form_type][form_object.form_id].served_timestamp) {
            return "Served";
        }
        return "Not Served"
    },

    getRoadSafetyEmailAddress: state => {
        return state.ROADSAFETY_EMAIL;
    },

    getXdfFileNameString: state => form_object => {
        let file_extension = ".xfdf"
        let last_name = state.forms[form_object.form_type][form_object.form_id].data.last_name;
        let form_id = state.forms[form_object.form_type][form_object.form_id].form_id;
        let file_name = last_name + "_" + form_id + file_extension;
        console.log('filename', file_name)
        return file_name
    },

    getPDFTemplateFileName: state => {
        let form_object = state.currently_editing_form_object;
        return state.forms[form_object.form_type][form_object.form_id].pdf_template;
    },

    getArrayOfJurisdictions: state => {
        return state.jurisdictions;
    },

    getArrayOfProvinces: state => {
        return state.provinces;
    },

    getArrayOfImpoundLotOperators: state => {
        return state.impound_lot_operators.map( o => o.name + " - " + o.lot_address + ", " + o.city + ", " + o.phone);
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

    getCurrentFormData: state => {
        let form_object = state.currently_editing_form_object;
        return state.forms[form_object.form_type][form_object.form_id].data;
    },

    getXFDF: (state, getters) => pdf_template_filepath => {
        let key_value_pairs = getters.getKeyValuePairs;
        return xfdf.generate(pdf_template_filepath, key_value_pairs)
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
            FormTypeCount[form_type] = Object.keys(state.forms[form_type]).length
        }
        return FormTypeCount;
    },

    getNextAvailableUniqueIdByType: state => form_type => {
        console.log("inside getNextAvailableUniqueIdByType()", form_type)
        for (let form_id in state.forms[form_type]) {
            if( ! ("data" in state.forms[form_type][form_id])) {
                return {
                    "form_id": form_id,
                    "form_type": form_type
                }
            }

        }
    },

    getKeyValuePairs: state => {
        let form_object = state.currently_editing_form_object;
        let form_data = state.forms[form_object.form_type][form_object.form_id].data;
        let key_value_pairs = Array();
        for( let object in form_data) {
            key_value_pairs[object] = form_data[object];
        }
        return key_value_pairs;
    },

    arrayOfFormsRequiringRenewal: state => {
        let forms = Array();
        for (let form_type in state.forms) {
            for (let form_id in state.forms[form_type]) {
                let form_object = state.forms[form_type][form_id]
                let days_to_expiry = moment(form_object.lease_expiry).diff(moment(), 'days')
                if (! form_object.served_timestamp && days_to_expiry < constants.UNIQUE_ID_REFRESH_DAYS) {
                    forms.push(form_object)
                }
            }
        }
        return forms
    },

}

function _onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

