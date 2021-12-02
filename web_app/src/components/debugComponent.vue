<template>
    <div class="card-footer bg-transparent border-0 text-muted small">Version: {{ getAppVersion }}
      <span @click="toggleVisible" class="small text-muted">*</span>
      <div class="small text-muted" v-if="showDetails">
        <div>isUserHasAtLeastOneFormId: {{ isUserHasAtLeastOneFormId }}</div>
        <div>getArrayOfCommonCarColors.length: {{ getArrayOfCommonCarColors.length }}</div>
        <div>isUserAuthenticated: {{ isUserAuthenticated }}</div>
        <div>isUserAuthorized: {{ isUserAuthorized }}</div>
        <div>state.keycloak.ready: {{ $store.state.keycloak.ready }}</div>
        <div>state.isOnline: {{ $store.state.isOnline }}</div>
      </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "debugComponent",
  data() {
    return {
      showDetails: false
    }
  },
  methods: {
    toggleVisible() {
      this.showDetails = ! this.showDetails;
    }
  },
  computed: {
        ...mapGetters([
        "isUserHasAtLeastOneFormId",
        "getArrayOfCommonCarColors",
      'isRecentProhibitions',
      'getFormData',
      'isDisplayIssueProhibitions',
      'getCurrentlyEditedFormObject',
      'isDisplayUserNotAuthorizedBanner',
      'isDisplayFeedbackBanner',
      'isDisplaySearchRecentProhibition',
      'isDisplayWelcomeLoginCard',
            "getAppVersion",
            "isUserAuthenticated",
            "isUserAuthorized"
    ]),
  }
}
</script>

<style scoped>

</style>