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
       <form>

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
                         :prohibition_number="prohibition_number"></component>

              <div class="form-row">
                  <component :is="formData.data.last_name.component"
                             :form_group="formData.data.last_name"
                             form_group_class="col-sm-5"></component>
                  <component :is="formData.data.first_name.component" :form_group="formData.data.first_name" form_group_class="col-sm-4"></component>
                <component :is="formData.data.dob.component" :form_group="formData.data.dob" form_group_class="col-sm-3"></component>
              </div>
              <div class="form-row ">
                <component :is="formData.data.address1.component" :form_group="formData.data.address1" form_group_class="col-sm-12"></component>
              </div>
              <div class="form-row ">
                <component :is="formData.data.address2.component" :form_group="formData.data.address2" form_group_class="col-sm-12"></component>
              </div>
              <div class="form-row">
                <component :is="formData.data.city.component" :form_group="formData.data.city" form_group_class="col-sm-6"></component>
                <component :is="formData.data.province.component" :form_group="formData.data.province" form_group_class="col-sm-4"></component>
                <component :is="formData.data.postal.component" :form_group="formData.data.postal" form_group_class="col-sm-2"></component>
              </div>
            </div>
          </div>

          <div class="form-row float-right mt-3 mb-3">
            <button @click="exitDoNotSave" type="submit" class="btn btn-danger m-1">Delete</button>
            <button @click="stopEditingForm" type="submit" class="btn btn-success m-1">Save, complete later</button>
            <button @click="saveAndPrint" type="submit" class="btn btn-success disabled m-1">Save and Print</button>
          </div>

       </form>
        <div class="alert-secondary">Invalid? {{ $v.$invalid }}</div>

      </div>
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