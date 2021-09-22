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

    getXdfFileNameString: state => (form_object, document_type) => {
        let file_extension = ".xfdf"
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

    getXFDF: (state, getters) => (pdf_template_filepath, form_type, document_type) => {
        let key_value_pairs = getters.getXfdfMappings(form_type, document_type);
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
                return {
                    "form_id": form_id,
                    "form_type": form_type
                }
            }

        }
    },

    getXfdfMappings: (state, getters) => (form_type, document_type) => {
        console.log(document_type)
        let form_object = state.currently_editing_form_object;
        let key_value_pairs = Array();

        key_value_pairs['VIOLATION_NUMBER'] = form_object.form_id
        key_value_pairs['DRIVER_SURNAME'] = getters.getAttributeValue("last_name")
        key_value_pairs['DRIVER_GIVEN'] = getters.getAttributeValue('first_name')
        key_value_pairs['DRIVER_DL_NUMBER'] = getters.getAttributeValue('drivers_number')
        key_value_pairs['DRIVER_DL_PROVINCE'] = getters.getAttributeValue('drivers_licence_jurisdiction')
        // key_value_pairs['DRIVER_DOB_YYYY'] = getters.getAttributeValue('dob')
        // key_value_pairs['DRIVER_DOB_MM'] = getters.getAttributeValue('dob')
        // key_value_pairs['DRIVER_DOB_DD'] = getters.getAttributeValue('dob')
        key_value_pairs['DRIVER_ADDRESS'] = getters.getAttributeValue('address1')
        key_value_pairs['DRIVER_CITY'] = getters.getAttributeValue('city')
        key_value_pairs['DRIVER_PROVINCE'] = getters.getAttributeValue('province')
        key_value_pairs['DRIVER_POSTAL_CODE'] = getters.getAttributeValue('postal')
        key_value_pairs['REASON_ALCOHOL'] = getters.getAttributeValue('prohibition_type')
        key_value_pairs['REASON_DRUGS'] = getters.getAttributeValue('prohibition_type')

        key_value_pairs['NOTICE_TIME'] = getters.getAttributeValue('prohibition_start_time')
        key_value_pairs['NOTICE_DAY'] = getters.getAttributeValue('prohibition_start_time')
        key_value_pairs['NOTICE_MONTH'] = getters.getAttributeValue('prohibition_start_time')
        key_value_pairs['NOTICE_YEAR'] = getters.getAttributeValue('prohibition_start_time')
        key_value_pairs['DL_SURRENDER_LOCATION'] = getters.getAttributeValue('offence_city')
        key_value_pairs['OFFICER_BADGE_NUMBER'] = getters.getAttributeValue('badge_number')
        key_value_pairs['AGENCY_NAME'] = getters.getAttributeValue('agency')
        key_value_pairs['AGENCY_FILE_NUMBER'] = getters.getAttributeValue('file_number')
        key_value_pairs['OWNER_SURNAME'] = getters.getAttributeValue('owners_last_name')
        key_value_pairs['OWNER_GIVEN'] = getters.getAttributeValue('owners_first_name')
        key_value_pairs['OWNER_ADDRESS'] = getters.getAttributeValue('owners_address1')
        key_value_pairs['OWNER_CITY'] = getters.getAttributeValue('owners_city')
        key_value_pairs['OWNER_PROVINCE'] = getters.getAttributeValue('owners_province')
        key_value_pairs['OWNER_POSTAL_CODE'] = getters.getAttributeValue('owners_postal')
        key_value_pairs['VEHICLE_LICENSE_NUMBER'] = getters.getAttributeValue('plate_number')
        key_value_pairs['VEHICLE_PROVINCE'] = getters.getAttributeValue('plate_province')
        key_value_pairs['VEHICLE_LICENSE_YEAR'] = getters.getAttributeValue('plate_year')
        key_value_pairs['VEHICLE_TAG_NUMBER'] = getters.getAttributeValue('plate_val_tag')
        key_value_pairs['VEHICLE_REGISTRATION_NUMBER'] = getters.getAttributeValue('registration_number')
        key_value_pairs['VEHICLE_TYPE'] = getters.getAttributeValue('vehicle_model')
        key_value_pairs['VEHICLE_MAKE'] = getters.getAttributeValue('vehicle_make')
        key_value_pairs['VEHICLE_MODEL'] = getters.getAttributeValue('vehicle_model')
        key_value_pairs['VEHICLE_YEAR'] = getters.getAttributeValue('vehicle_year')
        key_value_pairs['VEHICLE_COLOUR'] = getters.getAttributeValue('vehicle_color')
        key_value_pairs['VEHICLE_NSC_PUJ'] = getters.getAttributeValue('puj_code')
        key_value_pairs['VEHICLE_NSC_NUMBER'] = getters.getAttributeValue('nsc_number')
        key_value_pairs['VEHICLE_VIN'] = getters.getAttributeValue('vin_number')
        key_value_pairs['OWNER_PHONE_AREA_CODE'] = getters.getAttributeValue('owners_phone')
        key_value_pairs['OWNER_PHONE_NUMBER'] = getters.getAttributeValue('owners_phone')
        key_value_pairs['NOT_IMPOUNDED'] = getters.getAttributeValue('vehicle_impounded')
        key_value_pairs['NOT_IMPOUNDED_REASON'] = getters.getAttributeValue('reason_for_not_impounding')
        key_value_pairs['IMPOUNDED'] = getters.getAttributeValue('vehicle_impounded')
        key_value_pairs['IMPOUNDED_LOT'] = getters.getAttributeValue('impound_lot_operator')
        key_value_pairs['IMPOUNDED_ADDRESS'] = getters.getAttributeValue('impound_lot_operator')
        key_value_pairs['IMPOUNDED_CITY'] = getters.getAttributeValue('impound_lot_operator')
        key_value_pairs['IMPOUNDED_PHONE_AREA_CODE'] = getters.getAttributeValue('impound_lot_operator')
        key_value_pairs['IMPOUNDED_PHONE_NUMBER'] = getters.getAttributeValue('impound_lot_operator')
        key_value_pairs['RELEASE_LOCATION_KEYS'] = getters.getAttributeValue('location_of_keys')
        key_value_pairs['RELEASE_PERSON'] = getters.getAttributeValue('vehicle_released_to')
        key_value_pairs['RELEASE_DATETIME'] = getters.getAttributeValue('datetime_released')
        
        if (form_type === "24Hour") {
            // mappings specific to 24Hour Form
            
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

    apiHeader: state => {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json')
        if (state.keycloak) {
            headers.set('Authorization', 'Basic ' + state.keycloak.token)
        }
        return headers
    },

    getKeycloakUsername: state => {
        if (state.keycloak) {
            return state.keycloak.userName;
        }
        return ''
    }

}

function _onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

