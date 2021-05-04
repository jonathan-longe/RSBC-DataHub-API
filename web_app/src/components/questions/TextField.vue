<template>
<div v-if="visible" class="form-group" :class="fg_class">
  <validation-provider :rules="rules" :name="id" v-slot="{ errors, required }">
    <label v-if="show_label" class="small" :for="id"><slot></slot>
      <span v-if="required" class="text-danger"> *</span>
    </label>
    <input :type="input_type"
         class="form-control form-control-sm"
         :id="id"
         :disabled="disabled"
         :placeholder="placeholder"
         :value="getAttributeValue(id)"
          @input="update">
    <div class="small text-danger">{{ errors[0] }}</div>
  </validation-provider>
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
