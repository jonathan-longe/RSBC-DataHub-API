<template>
  <div>
    <user-not-permitted-banner v-if="isUserWithoutRole"></user-not-permitted-banner>
    <recent-prohibitions v-if="isRecentProhibitions"></recent-prohibitions>
    <issue-prohibitions></issue-prohibitions>
    <prohibition-search></prohibition-search>
    <feedback-welcome></feedback-welcome>
  </div>
</template>

<script>

import IssueProhibitions from "@/components/IssueProhibitions";
import FeedbackWelcome from "@/components/FeedbackWelcome";
import ProhibitionSearch from "@/components/ProhibitionSearch";
import RecentProhibitions from "@/components/RecentProhibitions";
import UserNotPermittedBanner from "@/components/UserNotPermittedBanner";
import {mapGetters} from "vuex";

export default {
  name: "Home.vue",
  components: {
     UserNotPermittedBanner,
     RecentProhibitions,
     ProhibitionSearch,
     FeedbackWelcome,
     IssueProhibitions
  },
  computed: {
    ...mapGetters(['isRecentProhibitions', 'getFormData', 'getCurrentlyEditedFormObject', 'isUserWithoutRole']),
  },
}
</script>

<style scoped>

</style>