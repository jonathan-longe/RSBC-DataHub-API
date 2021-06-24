<template>
  <form-container title="Notice of 24 Hour Licence Prohibition">
    <form-step :step_number=1>

      <licence-plate-card></licence-plate-card>
      <vehicle-information-card></vehicle-information-card>
      <vehicle-impoundment-card></vehicle-impoundment-card>
      <drivers-information-card></drivers-information-card>
      <vehicle-owner-card></vehicle-owner-card>
      <return-of-licence-card></return-of-licence-card>
      <prohibition-information-card></prohibition-information-card>

    </form-step>
    <form-step :step_number=2>
      <licence-plate-card :is-read-only=true></licence-plate-card>
      <vehicle-information-card :is-read-only=true></vehicle-information-card>
      <vehicle-impoundment-card :is-read-only=true></vehicle-impoundment-card>
      <drivers-information-card :is-read-only=true></drivers-information-card>
      <vehicle-owner-card :is-read-only=true></vehicle-owner-card>
      <return-of-licence-card :is-read-only=true></return-of-licence-card>
      <prohibition-information-card :is-read-only=true></prohibition-information-card>

      <form-card title="Print and Serve" border_class="border-primary">
        <p>You've entered sufficient information to print and serve the 24 hour prohibition.</p>
        <p>Once you click the download button below:</p>
        <ul>
          <li>the fields entered on the previous screen will be locked from further editing;</li>
          <li>a prohibition document will be created to serve the driver, and;</li>
          <li>if the vehicle is being impounded, an additional document will be created for
            the impound lot operator.</li>
        </ul>
        <p>The next section, "Office's Report", is required as evidence to support the charge.
          The information contained in the Officer's Report  is not provided to the driver
          unless the prohibition is appealed.</p>
        <p>You must print and serve the prohibition prior to completing the Officer's Report.</p>
        <div class="w-100 text-right">
          <button @click="saveAndPrint(getPDFTemplateFileName)" class="btn btn-outline-primary m-1">Download PDF</button>
        </div>

      </form-card>
    </form-step>

    <form-step :step_number=3>
      <reasonable-grounds-card></reasonable-grounds-card>
      <officers-report></officers-report>
    </form-step>
    <form-step :step_number=4>
      <form-card title="Prohibition Complete">
        <p>The Prohibition entered has been sent to RoadSafety and ICBC.  If you're offline, the
        data will be sent as soon as your computer is reconnected to the network.  Please keep this browser
        open until the prohibition has been sent.</p>
        <p class="w-100 text-right">
          <a class="btn btn-outline-primary" @click="stopEditingCurrentForm">Close</a>
        </p>
      </form-card>
    </form-step>

    <print-confirmation-modal id="printConfirmationModal" title="printConfirmation"></print-confirmation-modal>
  </form-container>
</template>

<script>

import FormsCommon from "@/components/forms/FormsCommon";
import { mapMutations, mapGetters, mapActions } from 'vuex';

import VehicleInformationCard from "@/components/cards/VehicleInformationCard";
import VehicleImpoundmentCard from "@/components/cards/VehicleImpoundmentCard";
import DriversInformationCard from "@/components/cards/DriversInformationCard";
import ReturnOfLicenceCard from "@/components/cards/ReturnOfLicenceCard";
import LicencePlateCard from "@/components/cards/LicencePlateCard";
import ProhibitionInformationCard from "@/components/cards/ProhibitionInformationCard";
import ReasonableGroundsCard from "@/components/cards/ReasonableGroundsCard";
import OfficersReport from "@/components/cards/OfficersReport";

export default {
  name: "TwentyFourHourProhibition",
  components: {
    OfficersReport,
    ReasonableGroundsCard,
    ProhibitionInformationCard,
    LicencePlateCard,
    VehicleImpoundmentCard, VehicleInformationCard, DriversInformationCard, ReturnOfLicenceCard},
  mixins: [FormsCommon],
  computed: {
    ...mapGetters(["getAttributeValue", "isPlateJurisdictionBC", "driverIsNotRegisteredOwner",
      "corporateOwner", "getXdfFileName", "getPDFTemplateFileName", "getXFDF", "getCurrentFormData"]),
  },
  methods: {
    ...mapActions(["saveDoNotPrint", "deleteSpecificForm"]),
    ...mapMutations(["markFormStatusAsServed", "saveFormsToLocalStorage", "generateXFDF", "stopEditingCurrentForm"]),

    saveAndPrint(pdf_template_filename) {
      console.log("inside saveAndPrint()" + pdf_template_filename)
      this.generateXFDF(pdf_template_filename);
      const xml_file = this.getXFDF;
      console.log('success generateXFDF()', xml_file)
      const href = window.URL.createObjectURL(xml_file); //create the download url
      const downloadElement = document.createElement("a");
      downloadElement.href = href;
      downloadElement.download =  pdf_template_filename;
      document.body.appendChild(downloadElement);
      downloadElement.click(); //click to file
      document.body.removeChild(downloadElement); //remove the element
      window.URL.revokeObjectURL(href); //release the object  of the blob
      this.saveFormsToLocalStorage();
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