export default {
    getAllForms: state => {
      return state.form_config.forms;
    },
    isFormSelected: state => {
        return state.selected_form !== null
    },
    getSelectedFormComponent: state => {
        if (state.selected_form == null) {
            return null;
        }
        if ("component" in state.selected_form) {
            return state.selected_form.component;
        }
        return null;
    },
    getSelectedForm: state => {
        if (state.selected_form == null) {
            return null;
        }
        return state.selected_form;

    }

}