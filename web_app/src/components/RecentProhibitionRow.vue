<template>
  <tr v-if="prohibition">
    <td>
      {{ prohibition.data.last_name }},
      {{ prohibition.data.first_name }}
      ({{ prohibition.data.drivers_number }})
    </td>
    <td>{{ prohibition.form_type }}</td>
    <td>{{ getServedStatus(prohibition) }}</td>
    <td><span class="text-muted text-secondary">{{ prohibition.form_id }}</span></td>
    <td>
      <h6>
        <b-icon-trash v-if="isFormEditable(prohibition)" variant="danger" @click="deleteSpecificForm(prohibition)"></b-icon-trash>&nbsp;
        <b-icon-pen v-if="isFormEditable(prohibition)" variant="primary" @click="editExistingForm(prohibition)"></b-icon-pen>


        <span v-if=" ! isFormEditable(prohibition)" class="text-muted text-secondary">
          <b-icon-clock variant="primary" @click="deleteSpecificForm(prohibition)"></b-icon-clock>
          <span> Sending ...</span>
        </span>
      </h6>
    </td>
  </tr>
</template>

<script>

import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  name: "RecentProhibitionRow",
  props: {
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
