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

import FormsCommon from "@/components/forms/FormsCommon";
import DriversInformationCard from "@/components/forms/TwelveHourSuspension/DriversInformationCard";
import ReturnOfLicenceCard from "@/components/forms/ReturnOfLicenceCard";
import OfficerDetailsCard from "@/components/forms/TwelveHourSuspension/OfficerDetailsCard";
import VehicleInformationCard from "@/components/forms/TwelveHourSuspension/VehicleInformationCard";
import ProhibitionInformationCard from "@/components/forms/TwelveHourSuspension/ProhibitionInformationCard";
import VehicleImpoundmentCard from "@/components/forms/TwelveHourSuspension/VehicleImpoundmentCard";
import DocumentDownloadContainer from "@/components/forms/DocumentDownloadContainer";

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