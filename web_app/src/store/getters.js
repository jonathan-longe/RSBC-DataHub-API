export default {

    getAllAvailableForms: state => {
      return state.form_config.forms;
    },

    getAllEditedProhibitionNumbers: state => {
        return state.edited_prohibition_numbers;
    },

    isFormBeingEdited: state => {
        return state.currently_editing_prohibition_number !== null
    },

    getSelectedFormComponent: state => {
        const prohibition_number = state.currently_editing_prohibition_number;
        if (prohibition_number == null) {
            return null;
        }
        console.log("check edited_forms: " + JSON.stringify(state.edited_forms))
        return state.edited_forms[prohibition_number].component;
    },

    getCurrentlyEditedForm: state => {
        console.log('inside getCurrentlyEditedForm')
        const prohibition_number = state.currently_editing_prohibition_number;
        if (prohibition_number == null) {
            return null;
        }
        return state.edited_forms[prohibition_number];
    },

    getArrayOfBCCityNames: state => {
        return state.bc_city_names;
    },

    isRecentProhibitions: state => {
        return state.edited_prohibition_numbers.length > 0;
    },

    getSpecificForm: state => prohibition_number => {
        return state.edited_forms[prohibition_number];
    },

    isNetworkOnline: state => {
        return state.isOnline;
    }



}