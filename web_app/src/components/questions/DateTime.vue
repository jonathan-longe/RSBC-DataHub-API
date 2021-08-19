<template>
<div v-if="visible" class="form-group" :class="fg_class">
  <validation-provider :rules="rules" :name="id" v-slot="{ errors, required }">
    <label class="small" :for="id"><slot></slot>
      <span v-if="required" class="text-danger"> *</span>
      <span class="text-muted" v-if="isValidDate"> ({{ timeAgoString }})</span>
      <span class="text-danger"> </span>
    </label>
    <div class="col-xs-10">
      <div class="input-group mb-3">
        <input type="text"
           class="form-control form-control-sm" :disabled="disabled"
               placeholder="YYYYMMDD"
           :id="id"
           :value="dateSegment"
           @input="updateDateSegment">
        <input type="text"
           class="form-control form-control-sm" :disabled="disabled"
            placeholder="HHMM"
            :value="timeSegment"
            @input="updateTimeSegment">
      </div>
      <div v-if="! isValidDate" class="small text-danger">(Invalid date or time)</div>
      <div v-if="isFutureDate" class="small text-danger">(Future dated)</div>
    </div>
  </validation-provider>
</div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";
import moment from 'moment';
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "DateTime",
  mixins: [FieldCommon],

  data() {
    return {
      timeAgoString: null,
      setIntervalID: null
    }
  },

  created () {
    this.timeAgo()
    this.setIntervalID = setInterval(this.timeAgo.bind(this) , 1000)
  },

  destroyed() {
    clearInterval(this.setIntervalID)
  },

  methods: {
    ...mapMutations(["updateFormField"]),
    setDateTime(isoDateTimeString) {
      const payload = {target: {id: this.id, value: isoDateTimeString }}
      this.$store.commit("updateFormField", payload)
    },
    timeAgo() {
      if(this.isValidDate) {
        this.timeAgoString = moment(this.getAttributeValue(this.id)).fromNow()
      }
    },
    updateTimeSegment(e) {
      const timeString = e.target.value;
      this.setDateTime(this.dateSegment + ' ' + timeString);
    },
    updateDateSegment(e) {
      const dateString = e.target.value;
      this.setDateTime(dateString + ' ' + this.timeSegment);
    }
  },

  computed: {
    ...mapGetters(["getAttributeValue"]),
    isValidDate() {
      return moment(this.getAttributeValue(this.id)).isValid()
    },
    isFutureDate() {
      return moment().diff(this.getAttributeValue(this.id), "millisecond") < 0
    },
    dateSegment() {
      return this.getAttributeValue(this.id).split(' ')[0];
    },
    timeSegment() {
      return this.getAttributeValue(this.id).split(' ')[1];
    }
  }

}
</script>
