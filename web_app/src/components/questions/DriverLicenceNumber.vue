<template>
  <div>
    <p class="small pb-0 mb-2">Driver's Licence Number</p>
    <div class="form-row">
      <div class="form-group">
        <label class="sr-only small" :for="form_group.id">Driver's Licence Number</label>
        <input type=text
             class="form-control form-control-sm"
             :id="form_group.id"
             placeholder="Driver's Licence Number"
             v-model="form_group.value">
      </div>
      <div class="form-group ml-1">
        <button @click="icbcLookupDriver" class="btn-sm" :class="icbcLookupButtonClass">ICBC Lookup</button>
      </div>
    </div>
  </div>

</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";

export default {
  name: "DriversLicenceNumber",
  mixins: [FieldCommon],
  computed: {
    isNumberTheCorrectLength() {
      return this.form_group.value.length === 7
    },
    icbcLookupButtonClass() {
      if (this.isNumberTheCorrectLength) {
        return " btn-primary text-white "
      } else {
        return " btn-secondary text-muted "
      }
    }
  },
  methods: {
    icbcLookupDriver() {
      // TODO - call out to ICBC instead of returning static data from demo purposes
      console.log("inside icbcLookupDriver(): ")
      if(this.isNumberTheCorrectLength) {
        this.$store.commit("populateDriversFromICBC", this.prohibition_number)
      }

    }
  }
}
</script>

<style scoped>

</style>