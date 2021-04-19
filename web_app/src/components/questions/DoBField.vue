<template>
<div class="form-group" :class="form_group_class">
  <label class="small" :for="form_group.id">
    Date of Birth
    <span class="text-muted" v-if="isValidDate"> ({{ yearsOld}} years)</span>
  </label>
  <div class="col-xs-10">
    <input :type="form_group.input_type"
         class="form-control form-control-sm"
         :id="form_group.id"
         :placeholder="form_group.placeholder"
          v-model.trim="payload.value"
          @change="update">
<!--    <span class="text-danger small" v-text="yearsOld"></span>-->
  </div>

</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";
import moment from 'moment';

export default {
  name: "TextField",
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
