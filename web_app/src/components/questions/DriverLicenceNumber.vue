<template>
  <div v-if="visible" class="form-group">
    <validation-provider :rules="rules" :name="id" v-slot="{ errors, required }">
      <label v-if="show_label" class="small" :for="id"><slot></slot>
        <span v-if="required" class="text-danger"> *</span>
      </label>
      <div class="input-group mb-3">
        <input :disabled="disabled" type=text
             class="form-control form-control-sm"
             :id="id"
             placeholder="Driver's Licence Number"
             :value="getAttributeValue(id)"
             @input="updateFormField">
        <div class="input-group-append" v-if="isLicenceJurisdictionBC">
          <button :disabled="disabled" @click="triggerDriversLookup"
                  class="btn-sm btn-primary text-white">Driver's Lookup
            <b-spinner v-if="display_spinner" small label="Loading..."></b-spinner>
          </button>
        </div>
      </div>
      <div class="small text-danger">{{ errors[0] }}</div>
    </validation-provider>
  </div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  name: "DriversLicenceNumber",
  mixins: [FieldCommon],
  data() {
    return {
      display_spinner: false
    }
  },
  computed: {
    icbcPayload() {
      return {
        "dlNumber": this.getAttributeValue(this.id),
        "formIndex": this.getCurrentlyEditedProhibitionIndex
      }
    },
    ...mapGetters(['getCurrentlyEditedProhibitionIndex', "getAttributeValue", "isLicenceJurisdictionBC"]),
  },
  methods: {
    ...mapMutations(['updateFormField']),
    ...mapActions(['populateDriversFromICBC']),
    triggerDriversLookup() {
      console.log("inside triggerDriversLookup()")
      this.display_spinner = true;
      this.populateDriversFromICBC(this.icbcPayload)
          .then( response => {
            console.log('response', response)
            this.display_spinner = false
          })
          .catch( error => {
            console.log("error", error)
            this.display_spinner = false
          })
    }
  }
}
</script>

<style scoped>

</style>