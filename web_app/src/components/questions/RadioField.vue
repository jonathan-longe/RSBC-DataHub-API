<template>
<div v-if="visible" class="form-group" :class="fg_class">
    <label v-if="show_label" class="small" :for="id"><slot></slot>
<!--      <span v-if="required" class="text-danger"> *</span>-->
    </label>
    <div class="form-check" v-for="(option) in options" :key="option">
      <input class="form-check-input"
             :id="id"
             @input="updateFormField"
             :checked="getAttributeValue(id) === option"
             type="radio" :value="option" :name="id" :disabled="disabled">
      <label class="form-check-label" :for="option">{{ option }}</label>
    </div>
</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";
import {mapMutations, mapGetters} from 'vuex';

export default {
  name: "RadioField",
  mixins: [FieldCommon],
  props: {
    type: String(),
    options: null
  },
  methods: {
    ...mapMutations(["updateFormField"])
  },
  computed: {
    ...mapGetters(["getAttributeValue"])
  }
}
</script>
