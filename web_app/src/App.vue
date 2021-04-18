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
    <offline-banner v-if="isNetworkOffline"></offline-banner>
    <component v-if="isFormBeingEdited" :questions="getSelectedForm.questions"
               :prohibition_number="getSelectedForm.prohibition_number"
               :is="getSelectedFormComponent">
    </component>
    <recent-prohibitions v-if="isRecentProhibitions && ! isFormBeingEdited"></recent-prohibitions>
    <issue-prohibitions v-if=" ! isFormBeingEdited"></issue-prohibitions>
    <prohibition-search v-if=" ! isFormBeingEdited"></prohibition-search>
    <feedback-welcome v-if=" ! isFormBeingEdited"></feedback-welcome>


  </div>
</template>

<script>

import OfflineBanner from "./components/OffineBanner.vue"
import IssueProhibitions from "@/components/IssueProhibitions";
import TwelveTwentyFour from "@/components/forms/TwelveTwentyFour";
import ImmediateRoadsideProhibition from "@/components/forms/ImmediateRoadsideProhibition";
import FeedbackWelcome from "@/components/FeedbackWelcome";
import ProhibitionSearch from "@/components/ProhibitionSearch";
import RecentProhibitions from "@/components/RecentProhibitions";

export default {
  name: 'App',
  components: {
    RecentProhibitions,
    ProhibitionSearch,
    FeedbackWelcome,
    OfflineBanner,
    IssueProhibitions,
    TwelveTwentyFour,
    ImmediateRoadsideProhibition
  },
  computed: {
     isFormBeingEdited() {
       return this.$store.getters.isFormBeingEdited;
     },
     getSelectedFormComponent() {
       return this.$store.getters.getSelectedFormComponent;
     },
     getSelectedForm() {
       return this.$store.getters.getCurrentlyEditedForm;
     },
     isRecentProhibitions() {
       return this.$store.getters.isRecentProhibitions;
     },
     isNetworkOffline() {
       return this.$store.getters.isNetworkOnline === false
     }

  },

  methods: {
      offline() {
        console.log("we are now offline")
        this.$store.commit("networkOffline")
      },

      online() {
        console.log("we are now online")
        this.$store.commit("networkBackOnline")
      }
  },

  created: function () {
      window.addEventListener('offline', this.offline);
      window.addEventListener('online', this.online);
  },

  destroyed: function () {
      window.removeEventListener('offline', this.offline);
      window.removeEventListener('online', this.online);
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
