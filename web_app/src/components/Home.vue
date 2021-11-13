<template>
  <div>
    <user-not-permitted-banner v-if="isDisplayUserNotAuthorizedBanner"></user-not-permitted-banner>
    <user-not-authenticated-has-no-unique-ids v-if="isDisplayWelcomeNotLoggedInBanner">

    </user-not-authenticated-has-no-unique-ids>

    <recent-prohibitions v-if="isRecentProhibitions"></recent-prohibitions>
    <issue-prohibitions></issue-prohibitions>
    <prohibition-search v-if="isDisplaySearchRecentProhibition"></prohibition-search>
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
import UserNotAuthenticatedHasNoUniqueIds from "@/components/UserNotAuthenticatedHasNoUniqueIds";

export default {
  name: "Home",
  components: {
    UserNotAuthenticatedHasNoUniqueIds,
     UserNotPermittedBanner,
     RecentProhibitions,
     ProhibitionSearch,
     FeedbackWelcome,
     IssueProhibitions
  },
  computed: {
    ...mapGetters(['isRecentProhibitions', 'getFormData',
      'getCurrentlyEditedFormObject', 'isDisplayUserNotAuthorizedBanner',
      'isDisplayWelcomeNotLoggedInBanner', 'isDisplaySearchRecentProhibition']),
  },
}
</script>

<style scoped>

</style>