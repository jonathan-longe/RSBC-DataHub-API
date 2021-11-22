<template>
  <form-container title="Notice of 12 Hour Licence Suspension" v-if="isMounted">
    <validation-observer v-slot="{valid}">
      <drivers-information-card></drivers-information-card>
      <vehicle-information-card></vehicle-information-card>
      <return-of-licence-card></return-of-licence-card>
      <vehicle-impoundment-card></vehicle-impoundment-card>
      <prohibition-information-card></prohibition-information-card>
      <officer-details-card></officer-details-card>
      <form-card title="Download Notice and Officer's Report">
          <div class="d-flex justify-content-between">
            <div @click="onSubmit(valid)" class="btn-primary">Download PDF
              <b-spinner v-if="display_spinner" small label="Loading..."></b-spinner>
            </div>
          </div>
      </form-card>
    </validation-observer>
  </form-container>
</template>

<script>

import FormsCommon from "@/components/forms/FormsCommon";
import DriversInformationCard from "@/components/forms/TwelveHourSuspension/DriversInformationCard";
import ReturnOfLicenceCard from "@/components/forms/ReturnOfLicenceCard";
import OfficerDetailsCard from "@/components/forms/TwelveHourSuspension/OfficerDetailsCard";
import VehicleInformationCard from "@/components/forms/TwelveHourSuspension/VehicleInformationCard";
import ProhibitionInformationCard from "@/components/forms/TwelveHourSuspension/ProhibitionInformationCard";
import VehicleImpoundmentCard from "@/components/forms/TwelveHourSuspension/VehicleImpoundmentCard";
import moment from "moment";
import {mapGetters} from "vuex";

export default {
  name: "TwelveTwentyFour",
  mixins: [FormsCommon],
  components: {
    ProhibitionInformationCard,
    DriversInformationCard,
    OfficerDetailsCard,
    ReturnOfLicenceCard,
    VehicleInformationCard,
    VehicleImpoundmentCard,
  },
  props: {
    name: {
      type: String,
      default: '12Hour'
    }
  },
  mounted() {
    let payload = {form_type: this.name, form_id: this.id}
    this.editExistingForm(payload)
    this.setNewFormDefaults(payload)
    this.data = this.getCurrentlyEditedFormData
    this.isMounted = true
  },
  computed: {
    ...mapGetters(["getCurrentlyEditedFormObject", "getPdfFileNameString"]),
  },
  methods: {
    async onSubmit(valid) {
      console.log('inside onSubmit()', valid);
      if(valid) {
        this.display_spinner = true;
        const current_timestamp = moment.now()
        console.log("inside saveAndPrint()", this.display_spinner, current_timestamp)
        let payload = {}
        payload['form_object'] = this.getCurrentlyEditedFormObject;
        payload['filename'] = this.getPdfFileNameString(payload.form_object, this.kid);
        payload['variants'] = this.document.variants;
        await this.saveCurrentFormToDB(payload.form_object)
        await this.createPDF(payload)
          .then( () => {
            this.display_spinner = false;
            console.log("saveAndPrint() complete", this.display_spinner)
          })
        payload['timestamp'] = current_timestamp
        await this.tellApiFormIsPrinted(payload.form_object)
          .then( (response) => {
            console.log("response from tellApiFormIsPrinted()", response)
            this.setFormAsPrinted(payload)
            this.saveCurrentFormToDB(payload.form_object)
          })
      }
      console.log('do nothing')
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