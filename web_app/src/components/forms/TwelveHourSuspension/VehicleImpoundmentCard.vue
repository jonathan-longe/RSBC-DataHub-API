<template>
  <form-card title="Vehicle Disposition">
    <div v-if="! isReadOnly">
      <form-row>
        <radio-field id="vehicle_towed" fg_class="col-sm-6" :options='["Yes", "No"]'>Vehicle Towed?</radio-field>
      </form-row>
      <form-row>
        <radio-field id="reason_for_not_towing" fg_class="col-sm-6"
                     :options='["Released to other driver", "Left at roadside", "Private tow", "Seized for investigation"]'
                     :visible="showVehicleNotImpounded">Reason for not towing?</radio-field>
      </form-row>
      <form-row v-if="isReleasedToOtherDriver">
        <text-field id="vehicle_released_to" :visible="showVehicleNotImpounded" fg_class="col-sm-6" >
          Vehicle Released To</text-field>
        <date-time id="datetime_released" :visible="showVehicleNotImpounded" fg_class="col-sm-6" >
          Date and Time Released</date-time>
      </form-row>
      <form-row>
        <radio-field id="location_of_keys" :visible="showVehicleImpounded" fg_class="col-sm-6"
                     :options='["With vehicle", "With driver"]'>Location of Keys?</radio-field>
      </form-row>
      <form-row>
        <type-ahead-field id="impound_lot_operator" fg_class="col-sm-12" :visible="showVehicleImpounded"
                     :suggestions="getArrayOfImpoundLotOperators">Tow Operator (name, lot address, city & phone)</type-ahead-field>
      </form-row>
    </div>
    <div v-if="isReadOnly">
      <read-only-element id="vehicle_towed">Vehicle Impounded</read-only-element>
      <read-only-element id="vehicle_released_to">Vehicle released to</read-only-element>
      <read-only-element id="datetime_released">Datetime released</read-only-element>
      <read-only-element id="location_of_keys">Location of keys</read-only-element>
      <read-only-element id="impound_lot_operator">Impound lot operator</read-only-element>
    </div>
  </form-card>
</template>

<script>

import CardsCommon from "@/components/forms/CardsCommon";
import { mapGetters } from 'vuex';


export default {
name: "VehicleImpoundmentCard",
mixins: [CardsCommon],
  computed: {
    ...mapGetters(["getAttributeValue", "getArrayOfImpoundLotOperators"]),
    showVehicleImpounded() {
      return this.getAttributeValue('vehicle_towed') === "Yes";
    },
    showVehicleNotImpounded() {
      return this.getAttributeValue('vehicle_towed') === "No";
    },
    isReleasedToOtherDriver() {
      return this.getAttributeValue('reason_for_not_towing') === "Released to other driver";
    },
  }
}
</script>

<style scoped>

</style>