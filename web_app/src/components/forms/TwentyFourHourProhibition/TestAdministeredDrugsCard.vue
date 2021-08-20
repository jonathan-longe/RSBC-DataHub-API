<template>
<form-card title="Test Administered - Drugs 215(3)">
  <div v-if="! isReadOnly">
    <shadow-box>
      <form-row>
        <check-field :show_label="false" id="test_administered_adse" fg_class="col-sm-6"
                     :options='["Approved Drug Screening Equipment"]'>Test Administered
        </check-field>
      </form-row>
      <form-row>
        <check-field v-if="isTestAdministeredADSE" id="positive_adse" fg_class="col-sm-6"
                     :options='["THC", "Cocaine"]'>Test result</check-field>
        <date-time v-if="isTestAdministeredADSE"
                   id="time_of_physical_test_adse"
                   rules="required|notFutureDt"
                   fg_class="col-sm-6">Time of test</date-time>
      </form-row>
    </shadow-box>
    <shadow-box>
      <form-row>
        <check-field :show_label="false" id="test_administered_sfst" fg_class="col-sm-6"
                     :options='["Prescribed Physical Coordination Test (SFST)"]'>&nbsp;
        </check-field>
        <date-time v-if="isTestAdministeredSFST"
                   id="time_of_physical_test_sfst"
                   rules="required|notFutureDt"
                   fg_class="col-sm-6">Time of test</date-time>
      </form-row>
    </shadow-box>
    <shadow-box>
      <form-row>
        <check-field :show_label="false" id="test_administered_dre" fg_class="col-sm-6"
                     :options='["Prescribed Physical Coordination Test (DRE)"]'>&nbsp;
        </check-field>
      </form-row>
      <form-row v-if="isTestAdministeredDRE">
        <date-time id="start_time_of_physical_test_dre"
                   rules="required|notFutureDt"
                   fg_class="col-sm-6">Time of opinion</date-time>
        <text-field id="positive_dre" fg_class="col-sm-12">Notes (expand to 3 lines)</text-field>

      </form-row>
    </shadow-box>
    <form-row>
        <check-field id="result_drug" fg_class="col-sm-12"
                     :options='["Ability to drive affected by a drug"]'><strong>Result</strong></check-field>
      </form-row>
  </div>
  <div v-if="isReadOnly">
        <read-only-element id="test_administered_adse">Test ADSE</read-only-element>
        <read-only-element id="positive_adse">Result ADSE</read-only-element>
        <read-only-element id="time_of_physical_test_adse">Time of ADSE</read-only-element>

        <read-only-element id="test_administered_sfst">Test SFST</read-only-element>
        <read-only-element id="time_of_physical_test_sfst">Time of SFST</read-only-element>

        <read-only-element  id="test_administered_dre" >Test DRE</read-only-element>
        <read-only-element id="start_time_of_physical_test_dre">Time of DRE</read-only-element>
        <read-only-element id="positive_dre">DRE Notes</read-only-element>

        <read-only-element id="result_drug">Conclusion</read-only-element>

  </div>
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
    isOperatingGroundsOther() {
      return this.getAttributeValue('operating_grounds') === "Other";
    },
    isPrescribedTestUsed() {
      return this.getAttributeValue('prescribed_device').substr(0,3) === "Yes";
    },

    isTestAdministeredADSE() {
      const root = this.getAttributeValue('test_administered_adse')
      console.log('test_administered', root)
      if (Array.isArray(root)) {
        return root.includes("Approved Drug Screening Equipment")
      }
      return false;
    },
    isTestAdministeredSFST() {
      const root = this.getAttributeValue('test_administered_sfst')
      console.log('test_administered', root)
      if (Array.isArray(root)) {
        return root.includes("Prescribed Physical Coordination Test (SFST)")
      }
      return false;
    },
    isTestAdministeredDRE() {
      const root = this.getAttributeValue('test_administered_dre')
      console.log('test_administered', root)
      if (Array.isArray(root)) {
        return root.includes("Prescribed Physical Coordination Test (DRE)")
      }
      return false;
    }
  }
}
</script>