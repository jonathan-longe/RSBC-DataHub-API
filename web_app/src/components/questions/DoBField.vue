<template>
<div class="form-group" :class="fg_class">
  <label v-if="show_label" class="small" :for="id">
    Date of Birth
    <span v-if="true" class="text-danger">*</span>
    <span class="text-muted" v-if="isValidDate"> ({{ yearsOld }} yrs)</span>
  </label>
  <div class="col-xs-10">
    <input type="text"
         :id="id"
         class="form-control form-control-sm"
         placeholder="YYYY-MM-DD"
         :value="getAttributeValue(id)"
          @input="update">
    <div v-if="false" class="small text-danger">[some error message]</div>
  </div>

</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: "DoBField",
  mixins: [FieldCommon],

  computed: {
    ...mapGetters(["getAttributeValue"]),
    yearsOld() {
      return moment().diff(moment(this.getAttributeValue(this.id)), 'years')
    },
    yearsAgo() {
      return moment(this.getAttributeValue(this.id)).fromNow()
    },
    isValidDate() {
      return moment(this.getAttributeValue(this.id)).isValid()
    },
    debug2() {
      return this.getAttributeValue(this.id);
    }
  }

}
</script>
