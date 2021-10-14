<template>
<div v-if="visible" class="form-group" :class="fg_class">
  <validation-provider :rules="rules" :name="id" v-slot="{ errors }">
    <label v-if="show_label" :for="id"><slot></slot>
      <span v-if="isShowOptional" class="text-muted"> (optional)</span>
    </label>
    <input type="text"
         class="form-control"
         :id="id"
         :disabled="disabled"
         :placeholder="placeholder"
         :value="getAttributeValue(id)"
          @input="updateFormField">
    <div class="small text-danger">{{ errors[0] }}</div>
  </validation-provider>
</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";
import {mapGetters, mapMutations} from "vuex";


export default {
  name: "TextField",
  mixins: [FieldCommon],
  props: {
    placeholder: String,
  },
  computed: {
    ...mapGetters(["getAttributeValue"]),
    isShowOptional() {
      if(this.rules) {
        return ! this.rules.includes('required')
      }
      return true
    }
  },
  methods: {
    ...mapMutations(["updateFormField"])
  }
}
</script>
