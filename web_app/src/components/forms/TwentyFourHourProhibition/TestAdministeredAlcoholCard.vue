<template>
<form-card title="Test Administered - Alcohol 215(2)">
  <div v-if="! isReadOnly">
    <shadow-box>
      <form-row>
        <check-field :show_label="false"  id="test_administered_asd" fg_class="col-sm-6"
                     :options='["Alco-Sensor FST (ASD)"]'>Test Administered</check-field>
        <date-field v-if="isTestAdministeredASD" id="asd_expiry_date" fg_class="col-sm-6" rules="notExpired">ASD expiry date</date-field>
        <radio-field v-if="isTestAdministeredASD" id="result_alcohol" fg_class="col-sm-12"
                     :options='["51-99 mg%", "Over 99 mg%"]'>Result</radio-field>
      </form-row>
    </shadow-box>
    <shadow-box>
      <form-row>
        <check-field :show_label="false"  id="test_administered_instrument" fg_class="col-sm-6"
                     :options='["Approved Instrument"]'></check-field>
      </form-row>
      <form-row>
        <check-field v-if="isTestAdministeredApprovedInstrument" id="result_alcohol_approved_instrument" fg_class="col-sm-2"
                     :options='["BAC"]'>Result</check-field>
        <text-field v-if="isTestAdministeredApprovedInstrument" id="test_result_bac" fg_class="col-sm-10"></text-field>
      </form-row>
    </shadow-box>
  </div>
  <div v-if="isReadOnly">
      <read-only-element id="test_administered_asd">Test Administered ASD</read-only-element>
      <read-only-element id="asd_expiry_date">ASD expiry date</read-only-element>
      <read-only-element id="result_alcohol">Result Alcohol</read-only-element>

      <read-only-element id="test_administered_instrument">Test Administered Approved Instrument</read-only-element>
      <read-only-element id="result_alcohol_approved_instrument">Approved instrument</read-only-element>
      <read-only-element  id="test_result_bac">BAC Result</read-only-element>
  </div>
</form-card>
</template>

<script>
import CardsCommon from "@/components/forms/TwentyFourHourProhibition/CardsCommon";

export default {
  name: "OfficersReport",
  mixins: [CardsCommon],
  computed: {
    isTestAdministeredASD() {
      const root = this.getAttributeValue('test_administered_asd')
      console.log('test_administered', root)
      if (Array.isArray(root)) {
        return root.includes("Alco-Sensor FST (ASD)")
      }
      return false;
    },
    isTestAdministeredApprovedInstrument() {
      const root = this.getAttributeValue('test_administered_instrument')
      console.log('test_administered', root)
      if (Array.isArray(root)) {
        return root.includes("Approved Instrument")
      }
      return false;
    }
  }
}
</script>

<style scoped>

</style>