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

    </form-step>
    <form-step :step_number=3>
      <document-download-container></document-download-container>
    </form-step>
    <print-confirmation-modal id="printConfirmationModal" title="printConfirmation"></print-confirmation-modal>
    <supplementary-modal id="SupplementaryModal" title="SupplementaryModal"></supplementary-modal>
  </form-container>
</template>

<script>

import FormsCommon from "@/components/forms/FormsCommon";
import { mapGetters } from 'vuex';

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
import DocumentDownloadContainer from "@/components/forms/TwentyFourHourProhibition/DocumentDownloadContainer";


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
    OfficerDetailsCard, PrintConfirmationModal,
    DocumentDownloadContainer
  },
  mixins: [FormsCommon],
  computed: {
    ...mapGetters(["getAttributeValue", "isPlateJurisdictionBC", "getCurrentlyEditedFormObject",
      "corporateOwner", "getPdfFileNameString", "createPDF", "getCurrentFormData"]),
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