import moment from "moment";
import constants from "@/config/constants";
import xfdf from "@/helpers/xfdf_generator";

export default {

    getAllAvailableForms: state => {
      return state.form_schemas.forms;
    },

    getAppVersion: state => {
      return state.version;
    },

    getAllEditedProhibitions: state => {
        return state.edited_forms;
    },

    isFormBeingEdited: state => {
        return state.currently_editing_prohibition_index !== null
    },

    getCurrentlyEditedProhibitionIndex: state => {
        return state.currently_editing_prohibition_index;
    },

    getCurrentlyEditedProhibitionNumber: state => {
        return state.edited_forms[state.currently_editing_prohibition_index].data.prohibition_number;
    },

    getSelectedFormComponent: state => {
        let prohibition_index = state.currently_editing_prohibition_index;
        if (prohibition_index == null) {
            return null;
        }
        return state.edited_forms[prohibition_index].component;
    },

    getCurrentlyEditedForm: state => {
        console.log('inside getCurrentlyEditedForm')
        let prohibition_index = state.currently_editing_prohibition_index;
        if (prohibition_index == null) {
            return null;
        }
        return state.edited_forms[prohibition_index];
    },

    getFormSteps: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        return state.edited_forms[prohibition_index].steps;
    },

    getFormCurrentStep: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        return state.edited_forms[prohibition_index].data.current_step;
    },

    isPreviousButtonDisabled: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        if (state.edited_forms[prohibition_index].data.current_step === 1) {
            return true
        }
    },

    isNextButtonDisabled: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        let max_steps = state.edited_forms[prohibition_index].steps.length
        if (state.edited_forms[prohibition_index].data.current_step === max_steps) {
            return true
        }
    },

    getAttributeValue: state => id => {
        let prohibition_index = state.currently_editing_prohibition_index
        let root = state.edited_forms[prohibition_index].data;
        if (!(id in root)) {
            return '';
        }
        return root[id];
    },

    checkBoxStatus: state => (id, value) => {
        let prohibition_index = state.currently_editing_prohibition_index
        let root = state.edited_forms[prohibition_index].data;
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
        let prohibition_index = state.currently_editing_prohibition_index
        let year = state.edited_forms[prohibition_index].data.vehicle_year
        let results = state.vehicles.filter(v => v.year === year);
        if (results.length > 0) {
            return results.map( v => v.make ).filter(_onlyUnique)
        } else {
            return []
        }
    },

    getArrayOfVehicleModels: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        let year = state.edited_forms[prohibition_index].data.vehicle_year
        let make = state.edited_forms[prohibition_index].data.vehicle_make
        let results = state.vehicles.filter( v => v.year === year && v.make === make);
        if (results.length > 0) {
            return results.map( v => v.model )
        } else {
            return []
        }
    },

    isRecentProhibitions: state => {
        return state.edited_forms.length > 0;
    },

    getSpecificForm: state => prohibition_index => {
        return state.edited_forms[prohibition_index];
    },

    isNetworkOnline: state => {
        return state.isOnline;
    },

    isFormEditable: state => prohibition_index => {
        return state.edited_forms[prohibition_index].data.served === false;
    },

    getServedStatus: state => prohibition_index => {
        if (state.edited_forms[prohibition_index].data.served) {
            return "Served";
        }
        return "Not Served"
    },

    getRoadSafetyEmailAddress: state => {
        return state.ROADSAFETY_EMAIL;
    },

    getXdfFileNameString: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        let file_extension = ".xfdf"
        let last_name = state.edited_forms[prohibition_index].data.last_name;
        let prohibition_number = state.edited_forms[prohibition_index].data.prohibition_number;
        let file_name = last_name + "_" + prohibition_number + file_extension;
        console.log('filename', file_name)
        return file_name
    },

    getPDFTemplateFileName: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        return state.edited_forms[prohibition_index].pdf_template;
    },

    getArrayOfJurisdictions: state => {
        return state.jurisdictions;
    },

    getArrayOfProvinces: state => {
        return state.provinces;
    },

    getArrayOfImpoundLotOperators: state => {
        return state.impoundLotOperators.map( o => o.name + " - " + o.lot_address + ", " + o.city + ", " + o.phone);
    },

    getArrayOfPickupLocations: state => {
        return state.pickup_locations.map( o => o.address + ", " + o.city);
    },

    isPlateJurisdictionBC: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        let root = state.edited_forms[prohibition_index].data;
        return root['plate_province'] === "British Columbia"
    },

    isLicenceJurisdictionBC: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        let root = state.edited_forms[prohibition_index].data;
        return root['drivers_licence_jurisdiction'] === "British Columbia"
    },

    driverIsNotRegisteredOwner: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        let root = state.edited_forms[prohibition_index].data;
        if( ! root['owner_is_driver']) {
            return false;
        }
        return ! root['owner_is_driver'].includes("Driver is the vehicle owner")
    },

    corporateOwner: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        let root = state.edited_forms[prohibition_index].data;
        if( ! root['corporate_owner']) {
            return false;
        }
        return root['corporate_owner'].includes("Owned by corporate entity")
    },

    getCurrentFormData: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        return state.edited_forms[prohibition_index].data;
    },

    getXFDF: (state, getters) => pdf_template_filepath => {
        let key_value_pairs = getters.getKeyValuePairs;
        return xfdf.generate(pdf_template_filepath, key_value_pairs)
    },

    areNewUniqueIdsRequiredByType: (state, getters) => prohibition_type => {
        console.log("inside areNewUniqueIdsRequiredByType()", prohibition_type)
        if (state.unique_ids === {}) {
            console.log("Unique ids have never been retrieved before")
            return true;
        }
        if (getters.getMinimumUniqueIdsOnHandByType(prohibition_type) < constants.MINIMUM_NUMBER_OF_UNIQUE_IDS_PER_TYPE) {
            console.log("Number of unique ids is below set minimums", getters.getMinimumUniqueIdsOnHandByType(prohibition_type))
            return true;
        }
        if (getters.getOldestUniqueIdExpiryDateByType(prohibition_type) > constants.UNIQUE_ID_REFRESH_DAYS) {
            console.log("At least one unique ids is getting close to it's expiry date")
            return true;
        }

        return false

    },

    getMinimumUniqueIdsOnHandByType: state => prohibition_type => {
        if (prohibition_type in state.unique_ids) {
            return state.unique_ids[prohibition_type].length
        }
        return 0;
    },

    getOldestUniqueIdExpiryDateByType: state => prohibition_type => {
        let maximum_days_old = 0;
        if (prohibition_type in state.unique_ids) {
            for (let record of state.unique_ids[prohibition_type]) {
                let days_to_expiry = moment().diff(record.lease_expiry, "days")
                if (days_to_expiry > maximum_days_old) {
                    maximum_days_old = days_to_expiry
                }
                return maximum_days_old
            }
        }

    },

    getNextAvailableUniqueIdByType: state => prohibition_type => {
        console.log("inside getNextAvailableUniqueId()")
        for (let [idx, record] of state.unique_ids[prohibition_type].entries()) {
            console.log("record", record)
            if (moment().diff(record.lease_expiry, "days") < 0) {
                console.log("inside loop", record, idx)
                return {
                    "id": record.id,
                    "type": prohibition_type,
                    "idx": idx
                }
            }
            return {}
        }
    },

    getKeyValuePairs: state => {
        let prohibition_index = state.currently_editing_prohibition_index
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

}

function _onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

