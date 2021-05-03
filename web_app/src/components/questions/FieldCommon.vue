<script>

import { mapGetters } from 'vuex';

export default {
  name: "FieldCommon",
  methods: {
    update(e) {
      const payload = {id: this.id, value: e.target.value }
      console.log('inside FieldCommon update()', this.id, e.target.value)
      this.$store.commit("updateFormField", payload)
      this.$emit("field_updated", payload)
    }
  },
  props: {
    id: String,
    disabled: Boolean,
    show_label: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: true
    },
    fg_class: String,
    display_validation_errors: Boolean,
  },
  computed: {
    ...mapGetters(["getAttributeValue"]),
    // grey_out() {
    //   return this.disabled || "disabled" in this.form_group;
    // },
    // fieldHasErrors() {
    //   if("errors" in this.form_group && this.display_validation_errors === true) {
    //     return this.form_group.errors.$error;
    //   }
    //   return false;
    // },
    // errorClass() {
    //   if(this.fieldHasErrors) {
    //     return "alert-danger";
    //   }
    //   return ''
    // },
    // isFieldRequired() {
    //   if("validations" in this.form_group) {
    //     if("required" in this.form_group.validations)
    //       return true;
    //   }
    //   return false;
    // },
    // errorMessage() {
    //   let messageString = ''
    //   Object.keys(this.form_group.errors).forEach(error => {
    //     if(error in this.form_group.validations) {
    //       if(this.form_group.errors[error] === false) {
    //         messageString = this.form_group.validations[error].message;
    //       }
    //     }
    //
    //   })
    //   return messageString;
    // },
    bcCityNames() {
      return this.$store.getters.getArrayOfBCCityNames;
    },
    commonCarColors() {
      return this.$store.getters.getArrayOfCommonCarColors;
    },
    impoundLotOperators() {
      return ["Busters Towing - Vancouver", "Roadway Towing - Delta"]
    }
  }
}
</script>
