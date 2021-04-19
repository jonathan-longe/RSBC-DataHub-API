<script>
export default {
  name: "FieldCommon",
    methods: {
    update() {
      console.log('inside TextField update()')
      this.$store.commit("updateFormField", this.payload)
    }
  },
  data() {
    return {
      payload: {
         id: this.form_group.id,
         value: this.form_group.value
      },
      errors: {}
    }
  },
  props: {
    form_group_class: String,
    form_group: {
      id: String,
      label: String,
      placeholder: String,
      input_type: {
        type: Object,
        default: function () {
          return "text"
        }
      }
    }
  }
}
</script>
