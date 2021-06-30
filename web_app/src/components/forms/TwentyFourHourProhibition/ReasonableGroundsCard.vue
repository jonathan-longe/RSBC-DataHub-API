<template>
<form-card title="Reasonable Grounds">
  <div v-if="! isReadOnly">
    <div v-if="isProhibitionTypeSelected">
      <form-row>
        <radio-field id="operating_grounds" fg_class="col-sm-12"
                     :options='["Witnessed by officer", "Admission by driver", "Independent witness", "Other"]'>
          The driver was operating a motor vehicle or had care and
          control of a motor vehicle for the purposes of MVA section 215(1) based on:
        </radio-field>
      </form-row>
      <form-row v-if="isOperatingGroundsOther">
        <text-field id="operating_ground_other" fg_class="col-sm-12">Other</text-field>
      </form-row>
      <form-row>
        <radio-field id="prescribed_device" fg_class="col-sm-12"
                     :options='["Yes",
                     "No, opinion formed the driver was affected by alcohol and/or drugs",
                     "No, refused by driver"]'>Was a prescribed test used to form reasonable grounds?
        </radio-field>
      </form-row>
    </div>
  </div>
  <div v-if="isReadOnly">
    <read-only-element id="operating_grounds">Grounds</read-only-element>
    <read-only-element id="operating_ground_other">Grounds other</read-only-element>
    <read-only-element id="prescribed_device">Prescribed device</read-only-element>
  </div>
</form-card>
</template>

<script>
import CardsCommon from "@/components/forms/TwentyFourHourProhibition/CardsCommon";

export default {
  name: "ReasonableGroundsCard",
  mixins: [CardsCommon],
  computed: {
    isProhibitionTypeSelected() {
      return this.getAttributeValue('prohibition_type').length > 0;
    },
    isOperatingGroundsOther() {
      return this.getAttributeValue('operating_grounds') === "Other";
    },
  }
}
</script>

<style scoped>

</style>