<template>
  <form-container title="Notice of 24 Hour Licence Prohibition">
    <form-step :step_number=1>
      <drivers-information-card></drivers-information-card>
      <vehicle-information-card></vehicle-information-card>
      <vehicle-owner-card></vehicle-owner-card>
      <vehicle-impoundment-card></vehicle-impoundment-card>
      <return-of-licence-card></return-of-licence-card>
      <prohibition-information-card></prohibition-information-card>
      <reasonable-grounds-card></reasonable-grounds-card>
      <test-administered-alcohol-card v-if="isPrescribedTestUsed && isProhibitionTypeAlcohol"></test-administered-alcohol-card>
      <test-administered-drugs-card v-if="isPrescribedTestUsed && isProhibitionTypeDrugs"></test-administered-drugs-card>
      <officer-details-card></officer-details-card>

    </form-step>
    <form-step :step_number=2>
      <drivers-information-card :is-read-only=true></drivers-information-card>
      <vehicle-information-card :is-read-only=true></vehicle-information-card>
      <vehicle-owner-card :is-read-only=true></vehicle-owner-card>
      <vehicle-impoundment-card :is-read-only=true></vehicle-impoundment-card>
      <return-of-licence-card :is-read-only=true></return-of-licence-card>
      <prohibition-information-card :is-read-only=true></prohibition-information-card>
      <reasonable-grounds-card :is-read-only=true></reasonable-grounds-card>
      <test-administered-alcohol-card
          v-if="isPrescribedTestUsed && isProhibitionTypeAlcohol"
          :is-read-only="true"></test-administered-alcohol-card>
      <test-administered-drugs-card
          v-if="isPrescribedTestUsed && isProhibitionTypeDrugs"
          :is-read-only="true"></test-administered-drugs-card>
      <officer-details-card :is-read-only=true></officer-details-card>

      <form-card title="Print and Serve" border_class="border-primary">
        <p>You've entered sufficient information to print and serve the 24 hour prohibition.</p>
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
    <supplementary-modal id="SupplementaryModal" title="SupplementaryModal"></supplementary-modal>
  </form-container>
</template>

<script>

import FormsCommon from "@/components/forms/FormsCommon";
import { mapMutations, mapGetters, mapActions } from 'vuex';

import VehicleInformationCard from "@/components/forms/TwentyFourHourProhibition/VehicleInformationCard";
import VehicleImpoundmentCard from "@/components/forms/TwentyFourHourProhibition/VehicleImpoundmentCard";
import DriversInformationCard from "@/components/forms/TwentyFourHourProhibition/DriversInformationCard";
import ReturnOfLicenceCard from "@/components/forms/ReturnOfLicenceCard";
import ProhibitionInformationCard from "@/components/forms/TwentyFourHourProhibition/ProhibitionInformationCard";
import ReasonableGroundsCard from "@/components/forms/TwentyFourHourProhibition/ReasonableGroundsCard";
import TestAdministeredAlcoholCard from "@/components/forms/TwentyFourHourProhibition/TestAdministeredAlcoholCard";
import TestAdministeredDrugsCard from "@/components/forms/TwentyFourHourProhibition/TestAdministeredDrugsCard";
import SupplementaryModal from "@/components/forms/TwentyFourHourProhibition/SupplementaryModal";
import OfficerDetailsCard from "@/components/forms/TwentyFourHourProhibition/OfficerDetailsCard";
import VehicleOwnerCard from "@/components/forms/TwentyFourHourProhibition/VehicleOwnerCard";
import PrintConfirmationModal from "@/components/forms/TwentyFourHourProhibition/PrintConfirmationModal";
import {store} from "@/store/store";


export default {
  name: "TwentyFourHourProhibition",
  components: {
    VehicleOwnerCard,
    TestAdministeredAlcoholCard,
    TestAdministeredDrugsCard,
    ReasonableGroundsCard,
    ProhibitionInformationCard,
    SupplementaryModal,
    VehicleImpoundmentCard, VehicleInformationCard,
    DriversInformationCard, ReturnOfLicenceCard,
    OfficerDetailsCard, PrintConfirmationModal
  },
  mixins: [FormsCommon],
  computed: {
    ...mapGetters(["getAttributeValue", "isPlateJurisdictionBC", "getCurrentlyEditedFormObject",
      "corporateOwner", "getXdfFileNameString", "getPDFTemplateFileName", "getXFDF", "getCurrentFormData"]),
    isProhibitionTypeDrugs() {
      return this.getAttributeValue('prohibition_type') === "Drugs 215(3)";
    },
    isProhibitionTypeAlcohol() {
      return this.getAttributeValue('prohibition_type') === "Alcohol 215(2)";
    },
    isPrescribedTestUsed() {
      return this.getAttributeValue('prescribed_device').substr(0,3) === "Yes";
    },

  },
  methods: {
    ...mapActions(["saveDoNotPrint", "fetchStaticLookupTables", "saveCurrentFormToDB"]),
    ...mapMutations(["stopEditingCurrentForm"]),

    saveAndPrint(pdf_template_filepath) {
      console.log("inside saveAndPrint() " + pdf_template_filepath)
      let form_object = this.getCurrentlyEditedFormObject
      store.dispatch("saveCurrentFormToDB", form_object)
      const xml_file = this.getXFDF(pdf_template_filepath);
      console.log('success generateXFDF()', xml_file, form_object)
      const href = window.URL.createObjectURL(xml_file); //create the download url
      const downloadElement = document.createElement("a");
      downloadElement.href = href;
      downloadElement.download =  this.getXdfFileNameString(form_object);
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