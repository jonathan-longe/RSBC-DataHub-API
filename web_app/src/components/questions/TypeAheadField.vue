<template>
<div v-if="visible" class="form-group" :class="form_group_class">
  <label class="small" :for="form_group.id">{{ form_group.label }}</label>
  <vue-typeahead-bootstrap @input="typeAheadUpdate" v-model="form_group.value" size="sm" :data=dynamic_suggestions :disabled="grey_out" />
</div>
</template>

<script>

import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import FieldCommon from "@/components/questions/FieldCommon";

export default {
  name: "CityField",
  mixins: [FieldCommon],
  methods: {
    typeAheadUpdate() {
      const payload = {value: this.form_group.value, id: this.form_group.id }
      console.log('inside TypeAheadField typeAheadUpdate(): ' + JSON.stringify(payload))
      this.$store.commit("updateFormField", payload)
    }
  },
  components: {
    VueTypeaheadBootstrap
  },
  computed: {
    dynamic_suggestions() {
      return this[this.form_group.suggestions];
    }
  }
}
</script>