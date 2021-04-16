<template>
<div class="form-group" :class="form_group_class">
  <label class="small" :for="form_group.id">{{ form_group.label }}</label>
  <vue-bootstrap-typeahead v-model="query" size="sm" :data=suggestions />
</div>
</template>

<script>

import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'


export default {
  name: "CityField",
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
  },
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

<style scoped>

</style>