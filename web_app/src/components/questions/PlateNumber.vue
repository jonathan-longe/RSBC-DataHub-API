<template>

      <div class="form-group">
        <div class="input-group mb-3">
          <input type=text
               class="form-control form-control-sm"
               :id="form_group.id"
               placeholder="Plate Number"
               v-model="form_group.value">
          <div class="input-group-append">
            <button @click="icbcLookupPlate" class="btn-sm" :class="icbcLookupButtonClass">ICBC Lookup</button>
          </div>
        </div>
      </div>

</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";

export default {
  name: "PlateNumber",
  mixins: [FieldCommon],
  computed: {
    isNumberTheCorrectLength() {
      return this.form_group.value.length >= 3
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
    icbcLookupPlate() {
      // TODO - call out to ICBC instead of returning static data from demo purposes
      console.log("inside icbcLookupPlate(): ")
    }
  }
}
</script>

<style scoped>

</style>