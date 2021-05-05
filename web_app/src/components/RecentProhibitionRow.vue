<template>
  <tr v-if="prohibition">
    <td>
      {{ prohibition.data.last_name.value }},
      {{ prohibition.data.first_name.value }}
      ({{ prohibition.data.drivers_number.value }})<br />
      <span class="text-muted text-secondary">{{ prohibition_number }}</span>
    </td>
    <td>{{ prohibition.short_name }}</td>
    <td>Not Served</td>
    <td>Not Submitted</td>
    <td>
      <h6>
        <b-icon-trash variant="danger" @click="deleteEditedForm(prohibition_number)"></b-icon-trash>&nbsp;
        <b-icon-pen variant="primary" @click="editExistingForm(prohibition_number)"></b-icon-pen>
      </h6>
    </td>
  </tr>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';

export default {
  name: "RecentProhibitionRow",
  props: {
    prohibition_number: null,
    prohibition: {}
  },
  methods: {
    ...mapMutations(["deleteEditedForm", "editExistingForm"]),
  },
  computed: {
    ...mapGetters(["getCurrentlyEditedProhibitionNumber", "getCurrentlyEditedForm"])
  }
}
</script>

<style scoped>

</style>