<template>
  <div id="app" class="card border-0 ml-4 mr-4">
    <div id="roadsafety-header" class="card-header">
            <div class="d-flex justify-content-between">
              <img width="300px" src="/assets/BCID_RoadSafetyBC_logo_transparent.png" >
              <div class="d-flex align-items-end flex-column">
                <div class="font-weight-bold text-warning">DRAFT <span class="text-light small">{{ getAppVersion }}</span></div>
                <div class="mt-auto small">User: {{ getKeycloakUsername }}</div>
              </div>
            </div>
    </div>
    <div class="card-body">
      <offline-banner v-if="isNetworkOnline"></offline-banner>
      <component v-if="isFormBeingEdited" :data="getCurrentlyEditedFormData"
                 :is="getSelectedFormComponent" :name="getCurrentlyEditedFormObject.form_type">
      </component>
      <recent-prohibitions v-if="isRecentProhibitions && ! isFormBeingEdited"></recent-prohibitions>
      <issue-prohibitions v-if=" ! isFormBeingEdited"></issue-prohibitions>
      <prohibition-search v-if=" ! isFormBeingEdited"></prohibition-search>
      <feedback-welcome v-if=" ! isFormBeingEdited"></feedback-welcome>
      <div class="card-footer bg-transparent border-0 text-muted small">Version: {{ getAppVersion }}</div>
    </div>
  </div>
</template>

<script>

import OfflineBanner from "./components/OffineBanner.vue"
import IssueProhibitions from "@/components/IssueProhibitions";
import TwelveHourProhibition from "@/components/forms/TwelveHourSuspension/TwelveHourProhibition";
import TwentyFourHourProhibition from "@/components/forms/TwentyFourHourProhibition/TwentyFourHourProhibition";
import ImmediateRoadsideProhibition from "@/components/forms/ImmediateRoadsideProhibition";
import FeedbackWelcome from "@/components/FeedbackWelcome";
import ProhibitionSearch from "@/components/ProhibitionSearch";
import RecentProhibitions from "@/components/RecentProhibitions";
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: 'App',
  components: {
    RecentProhibitions,
    ProhibitionSearch,
    FeedbackWelcome,
    OfflineBanner,
    IssueProhibitions,
    TwelveHourProhibition,
    TwentyFourHourProhibition,
    ImmediateRoadsideProhibition
  },
  computed: {
    ...mapGetters(['getAppVersion', 'isFormBeingEdited',"getSelectedFormComponent",
      "getCurrentlyEditedFormObject","isRecentProhibitions","isNetworkOnline",
      "getCurrentlyEditedFormData", "getKeycloakUsername"]),
  },

  methods: {
    ...mapMutations(["networkOffline","networkBackOnline"])
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: large;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: lightgray;
  margin-top: 60px;
}

.form-check {
    display: flex;
    align-items: center;
}
.form-check-label {
    margin-left: 10px;
}
.form-check .form-check-input[type=checkbox] {
    border-radius: .25em;
    height: 1.3em;
    width: 1.3em;
}
.form-check .form-check-input[type=radio] {
    border-radius: 25%;
    height: 1.3em;
    width: 1.3em;
}
.form-switch .form-check-input[type=checkbox] {
    border-radius: 1.3em;
    height: 1.3em;
    width: 1.3em;
}

.form-group label {
  font-size: medium;
  color: #343a40;
}

#roadsafety-header {
  background-color: #003366;

}

.row {
  margin: 0.5em 0.5em 0.5em 0.5em;
  padding: 0.5em 0.5em 0.5em 0.5em;
  vertical-align: center;

}

.lightgray {
    background-color: lightgray;
  }
.prohibition_number {
  color: red;
}

</style>
