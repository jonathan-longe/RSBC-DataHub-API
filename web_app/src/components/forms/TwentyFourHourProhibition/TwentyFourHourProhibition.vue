<template>
  <form-container title="Notice of 24 Hour Licence Prohibition" v-if="isMounted">
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
      <document-download-container></document-download-container>
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
import OfficerDetailsCard from "@/components/forms/TwentyFourHourProhibition/OfficerDetailsCard";
import VehicleOwnerCard from "@/components/forms/TwentyFourHourProhibition/VehicleOwnerCard";
import DocumentDownloadContainer from "@/components/forms/DocumentDownloadContainer";


export default {
  name: "TwentyFourHourProhibition",
  components: {
    VehicleOwnerCard,
    TestAdministeredAlcoholCard,
    TestAdministeredDrugsCard,
    ReasonableGroundsCard,
    ProhibitionInformationCard,
    VehicleImpoundmentCard, VehicleInformationCard,
    DriversInformationCard, ReturnOfLicenceCard,
    OfficerDetailsCard,
    DocumentDownloadContainer
  },
  mixins: [FormsCommon],
  computed: {
    ...mapGetters(["getAttributeValue", "isPlateJurisdictionBC", "getCurrentlyEditedFormData",
      "corporateOwner", "getPdfFileNameString"]),
    isProhibitionTypeDrugs() {
      return this.getAttributeValue('prohibition_type') === "Drugs 215(3)";
    },
    isProhibitionTypeAlcohol() {
      return this.getAttributeValue('prohibition_type') === "Alcohol 215(2)";
    },
    isPrescribedTestUsed() {
      return this.getAttributeValue('prescribed_device').substr(0,3) === "Yes";
    }
  },
  props: {
    name: {
      type: String,
      default: '24Hour'
    }
  },
  mounted() {
    let payload = {form_type: this.name, form_id: this.id}
    this.editExistingForm(payload)
    this.setNewFormDefaults(payload)
    this.data = this.getCurrentlyEditedFormData
    this.isMounted = true
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