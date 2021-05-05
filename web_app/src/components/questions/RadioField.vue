<template>
<div v-if="visible" class="form-group" :class="fg_class">
    <label class="small" :for="id"><slot></slot>
<!--      <span v-if="required" class="text-danger"> *</span>-->
    </label>
    <div class="form-check small" v-for="(option) in options" :key="option">
      <input class="form-check-input" @input="update" :type="type" :value="option" :name="id" :disabled="disabled">
      <label class="form-check-label" :for="option">{{ option }}</label>
    </div>
<!--    <div class="small text-danger">{{ errors[0] }}</div>-->
</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";

export default {
  name: "RadioField",
  mixins: [FieldCommon],
  props: {
    type: String(),
    options: null
  }
}
</script>
