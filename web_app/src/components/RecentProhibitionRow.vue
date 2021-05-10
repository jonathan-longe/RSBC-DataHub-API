<template>
  <tr v-if="prohibition">
    <td>
      {{ prohibition.data.last_name }},
      {{ prohibition.data.first_name }}
      ({{ prohibition.data.drivers_number }})<br />
      <span class="text-muted text-secondary">{{ prohibition_number }}</span>
    </td>
    <td>{{ prohibition.short_name }}</td>
    <td>{{ getServedStatus(prohibition_number) }}</td>
    <td>Submitted: {{ prohibition.data.submitted }}</td>
    <td>
      <h6>
        <b-icon-trash v-if="isFormEditable(prohibition_number)" variant="danger" @click="deleteSpecificForm(prohibition_number)"></b-icon-trash>&nbsp;
        <b-icon-pen v-if="isFormEditable(prohibition_number)" variant="primary" @click="editExistingForm(prohibition_number)"></b-icon-pen>
        <b-icon-trash v-if=" ! isFormEditable(prohibition_number)" variant="secondary" ></b-icon-trash>&nbsp;
        <b-icon-pen v-if=" ! isFormEditable(prohibition_number)" variant="secondary" ></b-icon-pen>
      </h6>
    </td>
  </tr>
</template>

<script>

import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  name: "RecentProhibitionRow",
  props: {
    prohibition_number: null,
    prohibition: {}
  },
  computed: {
    ...mapGetters(["isFormEditable", "getServedStatus"])
  },
  methods: {
    ...mapMutations(["editExistingForm"]),
    ...mapActions(["deleteSpecificForm"])
  }
}
</script>
