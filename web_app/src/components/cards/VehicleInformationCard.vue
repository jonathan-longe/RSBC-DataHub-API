<template>
<form-card title="Vehicle information">
  <div v-if="isReadOnly">
    <read-only-element id="plate_year">Plate Year</read-only-element>
    <read-only-element id="plate_val_tag">Plate Val Tag</read-only-element>
    <read-only-element id="registration_number">Registration Number</read-only-element>
    <read-only-element id="vehicle_year">Vehicle Year</read-only-element>
    <read-only-element id="vehicle_make">Vehicle Make</read-only-element>
    <read-only-element id="vehicle_model">Vehicle Model</read-only-element>
    <read-only-element id="vehicle_color">Vehicle Colour</read-only-element>
    <read-only-element id="vin_number">VIN Number</read-only-element>
    <read-only-element id="puj_code">PUJ Code</read-only-element>
    <read-only-element id="nsc_number">NSC Number</read-only-element>
  </div>
  <form-row v-if="! isReadOnly">
    <text-field id="plate_year" fg_class="col-sm-4">Plate Year</text-field>
    <text-field id="plate_val_tag" input_type="number" fg_class="col-sm-4">Plate Val Tag</text-field>
    <text-field id="registration_number" fg_class="col-sm-4">Registration Number</text-field>
  </form-row>
  <form-row v-if="! isReadOnly">
    <text-field id="vehicle_year" fg_class="col-sm-3">Vehicle Year</text-field>
    <text-field id="vehicle_make" input_type="number" fg_class="col-sm-3">Vehicle Make</text-field>
    <text-field id="vehicle_model" fg_class="col-sm-3">Vehicle Model</text-field>
    <text-field id="vehicle_color" fg_class="col-sm-3">Vehicle Colour</text-field>
  </form-row>
  <form-row v-if="! isReadOnly">
    <text-field id="vin_number" fg_class="col-sm-12">VIN Number</text-field>
  </form-row>
  <form-row v-if="! isReadOnly">
    <text-field id="puj_code" fg_class="col-sm-5">PUJ Code</text-field>
    <text-field id="nsc_number" fg_class="col-sm-7">NSC Number</text-field>
  </form-row>

</form-card>
</template>

<script>

import CardsCommon from "@/components/cards/CardsCommon";

export default {
  name: "VehicleInformationCard",
  mixins: [CardsCommon]
}
</script>

<style scoped>

</style>