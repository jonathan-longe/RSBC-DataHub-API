<template>
<div v-if="visible" class="form-group" :class="fg_class">
  <label :for="id"><slot></slot></label>
  <vue-typeahead-bootstrap @input="typeAheadUpdate" :value="getAttributeValue(id)" :data=suggestions :disabled="disabled" />
</div>
</template>

<script>

import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import FieldCommon from "@/components/questions/FieldCommon";
import {mapGetters} from 'vuex';

export default {
  name: "TypeAheadField",
  mixins: [FieldCommon],
  props: {
    suggestions: {
      default: Array
    }
  },
  computed: {
    ...mapGetters(["getAttributeValue"]),
  },
  methods: {
    typeAheadUpdate(e) {
      const payload = {target: {value: e, id: this.id }}
      this.$store.commit("updateFormField", payload)
    }
  },
  components: {
    VueTypeaheadBootstrap
  }
}
</script>