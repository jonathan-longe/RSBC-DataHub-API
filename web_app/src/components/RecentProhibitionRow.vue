<template>
  <tr v-if="prohibition">
    <td>
      {{ prohibition.data.last_name }},
      {{ prohibition.data.first_name }}
      ({{ prohibition.data.first_name }})<br />
      <span class="text-muted text-secondary">{{ prohibition_number }}</span>
    </td>
    <td>Not Served</td>
    <td>Not Submitted</td>
    <td>
      <b-icon-trash @click="deleteProhibition"></b-icon-trash>&nbsp;
      <b-icon-pen></b-icon-pen>
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
    }
  }
}
</script>

<style scoped>

</style>