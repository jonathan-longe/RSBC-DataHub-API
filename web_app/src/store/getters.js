import * as Validators from "vuelidate/lib/validators";

export default {

    getAllAvailableForms: state => {
      return state.form_schemas.forms;
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
    },

    getValidationRules: state => form_schema => {
        console.log("inside getValidationRules(): ", state )
        let deliverables = Object.keys(form_schema).reduce((rules, elementName) => {
            const item = form_schema[elementName]
            if (! Object.prototype.hasOwnProperty.call(item,'validations')) return rules

            console.log(" - item has validations:", item)
            const validations = {}
            for (let rule in item.validations) {
                const params = item.validations[rule].params

                if (params) {
                    validations[rule] = Validators[rule](params)
                } else {
                    validations[rule] = Validators[rule]
                }
            }
            if (typeof rules[elementName] === "undefined") {
                rules[elementName] = Object();
            }
            rules[elementName]["value"] = validations
            return rules
        }, {})
        console.log("validation rules: ", {data: deliverables})
        return {data: deliverables}
    }



}