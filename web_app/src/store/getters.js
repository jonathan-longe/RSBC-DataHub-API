export default {
    getAllForms: state => {
      return state.form_config.forms;
    },
    getCurrentForm: state => {
        return state.selected_form;
    },
    isFormSelected: state => {
        return state.selected_form !== null
    }

}