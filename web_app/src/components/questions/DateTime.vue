<template>
<div v-if="visible" class="form-group" :class="fg_class">
  <validation-provider :rules="rules" :name="id" v-slot="{ errors, required }">
    <label class="small" :for="id"><slot></slot>
      <span v-if="required" class="text-danger"> *</span>
      <span class="text-muted" v-if="!!timeAgoString"> ({{ timeAgoString }})</span>
    </label>
    <div class="col-xs-10">
      <div class="input-group mb-3">
        <input type="text"
           class="form-control form-control-sm" :disabled="disabled"
           :id="id"
           :value="getAttributeValue(id)"
           @input="update">
        <div class="input-group-append">
          <button @click="setCurrentDateTime" class="btn btn-sm btn-secondary" type="button">Now</button>
        </div>
      </div>
      <div class="small text-danger">{{ errors[0] }}</div>
    </div>
  </validation-provider>
</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";
import moment from 'moment';
import {mapGetters} from "vuex";

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
      const payload = {id: this.id, value: this.getCurrentTime() }
      console.log('inside FieldCommon update()')
      this.$store.commit("updateFormField", payload)
      this.$emit("field_updated", payload)
    },
    timeAgo() {
      if(this.isValidDate) {
        this.timeAgoString = moment(this.getAttributeValue(this.id)).fromNow()
      }
    },
    getCurrentTime() {
      return moment().format("YYYY-MM-DD HH:mm")
    }
  },

  computed: {
    ...mapGetters(["getAttributeValue"]),
  }

}
</script>
