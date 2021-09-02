<template>
<form-card title="Driver's Information">
  <div v-if="! isReadOnly">
    <form-row>
      <jurisdiction-field id="drivers_licence_jurisdiction" fg_class="col-sm-3">Jurisdiction</jurisdiction-field>
      <driver-licence-number id="drivers_number">Driver's Licence Number</driver-licence-number>
    </form-row>
    <form-row>
      <text-field id="last_name" fg_class="col-sm-4" placeholder="Last Name" rules="required">Last Name</text-field>
      <text-field id="first_name" fg_class="col-sm-4" placeholder="First Name" rules="required">First Name</text-field>
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
      <province-field id="province" fg_class="col-sm-2">Province</province-field>
      <text-field id="postal" fg_class="col-sm-4">Postal</text-field>
    </form-row>
  </div>
  <div v-if="isReadOnly">
    <read-only-element id="drivers_licence_jurisdiction">Jurisdiction</read-only-element>
    <read-only-element id="drivers_number">Driver's licence number</read-only-element>
    <read-only-element id="last_name">Last name</read-only-element>
    <read-only-element id="first_name">First name</read-only-element>
    <read-only-element id="dob">Date of birth</read-only-element>
    <read-only-element id="address1">Address 1</read-only-element>
    <read-only-element id="address2">Address 2</read-only-element>
    <read-only-element id="city">City</read-only-element>
    <read-only-element id="province">Province</read-only-element>
    <read-only-element id="postal">Postal code</read-only-element>
  </div>
</form-card>
</template>

<script>
import CardsCommon from "@/components/forms/CardsCommon";
export default {
  name: "DriversInformationCard",
  mixins: [CardsCommon],
}
</script>

<style scoped>

</style>