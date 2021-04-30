<template>
    <div class="card w-100 mt-3 mb-3 border-primary">
      <div class="card-header text-white bg-secondary pt-2 pb-0">
        <h4>Notice of 24 Hour Licence Suspension</h4>
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
                  <div class="col-8 pt-1">Driver's Information</div>
                  <div class="col-4 text-right"><button class="btn-primary btn-sm">Scan BCDL</button></div>
                </div>
              </div>
            </div>
            <div class="card-body lightgray">

              <p class="small pb-0 mb-2">Licence Plate Jurisdiction and Plate Number</p>
                <div class="form-row">
                  <component :is="formData.data.licence_province.component"
                           :form_group="formData.data.licence_province"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-2"
                           :prohibition_number="prohibition_number"></component>

                  <component :is="formData.data.licence_number.component"
                         :form_group="formData.data.licence_number"
                         :display_validation_errors="displayValidationErrors"
                         @field_updated="updateValidation"
                         :prohibition_number="prohibition_number"></component>
              </div>
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
                <component :is="formData.data.licence_surrendered.component"
                           :form_group="formData.data.licence_surrendered"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-6"></component>
              </div>
            </div>
          </div>

      </div>


      <div class="card-body text-dark text-left">

          <div class="card w-100">
            <div class="card-header lightgray text-dark font-weight-bold pt-2 pb-2">
              <div class="container p-0 m-0">
                <div class="row p-0 mt-0 mb-0">
                  <div class="col-12 pt-1">Vehicle Information</div>
                </div>
              </div>
            </div>
            <div class="card-body lightgray">
              <div>
              <p class="small pb-0 mb-2">Licence Plate Jurisdiction and Plate Number</p>
                <div class="form-row">
                 <component :is="formData.data.plate_province.component"
                           :form_group="formData.data.plate_province"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                             form_group_class="col-sm-2"
                           :prohibition_number="prohibition_number"></component>
                 <component :is="formData.data.plate_number.component"
                           :form_group="formData.data.plate_number"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                             form_group_class="col-sm-3"
                           :prohibition_number="prohibition_number"></component>
                </div>
              </div>
              <div class="form-row">
                  <component :is="formData.data.plate_year.component"
                           :form_group="formData.data.plate_year"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                             form_group_class="col-sm-4"
                           :prohibition_number="prohibition_number"></component>
                 <component :is="formData.data.plate_val_tag.component"
                           :form_group="formData.data.plate_val_tag"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                             form_group_class="col-sm-4"
                           :prohibition_number="prohibition_number"></component>
                 <component :is="formData.data.registration_number.component"
                           :form_group="formData.data.registration_number"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                             form_group_class="col-sm-4"
                           :prohibition_number="prohibition_number"></component>
              </div>
              <div class="form-row ">
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

              </div>
              <div class="form-row">
                <component :is="formData.data.puj_code.component"
                           :form_group="formData.data.puj_code"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-5"></component>
                <component :is="formData.data.nsc_number.component"
                           :form_group="formData.data.nsc_number"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-7"></component>
              </div>
            </div>
          </div>
      </div>

      <div class="card-body text-dark text-left">
          <div class="card w-100">
            <div class="card-header lightgray text-dark font-weight-bold pt-2 pb-2">
              <div class="container p-0 m-0">
                <div class="row p-0 mt-0 mb-0">
                  <div class="col-8 pt-1">Registered Owner</div>
                  <div class="col-4 text-right"><button class="btn-primary btn-sm">Copy from DL</button></div>
                </div>
              </div>
            </div>
            <div class="card-body lightgray">
              <div class="form-row">
                  <component :is="formData.data.owners_last_name.component"
                           :form_group="formData.data.owners_last_name"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-6"></component>
                <component :is="formData.data.owners_first_name.component"
                           :form_group="formData.data.owners_first_name"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-6"></component>
              </div>
              <div class="form-row ">
                 <component :is="formData.data.owners_address.component"
                           :form_group="formData.data.owners_address"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-12"></component>
              </div>
              <div class="form-row ">
                 <component :is="formData.data.owners_city.component"
                           :form_group="formData.data.owners_city"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-3"></component>
                 <component :is="formData.data.owners_province.component"
                           :form_group="formData.data.owners_province"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-3"></component>
                 <component :is="formData.data.owners_postal.component"
                           :form_group="formData.data.owners_postal"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-3"></component>
                 <component :is="formData.data.owners_phone.component"
                           :form_group="formData.data.owners_phone"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-3"></component>
              </div>
              <div class="form-row">

              </div>
            </div>
          </div>
      </div>

      <div class="card-body text-dark text-left">
          <div class="card w-100">
            <div class="card-header lightgray text-dark font-weight-bold pt-2 pb-2">
              <div class="container p-0 m-0">
                <div class="row p-0 mt-0 mb-0">
                  <div class="col-12 pt-1">Vehicle Impoundment or Disposition</div>
                </div>
              </div>
            </div>
            <div class="card-body lightgray">

              <div class="form-row ">
                  <component :is="formData.data.vehicle_impounded.component"
                           :form_group="formData.data.vehicle_impounded"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-6"></component>
                  <component :is="formData.data.reason_for_not_impounding.component"
                           :form_group="formData.data.reason_for_not_impounding"
                           :display_validation_errors="displayValidationErrors"
                           :disabled="showVehicleImpounded"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-6"></component>
              </div>
              <div class="form-row">
                  <component :is="formData.data.vehicle_released_to.component"
                           :form_group="formData.data.vehicle_released_to"
                           :display_validation_errors="displayValidationErrors"
                           :disabled="showVehicleImpounded"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-6"></component>
                  <component :is="formData.data.datetime_released.component"
                           :form_group="formData.data.datetime_released"
                           :disabled="showVehicleImpounded"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-6"></component>
              </div>
              <div class="form-row">
                  <component :is="formData.data.impound_lot_operator.component"
                           :form_group="formData.data.impound_lot_operator"
                           :disabled="showVehicleImpounded"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-12"></component>
              </div>
              <div class="form-row">
                  <component :is="formData.data.ilo_address.component"
                           :form_group="formData.data.ilo_address"
                           :disabled="showVehicleImpounded"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-4"></component>
                  <component :is="formData.data.ilo_city.component"
                           :form_group="formData.data.ilo_city"
                           :disabled="showVehicleImpounded"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-4"></component>
                  <component :is="formData.data.ilo_phone.component"
                           :form_group="formData.data.ilo_phone"
                           :disabled="showVehicleImpounded"
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
                  <div class="col-12 pt-1">Prohibition</div>
                </div>
              </div>
            </div>
            <div class="card-body lightgray">
            <div class="form-row">
                  <component :is="formData.data.offence_address.component"
                           :form_group="formData.data.offence_address"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-6"></component>
                  <component :is="formData.data.offence_city.component"
                           :form_group="formData.data.offence_city"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-6"></component>
              </div>
              <div class="form-row ">
                  <component :is="formData.data.operating_grounds.component"
                           :form_group="formData.data.operating_grounds"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-5"></component>
                <component :is="formData.data.prescribed_device.component"
                           :form_group="formData.data.prescribed_device"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-7"></component>
              </div>

              <div class="form-row">
                  <component :is="formData.data.prohibition_type.component"
                           :form_group="formData.data.prohibition_type"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-5"></component>
                  <component :is="formData.data.file_number.component"
                           :form_group="formData.data.file_number"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-7"></component>
              </div>
              <div class="form-row">
                  <component :is="formData.data.prohibition_start_time.component"
                           :form_group="formData.data.prohibition_start_time"
                           :display_validation_errors="displayValidationErrors"
                           @field_updated="updateValidation"
                           form_group_class="col-sm-5"></component>
              </div>
            </div>
          </div>
      </div>

      <div class="text-right mt-3 mb-3 pr-3">
        <button @click="exitDoNotSave" class="btn btn-danger m-1">Delete</button>
        <button @click="saveDoNotPrint" type="submit" class="btn btn-success m-1">Save, complete later</button>
        <button @click="saveAndPrint" class="btn btn-success m-1">Save and Serve</button>
      </div>

      <print-confirmation-modal id="printConfirmationModal" title="printConfirmation"></print-confirmation-modal>
  </div>
</template>

<script>

import FormsCommon from "@/components/forms/FormsCommon";

export default {
  name: "TwentyFourHourProhibition",
  mixins: [FormsCommon],
  computed: {
    showVehicleImpounded() {
      return this.$store.getters.getDataValue(this.prohibition_number).vehicle_impounded.value === "No";
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