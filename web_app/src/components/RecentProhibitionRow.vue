<template>
  <tr v-if="prohibition">
    <td>
      {{ prohibition.data.last_name.value }},
      {{ prohibition.data.first_name.value }}
      ({{ prohibition.data.drivers_number.value }})<br />
      <span class="text-muted text-secondary">{{ prohibition_number }}</span>
    </td>
    <td>Not Served</td>
    <td>Not Submitted</td>
    <td>
      <h6>
        <b-icon-trash variant="danger" @click="deleteProhibition"></b-icon-trash>&nbsp;
        <b-icon-pen variant="primary" @click="editProhibition"></b-icon-pen>
      </h6>
    </td>
  </tr>
</template>

<script>
export default {
  name: "RecentProhibitionRow",
  props: {
    prohibition_number: null,
    prohibition: {}
  },
  methods: {
    deleteProhibition() {
      console.log("inside deleteProhibition() " + this.prohibition_number)
      return this.$store.commit("deleteEditedForm", this.prohibition_number)
    },
    editProhibition() {
      console.log("inside editProhibition() " + this.prohibition_number)
      return this.$store.commit("editExistingForm", this.prohibition_number)
    }
  }
}
</script>

<style scoped>

</style>