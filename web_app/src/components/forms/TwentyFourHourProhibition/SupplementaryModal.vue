<template>
  <div>
    <b-modal id="SupplementaryModal" hide-footer hide-header>
      <after-prohibition-was-served></after-prohibition-was-served>
      <div class="d-flex flex-row justify-content-center">
        <b-button class="mt-3" variant="success" @click="finish" >Finish</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>

import {mapMutations} from 'vuex';
import AfterProhibitionWasServed from "@/components/forms/TwentyFourHourProhibition/AfterProhibitionWasServed";

export default {
  name: "SupplementaryModal",
  components: {AfterProhibitionWasServed},
  methods: {
      ...mapMutations(["stopEditingCurrentForm"]),
      finish() {
        this.$store.dispatch("saveCurrentFormToDB")
        this.stopEditingCurrentForm();
        this.$bvModal.hide('SupplementaryModal')
      },

    }
}
</script>