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

    getCurrentFormData: state => {
        let form_object = state.currently_editing_form_object;
        return state.forms[form_object.form_type][form_object.form_id].data;
    },

    getXFDF: (state, getters) => (pdf_template_filepath, form_object, document_type) => {
        let key_value_pairs = getters.getXfdfMappings(form_object, document_type);
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

    getXfdfMappings: (state, getters) => (form_object, document_type) => {
        let key_value_pairs = Array();

        key_value_pairs['VIOLATION_NUMBER'] = form_object.form_id.substring(3)

        key_value_pairs['REASON_ALCOHOL'] = getters.getXfdfRadioValue(form_object,'prohibition_type', 'Alcohol 215(2)')
        key_value_pairs['REASON_DRUGS'] = getters.getXfdfRadioValue(form_object,'prohibition_type', 'Drugs 215(3)')

        let prohibition_start_time = moment(getters.getXfdfValue(form_object,'prohibition_start_time'))
        key_value_pairs['NOTICE_TIME'] = prohibition_start_time.format("HH:mm")
        key_value_pairs['NOTICE_DAY'] = prohibition_start_time.format("Do")
        key_value_pairs['NOTICE_MONTH'] = prohibition_start_time.format("MMMM")
        key_value_pairs['NOTICE_YEAR'] = prohibition_start_time.format("YYYY")

        key_value_pairs['DL_SURRENDER_LOCATION'] = getters.getXfdfValue(form_object,'offence_city')
        key_value_pairs['OFFICER_BADGE_NUMBER'] = getters.getXfdfValue(form_object,'badge_number')
        key_value_pairs['AGENCY_NAME'] = getters.getXfdfValue(form_object,'agency')
        key_value_pairs['AGENCY_FILE_NUMBER'] = getters.getXfdfValue(form_object,'file_number')

        key_value_pairs['OWNER_SURNAME'] = getters.getXfdfValue(form_object,'owners_last_name')
        key_value_pairs['OWNER_GIVEN'] = getters.getXfdfValue(form_object,'owners_first_name')
        key_value_pairs['OWNER_ADDRESS'] = getters.getXfdfValue(form_object,'owners_address1')
        key_value_pairs['OWNER_CITY'] = getters.getXfdfValue(form_object,'owners_city')
        key_value_pairs['OWNER_PROVINCE'] = getters.getXfdfValue(form_object,'owners_province')
        key_value_pairs['OWNER_POSTAL_CODE'] = getters.getXfdfValue(form_object,'owners_postal')
        key_value_pairs['OWNER_PHONE_AREA_CODE'] = getters.getXfdfValue(form_object,'owners_phone').substr(0,3)

        let phone_number = getters.getXfdfValue(form_object,'owners_phone')
        key_value_pairs['OWNER_PHONE_NUMBER'] = phone_number.substr(3,3 ) + '-' + phone_number.substr(6,9)

        key_value_pairs['VEHICLE_LICENSE_NUMBER'] = getters.getXfdfValue(form_object,'plate_number')
        key_value_pairs['VEHICLE_PROVINCE'] = getters.getXfdfValue(form_object,'plate_province')
        key_value_pairs['VEHICLE_LICENSE_YEAR'] = getters.getXfdfValue(form_object,'plate_year')
        key_value_pairs['VEHICLE_TAG_NUMBER'] = getters.getXfdfValue(form_object,'plate_val_tag')
        key_value_pairs['VEHICLE_REGISTRATION_NUMBER'] = getters.getXfdfValue(form_object,'registration_number')
        key_value_pairs['VEHICLE_TYPE'] = getters.getXfdfValue(form_object,'vehicle_type')
        key_value_pairs['VEHICLE_MAKE'] = getters.getXfdfValue(form_object,'vehicle_make')
        key_value_pairs['VEHICLE_MODEL'] = getters.getXfdfValue(form_object,'vehicle_model')
        key_value_pairs['VEHICLE_YEAR'] = getters.getXfdfValue(form_object,'vehicle_year')
        key_value_pairs['VEHICLE_COLOUR'] = getters.getXfdfValue(form_object,'vehicle_color')
        key_value_pairs['VEHICLE_NSC_PUJ'] = getters.getXfdfValue(form_object,'puj_code')
        key_value_pairs['VEHICLE_NSC_NUMBER'] = getters.getXfdfValue(form_object,'nsc_number')
        key_value_pairs['VEHICLE_VIN'] = getters.getXfdfValue(form_object,'vin_number')

        key_value_pairs['NOT_IMPOUNDED'] = getters.getXfdfRadioValue(form_object,'vehicle_impounded', 'No')
        key_value_pairs['IMPOUNDED'] = getters.getXfdfRadioValue(form_object,'vehicle_impounded', 'Yes')

        // TODO - don't print the following if the vehicle is impounded
        key_value_pairs['NOT_IMPOUNDED_REASON'] = getters.getXfdfValue(form_object,'reason_for_not_impounding')

        let ilo = getters.getXfdfValue(form_object,'impound_lot_operator').split(", ")
        key_value_pairs['IMPOUNDED_LOT'] = ilo[0]
        key_value_pairs['IMPOUNDED_ADDRESS'] = ilo[1]
        key_value_pairs['IMPOUNDED_CITY'] = ilo[2]
        key_value_pairs['IMPOUNDED_PHONE_AREA_CODE'] = ilo[3].substr(0,3)
        key_value_pairs['IMPOUNDED_PHONE_NUMBER'] = ilo[3].substr(4)

        key_value_pairs['RELEASE_LOCATION_KEYS'] = getters.getXfdfValue(form_object,'location_of_keys')
        key_value_pairs['RELEASE_PERSON'] = getters.getXfdfValue(form_object,'vehicle_released_to')


        if (document_type === 'ilo') {
            key_value_pairs['DRIVER_SURNAME'] = getters.getXfdfRedactedValue
            key_value_pairs['DRIVER_GIVEN'] = getters.getXfdfRedactedValue
            key_value_pairs['DRIVER_DL_NUMBER'] = getters.getXfdfRedactedValue
            key_value_pairs['DRIVER_DL_PROVINCE'] = getters.getXfdfRedactedValue

            key_value_pairs['DRIVER_DOB_YYYY'] = getters.getXfdfRedactedValue
            key_value_pairs['DRIVER_DOB_MM'] = getters.getXfdfRedactedValue
            key_value_pairs['DRIVER_DOB_DD'] = getters.getXfdfRedactedValue

            key_value_pairs['DRIVER_ADDRESS'] = getters.getXfdfRedactedValue
            key_value_pairs['DRIVER_CITY'] = getters.getXfdfRedactedValue
            key_value_pairs['DRIVER_PROVINCE'] = getters.getXfdfRedactedValue
            key_value_pairs['DRIVER_POSTAL_CODE'] = getters.getXfdfRedactedValue
        }

        if (document_type === 'notice') {
            key_value_pairs['DRIVER_SURNAME'] = getters.getXfdfValue(form_object,"last_name")
            key_value_pairs['DRIVER_GIVEN'] = getters.getXfdfValue(form_object,'first_name')
            key_value_pairs['DRIVER_DL_NUMBER'] = getters.getXfdfValue(form_object,'drivers_number')
            key_value_pairs['DRIVER_DL_PROVINCE'] = getters.getXfdfValue(form_object,'drivers_licence_jurisdiction')

            let dob = moment(getters.getXfdfValue(form_object,'dob'))
            key_value_pairs['DRIVER_DOB_YYYY'] = dob.format("YYYY")
            key_value_pairs['DRIVER_DOB_MM'] = dob.format("MM")
            key_value_pairs['DRIVER_DOB_DD'] = dob.format("DD")

            key_value_pairs['DRIVER_ADDRESS'] = getters.getXfdfValue(form_object,'address1')
            key_value_pairs['DRIVER_CITY'] = getters.getXfdfValue(form_object,'city')
            key_value_pairs['DRIVER_PROVINCE'] = getters.getXfdfValue(form_object,'province')
            key_value_pairs['DRIVER_POSTAL_CODE'] = getters.getXfdfValue(form_object,'postal')
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
    },

    getXfdfValue: state => (form_object, attribute) => {
        let root = state.forms[form_object.form_type][form_object.form_id].data;
        if (!(attribute in root)) {
            return '';
        }
        return root[attribute];
    },

    getXfdfRadioValue: state => (form_object, attribute, checked_value) => {
        let root = state.forms[form_object.form_type][form_object.form_id].data;
        if (!(attribute in root)) {
            return '';
        }
        if (root[attribute] === checked_value) {
            return "Yes";
        }
        return "";
    },

    getXfdfListValues: state => (form_object, attribute) => {
        let root = state.forms[form_object.form_type][form_object.form_id].data;
        if (!(attribute in root)) {
            return '';
        }
        return root[attribute].join(" ")
    },

    getXfdfRedactedValue: () => {
        return "--";
    },

}

function _onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

