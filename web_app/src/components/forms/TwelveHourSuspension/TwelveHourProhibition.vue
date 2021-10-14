<template>
  <form-container title="Notice of 12 Hour Licence Suspension">

      <drivers-information-card></drivers-information-card>
      <vehicle-information-card></vehicle-information-card>
      <return-of-licence-card></return-of-licence-card>
      <vehicle-impoundment-card></vehicle-impoundment-card>
      <prohibition-information-card></prohibition-information-card>
      <officer-details-card></officer-details-card>
      <document-download-container></document-download-container>
  </form-container>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";
import FormsCommon from "@/components/forms/FormsCommon";
import DriversInformationCard from "@/components/forms/TwelveHourSuspension/DriversInformationCard";
import ReturnOfLicenceCard from "@/components/forms/ReturnOfLicenceCard";
import OfficerDetailsCard from "@/components/forms/TwelveHourSuspension/OfficerDetailsCard";
import VehicleInformationCard from "@/components/forms/TwelveHourSuspension/VehicleInformationCard";
import ProhibitionInformationCard from "@/components/forms/TwelveHourSuspension/ProhibitionInformationCard";
import VehicleImpoundmentCard from "@/components/forms/TwelveHourSuspension/VehicleImpoundmentCard";
import DocumentDownloadContainer from "@/components/forms/DocumentDownloadContainer";
import {store} from "@/store/store";

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
    DocumentDownloadContainer
  },
  computed: {
    ...mapGetters(["getPdfFileNameString", "getPDFTemplateFileName",
       "getAttributeValue", "getCurrentlyEditedFormObject"]),
  },
  methods: {
    ...mapMutations(["stopEditingCurrentForm"]),
    ...mapActions(["saveCurrentFormToDB", "createPDF"]),

    saveAndPrint(pdf_template_filepath) {
      console.log("inside saveAndPrint() " + pdf_template_filepath)
      let form_object = this.getCurrentlyEditedFormObject
      store.dispatch("saveCurrentFormToDB", form_object)
      const xml_file = this.getXFDF(pdf_template_filepath);
      console.log('success generateXFDF()', xml_file)
      const href = window.URL.createObjectURL(xml_file); //create the download url
      const downloadElement = document.createElement("a");
      downloadElement.href = href;
      downloadElement.download =  this.getPdfFileNameString(form_object);
      document.body.appendChild(downloadElement);
      downloadElement.click(); //click to file
      document.body.removeChild(downloadElement); //remove the element
      window.URL.revokeObjectURL(href); //release the object  of the blob
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