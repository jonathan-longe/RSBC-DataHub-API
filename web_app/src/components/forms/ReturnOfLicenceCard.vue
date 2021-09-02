<template>
  <div>
    <div v-if="! isReadOnly">
      <form-card title="Return of driver's licence">
        <form-row>
          <radio-field id="licence_surrendered" fg_class="col-sm-12" :options='["Yes", "No"]'>Licence surrendered at roadside?</radio-field>
        </form-row>
        <form-row v-if="isLicenceSurrendered">
          <radio-field id="return_of_licence" fg_class="col-sm-12" :options='["By mail", "Pickup in person"]'>How will licence be returned?</radio-field>
        </form-row>
        <form-row v-if="licencePickupInPerson && isLicenceSurrendered">
          <type-ahead-field id="pickup_address" :suggestions="getArrayOfPickupLocations" fg_class="col-sm-6">
            Pickup address and city
            <a @mouseover="display_tooltip = true" @mouseleave="display_tooltip = false"><b-icon-question-circle text="pickup locations can be added to this list"></b-icon-question-circle></a>
          </type-ahead-field>
        </form-row>
        <form-row v-if="display_tooltip">
          <p class="col-sm-6 text-muted small">Begin typing the address where drivers can pickup their licence.
            Email {{ getRoadSafetyEmailAddress }} to have pickup addresses added or removed from the list.</p>
        </form-row>
      </form-card>
    </div>
    <div v-if="isReadOnly">
      <form-card title="Return of driver's licence">
        <read-only-element id="licence_surrendered">Licence surrendered</read-only-element>
        <read-only-element id="return_of_licence">How will licence be returned</read-only-element>
        <read-only-element id="pickup_address">Pickup Address</read-only-element>
      </form-card>
    </div>
  </div>


</template>

<script>
import CardsCommon from "@/components/forms/CardsCommon";
import {mapGetters} from "vuex";

export default {
  name: "ReturnOfLicenceCard",
  mixins: [CardsCommon],
  data() {
    return {
      display_tooltip: false
    }
  },
  computed: {
    ...mapGetters(["getArrayOfPickupLocations", "getRoadSafetyEmailAddress"]),
    licencePickupInPerson() {
      return this.getAttributeValue('return_of_licence') === "Pickup in person";
    },
    isLicenceSurrendered() {
      return this.getAttributeValue('licence_surrendered') === "Yes";
    },
  },
  methods: {
    toggleToolTip() {
      this.display_tooltip = true
    }
  }
}
</script>

<style scoped>

</style>