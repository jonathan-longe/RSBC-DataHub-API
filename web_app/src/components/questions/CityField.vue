<template>
<div class="form-group" :class="form_group_class">
  <label class="small" :for="form_group.id">{{ form_group.label }}</label>
  <vue-typeahead-bootstrap @input="cityUpdate" v-model="form_group.value" size="sm" :data=suggestions />
</div>
</template>

<script>

import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import FieldCommon from "@/components/questions/FieldCommon";

export default {
  name: "CityField",
  mixins: [FieldCommon],
  data() {
    return {
      query: ''
    }
  },
  methods: {
    cityUpdate() {
      const payload = {value: this.form_group.value, id: this.form_group.id }
      console.log('inside CityField cityUpdate(): ' + JSON.stringify(payload))
      this.$store.commit("updateFormField", payload)
    }
  },
  components: {
    VueTypeaheadBootstrap
  },
  computed: {
    suggestions() {
      return this.$store.getters.getArrayOfBCCityNames.city_names;
    }
  }
}
</script>