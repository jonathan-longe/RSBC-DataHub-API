import moment from "moment";

export default {

    getAllAvailableForms: state => {
      return state.form_schemas.forms;
    },

    getUniqueIdsRetrievedDate: state => {
      return state.unique_ids.retrieved_date;
    },

    getUniqueIdsByType: state => type => {
        return  state.unique_ids.ids[type];
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
        return state.bc_city_names.city_names;
    },

    getArrayOfCommonCarColors: state => {
        return state.car_colors.car_colors;
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

    getXdfFileName: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        let file_extension = ".xdp"
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

    getArrayOfProvinces: state => {
        return state.provinces;
    },

    isPlateJurisdictionBC: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        let root = state.edited_forms[prohibition_index].data;
        return root['plate_province'] === "BC"
    },

    isLicenceJurisdictionBC: state => {
        let prohibition_index = state.currently_editing_prohibition_index
        let root = state.edited_forms[prohibition_index].data;
        return root['drivers_licence_jurisdiction'] === "BC"
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

    getXFDF: state => {
        let prohibition_index = state.currently_editing_prohibition_index;
        let root = state.edited_forms[prohibition_index].data
        return root['xfdf']
    },

    areNewUniqueIdsRequired: state => {
        console.log("inside areNewUniqueIdsRequired()")
        return state.unique_ids.retrieved_date == null ||
            moment().diff(state.unique_ids.retrieved_date, 'minute') > 24;
    },

    getNextAvailableUniqueId: state => type => {
        console.log("inside getNextAvailableUniqueId()")
        for (let [idx, record] of state.unique_ids.ids[type].entries()) {
            console.log("record", record)
            if (moment().diff(record.lease_expiry, "days") < 0) {
                console.log("inside loop", record, idx)
                return {
                    "id": record.id,
                    "type": type,
                    "idx": idx
                }
            }
            return {}
        }
    }

}

