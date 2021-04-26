<template>
<div class="form-group" :class="form_group_class">
  <label class="small" :for="form_group.id">
    {{ form_group.label }}
    <span v-if="isFieldRequired" class="text-danger">*</span>
    <span class="text-muted" v-if="isValidDate"> ({{ timeAgo }})</span>
  </label>
  <div class="col-xs-10">
    <div class="input-group mb-3">
      <input :type="form_group.input_type"
         class="form-control form-control-sm" :class="errorClass"
         :id="form_group.id"
         :placeholder="currentTime"
          :value="form_group.value"
          @input="update">
      <div class="input-group-append">
        <button @click="setCurrentDateTime" class="btn btn-sm btn-secondary" type="button">Now</button>
      </div>
    </div>

    <div v-if="fieldHasErrors" class="small text-danger">{{ errorMessage }}</div>
  </div>

</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";
import moment from 'moment';

export default {
  name: "DateTime",
  mixins: [FieldCommon],

  methods: {
    setCurrentDateTime() {
      const payload = {id: this.form_group.id, value: this.currentTime }
      console.log('inside FieldCommon update()')
      this.$store.commit("updateFormField", payload)
      this.$emit("field_updated", payload)
    }
  },

  computed: {
    currentTime() {
      return moment().format("YYYY-MM-DD HH:mm")
    },
    timeAgo() {
      return moment(this.form_group.value).fromNow()
    },
    isValidDate() {
      return moment(this.form_group.value).isValid()
    }
  }

}
</script>
