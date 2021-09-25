<template>
<form-card title="Vehicle information">
  <div v-if="isReadOnly" class="">
    <read-only-element id="plate_province">Jurisdiction</read-only-element>
    <read-only-element id="plate_number">Plate Number</read-only-element>
  </div>
  <div v-if="isReadOnly">
    <read-only-element id="plate_year">Plate Year</read-only-element>
    <read-only-element id="plate_val_tag">Plate Val Tag</read-only-element>
    <read-only-element id="registration_number">Registration Number</read-only-element>
    <read-only-element id="vehicle_year">Vehicle Year</read-only-element>
    <read-only-element id="vehicle_make">Vehicle Make</read-only-element>
    <read-only-element id="vehicle_model">Vehicle Model</read-only-element>
    <read-only-element id="vehicle_type">Vehicle Type</read-only-element>
    <read-only-element id="vehicle_color">Vehicle Colour</read-only-element>
    <read-only-element id="vin_number">VIN Number</read-only-element>
    <read-only-element id="puj_code">PUJ Code</read-only-element>
    <read-only-element id="nsc_number">NSC Number</read-only-element>
  </div>
  <form-row v-if="! isReadOnly">
      <jurisdiction-field id="plate_province" fg_class="col-sm-3">Jurisdiction</jurisdiction-field>
      <plate-number id="plate_number" fg_class="col-sm-6">Plate Number</plate-number>
    </form-row>
  <form-row v-if="! isReadOnly">
    <wait-for-icbc-field id="plate_year" fg_class="col-sm-4">Plate Year</wait-for-icbc-field>
    <wait-for-icbc-field id="plate_val_tag" input_type="number" fg_class="col-sm-4">Plate Val Tag</wait-for-icbc-field>
    <wait-for-icbc-field id="registration_number" fg_class="col-sm-4">Registration Number</wait-for-icbc-field>
  </form-row>
  <form-row v-if="! isReadOnly">
<type-ahead-field :suggestions="getArrayOfVehicleYears" id="vehicle_year" fg_class="col-sm-2">Vehicle Year</type-ahead-field>
    <type-ahead-field :suggestions="getArrayOfVehicleMakes" id="vehicle_make" input_type="number" fg_class="col-sm-2">Vehicle Make</type-ahead-field>
    <type-ahead-field :suggestions="getArrayOfVehicleModels" id="vehicle_model" fg_class="col-sm-3">Vehicle Model</type-ahead-field>
    <type-ahead-field :suggestions="getArrayOfVehicleStyles" id="vehicle_type" fg_class="col-sm-3">Vehicle Type</type-ahead-field>
    <type-ahead-field :suggestions="getArrayOfCommonCarColors" id="vehicle_color" fg_class="col-sm-2">Vehicle Colour</type-ahead-field>
  </form-row>
  <form-row v-if="! isReadOnly">
    <wait-for-icbc-field id="vin_number" fg_class="col-sm-12">VIN Number</wait-for-icbc-field>
  </form-row>
  <form-row v-if="! isReadOnly">
    <text-field id="puj_code" fg_class="col-sm-5">PUJ Code</text-field>
    <text-field id="nsc_number" fg_class="col-sm-7">NSC Number</text-field>
  </form-row>

</form-card>
</template>

<script>

import CardsCommon from "@/components/forms/CardsCommon";
import {mapGetters} from "vuex";

export default {
  name: "VehicleInformationCard",
  mixins: [CardsCommon],
  computed: {
        ...mapGetters(["getArrayOfCommonCarColors", "getArrayOfVehicleYears",
      "getArrayOfVehicleMakes", "getArrayOfVehicleModels", "getArrayOfVehicleStyles"])
  }
}
</script>

<style scoped>

</style>