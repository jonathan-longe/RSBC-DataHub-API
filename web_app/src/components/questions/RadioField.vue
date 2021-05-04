<template>
<div v-if="visible" class="form-group" :class="fg_class">
  <validation-provider :rules="rules" :name="id" v-slot="{ errors, required }">
    <label class="small" :for="id"><slot></slot>
      <span v-if="required" class="text-danger"> *</span>
    </label>
    <div class="form-check small" v-for="(option, key) in options" :key="key">
      <input @input="update" class="form-check-input" :type="type" :value="option" :name="id" :disabled="disabled">
      <label class="form-check-label" :for="id + '_' + key">{{ option }}</label>
    </div>
    <div class="small text-danger">{{ errors[0] }}</div>
  </validation-provider>
</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";

export default {
  name: "RadioField",
  mixins: [FieldCommon],
  props: {
    type: String(),
    options: Array()
  }
}
</script>
