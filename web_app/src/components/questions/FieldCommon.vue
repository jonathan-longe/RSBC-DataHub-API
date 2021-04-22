<script>
export default {
  name: "FieldCommon",
  methods: {
    update(e) {
      const payload = {value: e.target.value, id: this.form_group.id }
      console.log('inside FieldCommon update()')
      this.$store.commit("updateFormField", payload)
      this.$emit("field_updated", payload)
    }
  },
  props: {
    prohibition_number: String,
    form_group_class: String,
    display_validation_errors: Boolean,
    form_group: {
      id: String,
      errors: {},
      label: String,
      placeholder: String,
      input_type: {
        type: Object,
        default: function () {
          return "text"
        }
      }
    }
  },
  computed: {
    fieldHasErrors() {
      if("errors" in this.form_group && this.display_validation_errors === true) {
        return this.form_group.errors.$error;
      }
      return false;
    },
    errorClass() {
      if(this.fieldHasErrors) {
        return "alert-danger";
      }
      return ''
    },
    isFieldRequired() {
      if("validations" in this.form_group) {
        if("required" in this.form_group.validations)
          return true;
      }
      return false;
    },
    errorMessage() {
      let messageString = ''
      Object.keys(this.form_group.errors).forEach(error => {
        if(error in this.form_group.validations) {
          if(this.form_group.errors[error] === false) {
            messageString = this.form_group.validations[error].message;
          }
        }

      })
      return messageString;
    }
  }
}
</script>
