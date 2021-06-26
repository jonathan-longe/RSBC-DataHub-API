<template>
<form-card v-if="isPrescribedTestUsed" :title="testAdministeredTitle">
  <shadow-box v-if="isProhibitionTypeAlcohol">
    <form-row>
      <check-field :show_label="false"  id="test_administered" fg_class="col-sm-6"
                   :options='["Alco-Sensor FST (ASD)"]'>Test Administered</check-field>
      <date-field v-if="isProhibitionTypeAlcohol && isTestAdministeredASD" id="asd_expiry_date" fg_class="col-sm-6" rules="notExpired">ASD expiry date</date-field>
      <radio-field v-if="isProhibitionTypeAlcohol && isTestAdministeredASD" id="result_alcohol" fg_class="col-sm-12"
                   :options='["51-99 mg%", "Over 99 mg%"]'>Result</radio-field>
    </form-row>
  </shadow-box>
  <shadow-box v-if="isProhibitionTypeAlcohol && isPrescribedTestUsed">
    <form-row>
      <check-field :show_label="false"  id="test_administered" fg_class="col-sm-6"
                   :options='["Approved Instrument"]'></check-field>
    </form-row>
    <form-row>
      <check-field v-if="isTestAdministeredApprovedInstrument" id="result_alcohol_approved_instrument" fg_class="col-sm-2"
                   :options='["BAC"]'>Result</check-field>
      <text-field v-if="isTestAdministeredApprovedInstrument" id="test_result_bac" fg_class="col-sm-10"></text-field>
    </form-row>
  </shadow-box>
  <shadow-box v-if="isProhibitionTypeDrugs">
    <form-row>
      <check-field :show_label="false" id="test_administered" fg_class="col-sm-6"
                   :options='["Approved Drug Screening Equipment"]'>Test Administered
      </check-field>
    </form-row>
    <form-row>
      <check-field v-if="isTestAdministeredADSE" id="positive_adse" fg_class="col-sm-6"
                   :options='["THC", "Cocaine"]'>Test result</check-field>
      <date-time v-if="isTestAdministeredADSE" id="time_of_physical_test_adse" fg_class="col-sm-6">Time of test</date-time>
    </form-row>
  </shadow-box>
  <shadow-box v-if="isProhibitionTypeDrugs && isPrescribedTestUsed">
    <form-row>
      <check-field :show_label="false" id="test_administered" fg_class="col-sm-6"
                   :options='["Prescribed Physical Coordination Test (SFST)"]'>&nbsp;
      </check-field>
      <date-time v-if="isTestAdministeredSFST" id="time_of_physical_test_sfst" fg_class="col-sm-6">Time of test</date-time>
    </form-row>
  </shadow-box>
  <shadow-box v-if="isProhibitionTypeDrugs && isPrescribedTestUsed">
    <form-row>
      <check-field :show_label="false" id="test_administered" fg_class="col-sm-6"
                   :options='["Prescribed Physical Coordination Test (DRE)"]'>&nbsp;
      </check-field>
    </form-row>
    <form-row v-if="isTestAdministeredDRE">
      <date-time id="start_time_of_physical_test_dre" fg_class="col-sm-6">Time of opinion</date-time>
      <text-field id="positive_dre" fg_class="col-sm-12">Notes (expand to 3 lines)</text-field>

    </form-row>
  </shadow-box>
  <form-row v-if="isPrescribedTestUsed && isProhibitionTypeDrugs">
      <check-field id="result_drug_sfst" fg_class="col-sm-12"
                   :options='["Ability to drive affected by a drug"]'><strong>Result</strong></check-field>
    </form-row>
</form-card>
</template>

<script>
import CardsCommon from "@/components/forms/TwentyFourHourProhibition/CardsCommon";

export default {
  name: "OfficersReport",
  mixins: [CardsCommon],
  computed: {
    isProhibitionTypeSelected() {
      return this.getAttributeValue('prohibition_type').length > 0;
    },
    isProhibitionTypeDrugs() {
      return this.getAttributeValue('prohibition_type') === "Drugs 215(3)";
    },
    isProhibitionTypeAlcohol() {
      return this.getAttributeValue('prohibition_type') === "Alcohol 215(2)";
    },
    isOperatingGroundsOther() {
      return this.getAttributeValue('operating_grounds') === "Other";
    },
    isPrescribedTestUsed() {
      return this.getAttributeValue('prescribed_device').substr(0,3) === "Yes";
    },
    isTestAdministeredASD() {
      const root = this.getAttributeValue('test_administered')
      console.log('test_administered', root)
      if (Array.isArray(root)) {
        return root.includes("Alco-Sensor FST (ASD)")
      }
      return false;
    },
    isTestAdministeredApprovedInstrument() {
      const root = this.getAttributeValue('test_administered')
      console.log('test_administered', root)
      if (Array.isArray(root)) {
        return root.includes("Approved Instrument")
      }
      return false;
    },
    isTestAdministeredADSE() {
      const root = this.getAttributeValue('test_administered')
      console.log('test_administered', root)
      if (Array.isArray(root)) {
        return root.includes("Approved Drug Screening Equipment")
      }
      return false;
    },
    isTestAdministeredSFST() {
      const root = this.getAttributeValue('test_administered')
      console.log('test_administered', root)
      if (Array.isArray(root)) {
        return root.includes("Prescribed Physical Coordination Test (SFST)")
      }
      return false;
    },
    isTestAdministeredDRE() {
      const root = this.getAttributeValue('test_administered')
      console.log('test_administered', root)
      if (Array.isArray(root)) {
        return root.includes("Prescribed Physical Coordination Test (DRE)")
      }
      return false;
    },
    testAdministeredTitle() {
      return "Test Administered - " + this.getAttributeValue('prohibition_type')
    }
  }
}
</script>

<style scoped>

</style>