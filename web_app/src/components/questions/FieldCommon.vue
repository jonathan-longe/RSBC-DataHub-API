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
    rules: Object(),
    errors: Array()
  },
  computed: {
    ...mapGetters(["getAttributeValue"]),
  }
}
</script>
