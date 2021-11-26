<template>
<div v-if="visible" class="form-group" :class="fg_class">
    <label v-if="show_label" :for="id"><slot></slot></label>
    <div class="form-check" v-for="(option, index) in options" :key="index">
      <input class="form-check-input"
             v-model="attribute"
             type="checkbox"
             :name="id + index"
             :disabled="disabled"
             v-bind:id="option.id"
             v-bind:value="option.label"
      >
      <label class="form-check-label" :for="id + index" v-html="option.label"></label>
    </div>
<!--    <div class="small text-danger">{{ errors[0] }}</div>-->
</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: "RichCheckField",
  mixins: [FieldCommon],
  props: {
    type: String(),
    options: null
  },
  methods: {
    ...mapMutations(["updateCheckBox", "updateRichCheckBox"])
  },
  computed: {
    ...mapGetters(["checkBoxStatus", "getAttributeValue"]),
    attribute: {
      get() {
        return this.getAttributeValue(this.id)
      },
      set(value) {
        console.log("value -- ", value)
        return this.updateRichCheckBox(value)
      }
    },
  }
}
</script>
