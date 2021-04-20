<script>
export default {
  name: "FieldCommon",
  methods: {
    update(e) {
      const payload = {value: e.target.value, id: this.form_group.id }
      console.log('inside TextField update(): ' + JSON.stringify(payload))
      this.$store.commit("updateFormField", payload)
    }
  },
  props: {
    prohibition_number: String,
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
