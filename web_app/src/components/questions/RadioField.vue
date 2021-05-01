<template>
<div v-if="visible" class="form-group" :class="form_group_class">
  <label class="small" :for="form_group.id">{{ form_group.label }}
    <span v-if="isFieldRequired" class="text-danger">*</span>
  </label>
  <div class="form-check small" v-for="option in form_group.options" :key="option">
    <input @input="update" class="form-check-input" :type="form_group.type" :value="option" :name="form_group.id" :disabled="grey_out">
    <label class="form-check-label" :for="forName(form_group.id,option)">{{ option }}</label>
  </div>
  <div v-if="fieldHasErrors" class="small text-danger">{{ errorMessage }}</div>
</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";

export default {
  name: "RadioField",
  mixins: [FieldCommon],
  methods: {
    forName(id, value) {
      const htmlSafeValue = String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return id + "_" + htmlSafeValue;
    }
  }

}
</script>
