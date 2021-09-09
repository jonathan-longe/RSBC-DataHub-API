<template>
  <form-container title="Notice of 12 Hour Licence Suspension">
    <form-step :step_number=1>
      <drivers-information-card></drivers-information-card>
      <vehicle-information-card></vehicle-information-card>
      <return-of-licence-card></return-of-licence-card>
      <vehicle-impoundment-card></vehicle-impoundment-card>
      <prohibition-information-card></prohibition-information-card>
      <officer-details-card></officer-details-card>
    </form-step>
    <form-step :step_number=2>
      <drivers-information-card :is-read-only=true></drivers-information-card>
      <vehicle-information-card :is-read-only=true></vehicle-information-card>
      <return-of-licence-card :is-read-only=true></return-of-licence-card>
      <vehicle-impoundment-card :is-read-only=true></vehicle-impoundment-card>
      <prohibition-information-card :is-read-only=true></prohibition-information-card>
      <officer-details-card :is-read-only=true></officer-details-card>
      <form-card title="Print and Serve" border_class="border-primary">
        <p>You've entered sufficient information to print and serve the 12 hour suspension.</p>
        <p>Once you click the download button below:</p>
        <ul>
          <li>a prohibition document will be created to serve the driver;</li>
          <li>if the vehicle is being impounded, an additional document will be created for
            the impound lot operator, and;</li>
          <li>if the document is printed successfully, the fields entered will be
            locked from further editing.</li>
        </ul>
        <div class="w-100 text-right">
          <button @click="saveAndPrint(getPDFTemplateFileName)" class="btn btn-success m-1">Download PDF</button>
        </div>
      </form-card>
    </form-step>
    <print-confirmation-modal id="printConfirmationModal" title="printConfirmation"></print-confirmation-modal>
  </form-container>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";
import FormsCommon from "@/components/forms/FormsCommon";
import DriversInformationCard from "@/components/forms/TwelveHourSuspension/DriversInformationCard";
import ReturnOfLicenceCard from "@/components/forms/ReturnOfLicenceCard";
import OfficerDetailsCard from "@/components/forms/TwelveHourSuspension/OfficerDetailsCard";
import VehicleInformationCard from "@/components/forms/TwelveHourSuspension/VehicleInformationCard";
import ProhibitionInformationCard from "@/components/forms/TwelveHourSuspension/ProhibitionInformationCard";
import VehicleImpoundmentCard from "@/components/forms/TwelveHourSuspension/VehicleImpoundmentCard";

export default {
  name: "TwelveTwentyFour",
  mixins: [FormsCommon],
  components: {
    ProhibitionInformationCard,
    DriversInformationCard,
    OfficerDetailsCard,
    ReturnOfLicenceCard,
    VehicleInformationCard,
    VehicleImpoundmentCard
  },
  computed: {
    ...mapGetters(["getXdfFileNameString", "getPDFTemplateFileName", "getXFDF", "getAttributeValue"]),
  },
  methods: {
    ...mapMutations(["stopEditingCurrentForm"]),
    saveAndPrint(pdf_template_filepath) {
      console.log("inside saveAndPrint() " + pdf_template_filepath)
      const xml_file = this.getXFDF(pdf_template_filepath);
      console.log('success generateXFDF()', xml_file)
      const href = window.URL.createObjectURL(xml_file); //create the download url
      const downloadElement = document.createElement("a");
      downloadElement.href = href;
      downloadElement.download =  this.getXdfFileNameString;
      document.body.appendChild(downloadElement);
      downloadElement.click(); //click to file
      document.body.removeChild(downloadElement); //remove the element
      window.URL.revokeObjectURL(href); //release the object  of the blob
      this.$store.dispatch("saveCurrentFormToDB")
      this.$bvModal.show('printConfirmationModal')
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