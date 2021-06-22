<template>
<form-card title="Prohibition">
  <div v-if="! isReadOnly">
    <form-row>
      <radio-field id="prohibition_type" fg_class="col-sm-6"
                   :options='["Alcohol 215(2)", "Drugs 215(3)"]'>Type of Prohibition</radio-field>
    </form-row>
    <form-row>
      <text-field id="offence_address" fg_class="col-sm-8">Intersection or Address of Offence</text-field>
      <type-ahead-field id="offence_city" fg_class="col-sm-4" :suggestions="getArrayOfBCCityNames" rules="required">City</type-ahead-field>
    </form-row>
    <form-row>
      <text-field id="agency" fg_class="col-sm-2">Agency</text-field>
      <text-field id="file_number" fg_class="col-sm-3">File Number</text-field>
      <date-time id="prohibition_start_time" fg_class="col-sm-7">
        Time of driving, care or control
      </date-time>
    </form-row>
  </div>
  <div v-if="isReadOnly">
    <read-only-element id="prohibition_type">Prohibition Type</read-only-element>
    <read-only-element id="offence_address">Location of offence</read-only-element>
    <read-only-element id="agency">Agency</read-only-element>
    <read-only-element id="file_number">File number</read-only-element>
    <read-only-element id="prohibition_start_time">Time of driving, care or control</read-only-element>
  </div>
</form-card>
</template>

<script>
import CardsCommon from "@/components/cards/CardsCommon";

export default {
  name: "ProhibitionInformationCard",
  mixins: [CardsCommon]
}
</script>

<style scoped>

</style>