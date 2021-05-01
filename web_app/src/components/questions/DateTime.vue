<template>
<div v-if="visible" class="form-group" :class="form_group_class">
  <label class="small" :for="form_group.id">
    {{ form_group.label }}
    <span v-if="isFieldRequired" class="text-danger">*</span>
    <span class="text-muted" v-if="!!timeAgoString"> ({{ timeAgoString }})</span>
  </label>
  <div class="col-xs-10">
    <div class="input-group mb-3">
      <input :type="form_group.input_type"
         class="form-control form-control-sm" :class="errorClass" :disabled="grey_out"
         :id="form_group.id"
         :value="form_group.value"
         @input="update">
      <div class="input-group-append">
        <button @click="setCurrentDateTime" class="btn btn-sm btn-secondary" :disabled="grey_out" type="button">Now</button>
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

  data() {
    return {
      timeAgoString: null
    }
  },

  mounted () {
    this.timeAgo()
    setInterval(this.timeAgo.bind(this) , 1000)
  },

  methods: {
    setCurrentDateTime() {
      const payload = {id: this.form_group.id, value: this.getCurrentTime() }
      console.log('inside FieldCommon update()')
      this.$store.commit("updateFormField", payload)
      this.$emit("field_updated", payload)
    },
    timeAgo() {
      if(this.isValidDate) {
        this.timeAgoString = moment(this.form_group.value).fromNow()
      }
    },
    getCurrentTime() {
      return moment().format("YYYY-MM-DD HH:mm")
    }
  },

  computed: {
    isValidDate() {
      return moment(this.form_group.value).isValid()
    }
  }

}
</script>
