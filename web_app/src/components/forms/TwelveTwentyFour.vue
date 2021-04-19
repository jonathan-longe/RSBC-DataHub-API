<template>
    <div class="card w-100 mt-3 mb-3">
      <div class="card-header text-white bg-primary pt-2 pb-1">
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
            <div class="card-header bg-primary text-white pt-2 pb-2">Driver's Information</div>
            <div class="card-body lightgray">

              <component :is="data.drivers_number.component" :form_group="data.address2"></component>

              <div class="form-row">
                  <component :is="data.last_name.component" :form_group="data.last_name" form_group_class="col-sm-5"></component>
                  <component :is="data.first_name.component" :form_group="data.first_name" form_group_class="col-sm-4"></component>
                <component :is="data.dob.component" :form_group="data.dob" form_group_class="col-sm-3"></component>
              </div>
              <div class="form-row ">
                <component :is="data.address1.component" :form_group="data.address1" form_group_class="col-sm-12"></component>
              </div>
              <div class="form-row ">
                <component :is="data.address2.component" :form_group="data.address2" form_group_class="col-sm-12"></component>
              </div>
              <div class="form-row">
                <component :is="data.city.component" :form_group="data.city" form_group_class="col-sm-6"></component>
                <component :is="data.province.component" :form_group="data.province" form_group_class="col-sm-4"></component>
                <component :is="data.postal.component" :form_group="data.postal" form_group_class="col-sm-2"></component>
              </div>
            </div>
          </div>

          <div class="form-row float-right mt-3 mb-3">
            <button @click="exitDoNotSave" type="submit" class="btn btn-danger m-1">Delete</button>
            <button @click="stopEditingForm" type="submit" class="btn btn-success m-1">Save, complete later</button>
            <button @click="saveAndPrint" type="submit" class="btn btn-success disabled m-1">Save and Print</button>
          </div>

       </form>
      </div>
  </div>
</template>

<script>

import FormsCommon from "@/components/forms/FormsCommon";

export default {
  name: "TwelveTwentyFour",
  mixins: [FormsCommon]
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