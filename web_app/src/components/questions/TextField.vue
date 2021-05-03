<template>
<div v-if="visible" class="form-group" :class="fg_class">
  <label v-if="show_label" class="small" :for="id"><slot></slot>
    <span class="text-danger">*</span>
  </label>
  <input :type="input_type"
         class="form-control form-control-sm"
         :id="id"
         :disabled="disabled"
         :placeholder="placeholder"
         :value="getAttributeValue(id)"
          @input="update">
  <div v-if="false" class="small text-danger">[add error here]</div>
</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";

export default {
  name: "TextField",
  mixins: [FieldCommon],
  props: {
    placeholder: String,
    input_type: {
        type: String,
        default: "text"
      }
  }
}
</script>
