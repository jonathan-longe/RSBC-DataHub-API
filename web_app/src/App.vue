<template>
  <div id="app" class="container">
    <div class="row">
      <div id="header" class="card w-100">
          <div class="card-title">
            <div class="d-flex flex-row pt-3 pl-3 pr-3">
              <img width="300px" src="@/assets/BCID_RoadSafetyBC_logo_transparent.png" >
            </div>
          </div>
      </div>
    </div>
    <offline-banner v-if="false"></offline-banner>
    <component v-if="getSelectedFormComponent !== null" :questions="getSelectedForm.questions"
               :unique_prohibition_number="getUniqueProhibitionNumber"
               :is="getSelectedFormComponent">
    </component>
    <issue-prohibitions v-if="getSelectedFormComponent == null"></issue-prohibitions>
    <prohibition-search v-if="getSelectedFormComponent == null"></prohibition-search>
    <feedback-welcome v-if="getSelectedFormComponent == null"></feedback-welcome>


  </div>
</template>

<script>

import OfflineBanner from "./components/OffineBanner.vue"
import IssueProhibitions from "@/components/IssueProhibitions";
import TwelveTwentyFour from "@/components/forms/TwelveTwentyFour";
import ImmediateRoadsideProhibition from "@/components/forms/ImmediateRoadsideProhibition";
import FeedbackWelcome from "@/components/FeedbackWelcome";
import ProhibitionSearch from "@/components/ProhibitionSearch";

import { ulid } from 'ulid'

export default {
  name: 'App',
  components: {
    ProhibitionSearch,
    FeedbackWelcome,
    OfflineBanner,
    IssueProhibitions,
    TwelveTwentyFour,
    ImmediateRoadsideProhibition
  },
  computed: {
     isFormSelected() {
       return this.$store.getters.isFormSelected;
     },
     getSelectedFormComponent() {
       return this.$store.getters.getSelectedFormComponent;
     },
     getSelectedForm() {
       return this.$store.getters.getSelectedForm;
     },
     getUniqueProhibitionNumber() {
       return ulid()
     }

  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: lightgray;
  margin-top: 60px;
}

#header.card {
  background-color: #003366;

}

.row {
  margin: 0.5em 0.5em 0.5em 0.5em;
  padding: 0.5em 0.5em 0.5em 0.5em;
  vertical-align: center;

}

</style>
