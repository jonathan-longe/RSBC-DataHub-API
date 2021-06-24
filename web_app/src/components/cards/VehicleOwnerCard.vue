<template>
<div class="card-body text-dark text-left">
  <div class="card w-100">
    <div class="card-header lightgray text-dark font-weight-bold pt-2 pb-2">
      <div class="row p-0 m-0">
          <div class="col-6 pt-1 pl-0">Registered Owner</div>
          <div class="col-6 text-right" v-if="! isReadOnly">
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" :id="owner_id"
              @input="updateCheckBox" :checked="checkBoxStatus(owner_id,owner_option)" :value="owner_option">
              <label class="custom-control-label small" :for="owner_id">Driver is the vehicle owner</label>
           </div>
          </div>
      </div>
    </div>
    <div class="card-body lightgray" v-if="! isReadOnly">
      <div v-if="driverIsNotRegisteredOwner">
          <form-row>
            <check-field fg_class="col-sm-12" :show_label="false" id="corporate_owner" :options="['Owned by corporate entity']" >Corporation</check-field>
          </form-row>
          <form-row>
            <text-field v-if="corporateOwner" id="owners_corporation" fg_class="col-sm-12">Corporation Name</text-field>
            <text-field v-if="!corporateOwner" id="owners_last_name" fg_class="col-sm-6">Owner's Last Name</text-field>
            <text-field v-if="!corporateOwner" id="owners_first_name" fg_class="col-sm-6">Owner's First Name</text-field>
          </form-row>
          <form-row>
            <text-field id="owners_address1" fg_class="col-sm-12" placeholder="Address" rules="required">Address Line 1</text-field>
          </form-row>
          <form-row>
            <text-field id="owners_address2" fg_class="col-sm-12" placeholder="Address">Address Line 2</text-field>
          </form-row>
          <form-row>
            <type-ahead-field id="owners_city" fg_class="col-sm-4" :suggestions="getArrayOfBCCityNames" rules="required">City</type-ahead-field>
            <province-field id="owners_province" fg_class="col-sm-2">Province</province-field>
            <text-field id="owners_postal" fg_class="col-sm-2">Postal</text-field>
            <phone-field id="owners_phone" fg_class="col-sm-4" rules="phone">Phone</phone-field>
          </form-row>
        </div>
    </div>
    <div class="card-body lightgray" v-if="isReadOnly">
      <read-only-element :id="owner_id">Driver is the vehicle owner</read-only-element>
      <read-only-element id="corporate_owner">Owner is a corporation</read-only-element>
      <read-only-element id="owners_corporation">Corporation name</read-only-element>
      <read-only-element id="owners_last_name">Last name</read-only-element>
      <read-only-element id="owners_first_name">First name</read-only-element>
      <read-only-element id="owners_address1">Address 1</read-only-element>
      <read-only-element id="owners_address2">Address 2</read-only-element>
      <read-only-element id="owners_city">City</read-only-element>
      <read-only-element id="owners_province">Province</read-only-element>
      <read-only-element id="owners_postal">Postal code</read-only-element>
      <read-only-element id="owners_phone">Phone</read-only-element>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import CardsCommon from "@/components/cards/CardsCommon";

export default {
  name: "VehicleOwnerCard",
  props: {
    title: String
  },
  mixins: [CardsCommon],
  data() {
    return {
      owner_id: "owner_is_driver",
      owner_option: "Driver is the vehicle owner",
    }
  },
  methods: {
    ...mapMutations(["updateCheckBox"])
  },
  computed: {
    ...mapGetters(["checkBoxStatus", "driverIsNotRegisteredOwner", "corporateOwner"])
  }
}
</script>