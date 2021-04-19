<template>
<div class="form-group" :class="form_group_class">
  <label class="small" :for="form_group.id">{{ form_group.label }}</label>
  <vue-bootstrap-typeahead v-model="query" size="sm" :data=suggestions />
</div>
</template>

<script>

import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import FieldCommon from "@/components/questions/FieldCommon";

export default {
  name: "CityField",
  mixins: [FieldCommon],
  data() {
    return {
      query: ''
    }
  },
  components: {
    VueBootstrapTypeahead
  },
  computed: {
    suggestions() {
      return this.$store.getters.getArrayOfBCCityNames.city_names;
    }
  }
}
</script>