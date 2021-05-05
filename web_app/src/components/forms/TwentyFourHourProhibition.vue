<template>
  <form-container title="Notice of 24 Hour Licence Suspension">
    <form-card title="Driver's Information">
      <form-row>
        <driver-licence-number id="drivers_number">Driver's Licence Number</driver-licence-number>
      </form-row>
      <form-row>
        <text-field id="last_name" fg_class="col-sm-4" placeholder="Last Name" rules="required">Surname</text-field>
        <text-field id="first_name" fg_class="col-sm-4" placeholder="First Name" rules="required">Given Name</text-field>
        <dob-field id="dob" fg_class="col-sm-4" rules="dob">Date of Birth</dob-field>
      </form-row>
      <form-row>
        <text-field id="address1" fg_class="col-sm-12" placeholder="Address" rules="required">Address Line 1</text-field>
      </form-row>
      <form-row>
        <text-field id="address2" fg_class="col-sm-12" placeholder="Address">Address Line 2</text-field>
      </form-row>
      <form-row>
        <type-ahead-field id="city" fg_class="col-sm-6" :suggestions="getArrayOfBCCityNames" rules="required">City</type-ahead-field>
        <province-field id="province" fg_class="col-sm-4">Province</province-field>
        <text-field id="postal" fg_class="col-sm-2">Postal</text-field>
      </form-row>
      <form-row>
        <radio-field id="licence_surrendered" type="radio" :options='["Yes", "No", "Unlicenced"]'>Licenced Surrendered?</radio-field>
      </form-row>
    </form-card>
    <form-card title="Vehicle Information">
      <form-row>
        <province-field id="plate_province" fg_class="col-sm-2">Jurisdiction</province-field>
        <plate-number id="plate_number" fg_class="col-sm-4">Plate Number</plate-number>
      </form-row>
      <form-row>
        <text-field id="plate_year" fg_class="col-sm-4">Plate Year</text-field>
        <text-field id="plate_val_tag" input_type="number" fg_class="col-sm-4">Plate Val Tag</text-field>
        <text-field id="registration_number" fg_class="col-sm-4">Registration Number</text-field>
      </form-row>
      <form-row>
        <text-field id="vehicle_year" fg_class="col-sm-3">Vehicle Year</text-field>
        <text-field id="vehicle_make" input_type="number" fg_class="col-sm-3">Vehicle Make</text-field>
        <text-field id="vehicle_model" fg_class="col-sm-3">Vehicle Model</text-field>
        <text-field id="vehicle_color" fg_class="col-sm-3">Vehicle Colour</text-field>
      </form-row>
      <form-row>
        <province-field id="puj_code" fg_class="col-sm-5">PUJ Code</province-field>
        <plate-number id="nsc_number" fg_class="col-sm-7">NSC Number</plate-number>
      </form-row>
    </form-card>
    <form-card title="Registered Owner">
      <form-row>
        <radio-field id="driver_is_owner" type="radio" :options='["Yes", "No"]'>Driver is registered owner?</radio-field>
      </form-row>
      <form-row>
        <text-field id="owners_last_name" fg_class="col-sm-6">Owner's Last Name</text-field>
        <text-field id="owners_first_name" fg_class="col-sm-6">Owner's First Name</text-field>
      </form-row>
      <form-row>
        <text-field id="owners_address1" fg_class="col-sm-12" placeholder="Address" rules="required">Address Line 1</text-field>
      </form-row>
      <form-row>
        <text-field id="owners_address2" fg_class="col-sm-12" placeholder="Address">Address Line 2</text-field>
      </form-row>
      <form-row>
        <type-ahead-field id="owners_city" fg_class="col-sm-6" :suggestions="getArrayOfBCCityNames" rules="required">City</type-ahead-field>
        <province-field id="owners_province" fg_class="col-sm-4">Province</province-field>
        <text-field id="owners_postal" fg_class="col-sm-2">Postal</text-field>
      </form-row>
      <form-row>
        <phone-field id="owners_phone" fg_class="col-sm-6" rules="phone">Phone</phone-field>
      </form-row>
    </form-card>
    <form-card title="Vehicle Impoundment or Disposition">
      <form-row>
        <radio-field id="vehicle_impounded" type="radio" fg_class="col-sm-6" :options='["Yes", "No"]'>Vehicle Impounded?</radio-field>
        <radio-field id="reason_for_not_impounding" type="radio" fg_class="col-sm-6"
                     :options='["Released to other driver", "Left at roadside", "Other"]'
                     :visible=" ! showVehicleImpounded">Reason for not impounding?</radio-field>
      </form-row>
      <form-row>
        <text-field id="vehicle_released_to" :visible="!showVehicleImpounded" fg_class="col-sm-6" >
          Vehicle Released To</text-field>
        <text-field id="datetime_released" :visible="!showVehicleImpounded" fg_class="col-sm-6" >
          Date and Time Released</text-field>
      </form-row>
      <form-row>
        <radio-field id="location_of_keys" :visible="showVehicleImpounded" type="radio" fg_class="col-sm-6"
                     :options='["With vehicle", "With driver"]'>Location of Keys?</radio-field>
      </form-row>
      <form-row>
        <type-ahead-field id="impound_lot_operator" fg_class="col-sm-12" :visible="showVehicleImpounded"
                          :suggestions="['Busters Towing', 'Roadway Towing - Delta']">Impound Lot Operator</type-ahead-field>
      </form-row>
      <form-row>
        <text-field id="ilo_address" :visible="showVehicleImpounded" fg_class="col-sm-4">Address</text-field>
        <text-field id="ilo_city" :visible="showVehicleImpounded" fg_class="col-sm-4">City</text-field>
        <text-field id="ilo_phone" :visible="showVehicleImpounded" fg_class="col-sm-4">Phone</text-field>
      </form-row>
    </form-card>
    <form-card title="Prohibition">
      <form-row>
        <radio-field id="prohibition_type" type="radio" fg_class="col-sm-6"
                     :options='["Alcohol 215(2)", "Drugs 215(3)"]'>Type of Prohibition</radio-field>
      </form-row>
      <form-row>
        <text-field id="offence_address" fg_class="col-sm-4">Intersection or Address of Offence</text-field>
        <type-ahead-field id="offence_city" fg_class="col-sm-6" :suggestions="getArrayOfBCCityNames" rules="required">City</type-ahead-field>
      </form-row>
      <form-row>
        <radio-field id="operating_grounds" type="radio" fg_class="col-sm-12"
                     :options='["Witnessed by officer", "Admission by driver", "Independent witness", "Other"]'>
          The driver was operating a motor vehicle or had care and
          control of a motor vehicle for the purposes of MVA section 215(1) based on:
        </radio-field>
      </form-row>
      <form-row>
        <radio-field id="prescribed_device" type="radio" fg_class="col-sm-12"
                     :options='["Yes", "No", "Requested by driver", "Refused"]'>
          Was a prescribed Approved Screening Device (ASD), Approved Instrument, or prescribed physical
          coordination test used to form reasonable grounds to believe the driver's ability to drive a
          motor vehicle was affected by alcohol or a drug?
        </radio-field>
      </form-row>
      <form-row>
        <radio-field id="test_administered" type="radio" fg_class="col-sm-12"
                     :options='["Alco-Sensor FST", "Prescribed Physical Coordination Test"]'>Test Administered
        </radio-field>
      </form-row>
      <form-row>
        <radio-field id="result_alcohol" type="radio" fg_class="col-sm-12"
                     :options='["51-99 mg%", "Over 99 mg%", "BAC"]'>Result</radio-field>
        <radio-field id="result_drug" type="radio" fg_class="col-sm-12"
                     :options='["Ability to drive affected by a drug"]'>Result</radio-field>
      </form-row>
      <form-row>
        <text-field id="file_number" fg_class="col-sm-6">GA File Number</text-field>
        <date-time id="prohibition_start_time" fg_class="col-sm-6">
          Date and Time When Formed Grounds
        </date-time>
      </form-row>
    </form-card>
    <form-submission-buttons></form-submission-buttons>
    <print-confirmation-modal id="printConfirmationModal" title="printConfirmation"></print-confirmation-modal>
  </form-container>
</template>

<script>

import FormsCommon from "@/components/forms/FormsCommon";

export default {
  name: "TwentyFourHourProhibition",
  mixins: [FormsCommon],
  computed: {
    showVehicleImpounded() {
      return this.$store.getters.getAttributeValue('vehicle_impounded') === "Yes"
    }
  }
}
</script>

<style scoped>
  .lightgray {
    background-color: lightgray;
  }
  .prohibition_number {
    color: red;
  }
</style>