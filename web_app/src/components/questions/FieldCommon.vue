<script>
export default {
  name: "FieldCommon",
  methods: {
    update(e) {
      const payload = {value: e.target.value, id: this.form_group.id }
      console.log('inside TextField update()')
      this.$store.commit("updateFormField", payload)
    }
  },
  data() {
    return {
      showValidation: false
    }
  },
  props: {
    prohibition_number: String,
    form_group_class: String,
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
    // fieldHasErrors() {
    //   if("errors" in this.form_group) {
    //     return this.form_group.errors.$invalid;
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
    //   if("errors" in this.form_group) {
    //     if("required" in this.form_group.errors)
    //       return true;
    //   }
    //   return false;
    // }
  }
}
</script>
