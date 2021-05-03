<template>
<div v-if="visible" class="form-group" :class="fg_class">
  <label class="small" :for="id"><slot></slot></label>
  <vue-typeahead-bootstrap @input="update" :value="getAttributeValue(id)" size="sm" :data=suggestions :disabled="disabled" />
</div>
</template>

<script>

import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import FieldCommon from "@/components/questions/FieldCommon";

export default {
  name: "TypeAheadField",
  mixins: [FieldCommon],
  props: {
    suggestions: null
  },
  methods: {
    typeAheadUpdate() {
      const payload = {value: this.form_group.value, id: this.form_group.id }
      console.log('inside TypeAheadField typeAheadUpdate(): ' + JSON.stringify(payload))
      this.$store.commit("updateFormField", payload)
    }
  },
  components: {
    VueTypeaheadBootstrap
  }
}
</script>