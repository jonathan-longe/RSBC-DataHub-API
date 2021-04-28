<template>
    <div class="card w-100 mt-3 mb-3 border-primary">
      <div class="card-header text-white bg-secondary pt-2 pb-0">
        <h4>Notice of 12 Hour Licence Suspension</h4>
      </div>
      <div class="card-header mt-0 mb-0 pt-2 pb-0 text-dark">
        <p class="text-right pb-0 mb-2">
          <span class="prohibition_number">{{ prohibition_number }} </span>
          <b-icon-question-circle></b-icon-question-circle>
        </p>
      </div>

      <div class="card-body text-dark text-left">

          <div class="card w-100">
            <div class="card-header lightgray text-dark font-weight-bold pt-2 pb-2">
              <div class="container p-0 m-0">
                <div class="row p-0 mt-0 mb-0">
                  <div class="col-6 pt-1">Driver's Information</div>
                  <div class="col-6 text-right"><button class="btn-primary btn-sm">Scan BCDL</button></div>
                </div>
              </div>
            </div>
            <div class="card-body lightgray">

              <component :is="formData.data.drivers_number.component"
                         :form_group="formData.data.drivers_number"
                         :display_validation_errors="displayValidationErrors"
                         @field_updated="updateValidation"
                         :prohibition_number="prohibition_number"></component>

              <div class="form-row">
                  <component :is="formData.data.last_name.component"
                             :form_group="formData.data.last_name"
                             :display_validation_errors="displayValidationErrors"
                             @field_updated="updateValidation"
                             form_group_class="col-sm-4"></component>
                  <component :is="formData.data.first_name.component"
                             :form_group="formData.data.first_name"
                             :display_validation_errors="displayValidationErrors"
                             @field_updated="updateValidation"
                             form_group_class="col-sm-3"></component>
                  <component :is="formData.data.gender.component"
                             :form_group="formData.data.gender"
                             :display_validation_errors="displayValidationErrors"
                             @field_updated="updateValidation"
                             form_group_class="col-sm-2"></component>
                  <component :is="formData.data.dob.component"
                             :form_group="formData.data.dob"
                             :display_validation_errors="displayValidationErrors"
                             @field_updated="updateValidation"
                             form_group_class="col-sm-3"></component>
              </div>
              <div class="form-row ">
                <component :is="formData.data.address1.component"
                           :form_group="formData.data.address1"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-12"></component>
              </div>
              <div class="form-row ">
                <component :is="formData.data.address2.component"
                           :form_group="formData.data.address2"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-12"></component>
              </div>
              <div class="form-row">
                <component :is="formData.data.city.component"
                           :form_group="formData.data.city"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-6"></component>
                <component :is="formData.data.province.component"
                           :form_group="formData.data.province"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-4"></component>
                <component :is="formData.data.postal.component"
                           :form_group="formData.data.postal"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-2"></component>
              </div>
              <div class="form-row">
                <component :is="formData.data.business_phone.component"
                           :form_group="formData.data.business_phone"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-6"></component>
                <component :is="formData.data.residential_phone.component"
                           :form_group="formData.data.residential_phone"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-6"></component>
              </div>
            </div>
          </div>

      </div>
      <div class="card-body text-dark text-left">

          <div class="card w-100">
            <div class="card-body lightgray">

              <div class="form-row ">
                <component :is="formData.data.location.component"
                           :form_group="formData.data.location"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-12"></component>
              </div>
              <div class="div">
                  YOUR LICENCE TO DRIVE IS HEREBY SUSPENDED UNDER SECTION 90.3 OF THE MOTOR
                  VEHICLE ACT FOR A PERIOD OF 12 HOURS COMMENCING AT:
              </div>
              <div class="form-row">
                <component :is="formData.data.current_time.component"
                       :form_group="formData.data.current_time"
                       :display_validation_errors="displayValidationErrors"
                       @field_updated="updateValidation"
                       form_group_class="col-sm-12"></component>
              </div>
              <div class="form-row">
                <component :is="formData.data.officer_name.component"
                           :form_group="formData.data.officer_name"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-8"></component>
                <component :is="formData.data.badge_number.component"
                           :form_group="formData.data.badge_number"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-4"></component>
              </div>
              <div class="form-row">
                <component :is="formData.data.agency.component"
                           :form_group="formData.data.agency"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-8"></component>
                <component :is="formData.data.ga_number.component"
                           :form_group="formData.data.ga_number"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-4"></component>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body text-dark text-left">

          <div class="card w-100">
            <div class="card-header lightgray text-dark font-weight-bold pt-2 pb-2">
              <div class="container p-0 m-0">
                <div class="row p-0 mt-0 mb-0">
                  <div class="col-6 pt-1">Disposition of Vehicle</div>
                </div>
              </div>
            </div>
            <div class="card-body lightgray">

              <div class="form-row">
                  <component :is="formData.data.vehicle_year.component"
                             :form_group="formData.data.vehicle_year"
                             :display_validation_errors="displayValidationErrors"
                             @field_updated="updateValidation"
                             form_group_class="col-sm-3"></component>
                  <component :is="formData.data.vehicle_make.component"
                             :form_group="formData.data.vehicle_make"
                             :display_validation_errors="displayValidationErrors"
                             @field_updated="updateValidation"
                             form_group_class="col-sm-3"></component>
                  <component :is="formData.data.vehicle_model.component"
                             :form_group="formData.data.vehicle_model"
                             :display_validation_errors="displayValidationErrors"
                             @field_updated="updateValidation"
                             form_group_class="col-sm-3"></component>
                  <component :is="formData.data.vehicle_color.component"
                             :form_group="formData.data.vehicle_color"
                             :display_validation_errors="displayValidationErrors"
                             @field_updated="updateValidation"
                             form_group_class="col-sm-3"></component>
              </div>
              <div class="form-row ">
                <component :is="formData.data.location_of_keys.component"
                           :form_group="formData.data.location_of_keys"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-12"></component>
              </div>
              <div class="form-row ">
                <component :is="formData.data.location_of_vehicle.component"
                           :form_group="formData.data.location_of_vehicle"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-12"></component>
              </div>
              <div class="form-row">
                <component :is="formData.data.vehicle_released_to.component"
                           :form_group="formData.data.vehicle_released_to"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-7"></component>
                <component :is="formData.data.vehicle_released_datetime.component"
                           :form_group="formData.data.vehicle_released_datetime"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-5"></component>
              </div>
            </div>
          </div>


        <div class="form-row float-right mt-3 mb-3">
          <button @click="exitDoNotSave" class="btn btn-danger m-1">Delete</button>
          <button @click="saveDoNotPrint" type="submit" class="btn btn-success m-1">Save, complete later</button>
          <button @click="saveAndPrint" class="btn btn-success m-1">Save and Download PDF</button>
        </div>
      </div>
      <print-confirmation-modal id="printConfirmationModal" title="printConfirmation"></print-confirmation-modal>
  </div>
</template>

<script>

import FormsCommon from "@/components/forms/FormsCommon";

export default {
  name: "TwelveTwentyFour",
  mixins: [FormsCommon],
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