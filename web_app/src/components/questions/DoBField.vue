<template>
<div class="form-group" :class="form_group_class">
  <label class="small" :for="form_group.id">
    Date of Birth
    <span v-if="isFieldRequired" class="text-danger">*</span>
    <span class="text-muted" v-if="isValidDate"> ({{ yearsOld}} yrs)</span>
  </label>
  <div class="col-xs-10">
    <input :type="form_group.input_type"
         class="form-control form-control-sm"
           :class="errorClass"
         :id="form_group.id"
         :placeholder="form_group.placeholder"
          :value="form_group.value"
          @input="update">
    <div v-if="fieldHasErrors" class="small text-danger">{{ errorMessage }}</div>
  </div>

</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";
import moment from 'moment';

export default {
  name: "DoBField",
  mixins: [FieldCommon],

  computed: {
    yearsOld() {
      return moment().diff(moment(this.form_group.value), 'years')
    },
    yearsAgo() {
      return moment(this.form_group.value).fromNow()
    },
    isValidDate() {
      return moment(this.form_group.value).isValid()
    }
  }

}
</script>
