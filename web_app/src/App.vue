<template>
  <div id="app" class="container">
    <div class="row">
      <div class="card w-100">
        <div id="header" class="card-body">
          <div class="card-title">
            <div class="d-flex flex-row">
              <img width="300px" src="@/assets/BCID_RoadSafetyBC_logo_transparent.png" >
              <div class="ml-auto">
                <button class="btn btn-primary" disabled>Login</button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
    <offline-banner></offline-banner>
    <issue-prohibitions></issue-prohibitions>
    <component :is="selectedForm.component"></component>

  </div>
</template>

<script>

import OfflineBanner from "./components/OffineBanner.vue"
import IssueProhibitions from "@/components/IssueProhibitions";
import TwelveTwentyFour from "@/components/forms/TwelveTwentyFour";
import ImmediateRoadsideProhibition from "@/components/forms/ImmediateRoadsideProhibition";

export default {
  name: 'App',
  components: {
    OfflineBanner,
    IssueProhibitions,
    TwelveTwentyFour,
    ImmediateRoadsideProhibition
  },
  computed: {
      isFormSelected() {
        return this.$store.getters.isFormSelected;
      },
      selectedForm() {
        return this.$store.getters.getCurrentForm;
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

#header {
  background-color: #003366;

}

.row {
  margin: 0.5em 0.5em 0.5em 0.5em;
  padding: 0.5em 0.5em 0.5em 0.5em;
  vertical-align: center;

}

</style>
