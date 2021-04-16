import { ulid } from 'ulid'
import Vue from 'vue'

export default {

    setNewFormToEdit (state, form) {
        console.log('inside setNewFormToEdit')
        const prohibition_number = ulid()
        state.currently_editing_prohibition_number = prohibition_number
        form.prohibition_number = prohibition_number;
        state.edited_prohibition_numbers.push(prohibition_number);
        Vue.set(state.edited_forms, prohibition_number, form)
        console.log("check edited_forms: " + JSON.stringify(state.edited_forms))
    },

    updateFormField (state, payload) {
        console.log("inside updateFormField: " + JSON.stringify(payload))
        const id = payload.id;
        const value = payload.value;
        const prohibition_number = state.currently_editing_prohibition_number;
        Vue.set(state.edited_forms[prohibition_number].data, id, value);
    },

    stopEditingForm (state) {
        console.log("inside stopEditingForm()")
        state.currently_editing_prohibition_number = null;
    }
}