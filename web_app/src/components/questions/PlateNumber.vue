<template>
  <div v-if="visible" class="form-group" :class="fg_class">
    <validation-provider :rules="rules" :name="id" v-slot="{ errors, required }">
      <label v-if="show_label" class="small" :for="id"><slot></slot>
        <span v-if="required" class="text-danger"> *</span>
      </label>
      <div class="input-group mb-3">
        <input type=text
             class="form-control form-control-sm"
             :id="id"
             placeholder="Plate"
             :value="getAttributeValue(id)"
             @input="updateFormField">
        <div class="input-group-append" v-if="isPlateJurisdictionBC">
          <button @click="populateFromICBCPlateLookup(icbcPayload)" class="btn-sm btn-primary">ICBC Lookup</button>
        </div>
        <div class="small text-danger">{{ errors[0] }}</div>
      </div>
    </validation-provider>
  </div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";
import {mapGetters, mapMutations, mapActions} from "vuex";

export default {
  name: "PlateNumber",
  mixins: [FieldCommon],
  computed: {
    ...mapGetters(["getAttributeValue", "isPlateJurisdictionBC", "getCurrentlyEditedProhibitionIndex"]),
    icbcPayload() {
      return {
        "plateNumber": this.getAttributeValue(this.id),
        "formIndex": this.getCurrentlyEditedProhibitionIndex
      }
    },
  },
  methods: {
    ...mapMutations(["updateFormField"]),
    ...mapActions(["populateFromICBCPlateLookup"])
  }
}
</script>

<style scoped>

</style>