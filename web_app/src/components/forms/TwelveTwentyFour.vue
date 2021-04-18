<template>
    <div class="card w-100 mt-3 mb-3">
      <div class="card-header text-white bg-primary pt-2 pb-1">
        <h4>Notice of 12 Hour Licence Suspension</h4>
      </div>
      <div class="card-header mt-0 mb-0 pt-2 pb-0 bg-secondary">
        <p class="text-right pb-0 mb-2">
          <span class="prohibition_number">{{ prohibition_number }} </span>
          <b-icon-question-circle></b-icon-question-circle>
        </p>
      </div>

      <div class="card-body text-dark text-left">
       <form>

          <div class="card w-100">
            <div class="card-header bg-primary text-white pt-2 pb-2">Driver's Information</div>
            <div class="card-body lightgray">

              <component :is="questions.drivers_number.component" :form_group="questions.address2"></component>

              <div class="form-row">
                  <component :is="questions.last_name.component" :form_group="questions.last_name" form_group_class="col-sm-5"></component>
                  <component :is="questions.first_name.component" :form_group="questions.first_name" form_group_class="col-sm-4"></component>
                <component :is="questions.dob.component" :form_group="questions.dob" form_group_class="col-sm-3"></component>
              </div>
              <div class="form-row ">
                <component :is="questions.address1.component" :form_group="questions.address1" form_group_class="col-sm-12"></component>
              </div>
              <div class="form-row ">
                <component :is="questions.address2.component" :form_group="questions.address2" form_group_class="col-sm-12"></component>
              </div>
              <div class="form-row">
                <component :is="questions.city.component" :form_group="questions.city" form_group_class="col-sm-6"></component>
                <component :is="questions.province.component" :form_group="questions.province" form_group_class="col-sm-4"></component>
                <component :is="questions.postal.component" :form_group="questions.postal" form_group_class="col-sm-2"></component>
              </div>
            </div>
          </div>

          <div class="form-row float-right mt-3 mb-3">
            <button type="submit" class="btn btn-danger m-1">Delete</button>
            <button @click="stopEditingForm" type="submit" class="btn btn-success m-1">Save, complete later</button>
            <button type="submit" class="btn btn-success m-1">Save and Print</button>
          </div>

       </form>
      </div>
  </div>
</template>

<script>

import TextField from "@/components/questions/TextField";
import ProvinceField from "@/components/questions/ProvinceField";
import DriverLicenceNumber from "@/components/questions/DriverLicenceNumber";
import CityField from "@/components/questions/CityField";

export default {
  name: "TwelveTwentyFour",
  props: {
    questions: {},
    prohibition_number: null
  },
  methods: {
    stopEditingForm() {
      this.$store.commit("stopEditingForm");
    }
  },
  components: {
    TextField,
    ProvinceField,
    DriverLicenceNumber,
    CityField
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